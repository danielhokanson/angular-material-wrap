import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
    selector: 'amw-demo-timepicker-api',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatTableModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './timepicker-api.component.html',
    styleUrl: './timepicker-api.component.scss'
})
export class TimepickerApiComponent {
    inputProperties = [
        { name: 'value', type: 'string', default: '', description: 'The current time value in HH:MM or HH:MM:SS format' },
        { name: 'config', type: 'TimepickerConfig', default: '{}', description: 'Configuration object for the timepicker' },
        { name: 'color', type: 'TimepickerColor', default: 'primary', description: 'Color theme of the timepicker' },
        { name: 'size', type: 'TimepickerSize', default: 'medium', description: 'Size variant of the timepicker' },
        { name: 'step', type: 'number', default: '15', description: 'Step interval for minutes (in minutes)' },
        { name: 'format', type: '12h | 24h', default: '24h', description: 'Time format display (12-hour or 24-hour)' },
        { name: 'showSeconds', type: 'boolean', default: 'false', description: 'Whether to show seconds in the timepicker' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the timepicker is disabled' },
        { name: 'required', type: 'boolean', default: 'false', description: 'Whether the timepicker is required' },
        { name: 'placeholder', type: 'string', default: '', description: 'Placeholder text for the input' },
        { name: 'label', type: 'string', default: '', description: 'Label text for the timepicker' },
        { name: 'errorMessage', type: 'string', default: '', description: 'Custom error message to display' },
        { name: 'hasError', type: 'boolean', default: 'false', description: 'Whether the timepicker has an error state' }
    ];

    outputProperties = [
        { name: 'timeChange', type: 'EventEmitter<string>', description: 'Emitted when the time value changes' },
        { name: 'timepickerChange', type: 'EventEmitter<string>', description: 'Emitted when the timepicker value changes (alias for timeChange)' },
        { name: 'valueChange', type: 'EventEmitter<any>', description: 'Emitted when the value changes (inherited from BaseComponent)' },
        { name: 'blur', type: 'EventEmitter<FocusEvent>', description: 'Emitted when the timepicker loses focus' },
        { name: 'focus', type: 'EventEmitter<FocusEvent>', description: 'Emitted when the timepicker gains focus' }
    ];

    configInterface = [
        { name: 'appearance', type: 'fill | outline', default: 'outline', description: 'Form field appearance style' },
        { name: 'placeholder', type: 'string', default: '', description: 'Placeholder text for the input' },
        { name: 'step', type: 'number', default: '15', description: 'Step interval for minutes' },
        { name: 'format', type: '12h | 24h', default: '24h', description: 'Time format display' },
        { name: 'showSeconds', type: 'boolean', default: 'false', description: 'Whether to show seconds' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the timepicker is disabled' },
        { name: 'required', type: 'boolean', default: 'false', description: 'Whether the timepicker is required' },
        { name: 'min', type: 'string', default: '', description: 'Minimum time value (HH:MM format)' },
        { name: 'max', type: 'string', default: '', description: 'Maximum time value (HH:MM format)' }
    ];

    typeDefinitions = [
        { name: 'TimepickerColor', type: 'primary | accent | warn', description: 'Available color themes' },
        { name: 'TimepickerSize', type: 'small | medium | large', description: 'Available size variants' }
    ];

    methods = [
        { name: 'writeValue(value: any)', description: 'Writes a new value to the element (ControlValueAccessor)' },
        { name: 'registerOnChange(fn: (value: any) => void)', description: 'Registers a callback function for value changes' },
        { name: 'registerOnTouched(fn: () => void)', description: 'Registers a callback function for touch events' },
        { name: 'setDisabledState(isDisabled: boolean)', description: 'Sets the disabled state of the control' },
        { name: 'toggleTimepicker()', description: 'Opens or closes the timepicker dropdown' },
        { name: 'selectTime(hours: number, minutes: number, seconds?: number)', description: 'Programmatically select a time' },
        { name: 'incrementHours()', description: 'Increment the hours value' },
        { name: 'decrementHours()', description: 'Decrement the hours value' },
        { name: 'incrementMinutes()', description: 'Increment the minutes value' },
        { name: 'decrementMinutes()', description: 'Decrement the minutes value' },
        { name: 'incrementSeconds()', description: 'Increment the seconds value' },
        { name: 'decrementSeconds()', description: 'Decrement the seconds value' },
        { name: 'toggleAmPm()', description: 'Toggle between AM and PM (12-hour format only)' }
    ];

    displayedColumns = ['name', 'type', 'default', 'description'];
}