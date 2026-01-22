import { Component, ViewEncapsulation } from '@angular/core';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';
import { AmwApiDocComponent } from '../../shared/components/api-doc/api-doc.component';

@Component({
    selector: 'amw-demo-range-slider-api',
    standalone: true,
    imports: [AmwApiDocComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './range-slider-api.component.html',
    styleUrl: './range-slider-api.component.scss'
})
export class RangeSliderApiComponent extends BaseApiComponent {
    apiDocumentation: ApiDocumentation = {
        inputs: [
            {
                name: 'min',
                type: 'number',
                default: '0',
                description: 'The minimum value for the range slider'
            },
            {
                name: 'max',
                type: 'number',
                default: '100',
                description: 'The maximum value for the range slider'
            },
            {
                name: 'step',
                type: 'number',
                default: '1',
                description: 'The step increment for the range slider'
            },
            {
                name: 'rangeValue',
                type: '{ start: number; end: number }',
                default: '{ start: min, end: max }',
                description: 'The current range value with start and end properties'
            },
            {
                name: 'showTicks',
                type: 'boolean',
                default: 'false',
                description: 'Whether to show tick marks on the slider'
            },
            {
                name: 'showLabels',
                type: 'boolean',
                default: 'false',
                description: 'Whether to show value labels on the slider'
            },
            {
                name: 'vertical',
                type: 'boolean',
                default: 'false',
                description: 'Whether to display the slider vertically'
            },
            {
                name: 'invert',
                type: 'boolean',
                default: 'false',
                description: 'Whether to invert the slider direction'
            },
            {
                name: 'thumbLabel',
                type: 'boolean',
                default: 'false',
                description: 'Whether to show thumb labels on hover'
            },
            {
                name: 'tickInterval',
                type: 'number',
                default: '1',
                description: 'Interval between tick marks'
            },
            {
                name: 'valueText',
                type: 'string',
                default: '""',
                description: 'Custom text to display for values'
            },
            {
                name: 'startThumbLabel',
                type: 'string',
                default: '""',
                description: 'Label for the start thumb'
            },
            {
                name: 'endThumbLabel',
                type: 'string',
                default: '""',
                description: 'Label for the end thumb'
            },
            {
                name: 'color',
                type: 'RangeSliderColor',
                default: 'primary',
                description: 'Color theme for the slider (primary, accent, warn)'
            },
            {
                name: 'disabled',
                type: 'boolean',
                default: 'false',
                description: 'Whether the slider is disabled'
            },
            {
                name: 'label',
                type: 'string',
                default: '""',
                description: 'Label text for the range slider'
            },
            {
                name: 'errorMessage',
                type: 'string',
                default: '""',
                description: 'Custom error message to display'
            },
            {
                name: 'hasError',
                type: 'boolean',
                default: 'false',
                description: 'Whether the slider is in an error state'
            },
            {
                name: 'formField',
                type: 'FormField',
                default: 'undefined',
                description: 'Signal Forms FormField binding (experimental). Uses {start, end} value type. Mutually exclusive with ngModel and formControl.'
            }
        ],
        outputs: [
            {
                name: 'rangeChange',
                type: 'EventEmitter<{ start: number; end: number }>',
                description: 'Emitted when the range value changes'
            },
            {
                name: 'valueChange',
                type: 'EventEmitter<{ start: number; end: number }>',
                description: 'Emitted when the range value changes (for form integration)'
            },
            {
                name: 'blur',
                type: 'EventEmitter<FocusEvent>',
                description: 'Emitted when the slider loses focus'
            },
            {
                name: 'focus',
                type: 'EventEmitter<FocusEvent>',
                description: 'Emitted when the slider gains focus'
            }
        ],
        methods: [
            {
                name: 'getConfig()',
                returns: 'RangeSliderConfig',
                description: 'Returns the current configuration object'
            }
        ],
        usageNotes: [
            'This component supports three mutually exclusive form binding approaches:',
            '1. ngModel: Two-way binding with [(ngModel)]="rangeValue" for template-driven forms',
            '2. formControl: Reactive forms binding with [formControl]="control" or formControlName',
            '3. formField: Signal Forms binding with [formField]="form.field" (experimental)',
            'Do NOT mix these approaches on the same component instance.',
            'The component implements ControlValueAccessor for ngModel and formControl support.',
            'Range value is an object with {start, end} properties.'
        ]
    };

    types = [
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
    ];
    constructor() {

        super();

    }

}

