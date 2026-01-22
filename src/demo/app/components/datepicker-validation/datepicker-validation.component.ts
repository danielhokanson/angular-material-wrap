import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwDatepickerComponent } from '../../../../library/src/controls/components/amw-datepicker/amw-datepicker.component';

@Component({
  selector: 'amw-demo-datepicker-validation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwDatepickerComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './datepicker-validation.component.html',
  styleUrl: './datepicker-validation.component.scss'
})
export class DatepickerValidationComponent extends BaseValidationComponent {
  minDate = new Date(1900, 0, 1);
  maxDate = new Date();
  today = new Date();

  validationForm: FormGroup = this.fb.group({
    birthDate: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    eventDate: ['', [Validators.required]],
    appointmentDate: ['', [Validators.required]]
  });

  validationInfo: ValidationInfo[] = [
    { title: 'Birth Date', description: 'Required, must be between 1900 and today' },
    { title: 'Start Date', description: 'Required, must be today or later' },
    { title: 'End Date', description: 'Required, must be today or later' },
    { title: 'Event Date', description: 'Required, must be today or later' },
    { title: 'Appointment Date', description: 'Required, must be today or later' }
  ];

  getFieldValue(fieldName: string): Date | null {
    const field = this.validationForm.get(fieldName);
    return field?.value || null;
  }
}
