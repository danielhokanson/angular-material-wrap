import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'amw-demo-textarea-api',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './textarea-api.component.html',
  styleUrl: './textarea-api.component.scss'
})
export class TextareaApiComponent {
  apiDocumentation = {
    inputs: [
      {
        property: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Label text displayed above the textarea'
      },
      {
        property: 'placeholder',
        type: 'string',
        default: 'undefined',
        description: 'Placeholder text shown when textarea is empty'
      },
      {
        property: 'value',
        type: 'string',
        default: 'undefined',
        description: 'Current value of the textarea'
      },
      {
        property: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the textarea is disabled'
      },
      {
        property: 'required',
        type: 'boolean',
        default: 'false',
        description: 'Whether the textarea is required for form validation'
      },
      {
        property: 'rows',
        type: 'number',
        default: '4',
        description: 'Number of visible text lines'
      },
      {
        property: 'cols',
        type: 'number',
        default: 'undefined',
        description: 'Number of visible character columns'
      },
      {
        property: 'minlength',
        type: 'number',
        default: 'undefined',
        description: 'Minimum number of characters required'
      },
      {
        property: 'maxlength',
        type: 'number',
        default: 'undefined',
        description: 'Maximum number of characters allowed'
      },
      {
        property: 'appearance',
        type: "'outline' | 'fill'",
        default: "'outline'",
        description: 'Visual appearance of the form field'
      },
      {
        property: 'hint',
        type: 'string',
        default: 'undefined',
        description: 'Hint text displayed below the textarea'
      },
      {
        property: 'errorMessage',
        type: 'string',
        default: 'undefined',
        description: 'Custom error message to display'
      },
      {
        property: 'hasError',
        type: 'boolean',
        default: 'false',
        description: 'Whether to show error state'
      }
    ],
    outputs: [
      {
        property: 'valueChange',
        type: 'EventEmitter<string>',
        description: 'Emitted when the textarea value changes'
      },
      {
        property: 'focus',
        type: 'EventEmitter<FocusEvent>',
        description: 'Emitted when the textarea gains focus'
      },
      {
        property: 'blur',
        type: 'EventEmitter<FocusEvent>',
        description: 'Emitted when the textarea loses focus'
      }
    ],
    usage: {
      description: 'The amw-textarea component provides a Material Design textarea with various customization options and form integration.',
      examples: [
        {
          title: 'Basic Usage',
          code: `<amw-textarea
  label="Description"
  placeholder="Enter your description..."
  [rows]="4">
</amw-textarea>`
        },
        {
          title: 'With Validation',
          code: `<amw-textarea
  formControlName="description"
  label="Project Description"
  placeholder="Describe your project..."
  [required]="true"
  [minlength]="10"
  [maxlength]="500"
  appearance="outline">
</amw-textarea>`
        },
        {
          title: 'Contact Form',
          code: `<form [formGroup]="contactForm">
  <amw-textarea
    formControlName="message"
    label="Message"
    placeholder="Your message here..."
    [required]="true"
    [minlength]="20"
    [rows]="6">
  </amw-textarea>
  
  <amw-textarea
    formControlName="additional"
    label="Additional Information"
    placeholder="Any additional details..."
    [maxlength]="500"
    [rows]="4">
  </amw-textarea>
</form>`
        }
      ]
    }
  };
}