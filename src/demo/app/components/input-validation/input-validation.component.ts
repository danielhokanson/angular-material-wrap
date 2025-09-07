import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

@Component({
    selector: 'amw-demo-input-validation',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        AmwInputComponent,
        AmwButtonComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './input-validation.component.html',
    styleUrl: './input-validation.component.scss'
})
export class InputValidationComponent implements OnInit {
    validationForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private snackBar: MatSnackBar
    ) {
        this.validationForm = this.fb.group({
            requiredField: ['', Validators.required],
            emailField: ['', [Validators.required, Validators.email]],
            minLengthField: ['', [Validators.required, Validators.minLength(3)]],
            maxLengthField: ['', [Validators.required, Validators.maxLength(10)]],
            patternField: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
            numberField: ['', [Validators.required, Validators.min(1), Validators.max(100)]]
        });
    }

    ngOnInit(): void { }

    onSubmit(): void {
        if (this.validationForm.valid) {
            this.snackBar.open('Form is valid!', 'Close', { duration: 3000 });
        } else {
            this.snackBar.open('Form has validation errors', 'Close', { duration: 3000 });
        }
    }

    getFieldError(fieldName: string): string {
        const field = this.validationForm.get(fieldName);
        if (field?.errors && field.touched) {
            if (field.errors['required']) return `${fieldName} is required`;
            if (field.errors['email']) return 'Please enter a valid email';
            if (field.errors['minlength']) return `Minimum length is ${field.errors['minlength'].requiredLength}`;
            if (field.errors['maxlength']) return `Maximum length is ${field.errors['maxlength'].requiredLength}`;
            if (field.errors['pattern']) return 'Invalid format';
            if (field.errors['min']) return `Minimum value is ${field.errors['min'].min}`;
            if (field.errors['max']) return `Maximum value is ${field.errors['max'].max}`;
        }
        return '';
    }
}
