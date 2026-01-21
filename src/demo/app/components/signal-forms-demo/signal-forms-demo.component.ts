import { Component, ViewEncapsulation, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, Validators } from '@angular/forms';
import { form, Field } from '@angular/forms/signals';

import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwTextareaComponent } from '../../../../library/src/controls/components/amw-textarea/amw-textarea.component';
import { AmwSelectComponent } from '../../../../library/src/controls/components/amw-select/amw-select.component';
import { AmwCheckboxComponent } from '../../../../library/src/controls/components/amw-checkbox/amw-checkbox.component';
import { AmwRadioGroupComponent } from '../../../../library/src/controls/components/amw-radio-group/amw-radio-group.component';
import { AmwSliderComponent } from '../../../../library/src/controls/components/amw-slider/amw-slider.component';
import { AmwToggleComponent } from '../../../../library/src/controls/components/amw-toggle/amw-toggle.component';
import { AmwSwitchComponent } from '../../../../library/src/controls/components/amw-switch/amw-switch.component';
import { AmwDatepickerComponent } from '../../../../library/src/controls/components/amw-datepicker/amw-datepicker.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwCardComponent, AmwIconComponent, AmwDividerComponent } from '../../../../library/src/components/components';
import { AmwSelectOption } from '../../../../library/src/controls/components/amw-select/interfaces/amw-select-option.interface';
import { AmwRadioGroupOption } from '../../../../library/src/controls/components/amw-radio-group/interfaces/amw-radio-group-option.interface';

/**
 * Signal Forms Demo Component
 * Demonstrates Angular Signal Forms API integration with AMW form controls
 * @experimental Signal Forms are experimental and may change in future Angular releases.
 */
@Component({
    selector: 'amw-demo-signal-forms',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        AmwInputComponent,
        AmwTextareaComponent,
        AmwSelectComponent,
        AmwCheckboxComponent,
        AmwRadioGroupComponent,
        AmwSliderComponent,
        AmwToggleComponent,
        AmwSwitchComponent,
        AmwDatepickerComponent,
        AmwButtonComponent,
        AmwCardComponent,
        AmwIconComponent,
        AmwDividerComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './signal-forms-demo.component.html',
    styleUrl: './signal-forms-demo.component.scss'
})
export class SignalFormsDemoComponent {
    /**
     * Create a signal-based form using form() factory
     * This is the new Angular Signal Forms API (experimental)
     */
    userForm = form({
        // Text inputs
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],

        // Textarea
        bio: [''],

        // Select
        country: [''],

        // Checkbox
        agreeToTerms: [false, Validators.requiredTrue],

        // Radio group
        preferredContact: ['email'],

        // Slider
        experience: [5],

        // Toggle/Switch
        notifications: [true],
        darkMode: [false],

        // Date
        birthDate: [null as Date | null]
    });

    // Computed values that react to form changes
    formValues = computed(() => this.userForm.value());
    isFormValid = computed(() => this.userForm.valid());

    // Options for select and radio group
    countryOptions: AmwSelectOption[] = [
        { value: 'us', label: 'United States' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'ca', label: 'Canada' },
        { value: 'au', label: 'Australia' },
        { value: 'de', label: 'Germany' }
    ];

    contactOptions: AmwRadioGroupOption[] = [
        { value: 'email', label: 'Email' },
        { value: 'phone', label: 'Phone' },
        { value: 'mail', label: 'Postal Mail' }
    ];

    onSubmit(): void {
        if (this.userForm.valid()) {
            console.log('Form submitted:', this.userForm.value());
            alert('Form submitted successfully!\n\n' + JSON.stringify(this.userForm.value(), null, 2));
        } else {
            console.log('Form is invalid');
            alert('Please fill in all required fields correctly.');
        }
    }

    resetForm(): void {
        this.userForm.reset();
    }
}
