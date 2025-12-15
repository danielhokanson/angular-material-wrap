import { Component, ViewEncapsulation } from '@angular/core';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';


@Component({
  selector: 'amw-demo-radio-api',
  standalone: true,
  imports: [],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './radio-api.component.html',
  styleUrl: './radio-api.component.scss'
})
export class RadioApiComponent extends BaseApiComponent {
  apiDocumentation: ApiDocumentation = {
    inputs: [
      {
        name: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Label text displayed next to the radio button'
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        description: 'Value of the radio button when selected'
      },
      {
        name: 'checked',
        type: 'boolean',
        default: 'false',
        description: 'Whether the radio button is checked'
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the radio button is disabled'
      },
      {
        name: 'color',
        type: "'primary' | 'accent' | 'warn'",
        default: "'primary'",
        description: 'Color theme of the radio button'
      },
      {
        name: 'size',
        type: "'small' | 'medium' | 'large'",
        default: "'medium'",
        description: 'Size of the radio button'
      },
      {
        name: 'labelPosition',
        type: "'before' | 'after'",
        default: "'after'",
        description: 'Position of the label relative to the radio button'
      },
      {
        name: 'name',
        type: 'string',
        default: 'undefined',
        description: 'Name attribute for the radio button (used for grouping)'
      },
      {
        name: 'required',
        type: 'boolean',
        default: 'false',
        description: 'Whether the radio button is required for form validation'
      }
    ],
    outputs: [
      {
        name: 'change',
        type: 'EventEmitter<MatRadioChange>',
        description: 'Emitted when the radio button selection changes'
      },
      {
        name: 'focus',
        type: 'EventEmitter<FocusEvent>',
        description: 'Emitted when the radio button gains focus'
      },
      {
        name: 'blur',
        type: 'EventEmitter<FocusEvent>',
        description: 'Emitted when the radio button loses focus'
      }
    ]
  };


    constructor() {
        super();
    }
}