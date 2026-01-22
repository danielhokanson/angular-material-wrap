import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmwDividerComponent, AmwTabsComponent, AmwTabComponent, AmwCardComponent, AmwIconComponent } from '../../../../library/src/components/components';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwSelectComponent } from '../../../../library/src/controls/components/amw-select/amw-select.component';
import { AmwSwitchComponent } from '../../../../library/src/controls/components/amw-switch/amw-switch.component';
import { AmwApiDocComponent, ApiInterface } from '../../shared/components/api-doc/api-doc.component';
import { ApiDocumentation } from '../../components/base/base-api.component';

@Component({
  selector: 'amw-profile-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AmwDividerComponent,
    AmwTabsComponent,
    AmwTabComponent,
    AmwCardComponent,
    AmwIconComponent,
    AmwButtonComponent,
    AmwInputComponent,
    AmwSelectComponent,
    AmwSwitchComponent,
    AmwApiDocComponent,
],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  personalForm: FormGroup;
  passwordForm: FormGroup;

  selectedTheme = 'light';
  selectedLanguage = 'en';
  emailNotifications = true;
  pushNotifications = false;
  marketingEmails = false;

  // Options for select components
  themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'auto', label: 'Auto' }
  ];

  languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' }
  ];

  // Code examples for documentation
  codeExamples = {
    basicUsage: `<!-- Profile Page with Tabbed Sections -->
<div class="profile-page">
  <div class="profile-header">
    <h1>Profile</h1>
    <p>Manage your account settings and preferences</p>
  </div>

  <amw-tabs>
    <amw-tab label="Personal Info">
      <amw-card>
        <ng-template #cardHeader>
          <h2>Personal Information</h2>
          <p class="subtitle">Update your personal details</p>
        </ng-template>
        <ng-template #cardContent>
          <form [formGroup]="personalForm" class="profile-form">
            <div class="form-row">
              <amw-input label="First Name" formControlName="firstName"></amw-input>
              <amw-input label="Last Name" formControlName="lastName"></amw-input>
            </div>
            <div class="form-actions">
              <amw-button appearance="elevated" color="primary" (click)="savePersonalInfo()">
                Save Changes
              </amw-button>
            </div>
          </form>
        </ng-template>
      </amw-card>
    </amw-tab>

    <amw-tab label="Account">
      <!-- Account settings content -->
    </amw-tab>
  </amw-tabs>
</div>`,

    formPattern: `<!-- Reactive Form Pattern -->
<form [formGroup]="personalForm" class="profile-form">
  <div class="form-row">
    <amw-input
      label="First Name"
      formControlName="firstName"
      placeholder="Enter first name">
    </amw-input>
    <amw-input
      label="Last Name"
      formControlName="lastName"
      placeholder="Enter last name">
    </amw-input>
  </div>

  <div class="form-row">
    <amw-input
      label="Email"
      formControlName="email"
      type="email"
      placeholder="Enter email">
    </amw-input>
    <amw-input
      label="Phone"
      formControlName="phone"
      placeholder="Enter phone number">
    </amw-input>
  </div>

  <div class="form-actions">
    <amw-button appearance="elevated" color="primary" (click)="savePersonalInfo()" icon="save">
      Save Changes
    </amw-button>
    <amw-button appearance="text" (click)="resetPersonalForm()" icon="refresh">
      Reset
    </amw-button>
  </div>
</form>`,

    preferencesPattern: `<!-- Preferences with Switches and Selects -->
<div class="settings-section">
  <h4>Appearance</h4>
  <div class="setting-item">
    <span>Theme</span>
    <amw-select
      label="Select Theme"
      [(ngModel)]="selectedTheme"
      [options]="themeOptions">
    </amw-select>
  </div>
</div>

<amw-divider></amw-divider>

<div class="settings-section">
  <h4>Notifications</h4>
  <div class="setting-item">
    <span>Email notifications</span>
    <amw-switch [(ngModel)]="emailNotifications"></amw-switch>
  </div>
  <div class="setting-item">
    <span>Push notifications</span>
    <amw-switch [(ngModel)]="pushNotifications"></amw-switch>
  </div>
</div>`,

    componentCode: `import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AmwTabsComponent,
  AmwTabComponent,
  AmwCardComponent,
  AmwDividerComponent,
  AmwIconComponent
} from 'angular-material-wrap';
import {
  AmwInputComponent,
  AmwSelectComponent,
  AmwSwitchComponent,
  AmwButtonComponent
} from 'angular-material-wrap';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AmwTabsComponent,
    AmwTabComponent,
    AmwCardComponent,
    AmwDividerComponent,
    AmwIconComponent,
    AmwInputComponent,
    AmwSelectComponent,
    AmwSwitchComponent,
    AmwButtonComponent
  ],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  personalForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.personalForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });
  }

  savePersonalInfo(): void {
    if (this.personalForm.valid) {
      console.log('Saving:', this.personalForm.value);
    }
  }
}`
  };

  // API documentation
  profilePageApiDoc: ApiDocumentation = {
    inputs: [],
    outputs: [],
    usageNotes: [
      'The Profile Page is a composite page pattern demonstrating how to build a user profile interface',
      'Uses AmwTabs for organizing profile sections into logical categories (Personal Info, Account, Preferences)',
      'Personal Info tab uses Reactive Forms for form validation and data handling',
      'Account tab demonstrates password change functionality and profile picture management',
      'Preferences tab uses ngModel binding for simpler toggle and select controls',
      'AmwDivider is used to separate logical groups within each tab',
      'Action buttons allow saving changes or resetting forms',
      'This page demonstrates integration of: AmwTabs, AmwCard, AmwInput, AmwSelect, AmwSwitch, AmwButton, AmwDivider, AmwIcon'
    ]
  };

  // Interfaces for documentation
  profilePageInterfaces: ApiInterface[] = [
    {
      name: 'UserProfile',
      description: 'Structure for user profile data',
      properties: [
        { name: 'firstName', type: 'string', description: 'User first name' },
        { name: 'lastName', type: 'string', description: 'User last name' },
        { name: 'email', type: 'string', description: 'User email address' },
        { name: 'phone', type: 'string', description: 'User phone number (optional)' },
        { name: 'jobTitle', type: 'string', description: 'User job title (optional)' },
        { name: 'company', type: 'string', description: 'User company (optional)' }
      ]
    },
    {
      name: 'UserPreferences',
      description: 'Structure for user preferences',
      properties: [
        { name: 'theme', type: "'light' | 'dark' | 'auto'", description: 'Selected theme' },
        { name: 'language', type: 'string', description: 'Preferred language code' },
        { name: 'emailNotifications', type: 'boolean', description: 'Email notification preference' },
        { name: 'pushNotifications', type: 'boolean', description: 'Push notification preference' },
        { name: 'marketingEmails', type: 'boolean', description: 'Marketing email preference' }
      ]
    }
  ];

  constructor(private fb: FormBuilder) {
    this.personalForm = this.fb.group({
      firstName: ['John', Validators.required],
      lastName: ['Doe', Validators.required],
      email: ['john.doe@example.com', [Validators.required, Validators.email]],
      phone: ['+1 (555) 123-4567'],
      jobTitle: ['Frontend Developer'],
      company: ['Angular Material Wrap']
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  savePersonalInfo(): void {
    if (this.personalForm.valid) {
      console.log('Saving personal info:', this.personalForm.value);
    }
  }

  resetPersonalForm(): void {
    this.personalForm.reset();
  }

  changePassword(): void {
    if (this.passwordForm.valid) {
      console.log('Changing password');
    }
  }

  savePreferences(): void {
    console.log('Saving preferences:', {
      theme: this.selectedTheme,
      language: this.selectedLanguage,
      emailNotifications: this.emailNotifications,
      pushNotifications: this.pushNotifications,
      marketingEmails: this.marketingEmails
    });
  }
}
