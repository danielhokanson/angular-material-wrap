import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwIconComponent } from '../../../../library/src/components/components';

@Component({
    selector: 'amw-demo-button-validation',
    standalone: true,
    imports: [
    ReactiveFormsModule,
    AmwButtonComponent,
    AmwInputComponent,
    AmwIconComponent
],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './button-validation.component.html',
    styleUrl: './button-validation.component.scss'
})
export class ButtonValidationComponent implements OnInit {
    validationForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private notification: AmwNotificationService
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
            this.notification.success('Success', 'Form is valid!', { duration: 2000 });
        } else {
            this.notification.error('Error', 'Form has validation errors!', { duration: 2000 });
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

