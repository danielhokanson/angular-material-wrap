import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmwDividerComponent, AmwTabsComponent, AmwTabComponent, AmwCardComponent, AmwIconComponent } from '../../../../library/src/components/components';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwSelectComponent } from '../../../../library/src/controls/components/amw-select/amw-select.component';
import { AmwSwitchComponent } from '../../../../library/src/controls/components/amw-switch/amw-switch.component';
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
