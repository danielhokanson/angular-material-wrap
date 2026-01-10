import { Component, ViewEncapsulation } from '@angular/core';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';

@Component({
  selector: 'amw-demo-checkbox-api',
  standalone: true,
  imports: [
    
],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './checkbox-api.component.html',
  styleUrl: './checkbox-api.component.scss'
})
export class CheckboxApiComponent extends BaseApiComponent {
  apiDocumentation: ApiDocumentation = {
    inputs: [
      {
        name: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Label text displayed next to the checkbox'
      },
      {
        name: 'checked',
        type: 'boolean',
        default: 'false',
        description: 'Whether the checkbox is checked'
      },
      {
        name: 'indeterminate',
        type: 'boolean',
        default: 'false',
        description: 'Whether the checkbox is in indeterminate state'
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the checkbox is disabled'
      },
      {
        name: 'color',
        type: "'primary' | 'accent' | 'warn'",
        default: "'primary'",
        description: 'Color theme of the checkbox'
      },
      {
        name: 'size',
        type: "'small' | 'medium' | 'large'",
        default: "'medium'",
        description: 'Size of the checkbox'
      },
      {
        name: 'labelPosition',
        type: "'before' | 'after'",
        default: "'after'",
        description: 'Position of the label relative to the checkbox'
      },
      {
        name: 'required',
        type: 'boolean',
        default: 'false',
        description: 'Whether the checkbox is required for form validation'
      }
    ],
    outputs: [
      {
        name: 'checkedChange',
        type: 'EventEmitter<boolean>',
        description: 'Emitted when the checked state changes'
      },
      {
        name: 'indeterminateChange',
        type: 'EventEmitter<boolean>',
        description: 'Emitted when the indeterminate state changes'
      },
      {
        name: 'change',
        type: 'EventEmitter<MatCheckboxChange>',
        description: 'Emitted when the checkbox state changes (includes change event details)'
      }
    ]
  };

    constructor() {
        super();
    }
}