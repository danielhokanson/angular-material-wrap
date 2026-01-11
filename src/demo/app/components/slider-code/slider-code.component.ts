import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseCodeComponent } from '../base/base-code.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwSliderComponent } from '../../../../library/src/controls/components/amw-slider/amw-slider.component';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwIconComponent } from '../../../../library/src/components/components';

type SliderExamples = 'basic' | 'withThumbLabel' | 'withSteps' | 'differentColors' | 'disabled' | 'reactiveForm' | 'withEvents' | 'settingsPanel';

@Component({
  selector: 'amw-demo-slider-code',
  standalone: true,
  imports: [
    FormsModule,
    AmwButtonComponent,
    AmwSliderComponent,
    AmwAccordionComponent,
    AmwAccordionPanelComponent,
    AmwIconComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './slider-code.component.html',
  styleUrl: './slider-code.component.scss'
})
export class SliderCodeComponent extends BaseCodeComponent<SliderExamples> {
  // State for live preview examples
  volumeValue = 50;
  brightnessValue = 75;
  ratingValue = 3;
  primaryValue = 50;
  accentValue = 75;
  warnValue = 25;
  eventValue = 50;

  // Original code examples (for reset functionality)
  readonly codeExamples: Record<SliderExamples, string> = {
    basic: `<mat-slider [min]="0" [max]="100">
  <input matSliderThumb [(ngModel)]="volumeValue">
</mat-slider>
<p>Volume: {{volumeValue}}</p>`,

    withThumbLabel: `<mat-slider [min]="0" [max]="100" [displayWith]="formatLabel">
  <input matSliderThumb [(ngModel)]="brightnessValue">
</mat-slider>
<p>Brightness: {{brightnessValue}}%</p>`,

    withSteps: `<mat-slider [min]="1" [max]="5" [step]="0.5" [displayWith]="formatLabel">
  <input matSliderThumb [(ngModel)]="ratingValue">
</mat-slider>
<p>Rating: {{ratingValue}}</p>`,

    differentColors: `<mat-slider color="primary" [min]="0" [max]="100">
  <input matSliderThumb [(ngModel)]="primaryValue">
</mat-slider>
<p>Primary: {{primaryValue}}</p>

<mat-slider color="accent" [min]="0" [max]="100">
  <input matSliderThumb [(ngModel)]="accentValue">
</mat-slider>
<p>Accent: {{accentValue}}</p>

<mat-slider color="warn" [min]="0" [max]="100">
  <input matSliderThumb [(ngModel)]="warnValue">
</mat-slider>
<p>Warn: {{warnValue}}</p>`,

    disabled: `<mat-slider [min]="0" [max]="100" disabled>
  <input matSliderThumb [value]="50">
</mat-slider>
<p>Disabled slider at value 50</p>`,

    reactiveForm: `// Component TypeScript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
export class MyComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      volume: [50, [Validators.min(0), Validators.max(100)]],
      brightness: [75, [Validators.min(10), Validators.max(100)]],
      temperature: [20, [Validators.min(-10), Validators.max(40)]]
    });
  }
}

// Template
<form [formGroup]="form">
  <mat-slider [min]="0" [max]="100">
    <input matSliderThumb formControlName="volume">
  </mat-slider>

  <mat-slider [min]="10" [max]="100">
    <input matSliderThumb formControlName="brightness">
  </mat-slider>

  <mat-slider [min]="-10" [max]="40">
    <input matSliderThumb formControlName="temperature">
  </mat-slider>
</form>`,

    withEvents: `<mat-slider [min]="0" [max]="100">
  <input matSliderThumb
    [(ngModel)]="eventValue"
    (change)="onSliderChange($event)"
    (input)="onSliderInput($event)">
</mat-slider>
<p>Value: {{eventValue}}</p>

// Component methods
onSliderChange(event: any): void {
  console.log('Slider changed to:', event.target.value);
}

onSliderInput(event: any): void {
  console.log('Slider input:', event.target.value);
}`,

    settingsPanel: `<div class="settings-panel">
  <h3>Audio Settings</h3>

  <mat-slider color="primary" [min]="0" [max]="100">
    <input matSliderThumb [(ngModel)]="masterVolume">
  </mat-slider>
  <p>Master Volume: {{masterVolume}}</p>

  <mat-slider color="accent" [min]="-20" [max]="20">
    <input matSliderThumb [(ngModel)]="bass">
  </mat-slider>
  <p>Bass: {{bass}}</p>

  <mat-slider color="accent" [min]="-20" [max]="20">
    <input matSliderThumb [(ngModel)]="treble">
  </mat-slider>
  <p>Treble: {{treble}}</p>

  <mat-slider color="warn" [min]="-100" [max]="100">
    <input matSliderThumb [(ngModel)]="balance">
  </mat-slider>
  <p>Balance: {{balance}}</p>
</div>`
  };

  constructor() {
    super();
  }

  // Event handlers for event example
  onSliderChange(event: any) {
    console.log('Slider changed to:', event.target.value);
  }

  onSliderInput(event: any) {
    console.log('Slider input:', event.target.value);
  }

  // Format label for thumb display
  formatLabel(value: number): string {
    return `${value}`;
  }
}