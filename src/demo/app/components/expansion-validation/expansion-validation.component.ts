import { Component, ViewEncapsulation, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwAccordionComponent, AmwExpansionPanelComponent, AmwExpansionPanelHeaderComponent, AmwPanelTitleDirective, AmwPanelDescriptionDirective } from '../../../../lib/amw-expansion/amw-expansion.module';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';

@Component({
  selector: 'amw-demo-expansion-validation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwAccordionComponent,
    AmwExpansionPanelComponent,
    AmwExpansionPanelHeaderComponent,
    AmwPanelTitleDirective,
    AmwPanelDescriptionDirective,
    AmwButtonComponent,
    AmwInputComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './expansion-validation.component.html',
  styleUrl: './expansion-validation.component.scss'
})
export class ExpansionValidationComponent extends BaseValidationComponent {
  step1Complete = signal(false);
  step2Complete = signal(false);

  personalForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  addressForm: FormGroup = this.fb.group({
    street: ['', Validators.required],
    city: ['', Validators.required],
    zip: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]]
  });

  validationForm: FormGroup = this.personalForm;

  validationInfo: ValidationInfo[] = [
    { title: 'Step 1: Personal', description: 'First name, last name, and email required' },
    { title: 'Step 2: Address', description: 'Street, city, and 5-digit ZIP required' },
    { title: 'Step 3: Review', description: 'Review and submit when all steps complete' }
  ];

  validateStep1(): void {
    if (this.personalForm.valid) {
      this.step1Complete.set(true);
      this.notification.success('Success', 'Step 1 completed!', { duration: 2000 });
    }
  }

  validateStep2(): void {
    if (this.addressForm.valid) {
      this.step2Complete.set(true);
      this.notification.success('Success', 'Step 2 completed!', { duration: 2000 });
    }
  }

  resetForms(): void {
    this.personalForm.reset();
    this.addressForm.reset();
    this.step1Complete.set(false);
    this.step2Complete.set(false);
  }

  getStepStatus(complete: boolean, form: FormGroup): string {
    if (complete) return 'Complete';
    if (form.touched && !form.valid) return 'Incomplete';
    return 'Not started';
  }
}
