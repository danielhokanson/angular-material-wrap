import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'amw-demo-stepper-code',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './stepper-code.component.html',
  styleUrl: './stepper-code.component.scss'
})
export class StepperCodeComponent {
  // Form groups for reactive forms example
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  // Linear mode state
  isLinear = false;

  // Editable code examples
  editableCode = {
    basic: '',
    linear: '',
    editable: '',
    optional: '',
    vertical: '',
    customIcons: ''
  };

  // Original code examples (for reset functionality)
  readonly codeExamples = {
    basic: `<mat-stepper>
  <mat-step>
    <ng-template matStepLabel>Step 1</ng-template>
    <p>Content for step 1</p>
    <div>
      <button mat-raised-button matStepperNext>Next</button>
    </div>
  </mat-step>

  <mat-step>
    <ng-template matStepLabel>Step 2</ng-template>
    <p>Content for step 2</p>
    <div>
      <button mat-button matStepperPrevious>Back</button>
      <button mat-raised-button matStepperNext>Next</button>
    </div>
  </mat-step>

  <mat-step>
    <ng-template matStepLabel>Step 3</ng-template>
    <p>You're done!</p>
    <div>
      <button mat-button matStepperPrevious>Back</button>
    </div>
  </mat-step>
</mat-stepper>`,

    linear: `<mat-stepper [linear]="true">
  <mat-step [stepControl]="firstFormGroup">
    <form [formGroup]="firstFormGroup">
      <ng-template matStepLabel>Personal Info</ng-template>
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput formControlName="name" required>
      </mat-form-field>
      <div>
        <button mat-raised-button matStepperNext>Next</button>
      </div>
    </form>
  </mat-step>

  <mat-step [stepControl]="secondFormGroup">
    <form [formGroup]="secondFormGroup">
      <ng-template matStepLabel>Contact Info</ng-template>
      <mat-form-field>
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" type="email" required>
      </mat-form-field>
      <div>
        <button mat-button matStepperPrevious>Back</button>
        <button mat-raised-button matStepperNext>Next</button>
      </div>
    </form>
  </mat-step>
</mat-stepper>`,

    editable: `<mat-stepper>
  <mat-step [editable]="true">
    <ng-template matStepLabel>Editable Step</ng-template>
    <p>This step can be edited after completion</p>
    <div>
      <button mat-raised-button matStepperNext>Next</button>
    </div>
  </mat-step>

  <mat-step [editable]="false">
    <ng-template matStepLabel>Non-editable Step</ng-template>
    <p>This step cannot be edited after completion</p>
    <div>
      <button mat-button matStepperPrevious>Back</button>
    </div>
  </mat-step>
</mat-stepper>`,

    optional: `<mat-stepper>
  <mat-step>
    <ng-template matStepLabel>Required Step</ng-template>
    <p>This step is required</p>
    <div>
      <button mat-raised-button matStepperNext>Next</button>
    </div>
  </mat-step>

  <mat-step [optional]="true">
    <ng-template matStepLabel>Optional Step</ng-template>
    <p>This step is optional</p>
    <div>
      <button mat-button matStepperPrevious>Back</button>
      <button mat-raised-button matStepperNext>Next</button>
    </div>
  </mat-step>

  <mat-step>
    <ng-template matStepLabel>Final Step</ng-template>
    <p>Complete!</p>
    <div>
      <button mat-button matStepperPrevious>Back</button>
    </div>
  </mat-step>
</mat-stepper>`,

    vertical: `<mat-stepper orientation="vertical">
  <mat-step>
    <ng-template matStepLabel>Step 1</ng-template>
    <p>Content for step 1</p>
    <div>
      <button mat-raised-button matStepperNext>Next</button>
    </div>
  </mat-step>

  <mat-step>
    <ng-template matStepLabel>Step 2</ng-template>
    <p>Content for step 2</p>
    <div>
      <button mat-button matStepperPrevious>Back</button>
      <button mat-raised-button matStepperNext>Next</button>
    </div>
  </mat-step>

  <mat-step>
    <ng-template matStepLabel>Step 3</ng-template>
    <p>You're done!</p>
    <div>
      <button mat-button matStepperPrevious>Back</button>
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
      <button mat-raised-button matStepperNext>Next</button>
    </div>
  </mat-step>

  <mat-step>
    <ng-template matStepLabel>
      <mat-icon>email</mat-icon>
      Contact
    </ng-template>
    <p>Enter your contact details</p>
    <div>
      <button mat-button matStepperPrevious>Back</button>
      <button mat-raised-button matStepperNext>Next</button>
    </div>
  </mat-step>

  <mat-step>
    <ng-template matStepLabel>
      <mat-icon>check_circle</mat-icon>
      Complete
    </ng-template>
    <p>All done!</p>
    <div>
      <button mat-button matStepperPrevious>Back</button>
    </div>
  </mat-step>
</mat-stepper>`
  };

  constructor(private fb: FormBuilder) {
    // Initialize editable code
    Object.keys(this.codeExamples).forEach(key => {
      this.editableCode[key as keyof typeof this.codeExamples] =
        this.codeExamples[key as keyof typeof this.codeExamples];
    });

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

  // Reset code to original
  resetCode(exampleKey: keyof typeof this.codeExamples) {
    this.editableCode[exampleKey] = this.codeExamples[exampleKey];
  }
}
