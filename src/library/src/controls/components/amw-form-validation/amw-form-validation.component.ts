import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AmwButtonComponent } from '../amw-button/amw-button.component';
import {
  FormValidationConfig,
  FormValidationError,
  FormValidationDisplayMode,
  FormValidationSeverity
} from './interfaces';

/**
 * Form-level validation component for Angular Material Wrap
 *
 * @description
 * Provides form-level and cross-field validation error display with multiple modes.
 * Eliminates the need for manual mat-error elements and provides consistent validation UX.
 *
 * @example
 * ```typescript
 * // Component
 * myForm = this.fb.group({
 *   password: ['', Validators.required],
 *   confirmPassword: ['', Validators.required]
 * }, {
 *   validators: [this.passwordMatchValidator]
 * });
 *
 * formValidationConfig: FormValidationConfig = {
 *   passwordMismatch: {
 *     message: 'Passwords do not match.',
 *     severity: 'error',
 *     affectedFields: ['password', 'confirmPassword']
 *   }
 * };
 *
 * // Template
 * <amw-form-validation
 *   [form]="myForm"
 *   [errors]="formValidationConfig"
 *   displayMode="summary">
 * </amw-form-validation>
 * ```
 */
@Component({
  selector: 'amw-form-validation',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    AmwButtonComponent
  ],
  templateUrl: './amw-form-validation.component.html',
  styleUrl: './amw-form-validation.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AmwFormValidationComponent implements OnInit, OnDestroy {
  /**
   * The FormGroup to validate
   *
   * @required
   */
  @Input() form!: FormGroup;

  /**
   * Error configuration mapping error keys to error definitions
   *
   * @description
   * Maps error keys from form validators to their display configuration.
   * Error keys should match the keys returned by form-level validators.
   *
   * @default {}
   */
  @Input() errors: FormValidationConfig = {};

  /**
   * How to display validation errors
   *
   * @description
   * - `summary`: Display all errors in a summary card
   * - `inline`: Display errors inline near affected fields
   * - `floating`: Display errors in a floating toast notification
   * - `all`: Display errors in all modes
   *
   * @default 'summary'
   */
  @Input() displayMode: FormValidationDisplayMode = 'summary';

  /**
   * Where to position the error display
   *
   * @description
   * - `top`: Position errors at the top of the form
   * - `bottom`: Position errors at the bottom of the form
   * - `inline`: Position errors inline (used with inline display mode)
   *
   * @default 'bottom'
   */
  @Input() position: 'top' | 'bottom' | 'inline' = 'bottom';

  /**
   * When to show validation errors
   *
   * @description
   * - `touched`: Show errors after form has been touched
   * - `dirty`: Show errors after form has been modified
   * - `always`: Always show errors
   *
   * @default 'touched'
   */
  @Input() showWhen: 'touched' | 'dirty' | 'always' = 'touched';

  /**
   * Visual appearance of error summary
   *
   * @description
   * - `standard`: Standard flat appearance
   * - `elevated`: Elevated card with shadow
   * - `flat`: Minimal flat appearance
   *
   * @default 'standard'
   */
  @Input() appearance: 'standard' | 'elevated' | 'flat' = 'standard';

  /**
   * Maximum number of errors to display
   *
   * @description
   * Limits the number of visible errors. Useful for forms with many validation rules.
   * If not specified, all errors will be shown.
   */
  @Input() maxErrors?: number;

  /**
   * Whether the error summary can be collapsed
   *
   * @default false
   */
  @Input() collapsible = false;

  /**
   * Initial collapsed state of error summary
   *
   * @description
   * Only applies when collapsible is true.
   *
   * @default false
   */
  @Input() collapsed = false;

  /**
   * Whether to show severity icons next to errors
   *
   * @default true
   */
  @Input() showSeverityIcon = true;

  /**
   * Additional CSS class for custom styling
   *
   * @default ''
   */
  @Input() customClass = '';

  /**
   * ARIA live region politeness setting
   *
   * @description
   * - `polite`: Announces changes when convenient
   * - `assertive`: Announces changes immediately
   *
   * @default 'polite'
   */
  @Input() ariaLive: 'polite' | 'assertive' = 'polite';

  /**
   * ARIA label for the error container
   *
   * @default 'Form validation errors'
   */
  @Input() ariaLabel = 'Form validation errors';

  /**
   * Emits when visible errors change
   *
   * @description
   * Emits the current array of visible errors whenever they change.
   */
  @Output() errorChange = new EventEmitter<FormValidationError[]>();

  /**
   * Emits when an error is clicked
   *
   * @description
   * Emits the clicked error object. Can be used to implement custom
   * navigation or handling logic.
   */
  @Output() errorClick = new EventEmitter<FormValidationError>();

  /**
   * Currently visible errors
   */
  visibleErrors: FormValidationError[] = [];

  /**
   * Subject for cleaning up subscriptions
   */
  private destroy$ = new Subject<void>();

  /**
   * Initializes the component and sets up form subscriptions
   */
  ngOnInit(): void {
    if (!this.form) {
      console.error('AmwFormValidationComponent: form input is required');
      return;
    }

    // Subscribe to form status changes
    this.form.statusChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.updateVisibleErrors());

    // Subscribe to form value changes
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.updateVisibleErrors());

    // Initial evaluation
    this.updateVisibleErrors();
  }

  /**
   * Cleans up subscriptions when component is destroyed
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Updates the list of visible errors based on form state and configuration
   *
   * @private
   */
  private updateVisibleErrors(): void {
    const errors: FormValidationError[] = [];

    // Check if we should show errors based on form state
    if (!this.shouldShowErrors()) {
      this.visibleErrors = [];
      this.errorChange.emit([]);
      return;
    }

    // Evaluate each configured error
    Object.keys(this.errors).forEach(errorKey => {
      const errorConfig = this.errors[errorKey];

      // Check if form has this error
      const hasError = this.form.hasError(errorKey);

      // Check custom showWhen condition
      const shouldShow = errorConfig.showWhen
        ? errorConfig.showWhen(this.form)
        : hasError;

      if (shouldShow && hasError) {
        errors.push({
          ...errorConfig,
          key: errorKey
        });
      }
    });

    // Limit number of errors if specified
    this.visibleErrors = this.maxErrors
      ? errors.slice(0, this.maxErrors)
      : errors;

    this.errorChange.emit(this.visibleErrors);
  }

  /**
   * Determines if errors should be displayed based on form state and showWhen setting
   *
   * @private
   * @returns True if errors should be shown
   */
  private shouldShowErrors(): boolean {
    switch (this.showWhen) {
      case 'always':
        return true;
      case 'dirty':
        return this.form.dirty;
      case 'touched':
        return this.form.touched;
      default:
        return false;
    }
  }

  /**
   * Resolves the error message (handles both string and function)
   *
   * @param error The error configuration
   * @returns The error message string
   */
  getErrorMessage(error: FormValidationError): string {
    return typeof error.message === 'function'
      ? error.message(this.form)
      : error.message;
  }

  /**
   * Gets the Material icon name for a severity level
   *
   * @param severity The error severity
   * @returns The icon name
   */
  getSeverityIcon(severity?: FormValidationSeverity): string {
    switch (severity) {
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'error';
    }
  }

  /**
   * Handles error click events
   *
   * @param error The clicked error
   */
  onErrorClick(error: FormValidationError): void {
    this.errorClick.emit(error);

    // Focus first affected field if available
    if (error.affectedFields && error.affectedFields.length > 0) {
      this.focusField(error.affectedFields[0]);
    }
  }

  /**
   * Focuses a form field in the DOM
   *
   * @private
   * @param fieldName The form control name to focus
   */
  private focusField(fieldName: string): void {
    // Try multiple selectors to find the field
    const selectors = [
      `[formcontrolname="${fieldName}"]`,
      `[formControlName="${fieldName}"]`,
      `[name="${fieldName}"]`,
      `#${fieldName}`
    ];

    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element && element instanceof HTMLElement) {
        element.focus();
        // Scroll into view if needed
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }
  }

  /**
   * Toggles the collapsed state of the error summary
   */
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }

  /**
   * Checks if summary mode should be displayed
   *
   * @returns True if summary mode is active
   */
  get showSummary(): boolean {
    return this.displayMode === 'summary' || this.displayMode === 'all';
  }

  /**
   * Checks if inline mode should be displayed
   *
   * @returns True if inline mode is active
   */
  get showInline(): boolean {
    return this.displayMode === 'inline' || this.displayMode === 'all';
  }

  /**
   * Checks if floating mode should be displayed
   *
   * @returns True if floating mode is active
   */
  get showFloating(): boolean {
    return this.displayMode === 'floating' || this.displayMode === 'all';
  }
}
