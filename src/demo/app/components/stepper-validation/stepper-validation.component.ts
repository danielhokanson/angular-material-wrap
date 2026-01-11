import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwCardComponent, AmwIconComponent } from '../../../../library/src/components/components';
import { AmwStepperComponent } from '../../../../library/src/components/components/amw-stepper/amw-stepper.component';
import { StepperStep, StepperConfig } from '../../../../library/src/components/components/amw-stepper/interfaces';

@Component({
    selector: 'amw-demo-stepper-validation',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        AmwButtonComponent,
        AmwInputComponent,
        AmwCardComponent,
        AmwIconComponent,
        AmwStepperComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './stepper-validation.component.html',
    styleUrl: './stepper-validation.component.scss'
})
export class StepperValidationComponent implements OnInit {
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
        showCompletion: false
    };

    validationSteps: StepperStep[] = [
        {
            label: 'Personal Information',
            description: 'Required fields for personal details',
            icon: 'person',
            isValid: false
        },
        {
            label: 'Contact Information',
            description: 'Required fields for contact details',
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

    constructor(private _formBuilder: FormBuilder) {
        this.firstFormGroup = this._formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
        });
        this.secondFormGroup = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        // Subscribe to form changes to update step validity
        this.firstFormGroup.statusChanges.subscribe(() => {
            this.validationSteps[0].isValid = this.firstFormGroup.valid;
        });

        this.secondFormGroup.statusChanges.subscribe(() => {
            this.validationSteps[1].isValid = this.secondFormGroup.valid;
        });
    }

    onStepChange(stepIndex: number): void {
        this.currentStep = stepIndex;
    }

    resetStepper(): void {
        this.currentStep = 0;
        this.firstFormGroup.reset();
        this.secondFormGroup.reset();
        this.validationSteps.forEach(step => step.isCompleted = false);
    }
}
