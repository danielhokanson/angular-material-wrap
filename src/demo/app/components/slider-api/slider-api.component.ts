import { Component, ViewEncapsulation } from '@angular/core';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';


@Component({
  selector: 'amw-demo-slider-api',
  standalone: true,
  imports: [],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './slider-api.component.html',
  styleUrl: './slider-api.component.scss'
})
export class SliderApiComponent extends BaseApiComponent {
  apiDocumentation: ApiDocumentation = {
    inputs: [
      {
        name: 'value',
        type: 'number',
        default: '0',
        description: 'Current value of the slider'
      },
      {
        name: 'min',
        type: 'number',
        default: '0',
        description: 'Minimum value of the slider'
      },
      {
        name: 'max',
        type: 'number',
        default: '100',
        description: 'Maximum value of the slider'
      },
      {
        name: 'step',
        type: 'number',
        default: '1',
        description: 'Step size for discrete values'
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the slider is disabled'
      },
      {
        name: 'thumbLabel',
        type: 'boolean',
        default: 'false',
        description: 'Whether to show the current value on the thumb'
      },
      {
        name: 'color',
        type: "'primary' | 'accent' | 'warn'",
        default: "'primary'",
        description: 'Color theme of the slider'
      },
      {
        name: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Label text displayed above the slider'
      },
      {
        name: 'required',
        type: 'boolean',
        default: 'false',
        description: 'Whether the slider is required for form validation'
      }
    ],
    outputs: [
      {
        name: 'change',
        type: 'EventEmitter<MatSliderChange>',
        description: 'Emitted when the slider value changes'
      },
      {
        name: 'input',
        type: 'EventEmitter<MatSliderChange>',
        description: 'Emitted continuously as the user drags the slider'
      },
      {
        name: 'focus',
        type: 'EventEmitter<FocusEvent>',
        description: 'Emitted when the slider gains focus'
      },
      {
        name: 'blur',
        type: 'EventEmitter<FocusEvent>',
        description: 'Emitted when the slider loses focus'
      }
    ]
  };


    constructor() {
        super();
    }
}