import { Component, ViewEncapsulation, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { form } from '@angular/forms/signals';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwCardComponent, AmwIconComponent, AmwDividerComponent } from '../../../../library/src/components/components';

@Component({
  selector: 'amw-demo-signal-forms-validation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwInputComponent,
    AmwButtonComponent,
    AmwCardComponent,
    AmwIconComponent,
    AmwDividerComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './signal-forms-validation.component.html',
  styleUrl: './signal-forms-validation.component.scss'
})
export class SignalFormsValidationComponent extends BaseValidationComponent {
  // ngModel (Template-driven)
  ngModelValue = '';
  ngModelEmail = '';

  // Signal Forms (formField)
  signalForm = form({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]]
  }) as any;

  // Computed values for Signal Forms
  signalFormValues = computed(() => (this.signalForm as any).value());
  signalFormValid = computed(() => (this.signalForm as any).valid());
  signalFormErrors = computed(() => ({
    name: (this.signalForm as any).name().errors(),
    email: (this.signalForm as any).email().errors()
  }));

  // Reactive Forms (FormControl/FormGroup) - used as validationForm for BaseValidationComponent
  validationForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]]
  });

  validationInfo: ValidationInfo[] = [
    { title: 'ngModel', description: 'Template-driven two-way binding' },
    { title: 'formControl', description: 'Reactive Forms with FormGroup/FormControl' },
    { title: 'formField', description: 'Signal Forms (experimental) with fine-grained reactivity' }
  ];

  get ngModelValidation() {
    return {
      nameValid: this.ngModelValue.length >= 2,
      emailValid: this.isValidEmail(this.ngModelEmail)
    };
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  resetAll(): void {
    // Reset ngModel
    this.ngModelValue = '';
    this.ngModelEmail = '';

    // Reset Reactive Form
    this.validationForm.reset();

    // Reset Signal Form
    (this.signalForm as any).reset();
  }
}
