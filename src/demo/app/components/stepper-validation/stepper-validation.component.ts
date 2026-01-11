import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwCardComponent, AmwIconComponent } from '../../../../library/src/components/components';

@Component({
    selector: 'amw-demo-stepper-validation',
    standalone: true,
    imports: [
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    AmwButtonComponent,
    AmwInputComponent,
    AmwCardComponent,
    AmwIconComponent
],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './stepper-validation.component.html',
    styleUrl: './stepper-validation.component.scss'
})
export class StepperValidationComponent implements OnInit {
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

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

    ngOnInit(): void { }
}
