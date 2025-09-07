import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { ButtonVariant } from '../../../../library/src/controls/components/amw-button/interfaces/button.interface';
import { ButtonSize } from '../../../../library/src/controls/components/amw-button/interfaces/button-size.type';
import { ButtonColor } from '../../../../library/src/controls/components/amw-button/interfaces/button-color.type';

@Component({
    selector: 'amw-demo-button',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatCardModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatTooltipModule,
        MatRippleModule,
        MatOptionModule,
        MatDividerModule,
        MatExpansionModule,
        MatTabsModule,
        MatSnackBarModule,
        AmwButtonComponent,
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
            { size: 'small' as ButtonSize, label: 'Small' },
            { size: 'medium' as ButtonSize, label: 'Medium' },
            { size: 'large' as ButtonSize, label: 'Large' }
        ],
        variants: [
            { variant: 'text' as ButtonVariant, label: 'Text' },
            { variant: 'elevated' as ButtonVariant, label: 'Elevated' },
            { variant: 'outlined' as ButtonVariant, label: 'Outlined' },
            { variant: 'filled' as ButtonVariant, label: 'Filled' },
            { variant: 'tonal' as ButtonVariant, label: 'Tonal' },
            { variant: 'icon' as ButtonVariant, label: 'Icon' },
            { variant: 'fab' as ButtonVariant, label: 'FAB' },
            { variant: 'mini-fab' as ButtonVariant, label: 'Mini FAB' },
            { variant: 'extended-fab' as ButtonVariant, label: 'Extended FAB' }
        ],
        colors: [
            { color: 'primary' as ButtonColor, label: 'Primary' },
            { color: 'accent' as ButtonColor, label: 'Accent' },
            { color: 'warn' as ButtonColor, label: 'Warn' }
        ],
        states: [
            { disabled: false, loading: false, label: 'Normal' },
            { disabled: true, loading: false, label: 'Disabled' },
            { disabled: false, loading: true, label: 'Loading' }
        ]
    };

    // Code examples
    codeExamples = {
        basic: `<amw-button variant="elevated" color="primary">
  Click me
</amw-button>`,
        withIcon: `<amw-button variant="elevated" color="primary" icon="save">
  Save Changes
</amw-button>`,
        fab: `<amw-button variant="fab" color="primary" icon="add">
</amw-button>`,
        loading: `<amw-button variant="elevated" color="primary" [loading]="isLoading">
  {{ isLoading ? 'Saving...' : 'Save' }}
</amw-button>`,
        disabled: `<amw-button variant="elevated" color="primary" [disabled]="!isValid">
  Submit Form
</amw-button>`,
        eventHandling: `<amw-button variant="elevated" color="primary" (click)="onButtonClick($event)">
  Click Handler
</amw-button>`
    };

    // API documentation
    apiDocumentation = {
        inputs: [
            {
                name: 'variant',
                type: 'ButtonVariant',
                default: 'elevated',
                description: 'The visual style variant of the button',
                options: ['text', 'elevated', 'outlined', 'filled', 'tonal', 'icon', 'fab', 'mini-fab', 'extended-fab']
            },
            {
                name: 'color',
                type: 'ButtonColor',
                default: 'primary',
                description: 'The color theme of the button',
                options: ['primary', 'accent', 'warn']
            },
            {
                name: 'size',
                type: 'ButtonSize',
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
                description: 'Material icon name to display',
                options: ['Any valid Material icon name']
            },
            {
                name: 'iconPosition',
                type: 'ButtonIconPosition',
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
                name: 'click',
                type: 'EventEmitter<MouseEvent>',
                description: 'Emitted when the button is clicked'
            },
            {
                name: 'focus',
                type: 'EventEmitter<FocusEvent>',
                description: 'Emitted when the button receives focus'
            },
            {
                name: 'blur',
                type: 'EventEmitter<FocusEvent>',
                description: 'Emitted when the button loses focus'
            }
        ]
    };

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

    onButtonClick(event: MouseEvent): void {
        this.snackBar.open('Button clicked!', 'Close', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
        });
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