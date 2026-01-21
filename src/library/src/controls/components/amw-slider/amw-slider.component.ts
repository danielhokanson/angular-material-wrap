import { Component, input, output, signal, ViewEncapsulation } from '@angular/core';

import { FormsModule, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Field } from '@angular/forms/signals';
import { MatSliderModule } from '@angular/material/slider';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'amw-slider',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, Field, MatSliderModule],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-slider.component.html',
    styleUrl: './amw-slider.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: AmwSliderComponent,
            multi: true
        }
    ]
})
export class AmwSliderComponent extends BaseComponent<number> implements ControlValueAccessor {
    // Slider-specific properties (inherited from BaseComponent: disabled, required, label, placeholder,
    // errorMessage, hasError, name, id, tabIndex, size, color, ariaLabel, ariaLabelledby, ariaDescribedby,
    // ariaRequired, ariaInvalid, hint, readonly, value, change, focus, blur)

    /**
     * Signal Forms field binding (experimental).
     * Use this for Angular Signal Forms API integration.
     * Mutually exclusive with ngModel and formControl/formControlName.
     * @experimental
     */
    field = input<any>(undefined);

    min = input<number>(0);
    max = input<number>(100);
    step = input<number>(1);
    thumbLabel = input<boolean>(false);
    tickInterval = input<number | 'auto'>(0);
    vertical = input<boolean>(false);
    invert = input<boolean>(false);

    // Slider-specific events
    inputEvent = output<{ value: number; source: any }>();
    sliderChange = output<{ value: number; source: any }>();

    // Internal writable signal for disabled state (for setDisabledState)
    private _disabledInternal = signal<boolean>(false);

    override writeValue(val: number | null): void {
        this.value.set(val || 0);
    }

    override setDisabledState(isDisabled: boolean): void {
        this._disabledInternal.set(isDisabled);
    }

    /** Get the effective disabled state (from input or programmatic) */
    getDisabled(): boolean {
        return this.disabled() || this._disabledInternal();
    }

    onSliderChange(event: any): void {
        this.value.set(event.value);
        const payload = { value: event.value, source: event.source };
        this.sliderChange.emit(payload);
        this.change.emit(event.value);
        this._onChange(event.value);
        this._onTouched();
    }

    onSliderInput(event: any): void {
        this.value.set(event.value);
        this.inputEvent.emit({
            value: event.value,
            source: event.source
        });
    }

    override onFocus(event: FocusEvent): void {
        super.onFocus(event);
    }

    override onBlur(event: FocusEvent): void {
        super.onBlur(event);
    }

    getSliderClasses(): string {
        const classes = ['amw-slider'];

        if (this.color()) {
            classes.push(`amw-slider--${this.color()}`);
        }

        if (this.getDisabled()) {
            classes.push('amw-slider--disabled');
        }

        if (this.hasError()) {
            classes.push('amw-slider--error');
        }

        if (this.vertical()) {
            classes.push('amw-slider--vertical');
        }

        if (this.invert()) {
            classes.push('amw-slider--invert');
        }

        return classes.join(' ');
    }
}
