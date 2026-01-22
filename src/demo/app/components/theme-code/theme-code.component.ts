import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwIconComponent, AmwCardComponent } from '../../../../library/src/components/components';

@Component({
  selector: 'amw-demo-theme-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AmwCodeDocComponent,
    AmwButtonComponent,
    AmwIconComponent,
    AmwCardComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './theme-code.component.html',
  styleUrl: './theme-code.component.scss'
})
export class ThemeCodeComponent implements OnInit {
  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'colorPalette',
      title: 'Color Palette Usage',
      description: 'Using built-in theme colors',
      code: `<!-- Using Material theme colors -->
<amw-button appearance="elevated" color="primary">Primary</amw-button>
<amw-button appearance="elevated" color="accent">Accent</amw-button>
<amw-button appearance="elevated" color="warn">Warn</amw-button>`
    },
    {
      key: 'cssVariables',
      title: 'CSS Variables',
      description: 'Using Material Design 3 CSS variables',
      code: `<!-- Using CSS variables in components -->
<div style="
  background-color: var(--mdc-theme-primary);
  color: var(--mdc-theme-on-primary);
  padding: 16px;
  border-radius: 8px;">
  Themed Container
</div>`
    },
    {
      key: 'componentTheming',
      title: 'Component Theming',
      description: 'Applying themes to Material components',
      code: `<!-- Component-specific theming -->
<amw-card headerTitle="Themed Card">
  <ng-template #cardContent>
    Content styled with theme colors
  </ng-template>
  <ng-template #cardActions>
    <amw-button appearance="text" color="primary">Action</amw-button>
  </ng-template>
</amw-card>`
    },
    {
      key: 'darkMode',
      title: 'Dark Mode',
      description: 'Implementing dark theme support',
      code: `<!-- Dark mode implementation -->
<div class="dark-theme">
  <amw-card headerTitle="Dark Theme Card">
    <ng-template #cardContent>
      This content adapts to dark theme
    </ng-template>
  </amw-card>
</div>`
    },
    {
      key: 'customTheme',
      title: 'Custom Theme',
      description: 'Creating custom theme overrides',
      code: `<!-- Custom theme example -->
<style>
  .custom-theme {
    --mdc-theme-primary: #ff5722;
    --mdc-theme-on-primary: #ffffff;
  }
</style>
<div class="custom-theme">
  <amw-button appearance="elevated" color="primary">
    Custom Primary Color
  </amw-button>
</div>`
    }
  ];

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
  }
}
