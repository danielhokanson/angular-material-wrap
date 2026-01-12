import { Component, input, output, signal, ViewEncapsulation, effect } from '@angular/core';

import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AmwButtonComponent } from '../amw-button/amw-button.component';
import { BaseComponent } from '../base/base.component';
import { TimepickerConfig } from './interfaces';

/**
 * AMW Timepicker Component
 * Inherits from BaseComponent: disabled, required, label, placeholder, errorMessage, hasError,
 * name, id, tabIndex, size, color, ariaLabel, ariaLabelledby, ariaDescribedby, ariaRequired,
 * ariaInvalid, hint, readonly, value, change, focus, blur
 */
@Component({
    selector: 'amw-timepicker',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, AmwButtonComponent],
    encapsulation: ViewEncapsulation.None,
    host: { 'data-amw-id': 'amw-timepicker' },
    templateUrl: './amw-timepicker.component.html',
    styleUrl: './amw-timepicker.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: AmwTimepickerComponent,
            multi: true
        }
    ]
})
export class AmwTimepickerComponent extends BaseComponent<string> {
    // Timepicker-specific properties (inherited from BaseComponent: disabled, required, label,
    // placeholder, errorMessage, hasError, name, id, tabIndex, size, color, ariaLabel,
    // ariaLabelledby, ariaDescribedby, ariaRequired, ariaInvalid, hint, readonly, value, change, focus, blur)

    config = input<TimepickerConfig>({});
    step = input<number>(15); // minutes
    format = input<'12h' | '24h'>('24h');
    showSeconds = input<boolean>(false);

    timeChange = output<string>();
    timepickerChange = output<string>();

    timeValue = signal<string>('');
    isOpen = signal<boolean>(false);
    hours = signal<number>(0);
    minutes = signal<number>(0);
    seconds = signal<number>(0);
    ampm = signal<string>('AM');

    constructor() {
        super();
        // Effect to sync value changes to timeValue
        effect(() => {
            const val = this.value();
            if (val !== this.timeValue()) {
                this.timeValue.set(val || '');
                this.updateTimeFromValue();
            }
        });
    }

    ngOnInit() {
        this.timeValue.set(this.value() || '');
        this.updateTimeFromValue();
    }

    override writeValue(val: any): void {
        this.value.set(val || '');
        this.timeValue.set(val || '');
        this.updateTimeFromValue();
    }

    onTimeChange() {
        this.value.set(this.timeValue());
        this.timeChange.emit(this.timeValue());
        this.timepickerChange.emit(this.timeValue());
    }

    toggleTimepicker() {
        if (!this.disabled()) {
            this.isOpen.set(!this.isOpen());
        }
    }

    selectTime(hours: number, minutes: number, seconds: number = 0) {
        this.hours.set(hours);
        this.minutes.set(minutes);
        this.seconds.set(seconds);
        this.updateTimeValue();
        this.isOpen.set(false);
    }

    incrementHours() {
        if (this.hours() < 23) {
            this.hours.set(this.hours() + 1);
        } else {
            this.hours.set(0);
        }
        this.updateTimeValue();
    }

    decrementHours() {
        if (this.hours() > 0) {
            this.hours.set(this.hours() - 1);
        } else {
            this.hours.set(23);
        }
        this.updateTimeValue();
    }

    incrementMinutes() {
        if (this.minutes() < 59) {
            this.minutes.set(this.minutes() + 1);
        } else {
            this.minutes.set(0);
            this.incrementHours();
        }
        this.updateTimeValue();
    }

    decrementMinutes() {
        if (this.minutes() > 0) {
            this.minutes.set(this.minutes() - 1);
        } else {
            this.minutes.set(59);
            this.decrementHours();
        }
        this.updateTimeValue();
    }

    incrementSeconds() {
        if (this.seconds() < 59) {
            this.seconds.set(this.seconds() + 1);
        } else {
            this.seconds.set(0);
            this.incrementMinutes();
        }
        this.updateTimeValue();
    }

    decrementSeconds() {
        if (this.seconds() > 0) {
            this.seconds.set(this.seconds() - 1);
        } else {
            this.seconds.set(59);
            this.decrementMinutes();
        }
        this.updateTimeValue();
    }

    toggleAmPm() {
        this.ampm.set(this.ampm() === 'AM' ? 'PM' : 'AM');
        this.updateTimeValue();
    }

    private updateTimeFromValue() {
        const tv = this.timeValue();
        if (tv) {
            const timeParts = tv.split(':');
            if (timeParts.length >= 2) {
                let h = parseInt(timeParts[0], 10);
                const m = parseInt(timeParts[1], 10);
                const s = timeParts.length > 2 ? parseInt(timeParts[2], 10) : 0;

                this.minutes.set(m);
                this.seconds.set(s);

                if (this.format() === '12h') {
                    if (h > 12) {
                        h -= 12;
                        this.ampm.set('PM');
                    } else if (h === 0) {
                        h = 12;
                        this.ampm.set('AM');
                    } else if (h === 12) {
                        this.ampm.set('PM');
                    } else {
                        this.ampm.set('AM');
                    }
                }
                this.hours.set(h);
            }
        }
    }

    private updateTimeValue() {
        let displayHours = this.hours();

        if (this.format() === '12h') {
            if (this.ampm() === 'PM' && this.hours() !== 12) {
                displayHours += 12;
            } else if (this.ampm() === 'AM' && this.hours() === 12) {
                displayHours = 0;
            }
        }

        const timeString = `${displayHours.toString().padStart(2, '0')}:${this.minutes().toString().padStart(2, '0')}${this.showSeconds() ? `:${this.seconds().toString().padStart(2, '0')}` : ''}`;

        this.timeValue.set(timeString);
        this.value.set(timeString);
        this.timeChange.emit(timeString);
        this.timepickerChange.emit(timeString);
    }

    get displayHours(): number {
        if (this.format() === '12h') {
            return this.hours() === 0 ? 12 : this.hours() > 12 ? this.hours() - 12 : this.hours();
        }
        return this.hours();
    }
}