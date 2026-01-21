import { Component, input, output, signal, computed, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { FormsModule, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Field } from '@angular/forms/signals';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule, MatFormFieldAppearance } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BaseComponent } from '../base/base.component';
import { AmwSelectOption } from './interfaces/select.interface';
import { AmwProgressSpinnerComponent } from '../../../components/components/amw-progress-spinner/amw-progress-spinner.component';

/**
 * AMW Select Component
 * A comprehensive wrapper around Angular Material Select with enhanced functionality
 * Inherits from BaseComponent: disabled, required, label, placeholder, errorMessage, hasError,
 * name, id, tabIndex, size, color, ariaLabel, ariaLabelledby, ariaDescribedby, ariaRequired,
 * ariaInvalid, hint, readonly, value, change, focus, blur
 */
@Component({
    selector: 'amw-select',
    standalone: true,
    imports: [
        CommonModule,
        NgTemplateOutlet,
        FormsModule,
        ReactiveFormsModule,
        Field,
        MatSelectModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        AmwProgressSpinnerComponent,
        MatInputModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-select.component.html',
    styleUrl: './amw-select.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: AmwSelectComponent,
            multi: true
        }
    ]
})
export class AmwSelectComponent extends BaseComponent<any> implements ControlValueAccessor, OnInit {
    // Select-specific properties (inherited from BaseComponent: disabled, required, label, placeholder,
    // errorMessage, hasError, name, id, tabIndex, size, color, ariaLabel, ariaLabelledby,
    // ariaDescribedby, ariaRequired, ariaInvalid, hint, readonly, value, change, focus, blur)

    /**
     * Signal Forms field binding (experimental).
     * Use this for Angular Signal Forms API integration.
     * Mutually exclusive with ngModel and formControl/formControlName.
     * @experimental
     */
    field = input<any>(undefined);

    appearance = input<MatFormFieldAppearance>('outline');
    multiple = input<boolean>(false);
    compareWith = input<(a: any, b: any) => boolean>((a, b) => a === b);
    options = input<AmwSelectOption[]>([]);
    groups = input<{ [key: string]: AmwSelectOption[] }>({});
    searchable = input<boolean>(false);
    clearable = input<boolean>(false);
    loading = input<boolean>(false);
    autofocus = input<boolean>(false);
    form = input<string>('');

    // Panel properties
    panelClass = input<string | string[]>('');
    overlayPanelClass = input<string | string[]>('');
    disableRipple = input<boolean>(false);
    disableOptionCentering = input<boolean>(false);
    typeaheadDebounceInterval = input<number>(300);
    maxHeight = input<number>(256);
    width = input<number | null>(null);
    autoWidth = input<boolean>(true);
    hideSingleSelectionIndicator = input<boolean>(false);

    // UI properties
    showClearButton = input<boolean>(false);
    showSearchBox = input<boolean>(false);
    searchPlaceholder = input<string>('Search...');
    noOptionsText = input<string>('No options available');
    loadingText = input<string>('Loading...');

    // Template properties
    customTrigger = input<boolean>(false);
    customOptionTemplate = input<boolean>(false);
    customLabelTemplate = input<boolean>(false);
    customEmptyTemplate = input<boolean>(false);
    customLoadingTemplate = input<boolean>(false);
    customErrorTemplate = input<boolean>(false);

    // Validation messages
    validationMessages = input<{
        required?: string;
        invalid?: string;
        noOptions?: string;
    }>({});

    // Internal state
    internalValue = signal<any>(null);
    searchValue = signal<string>('');
    isOpen = signal<boolean>(false);

    // Computed filtered options
    filteredOptions = computed(() => {
        const opts = this.options();
        const search = this.searchValue();
        if (this.searchable() && search) {
            return opts.filter(option =>
                option.label.toLowerCase().includes(search.toLowerCase()) ||
                (option.description && option.description.toLowerCase().includes(search.toLowerCase()))
            );
        }
        return [...opts];
    });

    filteredGroups = computed(() => {
        const grps = this.groups();
        const search = this.searchValue();
        if (this.searchable() && search) {
            const filtered: { [key: string]: AmwSelectOption[] } = {};
            Object.keys(grps).forEach(groupKey => {
                const filteredGroup = grps[groupKey].filter(option =>
                    option.label.toLowerCase().includes(search.toLowerCase()) ||
                    (option.description && option.description.toLowerCase().includes(search.toLowerCase()))
                );
                if (filteredGroup.length > 0) {
                    filtered[groupKey] = filteredGroup;
                }
            });
            return filtered;
        }
        return { ...grps };
    });

    // Select-specific events
    selectionChange = output<any>();
    openedChange = output<boolean>();
    searchChange = output<string>();
    clear = output<void>();

    // ControlValueAccessor implementation
    private onChange = (_value: any) => { };
    private onTouched = () => { };

    ngOnInit(): void {
        // Filtered options are now computed, no manual update needed
    }

    override writeValue(value: any): void {
        this.internalValue.set(value);
    }

    override registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    override registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    override setDisabledState(_isDisabled: boolean): void {
        // Note: disabled is a signal input from BaseComponent and can't be set directly
        // The parent component should bind to [disabled] input instead
    }

    // Event handlers
    onSelectionChange(value: any): void {
        this.internalValue.set(value);
        this.onChange(value);
        this.selectionChange.emit(value);
    }

    onOpenedChange(isOpen: boolean): void {
        this.isOpen.set(isOpen);
        this.openedChange.emit(isOpen);
    }

    onSearchChange(searchValue: string): void {
        this.searchValue.set(searchValue);
        this.searchChange.emit(searchValue);
    }

    onClear(): void {
        const newValue = this.multiple() ? [] : null;
        this.internalValue.set(newValue);
        this.onChange(newValue);
        this.clear.emit();
    }

    override onFocus(event: FocusEvent): void {
        super.onFocus(event);
    }

    override onBlur(event: FocusEvent): void {
        this.onTouched();
        super.onBlur(event);
    }

    // Computed properties
    displayValue = computed(() => {
        const value = this.internalValue();
        if (this.multiple() && Array.isArray(value)) {
            return value.map(val => this.getOptionLabel(val)).join(', ');
        }
        return this.getOptionLabel(value);
    });

    private getOptionLabel(value: any): string {
        if (value == null) return '';
        const opts = this.options();
        const compareFn = this.compareWith();
        const option = opts.find(opt => compareFn(opt.value, value));
        return option ? option.label : String(value);
    }

    hasValue = computed(() => {
        const value = this.internalValue();
        if (this.multiple()) {
            return Array.isArray(value) && value.length > 0;
        }
        return value != null && value !== '';
    });

    canClear = computed(() => {
        return this.clearable() && this.hasValue() && !this.disabled();
    });

    hasOptions = computed(() => {
        return this.filteredOptions().length > 0 || Object.keys(this.filteredGroups()).length > 0;
    });

    override get errorText(): string {
        const errorMsg = this.errorMessage();
        if (errorMsg) return errorMsg;

        if (this.ngControl?.control) {
            const control = this.ngControl.control;
            const msgs = this.validationMessages();
            if (control.hasError('required')) {
                return msgs.required || 'This field is required';
            }
            if (control.hasError('invalid')) {
                return msgs.invalid || 'Please select a valid option';
            }
        }

        return '';
    }

    override get hasValidationError(): boolean {
        return this.hasError() || (this.ngControl?.control?.invalid) || false;
    }

    selectClasses = computed(() => {
        return `amw-select amw-select--${this.size()} amw-select--${this.appearance()} ${this.multiple() ? 'amw-select--multiple' : ''} ${this.disabled() ? 'amw-select--disabled' : ''} ${this.hasValidationError ? 'amw-select--error' : ''}`;
    });
}
