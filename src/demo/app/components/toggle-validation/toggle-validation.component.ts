import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { AmwToggleComponent } from '../../../../library/src/controls/components/amw-toggle/amw-toggle.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

@Component({
  selector: 'amw-demo-toggle-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AmwToggleComponent,
    AmwButtonComponent,
    AmwToggleComponent,
    AmwButtonComponent
],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './toggle-validation.component.html',
  styleUrl: './toggle-validation.component.scss'
})
export class ToggleValidationComponent implements OnInit {
  validationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notification: AmwNotificationService
  ) {
    this.validationForm = this.fb.group({
      notifications: [false, Validators.requiredTrue],
      marketing: [false],
      analytics: [false, Validators.requiredTrue],
      darkMode: [false],
      autoSave: [false, Validators.requiredTrue],
      twoFactor: [false],
      location: [false],
      cookies: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.validationForm.valid) {
      this.notification.success('Success', 'Form is valid! All required toggles are properly configured.', { duration: 3000 });
    } else {
      this.notification.error('Error', 'Form has validation errors. Please enable all required features.', { duration: 3000 });
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.validationForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['requiredTrue']) return 'This feature must be enabled';
    }
    return '';
  }
}