import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'amw-demo-radio-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './radio-code.component.html',
  styleUrl: './radio-code.component.scss'
})
export class RadioCodeComponent {
  // State for live preview examples
  selectedSeason = 'winter';
  selectedColor = '';
  selectedOption = '1';
  labelPosition: 'before' | 'after' = 'after';

  seasons = ['Winter', 'Spring', 'Summer', 'Autumn'];

  // Editable code examples
  editableCode = {
    basic: '',
    colors: '',
    disabled: '',
    labelPosition: '',
    ngModel: '',
    events: '',
    dynamicOptions: ''
  };

  // Original code examples (for reset functionality)
  readonly codeExamples = {
    basic: `<mat-radio-group>
  <mat-radio-button value="1">Option 1</mat-radio-button>
  <mat-radio-button value="2">Option 2</mat-radio-button>
  <mat-radio-button value="3">Option 3</mat-radio-button>
</mat-radio-group>`,

    colors: `<mat-radio-group>
  <mat-radio-button value="primary" color="primary">Primary</mat-radio-button>
  <mat-radio-button value="accent" color="accent">Accent</mat-radio-button>
  <mat-radio-button value="warn" color="warn">Warn</mat-radio-button>
</mat-radio-group>`,

    disabled: `<mat-radio-group>
  <mat-radio-button value="1">Enabled</mat-radio-button>
  <mat-radio-button value="2" disabled>Disabled</mat-radio-button>
  <mat-radio-button value="3">Enabled</mat-radio-button>
</mat-radio-group>`,

    labelPosition: `<mat-radio-group>
  <mat-radio-button labelPosition="before" value="1">Label before</mat-radio-button>
  <mat-radio-button labelPosition="after" value="2">Label after</mat-radio-button>
</mat-radio-group>`,

    ngModel: `<mat-radio-group [(ngModel)]="selectedSeason">
  <mat-radio-button value="winter">Winter</mat-radio-button>
  <mat-radio-button value="spring">Spring</mat-radio-button>
  <mat-radio-button value="summer">Summer</mat-radio-button>
  <mat-radio-button value="autumn">Autumn</mat-radio-button>
</mat-radio-group>
<p>Your favorite season is: {{selectedSeason}}</p>`,

    events: `<mat-radio-group (change)="onRadioChange($event)">
  <mat-radio-button value="1">Option 1</mat-radio-button>
  <mat-radio-button value="2">Option 2</mat-radio-button>
  <mat-radio-button value="3">Option 3</mat-radio-button>
</mat-radio-group>`,

    dynamicOptions: `<mat-radio-group [(ngModel)]="selectedColor">
  <mat-radio-button *ngFor="let season of seasons" [value]="season">
    {{season}}
  </mat-radio-button>
</mat-radio-group>`
  };

  constructor() {
    // Initialize editable code
    Object.keys(this.codeExamples).forEach(key => {
      this.editableCode[key as keyof typeof this.codeExamples] =
        this.codeExamples[key as keyof typeof this.codeExamples];
    });
  }

  // Reset code to original
  resetCode(exampleKey: keyof typeof this.codeExamples) {
    this.editableCode[exampleKey] = this.codeExamples[exampleKey];
  }

  // Event handlers
  onRadioChange(event: any) {
    console.log('Radio changed:', event.value);
  }
}