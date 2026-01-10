import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BaseCodeComponent } from '../base/base-code.component';

type ButtonExamples = 'basic' | 'raised' | 'stroked' | 'flat' | 'icon' | 'fab' | 'disabled';
import { MatExpansionModule } from '@angular/material/expansion';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
@Component({
  selector: 'amw-demo-button-code',
  standalone: true,
  imports: [FormsModule,
    MatIconModule,
    MatExpansionModule,
    AmwButtonComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './button-code.component.html',
  styleUrl: './button-code.component.scss'
})
export class ButtonCodeComponent extends BaseCodeComponent<ButtonExamples> {
  // State for live preview examples
  isLoading = false;
  clickCount = 0;

  // Original code examples (for reset functionality)
  readonly codeExamples: Record<ButtonExamples, string> = {
    basic: `<amw-button variant="text" color="primary">Basic Button</amw-button>
<amw-button variant="text" color="accent">Accent Button</amw-button>
<amw-button variant="text" color="warn">Warn Button</amw-button>`,

    raised: `<amw-button variant="elevated" color="primary">Raised Button</amw-button>
<amw-button variant="elevated" color="accent">Accent Raised</amw-button>
<amw-button variant="elevated" color="warn">Warn Raised</amw-button>`,

    stroked: `<amw-button variant="outlined" color="primary">Stroked Button</amw-button>
<amw-button variant="outlined" color="accent">Accent Stroked</amw-button>
<amw-button variant="outlined" color="warn">Warn Stroked</amw-button>`,

    flat: `<amw-button variant="filled" color="primary">Flat Button</amw-button>
<amw-button variant="filled" color="accent">Accent Flat</amw-button>
<amw-button variant="filled" color="warn">Warn Flat</amw-button>`,

    icon: `<amw-button variant="icon" icon="favorite" color="primary"></amw-button>
<amw-button variant="icon" icon="delete" color="accent"></amw-button>
<amw-button variant="icon" icon="warning" color="warn"></amw-button>`,

    fab: `<amw-button variant="fab" icon="add" color="primary"></amw-button>
<amw-button variant="fab" icon="edit" color="accent" size="small"></amw-button>
<amw-button variant="fab" icon="delete" color="warn" size="small"></amw-button>`,

    disabled: `<amw-button variant="elevated" color="primary" disabled>Disabled Button</amw-button>
<amw-button variant="elevated" color="accent" [disabled]="true">Disabled Accent</amw-button>`
  };

  constructor() {
    super();
  }

  // Event handlers for examples
  onButtonClick() {
    this.clickCount++;
    console.log('Button clicked! Count:', this.clickCount);
  }

  toggleLoading() {
    this.isLoading = !this.isLoading;
  }
}

