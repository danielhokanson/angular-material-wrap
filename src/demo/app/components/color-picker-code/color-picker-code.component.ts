import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'amw-demo-color-picker-code',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatTabsModule,
        MatButtonModule,
        MatIconModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './color-picker-code.component.html',
    styleUrl: './color-picker-code.component.scss'
})
export class ColorPickerCodeComponent {
    codeExamples = {
        basic: {
            title: 'Basic Color Picker',
            description: 'Simple color picker with default palette',
            html: `<amw-color-picker
  [value]="selectedColor"
  (colorChange)="onColorChange($event)">
</amw-color-picker>`,
            typescript: `export class MyComponent {
  selectedColor = '#FF5722';

  onColorChange(color: string) {
    console.log('Selected color:', color);
  }
}`
        },
        mode: {
            title: 'Custom Color Mode',
            description: 'Color picker with custom color input',
            html: `<amw-color-picker
  [value]="selectedColor"
  mode="custom"
  (colorChange)="onColorChange($event)">
</amw-color-picker>`,
            typescript: `export class MyComponent {
  selectedColor = '#2196F3';

  onColorChange(color: string) {
    console.log('Selected color:', color);
  }
}`
        },
        validation: {
            title: 'Form Validation',
            description: 'Color picker with form validation',
            html: `<form [formGroup]="colorForm">
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
</form>`,
            typescript: `export class MyComponent implements OnInit {
  colorForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.colorForm = this.fb.group({
      color: ['', Validators.required]
    });
  }
}`
        },
        configuration: {
            title: 'Advanced Configuration',
            description: 'Color picker with custom configuration',
            html: `<amw-color-picker
  [value]="selectedColor"
  [config]="colorPickerConfig"
  mode="all"
  size="large"
  [disabled]="isDisabled"
  (colorChange)="onColorChange($event)">
</amw-color-picker>`,
            typescript: `export class MyComponent {
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
    };

    copyToClipboard(code: string) {
        navigator.clipboard.writeText(code).then(() => {
            console.log('Code copied to clipboard');
        });
    }
}


