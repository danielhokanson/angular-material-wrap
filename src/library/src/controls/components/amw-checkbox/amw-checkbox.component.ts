import { Component, Input, Output, EventEmitter, ViewEncapsulation, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { BaseComponent } from '../base/base.component';
import { CheckboxColor } from './interfaces/checkbox-color.type';
import { CheckboxSize } from './interfaces/checkbox-size.type';

@Component({
    selector: 'amw-checkbox',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatCheckboxModule, MatRippleModule],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-checkbox.component.html',
    styleUrl: './amw-checkbox.component.scss',
    providers: []
})
export class AmwCheckboxComponent extends BaseComponent implements ControlValueAccessor {
    @Input() color: CheckboxColor = 'primary';
    @Input() size: CheckboxSize = 'medium';
    @Input() override label: string = '';
    @Input() labelPosition: 'before' | 'after' = 'after';
    @Input() override disabled: boolean = false;
    @Input() override required: boolean = false;
    @Input() indeterminate: boolean = false;
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
    @Input() disableCheckRipple: boolean = false;
    @Input() animationDuration: string = '225ms';
    @Input() animationTimingFunction: string = 'cubic-bezier(0.4, 0.0, 0.2, 1)';

    // Events
    @Output() change = new EventEmitter<{ checked: boolean; value: any }>();
    @Output() indeterminateChange = new EventEmitter<boolean>();
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
        this.checked = !!value;
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

    onCheckboxChange(event: any): void {
        this.checked = event.checked;
        this.indeterminate = event.indeterminate;
        this.value = this.checked ? this.value : null;

        this.change.emit({
            checked: this.checked,
            value: this.value
        });

        this._onChange(this.value);
        this._onTouched();
    }

    onIndeterminateChange(event: boolean): void {
        this.indeterminate = event;
        this.indeterminateChange.emit(event);
    }

    override onFocus(event: FocusEvent): void {
        this.focus.emit(event);
    }

    override onBlur(event: FocusEvent): void {
        this.blur.emit(event);
        this._onTouched();
    }

    getCheckboxClasses(): string {
        const classes = ['amw-checkbox'];

        if (this.size) {
            classes.push(`amw-checkbox--${this.size}`);
        }

        if (this.color) {
            classes.push(`amw-checkbox--${this.color}`);
        }

        if (this.disabled) {
            classes.push('amw-checkbox--disabled');
        }

        if (this.hasError) {
            classes.push('amw-checkbox--error');
        }

        if (this.labelPosition === 'before') {
            classes.push('amw-checkbox--label-before');
        }

        return classes.join(' ');
    }
}
