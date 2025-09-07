import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'amw-demo-range-slider-code',
    standalone: true,
    imports: [CommonModule, MatExpansionModule, MatCardModule],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './range-slider-code.component.html',
    styleUrl: './range-slider-code.component.scss'
})
export class RangeSliderCodeComponent {
    getCodeExamples() {
        return Object.values(this.codeExamples);
    }

    codeExamples = {
        basic: {
            title: 'Basic Range Slider',
            description: 'Simple range slider with default configuration',
            code: `<amw-range-slider
  [min]="0"
  [max]="100"
  [step]="1"
  [(rangeValue)]="range"
  (rangeChange)="onRangeChange($event)">
</amw-range-slider>`
        },
        configured: {
            title: 'Configured Range Slider',
            description: 'Range slider with custom configuration and styling',
            code: `<amw-range-slider
  [min]="0"
  [max]="1000"
  [step]="10"
  [showTicks]="true"
  [showLabels]="true"
  [color]="'accent'"
  [thumbLabel]="true"
  startThumbLabel="Min Price"
  endThumbLabel="Max Price"
  [(rangeValue)]="priceRange"
  (rangeChange)="onPriceRangeChange($event)">
</amw-range-slider>`
        },
        vertical: {
            title: 'Vertical Range Slider',
            description: 'Range slider in vertical orientation',
            code: `<amw-range-slider
  [min]="0"
  [max]="100"
  [step]="1"
  [vertical]="true"
  [rangeValue]="verticalRange"
  (rangeChange)="onVerticalRangeChange($event)">
</amw-range-slider>`
        },
        formControl: {
            title: 'Reactive Form Integration',
            description: 'Range slider integrated with Angular reactive forms',
            code: `// Component
export class MyComponent {
  form = this.fb.group({
    priceRange: [{ start: 100, end: 500 }, Validators.required]
  });

  constructor(private fb: FormBuilder) {}
}

// Template
<form [formGroup]="form">
  <amw-range-slider
    formControlName="priceRange"
    [min]="0"
    [max]="1000"
    [step]="10"
    [showTicks]="true"
    [showLabels]="true">
  </amw-range-slider>
</form>`
        },
        validation: {
            title: 'With Validation',
            description: 'Range slider with custom validation and error handling',
            code: `// Component
export class MyComponent {
  form = this.fb.group({
    ageRange: [{ start: 18, end: 65 }, [Validators.required, this.validateAgeRange]]
  });

  validateAgeRange(control: any) {
    const range = control.value;
    if (range.start >= range.end) {
      return { invalidRange: true };
    }
    return null;
  }
}

// Template
<form [formGroup]="form">
  <amw-range-slider
    formControlName="ageRange"
    [min]="18"
    [max]="100"
    [step]="1"
    [hasError]="form.get('ageRange')?.invalid && form.get('ageRange')?.touched"
    [errorMessage]="getErrorMessage('ageRange')">
  </amw-range-slider>
</form>`
        }
    };
}
