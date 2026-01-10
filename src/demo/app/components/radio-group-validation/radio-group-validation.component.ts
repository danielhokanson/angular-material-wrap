import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AmwRadioGroupComponent } from '../../../../library/src/controls/components/amw-radio-group/amw-radio-group.component';
import { RadioGroupOption } from '../../../../library/src/controls/components/amw-radio-group/interfaces/radio-group.interface';

/**
 * Radio Group Validation Demo Component
 * Demonstrates validation scenarios for the AMW Radio Group component
 */import { AmwDividerComponent } from '@angular/material/divider';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
@Component({
    selector: 'app-radio-group-validation',
    standalone: true,
    imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    AmwRadioGroupComponent,
    AmwDividerComponent,
    AmwButtonComponent],
    templateUrl: './radio-group-validation.component.html',
    styleUrl: './radio-group-validation.component.scss'
})
export class RadioGroupValidationComponent implements OnInit {
    // Form for validation demo
    validationForm: FormGroup;

    // Sample options for different validation scenarios
    readonly requiredOptions: RadioGroupOption[] = [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
        { value: 'maybe', label: 'Maybe' }
    ];

    readonly agreementOptions: RadioGroupOption[] = [
        { value: 'agree', label: 'I agree to the terms and conditions' },
        { value: 'disagree', label: 'I do not agree' }
    ];

    readonly priorityOptions: RadioGroupOption[] = [
        { value: 'low', label: 'Low Priority', icon: 'keyboard_arrow_down' },
        { value: 'medium', label: 'Medium Priority', icon: 'remove' },
        { value: 'high', label: 'High Priority', icon: 'keyboard_arrow_up' },
        { value: 'urgent', label: 'Urgent', icon: 'priority_high' }
    ];

    readonly sizeOptions: RadioGroupOption[] = [
        { value: 'xs', label: 'Extra Small' },
        { value: 'sm', label: 'Small' },
        { value: 'md', label: 'Medium' },
        { value: 'lg', label: 'Large' },
        { value: 'xl', label: 'Extra Large' }
    ];

    // Form validation states
    isFormValid: boolean = false;
    formErrors: string[] = [];

    constructor(private fb: FormBuilder) {
        this.validationForm = this.fb.group({
            requiredField: ['', Validators.required],
            agreement: ['', Validators.required],
            priority: ['', Validators.required],
            size: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        // Subscribe to form changes to update validation state
        this.validationForm.valueChanges.subscribe(() => {
            this.updateValidationState();
        });

        this.updateValidationState();
    }

    /**
     * Update validation state
     */
    private updateValidationState(): void {
        this.isFormValid = this.validationForm.valid;
        this.formErrors = this.getFormErrors();
    }

    /**
     * Get form errors
     */
    private getFormErrors(): string[] {
        const errors: string[] = [];

        Object.keys(this.validationForm.controls).forEach(key => {
            const control = this.validationForm.get(key);
            if (control && control.errors && control.touched) {
                if (control.errors['required']) {
                    errors.push(`${this.getFieldLabel(key)} is required`);
                }
            }
        });

        return errors;
    }

    /**
     * Get field label for error messages
     */
    private getFieldLabel(fieldName: string): string {
        const labels: { [key: string]: string } = {
            requiredField: 'Required Field',
            agreement: 'Agreement',
            priority: 'Priority',
            size: 'Size'
        };
        return labels[fieldName] || fieldName;
    }

    /**
     * Handle form submission
     */
    onSubmit(): void {
        if (this.validationForm.valid) {
            console.log('Form submitted successfully:', this.validationForm.value);
            alert('Form submitted successfully!');
        } else {
            console.log('Form has validation errors:', this.formErrors);
            this.markAllFieldsAsTouched();
        }
    }

    /**
     * Mark all fields as touched to show validation errors
     */
    private markAllFieldsAsTouched(): void {
        Object.keys(this.validationForm.controls).forEach(key => {
            this.validationForm.get(key)?.markAsTouched();
        });
    }

    /**
     * Reset form
     */
    resetForm(): void {
        this.validationForm.reset();
        this.updateValidationState();
    }

    /**
     * Get validation status for a specific field
     */
    getFieldValidationStatus(fieldName: string): 'valid' | 'invalid' | 'pending' {
        const control = this.validationForm.get(fieldName);
        if (!control) return 'pending';

        if (control.touched) {
            return control.valid ? 'valid' : 'invalid';
        }

        return 'pending';
    }

    /**
     * Get validation message for a specific field
     */
    getFieldValidationMessage(fieldName: string): string {
        const control = this.validationForm.get(fieldName);
        if (!control || !control.errors || !control.touched) return '';

        if (control.errors['required']) {
            return `${this.getFieldLabel(fieldName)} is required`;
        }

        return '';
    }
}
