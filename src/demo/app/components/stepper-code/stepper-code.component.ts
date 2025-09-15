import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'amw-demo-stepper-code',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatTabsModule,
        MatButtonModule,
        MatIconModule
    ],
    encapsulation: ViewEncapsulation.None,
    template: `
    <div class="stepper-code-demo">
      <h3>Stepper Code Examples</h3>
      <p>Code examples and implementation patterns for the stepper component.</p>
      
      <mat-tab-group>
        <mat-tab label="Basic Usage">
          <div class="code-example">
            <h4>Basic Stepper</h4>
            <pre><code>{{ basicUsageCode }}</code></pre>
          </div>
        </mat-tab>
        
        <mat-tab label="With Forms">
          <div class="code-example">
            <h4>Stepper with Form Validation</h4>
            <pre><code>{{ formsCode }}</code></pre>
          </div>
        </mat-tab>
        
        <mat-tab label="Custom Labels">
          <div class="code-example">
            <h4>Custom Step Labels</h4>
            <pre><code>{{ customLabelsCode }}</code></pre>
          </div>
        </mat-tab>
        
        <mat-tab label="TypeScript">
          <div class="code-example">
            <h4>Component TypeScript</h4>
            <pre><code>{{ typescriptCode }}</code></pre>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
    styleUrl: './stepper-code.component.scss'
})
export class StepperCodeComponent implements OnInit {
    basicUsageCode = `<mat-stepper #stepper>
  <mat-step>
    <ng-template matStepLabel>Step 1</ng-template>
    <p>Content for step 1</p>
    <div>
      <button mat-button matStepperNext>Next</button>
    </div>
  </mat-step>
  <mat-step>
    <ng-template matStepLabel>Step 2</ng-template>
    <p>Content for step 2</p>
    <div>
      <button mat-button matStepperPrevious>Back</button>
      <button mat-button matStepperNext>Next</button>
    </div>
  </mat-step>
</mat-stepper>`;

    formsCode = `<mat-stepper #stepper>
  <mat-step [stepControl]="firstFormGroup">
    <form [formGroup]="firstFormGroup">
      <ng-template matStepLabel>Personal Info</ng-template>
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput formControlName="name" required>
      </mat-form-field>
      <div>
        <button mat-button matStepperNext>Next</button>
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
        <button mat-button matStepperNext>Next</button>
      </div>
    </form>
  </mat-step>
</mat-stepper>`;

    customLabelsCode = `<mat-stepper #stepper>
  <mat-step>
    <ng-template matStepLabel>
      <mat-icon>person</mat-icon>
      Personal Information
    </ng-template>
    <p>Step content here</p>
  </mat-step>
  <mat-step>
    <ng-template matStepLabel>
      <mat-icon>email</mat-icon>
      Contact Details
    </ng-template>
    <p>Step content here</p>
  </mat-step>
</mat-stepper>`;

    typescriptCode = `export class MyComponent {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
}`;

    constructor() { }

    ngOnInit(): void { }
}
