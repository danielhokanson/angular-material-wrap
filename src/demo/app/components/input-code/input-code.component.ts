import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwTextareaComponent } from '../../../../library/src/controls/components/amw-textarea/amw-textarea.component';

@Component({
  selector: 'amw-demo-input-code',
  standalone: true,
  imports: [
    FormsModule,
    AmwCodeDocComponent,
    AmwInputComponent,
    AmwTextareaComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './input-code.component.html',
  styleUrl: './input-code.component.scss'
})
export class InputCodeComponent implements OnInit {
  // State for live preview examples
  basicValue = '';
  emailValue = '';
  disabledValue = 'This field is disabled';
  readonlyValue = 'This field is readonly';

  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Input',
      description: 'Simple input with label and placeholder',
      code: `<amw-input
  label="Basic Input"
  placeholder="Enter text">
</amw-input>`
    },
    {
      key: 'withLabel',
      title: 'Input Appearances',
      description: 'Different visual styles for inputs',
      code: `<amw-input
  label="Fill Appearance"
  placeholder="Placeholder text"
  appearance="fill">
</amw-input>

<amw-input
  label="Outline Appearance"
  placeholder="Placeholder text"
  appearance="outline">
</amw-input>`
    },
    {
      key: 'withHint',
      title: 'Input with Hint',
      description: 'Display helpful hint text below input',
      code: `<amw-input
  label="Username"
  placeholder="Enter username"
  hint="Choose a unique username">
</amw-input>`
    },
    {
      key: 'withError',
      title: 'Input with Error',
      description: 'Display error messages for validation',
      code: `<amw-input
  label="Email"
  type="email"
  placeholder="email@example.com"
  required>
</amw-input>`
    },
    {
      key: 'withIcon',
      title: 'Input with Icons/Affixes',
      description: 'Add prefix and suffix content',
      code: `<amw-input
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
</amw-input>`
    },
    {
      key: 'disabled',
      title: 'Disabled and Readonly States',
      description: 'Non-editable input variants',
      code: `<amw-input
  label="Disabled Input"
  disabled
  value="Cannot edit this">
</amw-input>

<amw-input
  label="Readonly Input"
  readonly
  value="This is readonly">
</amw-input>`
    },
    {
      key: 'textarea',
      title: 'Textarea',
      description: 'Multi-line text input',
      code: `<amw-textarea
  label="Description"
  rows="4"
  placeholder="Enter description">
</amw-textarea>`
    }
  ];

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
  }
}
