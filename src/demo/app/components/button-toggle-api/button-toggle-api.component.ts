import { Component, ViewEncapsulation } from '@angular/core';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';
import { AmwApiDocComponent, ApiInterface } from '../../shared/components/api-doc/api-doc.component';

@Component({
  selector: 'amw-demo-button-toggle-api',
  standalone: true,
  imports: [AmwApiDocComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './button-toggle-api.component.html',
  styleUrl: './button-toggle-api.component.scss'
})
export class ButtonToggleApiComponent extends BaseApiComponent {
  apiDocumentation: ApiDocumentation = {
    inputs: [
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        description: 'Current selected value(s). For single selection, a single value. For multiple selection, an array of values.'
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        description: 'Whether multiple toggles can be selected at once.'
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the entire toggle group is disabled.'
      },
      {
        name: 'vertical',
        type: 'boolean',
        default: 'false',
        description: 'Whether the toggle group should display vertically.'
      },
      {
        name: 'appearance',
        type: "'standard' | 'legacy'",
        default: "'standard'",
        description: 'Visual appearance style of the button toggle group.'
      },
      {
        name: 'name',
        type: 'string',
        default: 'undefined',
        description: 'Name attribute for the toggle group, used for form identification.'
      },
      {
        name: 'groupClass',
        type: 'string',
        default: 'undefined',
        description: 'Custom CSS class to apply to the toggle group.'
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
        name: 'valueChange',
        type: 'EventEmitter<any>',
        description: 'Emitted when the selection changes. Emits the new selected value(s).'
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

  interfaces: ApiInterface[] = [
    {
      name: 'AmwButtonToggle',
      description: 'Interface for individual toggle button configuration',
      properties: [
        { name: 'value', type: 'any', description: 'The value of this toggle button (required)' },
        { name: 'disabled?', type: 'boolean', description: 'Whether this individual toggle is disabled' },
        { name: 'icon?', type: 'string', description: 'Material icon name to display in the toggle button' },
        { name: 'ariaLabel?', type: 'string', description: 'Aria label for accessibility purposes' },
        { name: 'toggleClass?', type: 'string', description: 'Custom CSS class to apply to the toggle button' }
      ]
    }
  ];

  constructor() {
    super();
  }
}
