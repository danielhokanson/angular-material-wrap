import { Component, ViewEncapsulation } from '@angular/core';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';

@Component({
  selector: 'amw-demo-autocomplete-api',
  standalone: true,
  imports: [
    
],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './autocomplete-api.component.html',
  styleUrl: './autocomplete-api.component.scss'
})
export class AutocompleteApiComponent extends BaseApiComponent {
  apiDocumentation: ApiDocumentation = {
    inputs: [
      {
        name: 'options',
        type: 'AutocompleteOption[]',
        default: '[]',
        description: 'Array of options to display in the autocomplete'
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        description: 'Current value of the autocomplete'
      },
      {
        name: 'placeholder',
        type: 'string',
        default: 'undefined',
        description: 'Placeholder text shown when autocomplete is empty'
      },
      {
        name: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Label text displayed above the autocomplete'
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the autocomplete is disabled'
      },
      {
        name: 'required',
        type: 'boolean',
        default: 'false',
        description: 'Whether the autocomplete is required for form validation'
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        description: 'Whether multiple selections are allowed'
      },
      {
        name: 'chips',
        type: 'boolean',
        default: 'false',
        description: 'Whether to display selected values as chips'
      },
      {
        name: 'filterable',
        type: 'boolean',
        default: 'false',
        description: 'Whether options can be filtered by typing'
      },
      {
        name: 'displayWith',
        type: 'string | Function',
        default: 'undefined',
        description: 'Function or property name to display options'
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
        description: 'Hint text displayed below the autocomplete'
      }
    ],
    outputs: [
      {
        name: 'selectionChange',
        type: 'EventEmitter<MatAutocompleteSelectedEvent>',
        description: 'Emitted when an option is selected'
      },
      {
        name: 'inputChange',
        type: 'EventEmitter<string>',
        description: 'Emitted when the input value changes'
      },
      {
        name: 'valueChange',
        type: 'EventEmitter<any>',
        description: 'Emitted when the autocomplete value changes'
      },
      {
        name: 'focus',
        type: 'EventEmitter<FocusEvent>',
        description: 'Emitted when the autocomplete gains focus'
      },
      {
        name: 'blur',
        type: 'EventEmitter<FocusEvent>',
        description: 'Emitted when the autocomplete loses focus'
      }
    ]
  };

    constructor() {
        super();
    }
}