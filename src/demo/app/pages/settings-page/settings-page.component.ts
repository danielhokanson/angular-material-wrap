import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwTabsComponent, AmwTabComponent, AmwDividerComponent, AmwCardComponent } from '../../../../library/src/components/components';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwSelectComponent } from '../../../../library/src/controls/components/amw-select/amw-select.component';
import { AmwSliderComponent } from '../../../../library/src/controls/components/amw-slider/amw-slider.component';
import { AmwSwitchComponent } from '../../../../library/src/controls/components/amw-switch/amw-switch.component';
import { AmwApiDocComponent, ApiInterface } from '../../shared/components/api-doc/api-doc.component';
import { ApiDocumentation } from '../../components/base/base-api.component';

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
    AmwButtonComponent,
    AmwInputComponent,
    AmwSelectComponent,
    AmwSliderComponent,
    AmwSwitchComponent,
    AmwApiDocComponent,
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

  // Code examples for documentation
  codeExamples = {
    basicUsage: `<!-- Settings Page with Tabbed Navigation -->
<div class="settings-page">
  <div class="settings-header">
    <h1>Settings</h1>
    <p>Configure your application preferences</p>
  </div>

  <amw-tabs>
    <amw-tab label="General">
      <amw-card>
        <ng-template #cardHeader>
          <h2>General Settings</h2>
        </ng-template>
        <ng-template #cardContent>
          <div class="setting-item">
            <div class="setting-info">
              <span class="setting-label">Application Name</span>
              <span class="setting-description">The name displayed in the header</span>
            </div>
            <amw-input [(ngModel)]="appName" label="App Name"></amw-input>
          </div>
        </ng-template>
      </amw-card>
    </amw-tab>

    <amw-tab label="Notifications">
      <!-- Notification settings -->
    </amw-tab>
  </amw-tabs>

  <div class="settings-actions">
    <amw-button appearance="elevated" color="primary" (click)="saveSettings()">
      Save Settings
    </amw-button>
    <amw-button appearance="text" (click)="resetSettings()">
      Reset to Defaults
    </amw-button>
  </div>
</div>`,

    settingItemPattern: `<!-- Standard Setting Item Pattern -->
<div class="setting-item">
  <div class="setting-info">
    <span class="setting-label">Setting Name</span>
    <span class="setting-description">Description of what this setting does</span>
  </div>
  <!-- Control component (input, select, switch, slider) -->
  <amw-switch [(ngModel)]="settingValue"></amw-switch>
</div>`,

    accordionPattern: `<!-- Advanced Settings with Accordion -->
<amw-accordion>
  <amw-accordion-panel amwTitle="API Configuration">
    <div class="setting-item">
      <div class="setting-info">
        <span class="setting-label">API Base URL</span>
        <span class="setting-description">The base URL for API requests</span>
      </div>
      <amw-input [(ngModel)]="apiBaseUrl" label="API URL"></amw-input>
    </div>
  </amw-accordion-panel>

  <amw-accordion-panel amwTitle="Cache Settings">
    <div class="setting-item">
      <div class="setting-info">
        <span class="setting-label">Cache Duration</span>
        <span class="setting-description">How long to cache data</span>
      </div>
      <amw-slider [min]="1" [max]="60" [(ngModel)]="cacheDuration"></amw-slider>
    </div>
  </amw-accordion-panel>
</amw-accordion>`,

    componentCode: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AmwTabsComponent,
  AmwTabComponent,
  AmwCardComponent,
  AmwDividerComponent,
  AmwAccordionComponent,
  AmwAccordionPanelComponent
} from 'angular-material-wrap';
import {
  AmwInputComponent,
  AmwSelectComponent,
  AmwSwitchComponent,
  AmwSliderComponent,
  AmwButtonComponent
} from 'angular-material-wrap';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    FormsModule,
    AmwTabsComponent,
    AmwTabComponent,
    AmwCardComponent,
    AmwDividerComponent,
    AmwAccordionComponent,
    AmwAccordionPanelComponent,
    AmwInputComponent,
    AmwSelectComponent,
    AmwSwitchComponent,
    AmwSliderComponent,
    AmwButtonComponent
  ],
  templateUrl: './settings.component.html'
})
export class SettingsComponent {
  // General settings
  appName = 'My Application';
  theme = 'light';

  // Notification settings
  emailNotifications = true;
  pushNotifications = false;

  // Options for select
  themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'auto', label: 'Auto' }
  ];

  saveSettings(): void {
    console.log('Saving settings...');
  }

  resetSettings(): void {
    // Reset to defaults
  }
}`
  };

  // API documentation
  settingsPageApiDoc: ApiDocumentation = {
    inputs: [],
    outputs: [],
    usageNotes: [
      'The Settings Page is a composite page pattern demonstrating how to build a settings interface',
      'Uses AmwTabs for organizing settings into logical categories (General, Notifications, Privacy, Advanced)',
      'Each tab contains AmwCard components with grouped settings',
      'Settings are organized using a consistent item pattern with label, description, and control',
      'AmwDivider is used to separate logical groups within a tab',
      'AmwAccordion is used in Advanced settings for collapsible configuration sections',
      'Action buttons at the bottom allow saving or resetting all settings',
      'This page demonstrates integration of: AmwTabs, AmwCard, AmwAccordion, AmwInput, AmwSelect, AmwSwitch, AmwSlider, AmwButton, AmwDivider'
    ]
  };

  // Interfaces for documentation
  settingsPageInterfaces: ApiInterface[] = [
    {
      name: 'SettingItem',
      description: 'Structure for a single setting item',
      properties: [
        { name: 'label', type: 'string', description: 'Display name of the setting' },
        { name: 'description', type: 'string', description: 'Help text explaining the setting' },
        { name: 'value', type: 'any', description: 'Current value of the setting' },
        { name: 'type', type: "'text' | 'select' | 'switch' | 'slider'", description: 'Type of control to render' },
        { name: 'options', type: 'SelectOption[]', description: 'Options for select type (optional)' }
      ]
    },
    {
      name: 'SettingsGroup',
      description: 'A group of related settings',
      properties: [
        { name: 'title', type: 'string', description: 'Group heading' },
        { name: 'items', type: 'SettingItem[]', description: 'Settings in this group' }
      ]
    },
    {
      name: 'SettingsTab',
      description: 'A tab containing settings groups',
      properties: [
        { name: 'label', type: 'string', description: 'Tab label' },
        { name: 'icon', type: 'string', description: 'Optional icon for the tab' },
        { name: 'groups', type: 'SettingsGroup[]', description: 'Groups of settings in this tab' }
      ]
    }
  ];

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
