import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AmwToggleComponent } from '../../../../library/src/controls/components/amw-toggle/amw-toggle.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

@Component({
  selector: 'amw-demo-toggle-validation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatSnackBarModule,
    AmwToggleComponent,
    AmwButtonComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './toggle-validation.component.html',
  styleUrl: './toggle-validation.component.scss'
})
export class ToggleValidationComponent implements OnInit {
  validationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.validationForm = this.fb.group({
      notifications: [false, Validators.requiredTrue],
      marketing: [false],
      analytics: [false, Validators.requiredTrue],
      darkMode: [false],
      autoSave: [false, Validators.requiredTrue],
      twoFactor: [false],
      location: [false],
      cookies: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.validationForm.valid) {
      this.snackBar.open('Form is valid! All required toggles are properly configured.', 'Close', { duration: 3000 });
    } else {
      this.snackBar.open('Form has validation errors. Please enable all required features.', 'Close', { duration: 3000 });
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.validationForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['requiredTrue']) return 'This feature must be enabled';
    }
    return '';
  }
}