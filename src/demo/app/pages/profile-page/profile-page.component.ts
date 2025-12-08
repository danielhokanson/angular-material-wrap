import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
// import { MatAvatarModule } from '@angular/material/avatar';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'amw-profile-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatDividerModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule
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
