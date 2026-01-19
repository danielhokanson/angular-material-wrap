import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseCodeComponent } from '../base/base-code.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwButtonToggleComponent } from '../../../../library/src/controls/components/amw-button-toggle/amw-button-toggle.component';
import { AmwButtonToggleGroupComponent } from '../../../../library/src/controls/components/amw-button-toggle/amw-button-toggle-group.component';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwIconComponent } from '../../../../library/src/components/components';

type ButtonToggleExamples = 'basic' | 'multiple' | 'vertical' | 'icons' | 'appearance' | 'events';

@Component({
  selector: 'amw-demo-button-toggle-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AmwButtonComponent,
    AmwButtonToggleComponent,
    AmwButtonToggleGroupComponent,
    AmwAccordionComponent,
    AmwAccordionPanelComponent,
    AmwIconComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './button-toggle-code.component.html',
  styleUrl: './button-toggle-code.component.scss'
})
export class ButtonToggleCodeComponent extends BaseCodeComponent<ButtonToggleExamples> {
  // State for live preview examples
  selectedView = 'list';
  selectedFormats: string[] = [];
  selectedOption = 'a';
  lastChangeValue: any = null;

  // Original code examples (for reset functionality)
  readonly codeExamples: Record<ButtonToggleExamples, string> = {
    basic: `<amw-button-toggle-group [(value)]="selectedView">
  <amw-button-toggle value="list">List</amw-button-toggle>
  <amw-button-toggle value="grid">Grid</amw-button-toggle>
  <amw-button-toggle value="table">Table</amw-button-toggle>
</amw-button-toggle-group>`,

    multiple: `<amw-button-toggle-group [(value)]="selectedFormats" [multiple]="true">
  <amw-button-toggle value="bold" icon="format_bold"></amw-button-toggle>
  <amw-button-toggle value="italic" icon="format_italic"></amw-button-toggle>
  <amw-button-toggle value="underline" icon="format_underlined"></amw-button-toggle>
</amw-button-toggle-group>

// Component property
selectedFormats: string[] = [];`,

    vertical: `<amw-button-toggle-group [(value)]="selected" [vertical]="true">
  <amw-button-toggle value="a">Option A</amw-button-toggle>
  <amw-button-toggle value="b">Option B</amw-button-toggle>
  <amw-button-toggle value="c">Option C</amw-button-toggle>
</amw-button-toggle-group>`,

    icons: `<!-- Icon only -->
<amw-button-toggle-group [(value)]="alignment">
  <amw-button-toggle value="left" icon="format_align_left"></amw-button-toggle>
  <amw-button-toggle value="center" icon="format_align_center"></amw-button-toggle>
  <amw-button-toggle value="right" icon="format_align_right"></amw-button-toggle>
</amw-button-toggle-group>

<!-- Icon with text -->
<amw-button-toggle-group [(value)]="viewMode">
  <amw-button-toggle value="list" icon="view_list">List View</amw-button-toggle>
  <amw-button-toggle value="grid" icon="grid_view">Grid View</amw-button-toggle>
</amw-button-toggle-group>`,

    appearance: `<!-- Standard appearance (default) -->
<amw-button-toggle-group appearance="standard" [(value)]="selected">
  <amw-button-toggle value="a">Option A</amw-button-toggle>
  <amw-button-toggle value="b">Option B</amw-button-toggle>
</amw-button-toggle-group>

<!-- Legacy appearance -->
<amw-button-toggle-group appearance="legacy" [(value)]="selected">
  <amw-button-toggle value="a">Option A</amw-button-toggle>
  <amw-button-toggle value="b">Option B</amw-button-toggle>
</amw-button-toggle-group>`,

    events: `<amw-button-toggle-group
  [(value)]="selected"
  (valueChange)="onValueChange($event)">
  <amw-button-toggle value="option1">Option 1</amw-button-toggle>
  <amw-button-toggle value="option2">Option 2</amw-button-toggle>
</amw-button-toggle-group>

// Component method
onValueChange(value: any): void {
  console.log('Selection changed:', value);
}`
  };

  alignment = 'left';
  viewMode = 'list';

  constructor() {
    super();
  }

  onValueChange(value: any): void {
    this.lastChangeValue = value;
    console.log('Selection changed:', value);
  }
}
