import { Component, input, output, model, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl } from '@angular/forms';
import { AmwColor } from '../../../shared/types/amw-color.type';
import { AmwSize } from '../../../shared/types/amw-size.type';

/**
 * Base component class for all AMW components
 * Provides form integration and common functionality
 *
 * @template T The type of the component value (defaults to any)
 *
 * @example
 * // String value component
 * export class AmwInputComponent extends BaseComponent<string> { }
 *
 * // Number value component
 * export class AmwSliderComponent extends BaseComponent<number> { }
 *
 * // Boolean value component
 * export class AmwCheckboxComponent extends BaseComponent<boolean> { }
 */
@Component({
    selector: 'amw-base',
    template: '',
    standalone: true,
    encapsulation: ViewEncapsulation.None
})
export abstract class BaseComponent<T = any> implements ControlValueAccessor {
    // ============================================
    // Common Input Properties
    // ============================================

    /** Whether the component is disabled */
    disabled = input<boolean>(false);

    /** Whether the component is required */
    required = input<boolean>(false);

    /** Placeholder text */
    placeholder = input<string>('');

    /** Label text */
    label = input<string>('');

    /** Error message to display */
    errorMessage = input<string>('');

    /** Hint text to display */
    hint = input<string>('');

    /** Whether the field is readonly */
    readonly = input<boolean>(false);

    /** Component name attribute */
    name = input<string>('');

    /** Component id attribute */
    id = input<string>('');

    /** Tab index for keyboard navigation */
    tabIndex = input<number | undefined>(undefined);

    /** Component size */
    size = input<AmwSize>('medium');

    /** Component color theme */
    color = input<AmwColor>('primary');

    // ============================================
    // Accessibility Input Properties
    // ============================================

    /** Aria label for accessibility */
    ariaLabel = input<string | undefined>(undefined);

    /** Aria labelledby reference */
    ariaLabelledby = input<string | undefined>(undefined);

    /** Aria describedby reference */
    ariaDescribedby = input<string | undefined>(undefined);

    /** Aria required attribute */
    ariaRequired = input<boolean | undefined>(undefined);

    /** Aria invalid attribute */
    ariaInvalid = input<boolean | undefined>(undefined);

    // ============================================
    // Model Properties (two-way binding)
    // ============================================

    /** Whether the component has an error - model for two-way binding */
    hasError = model<boolean>(false);

    /** The component value - model for two-way binding */
    value = model<T | null>(null);

    // ============================================
    // Output Events
    // ============================================

    /** Emits when the value changes */
    valueChange = output<T | null>();

    /** Emits on blur */
    blurEvent = output<FocusEvent>();

    /** Emits on focus */
    focusEvent = output<FocusEvent>();

    /** Generic change event */
    change = output<T | null>();

    /** Focus event (alias for focusEvent for component compatibility) */
    focus = output<FocusEvent>();

    /** Blur event (alias for blurEvent for component compatibility) */
    blur = output<FocusEvent>();

    // ============================================
    // ControlValueAccessor Implementation
    // ============================================

    protected _onChange: (value: T | null) => void = () => { };
    protected _onTouched = () => { };

    // NgControl will be injected by individual components if needed
    protected ngControl?: NgControl;

    constructor() {
        // Empty constructor - no NgControl injection to avoid circular dependency
    }

    writeValue(val: T | null): void {
        this.value.set(val);
    }

    registerOnChange(fn: (value: T | null) => void): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this._onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        // Note: disabled is a signal input, so we can't set it directly
        // This is handled by the individual components
    }

    // ============================================
    // Event Handlers
    // ============================================

    onBlur(event: FocusEvent): void {
        this._onTouched();
        this.blurEvent.emit(event);
        this.blur.emit(event);
    }

    onFocus(event: FocusEvent): void {
        this.focusEvent.emit(event);
        this.focus.emit(event);
    }

    // ============================================
    // Helper Methods
    // ============================================

    get isDisabled(): boolean {
        return this.disabled() || (this.ngControl?.control as FormControl)?.disabled || false;
    }

    get isRequired(): boolean {
        return this.required() || (this.ngControl?.control as FormControl)?.hasError('required') || false;
    }

    get hasValidationError(): boolean {
        return this.hasError() || (this.ngControl?.control as FormControl)?.invalid || false;
    }

    get errorText(): string {
        const errorMsg = this.errorMessage();
        if (errorMsg) return errorMsg;
        if (this.ngControl?.control) {
            const control = this.ngControl.control as FormControl;
            if (control.hasError('required')) return 'This field is required';
            if (control.hasError('email')) return 'Please enter a valid email';
            if (control.hasError('minlength')) return `Minimum length is ${control.errors?.['minlength'].requiredLength}`;
            if (control.hasError('maxlength')) return `Maximum length is ${control.errors?.['maxlength'].requiredLength}`;
        }
        return '';
    }

    /**
     * Get Material color (converts 'basic' to 'primary')
     */
    getMaterialColor(): 'primary' | 'accent' | 'warn' {
        return this.color() === 'basic' ? 'primary' : this.color() as 'primary' | 'accent' | 'warn';
    }
}
