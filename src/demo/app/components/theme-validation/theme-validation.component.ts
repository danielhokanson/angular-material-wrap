import { Component, ViewEncapsulation, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
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
    AmwValidationDocComponent,
    AmwButtonComponent,
    AmwSelectComponent,
    AmwCardComponent,
    AmwRadioGroupComponent,
    AmwRadioComponent,
    AmwColorPickerComponent,
    AmwIconComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './theme-validation.component.html',
  styleUrl: './theme-validation.component.scss'
})
export class ThemeValidationComponent extends BaseValidationComponent {
  currentTheme = signal<ThemeConfig>({
    primaryColor: '#6750a4',
    accentColor: '#625b71',
    warnColor: '#ba1a1a',
    mode: 'light',
    density: 'default',
    typography: 'roboto'
  });

  previewEnabled = signal(true);

  colorOptions = [
    { name: 'Purple', value: '#6750a4' },
    { name: 'Blue', value: '#1976d2' },
    { name: 'Green', value: '#388e3c' },
    { name: 'Orange', value: '#f57c00' },
    { name: 'Red', value: '#d32f2f' },
    { name: 'Custom', value: 'custom' }
  ];

  typographyOptions = [
    { value: 'roboto', label: 'Roboto' },
    { value: 'montserrat', label: 'Montserrat' },
    { value: 'open-sans', label: 'Open Sans' }
  ];

  densityOptions = [
    { value: 'default', label: 'Default - Standard spacing' },
    { value: 'comfortable', label: 'Comfortable - More space' },
    { value: 'compact', label: 'Compact - Less space' }
  ];

  validationForm: FormGroup = this.fb.group({
    primaryColor: [this.currentTheme().primaryColor, [Validators.required, Validators.pattern(/^#[0-9a-fA-F]{6}$/)]],
    accentColor: [this.currentTheme().accentColor, [Validators.required, Validators.pattern(/^#[0-9a-fA-F]{6}$/)]],
    warnColor: [this.currentTheme().warnColor, [Validators.required, Validators.pattern(/^#[0-9a-fA-F]{6}$/)]],
    mode: [this.currentTheme().mode, Validators.required],
    density: [this.currentTheme().density, Validators.required],
    typography: [this.currentTheme().typography, Validators.required]
  });

  validationInfo: ValidationInfo[] = [
    { title: 'Primary Color', description: 'Must be a valid hex color (#RRGGBB)' },
    { title: 'Accent Color', description: 'Must be a valid hex color (#RRGGBB)' },
    { title: 'Warn Color', description: 'Must be a valid hex color (#RRGGBB)' },
    { title: 'Mode', description: 'Theme mode is required (light/dark)' },
    { title: 'Density', description: 'Component density must be selected' },
    { title: 'Typography', description: 'Font family must be selected' }
  ];

  applyTheme(): void {
    if (this.validationForm.valid) {
      const formValue = this.validationForm.value;
      this.currentTheme.set({
        primaryColor: formValue.primaryColor,
        accentColor: formValue.accentColor,
        warnColor: formValue.warnColor,
        mode: formValue.mode,
        density: formValue.density,
        typography: formValue.typography
      });

      this.updateCSSVariables();
      this.notification.success('Success', 'Theme applied successfully!', { duration: 3000 });
    }
  }

  private updateCSSVariables(): void {
    const theme = this.currentTheme();
    const root = document.documentElement;

    root.style.setProperty('--custom-primary', theme.primaryColor);
    root.style.setProperty('--custom-accent', theme.accentColor);
    root.style.setProperty('--custom-warn', theme.warnColor);

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

  resetTheme(): void {
    const defaultTheme: ThemeConfig = {
      primaryColor: '#6750a4',
      accentColor: '#625b71',
      warnColor: '#ba1a1a',
      mode: 'light',
      density: 'default',
      typography: 'roboto'
    };

    this.currentTheme.set(defaultTheme);
    this.validationForm.patchValue(defaultTheme);
    this.updateCSSVariables();
  }

  togglePreview(): void {
    this.previewEnabled.update(val => !val);
  }

  getModeIcon(): string {
    return this.currentTheme().mode === 'dark' ? 'dark_mode' : 'light_mode';
  }

  isFormValid(): boolean {
    return this.validationForm.valid;
  }

  exportTheme(): void {
    const theme = this.currentTheme();
    const themeJson = JSON.stringify(theme, null, 2);
    console.log('Theme configuration:', themeJson);

    const blob = new Blob([themeJson], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'theme-config.json';
    link.click();
    window.URL.revokeObjectURL(url);
  }

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
