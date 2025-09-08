import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'amw-demo-select-code',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './select-code.component.html',
  styleUrl: './select-code.component.scss'
})
export class SelectCodeComponent {
  codeExamples = {
    basic: {
      title: 'Basic Select',
      description: 'A simple select with options array',
      code: `const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
];

<amw-select
  [options]="options"
  label="Choose Option"
  placeholder="Select an option">
</amw-select>`
    },
    withValidation: {
      title: 'Select with Validation',
      description: 'Select with required validation and error handling',
      code: `<amw-select
  [options]="countryOptions"
  label="Country"
  placeholder="Select country"
  [required]="true"
  appearance="outline">
</amw-select>`
    },
    multipleSelection: {
      title: 'Multiple Selection',
      description: 'Select that allows multiple option selection',
      code: `<amw-select
  [options]="colorOptions"
  [multiple]="true"
  label="Colors"
  placeholder="Select multiple colors"
  appearance="fill">
</amw-select>`
    },
    withIcon: {
      title: 'Select with Icon',
      description: 'Select with prefix icon for better UX',
      code: `<amw-select
  [options]="categoryOptions"
  label="Category"
  placeholder="Select category"
  icon="category"
  appearance="outline">
</amw-select>`
    },
    differentSizes: {
      title: 'Different Sizes',
      description: 'Selects in different sizes for various use cases',
      code: `<amw-select size="small" [options]="options" label="Small Select"></amw-select>
<amw-select size="medium" [options]="options" label="Medium Select"></amw-select>
<amw-select size="large" [options]="options" label="Large Select"></amw-select>`
    },
    disabledState: {
      title: 'Disabled State',
      description: 'Select in disabled state',
      code: `<amw-select
  [options]="options"
  label="Disabled Select"
  placeholder="Cannot select"
  [disabled]="true">
</amw-select>`
    },
    reactiveForm: {
      title: 'Reactive Form Integration',
      description: 'Using select with Angular reactive forms',
      code: `// Component TypeScript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class MyComponent {
  form: FormGroup;
  countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' }
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      country: ['', Validators.required]
    });
  }
}

// Template
<form [formGroup]="form">
  <amw-select
    formControlName="country"
    [options]="countryOptions"
    label="Country"
    placeholder="Select country">
  </amw-select>
</form>`
    }
  };
}
