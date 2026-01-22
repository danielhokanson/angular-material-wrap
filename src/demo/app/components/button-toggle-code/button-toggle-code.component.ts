import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwButtonToggleComponent } from '../../../../library/src/controls/components/amw-button-toggle/amw-button-toggle.component';
import { AmwButtonToggleGroupComponent } from '../../../../library/src/controls/components/amw-button-toggle/amw-button-toggle-group.component';

@Component({
  selector: 'amw-demo-button-toggle-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AmwCodeDocComponent,
    AmwButtonToggleComponent,
    AmwButtonToggleGroupComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './button-toggle-code.component.html',
  styleUrl: './button-toggle-code.component.scss'
})
export class ButtonToggleCodeComponent implements OnInit {
  // State for live preview examples
  selectedView = 'list';
  selectedFormats: string[] = [];
  selectedOption = 'a';
  alignment = 'left';
  viewMode = 'list';
  lastChangeValue: any = null;

  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Button Toggle',
      description: 'Simple button toggle group with single selection',
      code: `<amw-button-toggle-group [(value)]="selectedView">
  <amw-button-toggle value="list">List</amw-button-toggle>
  <amw-button-toggle value="grid">Grid</amw-button-toggle>
  <amw-button-toggle value="table">Table</amw-button-toggle>
</amw-button-toggle-group>`
    },
    {
      key: 'multiple',
      title: 'Multiple Selection',
      description: 'Button toggle group allowing multiple selections',
      code: `<amw-button-toggle-group [(value)]="selectedFormats" [multiple]="true">
  <amw-button-toggle value="bold" icon="format_bold"></amw-button-toggle>
  <amw-button-toggle value="italic" icon="format_italic"></amw-button-toggle>
  <amw-button-toggle value="underline" icon="format_underlined"></amw-button-toggle>
</amw-button-toggle-group>

// Component property
selectedFormats: string[] = [];`
    },
    {
      key: 'vertical',
      title: 'Vertical Layout',
      description: 'Button toggle group with vertical orientation',
      code: `<amw-button-toggle-group [(value)]="selected" [vertical]="true">
  <amw-button-toggle value="a">Option A</amw-button-toggle>
  <amw-button-toggle value="b">Option B</amw-button-toggle>
  <amw-button-toggle value="c">Option C</amw-button-toggle>
</amw-button-toggle-group>`
    },
    {
      key: 'icons',
      title: 'Icons',
      description: 'Button toggles with icons only or icons with text',
      code: `<!-- Icon only -->
<amw-button-toggle-group [(value)]="alignment">
  <amw-button-toggle value="left" icon="format_align_left"></amw-button-toggle>
  <amw-button-toggle value="center" icon="format_align_center"></amw-button-toggle>
  <amw-button-toggle value="right" icon="format_align_right"></amw-button-toggle>
</amw-button-toggle-group>

<!-- Icon with text -->
<amw-button-toggle-group [(value)]="viewMode">
  <amw-button-toggle value="list" icon="view_list">List View</amw-button-toggle>
  <amw-button-toggle value="grid" icon="grid_view">Grid View</amw-button-toggle>
</amw-button-toggle-group>`
    },
    {
      key: 'appearance',
      title: 'Appearance Styles',
      description: 'Different visual appearance styles',
      code: `<!-- Standard appearance (default) -->
<amw-button-toggle-group appearance="standard" [(value)]="selected">
  <amw-button-toggle value="a">Option A</amw-button-toggle>
  <amw-button-toggle value="b">Option B</amw-button-toggle>
</amw-button-toggle-group>

<!-- Legacy appearance -->
<amw-button-toggle-group appearance="legacy" [(value)]="selected">
  <amw-button-toggle value="a">Option A</amw-button-toggle>
  <amw-button-toggle value="b">Option B</amw-button-toggle>
</amw-button-toggle-group>`
    },
    {
      key: 'events',
      title: 'Events',
      description: 'Handling value change events',
      code: `<amw-button-toggle-group
  [(value)]="selected"
  (valueChange)="onValueChange($event)">
  <amw-button-toggle value="option1">Option 1</amw-button-toggle>
  <amw-button-toggle value="option2">Option 2</amw-button-toggle>
</amw-button-toggle-group>

// Component method
onValueChange(value: any): void {
  console.log('Selection changed:', value);
}`
    }
  ];

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
  }

  onValueChange(value: any): void {
    this.lastChangeValue = value;
    console.log('Selection changed:', value);
  }
}
