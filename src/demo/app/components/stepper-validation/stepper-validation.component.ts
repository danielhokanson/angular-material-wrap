import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwCardComponent } from '../../../../library/src/components/components';
import { AmwStepperComponent } from '../../../../library/src/components/components/amw-stepper/amw-stepper.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { StepperStep, StepperConfig } from '../../../../library/src/components/components/amw-stepper/interfaces';

@Component({
  selector: 'amw-demo-stepper-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwInputComponent,
    AmwCardComponent,
    AmwStepperComponent,
    AmwButtonComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './stepper-validation.component.html',
  styleUrl: './stepper-validation.component.scss'
})
export class StepperValidationComponent extends BaseValidationComponent implements OnInit {
  currentStep = 0;

  stepperConfig: StepperConfig = {
    orientation: 'horizontal',
    linear: true,
    showLabels: true,
    showIcons: true,
    showDescriptions: true,
    showNavigation: true,
    showCompletion: false
  };

  validationSteps: StepperStep[] = [
    {
      label: 'Personal Information',
      description: 'Required fields for personal details',
      icon: 'person',
      isValid: false
    },
    {
      label: 'Contact Information',
      description: 'Required fields for contact details',
      icon: 'email',
      isValid: false
    },
    {
      label: 'Review',
      description: 'Review your information',
      icon: 'check_circle',
      isValid: true
    }
  ];

  // Main validation form for BaseValidationComponent
  validationForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required]
  });

  secondFormGroup: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required]
  });

  validationInfo: ValidationInfo[] = [
    { title: 'Personal Information', description: 'First and last name are required' },
    { title: 'Contact Information', description: 'Email and phone are required' },
    { title: 'Linear Progress', description: 'Must complete each step to proceed' },
    { title: 'Form Validation', description: 'Each step validates its form before allowing navigation' }
  ];

  ngOnInit(): void {
    this.validationForm.statusChanges.subscribe(() => {
      this.validationSteps[0].isValid = this.validationForm.valid;
    });

    this.secondFormGroup.statusChanges.subscribe(() => {
      this.validationSteps[1].isValid = this.secondFormGroup.valid;
    });
  }

  onStepChange(stepIndex: number): void {
    this.currentStep = stepIndex;
  }

  resetStepper(): void {
    this.currentStep = 0;
    this.validationForm.reset();
    this.secondFormGroup.reset();
    this.validationSteps.forEach(step => step.isCompleted = false);
  }

  getStepperError(formGroup: FormGroup, fieldName: string): string {
    const field = formGroup.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName.replace(/([A-Z])/g, ' $1').trim()} is required`;
      if (field.errors['email']) return 'Please enter a valid email';
    }
    return '';
  }
}
