import { Component, ViewEncapsulation } from '@angular/core';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';
import { AmwApiDocComponent, ApiInterface } from '../../shared/components/api-doc/api-doc.component';

@Component({
    selector: 'amw-demo-chip-input-api',
    standalone: true,
    imports: [AmwApiDocComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './chip-input-api.component.html',
    styleUrl: './chip-input-api.component.scss'
})
export class ChipInputApiComponent extends BaseApiComponent {
    apiDocumentation: ApiDocumentation = {
        inputs: [
            {
                name: 'suggestions',
                type: 'ChipInputOption[]',
                default: '[]',
                description: 'Array of options to display in the autocomplete dropdown'
            },
            {
                name: 'label',
                type: 'string',
                default: 'undefined',
                description: 'Label text displayed above the input'
            },
            {
                name: 'placeholder',
                type: 'string',
                default: 'undefined',
                description: 'Placeholder text shown when input is empty'
            },
            {
                name: 'appearance',
                type: "'outline' | 'fill'",
                default: "'outline'",
                description: 'Visual appearance of the form field'
            },
            {
                name: 'disabled',
                type: 'boolean',
                default: 'false',
                description: 'Whether the chip input is disabled'
            },
            {
                name: 'loading',
                type: 'boolean',
                default: 'false',
                description: 'Shows a loading spinner during async operations'
            },
            {
                name: 'removable',
                type: 'boolean',
                default: 'true',
                description: 'Whether chips can be removed by the user'
            },
            {
                name: 'allowCustomValues',
                type: 'boolean',
                default: 'true',
                description: 'Whether users can add custom values not in suggestions'
            },
            {
                name: 'maxChips',
                type: 'number | null',
                default: 'null',
                description: 'Maximum number of chips allowed (null for unlimited)'
            },
            {
                name: 'separatorKeyCodes',
                type: 'number[]',
                default: '[ENTER, COMMA]',
                description: 'Key codes that trigger adding a new chip'
            },
            {
                name: 'addOnBlur',
                type: 'boolean',
                default: 'true',
                description: 'Whether to add chip when input loses focus'
            },
            {
                name: 'displayWith',
                type: '(option: ChipInputOption) => string',
                default: 'opt => opt?.label',
                description: 'Function to format chip display text'
            },
            {
                name: 'filterDebounce',
                type: 'number',
                default: '300',
                description: 'Debounce time in ms for filtering suggestions'
            },
            {
                name: 'hint',
                type: 'string',
                default: 'undefined',
                description: 'Hint text displayed below the input'
            },
            {
                name: 'errorMessage',
                type: 'string',
                default: 'undefined',
                description: 'Error message to display when hasError is true'
            },
            {
                name: 'hasError',
                type: 'boolean',
                default: 'false',
                description: 'Whether to display error state'
            }
        ],
        outputs: [
            {
                name: 'chipAdded',
                type: 'EventEmitter<ChipInputOption>',
                description: 'Emitted when a chip is added'
            },
            {
                name: 'chipRemoved',
                type: 'EventEmitter<ChipInputOption>',
                description: 'Emitted when a chip is removed'
            },
            {
                name: 'inputChanged',
                type: 'EventEmitter<string>',
                description: 'Emitted when the input value changes (debounced)'
            },
            {
                name: 'suggestionSelected',
                type: 'EventEmitter<ChipInputOption>',
                description: 'Emitted when a suggestion is selected from dropdown'
            }
        ]
    };

    interfaces: ApiInterface[] = [
        {
            name: 'ChipInputOption',
            description: 'Interface for chip input options',
            properties: [
                { name: 'value', type: 'any', description: 'Unique identifier' },
                { name: 'label', type: 'string', description: 'Display text' },
                { name: 'icon', type: 'string', description: 'Optional Material icon name' },
                { name: 'subtitle', type: 'string', description: 'Optional secondary text' },
                { name: 'isCustom', type: 'boolean', description: 'Whether user-created' },
                { name: 'disabled', type: 'boolean', description: 'Whether option is disabled' },
                { name: 'data', type: 'any', description: 'Additional custom data' }
            ]
        }
    ];

    constructor() {
        super();
    }
}
