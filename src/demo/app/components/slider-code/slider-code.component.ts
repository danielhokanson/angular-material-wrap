import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwSliderComponent } from '../../../../library/src/controls/components/amw-slider/amw-slider.component';
import { AmwIconComponent } from '../../../../library/src/components/components';

@Component({
  selector: 'amw-demo-slider-code',
  standalone: true,
  imports: [
    FormsModule,
    AmwCodeDocComponent,
    AmwButtonComponent,
    AmwSliderComponent,
    AmwIconComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './slider-code.component.html',
  styleUrl: './slider-code.component.scss'
})
export class SliderCodeComponent implements OnInit {
  // State for live preview examples
  volumeValue = 50;
  brightnessValue = 75;
  ratingValue = 3;
  primaryValue = 50;
  accentValue = 75;
  warnValue = 25;
  eventValue = 50;

  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Slider',
      description: 'A simple slider with default settings',
      code: `<mat-slider [min]="0" [max]="100">
  <input matSliderThumb [(ngModel)]="volumeValue">
</mat-slider>
<p>Volume: {{volumeValue}}</p>`
    },
    {
      key: 'withThumbLabel',
      title: 'Slider with Thumb Label',
      description: 'Slider showing current value on the thumb',
      code: `<mat-slider [min]="0" [max]="100" [displayWith]="formatLabel">
  <input matSliderThumb [(ngModel)]="brightnessValue">
</mat-slider>
<p>Brightness: {{brightnessValue}}%</p>`
    },
    {
      key: 'withSteps',
      title: 'Slider with Steps',
      description: 'Slider with discrete step values',
      code: `<mat-slider [min]="1" [max]="5" [step]="0.5" [displayWith]="formatLabel">
  <input matSliderThumb [(ngModel)]="ratingValue">
</mat-slider>
<p>Rating: {{ratingValue}}</p>`
    },
    {
      key: 'differentColors',
      title: 'Different Colors',
      description: 'Sliders with different color themes',
      code: `<mat-slider color="primary" [min]="0" [max]="100">
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
<p>Warn: {{warnValue}}</p>`
    },
    {
      key: 'disabled',
      title: 'Disabled Slider',
      description: 'Slider in disabled state',
      code: `<mat-slider [min]="0" [max]="100" disabled>
  <input matSliderThumb [value]="50">
</mat-slider>
<p>Disabled slider at value 50</p>`
    },
    {
      key: 'reactiveForm',
      title: 'Reactive Form Integration',
      description: 'Using sliders with Angular reactive forms',
      code: `// Component TypeScript
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
</form>`
    },
    {
      key: 'withEvents',
      title: 'Slider with Events',
      description: 'Sliders with event handling',
      code: `<mat-slider [min]="0" [max]="100">
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
}`
    },
    {
      key: 'settingsPanel',
      title: 'Settings Panel',
      description: 'Multiple sliders in a settings panel',
      code: `<div class="settings-panel">
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
    }
  ];

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
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
