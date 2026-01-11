import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseCodeComponent } from '../base/base-code.component';

type TabsExamples = 'basic' | 'icons' | 'lazy' | 'dynamic' | 'styled';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwIconComponent, AmwTabsComponent, AmwTabComponent } from '../../../../library/src/components/components';
@Component({
  selector: 'amw-demo-tabs-code',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    AmwButtonComponent,
    AmwAccordionComponent,
    AmwAccordionPanelComponent,
    AmwIconComponent,
    AmwTabsComponent,
    AmwTabComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './tabs-code.component.html',
  styleUrl: './tabs-code.component.scss'
})
export class TabsCodeComponent extends BaseCodeComponent<TabsExamples> {
  // Data for dynamic tabs example
  dynamicTabs = [
    { label: 'Tab 1', content: 'Content of tab 1' },
    { label: 'Tab 2', content: 'Content of tab 2' },
    { label: 'Tab 3', content: 'Content of tab 3' }
  ];
  selectedIndex = 0;

  readonly codeExamples: Record<TabsExamples, string> = {
    basic: `<amw-tabs>
  <amw-tab label="First">Content 1</amw-tab>
  <amw-tab label="Second">Content 2</amw-tab>
  <amw-tab label="Third">Content 3</amw-tab>
</amw-tabs>`,

    icons: `<amw-tabs>
  <amw-tab label="Home" icon="home">
    Home content
  </amw-tab>
  <amw-tab label="Profile" icon="person">
    Profile content
  </amw-tab>
  <amw-tab label="Settings" icon="settings">
    Settings content
  </amw-tab>
</amw-tabs>`,

    lazy: `<amw-tabs>
  <amw-tab label="Eager">
    This content is loaded immediately
  </amw-tab>
  <amw-tab label="Lazy">
    This content is lazy loaded
  </amw-tab>
</amw-tabs>`,

    dynamic: `<amw-tabs [(selectedIndex)]="selectedIndex">
  @for (tab of tabs; track tab) {
    <amw-tab [label]="tab.label">
      {{ tab.content }}
    </amw-tab>
  }
</amw-tabs>`,

    styled: `<amw-tabs color="accent">
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
  };

  constructor() {
    super();
  }
}
