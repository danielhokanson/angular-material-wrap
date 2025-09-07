import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'amw-demo-radio-code',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './radio-code.component.html',
  styleUrl: './radio-code.component.scss'
})
export class RadioCodeComponent {
  codeExamples = {
    basic: {
      title: 'Basic Radio Button',
      description: 'A simple radio button with label',
      code: `<amw-radio
  label="Option 1"
  [checked]="true">
</amw-radio>`
    },
    withColor: {
      title: 'Radio Button with Color',
      description: 'Radio buttons with different color themes',
      code: `<amw-radio
  label="Primary radio"
  color="primary"
  [checked]="true">
</amw-radio>

<amw-radio
  label="Accent radio"
  color="accent"
  [checked]="false">
</amw-radio>

<amw-radio
  label="Warn radio"
  color="warn"
  [checked]="false">
</amw-radio>`
    },
    differentSizes: {
      title: 'Different Sizes',
      description: 'Radio buttons in different sizes',
      code: `<amw-radio size="small" label="Small radio" [checked]="true"></amw-radio>
<amw-radio size="medium" label="Medium radio" [checked]="true"></amw-radio>
<amw-radio size="large" label="Large radio" [checked]="true"></amw-radio>`
    },
    states: {
      title: 'Different States',
      description: 'Radio buttons in various states',
      code: `<amw-radio
  label="Checked radio"
  [checked]="true">
</amw-radio>

<amw-radio
  label="Unchecked radio"
  [checked]="false">
</amw-radio>

<amw-radio
  label="Disabled radio"
  [checked]="true"
  [disabled]="true">
</amw-radio>`
    },
    labelPosition: {
      title: 'Label Position',
      description: 'Radio buttons with different label positions',
      code: `<amw-radio
  labelPosition="after"
  label="Label after radio"
  [checked]="true">
</amw-radio>

<amw-radio
  labelPosition="before"
  label="Label before radio"
  [checked]="true">
</amw-radio>`
    },
    radioGroup: {
      title: 'Radio Group',
      description: 'Multiple radio buttons in a group',
      code: `<mat-radio-group>
  <amw-radio value="option1" label="Option 1" [checked]="true"></amw-radio>
  <amw-radio value="option2" label="Option 2"></amw-radio>
  <amw-radio value="option3" label="Option 3"></amw-radio>
</mat-radio-group>`
    },
    reactiveForm: {
      title: 'Reactive Form Integration',
      description: 'Using radio buttons with Angular reactive forms',
      code: `// Component TypeScript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class MyComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      gender: ['', Validators.required],
      experience: ['', Validators.required]
    });
  }
}

// Template
<form [formGroup]="form">
  <mat-radio-group formControlName="gender">
    <amw-radio value="male" label="Male" color="primary"></amw-radio>
    <amw-radio value="female" label="Female" color="primary"></amw-radio>
  </mat-radio-group>
  
  <mat-radio-group formControlName="experience">
    <amw-radio value="beginner" label="Beginner" color="accent"></amw-radio>
    <amw-radio value="advanced" label="Advanced" color="accent"></amw-radio>
  </mat-radio-group>
</form>`
    },
    withValue: {
      title: 'Radio Button with Value',
      description: 'Radio buttons with specific values for form submission',
      code: `<mat-radio-group [(ngModel)]="selectedValue">
  <amw-radio
    value="small"
    label="Small"
    color="primary">
  </amw-radio>
  
  <amw-radio
    value="medium"
    label="Medium"
    color="primary">
  </amw-radio>
  
  <amw-radio
    value="large"
    label="Large"
    color="primary">
  </amw-radio>
</mat-radio-group>`
    }
  };
}