import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'amw-demo-input-code',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './input-code.component.html',
  styleUrl: './input-code.component.scss'
})
export class InputCodeComponent {
  codeExamples = {
    basic: {
      title: 'Basic Input',
      description: 'A simple input with label and placeholder',
      code: `<amw-input
  label="Full Name"
  placeholder="Enter your name">
</amw-input>`
    },
    withValidation: {
      title: 'Input with Validation',
      description: 'Input with required validation and error handling',
      code: `<amw-input
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  [required]="true"
  appearance="outline">
</amw-input>`
    },
    withIcon: {
      title: 'Input with Icon',
      description: 'Input with prefix icon for better UX',
      code: `<amw-input
  label="Search"
  type="search"
  placeholder="Search..."
  icon="search"
  appearance="fill">
</amw-input>`
    },
    withPrefixSuffix: {
      title: 'Input with Prefix and Suffix',
      description: 'Input with custom prefix and suffix text',
      code: `<amw-input
  label="Amount"
  type="text"
  placeholder="Enter amount"
  prefix="$"
  suffix=".00"
  appearance="outline">
</amw-input>`
    },
    differentSizes: {
      title: 'Different Sizes',
      description: 'Inputs in different sizes for various use cases',
      code: `<amw-input size="small" label="Small Input" placeholder="Small"></amw-input>
<amw-input size="medium" label="Medium Input" placeholder="Medium"></amw-input>
<amw-input size="large" label="Large Input" placeholder="Large"></amw-input>`
    },
    disabledReadonly: {
      title: 'Disabled and Readonly States',
      description: 'Inputs in disabled and readonly states',
      code: `<amw-input
  label="Disabled Input"
  placeholder="Cannot edit this"
  [disabled]="true">
</amw-input>

<amw-input
  label="Readonly Input"
  value="This is readonly"
  [readonly]="true">
</amw-input>`
    },
    reactiveForm: {
      title: 'Reactive Form Integration',
      description: 'Using input with Angular reactive forms',
      code: `// Component TypeScript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class MyComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }
}

// Template
<form [formGroup]="form">
  <amw-input
    formControlName="name"
    label="Name"
    placeholder="Enter name">
  </amw-input>
  
  <amw-input
    formControlName="email"
    type="email"
    label="Email"
    placeholder="Enter email">
  </amw-input>
</form>`
    }
  };
}
