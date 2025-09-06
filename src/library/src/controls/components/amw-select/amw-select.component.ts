import { Component, Input, Output, EventEmitter, ViewEncapsulation, forwardRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule, MatFormFieldAppearance } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { BaseComponent } from '../base/base.component';
import { SelectAppearance } from './interfaces/select-appearance.type';
import { SelectSize } from './interfaces/select-size.type';
import { SelectOption, SelectConfig } from './interfaces/select.interface';

/**
 * AMW Select Component
 * A comprehensive wrapper around Angular Material Select with enhanced functionality
 */
@Component({
    selector: 'amw-select',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatInputModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-select.component.html',
    styleUrl: './amw-select.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AmwSelectComponent),
            multi: true
        }
    ]
})
export class AmwSelectComponent extends BaseComponent implements ControlValueAccessor, OnInit, OnChanges {
    // Basic select properties
    @Input() appearance: MatFormFieldAppearance = 'outline';
    @Input() size: SelectSize = 'medium';
    @Input() override placeholder: string = '';
    @Input() override label: string = '';
    @Input() hint: string = '';
    @Input() multiple: boolean = false;
    @Input() compareWith: (a: any, b: any) => boolean = (a, b) => a === b;
    @Input() options: SelectOption[] = [];
    @Input() groups: { [key: string]: SelectOption[] } = {};
    @Input() searchable: boolean = false;
    @Input() clearable: boolean = false;
    @Input() loading: boolean = false;
    @Input() autofocus: boolean = false;
    @Input() name: string = '';
    @Input() id: string = '';
    @Input() form: string = '';

    // Panel properties
    @Input() panelClass: string | string[] = '';
    @Input() overlayPanelClass: string | string[] = '';
    @Input() disableRipple: boolean = false;
    @Input() disableOptionCentering: boolean = false;
    @Input() typeaheadDebounceInterval: number = 300;
    @Input() maxHeight: number = 256;
    @Input() width: number | null = null;
    @Input() autoWidth: boolean = true;
    @Input() hideSingleSelectionIndicator: boolean = false;

    // UI properties
    @Input() showClearButton: boolean = false;
    @Input() showSearchBox: boolean = false;
    @Input() searchPlaceholder: string = 'Search...';
    @Input() noOptionsText: string = 'No options available';
    @Input() loadingText: string = 'Loading...';

    // Template properties
    @Input() customTrigger: boolean = false;
    @Input() customOptionTemplate: boolean = false;
    @Input() customLabelTemplate: boolean = false;
    @Input() customEmptyTemplate: boolean = false;
    @Input() customLoadingTemplate: boolean = false;
    @Input() customErrorTemplate: boolean = false;

    // Accessibility properties
    @Input() ariaLabel: string = '';
    @Input() ariaLabelledby: string = '';
    @Input() ariaDescribedby: string = '';
    @Input() tabIndex: number = 0;

    // Validation messages
    @Input() validationMessages: {
        required?: string;
        invalid?: string;
        noOptions?: string;
    } = {};

    // Internal state
    internalValue: any = null;
    searchValue: string = '';
    filteredOptions: SelectOption[] = [];
    filteredGroups: { [key: string]: SelectOption[] } = {};
    isOpen: boolean = false;

    // Events
    @Output() selectionChange = new EventEmitter<any>();
    @Output() openedChange = new EventEmitter<boolean>();
    @Output() searchChange = new EventEmitter<string>();
    @Output() clear = new EventEmitter<void>();
    @Output() override focus = new EventEmitter<FocusEvent>();
    @Output() override blur = new EventEmitter<FocusEvent>();

    // ControlValueAccessor implementation
    private onChange = (value: any) => { };
    private onTouched = () => { };

    ngOnInit(): void {
        this.updateFilteredOptions();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['options'] || changes['groups'] || changes['searchValue']) {
            this.updateFilteredOptions();
        }
    }

    override writeValue(value: any): void {
        this.internalValue = value;
    }

    override registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    override registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    override setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    // Event handlers
    onSelectionChange(value: any): void {
        this.internalValue = value;
        this.onChange(value);
        this.selectionChange.emit(value);
    }

    onOpenedChange(isOpen: boolean): void {
        this.isOpen = isOpen;
        this.openedChange.emit(isOpen);
    }

    onSearchChange(searchValue: string): void {
        this.searchValue = searchValue;
        this.searchChange.emit(searchValue);
        this.updateFilteredOptions();
    }

    onClear(): void {
        this.internalValue = this.multiple ? [] : null;
        this.onChange(this.internalValue);
        this.clear.emit();
    }

    override onFocus(event: FocusEvent): void {
        this.focus.emit(event);
    }

    override onBlur(event: FocusEvent): void {
        this.onTouched();
        this.blur.emit(event);
    }

    // Helper methods
    private updateFilteredOptions(): void {
        if (this.searchable && this.searchValue) {
            this.filteredOptions = this.options.filter(option =>
                option.label.toLowerCase().includes(this.searchValue.toLowerCase()) ||
                (option.description && option.description.toLowerCase().includes(this.searchValue.toLowerCase()))
            );

            if (Object.keys(this.groups).length > 0) {
                this.filteredGroups = {};
                Object.keys(this.groups).forEach(groupKey => {
                    const filteredGroup = this.groups[groupKey].filter(option =>
                        option.label.toLowerCase().includes(this.searchValue.toLowerCase()) ||
                        (option.description && option.description.toLowerCase().includes(this.searchValue.toLowerCase()))
                    );
                    if (filteredGroup.length > 0) {
                        this.filteredGroups[groupKey] = filteredGroup;
                    }
                });
            }
        } else {
            this.filteredOptions = [...this.options];
            this.filteredGroups = { ...this.groups };
        }
    }

    get displayValue(): string {
        if (this.multiple && Array.isArray(this.internalValue)) {
            return this.internalValue.map(val => this.getOptionLabel(val)).join(', ');
        }
        return this.getOptionLabel(this.internalValue);
    }

    private getOptionLabel(value: any): string {
        if (value == null) return '';

        const option = this.options.find(opt => this.compareWith(opt.value, value));
        return option ? option.label : String(value);
    }

    get hasValue(): boolean {
        if (this.multiple) {
            return Array.isArray(this.internalValue) && this.internalValue.length > 0;
        }
        return this.internalValue != null && this.internalValue !== '';
    }

    get canClear(): boolean {
        return this.clearable && this.hasValue && !this.disabled;
    }

    get hasOptions(): boolean {
        return this.filteredOptions.length > 0 || Object.keys(this.filteredGroups).length > 0;
    }

    override get errorText(): string {
        if (this.errorMessage) return this.errorMessage;

        if (this.ngControl?.control) {
            const control = this.ngControl.control;
            if (control.hasError('required')) {
                return this.validationMessages.required || 'This field is required';
            }
            if (control.hasError('invalid')) {
                return this.validationMessages.invalid || 'Please select a valid option';
            }
        }

        return '';
    }

    override get hasValidationError(): boolean {
        return this.hasError || (this.ngControl?.control?.invalid) || false;
    }

    get selectClasses(): string {
        return `amw-select amw-select--${this.size} amw-select--${this.appearance} ${this.multiple ? 'amw-select--multiple' : ''} ${this.disabled ? 'amw-select--disabled' : ''} ${this.hasValidationError ? 'amw-select--error' : ''}`;
    }
}
