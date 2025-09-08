import { Component, Input, Output, EventEmitter, ViewEncapsulation, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BaseComponent } from '../base/base.component';
import { AmwColor } from '../../../shared/types/amw-color.type';

@Component({
    selector: 'amw-toggle',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatSlideToggleModule],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-toggle.component.html',
    styleUrl: './amw-toggle.component.scss',
    providers: []
})
export class AmwToggleComponent extends BaseComponent implements ControlValueAccessor {
    @Input() color: AmwColor = 'primary';
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
    @Input() labelPosition: 'before' | 'after' = 'after';
    @Input() override label: string = '';

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

    onToggleChange(event: any): void {
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

    getToggleClasses(): string {
        const classes = ['amw-toggle'];

        if (this.color) {
            classes.push(`amw-toggle--${this.color}`);
        }

        if (this.disabled) {
            classes.push('amw-toggle--disabled');
        }

        if (this.hasError) {
            classes.push('amw-toggle--error');
        }

        if (this.labelPosition === 'before') {
            classes.push('amw-toggle--label-before');
        }

        return classes.join(' ');
    }
}
