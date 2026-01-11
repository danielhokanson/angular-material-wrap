import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseCodeComponent } from '../base/base-code.component';

type StepperExamples = 'basic' | 'linear' | 'editable' | 'optional' | 'vertical' | 'customIcons';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwIconComponent } from '../../../../library/src/components/components';
import { AmwStepperComponent } from '../../../../library/src/components/components/amw-stepper/amw-stepper.component';
import { StepperStep, StepperConfig } from '../../../../library/src/components/components/amw-stepper/interfaces';

@Component({
  selector: 'amw-demo-stepper-code',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AmwInputComponent,
    AmwButtonComponent,
    AmwAccordionComponent,
    AmwAccordionPanelComponent,
    AmwIconComponent,
    AmwStepperComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './stepper-code.component.html',
  styleUrl: './stepper-code.component.scss'
})
export class StepperCodeComponent extends BaseCodeComponent<StepperExamples> {
  // Form groups for reactive forms example
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  // Current step for each example
  basicCurrentStep = 0;
  linearCurrentStep = 0;
  editableCurrentStep = 0;
  optionalCurrentStep = 0;
  verticalCurrentStep = 0;
  customIconsCurrentStep = 0;

  // Stepper configurations
  basicConfig: StepperConfig = {
    orientation: 'horizontal',
    linear: false,
    showLabels: true,
    showIcons: true,
    showNavigation: true,
    showCompletion: false
  };

  linearConfig: StepperConfig = {
    orientation: 'horizontal',
    linear: true,
    showLabels: true,
    showIcons: true,
    showNavigation: true,
    showCompletion: false
  };

  verticalConfig: StepperConfig = {
    orientation: 'vertical',
    linear: false,
    showLabels: true,
    showIcons: true,
    showNavigation: true,
    showCompletion: false
  };

  // Step definitions for each example
  basicSteps: StepperStep[] = [
    { label: 'Step 1', description: 'First step', isValid: true },
    { label: 'Step 2', description: 'Second step', isValid: true },
    { label: 'Step 3', description: 'Final step', isValid: true }
  ];

  linearSteps: StepperStep[] = [
    { label: 'Personal Info', description: 'Enter your name', icon: 'person', isValid: false },
    { label: 'Contact Info', description: 'Enter your email', icon: 'email', isValid: false },
    { label: 'Done', description: 'Complete', icon: 'check', isValid: true }
  ];

  editableSteps: StepperStep[] = [
    { label: 'Editable Step', description: 'Can be edited after completion', isValid: true },
    { label: 'Non-editable Step', description: 'Cannot be edited after completion', isValid: true }
  ];

  optionalSteps: StepperStep[] = [
    { label: 'Required Step', description: 'This step is required', isValid: true },
    { label: 'Optional Step', description: 'This step is optional', isOptional: true, isValid: true },
    { label: 'Final Step', description: 'Complete!', isValid: true }
  ];

  verticalSteps: StepperStep[] = [
    { label: 'Step 1', description: 'First step', isValid: true },
    { label: 'Step 2', description: 'Second step', isValid: true },
    { label: 'Step 3', description: 'Final step', isValid: true }
  ];

  customIconSteps: StepperStep[] = [
    { label: 'Personal Info', description: 'Enter your personal information', icon: 'person', isValid: true },
    { label: 'Contact', description: 'Enter your contact details', icon: 'email', isValid: true },
    { label: 'Complete', description: 'All done!', icon: 'check_circle', isValid: true }
  ];

  // Original code examples (for reset functionality)
  readonly codeExamples: Record<StepperExamples, string> = {
    basic: `<amw-stepper
  [config]="basicConfig"
  [steps]="basicSteps"
  [currentStep]="currentStep"
  (stepChange)="onStepChange($event)">
</amw-stepper>

// In component:
basicConfig: StepperConfig = {
  orientation: 'horizontal',
  linear: false,
  showLabels: true,
  showIcons: true,
  showNavigation: true
};

basicSteps: StepperStep[] = [
  { label: 'Step 1', description: 'First step', isValid: true },
  { label: 'Step 2', description: 'Second step', isValid: true },
  { label: 'Step 3', description: 'Final step', isValid: true }
];`,

    linear: `<amw-stepper
  [config]="linearConfig"
  [steps]="linearSteps"
  [currentStep]="currentStep"
  (stepChange)="onStepChange($event)">
</amw-stepper>

// In component:
linearConfig: StepperConfig = {
  orientation: 'horizontal',
  linear: true,  // Requires valid steps to proceed
  showLabels: true,
  showIcons: true,
  showNavigation: true
};

linearSteps: StepperStep[] = [
  { label: 'Personal Info', icon: 'person', isValid: false },
  { label: 'Contact Info', icon: 'email', isValid: false },
  { label: 'Done', icon: 'check', isValid: true }
];

// Update step validity based on form status
this.formGroup.statusChanges.subscribe(() => {
  this.linearSteps[0].isValid = this.formGroup.valid;
});`,

    editable: `<amw-stepper
  [config]="stepperConfig"
  [steps]="editableSteps"
  [currentStep]="currentStep"
  (stepChange)="onStepChange($event)">
</amw-stepper>

// Steps can be marked as completed and revisited
editableSteps: StepperStep[] = [
  { label: 'Editable Step', isValid: true },
  { label: 'Non-editable Step', isValid: true }
];`,

    optional: `<amw-stepper
  [config]="stepperConfig"
  [steps]="optionalSteps"
  [currentStep]="currentStep"
  (stepChange)="onStepChange($event)">
</amw-stepper>

// Mark steps as optional
optionalSteps: StepperStep[] = [
  { label: 'Required Step', isValid: true },
  { label: 'Optional Step', isOptional: true, isValid: true },
  { label: 'Final Step', isValid: true }
];`,

    vertical: `<amw-stepper
  [config]="verticalConfig"
  [steps]="verticalSteps"
  [currentStep]="currentStep"
  (stepChange)="onStepChange($event)">
</amw-stepper>

// Use vertical orientation
verticalConfig: StepperConfig = {
  orientation: 'vertical',
  linear: false,
  showLabels: true,
  showIcons: true,
  showNavigation: true
};`,

    customIcons: `<amw-stepper
  [config]="stepperConfig"
  [steps]="customIconSteps"
  [currentStep]="currentStep"
  (stepChange)="onStepChange($event)">
</amw-stepper>

// Add custom icons to steps
customIconSteps: StepperStep[] = [
  { label: 'Personal Info', icon: 'person', isValid: true },
  { label: 'Contact', icon: 'email', isValid: true },
  { label: 'Complete', icon: 'check_circle', isValid: true }
];`
  };

  constructor(private fb: FormBuilder) {
    super();

    // Initialize form groups
    this.firstFormGroup = this.fb.group({
      name: ['', Validators.required]
    });

    this.secondFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.thirdFormGroup = this.fb.group({
      address: ['', Validators.required]
    });

    // Subscribe to form changes to update linear step validity
    this.firstFormGroup.statusChanges.subscribe(() => {
      this.linearSteps[0].isValid = this.firstFormGroup.valid;
    });

    this.secondFormGroup.statusChanges.subscribe(() => {
      this.linearSteps[1].isValid = this.secondFormGroup.valid;
    });
  }

  onBasicStepChange(step: number): void {
    this.basicCurrentStep = step;
  }

  onLinearStepChange(step: number): void {
    this.linearCurrentStep = step;
  }

  onEditableStepChange(step: number): void {
    this.editableCurrentStep = step;
  }

  onOptionalStepChange(step: number): void {
    this.optionalCurrentStep = step;
  }

  onVerticalStepChange(step: number): void {
    this.verticalCurrentStep = step;
  }

  onCustomIconsStepChange(step: number): void {
    this.customIconsCurrentStep = step;
  }
}
