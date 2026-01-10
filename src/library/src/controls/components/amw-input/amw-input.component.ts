import { Component, Input, Output, EventEmitter, ViewEncapsulation, forwardRef } from '@angular/core';

import { FormsModule, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatFormFieldAppearance } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AmwButtonComponent } from '../amw-button/amw-button.component';
import { BaseComponent } from '../base/base.component';
import { InputType } from './interfaces/input-type.type';
import { InputAppearance } from './interfaces/input-appearance.type';
import { AmwSize } from '../../../shared/types/amw-size.type';

/**
 * AMW Input Component
 * A comprehensive wrapper around Angular Material Input with enhanced functionality
 */
@Component({
    selector: 'amw-input',
    standalone: true,
    imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
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
export class AmwInputComponent extends BaseComponent implements ControlValueAccessor {
    // Basic input properties
    @Input() type: InputType = 'text';
    @Input() appearance: MatFormFieldAppearance = 'outline';
    @Input() size: AmwSize = 'medium';
    @Input() override placeholder: string = '';
    @Input() override label: string = '';
    @Input() hint: string = '';
    @Input() prefix: string = '';
    @Input() suffix: string = '';
    @Input() readonly: boolean = false;
    @Input() maxlength: number | null = null;
    @Input() minlength: number | null = null;
    @Input() max: number | null = null;
    @Input() min: number | null = null;
    @Input() step: number | null = null;
    @Input() pattern: string = '';
    @Input() autocomplete: string = '';
    @Input() autofocus: boolean = false;
    @Input() name: string = '';
    @Input() id: string = '';
    @Input() tabIndex?: number;

    // Accessibility properties
    @Input() ariaLabel: string = '';
    @Input() ariaLabelledby: string = '';
    @Input() ariaDescribedby: string = '';
    @Input() ariaRequired: boolean = false;
    @Input() ariaInvalid: boolean = false;

    // Icon properties
    @Input() startIcon: string = '';
    @Input() endIcon: string = '';

    // Feature properties
    @Input() clearable: boolean = false;
    @Input() showPasswordToggle: boolean = false;
    @Input() showCharacterCount: boolean = false;
    @Input() showValidationOnBlur: boolean = true;
    @Input() showValidationOnChange: boolean = false;

    // Validation messages
    @Input() validationMessages: {
        required?: string;
        email?: string;
        minlength?: string;
        maxlength?: string;
        pattern?: string;
        min?: string;
        max?: string;
    } = {};

    // Internal state
    internalValue: string | number = '';
    showPassword: boolean = false;
    characterCount: number = 0;

    // Events
    @Output() input = new EventEmitter<Event>();
    @Output() change = new EventEmitter<Event>();
    @Output() override blur = new EventEmitter<FocusEvent>();
    @Output() override focus = new EventEmitter<FocusEvent>();
    @Output() keydown = new EventEmitter<KeyboardEvent>();
    @Output() keyup = new EventEmitter<KeyboardEvent>();
    @Output() clear = new EventEmitter<void>();
    @Output() togglePassword = new EventEmitter<boolean>();

    // ControlValueAccessor implementation
    private onChange = (value: any) => { };
    private onTouched = () => { };

    override writeValue(value: any): void {
        this.internalValue = value || '';
        this.updateCharacterCount();
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
    onInput(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.internalValue = target.value;
        this.updateCharacterCount();
        this.onChange(this.internalValue);
        this.input.emit(event);

        if (this.showValidationOnChange) {
            this.validateInput();
        }
    }

    onChangeEvent(event: Event): void {
        this.change.emit(event);
    }

    override onBlur(event: FocusEvent): void {
        this.onTouched();
        this.blur.emit(event);

        if (this.showValidationOnBlur) {
            this.validateInput();
        }
    }

    override onFocus(event: FocusEvent): void {
        this.focus.emit(event);
    }

    onKeydown(event: KeyboardEvent): void {
        this.keydown.emit(event);
    }

    onKeyup(event: KeyboardEvent): void {
        this.keyup.emit(event);
    }

    onClear(): void {
        this.internalValue = '';
        this.updateCharacterCount();
        this.onChange(this.internalValue);
        this.clear.emit();
    }

    onTogglePassword(): void {
        this.showPassword = !this.showPassword;
        this.togglePassword.emit(this.showPassword);
    }

    // Helper methods
    private updateCharacterCount(): void {
        if (this.showCharacterCount && typeof this.internalValue === 'string') {
            this.characterCount = this.internalValue.length;
        }
    }

    private validateInput(): void {
        // Basic validation logic
        this.hasError = this.required && !this.internalValue;
    }

    get inputType(): string {
        if (this.type === 'password' && this.showPasswordToggle) {
            return this.showPassword ? 'text' : 'password';
        }
        return this.type;
    }

    get hasValue(): boolean {
        return this.internalValue !== '' && this.internalValue != null;
    }

    get canClear(): boolean {
        return this.clearable && this.hasValue && !this.disabled && !this.readonly;
    }

    get canTogglePassword(): boolean {
        return this.showPasswordToggle && this.type === 'password' && !this.disabled && !this.readonly;
    }

    get characterCountText(): string {
        if (!this.showCharacterCount || !this.maxlength) return '';
        return `${this.characterCount}/${this.maxlength}`;
    }

    get isOverLimit(): boolean {
        return this.maxlength ? this.characterCount > this.maxlength : false;
    }

    override get errorText(): string {
        if (this.errorMessage) return this.errorMessage;

        if (this.ngControl?.control) {
            const control = this.ngControl.control;
            if (control.hasError('required')) {
                return this.validationMessages.required || 'This field is required';
            }
            if (control.hasError('email')) {
                return this.validationMessages.email || 'Please enter a valid email';
            }
            if (control.hasError('minlength')) {
                return this.validationMessages.minlength || `Minimum length is ${control.errors?.['minlength'].requiredLength}`;
            }
            if (control.hasError('maxlength')) {
                return this.validationMessages.maxlength || `Maximum length is ${control.errors?.['maxlength'].requiredLength}`;
            }
            if (control.hasError('pattern')) {
                return this.validationMessages.pattern || 'Please enter a valid format';
            }
            if (control.hasError('min')) {
                return this.validationMessages.min || `Minimum value is ${control.errors?.['min'].min}`;
            }
            if (control.hasError('max')) {
                return this.validationMessages.max || `Maximum value is ${control.errors?.['max'].max}`;
            }
        }

        return '';
    }

    override get hasValidationError(): boolean {
        return this.hasError || (this.ngControl?.control?.invalid) || false;
    }
}
