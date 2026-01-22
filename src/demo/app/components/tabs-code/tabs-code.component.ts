import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwIconComponent, AmwTabsComponent, AmwTabComponent } from '../../../../library/src/components/components';

@Component({
  selector: 'amw-demo-tabs-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AmwCodeDocComponent,
    AmwIconComponent,
    AmwTabsComponent,
    AmwTabComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './tabs-code.component.html',
  styleUrl: './tabs-code.component.scss'
})
export class TabsCodeComponent implements OnInit {
  // Data for dynamic tabs example
  dynamicTabs = [
    { label: 'Tab 1', content: 'Content of tab 1' },
    { label: 'Tab 2', content: 'Content of tab 2' },
    { label: 'Tab 3', content: 'Content of tab 3' }
  ];
  selectedIndex = 0;

  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Tabs',
      description: 'Simple tab group with text labels',
      code: `<amw-tabs>
  <amw-tab label="First">Content 1</amw-tab>
  <amw-tab label="Second">Content 2</amw-tab>
  <amw-tab label="Third">Content 3</amw-tab>
</amw-tabs>`
    },
    {
      key: 'icons',
      title: 'Tabs with Icons',
      description: 'Tab labels with icon and text',
      code: `<amw-tabs>
  <amw-tab label="Home" icon="home">
    Home content
  </amw-tab>
  <amw-tab label="Profile" icon="person">
    Profile content
  </amw-tab>
  <amw-tab label="Settings" icon="settings">
    Settings content
  </amw-tab>
</amw-tabs>`
    },
    {
      key: 'lazy',
      title: 'Lazy Loaded Tabs',
      description: 'Tab content loaded on demand',
      code: `<amw-tabs>
  <amw-tab label="Eager">
    This content is loaded immediately
  </amw-tab>
  <amw-tab label="Lazy">
    This content is lazy loaded
  </amw-tab>
</amw-tabs>`
    },
    {
      key: 'dynamic',
      title: 'Dynamic Tabs',
      description: 'Tabs generated from data array',
      code: `<amw-tabs [(selectedIndex)]="selectedIndex">
  @for (tab of tabs; track tab) {
    <amw-tab [label]="tab.label">
      {{ tab.content }}
    </amw-tab>
  }
</amw-tabs>`
    },
    {
      key: 'styled',
      title: 'Styled Tabs',
      description: 'Tabs with custom colors and disabled state',
      code: `<amw-tabs color="accent">
  <amw-tab label="Primary Tab">
    Content with custom colors
  </amw-tab>
  <amw-tab label="Accent Tab">
    More content
  </amw-tab>
  <amw-tab label="Disabled" [disabled]="true">
    Disabled content
  </amw-tab>
</amw-tabs>`
    }
  ];

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
  }
}
