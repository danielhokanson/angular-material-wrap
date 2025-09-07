import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'amw-demo-input-api',
    standalone: true,
    imports: [CommonModule],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './input-api.component.html',
    styleUrl: './input-api.component.scss'
})
export class InputApiComponent {
    apiDocumentation = {
        inputs: [
            {
                property: 'label',
                type: 'string',
                default: 'undefined',
                description: 'Label text displayed above the input field'
            },
            {
                property: 'placeholder',
                type: 'string',
                default: 'undefined',
                description: 'Placeholder text shown when input is empty'
            },
            {
                property: 'value',
                type: 'string',
                default: 'undefined',
                description: 'Current value of the input field'
            },
            {
                property: 'type',
                type: 'string',
                default: "'text'",
                description: 'HTML input type (text, email, password, number, tel, url, search)'
            },
            {
                property: 'appearance',
                type: "'outline' | 'fill'",
                default: "'outline'",
                description: 'Visual appearance style of the input field'
            },
            {
                property: 'size',
                type: "'small' | 'medium' | 'large'",
                default: "'medium'",
                description: 'Size of the input field'
            },
            {
                property: 'disabled',
                type: 'boolean',
                default: 'false',
                description: 'Whether the input is disabled'
            },
            {
                property: 'readonly',
                type: 'boolean',
                default: 'false',
                description: 'Whether the input is readonly'
            },
            {
                property: 'required',
                type: 'boolean',
                default: 'false',
                description: 'Whether the input is required for form validation'
            },
            {
                property: 'icon',
                type: 'string',
                default: 'undefined',
                description: 'Material icon name to display as prefix'
            },
            {
                property: 'prefix',
                type: 'string',
                default: 'undefined',
                description: 'Text to display as prefix'
            },
            {
                property: 'suffix',
                type: 'string',
                default: 'undefined',
                description: 'Text to display as suffix'
            },
            {
                property: 'hint',
                type: 'string',
                default: 'undefined',
                description: 'Hint text displayed below the input'
            },
            {
                property: 'error',
                type: 'string',
                default: 'undefined',
                description: 'Error message to display below the input'
            }
        ],
        outputs: [
            {
                property: 'valueChange',
                type: 'EventEmitter<string>',
                description: 'Emitted when the input value changes'
            },
            {
                property: 'blur',
                type: 'EventEmitter<FocusEvent>',
                description: 'Emitted when the input loses focus'
            },
            {
                property: 'focus',
                type: 'EventEmitter<FocusEvent>',
                description: 'Emitted when the input gains focus'
            }
        ],
        usage: {
            description: 'The amw-input component provides a Material Design input field with various customization options.',
            examples: [
                {
                    title: 'Basic Usage',
                    code: `<amw-input
  label="Full Name"
  placeholder="Enter your name">
</amw-input>`
                },
                {
                    title: 'With Validation',
                    code: `<amw-input
  label="Email"
  type="email"
  [required]="true"
  [error]="emailError">
</amw-input>`
                },
                {
                    title: 'With Icon and Prefix',
                    code: `<amw-input
  label="Amount"
  type="number"
  icon="attach_money"
  prefix="$"
  suffix=".00">
</amw-input>`
                }
            ]
        }
    };
}
