import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { BaseCodeComponent } from '../base/base-code.component';

type RangeSliderExamples = 'basic' | 'configured' | 'vertical' | 'formControl' | 'validation';

@Component({
  selector: 'amw-demo-range-slider-code',
  standalone: true,
  imports: [
    FormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule
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
    basic: `<mat-slider [min]="0" [max]="100">
  <input matSliderStartThumb [(ngModel)]="startValue">
  <input matSliderEndThumb [(ngModel)]="endValue">
</mat-slider>
<p>Range: {{startValue}} - {{endValue}}</p>`,

    configured: `<mat-slider [min]="0" [max]="1000" [step]="10" [displayWith]="formatLabel">
  <input matSliderStartThumb [(ngModel)]="priceStart">
  <input matSliderEndThumb [(ngModel)]="priceEnd">
</mat-slider>
<p>Price Range: $\{{priceStart}} - $\{{priceEnd}}</p>

// Component method
formatLabel(value: number): string {
  return '$' + value;
}`,

    vertical: `<div style="height: 300px;">
  <mat-slider vertical [min]="0" [max]="100">
    <input matSliderStartThumb [(ngModel)]="startValue">
    <input matSliderEndThumb [(ngModel)]="endValue">
  </mat-slider>
</div>
<p>Vertical Range: {{startValue}} - {{endValue}}</p>`,

    formControl: `// Component TypeScript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class MyComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      priceStart: [100, Validators.required],
      priceEnd: [500, Validators.required]
    });
  }
}

// Template
<form [formGroup]="form">
  <mat-slider [min]="0" [max]="1000" [step]="10">
    <input matSliderStartThumb formControlName="priceStart">
    <input matSliderEndThumb formControlName="priceEnd">
  </mat-slider>
</form>`,

    validation: `// Component TypeScript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class MyComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      ageStart: [18, [Validators.required, Validators.min(18)]],
      ageEnd: [65, [Validators.required, Validators.max(100)]]
    }, { validators: this.rangeValidator });
  }

  rangeValidator(group: FormGroup) {
    const start = group.get('ageStart')?.value;
    const end = group.get('ageEnd')?.value;
    return start < end ? null : { invalidRange: true };
  }
}

// Template
<form [formGroup]="form">
  <mat-slider [min]="18" [max]="100">
    <input matSliderStartThumb formControlName="ageStart">
    <input matSliderEndThumb formControlName="ageEnd">
  </mat-slider>
  @if (form.hasError('invalidRange')) {
    <mat-error>Start must be less than end</mat-error>
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
