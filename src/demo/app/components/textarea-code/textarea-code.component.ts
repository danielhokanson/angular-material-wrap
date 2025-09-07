import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'amw-demo-textarea-code',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './textarea-code.component.html',
  styleUrl: './textarea-code.component.scss'
})
export class TextareaCodeComponent {
  codeExamples = {
    basic: {
      title: 'Basic Textarea',
      description: 'A simple textarea with label and placeholder',
      code: `<amw-textarea
  label="Description"
  placeholder="Enter your description here..."
  [rows]="4">
</amw-textarea>`
    },
    withValidation: {
      title: 'Textarea with Validation',
      description: 'Textarea with character limits and validation',
      code: `<amw-textarea
  label="Project Description"
  placeholder="Describe your project..."
  [minlength]="10"
  [maxlength]="500"
  [required]="true"
  appearance="outline">
</amw-textarea>`
    },
    differentSizes: {
      title: 'Different Sizes',
      description: 'Textareas with different row counts',
      code: `<amw-textarea
  label="Short Note"
  [rows]="2"
  placeholder="Brief note...">
</amw-textarea>

<amw-textarea
  label="Detailed Description"
  [rows]="6"
  placeholder="Detailed description...">
</amw-textarea>

<amw-textarea
  label="Long Text"
  [rows]="10"
  placeholder="Very long text...">
</amw-textarea>`
    },
    withCharacterCount: {
      title: 'With Character Count',
      description: 'Textarea with character count display',
      code: `<amw-textarea
  label="Bio"
  placeholder="Tell us about yourself..."
  [maxlength]="200"
  appearance="outline">
</amw-textarea>

<!-- Character count display -->
<div class="character-count">
  {{ bioText.length }}/200 characters
</div>`
    },
    reactiveForm: {
      title: 'Reactive Form Integration',
      description: 'Using textareas with Angular reactive forms',
      code: `// Component TypeScript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class MyComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(10)]],
      comments: ['', [Validators.maxLength(1000)]],
      feedback: ['', [Validators.required, Validators.minLength(20)]]
    });
  }
}

// Template
<form [formGroup]="form">
  <amw-textarea
    formControlName="description"
    label="Description"
    placeholder="Enter description..."
    [required]="true"
    [minlength]="10">
  </amw-textarea>
  
  <amw-textarea
    formControlName="comments"
    label="Comments"
    placeholder="Additional comments..."
    [maxlength]="1000">
  </amw-textarea>
  
  <amw-textarea
    formControlName="feedback"
    label="Feedback"
    placeholder="Your feedback..."
    [required]="true"
    [minlength]="20">
  </amw-textarea>
</form>`
    },
    withEvents: {
      title: 'Textarea with Events',
      description: 'Textareas with event handling',
      code: `<amw-textarea
  label="Message"
  placeholder="Type your message..."
  [value]="message"
  (input)="onTextChange($event)"
  (focus)="onFocus($event)"
  (blur)="onBlur($event)">
</amw-textarea>

// Component methods
onTextChange(event: any): void {
  this.message = event.target.value;
  console.log('Text changed:', this.message);
}

onFocus(event: FocusEvent): void {
  console.log('Textarea focused');
}

onBlur(event: FocusEvent): void {
  console.log('Textarea blurred');
}`
    },
    contactForm: {
      title: 'Contact Form Example',
      description: 'Complete contact form with multiple textareas',
      code: `<form [formGroup]="contactForm" class="contact-form">
  <h3>Contact Us</h3>
  
  <amw-textarea
    formControlName="inquiry"
    label="Inquiry Type"
    placeholder="What can we help you with?"
    [required]="true"
    [rows]="3">
  </amw-textarea>
  
  <amw-textarea
    formControlName="message"
    label="Message"
    placeholder="Please provide details about your inquiry..."
    [required]="true"
    [minlength]="20"
    [rows]="6">
  </amw-textarea>
  
  <amw-textarea
    formControlName="additional"
    label="Additional Information"
    placeholder="Any additional information that might be helpful..."
    [maxlength]="500"
    [rows]="4">
  </amw-textarea>
  
  <amw-button
    type="submit"
    variant="elevated"
    color="primary"
    [disabled]="contactForm.invalid">
    Send Message
  </amw-button>
</form>`
    }
  };
}