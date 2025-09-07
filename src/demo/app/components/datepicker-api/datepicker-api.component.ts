import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'amw-demo-datepicker-api',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './datepicker-api.component.html',
  styleUrl: './datepicker-api.component.scss'
})
export class DatepickerApiComponent {
  apiDocumentation = {
    inputs: [
      {
        property: 'value',
        type: 'Date | null',
        default: 'null',
        description: 'Current value of the datepicker'
      },
      {
        property: 'placeholder',
        type: 'string',
        default: 'undefined',
        description: 'Placeholder text shown when datepicker is empty'
      },
      {
        property: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Label text displayed above the datepicker'
      },
      {
        property: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the datepicker is disabled'
      },
      {
        property: 'required',
        type: 'boolean',
        default: 'false',
        description: 'Whether the datepicker is required for form validation'
      },
      {
        property: 'min',
        type: 'Date | null',
        default: 'null',
        description: 'Minimum selectable date'
      },
      {
        property: 'max',
        type: 'Date | null',
        default: 'null',
        description: 'Maximum selectable date'
      },
      {
        property: 'format',
        type: 'string',
        default: "'medium'",
        description: 'Date format for display'
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
        description: 'Hint text displayed below the datepicker'
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
        property: 'dateChange',
        type: 'EventEmitter<MatDatepickerInputEvent>',
        description: 'Emitted when the date value changes'
      },
      {
        property: 'opened',
        type: 'EventEmitter<void>',
        description: 'Emitted when the datepicker is opened'
      },
      {
        property: 'closed',
        type: 'EventEmitter<void>',
        description: 'Emitted when the datepicker is closed'
      },
      {
        property: 'valueChange',
        type: 'EventEmitter<Date | null>',
        description: 'Emitted when the datepicker value changes'
      },
      {
        property: 'focus',
        type: 'EventEmitter<FocusEvent>',
        description: 'Emitted when the datepicker gains focus'
      },
      {
        property: 'blur',
        type: 'EventEmitter<FocusEvent>',
        description: 'Emitted when the datepicker loses focus'
      }
    ],
    usage: {
      description: 'The amw-datepicker component provides a Material Design datepicker with various customization options and form integration.',
      examples: [
        {
          title: 'Basic Usage',
          code: `<amw-datepicker
  label="Select Date"
  placeholder="Choose a date..."
  [value]="selectedDate">
</amw-datepicker>`
        },
        {
          title: 'With Validation',
          code: `<amw-datepicker
  formControlName="startDate"
  label="Start Date"
  placeholder="Select start date..."
  [required]="true"
  [min]="new Date()">
</amw-datepicker>`
        },
        {
          title: 'Date Range',
          code: `<amw-datepicker
  label="Birth Date"
  placeholder="Select birth date..."
  [min]="minDate"
  [max]="maxDate"
  [value]="birthDate">
</amw-datepicker>`
        }
      ]
    }
  };
}