import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwButtonToggleComponent } from '../../../../library/src/controls/components/amw-button-toggle/amw-button-toggle.component';
import { AmwButtonToggleGroupComponent } from '../../../../library/src/controls/components/amw-button-toggle/amw-button-toggle-group.component';

@Component({
  selector: 'amw-demo-button-toggle-validation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwButtonToggleComponent,
    AmwButtonToggleGroupComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './button-toggle-validation.component.html',
  styleUrl: './button-toggle-validation.component.scss'
})
export class ButtonToggleValidationComponent extends BaseValidationComponent {
  disabledDemoValue: string | null = null;

  validationForm: FormGroup = this.fb.group({
    viewMode: ['', Validators.required],
    alignment: ['', Validators.required],
    textFormatting: [[], Validators.required]
  });

  validationInfo: ValidationInfo[] = [
    { title: 'View Mode', description: 'Must select one option' },
    { title: 'Alignment', description: 'Must select one option' },
    { title: 'Text Formatting', description: 'Must select at least one option' },
    { title: 'Disabled States', description: 'Individual toggles and groups can be disabled' }
  ];
}
