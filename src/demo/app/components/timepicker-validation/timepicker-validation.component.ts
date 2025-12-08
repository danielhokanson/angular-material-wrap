import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { AmwTimepickerComponent } from '../../../../library/src/controls/components/amw-timepicker/amw-timepicker.component';

@Component({
    selector: 'amw-demo-timepicker-validation',
    standalone: true,
    imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    AmwTimepickerComponent
],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './timepicker-validation.component.html',
    styleUrl: './timepicker-validation.component.scss'
})
export class TimepickerValidationComponent implements OnInit {
    timepickerForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private snackBar: MatSnackBar
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
            this.snackBar.open('Form submitted successfully!', 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
            console.log('Form values:', this.timepickerForm.value);
        } else {
            this.snackBar.open('Please fill in all required fields correctly', 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
        }
    }

    onReset() {
        this.timepickerForm.reset();
    }
}