import { Component, ViewEncapsulation, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwDividerComponent } from '../../../../lib/amw-divider/amw-divider.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

@Component({
  selector: 'amw-demo-divider-validation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwDividerComponent,
    AmwButtonComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './divider-validation.component.html',
  styleUrl: './divider-validation.component.scss'
})
export class DividerValidationComponent extends BaseValidationComponent {
  isVertical = signal(false);
  isInset = signal(false);
  showDivider = signal(true);

  validationForm: FormGroup = this.fb.group({});

  validationInfo: ValidationInfo[] = [
    { title: 'Horizontal Dividers', description: 'Separate content sections vertically stacked' },
    { title: 'Vertical Dividers', description: 'Separate content arranged horizontally' },
    { title: 'Inset Dividers', description: 'Align with content that has leading icons or avatars' },
    { title: 'Visibility', description: 'Toggle divider visibility' }
  ];

  toggleVertical(): void {
    this.isVertical.update(v => !v);
  }

  toggleInset(): void {
    this.isInset.update(v => !v);
  }

  toggleVisibility(): void {
    this.showDivider.update(v => !v);
  }
}
