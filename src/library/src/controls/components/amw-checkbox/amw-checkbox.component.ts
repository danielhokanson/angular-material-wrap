import { Component, input, output, model, ViewEncapsulation } from '@angular/core';

import { FormsModule, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'amw-checkbox',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatCheckboxModule, MatRippleModule],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-checkbox.component.html',
    styleUrl: './amw-checkbox.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: AmwCheckboxComponent,
            multi: true
        }
    ]
})
export class AmwCheckboxComponent extends BaseComponent<boolean> implements ControlValueAccessor {
    // Checkbox-specific properties (inherited: disabled, required, label, placeholder, errorMessage, hasError,
    // name, id, tabIndex, size, color, ariaLabel, ariaLabelledby, ariaDescribedby, ariaRequired, ariaInvalid,
    // value, focus, blur, change)

    labelPosition = input<'before' | 'after'>('after');
    indeterminate = model<boolean>(false);
    checked = model<boolean>(false);
    disableRipple = input<boolean>(false);
    disableCheckRipple = input<boolean>(false);
    animationDuration = input<string>('225ms');
    animationTimingFunction = input<string>('cubic-bezier(0.4, 0.0, 0.2, 1)');

    // Checkbox-specific events
    indeterminateChange = output<boolean>();
    checkboxChange = output<{ checked: boolean; value: any }>();

    override writeValue(value: any): void {
        this.value.set(value);
        this.checked.set(!!value);
    }

    override setDisabledState(isDisabled: boolean): void {
        // Note: disabled is a signal input from BaseComponent and can't be set directly
        // The parent component should handle disabled state through the input binding
    }

    onCheckboxChange(event: any): void {
        this.checked.set(event.checked);
        this.indeterminate.set(event.indeterminate);
        const newValue = this.checked() ? this.value() : null;
        this.value.set(newValue);

        this.checkboxChange.emit({
            checked: this.checked(),
            value: newValue
        });
        this.change.emit(newValue);

        this._onChange(newValue);
        this._onTouched();
    }

    onIndeterminateChange(event: boolean): void {
        this.indeterminate.set(event);
        this.indeterminateChange.emit(event);
    }

    override onFocus(event: FocusEvent): void {
        super.onFocus(event);
    }

    override onBlur(event: FocusEvent): void {
        super.onBlur(event);
    }

    getCheckboxClasses(): string {
        const classes = ['amw-checkbox'];

        if (this.size()) {
            classes.push(`amw-checkbox--${this.size()}`);
        }

        if (this.color()) {
            classes.push(`amw-checkbox--${this.color()}`);
        }

        if (this.disabled()) {
            classes.push('amw-checkbox--disabled');
        }

        if (this.hasError()) {
            classes.push('amw-checkbox--error');
        }

        if (this.labelPosition() === 'before') {
            classes.push('amw-checkbox--label-before');
        }

        return classes.join(' ');
    }
}
