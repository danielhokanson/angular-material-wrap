import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'amw-demo-input-code',
  standalone: true,
  imports: [
    FormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './input-code.component.html',
  styleUrl: './input-code.component.scss'
})
export class InputCodeComponent {
  // State for live preview examples
  basicValue = '';
  emailValue = '';
  disabledValue = 'This field is disabled';
  readonlyValue = 'This field is readonly';

  // Editable code examples
  editableCode = {
    basic: '',
    withLabel: '',
    withHint: '',
    withError: '',
    withIcon: '',
    disabled: '',
    textarea: ''
  };

  // Original code examples (for reset functionality)
  readonly codeExamples = {
    basic: `<mat-form-field>
  <mat-label>Basic Input</mat-label>
  <input matInput placeholder="Enter text">
</mat-form-field>`,

    withLabel: `<mat-form-field appearance="fill">
  <mat-label>Fill Appearance</mat-label>
  <input matInput placeholder="Placeholder text">
</mat-form-field>

<mat-form-field appearance="outline">
  <mat-label>Outline Appearance</mat-label>
  <input matInput placeholder="Placeholder text">
</mat-form-field>`,

    withHint: `<mat-form-field>
  <mat-label>Username</mat-label>
  <input matInput placeholder="Enter username">
  <mat-hint>Choose a unique username</mat-hint>
</mat-form-field>`,

    withError: `<mat-form-field>
  <mat-label>Email</mat-label>
  <input matInput type="email" placeholder="email@example.com" required>
  <mat-error>Please enter a valid email</mat-error>
</mat-form-field>`,

    withIcon: `<mat-form-field>
  <mat-label>Search</mat-label>
  <input matInput placeholder="Search...">
  <mat-icon matPrefix>search</mat-icon>
</mat-form-field>

<mat-form-field>
  <mat-label>Amount</mat-label>
  <input matInput type="number" placeholder="0">
  <span matPrefix>$&nbsp;</span>
  <span matSuffix>.00</span>
</mat-form-field>`,

    disabled: `<mat-form-field>
  <mat-label>Disabled Input</mat-label>
  <input matInput disabled value="Cannot edit this">
</mat-form-field>

<mat-form-field>
  <mat-label>Readonly Input</mat-label>
  <input matInput readonly value="This is readonly">
</mat-form-field>`,

    textarea: `<mat-form-field>
  <mat-label>Description</mat-label>
  <textarea matInput rows="4" placeholder="Enter description"></textarea>
</mat-form-field>`
  };

  constructor() {
    // Initialize editable code
    Object.keys(this.codeExamples).forEach(key => {
      this.editableCode[key as keyof typeof this.codeExamples] =
        this.codeExamples[key as keyof typeof this.codeExamples];
    });
  }

  // Reset code to original
  resetCode(exampleKey: keyof typeof this.codeExamples) {
    this.editableCode[exampleKey] = this.codeExamples[exampleKey];
  }
}
