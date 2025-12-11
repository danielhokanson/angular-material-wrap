import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

interface Tag {
  name: string;
}

interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

@Component({
  selector: 'amw-demo-chips-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule
  ],
  templateUrl: './chips-validation.component.html',
  styleUrl: './chips-validation.component.scss'
})
export class ChipsValidationComponent {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  // Form for tag management
  tagForm: FormGroup;
  tags: Tag[] = [
    { name: 'Angular' },
    { name: 'TypeScript' }
  ];

  // Form for skills with validation
  skillForm: FormGroup;
  skills: Skill[] = [
    { name: 'JavaScript', level: 'advanced' },
    { name: 'CSS', level: 'intermediate' }
  ];

  // Form for email chips with validation
  emailForm: FormGroup;
  emails: string[] = ['user@example.com'];

  constructor(private fb: FormBuilder) {
    // Tag form with minimum tags validation
    this.tagForm = this.fb.group({
      tagInput: ['']
    });

    // Skill form with validation
    this.skillForm = this.fb.group({
      skillName: ['', [Validators.required, Validators.minLength(2)]],
      skillLevel: ['beginner', Validators.required]
    });

    // Email form with email validation
    this.emailForm = this.fb.group({
      emailInput: ['', [Validators.email]]
    });
  }

  // Tag management methods
  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value && this.tags.length < 10) {
      this.tags.push({ name: value });
    }

    event.chipInput!.clear();
  }

  removeTag(tag: Tag): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  hasMinTags(): boolean {
    return this.tags.length >= 1;
  }

  hasMaxTags(): boolean {
    return this.tags.length >= 10;
  }

  getTagsValidationMessage(): string {
    if (!this.hasMinTags()) return 'At least 1 tag is required';
    if (this.hasMaxTags()) return 'Maximum 10 tags allowed';
    return '';
  }

  // Skill management methods
  addSkill(): void {
    if (this.skillForm.valid) {
      const skillName = this.skillForm.get('skillName')?.value;
      const skillLevel = this.skillForm.get('skillLevel')?.value;

      if (skillName && !this.skills.some(s => s.name.toLowerCase() === skillName.toLowerCase())) {
        this.skills.push({ name: skillName, level: skillLevel });
        this.skillForm.reset({ skillLevel: 'beginner' });
      }
    }
  }

  removeSkill(skill: Skill): void {
    const index = this.skills.indexOf(skill);
    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  getSkillColor(level: string): 'primary' | 'accent' | 'warn' {
    switch (level) {
      case 'advanced': return 'warn';
      case 'intermediate': return 'accent';
      default: return 'primary';
    }
  }

  getSkillErrorMessage(field: string): string {
    const control = this.skillForm.get(field);
    if (control?.hasError('required')) return 'This field is required';
    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `Minimum length is ${minLength} characters`;
    }
    return '';
  }

  // Email management methods
  addEmail(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value && this.isValidEmail(value)) {
      if (!this.emails.includes(value)) {
        this.emails.push(value);
      }
      event.chipInput!.clear();
      this.emailForm.get('emailInput')?.setValue('');
    }
  }

  removeEmail(email: string): void {
    const index = this.emails.indexOf(email);
    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  hasMinEmails(): boolean {
    return this.emails.length >= 1;
  }

  getEmailValidationMessage(): string {
    const emailControl = this.emailForm.get('emailInput');
    if (emailControl?.hasError('email')) return 'Invalid email format';
    if (!this.hasMinEmails()) return 'At least 1 email is required';
    return '';
  }

  // Form submission
  submitForms(): void {
    const formData = {
      tags: this.tags,
      skills: this.skills,
      emails: this.emails
    };
    console.log('Form submitted:', formData);
    alert('Forms submitted successfully! Check console for data.');
  }

  areFormsValid(): boolean {
    return this.hasMinTags() && this.hasMinEmails() && this.skills.length > 0;
  }
}
