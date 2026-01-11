import { Component } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwStepperComponent } from '../../../../library/src/components/components/amw-stepper/amw-stepper.component';
import { StepperStep, StepperConfig } from '../../../../library/src/components/components/amw-stepper/interfaces';

@Component({
    selector: 'amw-demo-stepper',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        AmwButtonComponent,
        AmwInputComponent,
        AmwStepperComponent
    ],
    templateUrl: './stepper-demo.component.html',
    styleUrl: './stepper-demo.component.scss'
})
export class StepperDemoComponent {
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    currentStep = 0;

    stepperConfig: StepperConfig = {
        orientation: 'horizontal',
        linear: true,
        showLabels: true,
        showIcons: true,
        showDescriptions: true,
        showNavigation: true,
        showCompletion: true
    };

    stepperSteps: StepperStep[] = [
        {
            label: 'Personal Information',
            description: 'Enter your name details',
            icon: 'person',
            isValid: false
        },
        {
            label: 'Contact Information',
            description: 'Enter your contact details',
            icon: 'email',
            isValid: false
        },
        {
            label: 'Review',
            description: 'Review your information',
            icon: 'check_circle',
            isValid: true
        }
    ];

    constructor(private formBuilder: FormBuilder) {
        this.firstFormGroup = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required]
        });

        this.secondFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required]
        });

        // Subscribe to form changes to update step validity
        this.firstFormGroup.statusChanges.subscribe(() => {
            this.stepperSteps[0].isValid = this.firstFormGroup.valid;
        });

        this.secondFormGroup.statusChanges.subscribe(() => {
            this.stepperSteps[1].isValid = this.secondFormGroup.valid;
        });
    }

    onStepChange(stepIndex: number): void {
        this.currentStep = stepIndex;
    }

    onStepperCompleted(): void {
        this.onSubmit();
    }

    onSubmit(): void {
        console.log('Form submitted:', {
            personal: this.firstFormGroup.value,
            contact: this.secondFormGroup.value
        });
        alert('Form submitted successfully!');
    }
}
