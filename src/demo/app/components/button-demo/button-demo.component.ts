import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwButtonStyle, AmwFabType } from '../../../../library/src/controls/components/amw-button/interfaces/amw-button.interface';
import { AmwSize, AmwColor } from '../../../../library/src/shared/types';

@Component({
    selector: 'amw-demo-button',
    standalone: true,
    imports: [
    ReactiveFormsModule,
    AmwButtonComponent
],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './button-demo.component.html',
    styleUrl: './button-demo.component.scss'
})
export class ButtonDemoComponent implements OnInit {
    // Form for validation examples
    validationForm: FormGroup;

    // Button variations for display
    buttonVariations = {
        sizes: [
            { size: 'small' as AmwSize, label: 'Small' },
            { size: 'medium' as AmwSize, label: 'Medium' },
            { size: 'large' as AmwSize, label: 'Large' }
        ],
        appearances: [
            { appearance: 'text' as AmwButtonStyle, label: 'Text' },
            { appearance: 'elevated' as AmwButtonStyle, label: 'Elevated' },
            { appearance: 'outlined' as AmwButtonStyle, label: 'Outlined' },
            { appearance: 'filled' as AmwButtonStyle, label: 'Filled' },
            { appearance: 'tonal' as AmwButtonStyle, label: 'Tonal' }
        ],
        fabTypes: [
            { fab: false as AmwFabType, label: 'None' },
            { fab: true as AmwFabType, label: 'FAB' },
            { fab: 'mini' as AmwFabType, label: 'Mini FAB' },
            { fab: 'extended' as AmwFabType, label: 'Extended FAB' }
        ],
        colors: [
            { color: 'primary' as AmwColor, label: 'Primary' },
            { color: 'accent' as AmwColor, label: 'Accent' },
            { color: 'warn' as AmwColor, label: 'Warn' }
        ],
        states: [
            { disabled: false, loading: false, label: 'Normal' },
            { disabled: true, loading: false, label: 'Disabled' },
            { disabled: false, loading: true, label: 'Loading' }
        ]
    };

    // Code examples
    codeExamples = {
        basic: `<amw-button appearance="elevated" color="primary">
  Click me
</amw-button>`,
        withIcon: `<amw-button appearance="elevated" color="primary" icon="save">
  Save Changes
</amw-button>`,
        fab: `<amw-button [fab]="true" color="primary" icon="add">
</amw-button>`,
        loading: `<amw-button appearance="elevated" color="primary" [loading]="isLoading">
  {{ isLoading ? 'Saving...' : 'Save' }}
</amw-button>`,
        disabled: `<amw-button appearance="elevated" color="primary" [disabled]="!isValid">
  Submit Form
</amw-button>`,
        eventHandling: `<amw-button appearance="elevated" color="primary" (click)="onButtonClick($event)">
  Click Handler
</amw-button>`
    };

    // API documentation
    apiDocumentation = {
        inputs: [
            {
                name: 'appearance',
                type: 'AmwButtonStyle',
                default: 'filled',
                description: 'The visual style of the button',
                options: ['text', 'elevated', 'outlined', 'filled', 'tonal']
            },
            {
                name: 'fab',
                type: 'AmwFabType',
                default: 'false',
                description: 'FAB (Floating Action Button) configuration',
                options: ['false', 'true', '"standard"', '"mini"', '"extended"']
            },
            {
                name: 'color',
                type: 'AmwColor',
                default: 'primary',
                description: 'The color theme of the button',
                options: ['primary', 'accent', 'warn']
            },
            {
                name: 'size',
                type: 'AmwSize',
                default: 'medium',
                description: 'The size of the button',
                options: ['small', 'medium', 'large']
            },
            {
                name: 'disabled',
                type: 'boolean',
                default: 'false',
                description: 'Whether the button is disabled',
                options: ['true', 'false']
            },
            {
                name: 'loading',
                type: 'boolean',
                default: 'false',
                description: 'Whether the button is in loading state',
                options: ['true', 'false']
            },
            {
                name: 'icon',
                type: 'string',
                default: 'undefined',
                description: 'Material icon name. Icon-only mode is inferred when set without text.',
                options: ['Any valid Material icon name']
            },
            {
                name: 'iconPosition',
                type: 'IconPosition',
                default: 'left',
                description: 'Position of the icon relative to text',
                options: ['left', 'right']
            },
            {
                name: 'text',
                type: 'string',
                default: 'undefined',
                description: 'Button text content (alternative to ng-content)',
                options: ['Any string']
            }
        ],
        outputs: [
            {
                name: 'buttonClick',
                type: 'EventEmitter<MouseEvent>',
                description: 'Emitted when the button is clicked'
            },
            {
                name: 'buttonFocus',
                type: 'EventEmitter<FocusEvent>',
                description: 'Emitted when the button receives focus'
            },
            {
                name: 'buttonBlur',
                type: 'EventEmitter<FocusEvent>',
                description: 'Emitted when the button loses focus'
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
            maxLengthField: ['', [Validators.required, Validators.maxLength(10)]]
        });
    }

    ngOnInit(): void {
        // Initialize any component-specific logic
    }

    onButtonClick(event: MouseEvent): void {
        this.notification.info('Button Clicked', 'Button clicked!', {
            duration: 2000
        });
    }

    onSubmit(): void {
        if (this.validationForm.valid) {
            this.notification.success('Form Valid', 'Form is valid!', {
                duration: 2000
            });
        } else {
            this.notification.error('Validation Error', 'Form has validation errors!', {
                duration: 2000
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