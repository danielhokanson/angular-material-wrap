import { Component, ViewEncapsulation, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { form } from '@angular/forms/signals';

import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwCardComponent, AmwIconComponent, AmwDividerComponent } from '../../../../library/src/components/components';

/**
 * Signal Forms Validation Component
 * Compares the three form binding approaches:
 * 1. ngModel (Template-driven)
 * 2. formControl (Reactive Forms)
 * 3. field (Signal Forms)
 */
@Component({
    selector: 'amw-demo-signal-forms-validation',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AmwInputComponent,
        AmwButtonComponent,
        AmwCardComponent,
        AmwIconComponent,
        AmwDividerComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './signal-forms-validation.component.html',
    styleUrl: './signal-forms-validation.component.scss'
})
export class SignalFormsValidationComponent {
    // ===== Approach 1: ngModel (Template-driven) =====
    ngModelValue = '';
    ngModelEmail = '';

    // ===== Approach 2: Reactive Forms (FormControl/FormGroup) =====
    reactiveForm: FormGroup;

    // ===== Approach 3: Signal Forms (field) =====
    signalForm = form({
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]]
    });

    // Computed values for Signal Forms
    signalFormValues = computed(() => this.signalForm.value());
    signalFormValid = computed(() => this.signalForm.valid());
    signalFormErrors = computed(() => ({
        name: this.signalForm.name().errors(),
        email: this.signalForm.email().errors()
    }));

    constructor(private fb: FormBuilder) {
        // Initialize Reactive Form
        this.reactiveForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]]
        });
    }

    // Get validation state for ngModel approach
    get ngModelValidation() {
        return {
            nameValid: this.ngModelValue.length >= 2,
            emailValid: this.isValidEmail(this.ngModelEmail)
        };
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    resetAll(): void {
        // Reset ngModel
        this.ngModelValue = '';
        this.ngModelEmail = '';

        // Reset Reactive Form
        this.reactiveForm.reset();

        // Reset Signal Form
        this.signalForm.reset();
    }
}
