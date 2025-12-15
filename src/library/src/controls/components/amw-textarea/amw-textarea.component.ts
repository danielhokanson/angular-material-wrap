import { Component, Input, Output, EventEmitter, ViewEncapsulation, forwardRef } from '@angular/core';

import { FormsModule, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseComponent } from '../base/base.component';
import { TextareaAppearance } from './interfaces/textarea-appearance.type';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
    selector: 'amw-textarea',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-textarea.component.html',
    styleUrl: './amw-textarea.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: AmwTextareaComponent,
            multi: true
        }
    ]
})
export class AmwTextareaComponent extends BaseComponent implements ControlValueAccessor {
    @Input() appearance: MatFormFieldAppearance = 'outline';
    @Input() override disabled: boolean = false;
    @Input() override required: boolean = false;
    @Input() override placeholder: string = '';
    @Input() override label: string = '';
    @Input() hint: string = '';
    @Input() name: string = '';
    @Input() id: string = '';
    @Input() tabIndex?: number;
    @Input() maxLength?: number;
    @Input() minLength?: number;
    @Input() rows: number = 4;
    @Input() cols?: number;
    @Input() wrap: 'soft' | 'hard' | 'off' = 'soft';
    @Input() readonly: boolean = false;
    @Input() spellcheck: boolean = true;
    @Input() autocomplete?: string;
    @Input() ariaLabel?: string;
    @Input() ariaLabelledby?: string;
    @Input() ariaDescribedby?: string;
    @Input() ariaRequired?: boolean;
    @Input() ariaInvalid?: boolean;
    @Input() override errorMessage: string = '';
    @Input() override hasError: boolean = false;

    // Events
    @Output() change = new EventEmitter<string>();
    @Output() input = new EventEmitter<string>();
    @Output() override focus = new EventEmitter<FocusEvent>();
    @Output() override blur = new EventEmitter<FocusEvent>();

    // ControlValueAccessor implementation
    override _value: string = '';
    override _onChange = (value: string) => { };
    override _onTouched = () => { };

    override get value(): string {
        return this._value;
    }

    override set value(val: string) {
        this._value = val;
        this._onChange(val);
    }

    override writeValue(value: string): void {
        this._value = value || '';
    }

    override registerOnChange(fn: (value: string) => void): void {
        this._onChange = fn;
    }

    override registerOnTouched(fn: () => void): void {
        this._onTouched = fn;
    }

    override setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onTextareaChange(event: any): void {
        this.value = event.target.value;
        this.change.emit(this.value);
    }

    onTextareaInput(event: any): void {
        this.value = event.target.value;
        this.input.emit(this.value);
    }

    override onFocus(event: FocusEvent): void {
        this.focus.emit(event);
    }

    override onBlur(event: FocusEvent): void {
        this.blur.emit(event);
        this._onTouched();
    }

    getTextareaClasses(): string {
        const classes = ['amw-textarea'];

        if (this.appearance) {
            classes.push(`amw-textarea--${this.appearance}`);
        }

        if (this.disabled) {
            classes.push('amw-textarea--disabled');
        }

        if (this.hasError) {
            classes.push('amw-textarea--error');
        }

        return classes.join(' ');
    }
}
