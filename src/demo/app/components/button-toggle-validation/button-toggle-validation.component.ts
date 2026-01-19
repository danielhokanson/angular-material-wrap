import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { AmwButtonToggleComponent } from '../../../../library/src/controls/components/amw-button-toggle/amw-button-toggle.component';
import { AmwButtonToggleGroupComponent } from '../../../../library/src/controls/components/amw-button-toggle/amw-button-toggle-group.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

@Component({
  selector: 'amw-demo-button-toggle-validation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AmwButtonToggleComponent,
    AmwButtonToggleGroupComponent,
    AmwButtonComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './button-toggle-validation.component.html',
  styleUrl: './button-toggle-validation.component.scss'
})
export class ButtonToggleValidationComponent implements OnInit {
  validationForm: FormGroup;
  disabledDemoValue: string | null = null;

  constructor(
    private fb: FormBuilder,
    private notification: AmwNotificationService
  ) {
    this.validationForm = this.fb.group({
      viewMode: ['', Validators.required],
      alignment: ['', Validators.required],
      textFormatting: [[], Validators.required]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.validationForm.valid) {
      this.notification.success('Success', 'Form is valid! All required selections have been made.', { duration: 3000 });
    } else {
      this.notification.error('Error', 'Form has validation errors. Please make all required selections.', { duration: 3000 });
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.validationForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} selection is required`;
    }
    return '';
  }
}
