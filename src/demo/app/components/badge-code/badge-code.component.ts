import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwBadgeDirective } from '../../../../library/src/directives/amw-badge/amw-badge.directive';
import { AmwIconComponent } from '../../../../library/src/components/components';

@Component({
  selector: 'amw-demo-badge-code',
  standalone: true,
  imports: [
    AmwCodeDocComponent,
    AmwBadgeDirective,
    AmwIconComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './badge-code.component.html',
  styleUrl: './badge-code.component.scss'
})
export class BadgeCodeComponent implements OnInit {
  // State for hidden badge example
  unreadCount = 5;

  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Badge',
      description: 'Simple badge with number or text',
      code: `<!-- Basic badge with number -->
<span [amwBadge]="5">
  <mat-icon>notifications</mat-icon>
</span>

<!-- Basic badge with text -->
<span [amwBadge]="'New'">
  <mat-icon>star</mat-icon>
</span>`
    },
    {
      key: 'colors',
      title: 'Badge Colors',
      description: 'Badges with different colors',
      code: `<!-- Primary (default) -->
<span [amwBadge]="3" amwBadgeColor="primary">
  <mat-icon>mail</mat-icon>
</span>

<!-- Accent -->
<span [amwBadge]="7" amwBadgeColor="accent">
  <mat-icon>inbox</mat-icon>
</span>

<!-- Warn -->
<span [amwBadge]="12" amwBadgeColor="warn">
  <mat-icon>warning</mat-icon>
</span>`
    },
    {
      key: 'positions',
      title: 'Badge Positions',
      description: 'Badges in different positions',
      code: `<!-- Above After (default) -->
<span [amwBadge]="1" amwBadgePosition="above after">
  <mat-icon>inbox</mat-icon>
</span>

<!-- Above Before -->
<span [amwBadge]="2" amwBadgePosition="above before">
  <mat-icon>inbox</mat-icon>
</span>

<!-- Below After -->
<span [amwBadge]="3" amwBadgePosition="below after">
  <mat-icon>inbox</mat-icon>
</span>

<!-- Below Before -->
<span [amwBadge]="4" amwBadgePosition="below before">
  <mat-icon>inbox</mat-icon>
</span>`
    },
    {
      key: 'sizes',
      title: 'Badge Sizes',
      description: 'Badges in different sizes',
      code: `<!-- Small -->
<span [amwBadge]="1" amwBadgeSize="small">
  <mat-icon>inbox</mat-icon>
</span>

<!-- Medium (default) -->
<span [amwBadge]="2" amwBadgeSize="medium">
  <mat-icon>inbox</mat-icon>
</span>

<!-- Large -->
<span [amwBadge]="3" amwBadgeSize="large">
  <mat-icon>inbox</mat-icon>
</span>`
    },
    {
      key: 'hidden',
      title: 'Hidden Badge',
      description: 'Conditionally hidden badge',
      code: `<!-- Conditionally hidden badge -->
<span
  [amwBadge]="unreadCount"
  [amwBadgeHidden]="unreadCount === 0">
  <mat-icon>mail</mat-icon>
</span>

<!-- In component -->
unreadCount = 0; // Badge hidden when count is 0`
    }
  ];

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
  }

  toggleBadge(): void {
    this.unreadCount = this.unreadCount === 0 ? 5 : 0;
  }
}
