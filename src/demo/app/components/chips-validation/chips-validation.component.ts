import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AmwCardComponent, AmwIconComponent } from '../../../../library/src/components/components';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwSelectComponent } from '../../../../library/src/controls/components/amw-select/amw-select.component';
import { AmwSelectOption } from '../../../../library/src/controls/components/amw-select/interfaces/amw-select-option.interface';
import { AmwChipsComponent } from '../../../../library/src/controls/components/amw-chips/amw-chips.component';
import { Chip, ChipEvent } from '../../../../library/src/controls/components/amw-chips/interfaces';

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
    AmwCardComponent,
    AmwIconComponent,
    AmwChipsComponent,
    AmwButtonComponent,
    AmwInputComponent,
    AmwSelectComponent,
  ],
  templateUrl: './chips-validation.component.html',
  styleUrl: './chips-validation.component.scss'
})
export class ChipsValidationComponent {
  // Form for skills with validation
  skillForm: FormGroup;

  // Skill level options for select
  skillLevelOptions: AmwSelectOption[] = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  // Tag data
  tags: Tag[] = [
    { name: 'Angular' },
    { name: 'TypeScript' }
  ];

  // Chip representation of tags
  get tagChips(): Chip[] {
    return this.tags.map((tag, index) => ({
      id: `tag-${index}`,
      label: tag.name,
      removable: true
    }));
  }

  // Skills data
  skills: Skill[] = [
    { name: 'JavaScript', level: 'advanced' },
    { name: 'CSS', level: 'intermediate' }
  ];

  // Chip representation of skills
  get skillChips(): Chip[] {
    return this.skills.map((skill, index) => ({
      id: `skill-${index}`,
      label: `${skill.name} (${skill.level})`,
      removable: true
    }));
  }

  // Email data
  emails: string[] = ['user@example.com'];

  // Chip representation of emails
  get emailChips(): Chip[] {
    return this.emails.map((email, index) => ({
      id: `email-${index}`,
      label: email,
      removable: true
    }));
  }

  constructor(private fb: FormBuilder) {
    // Skill form with validation
    this.skillForm = this.fb.group({
      skillName: ['', [Validators.required, Validators.minLength(2)]],
      skillLevel: ['beginner', Validators.required]
    });
  }

  // Tag management methods
  onTagAdd(event: ChipEvent): void {
    if (event.chip && this.tags.length < 10) {
      this.tags.push({ name: event.chip.label });
    }
  }

  onTagRemove(event: ChipEvent): void {
    const index = this.tags.findIndex(t => t.name === event.chip.label);
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

  onSkillChipRemove(event: ChipEvent): void {
    // Extract skill name from label (format: "SkillName (level)")
    const labelMatch = event.chip.label.match(/^(.+)\s+\(/);
    if (labelMatch) {
      const skillName = labelMatch[1];
      const index = this.skills.findIndex(s => s.name === skillName);
      if (index >= 0) {
        this.skills.splice(index, 1);
      }
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
  onEmailAdd(event: ChipEvent): void {
    const email = event.chip.label.trim();
    if (email && this.isValidEmail(email) && !this.emails.includes(email)) {
      this.emails.push(email);
    }
  }

  onEmailRemove(event: ChipEvent): void {
    const index = this.emails.indexOf(event.chip.label);
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
