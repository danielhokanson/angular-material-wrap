import { Component } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
@Component({
    selector: 'amw-demo-stepper',
    standalone: true,
    imports: [ReactiveFormsModule,
    MatStepperModule,
    AmwButtonComponent,
    AmwInputComponent],
    templateUrl: './stepper-demo.component.html',
    styleUrl: './stepper-demo.component.scss'
})
export class StepperDemoComponent {
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.firstFormGroup = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required]
        });

        this.secondFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required]
        });
    }

    onSubmit(): void {
        console.log('Form submitted:', {
            personal: this.firstFormGroup.value,
            contact: this.secondFormGroup.value
        });
        alert('Form submitted successfully!');
    }
}
