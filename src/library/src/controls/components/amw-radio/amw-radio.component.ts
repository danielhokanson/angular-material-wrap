import { Component, input, model, ViewEncapsulation } from '@angular/core';

import { FormsModule, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormField } from '@angular/forms/signals';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'amw-radio',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, FormField, MatRadioModule, MatRippleModule],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-radio.component.html',
    styleUrl: './amw-radio.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: AmwRadioComponent,
            multi: true
        }
    ]
})
export class AmwRadioComponent extends BaseComponent<any> implements ControlValueAccessor {
    // Radio-specific properties (inherited from BaseComponent: disabled, required, label, placeholder,
    // errorMessage, hasError, name, id, tabIndex, size, color, ariaLabel, ariaLabelledby, ariaDescribedby,
    // ariaRequired, ariaInvalid, hint, readonly, value, change, focus, blur)

    /**
     * Signal Forms field binding (experimental).
     * Use this for Angular Signal Forms API integration.
     * Mutually exclusive with ngModel and formControl/formControlName.
     * @experimental
     */
    formField = input<any>(undefined);

    labelPosition = input<'before' | 'after'>('after');
    checked = model<boolean>(false);
    radioValue = input<any>(undefined);
    disableRipple = input<boolean>(false);
    animationDuration = input<string>('225ms');
    animationTimingFunction = input<string>('cubic-bezier(0.4, 0.0, 0.2, 1)');

    override writeValue(value: any): void {
        this.value.set(value);
        this.checked.set(value === this.radioValue());
    }

    override setDisabledState(isDisabled: boolean): void {
        // Note: disabled is a signal input from BaseComponent, cannot be set directly
    }

    onRadioChange(event: any): void {
        this.checked.set(event.checked);
        const newValue = this.checked() ? this.radioValue() : null;
        this.value.set(newValue);

        this.change.emit({
            checked: this.checked(),
            value: newValue
        });

        this._onChange(newValue);
        this._onTouched();
    }

    override onFocus(event: FocusEvent): void {
        super.onFocus(event);
    }

    override onBlur(event: FocusEvent): void {
        super.onBlur(event);
    }

    getRadioClasses(): string {
        const classes = ['amw-radio'];

        if (this.size()) {
            classes.push(`amw-radio--${this.size()}`);
        }

        if (this.color()) {
            classes.push(`amw-radio--${this.color()}`);
        }

        if (this.disabled()) {
            classes.push('amw-radio--disabled');
        }

        if (this.hasError()) {
            classes.push('amw-radio--error');
        }

        if (this.labelPosition() === 'before') {
            classes.push('amw-radio--label-before');
        }

        return classes.join(' ');
    }
}
