import { Component, ViewEncapsulation } from '@angular/core';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';
import { AmwApiDocComponent } from '../../shared/components/api-doc/api-doc.component';

@Component({
    selector: 'amw-demo-input-api',
    standalone: true,
    imports: [AmwApiDocComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './input-api.component.html',
    styleUrl: './input-api.component.scss'
})
export class InputApiComponent extends BaseApiComponent {
    apiDocumentation: ApiDocumentation = {
        inputs: [
            {
                name: 'label',
                type: 'string',
                default: 'undefined',
                description: 'Label text displayed above the input field'
            },
            {
                name: 'placeholder',
                type: 'string',
                default: 'undefined',
                description: 'Placeholder text shown when input is empty'
            },
            {
                name: 'value',
                type: 'string',
                default: 'undefined',
                description: 'Current value of the input field'
            },
            {
                name: 'type',
                type: 'string',
                default: "'text'",
                description: 'HTML input type (text, email, password, number, tel, url, search)'
            },
            {
                name: 'appearance',
                type: "'outline' | 'fill'",
                default: "'outline'",
                description: 'Visual appearance style of the input field'
            },
            {
                name: 'size',
                type: "'small' | 'medium' | 'large'",
                default: "'medium'",
                description: 'Size of the input field'
            },
            {
                name: 'disabled',
                type: 'boolean',
                default: 'false',
                description: 'Whether the input is disabled'
            },
            {
                name: 'readonly',
                type: 'boolean',
                default: 'false',
                description: 'Whether the input is readonly'
            },
            {
                name: 'required',
                type: 'boolean',
                default: 'false',
                description: 'Whether the input is required for form validation'
            },
            {
                name: 'icon',
                type: 'string',
                default: 'undefined',
                description: 'Material icon name to display as prefix'
            },
            {
                name: 'prefix',
                type: 'string',
                default: 'undefined',
                description: 'Text to display as prefix'
            },
            {
                name: 'suffix',
                type: 'string',
                default: 'undefined',
                description: 'Text to display as suffix'
            },
            {
                name: 'hint',
                type: 'string',
                default: 'undefined',
                description: 'Hint text displayed below the input'
            },
            {
                name: 'error',
                type: 'string',
                default: 'undefined',
                description: 'Error message to display below the input'
            },
            {
                name: 'loading',
                type: 'boolean',
                default: 'false',
                description: 'Shows a loading spinner in the input suffix area'
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
                type: 'EventEmitter<string>',
                description: 'Emitted when the input value changes'
            },
            {
                name: 'blur',
                type: 'EventEmitter<FocusEvent>',
                description: 'Emitted when the input loses focus'
            },
            {
                name: 'focus',
                type: 'EventEmitter<FocusEvent>',
                description: 'Emitted when the input gains focus'
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

    constructor() {
        super();
    }
}
