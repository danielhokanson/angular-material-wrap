import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'amw-demo-stepper',
    standalone: true,
    imports: [
        CommonModule,
        MatStepperModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
    ],
    template: `
        <div class="stepper-demo">
            <h2>Stepper Component Demo</h2>
            <p>Interactive demonstration of the Material Stepper component with form validation.</p>

            <mat-stepper #stepper>
                <mat-step [stepControl]="firstFormGroup" label="Personal Information">
                    <form [formGroup]="firstFormGroup">
                        <mat-form-field appearance="outline">
                            <mat-label>First Name</mat-label>
                            <input matInput formControlName="firstName" placeholder="Enter your first name">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                            <mat-label>Last Name</mat-label>
                            <input matInput formControlName="lastName" placeholder="Enter your last name">
                        </mat-form-field>
                        <div>
                            <button mat-button matStepperNext>Next</button>
                        </div>
                    </form>
                </mat-step>

                <mat-step [stepControl]="secondFormGroup" label="Contact Information">
                    <form [formGroup]="secondFormGroup">
                        <mat-form-field appearance="outline">
                            <mat-label>Email</mat-label>
                            <input matInput formControlName="email" placeholder="Enter your email">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                            <mat-label>Phone</mat-label>
                            <input matInput formControlName="phone" placeholder="Enter your phone number">
                        </mat-form-field>
                        <div>
                            <button mat-button matStepperPrevious>Back</button>
                            <button mat-button matStepperNext>Next</button>
                        </div>
                    </form>
                </mat-step>

                <mat-step label="Review">
                    <h3>Review Your Information</h3>
                    <p><strong>Name:</strong> {{ firstFormGroup.value.firstName }} {{ firstFormGroup.value.lastName }}</p>
                    <p><strong>Email:</strong> {{ secondFormGroup.value.email }}</p>
                    <p><strong>Phone:</strong> {{ secondFormGroup.value.phone }}</p>
                    <div>
                        <button mat-button matStepperPrevious>Back</button>
                        <button mat-button (click)="stepper.reset()">Reset</button>
                        <button mat-raised-button color="primary" (click)="onSubmit()">Submit</button>
                    </div>
                </mat-step>
            </mat-stepper>
        </div>
    `,
    styles: [`
        .stepper-demo {
            padding: 20px;
        }
        
        .stepper-demo h2 {
            margin-bottom: 10px;
        }
        
        .stepper-demo p {
            margin-bottom: 20px;
            color: #666;
        }
        
        mat-form-field {
            width: 100%;
            margin-bottom: 16px;
        }
        
        button {
            margin-right: 8px;
        }
    `]
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
