import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseCodeComponent } from '../base/base-code.component';

type ThemeExamples = 'colorPalette' | 'cssVariables' | 'componentTheming' | 'darkMode' | 'customTheme';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwIconComponent, AmwCardComponent } from '../../../../library/src/components/components';
@Component({
  selector: 'amw-demo-theme-code',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    AmwButtonComponent,
    AmwAccordionComponent,
    AmwAccordionPanelComponent,
    AmwIconComponent,
    AmwCardComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './theme-code.component.html',
  styleUrl: './theme-code.component.scss'
})
export class ThemeCodeComponent extends BaseCodeComponent<ThemeExamples> {
  readonly codeExamples: Record<ThemeExamples, string> = {
    colorPalette: `<!-- Using Material theme colors -->
<amw-button variant="elevated" color="primary">Primary</amw-button>
<amw-button variant="elevated" color="accent">Accent</amw-button>
<amw-button variant="elevated" color="warn">Warn</amw-button>`,

    cssVariables: `<!-- Using CSS variables in components -->
<div style="
  background-color: var(--mdc-theme-primary);
  color: var(--mdc-theme-on-primary);
  padding: 16px;
  border-radius: 8px;">
  Themed Container
</div>`,

    componentTheming: `<!-- Component-specific theming -->
<amw-card headerTitle="Themed Card">
  <ng-template #cardContent>
    Content styled with theme colors
  </ng-template>
  <ng-template #cardActions>
    <amw-button variant="text" color="primary">Action</amw-button>
  </ng-template>
</amw-card>`,

    darkMode: `<!-- Dark mode implementation -->
<div class="dark-theme">
  <amw-card headerTitle="Dark Theme Card">
    <ng-template #cardContent>
      This content adapts to dark theme
    </ng-template>
  </amw-card>
</div>`,

    customTheme: `<!-- Custom theme example -->
<style>
  .custom-theme {
    --mdc-theme-primary: #ff5722;
    --mdc-theme-on-primary: #ffffff;
  }
</style>
<div class="custom-theme">
  <amw-button variant="elevated" color="primary">
    Custom Primary Color
  </amw-button>
</div>`
  };

  constructor() {
    super();
  }
}
