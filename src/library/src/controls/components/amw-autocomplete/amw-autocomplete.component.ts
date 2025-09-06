import { Component, Input, Output, EventEmitter, forwardRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';

import { BaseComponent } from '../base/base.component';

export interface AutocompleteOption {
    value: any;
    label: string;
    disabled?: boolean;
}

export type AutocompleteSize = 'small' | 'medium' | 'large';
export type AutocompleteAppearance = 'outline' | 'fill';

@Component({
    selector: 'amw-autocomplete',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatChipsModule,
        MatButtonModule,
        MatOptionModule
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AmwAutocompleteComponent),
            multi: true
        }
    ],
    templateUrl: './amw-autocomplete.component.html',
    styleUrl: './amw-autocomplete.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class AmwAutocompleteComponent extends BaseComponent implements ControlValueAccessor {
    @Input() options: AutocompleteOption[] = [];
    @Input() override placeholder: string = '';
    @Input() override label: string = '';
    @Input() hint: string = '';
    @Input() override required: boolean = false;
    @Input() override disabled: boolean = false;
    @Input() readonly: boolean = false;
    @Input() multiple: boolean = false;
    @Input() clearable: boolean = true;
    @Input() size: AutocompleteSize = 'medium';
    @Input() appearance: AutocompleteAppearance = 'outline';
    @Input() minLength: number = 0;
    @Input() maxLength: number = 0;
    @Input() filterBy: string = 'label';
    @Input() displayWith: (value: any) => string = (value: any) => value?.label || value || '';

    @Output() optionSelected = new EventEmitter<AutocompleteOption>();
    @Output() inputChanged = new EventEmitter<string>();
    @Output() opened = new EventEmitter<void>();
    @Output() closed = new EventEmitter<void>();

    filteredOptions: AutocompleteOption[] = [];
    inputValue: string = '';
    selectedValue: any = null;
    selectedValues: any[] = [];

    private onChange = (value: any) => { };
    onTouched = () => { };

    ngOnInit(): void {
        this.filteredOptions = [...this.options];
    }

    ngOnChanges(): void {
        if (this.options) {
            this.filteredOptions = [...this.options];
        }
    }

    onInputChange(event: any): void {
        const value = event.target?.value || '';
        this.inputValue = value;
        this.inputChanged.emit(value);
        this.filterOptions(value);
    }

    onOptionSelected(option: AutocompleteOption): void {
        if (this.multiple) {
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
        this.filteredOptions = [...this.options];
        this.onChange(this.multiple ? [] : null);
    }

    onOpened(): void {
        this.opened.emit();
    }

    onClosed(): void {
        this.closed.emit();
    }

    private filterOptions(value: string): void {
        if (!value || value.length < this.minLength) {
            this.filteredOptions = [...this.options];
            return;
        }

        const filterValue = value.toLowerCase();
        this.filteredOptions = this.options.filter(option => {
            const fieldValue = this.getFieldValue(option, this.filterBy);
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
        if (this.multiple) {
            this.selectedValues = Array.isArray(value) ? value : [];
        } else {
            this.selectedValue = value;
            if (value) {
                const option = this.options.find(opt => opt.value === value);
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
        this.disabled = isDisabled;
    }

    getSelectedOption(value: any): AutocompleteOption | undefined {
        return this.options.find(option => option.value === value);
    }
}
