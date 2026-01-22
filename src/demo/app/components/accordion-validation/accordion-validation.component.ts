import { Component, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwIconComponent } from '../../../../library/src/components/components';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwCheckboxComponent } from '../../../../library/src/controls/components/amw-checkbox/amw-checkbox.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

@Component({
  selector: 'amw-demo-accordion-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwAccordionComponent,
    AmwAccordionPanelComponent,
    AmwIconComponent,
    AmwInputComponent,
    AmwCheckboxComponent,
    AmwButtonComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './accordion-validation.component.html',
  styleUrl: './accordion-validation.component.scss'
})
export class AccordionValidationComponent extends BaseValidationComponent {
  step = 0;

  // Main validation form - used by BaseValidationComponent
  validationForm: FormGroup = this.fb.group({
    placeholder: ['']
  });

  personalInfoForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]]
  });

  contactForm: FormGroup = this.fb.group({
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    address: ['', Validators.required],
    city: ['', Validators.required],
    zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]]
  });

  preferencesForm: FormGroup = this.fb.group({
    newsletter: [false],
    notifications: [false],
    theme: ['light']
  });

  validationInfo: ValidationInfo[] = [
    { title: 'Multi-Step Wizard', description: 'Complete each step before proceeding' },
    { title: 'Personal Information', description: 'First name, last name, and email required' },
    { title: 'Contact Information', description: 'Phone, address, city, and ZIP required' },
    { title: 'Preferences', description: 'Optional preferences for newsletter and notifications' }
  ];

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  onAccordionSubmit() {
    if (this.personalInfoForm.valid && this.contactForm.valid && this.preferencesForm.valid) {
      console.log('Form submitted:', {
        personal: this.personalInfoForm.value,
        contact: this.contactForm.value,
        preferences: this.preferencesForm.value
      });
      alert('Form submitted successfully!');
    }
  }

  getAccordionErrorMessage(formGroup: FormGroup, field: string): string {
    const control = formGroup.get(field);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('email')) {
      return 'Invalid email format';
    }
    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `Minimum length is ${minLength} characters`;
    }
    if (control?.hasError('pattern')) {
      if (field === 'phone') return 'Phone must be 10 digits';
      if (field === 'zipCode') return 'ZIP code must be 5 digits';
    }
    return '';
  }
}
