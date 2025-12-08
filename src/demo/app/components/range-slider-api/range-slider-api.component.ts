import { Component, ViewEncapsulation } from '@angular/core';

import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'amw-demo-range-slider-api',
    standalone: true,
    imports: [MatCardModule],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './range-slider-api.component.html',
    styleUrl: './range-slider-api.component.scss'
})
export class RangeSliderApiComponent {
    apiDocumentation = {
        inputs: [
            {
                property: 'min',
                type: 'number',
                default: '0',
                description: 'The minimum value for the range slider'
            },
            {
                property: 'max',
                type: 'number',
                default: '100',
                description: 'The maximum value for the range slider'
            },
            {
                property: 'step',
                type: 'number',
                default: '1',
                description: 'The step increment for the range slider'
            },
            {
                property: 'rangeValue',
                type: '{ start: number; end: number }',
                default: '{ start: min, end: max }',
                description: 'The current range value with start and end properties'
            },
            {
                property: 'showTicks',
                type: 'boolean',
                default: 'false',
                description: 'Whether to show tick marks on the slider'
            },
            {
                property: 'showLabels',
                type: 'boolean',
                default: 'false',
                description: 'Whether to show value labels on the slider'
            },
            {
                property: 'vertical',
                type: 'boolean',
                default: 'false',
                description: 'Whether to display the slider vertically'
            },
            {
                property: 'invert',
                type: 'boolean',
                default: 'false',
                description: 'Whether to invert the slider direction'
            },
            {
                property: 'thumbLabel',
                type: 'boolean',
                default: 'false',
                description: 'Whether to show thumb labels on hover'
            },
            {
                property: 'tickInterval',
                type: 'number',
                default: '1',
                description: 'Interval between tick marks'
            },
            {
                property: 'valueText',
                type: 'string',
                default: '""',
                description: 'Custom text to display for values'
            },
            {
                property: 'startThumbLabel',
                type: 'string',
                default: '""',
                description: 'Label for the start thumb'
            },
            {
                property: 'endThumbLabel',
                type: 'string',
                default: '""',
                description: 'Label for the end thumb'
            },
            {
                property: 'color',
                type: 'RangeSliderColor',
                default: 'primary',
                description: 'Color theme for the slider (primary, accent, warn)'
            },
            {
                property: 'disabled',
                type: 'boolean',
                default: 'false',
                description: 'Whether the slider is disabled'
            },
            {
                property: 'label',
                type: 'string',
                default: '""',
                description: 'Label text for the range slider'
            },
            {
                property: 'errorMessage',
                type: 'string',
                default: '""',
                description: 'Custom error message to display'
            },
            {
                property: 'hasError',
                type: 'boolean',
                default: 'false',
                description: 'Whether the slider is in an error state'
            }
        ],
        outputs: [
            {
                property: 'rangeChange',
                type: 'EventEmitter<{ start: number; end: number }>',
                description: 'Emitted when the range value changes'
            },
            {
                property: 'valueChange',
                type: 'EventEmitter<{ start: number; end: number }>',
                description: 'Emitted when the range value changes (for form integration)'
            },
            {
                property: 'blur',
                type: 'EventEmitter<FocusEvent>',
                description: 'Emitted when the slider loses focus'
            },
            {
                property: 'focus',
                type: 'EventEmitter<FocusEvent>',
                description: 'Emitted when the slider gains focus'
            }
        ],
        methods: [
            {
                method: 'getConfig()',
                returns: 'RangeSliderConfig',
                description: 'Returns the current configuration object'
            }
        ],
        types: [
            {
                type: 'RangeSliderColor',
                definition: "'primary' | 'accent' | 'warn'",
                description: 'Available color themes for the range slider'
            },
            {
                type: 'RangeSliderConfig',
                definition: 'interface RangeSliderConfig { min: number; max: number; step: number; disabled: boolean; showTicks: boolean; showLabels: boolean; vertical: boolean; invert: boolean; thumbLabel: boolean; tickInterval: number; valueText: string; startThumbLabel: string; endThumbLabel: string; }',
                description: 'Configuration interface for the range slider'
            }
        ]
    };
}



