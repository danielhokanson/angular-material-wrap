import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { AmwTextareaComponent } from '../../../../library/src/controls/components/amw-textarea/amw-textarea.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

@Component({
  selector: 'amw-demo-textarea-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AmwButtonComponent,
    AmwTextareaComponent,
    AmwButtonComponent
],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './textarea-validation.component.html',
  styleUrl: './textarea-validation.component.scss'
})
export class TextareaValidationComponent implements OnInit {
  validationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notification: AmwNotificationService
  ) {
    this.validationForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      comments: ['', [Validators.maxLength(1000)]],
      feedback: ['', [Validators.required, Validators.minLength(20)]],
      bio: ['', [Validators.maxLength(200)]],
      requirements: ['', [Validators.required, Validators.minLength(50)]]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.validationForm.valid) {
      this.notification.success('Success', 'Form is valid! All textarea fields meet the requirements.', { duration: 3000 });
    } else {
      this.notification.error('Error', 'Form has validation errors. Please check the field requirements.', { duration: 3000 });
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.validationForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['minlength']) return `Minimum length is ${field.errors['minlength'].requiredLength} characters`;
      if (field.errors['maxlength']) return `Maximum length is ${field.errors['maxlength'].requiredLength} characters`;
    }
    return '';
  }

  getCharacterCount(fieldName: string): number {
    const field = this.validationForm.get(fieldName);
    return field?.value?.length || 0;
  }

  getMaxLength(fieldName: string): number {
    const field = this.validationForm.get(fieldName);
    return field?.errors?.['maxlength']?.requiredLength || 0;
  }
}