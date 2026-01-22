import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwIconButtonComponent } from '../../../../library/src/controls/components/amw-icon-button/amw-icon-button.component';
import { AmwIconComponent } from '../../../../library/src/components/components';

@Component({
  selector: 'amw-demo-icon-button-code',
  standalone: true,
  imports: [
    AmwCodeDocComponent,
    AmwIconButtonComponent,
    AmwIconComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './icon-button-code.component.html',
  styleUrl: './icon-button-code.component.scss'
})
export class IconButtonCodeComponent implements OnInit {
  // State for preview
  isLoading = false;

  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Icon Button',
      description: 'Simple icon button with click handler',
      code: `<amw-icon-button
  icon="settings"
  ariaLabel="Settings"
  (buttonClick)="onSettingsClick()">
</amw-icon-button>`
    },
    {
      key: 'colors',
      title: 'Colors',
      description: 'Icon buttons with different colors',
      code: `<!-- Primary -->
<amw-icon-button icon="favorite" ariaLabel="Favorite" color="primary"></amw-icon-button>

<!-- Accent -->
<amw-icon-button icon="star" ariaLabel="Star" color="accent"></amw-icon-button>

<!-- Warn -->
<amw-icon-button icon="delete" ariaLabel="Delete" color="warn"></amw-icon-button>`
    },
    {
      key: 'sizes',
      title: 'Sizes',
      description: 'Icon buttons in different sizes',
      code: `<!-- Small (32px) -->
<amw-icon-button icon="menu" ariaLabel="Menu" size="sm"></amw-icon-button>

<!-- Medium (40px) - default -->
<amw-icon-button icon="menu" ariaLabel="Menu" size="md"></amw-icon-button>

<!-- Large (48px) -->
<amw-icon-button icon="menu" ariaLabel="Menu" size="lg"></amw-icon-button>`
    },
    {
      key: 'loading',
      title: 'Loading State',
      description: 'Icon button with loading indicator',
      code: `<amw-icon-button
  icon="refresh"
  ariaLabel="Refresh"
  [loading]="isLoading"
  (buttonClick)="refresh()">
</amw-icon-button>`
    },
    {
      key: 'disabled',
      title: 'Disabled State',
      description: 'Non-interactive icon button',
      code: `<amw-icon-button
  icon="edit"
  ariaLabel="Edit"
  [disabled]="!canEdit">
</amw-icon-button>`
    }
  ];

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
  }

  onSettingsClick(): void {
    console.log('Settings clicked');
  }

  refresh(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
