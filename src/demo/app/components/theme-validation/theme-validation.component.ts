import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwSelectComponent } from '../../../../library/src/controls/components/amw-select/amw-select.component';
import { AmwCardComponent } from '../../../../library/src/components/components/amw-card/amw-card.component';
import { AmwRadioGroupComponent } from '../../../../library/src/controls/components/amw-radio-group/amw-radio-group.component';
import { AmwRadioComponent } from '../../../../library/src/controls/components/amw-radio/amw-radio.component';
import { AmwColorPickerComponent } from '../../../../library/src/controls/components/amw-color-picker/amw-color-picker.component';
import { AmwIconComponent } from '../../../../library/src/components/components/amw-icon/amw-icon.component';

interface ThemeConfig {
  primaryColor: string;
  accentColor: string;
  warnColor: string;
  mode: 'light' | 'dark';
  density: 'default' | 'comfortable' | 'compact';
  typography: 'roboto' | 'montserrat' | 'open-sans';
}

@Component({
  selector: 'amw-demo-theme-validation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AmwButtonComponent,
    AmwInputComponent,
    AmwSelectComponent,
    AmwCardComponent,
    AmwRadioGroupComponent,
    AmwRadioComponent,
    AmwColorPickerComponent,
    AmwIconComponent,
  ],
  templateUrl: './theme-validation.component.html',
  styleUrl: './theme-validation.component.scss'
})
export class ThemeValidationComponent {
  // Theme configuration form
  themeForm: FormGroup;

  // Current theme configuration
  currentTheme = signal<ThemeConfig>({
    primaryColor: '#6750a4',
    accentColor: '#625b71',
    warnColor: '#ba1a1a',
    mode: 'light',
    density: 'default',
    typography: 'roboto'
  });

  // Preview state
  previewEnabled = signal(true);

  // Predefined color options
  colorOptions = [
    { name: 'Purple', value: '#6750a4' },
    { name: 'Blue', value: '#1976d2' },
    { name: 'Green', value: '#388e3c' },
    { name: 'Orange', value: '#f57c00' },
    { name: 'Red', value: '#d32f2f' },
    { name: 'Custom', value: 'custom' }
  ];

  // Typography options
  typographyOptions = [
    { value: 'roboto', label: 'Roboto' },
    { value: 'montserrat', label: 'Montserrat' },
    { value: 'open-sans', label: 'Open Sans' }
  ];

  // Density options
  densityOptions = [
    { value: 'default', label: 'Default - Standard spacing' },
    { value: 'comfortable', label: 'Comfortable - More space' },
    { value: 'compact', label: 'Compact - Less space' }
  ];

  constructor(private fb: FormBuilder) {
    // Initialize theme form
    this.themeForm = this.fb.group({
      primaryColor: [this.currentTheme().primaryColor, [Validators.required, Validators.pattern(/^#[0-9a-fA-F]{6}$/)]],
      accentColor: [this.currentTheme().accentColor, [Validators.required, Validators.pattern(/^#[0-9a-fA-F]{6}$/)]],
      warnColor: [this.currentTheme().warnColor, [Validators.required, Validators.pattern(/^#[0-9a-fA-F]{6}$/)]],
      mode: [this.currentTheme().mode, Validators.required],
      density: [this.currentTheme().density, Validators.required],
      typography: [this.currentTheme().typography, Validators.required]
    });
  }

  // Validation helper
  getErrorMessage(field: string): string {
    const control = this.themeForm.get(field);
    if (control?.hasError('required')) return 'This field is required';
    if (control?.hasError('pattern')) return 'Invalid color format (use #RRGGBB)';
    return '';
  }

  // Apply theme changes
  applyTheme() {
    if (this.themeForm.valid) {
      const formValue = this.themeForm.value;
      this.currentTheme.set({
        primaryColor: formValue.primaryColor,
        accentColor: formValue.accentColor,
        warnColor: formValue.warnColor,
        mode: formValue.mode,
        density: formValue.density,
        typography: formValue.typography
      });

      // Apply CSS variables
      this.updateCSSVariables();

      alert('Theme applied successfully!');
    }
  }

  // Update CSS variables
  private updateCSSVariables() {
    const theme = this.currentTheme();
    const root = document.documentElement;

    root.style.setProperty('--custom-primary', theme.primaryColor);
    root.style.setProperty('--custom-accent', theme.accentColor);
    root.style.setProperty('--custom-warn', theme.warnColor);

    // Apply mode
    if (theme.mode === 'dark') {
      root.style.setProperty('--custom-background', '#1c1b1f');
      root.style.setProperty('--custom-surface', '#28272a');
      root.style.setProperty('--custom-on-background', '#e6e1e5');
    } else {
      root.style.setProperty('--custom-background', '#fffbfe');
      root.style.setProperty('--custom-surface', '#ffffff');
      root.style.setProperty('--custom-on-background', '#1c1b1f');
    }
  }

  // Reset to defaults
  resetTheme() {
    const defaultTheme: ThemeConfig = {
      primaryColor: '#6750a4',
      accentColor: '#625b71',
      warnColor: '#ba1a1a',
      mode: 'light',
      density: 'default',
      typography: 'roboto'
    };

    this.currentTheme.set(defaultTheme);
    this.themeForm.patchValue(defaultTheme);
    this.updateCSSVariables();
  }

  // Toggle preview
  togglePreview() {
    this.previewEnabled.update(val => !val);
  }

  // Get theme mode icon
  getModeIcon(): string {
    return this.currentTheme().mode === 'dark' ? 'dark_mode' : 'light_mode';
  }

  // Check if form is valid
  isFormValid(): boolean {
    return this.themeForm.valid;
  }

  // Export theme configuration
  exportTheme() {
    const theme = this.currentTheme();
    const themeJson = JSON.stringify(theme, null, 2);
    console.log('Theme configuration:', themeJson);

    // Create downloadable file
    const blob = new Blob([themeJson], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'theme-config.json';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  // Get preview styles
  getPreviewStyles() {
    const theme = this.currentTheme();
    return {
      '--preview-primary': theme.primaryColor,
      '--preview-accent': theme.accentColor,
      '--preview-warn': theme.warnColor,
      '--preview-background': theme.mode === 'dark' ? '#1c1b1f' : '#fffbfe',
      '--preview-surface': theme.mode === 'dark' ? '#28272a' : '#ffffff',
      '--preview-on-surface': theme.mode === 'dark' ? '#e6e1e5' : '#1c1b1f'
    };
  }
}
