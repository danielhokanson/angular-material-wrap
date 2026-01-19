import { Component, ViewEncapsulation } from '@angular/core';
import { BaseCodeComponent } from '../base/base-code.component';

type DividerCodeExamples = 'basic' | 'vertical' | 'inset' | 'list' | 'sections';

@Component({
    selector: 'amw-demo-divider-code',
    standalone: true,
    imports: [],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './divider-code.component.html',
    styleUrl: './divider-code.component.scss'
})
export class DividerCodeComponent extends BaseCodeComponent<DividerCodeExamples> {
    readonly codeExamples: Record<DividerCodeExamples, string> = {
        basic: `<!-- Basic Horizontal Divider -->
<p>Content above</p>
<amw-divider></amw-divider>
<p>Content below</p>`,

        vertical: `<!-- Vertical Divider -->
<div style="display: flex; align-items: center; height: 50px;">
  <span>Left</span>
  <amw-divider [vertical]="true"></amw-divider>
  <span>Center</span>
  <amw-divider [vertical]="true"></amw-divider>
  <span>Right</span>
</div>

<!-- Note: Container needs height for vertical divider to be visible -->`,

        inset: `<!-- Inset Divider (for lists with icons) -->
<div class="list-item">
  <mat-icon>inbox</mat-icon>
  <span>Inbox</span>
</div>
<amw-divider [inset]="true"></amw-divider>
<div class="list-item">
  <mat-icon>send</mat-icon>
  <span>Sent</span>
</div>

<!-- Inset adds left margin (72px default) to align with content after icons -->`,

        list: `<!-- Divider in List -->
<amw-list>
  @for (item of items; track item.id; let last = $last) {
    <amw-list-item>
      <mat-icon amwListItemIcon>{{ item.icon }}</mat-icon>
      <span amwListItemTitle>{{ item.text }}</span>
    </amw-list-item>
    @if (!last) {
      <amw-divider></amw-divider>
    }
  }
</amw-list>

<!-- Use inset divider for lists with icons -->
<amw-list>
  @for (item of items; track item.id; let last = $last) {
    <amw-list-item>
      <mat-icon amwListItemIcon>{{ item.icon }}</mat-icon>
      <span amwListItemTitle>{{ item.text }}</span>
    </amw-list-item>
    @if (!last) {
      <amw-divider [inset]="true"></amw-divider>
    }
  }
</amw-list>`,

        sections: `<!-- Section Dividers -->
<div class="section">
  <h3>Section 1</h3>
  <p>Content for section 1</p>
</div>
<amw-divider></amw-divider>
<div class="section">
  <h3>Section 2</h3>
  <p>Content for section 2</p>
</div>
<amw-divider></amw-divider>
<div class="section">
  <h3>Section 3</h3>
  <p>Content for section 3</p>
</div>`
    };

    constructor() {
        super();
    }
}
