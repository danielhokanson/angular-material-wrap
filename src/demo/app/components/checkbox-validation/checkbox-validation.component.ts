import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { AmwCheckboxComponent } from '../../../../library/src/controls/components/amw-checkbox/amw-checkbox.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

@Component({
  selector: 'amw-demo-checkbox-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AmwCheckboxComponent,
    AmwButtonComponent,
    AmwCheckboxComponent,
    AmwButtonComponent
],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './checkbox-validation.component.html',
  styleUrl: './checkbox-validation.component.scss'
})
export class CheckboxValidationComponent implements OnInit {
  validationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notification: AmwNotificationService
  ) {
    this.validationForm = this.fb.group({
      termsAccepted: [false, Validators.requiredTrue],
      privacyAccepted: [false, Validators.requiredTrue],
      marketingEmails: [false],
      smsNotifications: [false],
      pushNotifications: [false],
      dataCollection: [false, Validators.requiredTrue],
      ageVerification: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.validationForm.valid) {
      this.notification.success('Success', 'Form is valid! All required checkboxes are checked.', { duration: 3000 });
    } else {
      this.notification.error('Error', 'Form has validation errors. Please check all required fields.', { duration: 3000 });
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.validationForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['requiredTrue']) return 'This field must be checked';
    }
    return '';
  }
}