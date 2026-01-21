import { Component, input, output, ViewEncapsulation } from '@angular/core';

import { FormsModule, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Field } from '@angular/forms/signals';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatFormFieldAppearance } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AmwButtonComponent } from '../amw-button/amw-button.component';
import { BaseComponent } from '../base/base.component';
import { AmwInputType } from './interfaces/amw-input-type.type';

/**
 * AMW Input Component
 * A comprehensive wrapper around Angular Material Input with enhanced functionality
 * Inherits from BaseComponent: disabled, required, label, placeholder, errorMessage, hasError,
 * name, id, tabIndex, size, color, ariaLabel, ariaLabelledby, ariaDescribedby, ariaRequired,
 * ariaInvalid, hint, readonly, value, change, focus, blur
 */
@Component({
    selector: 'amw-input',
    standalone: true,
    imports: [
    FormsModule,
    ReactiveFormsModule,
    Field,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    AmwButtonComponent
],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-input.component.html',
    styleUrl: './amw-input.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: AmwInputComponent,
            multi: true
        }
    ]
})
export class AmwInputComponent extends BaseComponent<string> implements ControlValueAccessor {
    // Input-specific properties (inherited from BaseComponent: disabled, required, label, placeholder,
    // errorMessage, hasError, name, id, tabIndex, size, color, ariaLabel, ariaLabelledby,
    // ariaDescribedby, ariaRequired, ariaInvalid, hint, readonly, value, change, focus, blur)

    /**
     * Signal Forms field binding (experimental).
     * Use this for Angular Signal Forms API integration.
     * Mutually exclusive with ngModel and formControl/formControlName.
     * @experimental
     */
    field = input<any>(undefined);

    type = input<AmwInputType>('text');
    appearance = input<MatFormFieldAppearance>('outline');
    prefix = input<string>('');
    suffix = input<string>('');
    maxlength = input<number | null>(null);
    minlength = input<number | null>(null);
    max = input<number | null>(null);
    min = input<number | null>(null);
    step = input<number | null>(null);
    pattern = input<string>('');
    autocomplete = input<string>('');
    autofocus = input<boolean>(false);

    // Icon properties
    startIcon = input<string>('');
    endIcon = input<string>('');

    // Feature properties
    clearable = input<boolean>(false);
    showPasswordToggle = input<boolean>(false);
    showCharacterCount = input<boolean>(false);
    showValidationOnBlur = input<boolean>(true);
    showValidationOnChange = input<boolean>(false);
    loading = input<boolean>(false);

    // Validation messages
    validationMessages = input<{
        required?: string;
        email?: string;
        minlength?: string;
        maxlength?: string;
        pattern?: string;
        min?: string;
        max?: string;
    }>({});

    // Internal state
    showPassword: boolean = false;
    characterCount: number = 0;

    // Input-specific events
    inputEvent = output<Event>();
    keydown = output<KeyboardEvent>();
    keyup = output<KeyboardEvent>();
    clear = output<void>();
    togglePassword = output<boolean>();

    override writeValue(val: any): void {
        this.value.set(val || '');
        this.updateCharacterCount();
    }

    // Event handlers
    onInput(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.value.set(target.value);
        this.updateCharacterCount();
        this._onChange(this.value());
        this.inputEvent.emit(event);

        if (this.showValidationOnChange()) {
            this.validateInput();
        }
    }

    onChangeEvent(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.change.emit(target.value);
    }

    override onBlur(event: FocusEvent): void {
        super.onBlur(event);

        if (this.showValidationOnBlur()) {
            this.validateInput();
        }
    }

    override onFocus(event: FocusEvent): void {
        super.onFocus(event);
    }

    onKeydown(event: KeyboardEvent): void {
        this.keydown.emit(event);
    }

    onKeyup(event: KeyboardEvent): void {
        this.keyup.emit(event);
    }

    onClear(): void {
        this.value.set('');
        this.updateCharacterCount();
        this._onChange(this.value());
        this.clear.emit();
    }

    onTogglePassword(): void {
        this.showPassword = !this.showPassword;
        this.togglePassword.emit(this.showPassword);
    }

    // Helper methods
    private updateCharacterCount(): void {
        const val = this.value();
        if (this.showCharacterCount() && typeof val === 'string') {
            this.characterCount = val.length;
        }
    }

    private validateInput(): void {
        // Basic validation logic
        this.hasError.set(this.required() && !this.value());
    }

    get inputType(): string {
        if (this.type() === 'password' && this.showPasswordToggle()) {
            return this.showPassword ? 'text' : 'password';
        }
        return this.type();
    }

    get hasValue(): boolean {
        const val = this.value();
        return val !== '' && val != null;
    }

    get canClear(): boolean {
        return this.clearable() && this.hasValue && !this.disabled() && !this.readonly();
    }

    get canTogglePassword(): boolean {
        return this.showPasswordToggle() && this.type() === 'password' && !this.disabled() && !this.readonly();
    }

    get characterCountText(): string {
        const maxLen = this.maxlength();
        if (!this.showCharacterCount() || !maxLen) return '';
        return `${this.characterCount}/${maxLen}`;
    }

    get isOverLimit(): boolean {
        const maxLen = this.maxlength();
        return maxLen ? this.characterCount > maxLen : false;
    }

    override get errorText(): string {
        const errorMsg = this.errorMessage();
        if (errorMsg) return errorMsg;

        const messages = this.validationMessages();
        if (this.ngControl?.control) {
            const control = this.ngControl.control;
            if (control.hasError('required')) {
                return messages.required || 'This field is required';
            }
            if (control.hasError('email')) {
                return messages.email || 'Please enter a valid email';
            }
            if (control.hasError('minlength')) {
                return messages.minlength || `Minimum length is ${control.errors?.['minlength'].requiredLength}`;
            }
            if (control.hasError('maxlength')) {
                return messages.maxlength || `Maximum length is ${control.errors?.['maxlength'].requiredLength}`;
            }
            if (control.hasError('pattern')) {
                return messages.pattern || 'Please enter a valid format';
            }
            if (control.hasError('min')) {
                return messages.min || `Minimum value is ${control.errors?.['min'].min}`;
            }
            if (control.hasError('max')) {
                return messages.max || `Maximum value is ${control.errors?.['max'].max}`;
            }
        }

        return '';
    }

    override get hasValidationError(): boolean {
        return this.hasError() || (this.ngControl?.control?.invalid) || false;
    }
}
