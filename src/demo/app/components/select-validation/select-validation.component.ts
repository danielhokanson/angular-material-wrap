import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { AmwSelectComponent } from '../../../../library/src/controls/components/amw-select/amw-select.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

@Component({
    selector: 'amw-demo-select-validation',
    standalone: true,
    imports: [
    ReactiveFormsModule,
    AmwSelectComponent,
    AmwButtonComponent,
    AmwSelectComponent,
    AmwButtonComponent
],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './select-validation.component.html',
    styleUrl: './select-validation.component.scss'
})
export class SelectValidationComponent implements OnInit {
    validationForm: FormGroup;
    countryOptions = [
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'au', label: 'Australia' },
        { value: 'de', label: 'Germany' },
        { value: 'fr', label: 'France' }
    ];

    sizeOptions = [
        { value: 'xs', label: 'Extra Small' },
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' },
        { value: 'xl', label: 'Extra Large' }
    ];

    colorOptions = [
        { value: 'red', label: 'Red' },
        { value: 'blue', label: 'Blue' },
        { value: 'green', label: 'Green' },
        { value: 'yellow', label: 'Yellow' },
        { value: 'purple', label: 'Purple' }
    ];

    constructor(
        private fb: FormBuilder,
        private notification: AmwNotificationService
    ) {
        this.validationForm = this.fb.group({
            requiredSelect: ['', Validators.required],
            countrySelect: ['', Validators.required],
            sizeSelect: ['', Validators.required],
            colorSelect: [[], Validators.required],
            optionalSelect: ['']
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
        }
        return '';
    }
}
