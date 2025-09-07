import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'amw-demo-slider-code',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './slider-code.component.html',
  styleUrl: './slider-code.component.scss'
})
export class SliderCodeComponent {
  codeExamples = {
    basic: {
      title: 'Basic Slider',
      description: 'A simple slider with default settings',
      code: `<amw-slider
  label="Volume"
  [min]="0"
  [max]="100"
  [value]="50">
</amw-slider>`
    },
    withThumbLabel: {
      title: 'Slider with Thumb Label',
      description: 'Slider showing current value on the thumb',
      code: `<amw-slider
  label="Brightness"
  [min]="0"
  [max]="100"
  [value]="75"
  [thumbLabel]="true">
</amw-slider>`
    },
    withSteps: {
      title: 'Slider with Steps',
      description: 'Slider with discrete step values',
      code: `<amw-slider
  label="Rating"
  [min]="1"
  [max]="5"
  [step]="0.5"
  [value]="3"
  [thumbLabel]="true">
</amw-slider>`
    },
    differentColors: {
      title: 'Different Colors',
      description: 'Sliders with different color themes',
      code: `<amw-slider
  label="Primary Slider"
  color="primary"
  [min]="0"
  [max]="100"
  [value]="50">
</amw-slider>

<amw-slider
  label="Accent Slider"
  color="accent"
  [min]="0"
  [max]="100"
  [value]="75">
</amw-slider>

<amw-slider
  label="Warn Slider"
  color="warn"
  [min]="0"
  [max]="100"
  [value]="25">
</amw-slider>`
    },
    disabled: {
      title: 'Disabled Slider',
      description: 'Slider in disabled state',
      code: `<amw-slider
  label="Disabled Slider"
  [min]="0"
  [max]="100"
  [value]="50"
  [disabled]="true">
</amw-slider>`
    },
    reactiveForm: {
      title: 'Reactive Form Integration',
      description: 'Using sliders with Angular reactive forms',
      code: `// Component TypeScript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  <amw-slider
    formControlName="volume"
    label="Volume"
    [min]="0"
    [max]="100"
    [thumbLabel]="true">
  </amw-slider>
  
  <amw-slider
    formControlName="brightness"
    label="Brightness"
    [min]="10"
    [max]="100"
    [thumbLabel]="true">
  </amw-slider>
  
  <amw-slider
    formControlName="temperature"
    label="Temperature"
    [min]="-10"
    [max]="40"
    [thumbLabel]="true">
  </amw-slider>
</form>`
    },
    withEvents: {
      title: 'Slider with Events',
      description: 'Sliders with event handling',
      code: `<amw-slider
  label="Volume"
  [min]="0"
  [max]="100"
  [value]="volume"
  (change)="onVolumeChange($event)"
  (input)="onVolumeInput($event)">
</amw-slider>

// Component methods
onVolumeChange(event: any): void {
  this.volume = event.value;
  console.log('Volume changed to:', this.volume);
}

onVolumeInput(event: any): void {
  this.volume = event.value;
  console.log('Volume input:', this.volume);
}`
    },
    settingsPanel: {
      title: 'Settings Panel',
      description: 'Multiple sliders in a settings panel',
      code: `<div class="settings-panel">
  <h3>Audio Settings</h3>
  
  <amw-slider
    label="Master Volume"
    [min]="0"
    [max]="100"
    [value]="masterVolume"
    [thumbLabel]="true"
    color="primary">
  </amw-slider>
  
  <amw-slider
    label="Bass"
    [min]="-20"
    [max]="20"
    [value]="bass"
    [thumbLabel]="true"
    color="accent">
  </amw-slider>
  
  <amw-slider
    label="Treble"
    [min]="-20"
    [max]="20"
    [value]="treble"
    [thumbLabel]="true"
    color="accent">
  </amw-slider>
  
  <amw-slider
    label="Balance"
    [min]="-100"
    [max]="100"
    [value]="balance"
    [thumbLabel]="true"
    color="warn">
  </amw-slider>
</div>`
    }
  };
}