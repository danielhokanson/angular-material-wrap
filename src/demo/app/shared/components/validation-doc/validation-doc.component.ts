import { Component, Input, ViewEncapsulation, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AmwButtonComponent } from '../../../../../library/src/controls/components/amw-button/amw-button.component';

/**
 * Represents a validation info item for display
 */
export interface ValidationInfo {
  /** Title/label for the validation rule */
  title: string;
  /** Description of what the rule does */
  description: string;
}

/**
 * Shared component for Validation tab display
 * Provides consistent form layout with validation info
 *
 * Usage:
 * ```html
 * <amw-validation-doc
 *   componentName="amw-input"
 *   [validationForm]="validationForm"
 *   [validationInfo]="validationInfo"
 *   (formSubmit)="onSubmit()"
 *   (formReset)="resetForm()">
 *
 *   <ng-template #formContent>
 *     <!-- Your form fields here -->
 *   </ng-template>
 * </amw-validation-doc>
 * ```
 */
@Component({
  selector: 'amw-validation-doc',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AmwButtonComponent
  ],
  templateUrl: './validation-doc.component.html',
  styleUrl: './validation-doc.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AmwValidationDocComponent {
  /** Component name for the header */
  @Input() componentName = '';

  /** Description text for the validation section */
  @Input() description = '';

  /** The reactive form group */
  @Input() validationForm!: FormGroup;

  /** List of validation rules to display */
  @Input() validationInfo: ValidationInfo[] = [];

  /** Template for form content */
  @ContentChild('formContent') formContentTemplate?: TemplateRef<unknown>;

  /** Computed description with fallback */
  get computedDescription(): string {
    if (this.description) return this.description;
    return `This form demonstrates various validation patterns using the ${this.componentName} component.`;
  }

  /** Check if form is valid */
  get isFormValid(): boolean {
    return this.validationForm?.valid ?? false;
  }

  /** Check if form is invalid */
  get isFormInvalid(): boolean {
    return this.validationForm?.invalid ?? true;
  }
}
