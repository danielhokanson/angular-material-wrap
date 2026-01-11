import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwTabsComponent, AmwTabComponent, AmwDividerComponent, AmwCardComponent, AmwIconComponent } from '../../../../library/src/components/components';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwSelectComponent } from '../../../../library/src/controls/components/amw-select/amw-select.component';
import { AmwSliderComponent } from '../../../../library/src/controls/components/amw-slider/amw-slider.component';
import { AmwSwitchComponent } from '../../../../library/src/controls/components/amw-switch/amw-switch.component';
@Component({
  selector: 'amw-settings-page',
  standalone: true,
  imports: [
    FormsModule,
    AmwAccordionComponent,
    AmwAccordionPanelComponent,
    AmwTabsComponent,
    AmwTabComponent,
    AmwDividerComponent,
    AmwCardComponent,
    AmwIconComponent,
    AmwButtonComponent,
    AmwInputComponent,
    AmwSelectComponent,
    AmwSliderComponent,
    AmwSwitchComponent,
],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent implements OnInit {
  // General settings
  appName = 'Angular Material Wrap';
  defaultLanguage = 'en';
  theme = 'light';
  fontSize = 14;

  // Options for select components
  languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' }
  ];

  themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'auto', label: 'Auto' }
  ];

  // Notification settings
  emailNotifications = true;
  emailFrequency = 'daily';
  pushNotifications = false;
  emailAddress = 'user@example.com';
  systemNotifications = true;
  marketingEmails = false;

  // Security settings
  sessionTimeout = 30;
  analyticsTracking = true;
  errorReporting = true;
  usageAnalytics = true;
  performanceMonitoring = true;

  // Advanced settings
  apiBaseUrl = 'https://api.example.com';
  cacheDuration = 15;
  debugMode = false;

  constructor() { }

  ngOnInit(): void { }

  saveSettings(): void {
    console.log('Saving settings:', {
      appName: this.appName,
      defaultLanguage: this.defaultLanguage,
      theme: this.theme,
      fontSize: this.fontSize,
      emailNotifications: this.emailNotifications,
      emailFrequency: this.emailFrequency,
      pushNotifications: this.pushNotifications,
      emailAddress: this.emailAddress,
      systemNotifications: this.systemNotifications,
      marketingEmails: this.marketingEmails,
      sessionTimeout: this.sessionTimeout,
      analyticsTracking: this.analyticsTracking,
      errorReporting: this.errorReporting,
      usageAnalytics: this.usageAnalytics,
      performanceMonitoring: this.performanceMonitoring,
      apiBaseUrl: this.apiBaseUrl,
      cacheDuration: this.cacheDuration,
      debugMode: this.debugMode
    });
  }

  resetSettings(): void {
    // Reset to default values
    this.appName = 'Angular Material Wrap';
    this.defaultLanguage = 'en';
    this.theme = 'light';
    this.fontSize = 14;
    this.emailNotifications = true;
    this.emailFrequency = 'daily';
    this.pushNotifications = false;
    this.emailAddress = 'user@example.com';
    this.systemNotifications = true;
    this.marketingEmails = false;
    this.sessionTimeout = 30;
    this.analyticsTracking = true;
    this.errorReporting = true;
    this.usageAnalytics = true;
    this.performanceMonitoring = true;
    this.apiBaseUrl = 'https://api.example.com';
    this.cacheDuration = 15;
    this.debugMode = false;
  }
}
