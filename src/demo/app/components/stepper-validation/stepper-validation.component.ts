import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';

@Component({
    selector: 'amw-demo-stepper-validation',
    standalone: true,
    imports: [MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatCardModule,
    AmwButtonComponent,
    AmwInputComponent],
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
