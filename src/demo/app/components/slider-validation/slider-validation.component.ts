import { Component, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwSliderComponent } from '../../../../library/src/controls/components/amw-slider/amw-slider.component';

@Component({
  selector: 'amw-demo-slider-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwSliderComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './slider-validation.component.html',
  styleUrl: './slider-validation.component.scss'
})
export class SliderValidationComponent extends BaseValidationComponent {
  validationForm: FormGroup = this.fb.group({
    volume: [50, [Validators.required, Validators.min(0), Validators.max(100)]],
    brightness: [75, [Validators.required, Validators.min(10), Validators.max(100)]],
    temperature: [20, [Validators.required, Validators.min(-10), Validators.max(40)]],
    rating: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
    progress: [25, [Validators.required, Validators.min(0), Validators.max(100)]],
    price: [100, [Validators.required, Validators.min(10), Validators.max(1000)]]
  });

  validationInfo: ValidationInfo[] = [
    { title: 'Volume', description: 'Required, 0-100% range' },
    { title: 'Brightness', description: 'Required, 10-100% range' },
    { title: 'Temperature', description: 'Required, -10 to 40 degrees range' },
    { title: 'Rating', description: 'Required, 1-5 stars range' },
    { title: 'Progress', description: 'Required, 0-100% range' },
    { title: 'Price', description: 'Required, $10-$1000 range' }
  ];

  getFieldValue(fieldName: string): number {
    const field = this.validationForm.get(fieldName);
    return field?.value || 0;
  }
}
