import { Component, input, output, ViewEncapsulation } from '@angular/core';

import { FormsModule, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormField } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { BaseComponent } from '../base/base.component';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
    selector: 'amw-textarea',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, FormField, MatFormFieldModule, MatInputModule, TextFieldModule],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-textarea.component.html',
    styleUrl: './amw-textarea.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: AmwTextareaComponent,
            multi: true
        }
    ]
})
export class AmwTextareaComponent extends BaseComponent<string> implements ControlValueAccessor {
    // Textarea-specific properties (inherited from BaseComponent: disabled, required, label, placeholder,
    // errorMessage, hasError, name, id, tabIndex, size, color, ariaLabel, ariaLabelledby, ariaDescribedby,
    // ariaRequired, ariaInvalid, hint, readonly, value, change, focus, blur)

    /**
     * Signal Forms field binding (experimental).
     * Use this for Angular Signal Forms API integration.
     * Mutually exclusive with ngModel and formControl/formControlName.
     * @experimental
     */
    formField = input<any>(undefined);

    appearance = input<MatFormFieldAppearance>('outline');
    maxLength = input<number | undefined>(undefined);
    minLength = input<number | undefined>(undefined);
    rows = input<number>(4);
    cols = input<number | undefined>(undefined);
    wrap = input<'soft' | 'hard' | 'off'>('soft');
    spellcheck = input<boolean>(true);
    autocomplete = input<string | undefined>(undefined);

    // Auto-resize properties
    autoResize = input<boolean>(false);
    minRows = input<number>(2);
    maxRows = input<number | undefined>(undefined);

    // Textarea-specific events
    inputEvent = output<string>();

    override writeValue(value: string | null): void {
        this.value.set(value || '');
    }

    override setDisabledState(isDisabled: boolean): void {
        // Note: disabled is a signal input from BaseComponent and can't be set directly
    }

    onTextareaChange(event: any): void {
        const newValue = event.target.value;
        this.value.set(newValue);
        this.change.emit(newValue);
        this._onChange(newValue);
    }

    onTextareaInput(event: any): void {
        const newValue = event.target.value;
        this.value.set(newValue);
        this.inputEvent.emit(newValue);
        this._onChange(newValue);
    }

    override onFocus(event: FocusEvent): void {
        super.onFocus(event);
    }

    override onBlur(event: FocusEvent): void {
        super.onBlur(event);
    }

    getTextareaClasses(): string {
        const classes = ['amw-textarea'];

        if (this.appearance()) {
            classes.push(`amw-textarea--${this.appearance()}`);
        }

        if (this.disabled()) {
            classes.push('amw-textarea--disabled');
        }

        if (this.hasError()) {
            classes.push('amw-textarea--error');
        }

        return classes.join(' ');
    }
}
