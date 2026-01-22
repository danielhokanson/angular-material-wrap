import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwIconButtonComponent } from '../../../../library/src/controls/components/amw-icon-button/amw-icon-button.component';

@Component({
  selector: 'amw-demo-icon-button-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwIconButtonComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './icon-button-validation.component.html',
  styleUrl: './icon-button-validation.component.scss'
})
export class IconButtonValidationComponent extends BaseValidationComponent {
  isDisabled = signal(false);
  isLoading = signal(false);

  validationForm: FormGroup = this.fb.group({});

  validationInfo: ValidationInfo[] = [
    { title: 'Disabled State', description: 'Toggle button disabled state' },
    { title: 'Loading State', description: 'Toggle button loading state with auto-reset' },
    { title: 'Accessibility', description: 'ariaLabel is required for screen readers' }
  ];

  toggleDisabled(): void {
    this.isDisabled.update(v => !v);
  }

  toggleLoading(): void {
    this.isLoading.update(v => !v);
    if (this.isLoading()) {
      setTimeout(() => this.isLoading.set(false), 3000);
    }
  }

  onAction(): void {
    this.notification.info('Action', 'Icon button clicked', { duration: 2000 });
  }
}
