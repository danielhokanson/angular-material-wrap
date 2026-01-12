import { Component, input, output, signal, ViewEncapsulation } from '@angular/core';

import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';

import { BaseComponent } from '../base/base.component';
import { AmwAppearance } from '../../../shared/types/amw-appearance.type';

/**
 * AMW Datepicker Component
 * Inherits from BaseComponent: disabled, required, label, placeholder, errorMessage, hasError,
 * name, id, tabIndex, size, color, ariaLabel, ariaLabelledby, ariaDescribedby, ariaRequired,
 * ariaInvalid, hint, readonly, value, change, focus, blur
 */
@Component({
    selector: 'amw-datepicker',
    standalone: true,
    imports: [
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
            useExisting: AmwDatepickerComponent,
            multi: true
        }
    ],
    templateUrl: './amw-datepicker.component.html',
    styleUrl: './amw-datepicker.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class AmwDatepickerComponent extends BaseComponent<Date> implements ControlValueAccessor {
    // Datepicker-specific properties (inherited from BaseComponent: disabled, required, label,
    // placeholder, errorMessage, hasError, name, id, tabIndex, size, color, ariaLabel,
    // ariaLabelledby, ariaDescribedby, ariaRequired, ariaInvalid, hint, readonly, value, change, focus, blur)

    appearance = input<AmwAppearance>('outline');
    min = input<Date | null>(null);
    max = input<Date | null>(null);
    startAt = input<Date | null>(null);
    touchUi = input<boolean>(false);
    openOnFocus = input<boolean>(true);
    clearable = input<boolean>(true);
    format = input<string>('MM/dd/yyyy');

    dateChange = output<Date | null>();
    opened = output<void>();
    closed = output<void>();

    selectedDate = signal<Date | null>(null);
    isOpen = signal<boolean>(false);

    private onChange = (value: Date | null) => { };
    onTouched = () => { };

    ngOnInit(): void {
        // Initialize if startAt is provided
        const startAtValue = this.startAt();
        if (startAtValue && !this.selectedDate()) {
            this.selectedDate.set(startAtValue);
        }
    }

    onDateChange(date: Date | null): void {
        this.selectedDate.set(date);
        this.onChange(date);
        this.dateChange.emit(date);
    }

    onOpened(): void {
        this.isOpen.set(true);
        this.opened.emit();
    }

    onClosed(): void {
        this.isOpen.set(false);
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
        this.selectedDate.set(value);
    }

    override registerOnChange(fn: (value: Date | null) => void): void {
        this.onChange = fn;
    }

    override registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    override setDisabledState(isDisabled: boolean): void {
        // Note: disabled is a signal input inherited from BaseComponent and cannot be set directly.
        // The disabled state should be managed by the parent component via the input binding.
    }

    getDisplayValue(): string {
        const date = this.selectedDate();
        if (!date) return '';
        return date.toLocaleDateString();
    }
}
