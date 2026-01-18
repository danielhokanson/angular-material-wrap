import { Component, input, output, ViewEncapsulation, ContentChild, TemplateRef } from '@angular/core';

import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BaseComponent } from '../base/base.component';
import { AutocompleteOption } from './interfaces/autocomplete-option.interface';
import { AmwAppearance } from '../../../shared/types/amw-appearance.type';

/**
 * AMW Autocomplete Component
 * Inherits from BaseComponent: disabled, required, label, placeholder, errorMessage, hasError,
 * name, id, tabIndex, size, color, ariaLabel, ariaLabelledby, ariaDescribedby, ariaRequired,
 * ariaInvalid, hint, readonly, value, change, focus, blur
 */
@Component({
    selector: 'amw-autocomplete',
    standalone: true,
    imports: [
    FormsModule,
    NgTemplateOutlet,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    MatOptionModule,
    MatProgressSpinnerModule
],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: AmwAutocompleteComponent,
            multi: true
        }
    ],
    templateUrl: './amw-autocomplete.component.html',
    styleUrl: './amw-autocomplete.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class AmwAutocompleteComponent extends BaseComponent<any> implements ControlValueAccessor {
    // Autocomplete-specific inputs (inherited from BaseComponent: disabled, required, placeholder,
    // label, errorMessage, hasError, name, id, tabIndex, size, color, ariaLabel, ariaLabelledby,
    // ariaDescribedby, ariaRequired, ariaInvalid, hint, readonly, value, change, focus, blur)

    options = input<AutocompleteOption[]>([]);
    multiple = input<boolean>(false);
    clearable = input<boolean>(true);
    appearance = input<AmwAppearance>('outline');
    minLength = input<number>(0);
    maxLength = input<number>(0);
    filterBy = input<string>('label');
    displayWith = input<(value: any) => string>((value: any) => value?.label || value || '');

    // Enhanced features
    loading = input<boolean>(false);
    startIcon = input<string>('');
    noResultsText = input<string>('No results found');

    // Custom option template
    @ContentChild('amwOption') optionTemplate?: TemplateRef<any>;

    // Component-specific outputs
    optionSelected = output<AutocompleteOption>();
    inputChanged = output<string>();
    opened = output<void>();
    closed = output<void>();

    filteredOptions: AutocompleteOption[] = [];
    inputValue: string = '';
    selectedValue: any = null;
    selectedValues: any[] = [];

    private onChange = (value: any) => { };
    onTouched = () => { };

    ngOnInit(): void {
        this.filteredOptions = [...this.options()];
    }

    ngOnChanges(): void {
        if (this.options()) {
            this.filteredOptions = [...this.options()];
        }
    }

    onInputChange(event: any): void {
        const value = event.target?.value || '';
        this.inputValue = value;
        this.inputChanged.emit(value);
        this.filterOptions(value);
    }

    onOptionSelected(option: AutocompleteOption): void {
        if (this.multiple()) {
            this.addToSelection(option);
        } else {
            this.selectedValue = option.value;
            this.inputValue = option.label;
            this.onChange(this.selectedValue);
        }
        this.optionSelected.emit(option);
    }

    onChipRemoved(value: any): void {
        this.selectedValues = this.selectedValues.filter(v => v !== value);
        this.onChange(this.selectedValues);
    }

    onClear(): void {
        this.inputValue = '';
        this.selectedValue = null;
        this.selectedValues = [];
        this.filteredOptions = [...this.options()];
        this.onChange(this.multiple() ? [] : null);
    }

    onOpened(): void {
        this.opened.emit();
    }

    onClosed(): void {
        this.closed.emit();
    }

    private filterOptions(value: string): void {
        if (!value || value.length < this.minLength()) {
            this.filteredOptions = [...this.options()];
            return;
        }

        const filterValue = value.toLowerCase();
        this.filteredOptions = this.options().filter(option => {
            const fieldValue = this.getFieldValue(option, this.filterBy());
            return fieldValue.toLowerCase().includes(filterValue);
        });
    }

    private getFieldValue(option: AutocompleteOption, field: string): string {
        if (field === 'label') {
            return option.label;
        }
        if (field === 'value') {
            return String(option.value);
        }
        return String(option[field as keyof AutocompleteOption] || '');
    }

    private addToSelection(option: AutocompleteOption): void {
        if (!this.selectedValues.includes(option.value)) {
            this.selectedValues.push(option.value);
            this.onChange(this.selectedValues);
        }
        this.inputValue = '';
    }

    // ControlValueAccessor implementation
    override writeValue(value: any): void {
        if (this.multiple()) {
            this.selectedValues = Array.isArray(value) ? value : [];
        } else {
            this.selectedValue = value;
            if (value) {
                const option = this.options().find(opt => opt.value === value);
                this.inputValue = option ? option.label : String(value);
            } else {
                this.inputValue = '';
            }
        }
    }

    override registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    override registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    override setDisabledState(isDisabled: boolean): void {
        // Note: disabled is a signal input from BaseComponent and cannot be set directly.
        // The disabled state should be managed through the parent component's binding.
    }

    getSelectedOption(value: any): AutocompleteOption | undefined {
        return this.options().find(option => option.value === value);
    }
}
