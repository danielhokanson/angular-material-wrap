import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

import { AmwRangeSliderComponent } from '../../../../library/src/controls/components/amw-range-slider/amw-range-slider.component';

@Component({
    selector: 'amw-demo-range-slider-validation',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatCardModule,
        AmwRangeSliderComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './range-slider-validation.component.html',
    styleUrl: './range-slider-validation.component.scss'
})
export class RangeSliderValidationComponent implements OnInit {
    validationForm: FormGroup;
    priceRange = { start: 100, end: 500 };
    ageRange = { start: 18, end: 65 };
    temperatureRange = { start: 20, end: 30 };

    constructor(
        private fb: FormBuilder,
        private snackBar: MatSnackBar
    ) {
        this.validationForm = this.fb.group({
            priceRange: [{ start: 100, end: 500 }, [Validators.required]],
            ageRange: [{ start: 18, end: 65 }, [Validators.required]],
            temperatureRange: [{ start: 20, end: 30 }, [Validators.required]]
        });
    }

    ngOnInit(): void {
        // Set up form validation
        this.validationForm.get('priceRange')?.setValidators([
            Validators.required,
            this.validateRange.bind(this)
        ]);

        this.validationForm.get('ageRange')?.setValidators([
            Validators.required,
            this.validateAgeRange.bind(this)
        ]);

        this.validationForm.get('temperatureRange')?.setValidators([
            Validators.required,
            this.validateTemperatureRange.bind(this)
        ]);
    }

    validateRange(control: any) {
        const range = control.value;
        if (!range || typeof range !== 'object') {
            return { invalidRange: true };
        }

        if (range.start >= range.end) {
            return { invalidRange: true };
        }

        if (range.start < 0 || range.end > 1000) {
            return { outOfBounds: true };
        }

        return null;
    }

    validateAgeRange(control: any) {
        const range = control.value;
        if (!range || typeof range !== 'object') {
            return { invalidRange: true };
        }

        if (range.start >= range.end) {
            return { invalidRange: true };
        }

        if (range.start < 18 || range.end > 100) {
            return { outOfBounds: true };
        }

        return null;
    }

    validateTemperatureRange(control: any) {
        const range = control.value;
        if (!range || typeof range !== 'object') {
            return { invalidRange: true };
        }

        if (range.start >= range.end) {
            return { invalidRange: true };
        }

        if (range.start < -50 || range.end > 100) {
            return { outOfBounds: true };
        }

        return null;
    }

    onSubmit(): void {
        if (this.validationForm.valid) {
            this.snackBar.open('Form submitted successfully!', 'Close', {
                duration: 3000
            });
            console.log('Form values:', this.validationForm.value);
        } else {
            this.snackBar.open('Please fix the validation errors', 'Close', {
                duration: 3000
            });
            this.markFormGroupTouched();
        }
    }

    onReset(): void {
        this.validationForm.reset({
            priceRange: { start: 100, end: 500 },
            ageRange: { start: 18, end: 65 },
            temperatureRange: { start: 20, end: 30 }
        });
    }

    private markFormGroupTouched(): void {
        Object.keys(this.validationForm.controls).forEach(key => {
            const control = this.validationForm.get(key);
            control?.markAsTouched();
        });
    }

    getErrorMessage(controlName: string): string {
        const control = this.validationForm.get(controlName);
        if (control?.hasError('required')) {
            return 'This field is required';
        }
        if (control?.hasError('invalidRange')) {
            return 'Start value must be less than end value';
        }
        if (control?.hasError('outOfBounds')) {
            return 'Values are out of acceptable range';
        }
        return '';
    }

    hasError(controlName: string): boolean {
        const control = this.validationForm.get(controlName);
        return !!(control && control.invalid && control.touched);
    }
}


