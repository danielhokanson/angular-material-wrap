import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { MatOptionModule } from '@angular/material/core';
import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { InputType } from '../../../../library/src/controls/components/amw-input/interfaces/input-type.type';
import { InputAppearance } from '../../../../library/src/controls/components/amw-input/interfaces/input-appearance.type';
import { AmwSize } from '../../../../library/src/shared/types';

@Component({
    selector: 'amw-demo-input',
    standalone: true,
    imports: [
    ReactiveFormsModule,
    AmwButtonComponent,
    MatIconModule,
    AmwInputComponent,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatRippleModule,
    MatOptionModule,
    AmwInputComponent
],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './input-demo.component.html',
    styleUrl: './input-demo.component.scss'
})
export class InputDemoComponent implements OnInit {
    // Form for validation examples
    validationForm: FormGroup;

    // Input variations for display
    inputVariations = {
        types: [
            { type: 'text' as InputType, label: 'Text' },
            { type: 'email' as InputType, label: 'Email' },
            { type: 'password' as InputType, label: 'Password' },
            { type: 'number' as InputType, label: 'Number' },
            { type: 'tel' as InputType, label: 'Telephone' },
            { type: 'url' as InputType, label: 'URL' },
            { type: 'search' as InputType, label: 'Search' }
        ],
        appearances: [
            { appearance: 'outline' as InputAppearance, label: 'Outline' },
            { appearance: 'fill' as InputAppearance, label: 'Fill' }
        ],
        sizes: [
            { size: 'small' as AmwSize, label: 'Small' },
            { size: 'medium' as AmwSize, label: 'Medium' },
            { size: 'large' as AmwSize, label: 'Large' }
        ],
        states: [
            { disabled: false, required: false, readonly: false, label: 'Normal' },
            { disabled: true, required: false, readonly: false, label: 'Disabled' },
            { disabled: false, required: true, readonly: false, label: 'Required' },
            { disabled: false, required: false, readonly: true, label: 'Readonly' }
        ]
    };

    // Code examples
    codeExamples = {
        basic: `<amw-input 
  type="text"
  placeholder="Enter your name"
  label="Full Name">
</amw-input>`,
        withIcon: `<amw-input 
  type="email"
  placeholder="Enter your email"
  label="Email Address"
  icon="email">
</amw-input>`,
        withValidation: `<amw-input 
  type="email"
  placeholder="Enter your email"
  label="Email Address"
  [required]="true"
  [formControl]="emailControl">
</amw-input>`,
        withPrefix: `<amw-input 
  type="text"
  placeholder="Enter amount"
  label="Amount"
  prefix="$">
</amw-input>`,
        withSuffix: `<amw-input 
  type="text"
  placeholder="Enter website"
  label="Website"
  suffix=".com">
</amw-input>`,
        disabled: `<amw-input 
  type="text"
  placeholder="This is disabled"
  label="Disabled Input"
  [disabled]="true">
</amw-input>`
    };

    // API documentation
    apiDocumentation = {
        inputs: [
            {
                name: 'type',
                type: 'InputType',
                default: 'text',
                description: 'The HTML input type',
                options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search']
            },
            {
                name: 'appearance',
                type: 'InputAppearance',
                default: 'outline',
                description: 'The visual appearance of the input field',
                options: ['outline', 'fill']
            },
            {
                name: 'size',
                type: 'InputSize',
                default: 'medium',
                description: 'The size of the input field',
                options: ['small', 'medium', 'large']
            },
            {
                name: 'label',
                type: 'string',
                default: 'undefined',
                description: 'The label text for the input field',
                options: ['Any string']
            },
            {
                name: 'placeholder',
                type: 'string',
                default: 'undefined',
                description: 'Placeholder text shown when input is empty',
                options: ['Any string']
            },
            {
                name: 'value',
                type: 'string',
                default: 'undefined',
                description: 'The current value of the input',
                options: ['Any string']
            },
            {
                name: 'disabled',
                type: 'boolean',
                default: 'false',
                description: 'Whether the input is disabled',
                options: ['true', 'false']
            },
            {
                name: 'required',
                type: 'boolean',
                default: 'false',
                description: 'Whether the input is required',
                options: ['true', 'false']
            },
            {
                name: 'readonly',
                type: 'boolean',
                default: 'false',
                description: 'Whether the input is readonly',
                options: ['true', 'false']
            },
            {
                name: 'icon',
                type: 'string',
                default: 'undefined',
                description: 'Material icon name to display as prefix',
                options: ['Any valid Material icon name']
            },
            {
                name: 'prefix',
                type: 'string',
                default: 'undefined',
                description: 'Text to display as prefix',
                options: ['Any string']
            },
            {
                name: 'suffix',
                type: 'string',
                default: 'undefined',
                description: 'Text to display as suffix',
                options: ['Any string']
            }
        ],
        outputs: [
            {
                name: 'valueChange',
                type: 'EventEmitter<string>',
                description: 'Emitted when the input value changes'
            },
            {
                name: 'focus',
                type: 'EventEmitter<FocusEvent>',
                description: 'Emitted when the input receives focus'
            },
            {
                name: 'blur',
                type: 'EventEmitter<FocusEvent>',
                description: 'Emitted when the input loses focus'
            }
        ]
    };

    constructor(
        private fb: FormBuilder,
        private notification: AmwNotificationService
    ) {
        this.validationForm = this.fb.group({
            requiredField: ['', Validators.required],
            emailField: ['', [Validators.required, Validators.email]],
            minLengthField: ['', [Validators.required, Validators.minLength(5)]],
            maxLengthField: ['', [Validators.required, Validators.maxLength(10)]],
            patternField: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]]
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
            if (field.errors['pattern']) return 'Please enter only letters';
        }
        return '';
    }
}