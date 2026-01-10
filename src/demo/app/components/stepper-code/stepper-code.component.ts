import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BaseCodeComponent } from '../base/base-code.component';

type StepperExamples = 'basic' | 'linear' | 'editable' | 'optional' | 'vertical' | 'customIcons';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
@Component({
  selector: 'amw-demo-stepper-code',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    AmwInputComponent,
    MatIconModule,
    MatExpansionModule,
    MatStepperModule,
    MatFormFieldModule,
    AmwButtonComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './stepper-code.component.html',
  styleUrl: './stepper-code.component.scss'
})
export class StepperCodeComponent extends BaseCodeComponent<StepperExamples> {
  // Form groups for reactive forms example
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  // Linear mode state
  isLinear = false;

  // Original code examples (for reset functionality)
  readonly codeExamples: Record<StepperExamples, string> = {
    basic: `<mat-stepper>
  <mat-step>
    <ng-template matStepLabel>Step 1</ng-template>
    <p>Content for step 1</p>
    <div>
      <amw-button variant="elevated" matStepperNext>Next</amw-button>
    </div>
  </mat-step>

  <mat-step>
    <ng-template matStepLabel>Step 2</ng-template>
    <p>Content for step 2</p>
    <div>
      <amw-button variant="text" matStepperPrevious>Back</amw-button>
      <amw-button variant="elevated" matStepperNext>Next</amw-button>
    </div>
  </mat-step>

  <mat-step>
    <ng-template matStepLabel>Step 3</ng-template>
    <p>You're done!</p>
    <div>
      <amw-button variant="text" matStepperPrevious>Back</amw-button>
    </div>
  </mat-step>
</mat-stepper>`,

    linear: `<mat-stepper [linear]="true">
  <mat-step [stepControl]="firstFormGroup">
    <form [formGroup]="firstFormGroup">
      <ng-template matStepLabel>Personal Info</ng-template>
      <amw-input
        label="Name"
        formControlName="name"
        required>
      </amw-input>
      <div>
        <amw-button variant="elevated" matStepperNext>Next</amw-button>
      </div>
    </form>
  </mat-step>

  <mat-step [stepControl]="secondFormGroup">
    <form [formGroup]="secondFormGroup">
      <ng-template matStepLabel>Contact Info</ng-template>
      <amw-input
        label="Email"
        formControlName="email"
        type="email"
        required>
      </amw-input>
      <div>
        <amw-button variant="text" matStepperPrevious>Back</amw-button>
        <amw-button variant="elevated" matStepperNext>Next</amw-button>
      </div>
    </form>
  </mat-step>
</mat-stepper>`,

    editable: `<mat-stepper>
  <mat-step [editable]="true">
    <ng-template matStepLabel>Editable Step</ng-template>
    <p>This step can be edited after completion</p>
    <div>
      <amw-button variant="elevated" matStepperNext>Next</amw-button>
    </div>
  </mat-step>

  <mat-step [editable]="false">
    <ng-template matStepLabel>Non-editable Step</ng-template>
    <p>This step cannot be edited after completion</p>
    <div>
      <amw-button variant="text" matStepperPrevious>Back</amw-button>
    </div>
  </mat-step>
</mat-stepper>`,

    optional: `<mat-stepper>
  <mat-step>
    <ng-template matStepLabel>Required Step</ng-template>
    <p>This step is required</p>
    <div>
      <amw-button variant="elevated" matStepperNext>Next</amw-button>
    </div>
  </mat-step>

  <mat-step [optional]="true">
    <ng-template matStepLabel>Optional Step</ng-template>
    <p>This step is optional</p>
    <div>
      <amw-button variant="text" matStepperPrevious>Back</amw-button>
      <amw-button variant="elevated" matStepperNext>Next</amw-button>
    </div>
  </mat-step>

  <mat-step>
    <ng-template matStepLabel>Final Step</ng-template>
    <p>Complete!</p>
    <div>
      <amw-button variant="text" matStepperPrevious>Back</amw-button>
    </div>
  </mat-step>
</mat-stepper>`,

    vertical: `<mat-stepper orientation="vertical">
  <mat-step>
    <ng-template matStepLabel>Step 1</ng-template>
    <p>Content for step 1</p>
    <div>
      <amw-button variant="elevated" matStepperNext>Next</amw-button>
    </div>
  </mat-step>

  <mat-step>
    <ng-template matStepLabel>Step 2</ng-template>
    <p>Content for step 2</p>
    <div>
      <amw-button variant="text" matStepperPrevious>Back</amw-button>
      <amw-button variant="elevated" matStepperNext>Next</amw-button>
    </div>
  </mat-step>

  <mat-step>
    <ng-template matStepLabel>Step 3</ng-template>
    <p>You're done!</p>
    <div>
      <amw-button variant="text" matStepperPrevious>Back</amw-button>
    </div>
  </mat-step>
</mat-stepper>`,

    customIcons: `<mat-stepper>
  <mat-step>
    <ng-template matStepLabel>
      <mat-icon>person</mat-icon>
      Personal Info
    </ng-template>
    <p>Enter your personal information</p>
    <div>
      <amw-button variant="elevated" matStepperNext>Next</amw-button>
    </div>
  </mat-step>

  <mat-step>
    <ng-template matStepLabel>
      <mat-icon>email</mat-icon>
      Contact
    </ng-template>
    <p>Enter your contact details</p>
    <div>
      <amw-button variant="text" matStepperPrevious>Back</amw-button>
      <amw-button variant="elevated" matStepperNext>Next</amw-button>
    </div>
  </mat-step>

  <mat-step>
    <ng-template matStepLabel>
      <mat-icon>check_circle</mat-icon>
      Complete
    </ng-template>
    <p>All done!</p>
    <div>
      <amw-button variant="text" matStepperPrevious>Back</amw-button>
    </div>
  </mat-step>
</mat-stepper>`
  };

  constructor(private fb: FormBuilder) {
    super();

    // Initialize form groups
    this.firstFormGroup = this.fb.group({
      name: ['', Validators.required]
    });

    this.secondFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.thirdFormGroup = this.fb.group({
      address: ['', Validators.required]
    });
  }
}
