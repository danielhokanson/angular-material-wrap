import { Component, ViewEncapsulation } from '@angular/core';
import { BaseCodeComponent } from '../base/base-code.component';

type IconButtonCodeExamples = 'basic' | 'colors' | 'sizes' | 'loading' | 'disabled';

@Component({
    selector: 'amw-demo-icon-button-code',
    standalone: true,
    imports: [],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './icon-button-code.component.html',
    styleUrl: './icon-button-code.component.scss'
})
export class IconButtonCodeComponent extends BaseCodeComponent<IconButtonCodeExamples> {
    readonly codeExamples: Record<IconButtonCodeExamples, string> = {
        basic: `<amw-icon-button
  icon="settings"
  ariaLabel="Settings"
  (buttonClick)="onSettingsClick()">
</amw-icon-button>`,

        colors: `<!-- Primary -->
<amw-icon-button icon="favorite" ariaLabel="Favorite" color="primary"></amw-icon-button>

<!-- Accent -->
<amw-icon-button icon="star" ariaLabel="Star" color="accent"></amw-icon-button>

<!-- Warn -->
<amw-icon-button icon="delete" ariaLabel="Delete" color="warn"></amw-icon-button>`,

        sizes: `<!-- Small (32px) -->
<amw-icon-button icon="menu" ariaLabel="Menu" size="sm"></amw-icon-button>

<!-- Medium (40px) - default -->
<amw-icon-button icon="menu" ariaLabel="Menu" size="md"></amw-icon-button>

<!-- Large (48px) -->
<amw-icon-button icon="menu" ariaLabel="Menu" size="lg"></amw-icon-button>`,

        loading: `<amw-icon-button
  icon="refresh"
  ariaLabel="Refresh"
  [loading]="isLoading"
  (buttonClick)="refresh()">
</amw-icon-button>`,

        disabled: `<amw-icon-button
  icon="edit"
  ariaLabel="Edit"
  [disabled]="!canEdit">
</amw-icon-button>`
    };

    constructor() {
        super();
    }
}
