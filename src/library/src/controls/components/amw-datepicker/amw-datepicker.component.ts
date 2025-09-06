import { Component, Input, Output, EventEmitter, forwardRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';

import { BaseComponent } from '../base/base.component';

export type DatepickerSize = 'small' | 'medium' | 'large';
export type DatepickerAppearance = 'outline' | 'fill';

@Component({
    selector: 'amw-datepicker',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatNativeDateModule
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AmwDatepickerComponent),
            multi: true
        }
    ],
    templateUrl: './amw-datepicker.component.html',
    styleUrl: './amw-datepicker.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class AmwDatepickerComponent extends BaseComponent implements ControlValueAccessor {
    @Input() override placeholder: string = '';
    @Input() override label: string = '';
    @Input() hint: string = '';
    @Input() override required: boolean = false;
    @Input() override disabled: boolean = false;
    @Input() readonly: boolean = false;
    @Input() size: DatepickerSize = 'medium';
    @Input() appearance: DatepickerAppearance = 'outline';
    @Input() min: Date | null = null;
    @Input() max: Date | null = null;
    @Input() startAt: Date | null = null;
    @Input() touchUi: boolean = false;
    @Input() openOnFocus: boolean = true;
    @Input() clearable: boolean = true;
    @Input() format: string = 'MM/dd/yyyy';

    @Output() dateChange = new EventEmitter<Date | null>();
    @Output() opened = new EventEmitter<void>();
    @Output() closed = new EventEmitter<void>();

    selectedDate: Date | null = null;
    isOpen = false;

    private onChange = (value: Date | null) => { };
    onTouched = () => { };

    ngOnInit(): void {
        // Initialize if startAt is provided
        if (this.startAt && !this.selectedDate) {
            this.selectedDate = this.startAt;
        }
    }

    onDateChange(date: Date | null): void {
        this.selectedDate = date;
        this.onChange(date);
        this.dateChange.emit(date);
    }

    onOpened(): void {
        this.isOpen = true;
        this.opened.emit();
    }

    onClosed(): void {
        this.isOpen = false;
        this.closed.emit();
    }

    onClear(): void {
        this.onDateChange(null);
    }

    onInputChange(event: any): void {
        const value = event.target?.value || '';
        if (!value) {
            this.onDateChange(null);
        }
    }

    // ControlValueAccessor implementation
    override writeValue(value: Date | null): void {
        this.selectedDate = value;
    }

    override registerOnChange(fn: (value: Date | null) => void): void {
        this.onChange = fn;
    }

    override registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    override setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    getDisplayValue(): string {
        if (!this.selectedDate) return '';
        return this.selectedDate.toLocaleDateString();
    }
}
