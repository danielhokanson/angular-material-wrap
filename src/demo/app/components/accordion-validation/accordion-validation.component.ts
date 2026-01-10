import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';

@Component({
  selector: 'amw-demo-accordion-validation',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatIconModule,
    MatExpansionModule,
    MatCheckboxModule,
    AmwButtonComponent,
    AmwInputComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './accordion-validation.component.html',
  styleUrl: './accordion-validation.component.scss'
})
export class AccordionValidationComponent {
  personalInfoForm: FormGroup;
  contactForm: FormGroup;
  preferencesForm: FormGroup;

  step = 0;

  constructor(private fb: FormBuilder) {
    this.personalInfoForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.contactForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]]
    });

    this.preferencesForm = this.fb.group({
      newsletter: [false],
      notifications: [false],
      theme: ['light']
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  onSubmit() {
    if (this.personalInfoForm.valid && this.contactForm.valid && this.preferencesForm.valid) {
      console.log('Form submitted:', {
        personal: this.personalInfoForm.value,
        contact: this.contactForm.value,
        preferences: this.preferencesForm.value
      });
      alert('Form submitted successfully!');
    }
  }

  getErrorMessage(formGroup: FormGroup, field: string): string {
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
