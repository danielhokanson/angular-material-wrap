import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseCodeComponent } from '../base/base-code.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwIconComponent } from '../../../../library/src/components/components';
import { AmwSliderComponent } from '../../../../library/src/controls/components/amw-slider/amw-slider.component';

type RangeSliderExamples = 'basic' | 'configured' | 'vertical' | 'formControl' | 'validation';

@Component({
  selector: 'amw-demo-range-slider-code',
  standalone: true,
  imports: [
    FormsModule,
    AmwButtonComponent,
    AmwAccordionComponent,
    AmwAccordionPanelComponent,
    AmwIconComponent,
    AmwSliderComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './range-slider-code.component.html',
  styleUrl: './range-slider-code.component.scss'
})
export class RangeSliderCodeComponent extends BaseCodeComponent<RangeSliderExamples> {
  // State for live preview examples
  startValue = 20;
  endValue = 80;
  priceStart = 100;
  priceEnd = 500;

  // Original code examples (for reset functionality)
  readonly codeExamples: Record<RangeSliderExamples, string> = {
    basic: `<amw-slider
  [min]="0"
  [max]="100"
  [(value)]="sliderValue">
</amw-slider>
<p>Value: {{sliderValue}}</p>`,

    configured: `<amw-slider
  [min]="0"
  [max]="1000"
  [step]="10"
  [(value)]="priceValue">
</amw-slider>
<p>Price: \${{priceValue}}</p>`,

    vertical: `<div style="height: 300px;">
  <amw-slider
    [vertical]="true"
    [min]="0"
    [max]="100"
    [(value)]="sliderValue">
  </amw-slider>
</div>
<p>Vertical Value: {{sliderValue}}</p>`,

    formControl: `// Component TypeScript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class MyComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      priceValue: [100, Validators.required]
    });
  }
}

// Template
<form [formGroup]="form">
  <amw-slider
    [min]="0"
    [max]="1000"
    [step]="10"
    formControlName="priceValue">
  </amw-slider>
</form>`,

    validation: `// Component TypeScript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class MyComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      ageValue: [25, [Validators.required, Validators.min(18), Validators.max(100)]]
    });
  }
}

// Template
<form [formGroup]="form">
  <amw-slider
    [min]="18"
    [max]="100"
    formControlName="ageValue">
  </amw-slider>
  @if (form.get('ageValue')?.hasError('min')) {
    <div class="error">Value must be at least 18</div>
  }
  @if (form.get('ageValue')?.hasError('max')) {
    <div class="error">Value must be at most 100</div>
  }
</form>`
  };

  constructor() {
    super();
  }

  // Format label for thumb display
  formatLabel(value: number): string {
    return '$' + value;
  }
}
