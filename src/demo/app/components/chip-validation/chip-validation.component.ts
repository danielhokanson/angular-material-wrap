import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwChipComponent } from '../../../../library/src/controls/components/amw-chip/amw-chip.component';

@Component({
  selector: 'amw-demo-chip-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwChipComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './chip-validation.component.html',
  styleUrl: './chip-validation.component.scss'
})
export class ChipValidationComponent extends BaseValidationComponent {
  selected = signal(false);
  disabled = signal(false);

  validationForm: FormGroup = this.fb.group({});

  validationInfo: ValidationInfo[] = [
    { title: 'Selection State', description: 'Toggle chip selection state' },
    { title: 'Disabled State', description: 'Toggle chip disabled state' },
    { title: 'Required Label', description: 'The label input is required for all chips' }
  ];

  toggleSelected(): void {
    this.selected.update(v => !v);
  }

  toggleDisabled(): void {
    this.disabled.update(v => !v);
  }
}
