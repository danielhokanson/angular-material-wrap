import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnInit, OnChanges, SimpleChanges, OnDestroy, ChangeDetectorRef, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
// import { MatRippleModule } from '@angular/material/ripple';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';

import { Chip, ChipConfig, ChipEvent, ChipChangeEvent, ChipMenuItem } from './interfaces';

/**
 * AMW Chips Component
 * A comprehensive wrapper around Angular Material Chips with enhanced functionality
 */
@Component({
    selector: 'amw-chips',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatChipsModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatMenuModule,
        MatTooltipModule,
        MatDividerModule
    ],
    encapsulation: ViewEncapsulation.None,
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
export class AmwChipsComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
    // Input properties
    @Input() config: ChipConfig = {};
    @Input() chips: Chip[] = [];
    @Input() placeholder: string = 'Add a chip...';
    @Input() disabled: boolean = false;
    @Input() required: boolean = false;
    @Input() maxChips: number | null = null;
    @Input() minChips: number = 0;
    @Input() addable: boolean = true;
    @Input() removable: boolean = true;
    @Input() selectable: boolean = false;
    @Input() multiple: boolean = false;
    @Input() size: 'small' | 'medium' | 'large' = 'medium';
    @Input() appearance: 'filled' | 'outlined' = 'filled';
    @Input() showInput: boolean = true;
    @Input() allowDuplicates: boolean = false;
    @Input() showSuggestions: boolean = false;
    @Input() maxSuggestions: number = 10;
    @Input() showMenus: boolean = false;
    @Input() defaultMenuItems: ChipMenuItem[] = [];
    @Input() errorMessage: string = '';
    @Input() hasError: boolean = false;
    @Input() ariaLabel: string = '';
    @Input() ariaDescribedby: string = '';

    // Output events
    @Output() chipAdd = new EventEmitter<ChipEvent>();
    @Output() chipRemove = new EventEmitter<ChipEvent>();
    @Output() chipSelect = new EventEmitter<ChipEvent>();
    @Output() chipDeselect = new EventEmitter<ChipEvent>();
    @Output() chipEdit = new EventEmitter<ChipEvent>();
    @Output() chipMenuItemClick = new EventEmitter<{ chip: Chip, menuItem: ChipMenuItem }>();
    @Output() chipsChange = new EventEmitter<ChipChangeEvent>();
    @Output() inputChange = new EventEmitter<string>();

    // Internal properties
    internalChips: Chip[] = [];
    inputValue: string = '';

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

    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.initializeComponent();
        this.setupInputSubscription();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['config'] && this.config) {
            this.applyConfig();
            // Force re-initialization of chips from config
            this.internalChips = [...(this.chips?.length ? this.chips : this.config?.chips || [])];
            this.updateSelectedChips();
        }
        if (changes['chips']) {
            this.internalChips = [...(this.chips?.length ? this.chips : this.config?.chips || [])];
            this.updateSelectedChips();
        }
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
        this.internalChips = [...(this.chips?.length ? this.chips : this.config?.chips || [])];
        this.updateSelectedChips();
    }

    /**
     * Apply configuration to component properties
     */
    private applyConfig(): void {
        if (!this.config) return;

        this.placeholder = this.config.placeholder || this.placeholder;
        this.disabled = this.config.disabled ?? this.disabled;
        this.required = this.config.required ?? this.required;
        this.maxChips = this.config.maxChips ?? this.maxChips;
        this.minChips = this.config.minChips ?? this.minChips;
        this.addable = this.config.addable ?? this.addable;
        this.removable = this.config.removable ?? this.removable;
        this.selectable = this.config.selectable ?? this.selectable;
        this.multiple = this.config.multiple ?? this.multiple;
        this.size = this.config.size || this.size;
        this.appearance = this.config.appearance || this.appearance;
        this.showInput = this.config.showInput ?? this.showInput;
        this.allowDuplicates = this.config.allowDuplicates ?? this.allowDuplicates;
        this.showSuggestions = this.config.showSuggestions ?? this.showSuggestions;
        this.maxSuggestions = this.config.maxSuggestions ?? this.maxSuggestions;
        this.showMenus = this.config.showMenus ?? this.showMenus;
        this.defaultMenuItems = this.config.defaultMenuItems || this.defaultMenuItems;
        this.errorMessage = this.config.errorMessage || this.errorMessage;
        this.hasError = this.config.hasError ?? this.hasError;
        this.ariaLabel = this.config.ariaLabel || this.ariaLabel;
        this.ariaDescribedby = this.config.ariaDescribedby || this.ariaDescribedby;

        // Update internal chips if config has chips
        if (this.config.chips) {
            this.internalChips = [...this.config.chips];
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
        if (!this.showSuggestions || !query.trim()) {
            this.filteredSuggestions = [];
            return;
        }

        const filterFn = this.config.filterFn || this.defaultFilterFn;
        this.filteredSuggestions = filterFn(query, this.internalChips)
            .slice(0, this.maxSuggestions);
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
        if (!this.addable || this.disabled || !label.trim()) return;
        if (this.maxChips && this.internalChips.length >= this.maxChips) return;

        const chip: Chip = {
            id: this.generateId(),
            label: label.trim(),
            removable: this.removable,
            disabled: this.disabled,
            selected: false
        };

        // Check for duplicates
        if (!this.allowDuplicates && this.internalChips.some(c => c.label === chip.label)) {
            return;
        }

        // Validate chip
        if (this.config.validator) {
            const validation = this.config.validator(chip);
            if (validation !== true) {
                this.errorMessage = typeof validation === 'string' ? validation : 'Invalid chip';
                this.hasError = true;
                return;
            }
        }

        // Use custom add function if provided
        if (this.config.onAdd) {
            const result = this.config.onAdd(chip);
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
        if (!this.removable || this.disabled) return;
        if (this.internalChips.length <= this.minChips) return;

        // Use custom remove function if provided
        if (this.config.onRemove) {
            const result = this.config.onRemove(chip);
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
        if (!this.selectable || this.disabled || chip.disabled) return;

        if (this.multiple) {
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
        if (this.disabled) return;
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
        return this.removable && !this.disabled && chip.removable !== false;
    }

    /**
     * Check if chip can be selected
     */
    canSelectChip(chip: Chip): boolean {
        return this.selectable && !this.disabled && !chip.disabled;
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
        this.showInput = true;
        this.cdr.detectChanges();
    }

    /**
     * Get menu items for a chip
     */
    getChipMenuItems(chip: Chip): ChipMenuItem[] {
        if (chip.menuItems && chip.menuItems.length > 0) {
            return chip.menuItems.filter(item => item.visible !== false);
        }
        return this.defaultMenuItems.filter(item => item.visible !== false);
    }

    /**
     * Check if chip should show menu
     */
    shouldShowMenu(chip: Chip): boolean {
        return this.showMenus && !chip.disabled && this.getChipMenuItems(chip).length > 0;
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
        if (this.config.onMenuItemClick) {
            this.config.onMenuItemClick(chip, menuItem);
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
    writeValue(value: Chip[]): void {
        this.internalChips = value ? [...value] : [];
        this.updateSelectedChips();
        this.cdr.detectChanges();
    }

    registerOnChange(fn: (value: Chip[]) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.cdr.detectChanges();
    }
}
