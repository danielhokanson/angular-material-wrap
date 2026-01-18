import {
    Component,
    input,
    output,
    ViewEncapsulation,
    OnInit,
    OnDestroy,
    ContentChild,
    TemplateRef,
    ViewChild,
    ElementRef
} from '@angular/core';
import { FormsModule, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { MatChipsModule, MatChipInputEvent } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatFormFieldAppearance } from '@angular/material/form-field';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { BaseComponent } from '../base/base.component';
import { ChipInputOption } from './interfaces/chip-input-option.interface';

/**
 * AMW Chip Input Component
 * Combines chip grid with autocomplete for tag-like input
 * Inherits from BaseComponent: disabled, required, label, placeholder, errorMessage, hasError,
 * name, id, tabIndex, size, color, ariaLabel, ariaLabelledby, ariaDescribedby, ariaRequired,
 * ariaInvalid, hint, readonly, value, change, focus, blur
 */
@Component({
    selector: 'amw-chip-input',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgTemplateOutlet,
        MatChipsModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: AmwChipInputComponent,
            multi: true
        }
    ],
    templateUrl: './amw-chip-input.component.html',
    styleUrl: './amw-chip-input.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class AmwChipInputComponent extends BaseComponent<ChipInputOption[]> implements OnInit, OnDestroy, ControlValueAccessor {

    // Chip Input specific inputs
    suggestions = input<ChipInputOption[]>([]);
    appearance = input<MatFormFieldAppearance>('outline');
    separatorKeyCodes = input<number[]>([ENTER, COMMA]);
    addOnBlur = input<boolean>(true);
    removable = input<boolean>(true);
    selectable = input<boolean>(false);
    allowCustomValues = input<boolean>(true);
    maxChips = input<number | null>(null);
    displayWith = input<(option: ChipInputOption) => string>((opt) => opt?.label || '');
    loading = input<boolean>(false);
    filterDebounce = input<number>(300);

    // Outputs
    chipAdded = output<ChipInputOption>();
    chipRemoved = output<ChipInputOption>();
    inputChanged = output<string>();
    suggestionSelected = output<ChipInputOption>();

    // Internal state
    chips: ChipInputOption[] = [];
    filteredSuggestions: ChipInputOption[] = [];
    inputValue: string = '';

    @ViewChild('chipInput') chipInputRef!: ElementRef<HTMLInputElement>;
    @ContentChild('chipTemplate') chipTemplate?: TemplateRef<any>;
    @ContentChild('suggestionTemplate') suggestionTemplate?: TemplateRef<any>;

    private destroy$ = new Subject<void>();
    private inputSubject$ = new Subject<string>();

    ngOnInit(): void {
        this.setupInputSubscription();
        this.initializeSuggestions();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private setupInputSubscription(): void {
        this.inputSubject$
            .pipe(
                debounceTime(this.filterDebounce()),
                distinctUntilChanged(),
                takeUntil(this.destroy$)
            )
            .subscribe(value => {
                this.inputChanged.emit(value);
                this.filterSuggestions(value);
            });
    }

    private initializeSuggestions(): void {
        this.filteredSuggestions = [...this.suggestions()];
    }

    private filterSuggestions(query: string): void {
        const sugg = this.suggestions();

        if (!query.trim()) {
            this.filteredSuggestions = sugg.filter(s =>
                !this.chips.some(c => c.value === s.value)
            );
            return;
        }

        const lowerQuery = query.toLowerCase();
        this.filteredSuggestions = sugg.filter(option =>
            option.label.toLowerCase().includes(lowerQuery) &&
            !this.chips.some(c => c.value === option.value)
        );
    }

    onInputChange(value: string): void {
        this.inputValue = value;
        this.inputSubject$.next(value);
    }

    onChipInputTokenEnd(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        if (!value || !this.allowCustomValues()) return;
        if (this.maxChips() && this.chips.length >= this.maxChips()!) return;

        // Check for duplicates
        if (this.chips.some(c => c.label.toLowerCase() === value.toLowerCase())) {
            event.chipInput!.clear();
            this.inputValue = '';
            return;
        }

        const newChip: ChipInputOption = {
            value: value,
            label: value,
            isCustom: true
        };

        this.chips.push(newChip);
        this.chipAdded.emit(newChip);
        this.emitChange();

        event.chipInput!.clear();
        this.inputValue = '';
    }

    onSuggestionSelected(event: MatAutocompleteSelectedEvent): void {
        const option = event.option.value as ChipInputOption;

        if (this.maxChips() && this.chips.length >= this.maxChips()!) return;
        if (this.chips.some(c => c.value === option.value)) return;

        this.chips.push(option);
        this.chipAdded.emit(option);
        this.suggestionSelected.emit(option);
        this.emitChange();

        this.chipInputRef.nativeElement.value = '';
        this.inputValue = '';
        this.filterSuggestions('');
    }

    removeChip(chip: ChipInputOption, index: number): void {
        if (!this.removable() || this.disabled()) return;

        this.chips.splice(index, 1);
        this.chipRemoved.emit(chip);
        this.emitChange();
        this.filterSuggestions(this.inputValue);
    }

    private emitChange(): void {
        this._onChange(this.chips);
        this.value.set(this.chips);
        this.change.emit(this.chips);
    }

    // ControlValueAccessor implementation
    override writeValue(value: ChipInputOption[] | null): void {
        this.chips = value ? [...value] : [];
        this.filterSuggestions(this.inputValue);
    }

    onTouched(): void {
        this._onTouched();
    }

    get canAddMore(): boolean {
        const max = this.maxChips();
        return !max || this.chips.length < max;
    }

    trackByChip(index: number, chip: ChipInputOption): any {
        return chip.value;
    }
}
