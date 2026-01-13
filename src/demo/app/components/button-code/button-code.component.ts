import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseCodeComponent } from '../base/base-code.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwIconComponent } from '../../../../library/src/components/components';

type ButtonExamples = 'basic' | 'raised' | 'stroked' | 'flat' | 'icon' | 'fab' | 'disabled';

@Component({
  selector: 'amw-demo-button-code',
  standalone: true,
  imports: [
    FormsModule,
    AmwButtonComponent,
    AmwAccordionComponent,
    AmwAccordionPanelComponent,
    AmwIconComponent
  ],
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
    basic: `<amw-button appearance="text" color="primary">Basic Button</amw-button>
<amw-button appearance="text" color="accent">Accent Button</amw-button>
<amw-button appearance="text" color="warn">Warn Button</amw-button>`,

    raised: `<amw-button appearance="elevated" color="primary">Raised Button</amw-button>
<amw-button appearance="elevated" color="accent">Accent Raised</amw-button>
<amw-button appearance="elevated" color="warn">Warn Raised</amw-button>`,

    stroked: `<amw-button appearance="outlined" color="primary">Stroked Button</amw-button>
<amw-button appearance="outlined" color="accent">Accent Stroked</amw-button>
<amw-button appearance="outlined" color="warn">Warn Stroked</amw-button>`,

    flat: `<amw-button color="primary">Flat Button</amw-button>
<amw-button color="accent">Accent Flat</amw-button>
<amw-button color="warn">Warn Flat</amw-button>`,

    icon: `<amw-button icon="favorite" color="primary"></amw-button>
<amw-button icon="delete" color="accent"></amw-button>
<amw-button icon="warning" color="warn"></amw-button>`,

    fab: `<amw-button [fab]="true" icon="add" color="primary"></amw-button>
<amw-button fab="mini" icon="edit" color="accent"></amw-button>
<amw-button fab="mini" icon="delete" color="warn"></amw-button>`,

    disabled: `<amw-button appearance="elevated" color="primary" disabled>Disabled Button</amw-button>
<amw-button appearance="elevated" color="accent" [disabled]="true">Disabled Accent</amw-button>`
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

