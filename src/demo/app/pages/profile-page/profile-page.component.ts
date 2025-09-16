import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
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
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatChipsModule,
        MatDividerModule,
        MatTabsModule,
        // MatAvatarModule,
        FormsModule,
        ReactiveFormsModule
    ],
    encapsulation: ViewEncapsulation.None,
    template: `
    <div class="profile-page">
      <div class="profile-header">
        <h1>Profile</h1>
        <p>Manage your account settings and preferences</p>
      </div>

      <div class="profile-content">
        <mat-tab-group>
          <!-- Personal Information -->
          <mat-tab label="Personal Info">
            <div class="tab-content">
              <mat-card>
                <mat-card-header>
                  <mat-card-title>Personal Information</mat-card-title>
                  <mat-card-subtitle>Update your personal details</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <form [formGroup]="personalForm" class="profile-form">
                    <div class="form-row">
                      <mat-form-field appearance="outline">
                        <mat-label>First Name</mat-label>
                        <input matInput formControlName="firstName" placeholder="Enter first name">
                      </mat-form-field>
                      <mat-form-field appearance="outline">
                        <mat-label>Last Name</mat-label>
                        <input matInput formControlName="lastName" placeholder="Enter last name">
                      </mat-form-field>
                    </div>
                    
                    <div class="form-row">
                      <mat-form-field appearance="outline">
                        <mat-label>Email</mat-label>
                        <input matInput formControlName="email" type="email" placeholder="Enter email">
                      </mat-form-field>
                      <mat-form-field appearance="outline">
                        <mat-label>Phone</mat-label>
                        <input matInput formControlName="phone" placeholder="Enter phone number">
                      </mat-form-field>
                    </div>
                    
                    <div class="form-row">
                      <mat-form-field appearance="outline">
                        <mat-label>Job Title</mat-label>
                        <input matInput formControlName="jobTitle" placeholder="Enter job title">
                      </mat-form-field>
                      <mat-form-field appearance="outline">
                        <mat-label>Company</mat-label>
                        <input matInput formControlName="company" placeholder="Enter company">
                      </mat-form-field>
                    </div>
                    
                    <div class="form-actions">
                      <button mat-raised-button color="primary" (click)="savePersonalInfo()">
                        <mat-icon>save</mat-icon>
                        Save Changes
                      </button>
                      <button mat-button (click)="resetPersonalForm()">
                        <mat-icon>refresh</mat-icon>
                        Reset
                      </button>
                    </div>
                  </form>
                </mat-card-content>
              </mat-card>
            </div>
          </mat-tab>

          <!-- Account Settings -->
          <mat-tab label="Account">
            <div class="tab-content">
              <mat-card>
                <mat-card-header>
                  <mat-card-title>Account Settings</mat-card-title>
                  <mat-card-subtitle>Manage your account preferences</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <div class="settings-section">
                    <h4>Profile Picture</h4>
                    <div class="profile-picture-section">
                      <div class="profile-avatar">
                        <mat-icon>person</mat-icon>
                      </div>
                      <div class="avatar-actions">
                        <button mat-raised-button color="primary">
                          <mat-icon>photo_camera</mat-icon>
                          Change Photo
                        </button>
                        <button mat-button color="warn">
                          <mat-icon>delete</mat-icon>
                          Remove Photo
                        </button>
                      </div>
                    </div>
                  </div>

                  <mat-divider></mat-divider>

                  <div class="settings-section">
                    <h4>Password</h4>
                    <form [formGroup]="passwordForm" class="password-form">
                      <mat-form-field appearance="outline">
                        <mat-label>Current Password</mat-label>
                        <input matInput formControlName="currentPassword" type="password">
                      </mat-form-field>
                      <mat-form-field appearance="outline">
                        <mat-label>New Password</mat-label>
                        <input matInput formControlName="newPassword" type="password">
                      </mat-form-field>
                      <mat-form-field appearance="outline">
                        <mat-label>Confirm New Password</mat-label>
                        <input matInput formControlName="confirmPassword" type="password">
                      </mat-form-field>
                      <button mat-raised-button color="primary" (click)="changePassword()">
                        <mat-icon>lock</mat-icon>
                        Change Password
                      </button>
                    </form>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>
          </mat-tab>

          <!-- Preferences -->
          <mat-tab label="Preferences">
            <div class="tab-content">
              <mat-card>
                <mat-card-header>
                  <mat-card-title>Preferences</mat-card-title>
                  <mat-card-subtitle>Customize your experience</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <div class="preferences-section">
                    <h4>Theme</h4>
                    <mat-form-field appearance="outline">
                      <mat-label>Theme</mat-label>
                      <mat-select [(ngModel)]="selectedTheme">
                        <mat-option value="light">Light</mat-option>
                        <mat-option value="dark">Dark</mat-option>
                        <mat-option value="auto">Auto</mat-option>
                      </mat-select>
                    </mat-form-field>
                  </div>

                  <div class="preferences-section">
                    <h4>Language</h4>
                    <mat-form-field appearance="outline">
                      <mat-label>Language</mat-label>
                      <mat-select [(ngModel)]="selectedLanguage">
                        <mat-option value="en">English</mat-option>
                        <mat-option value="es">Spanish</mat-option>
                        <mat-option value="fr">French</mat-option>
                        <mat-option value="de">German</mat-option>
                      </mat-select>
                    </mat-form-field>
                  </div>

                  <div class="preferences-section">
                    <h4>Notifications</h4>
                    <div class="notification-settings">
                      <div class="setting-item">
                        <span>Email notifications</span>
                        <mat-slide-toggle [(ngModel)]="emailNotifications"></mat-slide-toggle>
                      </div>
                      <div class="setting-item">
                        <span>Push notifications</span>
                        <mat-slide-toggle [(ngModel)]="pushNotifications"></mat-slide-toggle>
                      </div>
                      <div class="setting-item">
                        <span>Marketing emails</span>
                        <mat-slide-toggle [(ngModel)]="marketingEmails"></mat-slide-toggle>
                      </div>
                    </div>
                  </div>

                  <div class="form-actions">
                    <button mat-raised-button color="primary" (click)="savePreferences()">
                      <mat-icon>save</mat-icon>
                      Save Preferences
                    </button>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>
          </mat-tab>
        </mat-tab-group>
      </div>
    </div>
  `,
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
