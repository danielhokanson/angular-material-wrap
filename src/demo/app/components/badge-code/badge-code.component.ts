import { Component, ViewEncapsulation } from '@angular/core';
import { BaseCodeComponent } from '../base/base-code.component';

type BadgeCodeExamples = 'basic' | 'colors' | 'positions' | 'sizes' | 'hidden';

@Component({
    selector: 'amw-demo-badge-code',
    standalone: true,
    imports: [],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './badge-code.component.html',
    styleUrl: './badge-code.component.scss'
})
export class BadgeCodeComponent extends BaseCodeComponent<BadgeCodeExamples> {
    readonly codeExamples: Record<BadgeCodeExamples, string> = {
        basic: `<!-- Basic badge with number -->
<span [amwBadge]="5">
  <mat-icon>notifications</mat-icon>
</span>

<!-- Basic badge with text -->
<span [amwBadge]="'New'">
  <mat-icon>star</mat-icon>
</span>`,

        colors: `<!-- Primary (default) -->
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
</span>`,

        positions: `<!-- Above After (default) -->
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
</span>`,

        sizes: `<!-- Small -->
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
</span>`,

        hidden: `<!-- Conditionally hidden badge -->
<span
  [amwBadge]="unreadCount"
  [amwBadgeHidden]="unreadCount === 0">
  <mat-icon>mail</mat-icon>
</span>

<!-- In component -->
unreadCount = 0; // Badge hidden when count is 0`
    };

    constructor() {
        super();
    }
}
