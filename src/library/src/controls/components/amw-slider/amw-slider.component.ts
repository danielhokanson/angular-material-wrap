import { Component, Input, Output, EventEmitter, ViewEncapsulation, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { BaseComponent } from '../base/base.component';
import { SliderColor } from './interfaces/slider-color.type';

@Component({
    selector: 'amw-slider',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatSliderModule],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-slider.component.html',
    styleUrl: './amw-slider.component.scss',
    providers: []
})
export class AmwSliderComponent extends BaseComponent implements ControlValueAccessor {
    @Input() color: SliderColor = 'primary';
    @Input() override disabled: boolean = false;
    @Input() min: number = 0;
    @Input() max: number = 100;
    @Input() step: number = 1;
    @Input() thumbLabel: boolean = false;
    @Input() tickInterval: number | 'auto' = 0;
    @Input() vertical: boolean = false;
    @Input() invert: boolean = false;
    @Input() ariaLabel?: string;
    @Input() ariaLabelledby?: string;
    @Input() ariaDescribedby?: string;
    @Input() tabIndex?: number;
    @Input() name?: string;
    @Input() id?: string;
    @Input() override errorMessage: string = '';
    @Input() override hasError: boolean = false;

    // Events
    @Output() change = new EventEmitter<{ value: number; source: any }>();
    @Output() input = new EventEmitter<{ value: number; source: any }>();
    @Output() override focus = new EventEmitter<FocusEvent>();
    @Output() override blur = new EventEmitter<FocusEvent>();

    // ControlValueAccessor implementation
    override _value: number = 0;
    override _onChange = (value: number) => { };
    override _onTouched = () => { };

    override get value(): number {
        return this._value;
    }

    override set value(val: number) {
        this._value = val;
        this._onChange(val);
    }

    override writeValue(value: number): void {
        this._value = value || 0;
    }

    override registerOnChange(fn: (value: number) => void): void {
        this._onChange = fn;
    }

    override registerOnTouched(fn: () => void): void {
        this._onTouched = fn;
    }

    override setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onSliderChange(event: any): void {
        this.value = event.value;
        this.change.emit({
            value: this.value,
            source: event.source
        });
        this._onChange(this.value);
        this._onTouched();
    }

    onSliderInput(event: any): void {
        this.value = event.value;
        this.input.emit({
            value: this.value,
            source: event.source
        });
    }

    override onFocus(event: FocusEvent): void {
        this.focus.emit(event);
    }

    override onBlur(event: FocusEvent): void {
        this.blur.emit(event);
        this._onTouched();
    }

    getSliderClasses(): string {
        const classes = ['amw-slider'];

        if (this.color) {
            classes.push(`amw-slider--${this.color}`);
        }

        if (this.disabled) {
            classes.push('amw-slider--disabled');
        }

        if (this.hasError) {
            classes.push('amw-slider--error');
        }

        if (this.vertical) {
            classes.push('amw-slider--vertical');
        }

        if (this.invert) {
            classes.push('amw-slider--invert');
        }

        return classes.join(' ');
    }

}
