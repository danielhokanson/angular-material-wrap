import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'amw-demo-checkbox-code',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './checkbox-code.component.html',
  styleUrl: './checkbox-code.component.scss'
})
export class CheckboxCodeComponent {
  codeExamples = {
    basic: {
      title: 'Basic Checkbox',
      description: 'A simple checkbox with label',
      code: `<amw-checkbox
  label="Accept terms and conditions"
  [checked]="true">
</amw-checkbox>`
    },
    withColor: {
      title: 'Checkbox with Color',
      description: 'Checkbox with different color themes',
      code: `<amw-checkbox
  label="Primary checkbox"
  color="primary"
  [checked]="true">
</amw-checkbox>

<amw-checkbox
  label="Accent checkbox"
  color="accent"
  [checked]="true">
</amw-checkbox>

<amw-checkbox
  label="Warn checkbox"
  color="warn"
  [checked]="false">
</amw-checkbox>`
    },
    differentSizes: {
      title: 'Different Sizes',
      description: 'Checkboxes in different sizes',
      code: `<amw-checkbox size="small" label="Small checkbox" [checked]="true"></amw-checkbox>
<amw-checkbox size="medium" label="Medium checkbox" [checked]="true"></amw-checkbox>
<amw-checkbox size="large" label="Large checkbox" [checked]="true"></amw-checkbox>`
    },
    states: {
      title: 'Different States',
      description: 'Checkboxes in various states',
      code: `<amw-checkbox
  label="Checked checkbox"
  [checked]="true">
</amw-checkbox>

<amw-checkbox
  label="Unchecked checkbox"
  [checked]="false">
</amw-checkbox>

<amw-checkbox
  label="Indeterminate checkbox"
  [indeterminate]="true">
</amw-checkbox>

<amw-checkbox
  label="Disabled checkbox"
  [checked]="true"
  [disabled]="true">
</amw-checkbox>`
    },
    labelPosition: {
      title: 'Label Position',
      description: 'Checkboxes with different label positions',
      code: `<amw-checkbox
  labelPosition="after"
  label="Label after checkbox"
  [checked]="true">
</amw-checkbox>

<amw-checkbox
  labelPosition="before"
  label="Label before checkbox"
  [checked]="true">
</amw-checkbox>`
    },
    reactiveForm: {
      title: 'Reactive Form Integration',
      description: 'Using checkboxes with Angular reactive forms',
      code: `// Component TypeScript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class MyComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      termsAccepted: [false, Validators.requiredTrue],
      marketingEmails: [false],
      notifications: [true]
    });
  }
}

// Template
<form [formGroup]="form">
  <amw-checkbox
    formControlName="termsAccepted"
    label="Accept terms and conditions"
    color="primary">
  </amw-checkbox>
  
  <amw-checkbox
    formControlName="marketingEmails"
    label="Receive marketing emails"
    color="accent">
  </amw-checkbox>
  
  <amw-checkbox
    formControlName="notifications"
    label="Enable notifications"
    color="primary">
  </amw-checkbox>
</form>`
    },
    checkboxGroup: {
      title: 'Checkbox Group',
      description: 'Multiple checkboxes in a group',
      code: `<div class="checkbox-group">
  <h4>User Preferences</h4>
  <amw-checkbox
    color="primary"
    label="Email notifications"
    [checked]="true">
  </amw-checkbox>
  
  <amw-checkbox
    color="primary"
    label="SMS notifications"
    [checked]="false">
  </amw-checkbox>
  
  <amw-checkbox
    color="primary"
    label="Push notifications"
    [checked]="true">
  </amw-checkbox>
</div>`
    }
  };
}