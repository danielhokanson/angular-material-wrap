import { Component, ViewEncapsulation } from '@angular/core';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';
import { AmwApiDocComponent, ApiInterface } from '../../shared/components/api-doc/api-doc.component';

/**
 * Radio Group API Documentation Component
 * Provides comprehensive API documentation for the AMW Radio Group component
 */
@Component({
    selector: 'app-radio-group-api',
    standalone: true,
    imports: [AmwApiDocComponent],
    templateUrl: './radio-group-api.component.html',
    styleUrl: './radio-group-api.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class RadioGroupApiComponent extends BaseApiComponent {
    apiDocumentation: ApiDocumentation = {
        inputs: [
            {
                name: 'size',
                type: "'small' | 'medium' | 'large'",
                default: "'medium'",
                description: 'Size of the radio group component'
            },
            {
                name: 'label',
                type: 'string',
                default: "''",
                description: 'Label text displayed above the radio group'
            },
            {
                name: 'hint',
                type: 'string',
                default: "''",
                description: 'Hint text displayed below the radio group'
            },
            {
                name: 'disabled',
                type: 'boolean',
                default: 'false',
                description: 'Whether the radio group is disabled'
            },
            {
                name: 'required',
                type: 'boolean',
                default: 'false',
                description: 'Whether the radio group is required'
            },
            {
                name: 'name',
                type: 'string',
                default: "''",
                description: 'Name attribute for the radio group'
            },
            {
                name: 'orientation',
                type: "'horizontal' | 'vertical'",
                default: "'vertical'",
                description: 'Layout orientation of the radio buttons'
            },
            {
                name: 'color',
                type: "'primary' | 'accent' | 'warn'",
                default: "'primary'",
                description: 'Color theme for the radio buttons'
            },
            {
                name: 'options',
                type: 'RadioGroupOption[]',
                default: '[]',
                description: 'Array of radio button options'
            },
            {
                name: 'config',
                type: 'RadioGroupConfig | null',
                default: 'null',
                description: 'Configuration object for the radio group'
            },
            {
                name: 'value',
                type: 'any',
                default: 'null',
                description: 'Current selected value'
            },
            {
                name: 'formField',
                type: 'FormField',
                default: 'undefined',
                description: 'Signal Forms FormField binding (experimental). Mutually exclusive with ngModel and formControl.'
            }
        ],
        outputs: [
            {
                name: 'valueChange',
                type: 'EventEmitter<any>',
                description: 'Emitted when the selected value changes'
            },
            {
                name: 'selectionChange',
                type: 'EventEmitter<RadioGroupOption>',
                description: 'Emitted when a radio button is selected'
            }
        ],
        usageNotes: [
            'This component supports three mutually exclusive form binding approaches:',
            '1. ngModel: Two-way binding with [(ngModel)]="value" for template-driven forms',
            '2. formControl: Reactive forms binding with [formControl]="control" or formControlName',
            '3. formField: Signal Forms binding with [formField]="form.field" (experimental)',
            'Do NOT mix these approaches on the same component instance.',
            'The component implements ControlValueAccessor for ngModel and formControl support.'
        ]
    };

    interfaces: ApiInterface[] = [
        {
            name: 'RadioGroupOption',
            description: 'Interface for radio group option objects',
            properties: [
                { name: 'value', type: 'any', description: 'The value of the option' },
                { name: 'label', type: 'string', description: 'Display label for the option' },
                { name: 'disabled?', type: 'boolean', description: 'Whether the option is disabled' },
                { name: 'icon?', type: 'string', description: 'Material icon name for the option' },
                { name: 'description?', type: 'string', description: 'Additional description text' }
            ]
        },
        {
            name: 'RadioGroupConfig',
            description: 'Interface for radio group configuration objects',
            properties: [
                { name: 'options', type: 'RadioGroupOption[]', description: 'Array of radio button options' },
                { name: 'size?', type: 'AmwSize', description: 'Size of the radio group' },
                { name: 'label?', type: 'string', description: 'Label text for the radio group' },
                { name: 'hint?', type: 'string', description: 'Hint text for the radio group' },
                { name: 'disabled?', type: 'boolean', description: 'Whether the radio group is disabled' },
                { name: 'required?', type: 'boolean', description: 'Whether the radio group is required' },
                { name: 'name?', type: 'string', description: 'Name attribute for the radio group' },
                { name: 'orientation?', type: "'horizontal' | 'vertical'", description: 'Layout orientation' },
                { name: 'color?', type: "'primary' | 'accent' | 'warn'", description: 'Color theme' }
            ]
        }
    ];

    constructor() {
        super();
    }
}
