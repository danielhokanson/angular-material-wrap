import { Component, input, output, signal, computed, ViewEncapsulation, OnInit, OnChanges, SimpleChanges, effect } from '@angular/core';

import { FormsModule, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BaseComponent } from '../base/base.component';
import { RadioGroupOption, RadioGroupConfig } from './interfaces/radio-group.interface';

/**
 * AMW Radio Group Component
 * A comprehensive wrapper around Angular Material Radio Group with enhanced functionality
 * Inherits from BaseComponent: disabled, required, label, placeholder, errorMessage, hasError,
 * name, id, tabIndex, size, color, ariaLabel, ariaLabelledby, ariaDescribedby, ariaRequired,
 * ariaInvalid, hint, readonly, value, change, focus, blur
 */
@Component({
    selector: 'amw-radio-group',
    standalone: true,
    imports: [
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatIconModule
],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-radio-group.component.html',
    styleUrl: './amw-radio-group.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: AmwRadioGroupComponent,
            multi: true
        }
    ]
})
export class AmwRadioGroupComponent extends BaseComponent<any> implements ControlValueAccessor, OnInit, OnChanges {
    // Radio group-specific properties (inherited from BaseComponent: disabled, required, label,
    // placeholder, errorMessage, hasError, name, id, tabIndex, size, color, ariaLabel,
    // ariaLabelledby, ariaDescribedby, ariaRequired, ariaInvalid, hint, readonly, value, change, focus, blur)

    orientation = input<'horizontal' | 'vertical'>('vertical');

    // Options and configuration
    options = input<RadioGroupOption[]>([]);
    config = input<RadioGroupConfig | null>(null);

    // Value and change handling
    selectedValue = input<any>(null);
    selectedValueChange = output<any>();
    selectionChange = output<RadioGroupOption>();

    // Internal state
    internalValue = signal<any>(null);
    isFocused = signal<boolean>(false);
    readonly componentId: string;

    // ControlValueAccessor implementation
    private onChange = (value: any) => { };
    private onTouched = () => { };

    // Computed property for radio group classes
    radioGroupClasses = computed(() => {
        const classes = ['amw-radio-group'];

        if (this.size()) {
            classes.push(`amw-radio-group--${this.size()}`);
        }

        if (this.orientation()) {
            classes.push(`amw-radio-group--${this.orientation()}`);
        }

        if (this.disabled()) {
            classes.push('amw-radio-group--disabled');
        }

        if (this.required()) {
            classes.push('amw-radio-group--required');
        }

        if (this.isFocused()) {
            classes.push('amw-radio-group--focused');
        }

        return classes.join(' ');
    });

    constructor() {
        super();
        // Generate ID once during construction to avoid ExpressionChangedAfterItHasBeenCheckedError
        this.componentId = this.generateId();

        // Effect to sync selectedValue input with internalValue
        effect(() => {
            const selected = this.selectedValue();
            if (selected !== null) {
                this.internalValue.set(selected);
                this.value = selected;
            }
        });

        // Effect to apply config changes
        effect(() => {
            const cfg = this.config();
            if (cfg) {
                this.applyConfig(cfg);
            }
        });
    }

    ngOnInit(): void {
        // Effects in constructor handle config and selectedValue syncing
    }

    ngOnChanges(changes: SimpleChanges): void {
        // Effects in constructor handle config changes reactively
    }

    /**
     * Apply configuration to component properties
     * Note: With signal inputs, config values are applied via effect in constructor
     * This method is kept for backwards compatibility but config values
     * should be passed directly to inputs when using signals
     */
    private applyConfig(cfg?: RadioGroupConfig): void {
        // Config is now a signal input, values should be passed directly to inputs
        // This method is maintained for backwards compatibility
        // The effect in constructor will call this when config changes
    }

    /**
     * Handle radio button selection change
     */
    onRadioChange(value: any): void {
        this.internalValue.set(value);
        this.value = value;
        this.selectedValueChange.emit(value);

        const selectedOption = this.options().find(option => option.value === value);
        if (selectedOption) {
            this.selectionChange.emit(selectedOption);
        }

        this.onChange(value);
        this.onTouched();
    }

    /**
     * Handle focus events
     */
    handleFocus(): void {
        this.isFocused.set(true);
    }

    /**
     * Handle blur events
     */
    handleBlur(): void {
        this.isFocused.set(false);
        this.onTouched();
    }

    /**
     * Get CSS classes for individual radio buttons
     */
    getRadioButtonClasses(option: RadioGroupOption): string {
        const classes = ['amw-radio-group__option'];

        if (option.disabled) {
            classes.push('amw-radio-group__option--disabled');
        }

        return classes.join(' ');
    }

    /**
     * Track by function for ngFor
     */
    trackByValue(index: number, option: RadioGroupOption): any {
        return option.value;
    }

    /**
     * Generate unique ID for radio group
     */
    generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }

    // ControlValueAccessor implementation
    override writeValue(value: any): void {
        this.internalValue.set(value);
        this.value = value;
    }

    override registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    override registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    override setDisabledState(isDisabled: boolean): void {
        // Note: disabled is a signal input and cannot be set directly.
        // The disabled state is controlled by the parent component via the [disabled] input binding.
        // If you need to programmatically disable the component, use a writable signal or
        // manage the disabled state in the parent component.
    }
}
