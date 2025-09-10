import { Component, Input, Output, EventEmitter, ViewEncapsulation, forwardRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BaseComponent } from '../base/base.component';
import { AmwSize } from '../../../shared/types/amw-size.type';
import { RadioGroupOption, RadioGroupConfig } from './interfaces/radio-group.interface';

/**
 * AMW Radio Group Component
 * A comprehensive wrapper around Angular Material Radio Group with enhanced functionality
 * Inherits functionality from select component but with radio button presentation
 */
@Component({
    selector: 'amw-radio-group',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatFormFieldModule,
        MatIconModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-radio-group.component.html',
    styleUrl: './amw-radio-group.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AmwRadioGroupComponent),
            multi: true
        }
    ]
})
export class AmwRadioGroupComponent extends BaseComponent implements ControlValueAccessor, OnInit, OnChanges {
    // Basic radio group properties
    @Input() size: AmwSize = 'medium';
    @Input() override label: string = '';
    @Input() hint: string = '';
    @Input() override disabled: boolean = false;
    @Input() override required: boolean = false;
    @Input() name: string = '';
    @Input() orientation: 'horizontal' | 'vertical' = 'vertical';
    @Input() color: 'primary' | 'accent' | 'warn' = 'primary';

    // Options and configuration
    @Input() options: RadioGroupOption[] = [];
    @Input() config: RadioGroupConfig | null = null;

    // Value and change handling
    @Input() selectedValue: any = null;
    @Output() selectedValueChange = new EventEmitter<any>();
    @Output() selectionChange = new EventEmitter<RadioGroupOption>();

    // Internal state
    internalValue: any = null;
    isFocused: boolean = false;

    // ControlValueAccessor implementation
    private onChange = (value: any) => { };
    private onTouched = () => { };

    ngOnInit(): void {
        this.applyConfig();
        // Sync value with selectedValue
        if (this.selectedValue !== null) {
            this.internalValue = this.selectedValue;
            this.value = this.selectedValue;
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['config'] && this.config) {
            this.applyConfig();
        }
    }

    /**
     * Apply configuration to component properties
     */
    private applyConfig(): void {
        if (this.config) {
            this.options = this.config.options || [];
            this.size = this.config.size || this.size;
            this.label = this.config.label || this.label;
            this.hint = this.config.hint || this.hint;
            this.disabled = this.config.disabled ?? this.disabled;
            this.required = this.config.required ?? this.required;
            this.name = this.config.name || this.name;
            this.orientation = this.config.orientation || this.orientation;
            this.color = this.config.color || this.color;
        }
    }

    /**
     * Handle radio button selection change
     */
    onRadioChange(value: any): void {
        this.internalValue = value;
        this.selectedValue = value;
        this.value = value;
        this.selectedValueChange.emit(value);

        const selectedOption = this.options.find(option => option.value === value);
        if (selectedOption) {
            this.selectionChange.emit(selectedOption);
        }

        this.onChange(value);
        this.onTouched();
    }

    /**
     * Handle focus events
     */
    override onFocus(): void {
        this.isFocused = true;
    }

    /**
     * Handle blur events
     */
    override onBlur(): void {
        this.isFocused = false;
        this.onTouched();
    }

    /**
     * Get CSS classes for the radio group
     */
    get radioGroupClasses(): string {
        const classes = ['amw-radio-group'];

        if (this.size) {
            classes.push(`amw-radio-group--${this.size}`);
        }

        if (this.orientation) {
            classes.push(`amw-radio-group--${this.orientation}`);
        }

        if (this.disabled) {
            classes.push('amw-radio-group--disabled');
        }

        if (this.required) {
            classes.push('amw-radio-group--required');
        }

        if (this.isFocused) {
            classes.push('amw-radio-group--focused');
        }

        return classes.join(' ');
    }

    /**
     * Get CSS classes for individual radio buttons
     */
    getRadioButtonClasses(option: RadioGroupOption): string {
        const classes = ['amw-radio-group__option'];

        if (option.disabled) {
            classes.push('amw-radio-group__option--disabled');
        }

        return classes.join(' ');
    }

    /**
     * Track by function for ngFor
     */
    trackByValue(index: number, option: RadioGroupOption): any {
        return option.value;
    }

    /**
     * Generate unique ID for radio group
     */
    generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }

    // ControlValueAccessor implementation
    override writeValue(value: any): void {
        this.internalValue = value;
        this.selectedValue = value;
        this.value = value;
    }

    override registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    override registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    override setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
