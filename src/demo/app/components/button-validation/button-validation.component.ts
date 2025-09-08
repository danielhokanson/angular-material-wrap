import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

@Component({
    selector: 'amw-demo-button-validation',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        AmwButtonComponent,
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './button-validation.component.html',
    styleUrl: './button-validation.component.scss'
})
export class ButtonValidationComponent implements OnInit {
    validationForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private snackBar: MatSnackBar
    ) {
        this.validationForm = this.fb.group({
            requiredField: ['', Validators.required],
            emailField: ['', [Validators.required, Validators.email]],
            minLengthField: ['', [Validators.required, Validators.minLength(5)]],
            maxLengthField: ['', [Validators.required, Validators.maxLength(10)]]
        });
    }

    ngOnInit(): void {
        // Initialize any component-specific logic
    }

    onSubmit(): void {
        if (this.validationForm.valid) {
            this.snackBar.open('Form is valid!', 'Close', {
                duration: 2000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
            });
        } else {
            this.snackBar.open('Form has validation errors!', 'Close', {
                duration: 2000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
            });
        }
    }

    getFieldError(fieldName: string): string {
        const field = this.validationForm.get(fieldName);
        if (field?.errors && field.touched) {
            if (field.errors['required']) return `${fieldName} is required`;
            if (field.errors['email']) return 'Please enter a valid email';
            if (field.errors['minlength']) return `Minimum length is ${field.errors['minlength'].requiredLength}`;
            if (field.errors['maxlength']) return `Maximum length is ${field.errors['maxlength'].requiredLength}`;
        }
        return '';
    }
}


