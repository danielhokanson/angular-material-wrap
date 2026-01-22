import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwRadioGroupComponent } from '../../../../library/src/controls/components/amw-radio-group/amw-radio-group.component';
import { AmwIconComponent } from '../../../../library/src/components/components';

@Component({
  selector: 'app-radio-group-code',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AmwCodeDocComponent,
    AmwRadioGroupComponent,
    AmwIconComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './radio-group-code.component.html',
  styleUrl: './radio-group-code.component.scss'
})
export class RadioGroupCodeComponent implements OnInit {
  // State for live preview examples
  selectedValue: string = '';
  selectedColor: string = 'primary';
  selectedSize: string = 'medium';
  selectedAlign: string = 'start';

  // Form for reactive forms example
  myForm: FormGroup;

  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Radio Group',
      description: 'Simple radio button group',
      code: `<amw-radio-group
  [options]="[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]">
</amw-radio-group>`
    },
    {
      key: 'ngModel',
      title: 'Two-way Binding with ngModel',
      description: 'Bind radio group to component property',
      code: `<amw-radio-group
  [(ngModel)]="selectedValue"
  [options]="[
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
    { value: 'maybe', label: 'Maybe' }
  ]">
</amw-radio-group>

<p>Selected: {{selectedValue}}</p>`
    },
    {
      key: 'disabled',
      title: 'Disabled State',
      description: 'Disable individual radio buttons',
      code: `<amw-radio-group
  [options]="[
    { value: 'enabled', label: 'Enabled' },
    { value: 'disabled', label: 'Disabled', disabled: true },
    { value: 'enabled2', label: 'Enabled' }
  ]">
</amw-radio-group>`
    },
    {
      key: 'labelPosition',
      title: 'Label Position',
      description: 'Position labels before or after the radio button',
      code: `<amw-radio-group
  [(ngModel)]="selectedAlign"
  labelPosition="before"
  [options]="[
    { value: 'before', label: 'Label Before' },
    { value: 'after', label: 'Label After' }
  ]">
</amw-radio-group>`
    },
    {
      key: 'color',
      title: 'Color Theming',
      description: 'Apply different theme colors',
      code: `<amw-radio-group
  [(ngModel)]="selectedColor"
  [options]="[
    { value: 'primary', label: 'Primary' },
    { value: 'accent', label: 'Accent' },
    { value: 'warn', label: 'Warn' }
  ]">
</amw-radio-group>`
    },
    {
      key: 'reactiveForm',
      title: 'Reactive Forms Integration',
      description: 'Use with Angular reactive forms',
      code: `<form [formGroup]="myForm">
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
    }
  ];

  constructor(private fb: FormBuilder) {
    // Initialize form
    this.myForm = this.fb.group({
      priority: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
  }
}
