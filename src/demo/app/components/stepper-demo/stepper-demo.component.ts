import { Component } from '@angular/core';

import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'amw-demo-stepper',
    standalone: true,
    imports: [
        MatStepperModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
    ],
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
