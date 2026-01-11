import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseCodeComponent } from '../base/base-code.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwTextareaComponent } from '../../../../library/src/controls/components/amw-textarea/amw-textarea.component';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwIconComponent } from '../../../../library/src/components/components';

type TextareaExamples = 'basic' | 'withValidation' | 'differentSizes' | 'withCharacterCount' | 'reactiveForm' | 'withEvents' | 'contactForm';

@Component({
  selector: 'amw-demo-textarea-code',
  standalone: true,
  imports: [
    FormsModule,
    AmwButtonComponent,
    AmwTextareaComponent,
    AmwAccordionComponent,
    AmwAccordionPanelComponent,
    AmwIconComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './textarea-code.component.html',
  styleUrl: './textarea-code.component.scss'
})
export class TextareaCodeComponent extends BaseCodeComponent<TextareaExamples> {
  // State for live preview examples
  descriptionValue = '';
  projectValue = '';
  noteValue = '';
  messageValue = '';

  // Original code examples (for reset functionality)
  readonly codeExamples: Record<TextareaExamples, string> = {
    basic: `<amw-textarea
  label="Description"
  [(ngModel)]="descriptionValue"
  placeholder="Enter your description here..."
  appearance="outline"
  rows="4">
</amw-textarea>`,

    withValidation: `<amw-textarea
  label="Project Description"
  [(ngModel)]="projectValue"
  placeholder="Describe your project..."
  appearance="outline"
  minlength="10"
  maxlength="500"
  required
  rows="4"
  hint="Min 10, Max 500 characters">
</amw-textarea>`,

    differentSizes: `<amw-textarea
  label="Short Note"
  [(ngModel)]="noteValue"
  placeholder="Brief note..."
  appearance="outline"
  rows="2">
</amw-textarea>

<amw-textarea
  label="Detailed Description"
  placeholder="Detailed description..."
  appearance="outline"
  rows="6">
</amw-textarea>

<amw-textarea
  label="Long Text"
  placeholder="Very long text..."
  appearance="outline"
  rows="10">
</amw-textarea>`,

    withCharacterCount: `<amw-textarea
  label="Bio"
  #bioInput
  placeholder="Tell us about yourself..."
  appearance="outline"
  maxlength="200"
  rows="4"
  hint="{{bioInput.value.length}}/200">
</amw-textarea>`,

    reactiveForm: `// Component TypeScript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
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
    label="Description"
    formControlName="description"
    placeholder="Enter description..."
    appearance="outline"
    required
    rows="4">
  </amw-textarea>

  <amw-textarea
    label="Comments"
    formControlName="comments"
    placeholder="Additional comments..."
    appearance="outline"
    rows="4">
  </amw-textarea>

  <amw-textarea
    label="Feedback"
    formControlName="feedback"
    placeholder="Your feedback..."
    appearance="outline"
    required
    rows="4">
  </amw-textarea>
</form>`,

    withEvents: `<amw-textarea
  label="Message"
  [(ngModel)]="messageValue"
  (input)="onTextInput($event)"
  (focus)="onTextFocus($event)"
  (blur)="onTextBlur($event)"
  placeholder="Type your message..."
  appearance="outline"
  rows="4">
</amw-textarea>

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

  <amw-textarea
    label="Inquiry Type"
    placeholder="What can we help you with?"
    appearance="outline"
    required
    rows="3">
  </amw-textarea>

  <amw-textarea
    label="Message"
    placeholder="Please provide details about your inquiry..."
    appearance="outline"
    required
    minlength="20"
    rows="6">
  </amw-textarea>

  <amw-textarea
    label="Additional Information"
    placeholder="Any additional information that might be helpful..."
    appearance="outline"
    maxlength="500"
    rows="4">
  </amw-textarea>

  <amw-button variant="elevated" color="primary" type="submit">
    Send Message
  </amw-button>
</form>`
  };

  constructor() {
    super();
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
}
