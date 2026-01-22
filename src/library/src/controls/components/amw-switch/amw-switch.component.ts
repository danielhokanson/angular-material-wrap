import { Component, input, output, model, ViewEncapsulation } from '@angular/core';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormField } from '@angular/forms/signals';
import { BaseComponent } from '../base/base.component';
import { SwitchConfig } from './interfaces';

@Component({
    selector: 'amw-switch',
    standalone: true,
    imports: [MatSlideToggleModule, FormsModule, ReactiveFormsModule, FormField],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-switch.component.html',
    styleUrl: './amw-switch.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: AmwSwitchComponent,
            multi: true
        }
    ]
})
export class AmwSwitchComponent extends BaseComponent<boolean> implements ControlValueAccessor {
    // Switch-specific properties (inherited from BaseComponent: disabled, required, label, placeholder,
    // errorMessage, hasError, name, id, tabIndex, size, color, ariaLabel, ariaLabelledby, ariaDescribedby,
    // ariaRequired, ariaInvalid, hint, readonly, value, change, focus, blur)

    /**
     * Signal Forms field binding (experimental).
     * Use this for Angular Signal Forms API integration.
     * Mutually exclusive with ngModel and formControl/formControlName.
     * @experimental
     */
    formField = input<any>(undefined);

    checked = model<boolean>(false);
    labelPosition = input<'before' | 'after'>('after');
    indeterminate = input<boolean>(false);

    // Switch-specific events
    checkedChange = output<boolean>();
    switchChange = output<boolean>();

    onCheckedChange(checked: boolean): void {
        this.checked.set(checked);
        this.value.set(checked);
        this.checkedChange.emit(checked);
        this.switchChange.emit(checked);
        this.change.emit(checked);
        this._onChange(checked);
        this._onTouched();
    }

    getConfig(): SwitchConfig {
        return {
            checked: this.checked(),
            disabled: this.disabled(),
            size: this.size(),
            color: this.color(),
            labelPosition: this.labelPosition(),
            indeterminate: this.indeterminate(),
            required: this.required()
        };
    }
}
