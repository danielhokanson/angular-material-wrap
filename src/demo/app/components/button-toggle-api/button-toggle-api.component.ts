import { Component, ViewEncapsulation } from '@angular/core';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';

@Component({
  selector: 'amw-demo-button-toggle-api',
  standalone: true,
  imports: [],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './button-toggle-api.component.html',
  styleUrl: './button-toggle-api.component.scss'
})
export class ButtonToggleApiComponent extends BaseApiComponent {
  apiDocumentation: ApiDocumentation = {
    inputs: [],
    outputs: []
  };

  // Group Input properties documentation
  readonly groupInputProperties = [
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
    }
  ];

  // Group Output properties documentation
  readonly groupOutputProperties = [
    {
      name: 'valueChange',
      type: 'EventEmitter<any>',
      description: 'Emitted when the selection changes. Emits the new selected value(s).'
    }
  ];

  // Toggle Input properties documentation
  readonly toggleInputProperties = [
    {
      name: 'value',
      type: 'any',
      default: '(required)',
      description: 'The value of this toggle button. Required for identification.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether this individual toggle is disabled.'
    },
    {
      name: 'icon',
      type: 'string',
      default: 'undefined',
      description: 'Material icon name to display in the toggle button.'
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: 'undefined',
      description: 'Aria label for accessibility purposes.'
    },
    {
      name: 'toggleClass',
      type: 'string',
      default: 'undefined',
      description: 'Custom CSS class to apply to the toggle button.'
    }
  ];

  constructor() {
    super();
  }
}
