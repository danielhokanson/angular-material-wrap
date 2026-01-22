import { Component, ViewEncapsulation } from '@angular/core';

import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';
import { AmwApiDocComponent, ApiInterface } from '../../shared/components/api-doc/api-doc.component';

@Component({
    selector: 'amw-demo-timepicker-api',
    standalone: true,
    imports: [AmwApiDocComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './timepicker-api.component.html',
    styleUrl: './timepicker-api.component.scss'
})
export class TimepickerApiComponent extends BaseApiComponent {
    apiDocumentation: ApiDocumentation = {
        inputs: [
            { name: 'value', type: 'string', default: "''", description: 'The current time value in HH:MM or HH:MM:SS format' },
            { name: 'config', type: 'TimepickerConfig', default: '{}', description: 'Configuration object for the timepicker' },
            { name: 'color', type: 'TimepickerColor', default: "'primary'", description: 'Color theme of the timepicker' },
            { name: 'size', type: 'TimepickerSize', default: "'medium'", description: 'Size variant of the timepicker' },
            { name: 'step', type: 'number', default: '15', description: 'Step interval for minutes (in minutes)' },
            { name: 'format', type: "'12h' | '24h'", default: "'24h'", description: 'Time format display (12-hour or 24-hour)' },
            { name: 'showSeconds', type: 'boolean', default: 'false', description: 'Whether to show seconds in the timepicker' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the timepicker is disabled' },
            { name: 'required', type: 'boolean', default: 'false', description: 'Whether the timepicker is required' }
        ],
        outputs: [
            { name: 'timeChange', type: 'EventEmitter<string>', description: 'Emitted when the time value changes' },
            { name: 'valueChange', type: 'EventEmitter<any>', description: 'Emitted when the value changes' },
            { name: 'blur', type: 'EventEmitter<FocusEvent>', description: 'Emitted when the timepicker loses focus' },
            { name: 'focus', type: 'EventEmitter<FocusEvent>', description: 'Emitted when the timepicker gains focus' }
        ]
    };

    interfaces: ApiInterface[] = [
        {
            name: 'TimepickerConfig',
            description: 'Configuration interface for the timepicker',
            properties: [
                { name: 'appearance', type: "'fill' | 'outline'", description: 'Form field appearance style' },
                { name: 'step', type: 'number', description: 'Step interval for minutes' },
                { name: 'format', type: "'12h' | '24h'", description: 'Time format display' },
                { name: 'showSeconds', type: 'boolean', description: 'Whether to show seconds' },
                { name: 'min', type: 'string', description: 'Minimum time value (HH:MM format)' },
                { name: 'max', type: 'string', description: 'Maximum time value (HH:MM format)' }
            ]
        }
    ];

    constructor() {
        super();
    }
}