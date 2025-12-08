import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'amw-demo-stepper-validation',
    standalone: true,
    imports: [
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
],
    encapsulation: ViewEncapsulation.None,
    template: `
    <div class="stepper-validation-demo">
      <h3>Stepper Validation Examples</h3>
      <p>Demonstrates various validation scenarios for the stepper component.</p>
    
      <div class="demo-section">
        <h4>Required Field Validation</h4>
        <mat-card>
          <mat-card-content>
            <mat-stepper #stepper>
              <mat-step [stepControl]="firstFormGroup">
                <form [formGroup]="firstFormGroup">
                  <ng-template matStepLabel>Personal Information</ng-template>
                  <mat-form-field>
                    <mat-label>First Name *</mat-label>
                    <input matInput formControlName="firstName" required>
                    @if (firstFormGroup.get('firstName')?.hasError('required')) {
                      <mat-error>
                        First name is required
                      </mat-error>
                    }
                  </mat-form-field>
                  <mat-form-field>
                    <mat-label>Last Name *</mat-label>
                    <input matInput formControlName="lastName" required>
                    @if (firstFormGroup.get('lastName')?.hasError('required')) {
                      <mat-error>
                        Last name is required
                      </mat-error>
                    }
                  </mat-form-field>
                  <div>
                    <button mat-button matStepperNext>Next</button>
                  </div>
                </form>
              </mat-step>
              <mat-step [stepControl]="secondFormGroup">
                <form [formGroup]="secondFormGroup">
                  <ng-template matStepLabel>Contact Information</ng-template>
                  <mat-form-field>
                    <mat-label>Email *</mat-label>
                    <input matInput formControlName="email" type="email" required>
                    @if (secondFormGroup.get('email')?.hasError('required')) {
                      <mat-error>
                        Email is required
                      </mat-error>
                    }
                    @if (secondFormGroup.get('email')?.hasError('email')) {
                      <mat-error>
                        Please enter a valid email
                      </mat-error>
                    }
                  </mat-form-field>
                  <mat-form-field>
                    <mat-label>Phone *</mat-label>
                    <input matInput formControlName="phone" required>
                    @if (secondFormGroup.get('phone')?.hasError('required')) {
                      <mat-error>
                        Phone is required
                      </mat-error>
                    }
                  </mat-form-field>
                  <div>
                    <button mat-button matStepperPrevious>Back</button>
                    <button mat-button matStepperNext>Next</button>
                  </div>
                </form>
              </mat-step>
              <mat-step>
                <ng-template matStepLabel>Review</ng-template>
                <p>Review your information before submitting.</p>
                <div>
                  <button mat-button matStepperPrevious>Back</button>
                  <button mat-button (click)="stepper.reset()">Reset</button>
                </div>
              </mat-step>
            </mat-stepper>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
    `,
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
