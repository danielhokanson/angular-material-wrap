import { Component, Input, Output, EventEmitter, ViewEncapsulation, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { BaseComponent } from '../base/base.component';
import { RangeSliderConfig } from './interfaces';
import { AmwColor } from '../../../shared/types/amw-color.type';

@Component({
    selector: 'amw-range-slider',
    standalone: true,
    imports: [CommonModule, MatSliderModule, FormsModule],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-range-slider.component.html',
    styleUrl: './amw-range-slider.component.scss',
    providers: [
        {
            provide: forwardRef(() => BaseComponent),
            useExisting: forwardRef(() => AmwRangeSliderComponent)
        }
    ]
})
export class AmwRangeSliderComponent extends BaseComponent {
    @Input() min = 0;
    @Input() max = 100;
    @Input() step = 1;
    @Input() showTicks = false;
    @Input() showLabels = false;
    @Input() vertical = false;
    @Input() invert = false;
    @Input() thumbLabel = false;
    @Input() tickInterval = 1;
    @Input() valueText = '';
    @Input() startThumbLabel = '';
    @Input() endThumbLabel = '';
    @Input() color: AmwColor = 'primary';

    @Output() rangeChange = new EventEmitter<{ start: number; end: number }>();
    @Output() rangeValueChange = new EventEmitter<{ start: number; end: number }>();

    // Internal range values
    private _rangeValue: { start: number; end: number } = { start: this.min, end: this.max };

    @Input()
    get rangeValue(): { start: number; end: number } {
        return this._rangeValue;
    }

    set rangeValue(value: { start: number; end: number }) {
        if (this._rangeValue !== value) {
            this._rangeValue = value;
            this.value = value;
            this.rangeChange.emit(value);
            this.rangeValueChange.emit(value);
        }
    }

    get startValue(): number {
        return this._rangeValue.start;
    }

    set startValue(value: number) {
        if (this._rangeValue.start !== value) {
            this._rangeValue = { ...this._rangeValue, start: value };
            this.value = this._rangeValue;
            this.rangeChange.emit(this._rangeValue);
        }
    }

    get endValue(): number {
        return this._rangeValue.end;
    }

    set endValue(value: number) {
        if (this._rangeValue.end !== value) {
            this._rangeValue = { ...this._rangeValue, end: value };
            this.value = this._rangeValue;
            this.rangeChange.emit(this._rangeValue);
        }
    }

    onStartValueChange(value: number): void {
        this.startValue = value;
    }

    onEndValueChange(value: number): void {
        this.endValue = value;
    }

    getMaterialColor(): 'primary' | 'accent' | 'warn' {
        return this.color === 'basic' ? 'primary' : this.color as 'primary' | 'accent' | 'warn';
    }

    getConfig(): RangeSliderConfig {
        return {
            min: this.min,
            max: this.max,
            step: this.step,
            disabled: this.disabled,
            showTicks: this.showTicks,
            showLabels: this.showLabels,
            vertical: this.vertical,
            invert: this.invert,
            thumbLabel: this.thumbLabel,
            tickInterval: this.tickInterval,
            valueText: this.valueText,
            startThumbLabel: this.startThumbLabel,
            endThumbLabel: this.endThumbLabel
        };
    }
}
