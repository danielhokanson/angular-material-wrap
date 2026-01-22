import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwIconComponent } from '../../../../library/src/components/components';
import { AmwPopoverComponent } from '../../../../library/src/components/components/amw-popover/amw-popover.component';

@Component({
  selector: 'app-popover-code',
  standalone: true,
  imports: [
    FormsModule,
    AmwCodeDocComponent,
    AmwButtonComponent,
    AmwIconComponent,
    AmwPopoverComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './popover-code.component.html',
  styleUrl: './popover-code.component.scss'
})
export class PopoverCodeComponent implements OnInit {
  // State for interactive example
  tooltipDisabled = false;

  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Popover',
      description: 'Simple popover with click trigger',
      code: `<amw-popover [config]="{ position: 'bottom', showArrow: true }">
  <ng-template #trigger>
    <amw-button appearance="elevated">Hover Me</amw-button>
  </ng-template>
  <ng-template #content>
    <p>This is a basic popover</p>
  </ng-template>
</amw-popover>`
    },
    {
      key: 'positions',
      title: 'Popover Positions',
      description: 'Popovers in different positions',
      code: `<!-- Popover on top -->
<amw-popover [config]="{ position: 'top', showArrow: true }">
  <ng-template #trigger>
    <amw-button appearance="text">Top</amw-button>
  </ng-template>
  <ng-template #content>
    <p>Popover on top</p>
  </ng-template>
</amw-popover>

<!-- Popover on right -->
<amw-popover [config]="{ position: 'right', showArrow: true }">
  <ng-template #trigger>
    <amw-button appearance="text">Right</amw-button>
  </ng-template>
  <ng-template #content>
    <p>Popover on right</p>
  </ng-template>
</amw-popover>

<!-- Popover on bottom -->
<amw-popover [config]="{ position: 'bottom', showArrow: true }">
  <ng-template #trigger>
    <amw-button appearance="text">Bottom</amw-button>
  </ng-template>
  <ng-template #content>
    <p>Popover on bottom</p>
  </ng-template>
</amw-popover>

<!-- Popover on left -->
<amw-popover [config]="{ position: 'left', showArrow: true }">
  <ng-template #trigger>
    <amw-button appearance="text">Left</amw-button>
  </ng-template>
  <ng-template #content>
    <p>Popover on left</p>
  </ng-template>
</amw-popover>`
    },
    {
      key: 'styling',
      title: 'Custom Styling',
      description: 'Popover with custom styling',
      code: `<amw-popover [config]="{ position: 'bottom', showArrow: true, size: 'large' }">
  <ng-template #trigger>
    <amw-button appearance="elevated" color="primary">Custom Popover</amw-button>
  </ng-template>
  <ng-template #content>
    <p>Custom styled popover content</p>
  </ng-template>
</amw-popover>`
    },
    {
      key: 'interactive',
      title: 'Interactive Popover',
      description: 'Popover with interactive controls',
      code: `<amw-popover
  [config]="{ position: 'bottom', showArrow: true, showClose: true, disabled: popoverDisabled }">
  <ng-template #trigger>
    <amw-button appearance="elevated" (click)="togglePopover()">Toggle Popover</amw-button>
  </ng-template>
  <ng-template #content>
    <p>Click to show/hide</p>
  </ng-template>
</amw-popover>`
    }
  ];

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
  }

  // Toggle tooltip state
  toggleTooltip() {
    this.tooltipDisabled = !this.tooltipDisabled;
    console.log('Tooltip disabled:', this.tooltipDisabled);
  }
}
