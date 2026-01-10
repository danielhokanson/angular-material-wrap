import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AmwRadioGroupComponent } from '../../../../library/src/controls/components/amw-radio-group/amw-radio-group.component';
import { RadioGroupOption, RadioGroupConfig } from '../../../../library/src/controls/components/amw-radio-group/interfaces/radio-group.interface';
import { AmwSize } from '../../../../library/src/shared/types/amw-size.type';
import { MatOptionModule } from '@angular/material/core';
import { AmwDividerComponent } from '../../../../library/src/components/components/amw-divider/amw-divider.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwSelectComponent } from '../../../../library/src/controls/components/amw-select/amw-select.component';
import { AmwSwitchComponent } from '../../../../library/src/controls/components/amw-switch/amw-switch.component';

/**
 * Radio Group Demo Component
 * Demonstrates the AMW Radio Group component functionality
 */
@Component({
    selector: 'app-radio-group-demo',
    standalone: true,
    imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    AmwRadioGroupComponent,
    MatOptionModule,
    AmwDividerComponent,
    AmwButtonComponent,
    AmwInputComponent,
    AmwSelectComponent,
    AmwSwitchComponent],
    templateUrl: './radio-group-demo.component.html',
    styleUrl: './radio-group-demo.component.scss'
})
export class RadioGroupDemoComponent implements OnInit {
    // Form for reactive forms demo
    reactiveForm: FormGroup;

    // Basic properties
    selectedValue: any = null;
    selectedValue2: any = null;
    selectedValue3: any = null;

    // Configuration
    size: AmwSize = 'medium';
    orientation: 'horizontal' | 'vertical' = 'vertical';
    color: 'primary' | 'accent' | 'warn' = 'primary';
    disabled: boolean = false;
    required: boolean = false;
    label: string = 'Choose an option';
    hint: string = 'Select one option from the list below';

    // Sample options
    readonly basicOptions: RadioGroupOption[] = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
    ];

    readonly iconOptions: RadioGroupOption[] = [
        { value: 'home', label: 'Home', icon: 'home' },
        { value: 'work', label: 'Work', icon: 'work' },
        { value: 'school', label: 'School', icon: 'school' },
        { value: 'other', label: 'Other', icon: 'more_horiz' }
    ];

    readonly descriptionOptions: RadioGroupOption[] = [
        {
            value: 'basic',
            label: 'Basic Plan',
            description: 'Perfect for individuals and small teams',
            icon: 'person'
        },
        {
            value: 'pro',
            label: 'Pro Plan',
            description: 'Advanced features for growing businesses',
            icon: 'business'
        },
        {
            value: 'enterprise',
            label: 'Enterprise Plan',
            description: 'Full-featured solution for large organizations',
            icon: 'domain'
        }
    ];

    readonly colorOptions: RadioGroupOption[] = [
        { value: 'red', label: 'Red', icon: 'favorite' },
        { value: 'blue', label: 'Blue', icon: 'favorite' },
        { value: 'green', label: 'Green', icon: 'favorite' },
        { value: 'yellow', label: 'Yellow', icon: 'favorite' }
    ];

    // Configuration options for demo controls
    readonly sizeOptions = [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' }
    ];

    readonly orientationOptions = [
        { value: 'vertical', label: 'Vertical' },
        { value: 'horizontal', label: 'Horizontal' }
    ];

    readonly colorOptionsForDemo = [
        { value: 'primary', label: 'Primary' },
        { value: 'accent', label: 'Accent' },
        { value: 'warn', label: 'Warn' }
    ];

    constructor(private fb: FormBuilder) {
        this.reactiveForm = this.fb.group({
            selectedOption: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        // Set initial values
        this.selectedValue = 'option2';
        this.selectedValue2 = 'work';
        this.selectedValue3 = 'pro';
    }

    /**
     * Handle value change events
     */
    onValueChange(value: any, source: string): void {
        console.log(`${source} value changed:`, value);
    }

    /**
     * Handle selection change events
     */
    onSelectionChange(option: RadioGroupOption, source: string): void {
        console.log(`${source} selection changed:`, option);
    }

    /**
     * Reset all values
     */
    resetValues(): void {
        this.selectedValue = null;
        this.selectedValue2 = null;
        this.selectedValue3 = null;
        this.reactiveForm.patchValue({ selectedOption: '' });
    }

    /**
     * Handle form submission
     */
    onSubmit(): void {
        if (this.reactiveForm.valid) {
            console.log('Form submitted successfully:', this.reactiveForm.value);
            alert('Form submitted successfully!');
        } else {
            console.log('Form has validation errors');
        }
    }

    /**
     * Get current configuration
     */
    get currentConfig(): RadioGroupConfig {
        return {
            options: this.basicOptions,
            size: this.size,
            label: this.label,
            hint: this.hint,
            disabled: this.disabled,
            required: this.required,
            orientation: this.orientation,
            color: this.color
        };
    }
}
