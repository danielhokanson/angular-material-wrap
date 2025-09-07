import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'amw-demo-checkbox-api',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './checkbox-api.component.html',
  styleUrl: './checkbox-api.component.scss'
})
export class CheckboxApiComponent {
  apiDocumentation = {
    inputs: [
      {
        property: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Label text displayed next to the checkbox'
      },
      {
        property: 'checked',
        type: 'boolean',
        default: 'false',
        description: 'Whether the checkbox is checked'
      },
      {
        property: 'indeterminate',
        type: 'boolean',
        default: 'false',
        description: 'Whether the checkbox is in indeterminate state'
      },
      {
        property: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the checkbox is disabled'
      },
      {
        property: 'color',
        type: "'primary' | 'accent' | 'warn'",
        default: "'primary'",
        description: 'Color theme of the checkbox'
      },
      {
        property: 'size',
        type: "'small' | 'medium' | 'large'",
        default: "'medium'",
        description: 'Size of the checkbox'
      },
      {
        property: 'labelPosition',
        type: "'before' | 'after'",
        default: "'after'",
        description: 'Position of the label relative to the checkbox'
      },
      {
        property: 'required',
        type: 'boolean',
        default: 'false',
        description: 'Whether the checkbox is required for form validation'
      }
    ],
    outputs: [
      {
        property: 'checkedChange',
        type: 'EventEmitter<boolean>',
        description: 'Emitted when the checked state changes'
      },
      {
        property: 'indeterminateChange',
        type: 'EventEmitter<boolean>',
        description: 'Emitted when the indeterminate state changes'
      },
      {
        property: 'change',
        type: 'EventEmitter<MatCheckboxChange>',
        description: 'Emitted when the checkbox state changes (includes change event details)'
      }
    ],
    usage: {
      description: 'The amw-checkbox component provides a Material Design checkbox with various customization options.',
      examples: [
        {
          title: 'Basic Usage',
          code: `<amw-checkbox
  label="Accept terms and conditions"
  [checked]="true">
</amw-checkbox>`
        },
        {
          title: 'With Validation',
          code: `<amw-checkbox
  formControlName="termsAccepted"
  label="Accept terms and conditions"
  [required]="true"
  color="primary">
</amw-checkbox>`
        },
        {
          title: 'Checkbox Group',
          code: `<div class="checkbox-group">
  <amw-checkbox
    color="primary"
    label="Email notifications"
    [checked]="emailNotifications">
  </amw-checkbox>
  
  <amw-checkbox
    color="primary"
    label="SMS notifications"
    [checked]="smsNotifications">
  </amw-checkbox>
</div>`
        }
      ]
    }
  };
}