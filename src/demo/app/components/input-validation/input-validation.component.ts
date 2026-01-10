import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

@Component({
    selector: 'amw-demo-input-validation',
    standalone: true,
    imports: [
    ReactiveFormsModule,
    AmwInputComponent,
    AmwButtonComponent,
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
        private notification: AmwNotificationService
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
            this.notification.success('Success', 'Form is valid!', { duration: 3000 });
        } else {
            this.notification.error('Error', 'Form has validation errors', { duration: 3000 });
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
