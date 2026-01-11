import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseCodeComponent } from '../base/base-code.component';

type RadioGroupExamples = 'basic' | 'ngModel' | 'disabled' | 'labelPosition' | 'color' | 'reactiveForm';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwRadioGroupComponent } from '../../../../library/src/controls/components/amw-radio-group/amw-radio-group.component';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwIconComponent } from '../../../../library/src/components/components';
@Component({
  selector: 'app-radio-group-code',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    AmwButtonComponent,
    AmwRadioGroupComponent,
    AmwAccordionComponent,
    AmwAccordionPanelComponent,
    AmwIconComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './radio-group-code.component.html',
  styleUrl: './radio-group-code.component.scss'
})
export class RadioGroupCodeComponent extends BaseCodeComponent<RadioGroupExamples> {
  // State for live preview examples
  selectedValue: string = '';
  selectedColor: string = 'primary';
  selectedSize: string = 'medium';
  selectedAlign: string = 'start';

  // Form for reactive forms example
  myForm: FormGroup;

  // Original code examples (for reset functionality)
  readonly codeExamples: Record<RadioGroupExamples, string> = {
    basic: `<amw-radio-group
  [options]="[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]">
</amw-radio-group>`,

    ngModel: `<amw-radio-group
  [(ngModel)]="selectedValue"
  [options]="[
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
    { value: 'maybe', label: 'Maybe' }
  ]">
</amw-radio-group>

<p>Selected: {{selectedValue}}</p>`,

    disabled: `<amw-radio-group
  [options]="[
    { value: 'enabled', label: 'Enabled' },
    { value: 'disabled', label: 'Disabled', disabled: true },
    { value: 'enabled2', label: 'Enabled' }
  ]">
</amw-radio-group>`,

    labelPosition: `<amw-radio-group
  [(ngModel)]="selectedAlign"
  labelPosition="before"
  [options]="[
    { value: 'before', label: 'Label Before' },
    { value: 'after', label: 'Label After' }
  ]">
</amw-radio-group>`,

    color: `<amw-radio-group
  [(ngModel)]="selectedColor"
  [options]="[
    { value: 'primary', label: 'Primary' },
    { value: 'accent', label: 'Accent' },
    { value: 'warn', label: 'Warn' }
  ]">
</amw-radio-group>`,

    reactiveForm: `<form [formGroup]="myForm">
  <amw-radio-group
    formControlName="priority"
    [options]="[
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' }
    ]">
  </amw-radio-group>
</form>

// In component:
myForm = this.fb.group({
  priority: ['', Validators.required]
});`
  };

  constructor(private fb: FormBuilder) {
    super();

    // Initialize form
    this.myForm = this.fb.group({
      priority: ['', Validators.required]
    });
  }
}
