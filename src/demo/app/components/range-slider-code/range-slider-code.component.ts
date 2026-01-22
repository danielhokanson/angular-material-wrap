import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwSliderComponent } from '../../../../library/src/controls/components/amw-slider/amw-slider.component';
import { AmwIconComponent } from '../../../../library/src/components/components';

@Component({
  selector: 'amw-demo-range-slider-code',
  standalone: true,
  imports: [
    FormsModule,
    AmwCodeDocComponent,
    AmwSliderComponent,
    AmwIconComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './range-slider-code.component.html',
  styleUrl: './range-slider-code.component.scss'
})
export class RangeSliderCodeComponent implements OnInit {
  // State for live preview examples
  startValue = 20;
  endValue = 80;
  priceStart = 100;
  priceEnd = 500;

  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Range Slider',
      description: 'Simple range slider with default configuration',
      code: `<amw-slider
  [min]="0"
  [max]="100"
  [(value)]="sliderValue">
</amw-slider>
<p>Value: {{sliderValue}}</p>`
    },
    {
      key: 'configured',
      title: 'Configured Range Slider',
      description: 'Range slider with custom configuration and styling',
      code: `<amw-slider
  [min]="0"
  [max]="1000"
  [step]="10"
  [(value)]="priceValue">
</amw-slider>
<p>Price: \${{priceValue}}</p>`
    },
    {
      key: 'vertical',
      title: 'Vertical Range Slider',
      description: 'Range slider in vertical orientation',
      code: `<div style="height: 300px;">
  <amw-slider
    [vertical]="true"
    [min]="0"
    [max]="100"
    [(value)]="sliderValue">
  </amw-slider>
</div>
<p>Vertical Value: {{sliderValue}}</p>`
    },
    {
      key: 'formControl',
      title: 'Reactive Form Integration',
      description: 'Range slider integrated with Angular reactive forms',
      code: `// Component TypeScript
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
</form>`
    },
    {
      key: 'validation',
      title: 'With Validation',
      description: 'Range slider with custom validation and error handling',
      code: `// Component TypeScript
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
    }
  ];

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
  }

  // Format label for thumb display
  formatLabel(value: number): string {
    return '$' + value;
  }
}
