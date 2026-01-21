import { Component, input, model, ViewEncapsulation } from '@angular/core';

import { FormsModule, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Field } from '@angular/forms/signals';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'amw-toggle',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, Field, MatSlideToggleModule],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-toggle.component.html',
    styleUrl: './amw-toggle.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: AmwToggleComponent,
            multi: true
        }
    ]
})
export class AmwToggleComponent extends BaseComponent<boolean> implements ControlValueAccessor {
    // Toggle-specific properties (inherited from BaseComponent: disabled, required, label, placeholder,
    // errorMessage, hasError, name, id, tabIndex, size, color, ariaLabel, ariaLabelledby, ariaDescribedby,
    // ariaRequired, ariaInvalid, hint, readonly, value, change, focus, blur)

    /**
     * Signal Forms field binding (experimental).
     * Use this for Angular Signal Forms API integration.
     * Mutually exclusive with ngModel and formControl/formControlName.
     * @experimental
     */
    field = input<any>(undefined);

    checked = model<boolean>(false);
    disableRipple = input<boolean>(false);
    labelPosition = input<'before' | 'after'>('after');

    override writeValue(value: any): void {
        this.value.set(value);
        this.checked.set(!!value);
    }

    override setDisabledState(isDisabled: boolean): void {
        // Note: disabled is a signal input from BaseComponent, so we can't set it directly
    }

    onToggleChange(event: any): void {
        this.checked.set(event.checked);
        const newValue = this.checked() ? this.value() : null;
        this.value.set(newValue);

        this.change.emit(newValue);

        this._onChange(newValue);
        this._onTouched();
    }

    override onFocus(event: FocusEvent): void {
        super.onFocus(event);
    }

    override onBlur(event: FocusEvent): void {
        super.onBlur(event);
    }

    getToggleClasses(): string {
        const classes = ['amw-toggle'];

        if (this.color()) {
            classes.push(`amw-toggle--${this.color()}`);
        }

        if (this.disabled()) {
            classes.push('amw-toggle--disabled');
        }

        if (this.hasError()) {
            classes.push('amw-toggle--error');
        }

        if (this.labelPosition() === 'before') {
            classes.push('amw-toggle--label-before');
        }

        return classes.join(' ');
    }
}
