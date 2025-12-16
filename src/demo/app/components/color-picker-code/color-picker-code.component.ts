import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { BaseCodeComponent } from '../base/base-code.component';
import { AmwColorPickerComponent } from '../../../../library/src/controls/components/amw-color-picker/amw-color-picker.component';

type ColorPickerExamples = 'basic' | 'mode' | 'validation' | 'configuration';

@Component({
  selector: 'amw-demo-color-picker-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    AmwColorPickerComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './color-picker-code.component.html',
  styleUrl: './color-picker-code.component.scss'
})
export class ColorPickerCodeComponent extends BaseCodeComponent<ColorPickerExamples> implements OnInit {
  // State for live preview examples
  selectedColor = '#FF5722';
  customColor = '#2196F3';
  advancedColor = '#9C27B0';
  isDisabled = false;
  colorForm!: FormGroup;

  // Original code examples (for reset functionality)
  readonly codeExamples: Record<ColorPickerExamples, string> = {
    basic: `<amw-color-picker
  [value]="selectedColor"
  (colorChange)="onColorChange($event)">
</amw-color-picker>

// Component
export class MyComponent {
  selectedColor = '#FF5722';

  onColorChange(color: string) {
    console.log('Selected color:', color);
  }
}`,

    mode: `<amw-color-picker
  [value]="selectedColor"
  mode="custom"
  (colorChange)="onColorChange($event)">
</amw-color-picker>

// Component
export class MyComponent {
  selectedColor = '#2196F3';

  onColorChange(color: string) {
    console.log('Selected color:', color);
  }
}`,

    validation: `<form [formGroup]="colorForm">
  <mat-form-field appearance="outline">
    <mat-label>Select Color</mat-label>
    <amw-color-picker
      formControlName="color"
      [required]="true"
      placeholder="Choose color">
    </amw-color-picker>
    <mat-error *ngIf="colorForm.get('color')?.hasError('required')">
      Color is required
    </mat-error>
  </mat-form-field>
</form>

// Component
export class MyComponent implements OnInit {
  colorForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.colorForm = this.fb.group({
      color: ['', Validators.required]
    });
  }
}`,

    configuration: `<amw-color-picker
  [value]="selectedColor"
  [config]="colorPickerConfig"
  mode="all"
  size="large"
  [disabled]="isDisabled"
  (colorChange)="onColorChange($event)">
</amw-color-picker>

// Component
export class MyComponent {
  selectedColor = '#9C27B0';
  isDisabled = false;

  colorPickerConfig: ColorPickerConfig = {
    appearance: 'outline',
    showInput: true,
    showPreview: true,
    showPalette: true,
    showCustom: true
  };

  onColorChange(color: string) {
    console.log('Selected color:', color);
  }
}`
  };

  constructor(private fb: FormBuilder) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    // Initialize form for validation example
    this.colorForm = this.fb.group({
      color: ['', Validators.required]
    });
  }

  // Event handler for color change
  onColorChange(color: string): void {
    console.log('Selected color:', color);
  }
}


