import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'amw-demo-toggle-api',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './toggle-api.component.html',
  styleUrl: './toggle-api.component.scss'
})
export class ToggleApiComponent {
  apiDocumentation = {
    inputs: [
      {
        property: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Label text displayed next to the toggle'
      },
      {
        property: 'checked',
        type: 'boolean',
        default: 'false',
        description: 'Whether the toggle is checked'
      },
      {
        property: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the toggle is disabled'
      },
      {
        property: 'color',
        type: "'primary' | 'accent' | 'warn'",
        default: "'primary'",
        description: 'Color theme of the toggle'
      },
      {
        property: 'labelPosition',
        type: "'before' | 'after'",
        default: "'after'",
        description: 'Position of the label relative to the toggle'
      },
      {
        property: 'name',
        type: 'string',
        default: 'undefined',
        description: 'Name attribute for the toggle'
      },
      {
        property: 'required',
        type: 'boolean',
        default: 'false',
        description: 'Whether the toggle is required for form validation'
      },
      {
        property: 'tabIndex',
        type: 'number',
        default: 'undefined',
        description: 'Tab index for keyboard navigation'
      }
    ],
    outputs: [
      {
        property: 'change',
        type: 'EventEmitter<MatSlideToggleChange>',
        description: 'Emitted when the toggle state changes'
      },
      {
        property: 'focus',
        type: 'EventEmitter<FocusEvent>',
        description: 'Emitted when the toggle gains focus'
      },
      {
        property: 'blur',
        type: 'EventEmitter<FocusEvent>',
        description: 'Emitted when the toggle loses focus'
      }
    ],
    usage: {
      description: 'The amw-toggle component provides a Material Design toggle switch with various customization options.',
      examples: [
        {
          title: 'Basic Usage',
          code: `<amw-toggle
  label="Enable notifications"
  [checked]="true">
</amw-toggle>`
        },
        {
          title: 'With Validation',
          code: `<amw-toggle
  formControlName="notifications"
  label="Enable notifications"
  [required]="true"
  color="primary">
</amw-toggle>`
        },
        {
          title: 'Settings Panel',
          code: `<div class="settings-panel">
  <amw-toggle
    color="primary"
    label="Email notifications"
    [checked]="emailNotifications">
  </amw-toggle>
  
  <amw-toggle
    color="accent"
    label="Dark mode"
    [checked]="darkMode">
  </amw-toggle>
</div>`
        }
      ]
    }
  };
}