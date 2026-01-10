import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { AmwTimepickerComponent } from '../../../../library/src/controls/components/amw-timepicker/amw-timepicker.component';
import { MatCardModule } from '@angular/material/card';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
@Component({
    selector: 'amw-demo-timepicker-validation',
    standalone: true,
    imports: [ReactiveFormsModule,
    AmwTimepickerComponent,
    MatCardModule,
    AmwButtonComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './timepicker-validation.component.html',
    styleUrl: './timepicker-validation.component.scss'
})
export class TimepickerValidationComponent implements OnInit {
    timepickerForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private notification: AmwNotificationService
    ) {
        this.timepickerForm = this.fb.group({
            startTime: ['', Validators.required],
            endTime: ['', Validators.required],
            breakTime: ['', Validators.required],
            meetingTime: ['', Validators.required]
        });
    }

    ngOnInit() {
        // Add custom validators
        this.timepickerForm.get('endTime')?.setValidators([
            Validators.required,
            this.timeAfterValidator('startTime')
        ]);
    }

    timeAfterValidator(startTimeControl: string) {
        return (control: any) => {
            const startTime = this.timepickerForm?.get(startTimeControl)?.value;
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

    onSubmit() {
        if (this.timepickerForm.valid) {
            this.notification.success('Success', 'Form submitted successfully!', { duration: 3000 });
            console.log('Form values:', this.timepickerForm.value);
        } else {
            this.notification.info('Info', 'Please fill in all required fields correctly', { duration: 3000 });
        }
    }

    onReset() {
        this.timepickerForm.reset();
    }
}