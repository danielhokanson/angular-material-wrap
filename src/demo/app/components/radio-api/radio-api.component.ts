import { Component, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'amw-demo-radio-api',
  standalone: true,
  imports: [],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './radio-api.component.html',
  styleUrl: './radio-api.component.scss'
})
export class RadioApiComponent {
  apiDocumentation = {
    inputs: [
      {
        property: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Label text displayed next to the radio button'
      },
      {
        property: 'value',
        type: 'any',
        default: 'undefined',
        description: 'Value of the radio button when selected'
      },
      {
        property: 'checked',
        type: 'boolean',
        default: 'false',
        description: 'Whether the radio button is checked'
      },
      {
        property: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the radio button is disabled'
      },
      {
        property: 'color',
        type: "'primary' | 'accent' | 'warn'",
        default: "'primary'",
        description: 'Color theme of the radio button'
      },
      {
        property: 'size',
        type: "'small' | 'medium' | 'large'",
        default: "'medium'",
        description: 'Size of the radio button'
      },
      {
        property: 'labelPosition',
        type: "'before' | 'after'",
        default: "'after'",
        description: 'Position of the label relative to the radio button'
      },
      {
        property: 'name',
        type: 'string',
        default: 'undefined',
        description: 'Name attribute for the radio button (used for grouping)'
      },
      {
        property: 'required',
        type: 'boolean',
        default: 'false',
        description: 'Whether the radio button is required for form validation'
      }
    ],
    outputs: [
      {
        property: 'change',
        type: 'EventEmitter<MatRadioChange>',
        description: 'Emitted when the radio button selection changes'
      },
      {
        property: 'focus',
        type: 'EventEmitter<FocusEvent>',
        description: 'Emitted when the radio button gains focus'
      },
      {
        property: 'blur',
        type: 'EventEmitter<FocusEvent>',
        description: 'Emitted when the radio button loses focus'
      }
    ],
    usage: {
      description: 'The amw-radio component provides a Material Design radio button with various customization options.',
      examples: [
        {
          title: 'Basic Usage',
          code: `<amw-radio
  label="Option 1"
  [checked]="true">
</amw-radio>`
        },
        {
          title: 'With Validation',
          code: `<mat-radio-group formControlName="gender">
  <amw-radio
    value="male"
    label="Male"
    color="primary">
  </amw-radio>
  
  <amw-radio
    value="female"
    label="Female"
    color="primary">
  </amw-radio>
</mat-radio-group>`
        },
        {
          title: 'Radio Group',
          code: `<mat-radio-group [(ngModel)]="selectedOption">
  <amw-radio
    value="option1"
    label="Option 1"
    color="primary">
  </amw-radio>
  
  <amw-radio
    value="option2"
    label="Option 2"
    color="primary">
  </amw-radio>
</mat-radio-group>`
        }
      ]
    }
  };
}