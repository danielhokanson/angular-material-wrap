import { Component, ViewEncapsulation } from '@angular/core';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';

@Component({
  selector: 'amw-demo-toggle-api',
  standalone: true,
  imports: [
    
],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './toggle-api.component.html',
  styleUrl: './toggle-api.component.scss'
})
export class ToggleApiComponent extends BaseApiComponent {
  apiDocumentation: ApiDocumentation = {
    inputs: [
      {
        name: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Label text displayed next to the toggle'
      },
      {
        name: 'checked',
        type: 'boolean',
        default: 'false',
        description: 'Whether the toggle is checked'
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the toggle is disabled'
      },
      {
        name: 'color',
        type: "'primary' | 'accent' | 'warn'",
        default: "'primary'",
        description: 'Color theme of the toggle'
      },
      {
        name: 'labelPosition',
        type: "'before' | 'after'",
        default: "'after'",
        description: 'Position of the label relative to the toggle'
      },
      {
        name: 'name',
        type: 'string',
        default: 'undefined',
        description: 'Name attribute for the toggle'
      },
      {
        name: 'required',
        type: 'boolean',
        default: 'false',
        description: 'Whether the toggle is required for form validation'
      },
      {
        name: 'tabIndex',
        type: 'number',
        default: 'undefined',
        description: 'Tab index for keyboard navigation'
      }
    ],
    outputs: [
      {
        name: 'change',
        type: 'EventEmitter<MatSlideToggleChange>',
        description: 'Emitted when the toggle state changes'
      },
      {
        name: 'focus',
        type: 'EventEmitter<FocusEvent>',
        description: 'Emitted when the toggle gains focus'
      },
      {
        name: 'blur',
        type: 'EventEmitter<FocusEvent>',
        description: 'Emitted when the toggle loses focus'
      }
    ]
  };

    constructor() {
        super();
    }
}