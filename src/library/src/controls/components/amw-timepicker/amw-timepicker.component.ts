import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnChanges } from '@angular/core';

import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BaseComponent } from '../base/base.component';
import { TimepickerConfig } from './interfaces';
import { AmwSize } from '../../../shared/types/amw-size.type';
import { AmwColor } from '../../../shared/types/amw-color.type';

@Component({
    selector: 'amw-timepicker',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
    encapsulation: ViewEncapsulation.None,
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
export class AmwTimepickerComponent extends BaseComponent implements OnChanges {
    @Input() override set value(val: string) {
        this._value = val;
        this.timeValue = val || '';
        this.updateTimeFromValue();
    }
    override get value(): string {
        return this._value || '';
    }
    @Input() config: TimepickerConfig = {};
    @Input() color: AmwColor = 'primary';
    @Input() size: AmwSize = 'medium';
    @Input() step = 15; // minutes
    @Input() format: '12h' | '24h' = '24h';
    @Input() showSeconds = false;
    @Input() override disabled = false;
    @Input() override required = false;

    @Output() timeChange = new EventEmitter<string>();
    @Output() timepickerChange = new EventEmitter<string>();

    timeValue = '';
    isOpen = false;
    hours = 0;
    minutes = 0;
    seconds = 0;
    ampm = 'AM';

    ngOnInit() {
        this.timeValue = this.value || '';
        this.updateTimeFromValue();
    }

    ngOnChanges() {
        if (this.value !== this.timeValue) {
            this.timeValue = this.value || '';
            this.updateTimeFromValue();
        }
    }

    override writeValue(value: any): void {
        this._value = value;
        this.timeValue = value || '';
        this.updateTimeFromValue();
    }

    onTimeChange() {
        this.value = this.timeValue;
        this.timeChange.emit(this.timeValue);
        this.timepickerChange.emit(this.timeValue);
    }

    toggleTimepicker() {
        if (!this.disabled) {
            this.isOpen = !this.isOpen;
        }
    }

    selectTime(hours: number, minutes: number, seconds: number = 0) {
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.updateTimeValue();
        this.isOpen = false;
    }

    incrementHours() {
        if (this.hours < 23) {
            this.hours++;
        } else {
            this.hours = 0;
        }
        this.updateTimeValue();
    }

    decrementHours() {
        if (this.hours > 0) {
            this.hours--;
        } else {
            this.hours = 23;
        }
        this.updateTimeValue();
    }

    incrementMinutes() {
        if (this.minutes < 59) {
            this.minutes++;
        } else {
            this.minutes = 0;
            this.incrementHours();
        }
        this.updateTimeValue();
    }

    decrementMinutes() {
        if (this.minutes > 0) {
            this.minutes--;
        } else {
            this.minutes = 59;
            this.decrementHours();
        }
        this.updateTimeValue();
    }

    incrementSeconds() {
        if (this.seconds < 59) {
            this.seconds++;
        } else {
            this.seconds = 0;
            this.incrementMinutes();
        }
        this.updateTimeValue();
    }

    decrementSeconds() {
        if (this.seconds > 0) {
            this.seconds--;
        } else {
            this.seconds = 59;
            this.decrementMinutes();
        }
        this.updateTimeValue();
    }

    toggleAmPm() {
        this.ampm = this.ampm === 'AM' ? 'PM' : 'AM';
        this.updateTimeValue();
    }

    private updateTimeFromValue() {
        if (this.timeValue) {
            const timeParts = this.timeValue.split(':');
            if (timeParts.length >= 2) {
                this.hours = parseInt(timeParts[0], 10);
                this.minutes = parseInt(timeParts[1], 10);
                this.seconds = timeParts.length > 2 ? parseInt(timeParts[2], 10) : 0;

                if (this.format === '12h') {
                    if (this.hours > 12) {
                        this.hours -= 12;
                        this.ampm = 'PM';
                    } else if (this.hours === 0) {
                        this.hours = 12;
                        this.ampm = 'AM';
                    } else if (this.hours === 12) {
                        this.ampm = 'PM';
                    } else {
                        this.ampm = 'AM';
                    }
                }
            }
        }
    }

    private updateTimeValue() {
        let displayHours = this.hours;

        if (this.format === '12h') {
            if (this.ampm === 'PM' && this.hours !== 12) {
                displayHours += 12;
            } else if (this.ampm === 'AM' && this.hours === 12) {
                displayHours = 0;
            }
        }

        const timeString = `${displayHours.toString().padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}${this.showSeconds ? `:${this.seconds.toString().padStart(2, '0')}` : ''}`;

        this.timeValue = timeString;
        this.value = timeString;
        this.timeChange.emit(timeString);
        this.timepickerChange.emit(timeString);
    }

    get displayHours(): number {
        if (this.format === '12h') {
            return this.hours === 0 ? 12 : this.hours > 12 ? this.hours - 12 : this.hours;
        }
        return this.hours;
    }

    override get isDisabled(): boolean {
        return this.disabled || this.isRequired;
    }
}