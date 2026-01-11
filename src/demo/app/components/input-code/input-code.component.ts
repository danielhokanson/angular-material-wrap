import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseCodeComponent } from '../base/base-code.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwTextareaComponent } from '../../../../library/src/controls/components/amw-textarea/amw-textarea.component';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwIconComponent } from '../../../../library/src/components/components';

type InputExamples = 'basic' | 'withLabel' | 'withHint' | 'withError' | 'withIcon' | 'disabled' | 'textarea';

@Component({
  selector: 'amw-demo-input-code',
  standalone: true,
  imports: [
    FormsModule,
    AmwButtonComponent,
    AmwInputComponent,
    AmwTextareaComponent,
    AmwAccordionComponent,
    AmwAccordionPanelComponent,
    AmwIconComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './input-code.component.html',
  styleUrl: './input-code.component.scss'
})
export class InputCodeComponent extends BaseCodeComponent<InputExamples> {
  // State for live preview examples
  basicValue = '';
  emailValue = '';
  disabledValue = 'This field is disabled';
  readonlyValue = 'This field is readonly';

  // Original code examples (for reset functionality)
  readonly codeExamples: Record<InputExamples, string> = {
    basic: `<amw-input
  label="Basic Input"
  placeholder="Enter text">
</amw-input>`,

    withLabel: `<amw-input
  label="Fill Appearance"
  placeholder="Placeholder text"
  appearance="fill">
</amw-input>

<amw-input
  label="Outline Appearance"
  placeholder="Placeholder text"
  appearance="outline">
</amw-input>`,

    withHint: `<amw-input
  label="Username"
  placeholder="Enter username"
  hint="Choose a unique username">
</amw-input>`,

    withError: `<amw-input
  label="Email"
  type="email"
  placeholder="email@example.com"
  required>
</amw-input>`,

    withIcon: `<amw-input
  label="Search"
  placeholder="Search..."
  prefix="search">
</amw-input>

<amw-input
  label="Amount"
  type="number"
  placeholder="0"
  prefix="$"
  suffix=".00">
</amw-input>`,

    disabled: `<amw-input
  label="Disabled Input"
  disabled
  value="Cannot edit this">
</amw-input>

<amw-input
  label="Readonly Input"
  readonly
  value="This is readonly">
</amw-input>`,

    textarea: `<amw-textarea
  label="Description"
  rows="4"
  placeholder="Enter description">
</amw-textarea>`
  };

  constructor() {
    super();
  }
}
