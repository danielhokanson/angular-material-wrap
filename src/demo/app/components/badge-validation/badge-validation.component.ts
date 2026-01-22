import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwBadgeDirective } from '../../../../library/src/directives/amw-badge/amw-badge.directive';
import { MatIconModule } from '@angular/material/icon';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';

@Component({
  selector: 'amw-demo-badge-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwBadgeDirective,
    MatIconModule,
    AmwInputComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './badge-validation.component.html',
  styleUrl: './badge-validation.component.scss'
})
export class BadgeValidationComponent extends BaseValidationComponent {
  isHidden = signal(false);
  dynamicCount = signal(5);

  validationForm: FormGroup = this.fb.group({
    badgeCount: [5, [Validators.required, Validators.min(0), Validators.max(999)]],
    badgeText: ['', [Validators.maxLength(10)]]
  });

  validationInfo: ValidationInfo[] = [
    { title: 'Hidden State', description: 'Toggle badge visibility' },
    { title: 'Dynamic Content', description: 'Control badge count with validation' },
    { title: 'Text Content', description: 'Use text labels like "New", "Hot"' },
    { title: 'Positions', description: 'Badge positioning options' }
  ];

  toggleHidden(): void {
    this.isHidden.update(v => !v);
  }

  incrementCount(): void {
    this.dynamicCount.update(v => v + 1);
    this.validationForm.patchValue({ badgeCount: this.dynamicCount() });
  }

  decrementCount(): void {
    this.dynamicCount.update(v => Math.max(0, v - 1));
    this.validationForm.patchValue({ badgeCount: this.dynamicCount() });
  }

  resetCount(): void {
    this.dynamicCount.set(0);
    this.validationForm.patchValue({ badgeCount: 0 });
  }
}
