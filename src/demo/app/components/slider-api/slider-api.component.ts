import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'amw-demo-slider-api',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './slider-api.component.html',
  styleUrl: './slider-api.component.scss'
})
export class SliderApiComponent {
  apiDocumentation = {
    inputs: [
      {
        property: 'value',
        type: 'number',
        default: '0',
        description: 'Current value of the slider'
      },
      {
        property: 'min',
        type: 'number',
        default: '0',
        description: 'Minimum value of the slider'
      },
      {
        property: 'max',
        type: 'number',
        default: '100',
        description: 'Maximum value of the slider'
      },
      {
        property: 'step',
        type: 'number',
        default: '1',
        description: 'Step size for discrete values'
      },
      {
        property: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the slider is disabled'
      },
      {
        property: 'thumbLabel',
        type: 'boolean',
        default: 'false',
        description: 'Whether to show the current value on the thumb'
      },
      {
        property: 'color',
        type: "'primary' | 'accent' | 'warn'",
        default: "'primary'",
        description: 'Color theme of the slider'
      },
      {
        property: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Label text displayed above the slider'
      },
      {
        property: 'required',
        type: 'boolean',
        default: 'false',
        description: 'Whether the slider is required for form validation'
      }
    ],
    outputs: [
      {
        property: 'change',
        type: 'EventEmitter<MatSliderChange>',
        description: 'Emitted when the slider value changes'
      },
      {
        property: 'input',
        type: 'EventEmitter<MatSliderChange>',
        description: 'Emitted continuously as the user drags the slider'
      },
      {
        property: 'focus',
        type: 'EventEmitter<FocusEvent>',
        description: 'Emitted when the slider gains focus'
      },
      {
        property: 'blur',
        type: 'EventEmitter<FocusEvent>',
        description: 'Emitted when the slider loses focus'
      }
    ],
    usage: {
      description: 'The amw-slider component provides a Material Design slider with various customization options and form integration.',
      examples: [
        {
          title: 'Basic Usage',
          code: `<amw-slider
  label="Volume"
  [min]="0"
  [max]="100"
  [value]="50">
</amw-slider>`
        },
        {
          title: 'With Validation',
          code: `<amw-slider
  formControlName="volume"
  label="Volume"
  [min]="0"
  [max]="100"
  [required]="true"
  [thumbLabel]="true">
</amw-slider>`
        },
        {
          title: 'Settings Panel',
          code: `<div class="settings-panel">
  <amw-slider
    label="Master Volume"
    [min]="0"
    [max]="100"
    [value]="masterVolume"
    [thumbLabel]="true"
    color="primary">
  </amw-slider>
  
  <amw-slider
    label="Bass"
    [min]="-20"
    [max]="20"
    [value]="bass"
    [thumbLabel]="true"
    color="accent">
  </amw-slider>
</div>`
        }
      ]
    }
  };
}