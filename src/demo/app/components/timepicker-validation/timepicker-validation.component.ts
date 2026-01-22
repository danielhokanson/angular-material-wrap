import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwTimepickerComponent } from '../../../../library/src/controls/components/amw-timepicker/amw-timepicker.component';

@Component({
  selector: 'amw-demo-timepicker-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwTimepickerComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './timepicker-validation.component.html',
  styleUrl: './timepicker-validation.component.scss'
})
export class TimepickerValidationComponent extends BaseValidationComponent implements OnInit {
  validationForm: FormGroup = this.fb.group({
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    breakTime: ['', Validators.required],
    meetingTime: ['', Validators.required]
  });

  validationInfo: ValidationInfo[] = [
    { title: 'Start Time', description: 'Required field' },
    { title: 'End Time', description: 'Required, must be after start time' },
    { title: 'Break Time', description: 'Required, uses 12-hour format' },
    { title: 'Meeting Time', description: 'Required, includes seconds' }
  ];

  ngOnInit(): void {
    this.validationForm.get('endTime')?.setValidators([
      Validators.required,
      this.timeAfterValidator('startTime')
    ]);
  }

  timeAfterValidator(startTimeControl: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const startTime = this.validationForm?.get(startTimeControl)?.value;
      const endTime = control.value;

      if (startTime && endTime) {
        const start = this.timeToMinutes(startTime);
        const end = this.timeToMinutes(endTime);

        if (end <= start) {
          return { timeAfter: true };
        }
      }

      return null;
    };
  }

  timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  getTimeError(controlName: string): string {
    const control = this.validationForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName.replace(/([A-Z])/g, ' $1').trim()} is required`;
    }
    if (control?.hasError('timeAfter')) {
      return 'End time must be after start time';
    }
    return '';
  }
}
