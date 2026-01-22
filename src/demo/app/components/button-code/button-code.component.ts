import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

@Component({
  selector: 'amw-demo-button-code',
  standalone: true,
  imports: [
    FormsModule,
    AmwCodeDocComponent,
    AmwButtonComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './button-code.component.html',
  styleUrl: './button-code.component.scss'
})
export class ButtonCodeComponent implements OnInit {
  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Buttons',
      description: 'Simple text buttons with different colors',
      code: `<amw-button appearance="text" color="primary">Basic Button</amw-button>
<amw-button appearance="text" color="accent">Accent Button</amw-button>
<amw-button appearance="text" color="warn">Warn Button</amw-button>`
    },
    {
      key: 'raised',
      title: 'Raised Buttons',
      description: 'Elevated buttons with shadow',
      code: `<amw-button appearance="elevated" color="primary">Raised Button</amw-button>
<amw-button appearance="elevated" color="accent">Accent Raised</amw-button>
<amw-button appearance="elevated" color="warn">Warn Raised</amw-button>`
    },
    {
      key: 'stroked',
      title: 'Stroked Buttons',
      description: 'Outlined buttons with border',
      code: `<amw-button appearance="outlined" color="primary">Stroked Button</amw-button>
<amw-button appearance="outlined" color="accent">Accent Stroked</amw-button>
<amw-button appearance="outlined" color="warn">Warn Stroked</amw-button>`
    },
    {
      key: 'flat',
      title: 'Flat Buttons',
      description: 'Filled buttons without shadow',
      code: `<amw-button color="primary">Flat Button</amw-button>
<amw-button color="accent">Accent Flat</amw-button>
<amw-button color="warn">Warn Flat</amw-button>`
    },
    {
      key: 'icon',
      title: 'Icon Buttons',
      description: 'Circular buttons with icons',
      code: `<amw-button icon="favorite" color="primary"></amw-button>
<amw-button icon="delete" color="accent"></amw-button>
<amw-button icon="warning" color="warn"></amw-button>`
    },
    {
      key: 'fab',
      title: 'Floating Action Buttons (FAB)',
      description: 'Primary action buttons with elevated appearance',
      code: `<amw-button [fab]="true" icon="add" color="primary"></amw-button>
<amw-button fab="mini" icon="edit" color="accent"></amw-button>
<amw-button fab="mini" icon="delete" color="warn"></amw-button>`
    },
    {
      key: 'disabled',
      title: 'Disabled State',
      description: 'Buttons in disabled state',
      code: `<amw-button appearance="elevated" color="primary" disabled>Disabled Button</amw-button>
<amw-button appearance="elevated" color="accent" [disabled]="true">Disabled Accent</amw-button>`
    }
  ];

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
  }
}
