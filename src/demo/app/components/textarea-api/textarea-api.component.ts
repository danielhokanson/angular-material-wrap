import { Component, ViewEncapsulation } from '@angular/core';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';
import { AmwApiDocComponent } from '../../shared/components/api-doc/api-doc.component';

@Component({
  selector: 'amw-demo-textarea-api',
  standalone: true,
  imports: [AmwApiDocComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './textarea-api.component.html',
  styleUrl: './textarea-api.component.scss'
})
export class TextareaApiComponent extends BaseApiComponent {
  apiDocumentation: ApiDocumentation = {
    inputs: [
      {
        name: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Label text displayed above the textarea'
      },
      {
        name: 'placeholder',
        type: 'string',
        default: 'undefined',
        description: 'Placeholder text shown when textarea is empty'
      },
      {
        name: 'value',
        type: 'string',
        default: 'undefined',
        description: 'Current value of the textarea'
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the textarea is disabled'
      },
      {
        name: 'required',
        type: 'boolean',
        default: 'false',
        description: 'Whether the textarea is required for form validation'
      },
      {
        name: 'rows',
        type: 'number',
        default: '4',
        description: 'Number of visible text lines'
      },
      {
        name: 'cols',
        type: 'number',
        default: 'undefined',
        description: 'Number of visible character columns'
      },
      {
        name: 'minlength',
        type: 'number',
        default: 'undefined',
        description: 'Minimum number of characters required'
      },
      {
        name: 'maxlength',
        type: 'number',
        default: 'undefined',
        description: 'Maximum number of characters allowed'
      },
      {
        name: 'appearance',
        type: "'outline' | 'fill'",
        default: "'outline'",
        description: 'Visual appearance of the form field'
      },
      {
        name: 'hint',
        type: 'string',
        default: 'undefined',
        description: 'Hint text displayed below the textarea'
      },
      {
        name: 'errorMessage',
        type: 'string',
        default: 'undefined',
        description: 'Custom error message to display'
      },
      {
        name: 'hasError',
        type: 'boolean',
        default: 'false',
        description: 'Whether to show error state'
      },
      {
        name: 'autoResize',
        type: 'boolean',
        default: 'false',
        description: 'Enable automatic height adjustment based on content'
      },
      {
        name: 'minRows',
        type: 'number',
        default: '2',
        description: 'Minimum number of rows when autoResize is enabled'
      },
      {
        name: 'maxRows',
        type: 'number',
        default: 'undefined',
        description: 'Maximum number of rows when autoResize is enabled (unlimited if not set)'
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
        description: 'Emitted when the textarea value changes'
      },
      {
        name: 'focus',
        type: 'EventEmitter<FocusEvent>',
        description: 'Emitted when the textarea gains focus'
      },
      {
        name: 'blur',
        type: 'EventEmitter<FocusEvent>',
        description: 'Emitted when the textarea loses focus'
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