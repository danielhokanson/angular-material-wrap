import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

/**
 * Radio Group Code Examples Component
 * Provides code examples and usage patterns for the AMW Radio Group component
 */
@Component({
    selector: 'app-radio-group-code',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatTabsModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule
    ],
    templateUrl: './radio-group-code.component.html',
    styleUrl: './radio-group-code.component.scss'
})
export class RadioGroupCodeComponent implements OnInit {
    // Code examples
    readonly codeExamplesArray = [
        {
            title: 'Basic Usage',
            description: 'Simple radio group with basic options',
            language: 'html',
            code: `<amw-radio-group
  [options]="basicOptions"
  label="Choose an option"
  hint="Select one option from the list"
  [(value)]="selectedValue"
  (valueChange)="onValueChange($event)">
</amw-radio-group>`
        },
        {
            title: 'With Icons',
            description: 'Radio group with icon options',
            language: 'html',
            code: `<amw-radio-group
  [options]="iconOptions"
  label="Location Type"
  hint="Choose your primary location type"
  [(value)]="selectedLocation"
  (selectionChange)="onSelectionChange($event)">
</amw-radio-group>`
        },
        {
            title: 'With Descriptions',
            description: 'Radio group with detailed option descriptions',
            language: 'html',
            code: `<amw-radio-group
  [options]="descriptionOptions"
  label="Subscription Plan"
  hint="Select the plan that best fits your needs"
  [(value)]="selectedPlan"
  (valueChange)="onValueChange($event)">
</amw-radio-group>`
        },
        {
            title: 'Horizontal Layout',
            description: 'Radio group with horizontal orientation',
            language: 'html',
            code: `<amw-radio-group
  [options]="colorOptions"
  label="Favorite Color"
  orientation="horizontal"
  [(value)]="selectedColor">
</amw-radio-group>`
        },
        {
            title: 'Reactive Forms',
            description: 'Radio group integrated with Angular reactive forms',
            language: 'html',
            code: `<form [formGroup]="myForm">
  <amw-radio-group
    [options]="priorityOptions"
    label="Priority Level"
    formControlName="priority"
    [required]="true">
  </amw-radio-group>
</form>`
        },
        {
            title: 'Configuration Object',
            description: 'Using configuration object for complex setups',
            language: 'html',
            code: `<amw-radio-group
  [config]="radioGroupConfig"
  [(value)]="selectedValue"
  (valueChange)="onValueChange($event)">
</amw-radio-group>`
        }
    ];

    readonly typescriptExamples = [
        {
            title: 'Component Setup',
            description: 'Basic component setup and imports',
            language: 'typescript',
            code: `import { Component } from '@angular/core';
import { AmwRadioGroupComponent } from '@angular-material-wrap/controls';
import { RadioGroupOption } from '@angular-material-wrap/controls';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [AmwRadioGroupComponent],
  template: \`<!-- template here -->\`
})
export class ExampleComponent {
  selectedValue: any = null;
  
  options: RadioGroupOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  onValueChange(value: any): void {
    console.log('Selected value:', value);
  }
}`
        },
        {
            title: 'Options with Icons and Descriptions',
            description: 'Creating options with icons and descriptions',
            language: 'typescript',
            code: `options: RadioGroupOption[] = [
  { 
    value: 'home', 
    label: 'Home', 
    icon: 'home',
    description: 'Your home location'
  },
  { 
    value: 'work', 
    label: 'Work', 
    icon: 'work',
    description: 'Your workplace'
  },
  { 
    value: 'other', 
    label: 'Other', 
    icon: 'more_horiz',
    description: 'Other location'
  }
];`
        },
        {
            title: 'Reactive Forms Integration',
            description: 'Integrating with Angular reactive forms',
            language: 'typescript',
            code: `import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class ExampleComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      priority: ['', Validators.required],
      agreement: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      console.log('Form submitted:', this.myForm.value);
    }
  }
}`
        },
        {
            title: 'Configuration Object',
            description: 'Using configuration object for complex setups',
            language: 'typescript',
            code: `import { RadioGroupConfig } from '@angular-material-wrap/controls';

export class ExampleComponent {
  radioGroupConfig: RadioGroupConfig = {
    options: [
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium' },
      { value: 'large', label: 'Large' }
    ],
    size: 'medium',
    label: 'Size Selection',
    hint: 'Choose the appropriate size',
    orientation: 'horizontal',
    color: 'primary',
    required: true
  };
}`
        }
    ];

    readonly scssExamples = [
        {
            title: 'Custom Styling',
            description: 'Customizing the radio group appearance',
            language: 'scss',
            code: `.custom-radio-group {
  .amw-radio-group__label {
    font-weight: 600;
    color: var(--mdc-theme-primary);
  }

  .amw-radio-group__option-icon {
    color: var(--mdc-theme-secondary);
  }

  .amw-radio-group__option-description {
    font-style: italic;
  }
}`
        },
        {
            title: 'Size Variants',
            description: 'Customizing size variants',
            language: 'scss',
            code: `.amw-radio-group--custom {
  .amw-radio-group__radio-button {
    min-height: 56px;
    padding: 16px 0;
  }

  .amw-radio-group__option-icon {
    font-size: 2rem;
    width: 2rem;
    height: 2rem;
  }

  .amw-radio-group__option-label {
    font-size: 1.125rem;
  }
}`
        }
    ];

    constructor() { }

    ngOnInit(): void { }

    /**
     * Copy code to clipboard
     */
    copyToClipboard(code: string): void {
        navigator.clipboard.writeText(code).then(() => {
            // You could add a toast notification here
            console.log('Code copied to clipboard');
        });
    }
}
