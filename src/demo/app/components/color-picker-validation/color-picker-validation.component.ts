import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwColorPickerComponent } from '../../../../library/src/controls/components/amw-color-picker/amw-color-picker.component';

@Component({
  selector: 'amw-demo-color-picker-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwColorPickerComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './color-picker-validation.component.html',
  styleUrl: './color-picker-validation.component.scss'
})
export class ColorPickerValidationComponent extends BaseValidationComponent implements OnInit {
  validationForm: FormGroup = this.fb.group({
    primaryColor: ['', Validators.required],
    secondaryColor: ['', Validators.required],
    accentColor: ['', Validators.required],
    backgroundColor: ['', Validators.required]
  });

  validationInfo: ValidationInfo[] = [
    { title: 'Primary Color', description: 'Required field' },
    { title: 'Secondary Color', description: 'Required, must be different from primary' },
    { title: 'Accent Color', description: 'Required, text input mode' },
    { title: 'Background Color', description: 'Required, all modes available' }
  ];

  ngOnInit(): void {
    this.validationForm.get('secondaryColor')?.setValidators([
      Validators.required,
      this.differentColorValidator('primaryColor')
    ]);
  }

  differentColorValidator(primaryColorControl: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const primaryColor = this.validationForm?.get(primaryColorControl)?.value;
      const secondaryColor = control.value;

      if (primaryColor && secondaryColor && primaryColor === secondaryColor) {
        return { sameColor: true };
      }

      return null;
    };
  }

  getColorError(controlName: string): string {
    const control = this.validationForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName.replace(/([A-Z])/g, ' $1').trim()} is required`;
    }
    if (control?.hasError('sameColor')) {
      return 'Secondary color must be different from primary color';
    }
    return '';
  }
}
