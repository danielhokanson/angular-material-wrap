import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'amw-demo-autocomplete-api',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './autocomplete-api.component.html',
  styleUrl: './autocomplete-api.component.scss'
})
export class AutocompleteApiComponent {
  apiDocumentation = {
    inputs: [
      {
        property: 'options',
        type: 'AutocompleteOption[]',
        default: '[]',
        description: 'Array of options to display in the autocomplete'
      },
      {
        property: 'value',
        type: 'any',
        default: 'undefined',
        description: 'Current value of the autocomplete'
      },
      {
        property: 'placeholder',
        type: 'string',
        default: 'undefined',
        description: 'Placeholder text shown when autocomplete is empty'
      },
      {
        property: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Label text displayed above the autocomplete'
      },
      {
        property: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the autocomplete is disabled'
      },
      {
        property: 'required',
        type: 'boolean',
        default: 'false',
        description: 'Whether the autocomplete is required for form validation'
      },
      {
        property: 'multiple',
        type: 'boolean',
        default: 'false',
        description: 'Whether multiple selections are allowed'
      },
      {
        property: 'chips',
        type: 'boolean',
        default: 'false',
        description: 'Whether to display selected values as chips'
      },
      {
        property: 'filterable',
        type: 'boolean',
        default: 'false',
        description: 'Whether options can be filtered by typing'
      },
      {
        property: 'displayWith',
        type: 'string | Function',
        default: 'undefined',
        description: 'Function or property name to display options'
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
        description: 'Hint text displayed below the autocomplete'
      }
    ],
    outputs: [
      {
        property: 'selectionChange',
        type: 'EventEmitter<MatAutocompleteSelectedEvent>',
        description: 'Emitted when an option is selected'
      },
      {
        property: 'inputChange',
        type: 'EventEmitter<string>',
        description: 'Emitted when the input value changes'
      },
      {
        property: 'valueChange',
        type: 'EventEmitter<any>',
        description: 'Emitted when the autocomplete value changes'
      },
      {
        property: 'focus',
        type: 'EventEmitter<FocusEvent>',
        description: 'Emitted when the autocomplete gains focus'
      },
      {
        property: 'blur',
        type: 'EventEmitter<FocusEvent>',
        description: 'Emitted when the autocomplete loses focus'
      }
    ],
    usage: {
      description: 'The amw-autocomplete component provides a Material Design autocomplete with various customization options and form integration.',
      examples: [
        {
          title: 'Basic Usage',
          code: `<amw-autocomplete
  label="Country"
  placeholder="Select your country..."
  [options]="countries">
</amw-autocomplete>`
        },
        {
          title: 'With Validation',
          code: `<amw-autocomplete
  formControlName="country"
  label="Country"
  placeholder="Select your country..."
  [options]="countries"
  [required]="true">
</amw-autocomplete>`
        },
        {
          title: 'Multiple Selection',
          code: `<amw-autocomplete
  label="Skills"
  placeholder="Select multiple skills..."
  [options]="skills"
  [multiple]="true"
  [chips]="true">
</amw-autocomplete>`
        }
      ]
    }
  };
}