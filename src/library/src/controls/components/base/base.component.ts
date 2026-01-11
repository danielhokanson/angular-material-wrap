import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl } from '@angular/forms';
import { BaseComponentInterface } from '../../interfaces/base-component.interface';

/**
 * Base component class for all AMW components
 * Provides form integration and common functionality
 */
@Component({
    selector: 'amw-base',
    template: '',
    standalone: true,
    encapsulation: ViewEncapsulation.None
})
export abstract class BaseComponent implements BaseComponentInterface {
    @Input() disabled = false;
    @Input() required = false;
    @Input() placeholder = '';
    @Input() label = '';
    @Input() errorMessage = '';
    @Input() hasError = false;

    @Output() valueChange = new EventEmitter<any>();
    @Output() blur = new EventEmitter<FocusEvent>();
    @Output() focus = new EventEmitter<FocusEvent>();

    protected _value: any = null;
    protected _onChange = (value: any) => { };
    protected _onTouched = () => { };

    // NgControl will be injected by individual components if needed
    protected ngControl?: NgControl;

    constructor() {
        // Empty constructor - no NgControl injection to avoid circular dependency
    }

    @Input()
    get value(): any {
        return this._value;
    }
    set value(val: any) {
        if (val !== this._value) {
            this._value = val;
            this._onChange(val);
            this.valueChange.emit(val);
        }
    }

    // ControlValueAccessor implementation
    writeValue(value: any): void {
        this._value = value;
    }

    registerOnChange(fn: (value: any) => void): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this._onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    // Event handlers
    onBlur(event: FocusEvent): void {
        this._onTouched();
        this.blur.emit(event);
    }

    onFocus(event: FocusEvent): void {
        this.focus.emit(event);
    }

    // Helper methods
    get isDisabled(): boolean {
        return this.disabled || (this.ngControl?.control as FormControl)?.disabled || false;
    }

    get isRequired(): boolean {
        return this.required || (this.ngControl?.control as FormControl)?.hasError('required') || false;
    }

    get hasValidationError(): boolean {
        return this.hasError || (this.ngControl?.control as FormControl)?.invalid || false;
    }

    get errorText(): string {
        if (this.errorMessage) return this.errorMessage;
        if (this.ngControl?.control) {
            const control = this.ngControl.control as FormControl;
            if (control.hasError('required')) return 'This field is required';
            if (control.hasError('email')) return 'Please enter a valid email';
            if (control.hasError('minlength')) return `Minimum length is ${control.errors?.['minlength'].requiredLength}`;
            if (control.hasError('maxlength')) return `Maximum length is ${control.errors?.['maxlength'].requiredLength}`;
        }
        return '';
    }
}
