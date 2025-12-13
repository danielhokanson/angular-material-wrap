import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-radio-group-code',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './radio-group-code.component.html',
  styleUrl: './radio-group-code.component.scss'
})
export class RadioGroupCodeComponent {
  // State for live preview examples
  selectedValue: string = '';
  selectedColor: string = 'primary';
  selectedSize: string = 'medium';
  selectedAlign: string = 'start';

  // Form for reactive forms example
  myForm: FormGroup;

  // Editable code examples
  editableCode = {
    basic: '',
    ngModel: '',
    disabled: '',
    labelPosition: '',
    color: '',
    reactiveForm: ''
  };

  // Original code examples (for reset functionality)
  readonly codeExamples = {
    basic: `<mat-radio-group>
  <mat-radio-button value="option1">Option 1</mat-radio-button>
  <mat-radio-button value="option2">Option 2</mat-radio-button>
  <mat-radio-button value="option3">Option 3</mat-radio-button>
</mat-radio-group>`,

    ngModel: `<mat-radio-group [(ngModel)]="selectedValue">
  <mat-radio-button value="yes">Yes</mat-radio-button>
  <mat-radio-button value="no">No</mat-radio-button>
  <mat-radio-button value="maybe">Maybe</mat-radio-button>
</mat-radio-group>

<p>Selected: {{selectedValue}}</p>`,

    disabled: `<mat-radio-group>
  <mat-radio-button value="enabled">Enabled</mat-radio-button>
  <mat-radio-button value="disabled" [disabled]="true">
    Disabled
  </mat-radio-button>
  <mat-radio-button value="enabled2">Enabled</mat-radio-button>
</mat-radio-group>`,

    labelPosition: `<mat-radio-group [(ngModel)]="selectedAlign">
  <mat-radio-button value="before" labelPosition="before">
    Label Before
  </mat-radio-button>
  <mat-radio-button value="after" labelPosition="after">
    Label After
  </mat-radio-button>
</mat-radio-group>`,

    color: `<mat-radio-group [(ngModel)]="selectedColor">
  <mat-radio-button value="primary" color="primary">
    Primary
  </mat-radio-button>
  <mat-radio-button value="accent" color="accent">
    Accent
  </mat-radio-button>
  <mat-radio-button value="warn" color="warn">
    Warn
  </mat-radio-button>
</mat-radio-group>`,

    reactiveForm: `<form [formGroup]="myForm">
  <mat-radio-group formControlName="priority">
    <mat-radio-button value="low">Low</mat-radio-button>
    <mat-radio-button value="medium">Medium</mat-radio-button>
    <mat-radio-button value="high">High</mat-radio-button>
  </mat-radio-group>
</form>

// In component:
myForm = this.fb.group({
  priority: ['', Validators.required]
});`
  };

  constructor(private fb: FormBuilder) {
    // Initialize editable code
    Object.keys(this.codeExamples).forEach(key => {
      this.editableCode[key as keyof typeof this.codeExamples] =
        this.codeExamples[key as keyof typeof this.codeExamples];
    });

    // Initialize form
    this.myForm = this.fb.group({
      priority: ['', Validators.required]
    });
  }

  // Reset code to original
  resetCode(exampleKey: keyof typeof this.codeExamples) {
    this.editableCode[exampleKey] = this.codeExamples[exampleKey];
  }
}
