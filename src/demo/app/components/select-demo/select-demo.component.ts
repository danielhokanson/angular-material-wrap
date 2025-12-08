import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
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

import { AmwSelectComponent } from '../../../../library/src/controls/components/amw-select/amw-select.component';
import { AmwSize } from '../../../../library/src/shared/types';
import { SelectOption } from '../../../../library/src/controls/components/amw-select/interfaces/select.interface';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
    selector: 'amw-demo-select',
    standalone: true,
    imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
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
    AmwSelectComponent
],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './select-demo.component.html',
    styleUrl: './select-demo.component.scss'
})
export class SelectDemoComponent implements OnInit {
    // Form for validation examples
    validationForm: FormGroup;

    // Select variations for display
    selectVariations = {
        appearances: [
            { appearance: 'outline' as MatFormFieldAppearance, label: 'Outline' },
            { appearance: 'fill' as MatFormFieldAppearance, label: 'Fill' }
        ],
        sizes: [
            { size: 'small' as AmwSize, label: 'Small' },
            { size: 'medium' as AmwSize, label: 'Medium' },
            { size: 'large' as AmwSize, label: 'Large' }
        ],
        states: [
            { disabled: false, required: false, multiple: false, label: 'Normal' },
            { disabled: true, required: false, multiple: false, label: 'Disabled' },
            { disabled: false, required: true, multiple: false, label: 'Required' },
            { disabled: false, required: false, multiple: true, label: 'Multiple' }
        ]
    };

    // Sample options
    sampleOptions: SelectOption[] = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3', disabled: true },
        { value: 'option4', label: 'Option 4' },
        { value: 'option5', label: 'Option 5' }
    ];

    groupedOptions: SelectOption[] = [
        { value: 'fruit1', label: 'Apple', group: 'Fruits' },
        { value: 'fruit2', label: 'Banana', group: 'Fruits' },
        { value: 'fruit3', label: 'Orange', group: 'Fruits' },
        { value: 'veg1', label: 'Carrot', group: 'Vegetables' },
        { value: 'veg2', label: 'Broccoli', group: 'Vegetables' },
        { value: 'veg3', label: 'Spinach', group: 'Vegetables' }
    ];

    // Code examples
    codeExamples = {
        basic: `<amw-select 
  label="Choose an option"
  [options]="sampleOptions">
</amw-select>`,
        withValidation: `<amw-select 
  label="Required Selection"
  [options]="sampleOptions"
  [required]="true"
  formControlName="requiredSelect">
</amw-select>`,
        multiple: `<amw-select 
  label="Choose multiple options"
  [options]="sampleOptions"
  [multiple]="true">
</amw-select>`,
        grouped: `<amw-select 
  label="Choose from groups"
  [options]="groupedOptions"
  [grouped]="true">
</amw-select>`,
        disabled: `<amw-select 
  label="Disabled Select"
  [options]="sampleOptions"
  [disabled]="true">
</amw-select>`,
        withIcon: `<amw-select 
  label="Select with Icon"
  [options]="sampleOptions"
  icon="favorite">
</amw-select>`
    };

    // API documentation
    apiDocumentation = {
        inputs: [
            {
                name: 'options',
                type: 'SelectOption[]',
                default: '[]',
                description: 'Array of options to display in the select',
                options: ['Array of SelectOption objects']
            },
            {
                name: 'label',
                type: 'string',
                default: 'undefined',
                description: 'The label text for the select field',
                options: ['Any string']
            },
            {
                name: 'placeholder',
                type: 'string',
                default: 'undefined',
                description: 'Placeholder text shown when no option is selected',
                options: ['Any string']
            },
            {
                name: 'value',
                type: 'any',
                default: 'undefined',
                description: 'The current value of the select',
                options: ['Any value matching option values']
            },
            {
                name: 'disabled',
                type: 'boolean',
                default: 'false',
                description: 'Whether the select is disabled',
                options: ['true', 'false']
            },
            {
                name: 'required',
                type: 'boolean',
                default: 'false',
                description: 'Whether the select is required',
                options: ['true', 'false']
            },
            {
                name: 'multiple',
                type: 'boolean',
                default: 'false',
                description: 'Whether multiple options can be selected',
                options: ['true', 'false']
            },
            {
                name: 'grouped',
                type: 'boolean',
                default: 'false',
                description: 'Whether options should be grouped',
                options: ['true', 'false']
            },
            {
                name: 'size',
                type: 'SelectSize',
                default: 'medium',
                description: 'The size of the select field',
                options: ['small', 'medium', 'large']
            },
            {
                name: 'appearance',
                type: 'MatFormFieldAppearance',
                default: 'outline',
                description: 'The visual appearance of the select field',
                options: ['outline', 'fill']
            },
            {
                name: 'icon',
                type: 'string',
                default: 'undefined',
                description: 'Material icon name to display as prefix',
                options: ['Any valid Material icon name']
            }
        ],
        outputs: [
            {
                name: 'valueChange',
                type: 'EventEmitter<any>',
                description: 'Emitted when the select value changes'
            },
            {
                name: 'focus',
                type: 'EventEmitter<FocusEvent>',
                description: 'Emitted when the select receives focus'
            },
            {
                name: 'blur',
                type: 'EventEmitter<FocusEvent>',
                description: 'Emitted when the select loses focus'
            }
        ]
    };

    constructor(
        private fb: FormBuilder,
        private snackBar: MatSnackBar
    ) {
        this.validationForm = this.fb.group({
            requiredSelect: ['', Validators.required],
            multipleSelect: [[], Validators.required],
            groupedSelect: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        // Initialize any component-specific logic
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
        }
        return '';
    }
}
