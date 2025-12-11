import { Component, ViewEncapsulation } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'amw-demo-theme-api',
  standalone: true,
  imports: [MatExpansionModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './theme-api.component.html',
  styleUrl: './theme-api.component.scss'
})
export class ThemeApiComponent {
  apiDocumentation = {
    inputs: [
      {
        name: 'color',
        type: 'ThemePalette',
        default: 'primary',
        description: 'Theme color palette to use for the component',
        options: ['primary', 'accent', 'warn']
      },
      {
        name: 'appearance',
        type: 'MatFormFieldAppearance',
        default: 'fill',
        description: 'Visual style of form fields',
        options: ['fill', 'outline']
      },
      {
        name: 'floatLabel',
        type: 'FloatLabelType',
        default: 'auto',
        description: 'Whether the label should float',
        options: ['always', 'never', 'auto']
      }
    ],
    outputs: [
      {
        name: 'themeChanged',
        type: 'EventEmitter<string>',
        description: 'Emitted when theme is changed'
      }
    ],
    methods: [
      {
        name: 'setTheme(theme: string)',
        returns: 'void',
        description: 'Applies a theme to the application'
      },
      {
        name: 'getTheme()',
        returns: 'string',
        description: 'Returns the current theme name'
      }
    ],
    cssVariables: [
      {
        name: '--mdc-theme-primary',
        type: 'color',
        default: '#6750a4',
        description: 'Primary brand color used throughout the app'
      },
      {
        name: '--mdc-theme-secondary',
        type: 'color',
        default: '#625b71',
        description: 'Secondary brand color for accents'
      },
      {
        name: '--mdc-theme-error',
        type: 'color',
        default: '#ba1a1a',
        description: 'Color for error states'
      },
      {
        name: '--mdc-theme-surface',
        type: 'color',
        default: '#fffbfe',
        description: 'Surface background color'
      },
      {
        name: '--mdc-theme-on-primary',
        type: 'color',
        default: '#ffffff',
        description: 'Text/icon color on primary backgrounds'
      },
      {
        name: '--mdc-theme-on-surface',
        type: 'color',
        default: '#1c1b1f',
        description: 'Text/icon color on surface backgrounds'
      }
    ]
  };
}
