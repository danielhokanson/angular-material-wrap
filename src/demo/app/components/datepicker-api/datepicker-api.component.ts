import { Component, ViewEncapsulation } from '@angular/core';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';
import { AmwApiDocComponent } from '../../shared/components/api-doc/api-doc.component';

@Component({
  selector: 'amw-demo-datepicker-api',
  standalone: true,
  imports: [AmwApiDocComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './datepicker-api.component.html',
  styleUrl: './datepicker-api.component.scss'
})
export class DatepickerApiComponent extends BaseApiComponent {
  apiDocumentation: ApiDocumentation = {
    inputs: [
      {
        name: 'value',
        type: 'Date | null',
        default: 'null',
        description: 'Current value of the datepicker'
      },
      {
        name: 'placeholder',
        type: 'string',
        default: 'undefined',
        description: 'Placeholder text shown when datepicker is empty'
      },
      {
        name: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Label text displayed above the datepicker'
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the datepicker is disabled'
      },
      {
        name: 'required',
        type: 'boolean',
        default: 'false',
        description: 'Whether the datepicker is required for form validation'
      },
      {
        name: 'min',
        type: 'Date | null',
        default: 'null',
        description: 'Minimum selectable date'
      },
      {
        name: 'max',
        type: 'Date | null',
        default: 'null',
        description: 'Maximum selectable date'
      },
      {
        name: 'format',
        type: 'string',
        default: "'medium'",
        description: 'Date format for display'
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
        description: 'Hint text displayed below the datepicker'
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
        name: 'formField',
        type: 'FormField',
        default: 'undefined',
        description: 'Signal Forms FormField binding (experimental). Mutually exclusive with ngModel and formControl.'
      }
    ],
    outputs: [
      {
        name: 'dateChange',
        type: 'EventEmitter<MatDatepickerInputEvent>',
        description: 'Emitted when the date value changes'
      },
      {
        name: 'opened',
        type: 'EventEmitter<void>',
        description: 'Emitted when the datepicker is opened'
      },
      {
        name: 'closed',
        type: 'EventEmitter<void>',
        description: 'Emitted when the datepicker is closed'
      },
      {
        name: 'valueChange',
        type: 'EventEmitter<Date | null>',
        description: 'Emitted when the datepicker value changes'
      },
      {
        name: 'focus',
        type: 'EventEmitter<FocusEvent>',
        description: 'Emitted when the datepicker gains focus'
      },
      {
        name: 'blur',
        type: 'EventEmitter<FocusEvent>',
        description: 'Emitted when the datepicker loses focus'
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