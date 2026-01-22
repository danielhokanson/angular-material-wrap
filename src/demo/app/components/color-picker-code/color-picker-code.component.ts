import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwColorPickerComponent } from '../../../../library/src/controls/components/amw-color-picker/amw-color-picker.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

@Component({
  selector: 'amw-demo-color-picker-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AmwCodeDocComponent,
    AmwColorPickerComponent,
    AmwButtonComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './color-picker-code.component.html',
  styleUrl: './color-picker-code.component.scss'
})
export class ColorPickerCodeComponent implements OnInit {
  // State for live preview examples
  selectedColor = '#FF5722';
  customColor = '#2196F3';
  advancedColor = '#9C27B0';
  isDisabled = false;
  colorForm!: FormGroup;

  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Color Picker',
      description: 'Simple color picker with default palette',
      code: `<amw-color-picker
  [value]="selectedColor"
  (colorChange)="onColorChange($event)">
</amw-color-picker>

// Component
export class MyComponent {
  selectedColor = '#FF5722';

  onColorChange(color: string) {
    console.log('Selected color:', color);
  }
}`
    },
    {
      key: 'mode',
      title: 'Custom Color Mode',
      description: 'Color picker with custom color input',
      code: `<amw-color-picker
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
}`
    },
    {
      key: 'validation',
      title: 'Form Validation',
      description: 'Color picker with form validation',
      code: `<form [formGroup]="colorForm">
  <amw-color-picker
    label="Select Color"
    formControlName="color"
    [required]="true"
    placeholder="Choose color"
    appearance="outline">
  </amw-color-picker>
</form>

// Component
export class MyComponent implements OnInit {
  colorForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.colorForm = this.fb.group({
      color: ['', Validators.required]
    });
  }
}`
    },
    {
      key: 'configuration',
      title: 'Advanced Configuration',
      description: 'Color picker with custom configuration',
      code: `<amw-color-picker
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
    }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });

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
