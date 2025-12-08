import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'amw-settings-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatDividerModule,
    MatTabsModule,
    MatExpansionModule,
    MatChipsModule,
    FormsModule
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
