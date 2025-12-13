import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'amw-demo-textarea-code',
  standalone: true,
  imports: [
    FormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './textarea-code.component.html',
  styleUrl: './textarea-code.component.scss'
})
export class TextareaCodeComponent {
  // State for live preview examples
  descriptionValue = '';
  projectValue = '';
  noteValue = '';
  messageValue = '';

  // Editable code examples
  editableCode = {
    basic: '',
    withValidation: '',
    differentSizes: '',
    withCharacterCount: '',
    reactiveForm: '',
    withEvents: '',
    contactForm: ''
  };

  // Original code examples (for reset functionality)
  readonly codeExamples = {
    basic: `<mat-form-field appearance="outline">
  <mat-label>Description</mat-label>
  <textarea matInput
    [(ngModel)]="descriptionValue"
    placeholder="Enter your description here..."
    rows="4"></textarea>
</mat-form-field>`,

    withValidation: `<mat-form-field appearance="outline">
  <mat-label>Project Description</mat-label>
  <textarea matInput
    [(ngModel)]="projectValue"
    placeholder="Describe your project..."
    minlength="10"
    maxlength="500"
    required
    rows="4"></textarea>
  <mat-hint>Min 10, Max 500 characters</mat-hint>
</mat-form-field>`,

    differentSizes: `<mat-form-field appearance="outline">
  <mat-label>Short Note</mat-label>
  <textarea matInput
    [(ngModel)]="noteValue"
    placeholder="Brief note..."
    rows="2"></textarea>
</mat-form-field>

<mat-form-field appearance="outline">
  <mat-label>Detailed Description</mat-label>
  <textarea matInput
    placeholder="Detailed description..."
    rows="6"></textarea>
</mat-form-field>

<mat-form-field appearance="outline">
  <mat-label>Long Text</mat-label>
  <textarea matInput
    placeholder="Very long text..."
    rows="10"></textarea>
</mat-form-field>`,

    withCharacterCount: `<mat-form-field appearance="outline">
  <mat-label>Bio</mat-label>
  <textarea matInput
    #bioInput
    placeholder="Tell us about yourself..."
    maxlength="200"
    rows="4"></textarea>
  <mat-hint align="end">{{bioInput.value.length}}/200</mat-hint>
</mat-form-field>`,

    reactiveForm: `// Component TypeScript
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
  <mat-form-field appearance="outline">
    <mat-label>Description</mat-label>
    <textarea matInput
      formControlName="description"
      placeholder="Enter description..."
      required
      rows="4"></textarea>
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>Comments</mat-label>
    <textarea matInput
      formControlName="comments"
      placeholder="Additional comments..."
      rows="4"></textarea>
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>Feedback</mat-label>
    <textarea matInput
      formControlName="feedback"
      placeholder="Your feedback..."
      required
      rows="4"></textarea>
  </mat-form-field>
</form>`,

    withEvents: `<mat-form-field appearance="outline">
  <mat-label>Message</mat-label>
  <textarea matInput
    [(ngModel)]="messageValue"
    (input)="onTextInput($event)"
    (focus)="onTextFocus($event)"
    (blur)="onTextBlur($event)"
    placeholder="Type your message..."
    rows="4"></textarea>
</mat-form-field>

// Component methods
onTextInput(event: any): void {
  console.log('Text changed:', event.target.value);
}

onTextFocus(event: FocusEvent): void {
  console.log('Textarea focused');
}

onTextBlur(event: FocusEvent): void {
  console.log('Textarea blurred');
}`,

    contactForm: `<form class="contact-form">
  <h3>Contact Us</h3>

  <mat-form-field appearance="outline">
    <mat-label>Inquiry Type</mat-label>
    <textarea matInput
      placeholder="What can we help you with?"
      required
      rows="3"></textarea>
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>Message</mat-label>
    <textarea matInput
      placeholder="Please provide details about your inquiry..."
      required
      minlength="20"
      rows="6"></textarea>
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>Additional Information</mat-label>
    <textarea matInput
      placeholder="Any additional information that might be helpful..."
      maxlength="500"
      rows="4"></textarea>
  </mat-form-field>

  <button mat-raised-button color="primary" type="submit">
    Send Message
  </button>
</form>`
  };

  constructor() {
    // Initialize editable code
    Object.keys(this.codeExamples).forEach(key => {
      this.editableCode[key as keyof typeof this.codeExamples] =
        this.codeExamples[key as keyof typeof this.codeExamples];
    });
  }

  // Event handlers for event example
  onTextInput(event: any) {
    console.log('Text changed:', event.target.value);
  }

  onTextFocus(event: FocusEvent) {
    console.log('Textarea focused');
  }

  onTextBlur(event: FocusEvent) {
    console.log('Textarea blurred');
  }

  // Reset code to original
  resetCode(exampleKey: keyof typeof this.codeExamples) {
    this.editableCode[exampleKey] = this.codeExamples[exampleKey];
  }
}