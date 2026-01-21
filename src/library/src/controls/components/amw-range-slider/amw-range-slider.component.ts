import { Component, input, output, signal, ViewEncapsulation, effect } from '@angular/core';

import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Field } from '@angular/forms/signals';
import { BaseComponent } from '../base/base.component';
import { RangeSliderConfig } from './interfaces';

/**
 * AMW Range Slider Component
 * Inherits from BaseComponent: disabled, required, label, placeholder, errorMessage, hasError,
 * name, id, tabIndex, size, color, ariaLabel, ariaLabelledby, ariaDescribedby, ariaRequired,
 * ariaInvalid, hint, readonly, value, change, focus, blur
 */
@Component({
    selector: 'amw-range-slider',
    standalone: true,
    imports: [MatSliderModule, FormsModule, ReactiveFormsModule, Field],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-range-slider.component.html',
    styleUrl: './amw-range-slider.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: AmwRangeSliderComponent,
            multi: true
        }
    ]
})
export class AmwRangeSliderComponent extends BaseComponent<{ start: number; end: number }> implements ControlValueAccessor {
    // Range slider-specific properties (inherited from BaseComponent: disabled, required, label,
    // placeholder, errorMessage, hasError, name, id, tabIndex, size, color, ariaLabel,
    // ariaLabelledby, ariaDescribedby, ariaRequired, ariaInvalid, hint, readonly, value, change, focus, blur)

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
    showTicks = input<boolean>(false);
    showLabels = input<boolean>(false);
    vertical = input<boolean>(false);
    invert = input<boolean>(false);
    thumbLabel = input<boolean>(false);
    tickInterval = input<number>(1);
    valueText = input<string>('');
    startThumbLabel = input<string>('');
    endThumbLabel = input<string>('');

    rangeChange = output<{ start: number; end: number }>();
    rangeValueChange = output<{ start: number; end: number }>();

    // Internal range values as signal
    private _rangeValue = signal<{ start: number; end: number }>({ start: 0, end: 100 });

    // Input for rangeValue using model-like pattern
    rangeValueInput = input<{ start: number; end: number } | undefined>(undefined, { alias: 'rangeValue' });

    constructor() {
        super();
        // Effect to sync rangeValueInput with internal signal
        effect(() => {
            const inputValue = this.rangeValueInput();
            if (inputValue !== undefined) {
                this._rangeValue.set(inputValue);
                this.value.set(inputValue);
                this.rangeChange.emit(inputValue);
                this.rangeValueChange.emit(inputValue);
            }
        });
    }

    get rangeValue(): { start: number; end: number } {
        return this._rangeValue();
    }

    get startValue(): number {
        return this._rangeValue().start;
    }

    set startValue(val: number) {
        const current = this._rangeValue();
        if (current.start !== val) {
            const newValue = { ...current, start: val };
            this._rangeValue.set(newValue);
            this.value.set(newValue);
            this.rangeChange.emit(newValue);
        }
    }

    get endValue(): number {
        return this._rangeValue().end;
    }

    set endValue(val: number) {
        const current = this._rangeValue();
        if (current.end !== val) {
            const newValue = { ...current, end: val };
            this._rangeValue.set(newValue);
            this.value.set(newValue);
            this.rangeChange.emit(newValue);
        }
    }

    onStartValueChange(value: number): void {
        this.startValue = value;
    }

    onEndValueChange(value: number): void {
        this.endValue = value;
    }

    getConfig(): RangeSliderConfig {
        return {
            min: this.min(),
            max: this.max(),
            step: this.step(),
            disabled: this.disabled(),
            showTicks: this.showTicks(),
            showLabels: this.showLabels(),
            vertical: this.vertical(),
            invert: this.invert(),
            thumbLabel: this.thumbLabel(),
            tickInterval: this.tickInterval(),
            valueText: this.valueText(),
            startThumbLabel: this.startThumbLabel(),
            endThumbLabel: this.endThumbLabel()
        };
    }
}
