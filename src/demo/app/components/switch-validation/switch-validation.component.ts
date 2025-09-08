import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

import { AmwSwitchComponent } from '../../../../library/src/controls/components/amw-switch/amw-switch.component';

@Component({
    selector: 'amw-demo-switch-validation',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatCardModule,
        AmwSwitchComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './switch-validation.component.html',
    styleUrl: './switch-validation.component.scss'
})
export class SwitchValidationComponent implements OnInit {
    validationForm: FormGroup;
    notificationsEnabled = false;
    darkModeEnabled = false;
    autoSaveEnabled = false;
    termsAccepted = false;

    constructor(
        private fb: FormBuilder,
        private snackBar: MatSnackBar
    ) {
        this.validationForm = this.fb.group({
            notificationsEnabled: [false, [Validators.requiredTrue]],
            darkModeEnabled: [false],
            autoSaveEnabled: [true, [Validators.requiredTrue]],
            termsAccepted: [false, [Validators.requiredTrue]]
        });
    }

    ngOnInit(): void {
        // Set up form validation
        this.validationForm.get('notificationsEnabled')?.setValidators([
            Validators.requiredTrue
        ]);

        this.validationForm.get('autoSaveEnabled')?.setValidators([
            Validators.requiredTrue
        ]);

        this.validationForm.get('termsAccepted')?.setValidators([
            Validators.requiredTrue
        ]);
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
            notificationsEnabled: false,
            darkModeEnabled: false,
            autoSaveEnabled: true,
            termsAccepted: false
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
        if (control?.hasError('requiredTrue')) {
            return 'This option must be enabled';
        }
        return '';
    }

    hasError(controlName: string): boolean {
        const control = this.validationForm.get(controlName);
        return !!(control && control.invalid && control.touched);
    }
}


