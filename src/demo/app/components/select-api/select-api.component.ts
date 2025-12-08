import { Component, ViewEncapsulation } from '@angular/core';


@Component({
    selector: 'amw-demo-select-api',
    standalone: true,
    imports: [],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './select-api.component.html',
    styleUrl: './select-api.component.scss'
})
export class SelectApiComponent {
    apiDocumentation = {
        inputs: [
            {
                property: 'options',
                type: 'SelectOption[]',
                default: '[]',
                description: 'Array of options to display in the select dropdown'
            },
            {
                property: 'label',
                type: 'string',
                default: 'undefined',
                description: 'Label text displayed above the select field'
            },
            {
                property: 'placeholder',
                type: 'string',
                default: 'undefined',
                description: 'Placeholder text shown when no option is selected'
            },
            {
                property: 'value',
                type: 'any',
                default: 'undefined',
                description: 'Current selected value(s) of the select field'
            },
            {
                property: 'appearance',
                type: "'outline' | 'fill'",
                default: "'outline'",
                description: 'Visual appearance style of the select field'
            },
            {
                property: 'size',
                type: "'small' | 'medium' | 'large'",
                default: "'medium'",
                description: 'Size of the select field'
            },
            {
                property: 'disabled',
                type: 'boolean',
                default: 'false',
                description: 'Whether the select is disabled'
            },
            {
                property: 'required',
                type: 'boolean',
                default: 'false',
                description: 'Whether the select is required for form validation'
            },
            {
                property: 'multiple',
                type: 'boolean',
                default: 'false',
                description: 'Whether multiple options can be selected'
            },
            {
                property: 'icon',
                type: 'string',
                default: 'undefined',
                description: 'Material icon name to display as prefix'
            },
            {
                property: 'hint',
                type: 'string',
                default: 'undefined',
                description: 'Hint text displayed below the select'
            },
            {
                property: 'error',
                type: 'string',
                default: 'undefined',
                description: 'Error message to display below the select'
            }
        ],
        outputs: [
            {
                property: 'valueChange',
                type: 'EventEmitter<any>',
                description: 'Emitted when the selected value changes'
            },
            {
                property: 'selectionChange',
                type: 'EventEmitter<MatSelectChange>',
                description: 'Emitted when the selection changes (includes change event details)'
            },
            {
                property: 'openedChange',
                type: 'EventEmitter<boolean>',
                description: 'Emitted when the select panel is opened or closed'
            }
        ],
        interfaces: [
            {
                name: 'SelectOption',
                description: 'Interface for select option objects',
                properties: [
                    { name: 'value', type: 'any', description: 'The value of the option' },
                    { name: 'label', type: 'string', description: 'The display label of the option' },
                    { name: 'disabled?', type: 'boolean', description: 'Whether the option is disabled' }
                ]
            }
        ],
        usage: {
            description: 'The amw-select component provides a Material Design select dropdown with various customization options.',
            examples: [
                {
                    title: 'Basic Usage',
                    code: `const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' }
];

<amw-select
  [options]="options"
  label="Choose Option"
  placeholder="Select an option">
</amw-select>`
                },
                {
                    title: 'With Validation',
                    code: `<amw-select
  [options]="countryOptions"
  label="Country"
  [required]="true"
  [error]="countryError">
</amw-select>`
                },
                {
                    title: 'Multiple Selection',
                    code: `<amw-select
  [options]="colorOptions"
  [multiple]="true"
  label="Colors"
  placeholder="Select multiple colors">
</amw-select>`
                }
            ]
        }
    };
}
