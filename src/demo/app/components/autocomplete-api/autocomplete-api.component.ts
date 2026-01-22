import { Component, ViewEncapsulation } from '@angular/core';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';
import { AmwApiDocComponent } from '../../shared/components/api-doc/api-doc.component';

@Component({
  selector: 'amw-demo-autocomplete-api',
  standalone: true,
  imports: [AmwApiDocComponent],
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
      },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        description: 'Shows a loading spinner and disables input during async operations'
      },
      {
        name: 'startIcon',
        type: 'string',
        default: 'undefined',
        description: 'Material icon name to display as prefix'
      },
      {
        name: 'noResultsText',
        type: 'string',
        default: "'No results found'",
        description: 'Text to display when no options match the search'
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