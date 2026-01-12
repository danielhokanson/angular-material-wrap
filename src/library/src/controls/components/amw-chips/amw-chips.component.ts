import { Component, input, output, signal, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectorRef, forwardRef, effect } from '@angular/core';

import { FormsModule, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { AmwButtonComponent } from '../amw-button/amw-button.component';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';

import { BaseComponent } from '../base/base.component';
import { Chip, ChipConfig, ChipEvent, ChipChangeEvent, ChipMenuItem } from './interfaces';
import { AmwTooltipDirective } from '../../../directives';
import { AmwDividerComponent } from '../../../components/components/amw-divider/amw-divider.component';

/**
 * AMW Chips Component
 * A comprehensive wrapper around Angular Material Chips with enhanced functionality
 * Inherits from BaseComponent: disabled, required, label, placeholder, errorMessage, hasError,
 * name, id, tabIndex, size, color, ariaLabel, ariaLabelledby, ariaDescribedby, ariaRequired,
 * ariaInvalid, hint, readonly, value, change, focus, blur
 */
@Component({
    selector: 'amw-chips',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatChipsModule,
        MatIconModule,
        AmwButtonComponent,
        MatInputModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatMenuModule,
        AmwTooltipDirective,
        AmwDividerComponent
    ],
    encapsulation: ViewEncapsulation.None,
    host: { 'data-amw-id': 'amw-chips' },
    templateUrl: './amw-chips.component.html',
    styleUrl: './amw-chips.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AmwChipsComponent),
            multi: true
        }
    ]
})
export class AmwChipsComponent extends BaseComponent<Chip[]> implements OnInit, OnDestroy, ControlValueAccessor {
    // Chips-specific properties (inherited from BaseComponent: disabled, required, label, placeholder,
    // errorMessage, hasError, name, id, tabIndex, size, color, ariaLabel, ariaLabelledby,
    // ariaDescribedby, ariaRequired, ariaInvalid, hint, readonly, value, change, focus, blur)

    config = input<ChipConfig>({});
    chips = input<Chip[]>([]);
    maxChips = input<number | null>(null);
    minChips = input<number>(0);
    addable = input<boolean>(true);
    removable = input<boolean>(true);
    selectable = input<boolean>(false);
    multiple = input<boolean>(false);
    appearance = input<'filled' | 'outlined'>('filled');
    showInput = signal<boolean>(true);
    allowDuplicates = input<boolean>(false);
    showSuggestions = input<boolean>(false);
    maxSuggestions = input<number>(10);
    showMenus = input<boolean>(false);
    defaultMenuItems = input<ChipMenuItem[]>([]);

    // Output signals
    chipAdd = output<ChipEvent>();
    chipRemove = output<ChipEvent>();
    chipSelect = output<ChipEvent>();
    chipDeselect = output<ChipEvent>();
    chipEdit = output<ChipEvent>();
    chipMenuItemClick = output<{ chip: Chip, menuItem: ChipMenuItem }>();
    chipsChange = output<ChipChangeEvent>();
    inputChange = output<string>();

    // Internal properties
    internalChips: Chip[] = [];
    inputValue: string = '';

    /** Internal disabled state from ControlValueAccessor */
    private _disabledFromCVA = signal<boolean>(false);

    /** Internal error state (can be set programmatically) */
    private _internalHasError = signal<boolean>(false);
    private _internalErrorMessage = signal<string>('');

    /** Current chip for menu operations */
    currentChip: Chip | null = null;
    filteredSuggestions: Chip[] = [];
    selectedChips: Set<string> = new Set();
    isInputFocused: boolean = false;
    private destroy$ = new Subject<void>();
    private inputSubject$ = new Subject<string>();

    // ControlValueAccessor properties
    private onChange = (chips: Chip[]) => { };
    private onTouched = () => { };

    constructor(private cdr: ChangeDetectorRef) {
        super();
        // Setup effect to react to config and chips changes
        effect(() => {
            const configVal = this.config();
            if (configVal) {
                this.applyConfig();
            }
        });

        effect(() => {
            const chipsVal = this.chips();
            const configVal = this.config();
            this.internalChips = [...(chipsVal?.length ? chipsVal : configVal?.chips || [])];
            this.updateSelectedChips();
        });
    }

    ngOnInit(): void {
        this.initializeComponent();
        this.setupInputSubscription();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    /**
     * Initialize component with default values
     */
    private initializeComponent(): void {
        this.applyConfig();
        const chipsVal = this.chips();
        const configVal = this.config();
        this.internalChips = [...(chipsVal?.length ? chipsVal : configVal?.chips || [])];
        this.updateSelectedChips();
    }

    /**
     * Apply configuration to component properties
     */
    private applyConfig(): void {
        const configVal = this.config();
        if (!configVal) return;

        // Only update writable signals from config
        if (configVal.showInput !== undefined) {
            this.showInput.set(configVal.showInput);
        }
        if (configVal.errorMessage || configVal.hasError !== undefined) {
            this.setError(configVal.hasError ?? false, configVal.errorMessage ?? '');
        }

        // Update internal chips if config has chips
        if (configVal.chips) {
            this.internalChips = [...configVal.chips];
            this.updateSelectedChips();
        }
    }

    /**
     * Setup input subscription for debounced input changes
     */
    private setupInputSubscription(): void {
        this.inputSubject$
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                takeUntil(this.destroy$)
            )
            .subscribe(value => {
                this.inputChange.emit(value);
                this.filterSuggestions(value);
            });
    }

    /**
     * Update selected chips set based on current chips
     */
    private updateSelectedChips(): void {
        this.selectedChips.clear();
        this.internalChips.forEach(chip => {
            if (chip.selected) {
                this.selectedChips.add(chip.id);
            }
        });
    }

    /**
     * Filter suggestions based on input value
     */
    private filterSuggestions(query: string): void {
        if (!this.showSuggestions() || !query.trim()) {
            this.filteredSuggestions = [];
            return;
        }

        const configVal = this.config();
        const filterFn = configVal.filterFn || this.defaultFilterFn;
        this.filteredSuggestions = filterFn(query, this.internalChips)
            .slice(0, this.maxSuggestions());
    }

    /**
     * Default filter function for suggestions
     */
    private defaultFilterFn = (query: string, chips: Chip[]): Chip[] => {
        const lowerQuery = query.toLowerCase();
        return chips.filter(chip =>
            chip.label.toLowerCase().includes(lowerQuery) &&
            !this.internalChips.some(existing => existing.id === chip.id)
        );
    };

    /**
     * Add a new chip
     */
    addChip(label: string): void {
        const maxChipsVal = this.maxChips();
        if (!this.addable() || this.isDisabled || !label.trim()) return;
        if (maxChipsVal && this.internalChips.length >= maxChipsVal) return;

        const chip: Chip = {
            id: this.generateId(),
            label: label.trim(),
            removable: this.removable(),
            disabled: this.disabled(),
            selected: false
        };

        // Check for duplicates
        if (!this.allowDuplicates() && this.internalChips.some(c => c.label === chip.label)) {
            return;
        }

        // Validate chip
        const configVal = this.config();
        if (configVal.validator) {
            const validation = configVal.validator(chip);
            if (validation !== true) {
                this.setError(true, typeof validation === 'string' ? validation : 'Invalid chip');
                return;
            }
        }

        // Use custom add function if provided
        if (configVal.onAdd) {
            const result = configVal.onAdd(chip);
            if (result instanceof Promise) {
                result.then((addedChip: Chip) => {
                    this.internalChips.push(addedChip);
                    this.emitChipEvent('add', addedChip, this.internalChips.length - 1);
                    this.inputValue = '';
                    this.cdr.detectChanges();
                });
            } else {
                this.internalChips.push(result);
                this.emitChipEvent('add', result, this.internalChips.length - 1);
                this.inputValue = '';
            }
        } else {
            this.internalChips.push(chip);
            this.emitChipEvent('add', chip, this.internalChips.length - 1);
            this.inputValue = '';
        }
    }

    /**
     * Remove a chip
     */
    removeChip(chip: Chip, index: number): void {
        if (!this.removable() || this.isDisabled) return;
        if (this.internalChips.length <= this.minChips()) return;

        // Use custom remove function if provided
        const configVal = this.config();
        if (configVal.onRemove) {
            const result = configVal.onRemove(chip);
            if (result instanceof Promise) {
                result.then((shouldRemove: boolean) => {
                    if (shouldRemove) {
                        this.internalChips.splice(index, 1);
                        this.selectedChips.delete(chip.id);
                        this.emitChipEvent('remove', chip, index);
                        this.cdr.detectChanges();
                    }
                });
            } else if (result) {
                this.internalChips.splice(index, 1);
                this.selectedChips.delete(chip.id);
                this.emitChipEvent('remove', chip, index);
            }
        } else {
            this.internalChips.splice(index, 1);
            this.selectedChips.delete(chip.id);
            this.emitChipEvent('remove', chip, index);
        }
    }

    /**
     * Select a chip
     */
    selectChip(chip: Chip, index: number): void {
        if (!this.selectable() || this.isDisabled || chip.disabled) return;

        if (this.multiple()) {
            chip.selected = !chip.selected;
            if (chip.selected) {
                this.selectedChips.add(chip.id);
                this.emitChipEvent('select', chip, index);
            } else {
                this.selectedChips.delete(chip.id);
                this.emitChipEvent('deselect', chip, index);
            }
        } else {
            // Single selection - deselect all others
            this.internalChips.forEach((c, i) => {
                if (i !== index) {
                    c.selected = false;
                    this.selectedChips.delete(c.id);
                }
            });
            chip.selected = true;
            this.selectedChips.add(chip.id);
            this.emitChipEvent('select', chip, index);
        }

        this.cdr.detectChanges();
    }

    /**
     * Handle input key events
     */
    onInputKeydown(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.addChip(this.inputValue);
        } else if (event.key === 'Backspace' && !this.inputValue && this.internalChips.length > 0) {
            // Remove last chip when backspace is pressed on empty input
            const lastIndex = this.internalChips.length - 1;
            this.removeChip(this.internalChips[lastIndex], lastIndex);
        }
    }

    /**
     * Handle input value changes
     */
    onInputChange(value: string): void {
        this.inputValue = value;
        this.inputSubject$.next(value);
    }

    /**
     * Handle input focus
     */
    onInputFocus(): void {
        this.isInputFocused = true;
        if (this.inputValue) {
            this.filterSuggestions(this.inputValue);
        }
    }

    /**
     * Handle input blur
     */
    onInputBlur(): void {
        this.isInputFocused = false;
        this.onTouched();
    }

    /**
     * Clear all chips
     */
    clearChips(): void {
        if (this.isDisabled) return;
        this.internalChips = [];
        this.selectedChips.clear();
        this.emitChipEvent('clear', null as any, -1);
    }

    /**
     * Get selected chips
     */
    getSelectedChips(): Chip[] {
        return this.internalChips.filter(chip => chip.selected);
    }

    /**
     * Check if chip can be removed
     */
    canRemoveChip(chip: Chip): boolean {
        return this.removable() && !this.isDisabled && chip.removable !== false;
    }

    /**
     * Check if chip can be selected
     */
    canSelectChip(chip: Chip): boolean {
        return this.selectable() && !this.isDisabled && !chip.disabled;
    }

    /**
     * Track by function for chips
     */
    trackByChipId(index: number, chip: Chip): string {
        return chip.id;
    }

    /**
     * Display function for chip suggestions
     */
    displayChipLabel(chip: Chip): string {
        return chip ? chip.label : '';
    }

    /**
     * Handle suggestion selection
     */
    onSuggestionSelected(event: any): void {
        const chip = event.option.value;
        this.addChip(chip.label);
    }

    /**
     * Focus the input field
     */
    focusInput(): void {
        // This would be implemented to focus the hidden input
        // For now, we'll emit an event to show the input
        this.showInput.set(true);
        this.cdr.detectChanges();
    }

    /**
     * Get menu items for a chip
     */
    getChipMenuItems(chip: Chip): ChipMenuItem[] {
        if (chip.menuItems && chip.menuItems.length > 0) {
            return chip.menuItems.filter(item => item.visible !== false);
        }
        return this.defaultMenuItems().filter(item => item.visible !== false);
    }

    /**
     * Check if chip should show menu
     */
    shouldShowMenu(chip: Chip): boolean {
        return this.showMenus() && !chip.disabled && this.getChipMenuItems(chip).length > 0;
    }

    /**
     * Get current menu items for the active chip
     */
    getCurrentMenuItems(): ChipMenuItem[] {
        if (!this.currentChip) return [];
        return this.getChipMenuItems(this.currentChip);
    }

    /**
     * Open menu for a specific chip
     */
    openMenu(chip: Chip, event: Event): void {
        event.stopPropagation();
        this.currentChip = chip;
    }

    /**
     * Handle menu item click
     */
    onMenuItemClick(chip: Chip, menuItem: ChipMenuItem): void {
        if (menuItem.disabled) return;

        // Execute custom action if provided
        if (menuItem.action) {
            menuItem.action(chip, menuItem);
        }

        // Execute config handler if provided
        const configVal = this.config();
        if (configVal.onMenuItemClick) {
            configVal.onMenuItemClick(chip, menuItem);
        }

        // Emit event
        this.chipMenuItemClick.emit({ chip, menuItem });

        // Clear current chip
        this.currentChip = null;
    }

    /**
     * Generate unique ID for chip
     */
    private generateId(): string {
        return `chip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Emit chip event
     */
    private emitChipEvent(type: 'add' | 'remove' | 'select' | 'deselect' | 'edit' | 'clear', chip: Chip | null, index: number): void {
        const event: ChipEvent = {
            chip: chip!,
            index,
            type
        };

        const changeEvent: ChipChangeEvent = {
            chips: [...this.internalChips],
            changedChip: chip || undefined,
            changeType: type,
            index: index >= 0 ? index : undefined
        };

        // Emit specific event
        switch (type) {
            case 'add':
                this.chipAdd.emit(event);
                break;
            case 'remove':
                this.chipRemove.emit(event);
                break;
            case 'select':
                this.chipSelect.emit(event);
                break;
            case 'deselect':
                this.chipDeselect.emit(event);
                break;
            case 'edit':
                this.chipEdit.emit(event);
                break;
        }

        // Emit general change event
        this.chipsChange.emit(changeEvent);
        this.onChange(this.internalChips);
    }

    // ControlValueAccessor implementation
    override writeValue(value: Chip[]): void {
        this.internalChips = value ? [...value] : [];
        this.updateSelectedChips();
        this.cdr.detectChanges();
    }

    override registerOnChange(fn: (value: Chip[]) => void): void {
        this.onChange = fn;
    }

    override registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    override setDisabledState(isDisabled: boolean): void {
        this._disabledFromCVA.set(isDisabled);
        this.cdr.detectChanges();
    }

    /** Check if component is disabled (from input or CVA) - use getter to match BaseComponent */
    override get isDisabled(): boolean {
        return this.disabled() || this._disabledFromCVA();
    }

    /** Check if component has error (from input or internal state) */
    hasErrorState(): boolean {
        return this.hasError() || this._internalHasError();
    }

    /** Get error message (from input or internal state) */
    getErrorMessage(): string {
        return this.errorMessage() || this._internalErrorMessage();
    }

    /** Set internal error state */
    setError(hasError: boolean, message: string = ''): void {
        this._internalHasError.set(hasError);
        this._internalErrorMessage.set(message);
    }
}
