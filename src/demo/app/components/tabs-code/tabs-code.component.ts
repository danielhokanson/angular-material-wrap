import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { BaseCodeComponent } from '../base/base-code.component';

type TabsExamples = 'basic' | 'icons' | 'lazy' | 'dynamic' | 'styled';

@Component({
  selector: 'amw-demo-tabs-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule
  ],
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
    basic: `<mat-tab-group>
  <mat-tab label="First">Content 1</mat-tab>
  <mat-tab label="Second">Content 2</mat-tab>
  <mat-tab label="Third">Content 3</mat-tab>
</mat-tab-group>`,

    icons: `<mat-tab-group>
  <mat-tab>
    <ng-template mat-tab-label>
      <mat-icon>home</mat-icon>
      Home
    </ng-template>
    Home content
  </mat-tab>
  <mat-tab>
    <ng-template mat-tab-label>
      <mat-icon>person</mat-icon>
      Profile
    </ng-template>
    Profile content
  </mat-tab>
  <mat-tab>
    <ng-template mat-tab-label>
      <mat-icon>settings</mat-icon>
      Settings
    </ng-template>
    Settings content
  </mat-tab>
</mat-tab-group>`,

    lazy: `<mat-tab-group>
  <mat-tab label="Eager">
    This content is loaded immediately
  </mat-tab>
  <mat-tab label="Lazy">
    <ng-template matTabContent>
      This content is lazy loaded
    </ng-template>
  </mat-tab>
</mat-tab-group>`,

    dynamic: `<mat-tab-group [(selectedIndex)]="selectedIndex">
  @for (tab of tabs; track tab) {
    <mat-tab [label]="tab.label">
      {{ tab.content }}
    </mat-tab>
  }
</mat-tab-group>`,

    styled: `<mat-tab-group color="accent" backgroundColor="primary">
  <mat-tab label="Primary Tab">
    Content with custom colors
  </mat-tab>
  <mat-tab label="Accent Tab">
    More content
  </mat-tab>
  <mat-tab label="Disabled" [disabled]="true">
    Disabled content
  </mat-tab>
</mat-tab-group>`
  };

  constructor() {
    super();
  }
}
