import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { AmwRadioComponent } from '../../../../library/src/controls/components/amw-radio/amw-radio.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwRadioComponent } from '@angular/material/radio';

@Component({
  selector: 'amw-demo-radio-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AmwRadioComponent,
    AmwButtonComponent,
    AmwRadioComponent,
    AmwButtonComponent,
    AmwRadioComponent
],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './radio-validation.component.html',
  styleUrl: './radio-validation.component.scss'
})
export class RadioValidationComponent implements OnInit {
  validationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notification: AmwNotificationService
  ) {
    this.validationForm = this.fb.group({
      gender: ['', Validators.required],
      experience: ['', Validators.required],
      preferences: ['', Validators.required],
      subscription: ['', Validators.required],
      ageGroup: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.validationForm.valid) {
      this.notification.success('Success', 'Form is valid! All required radio groups are selected.', { duration: 3000 });
    } else {
      this.notification.error('Error', 'Form has validation errors. Please select all required options.', { duration: 3000 });
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.validationForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
    }
    return '';
  }
}