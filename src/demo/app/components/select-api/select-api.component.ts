import { Component, ViewEncapsulation } from '@angular/core';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';

@Component({
    selector: 'amw-demo-select-api',
    standalone: true,
    imports: [
    
],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './select-api.component.html',
    styleUrl: './select-api.component.scss'
})
export class SelectApiComponent extends BaseApiComponent {
    apiDocumentation: ApiDocumentation = {
        inputs: [
            {
                name: 'options',
                type: 'SelectOption[]',
                default: '[]',
                description: 'Array of options to display in the select dropdown'
            },
            {
                name: 'label',
                type: 'string',
                default: 'undefined',
                description: 'Label text displayed above the select field'
            },
            {
                name: 'placeholder',
                type: 'string',
                default: 'undefined',
                description: 'Placeholder text shown when no option is selected'
            },
            {
                name: 'value',
                type: 'any',
                default: 'undefined',
                description: 'Current selected value(s) of the select field'
            },
            {
                name: 'appearance',
                type: "'outline' | 'fill'",
                default: "'outline'",
                description: 'Visual appearance style of the select field'
            },
            {
                name: 'size',
                type: "'small' | 'medium' | 'large'",
                default: "'medium'",
                description: 'Size of the select field'
            },
            {
                name: 'disabled',
                type: 'boolean',
                default: 'false',
                description: 'Whether the select is disabled'
            },
            {
                name: 'required',
                type: 'boolean',
                default: 'false',
                description: 'Whether the select is required for form validation'
            },
            {
                name: 'multiple',
                type: 'boolean',
                default: 'false',
                description: 'Whether multiple options can be selected'
            },
            {
                name: 'icon',
                type: 'string',
                default: 'undefined',
                description: 'Material icon name to display as prefix'
            },
            {
                name: 'hint',
                type: 'string',
                default: 'undefined',
                description: 'Hint text displayed below the select'
            },
            {
                name: 'error',
                type: 'string',
                default: 'undefined',
                description: 'Error message to display below the select'
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
                type: 'EventEmitter<MatSelectChange>',
                description: 'Emitted when the selection changes (includes change event details)'
            },
            {
                name: 'openedChange',
                type: 'EventEmitter<boolean>',
                description: 'Emitted when the select panel is opened or closed'
            }
        ]
    };

    interfaces = [
        {
            name: 'SelectOption',
            description: 'Interface for select option objects',
            properties: [
                { name: 'value', type: 'any', description: 'The value of the option' },
                { name: 'label', type: 'string', description: 'The display label of the option' },
                { name: 'disabled?', type: 'boolean', description: 'Whether the option is disabled' }
            ]
        }
    ];

    constructor() {
        super();
    }
}
