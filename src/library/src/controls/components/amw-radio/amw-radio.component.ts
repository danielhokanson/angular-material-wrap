import { Component, Input, Output, EventEmitter, ViewEncapsulation, forwardRef } from '@angular/core';

import { FormsModule, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { BaseComponent } from '../base/base.component';
import { AmwColor } from '../../../shared/types/amw-color.type';
import { AmwSize } from '../../../shared/types/amw-size.type';

@Component({
    selector: 'amw-radio',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatRadioModule, MatRippleModule],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-radio.component.html',
    styleUrl: './amw-radio.component.scss',
    providers: []
})
export class AmwRadioComponent extends BaseComponent implements ControlValueAccessor {
    @Input() color: AmwColor = 'primary';
    @Input() size: AmwSize = 'medium';
    @Input() override label: string = '';
    @Input() labelPosition: 'before' | 'after' = 'after';
    @Input() override disabled: boolean = false;
    @Input() override required: boolean = false;
    @Input() checked: boolean = false;
    @Input() name: string = '';
    @Input() tabIndex?: number;
    @Input() ariaLabel?: string;
    @Input() ariaLabelledby?: string;
    @Input() ariaDescribedby?: string;
    @Input() ariaRequired?: boolean;
    @Input() ariaInvalid?: boolean;
    @Input() override errorMessage: string = '';
    @Input() override hasError: boolean = false;
    @Input() disableRipple: boolean = false;
    @Input() animationDuration: string = '225ms';
    @Input() animationTimingFunction: string = 'cubic-bezier(0.4, 0.0, 0.2, 1)';

    // Events
    @Output() change = new EventEmitter<{ checked: boolean; value: any }>();
    @Output() override focus = new EventEmitter<FocusEvent>();
    @Output() override blur = new EventEmitter<FocusEvent>();

    // ControlValueAccessor implementation
    override _value: any = null;
    override _onChange = (value: any) => { };
    override _onTouched = () => { };

    override get value(): any {
        return this._value;
    }

    override set value(val: any) {
        this._value = val;
        this._onChange(val);
    }

    override writeValue(value: any): void {
        this._value = value;
        this.checked = this._value === this.value;
    }

    override registerOnChange(fn: (value: any) => void): void {
        this._onChange = fn;
    }

    override registerOnTouched(fn: () => void): void {
        this._onTouched = fn;
    }

    override setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onRadioChange(event: any): void {
        this.checked = event.checked;
        this.value = this.checked ? this.value : null;

        this.change.emit({
            checked: this.checked,
            value: this.value
        });

        this._onChange(this.value);
        this._onTouched();
    }

    override onFocus(event: FocusEvent): void {
        this.focus.emit(event);
    }

    override onBlur(event: FocusEvent): void {
        this.blur.emit(event);
        this._onTouched();
    }

    getMaterialColor(): 'primary' | 'accent' | 'warn' {
        return this.color === 'basic' ? 'primary' : this.color as 'primary' | 'accent' | 'warn';
    }

    getRadioClasses(): string {
        const classes = ['amw-radio'];

        if (this.size) {
            classes.push(`amw-radio--${this.size}`);
        }

        if (this.color) {
            classes.push(`amw-radio--${this.color}`);
        }

        if (this.disabled) {
            classes.push('amw-radio--disabled');
        }

        if (this.hasError) {
            classes.push('amw-radio--error');
        }

        if (this.labelPosition === 'before') {
            classes.push('amw-radio--label-before');
        }

        return classes.join(' ');
    }
}
