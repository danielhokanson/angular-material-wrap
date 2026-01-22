import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwDividerComponent } from '../../../../library/src/components/components/amw-divider/amw-divider.component';
import { AmwIconComponent } from '../../../../library/src/components/components';

@Component({
  selector: 'amw-demo-divider-code',
  standalone: true,
  imports: [
    AmwCodeDocComponent,
    AmwDividerComponent,
    AmwIconComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './divider-code.component.html',
  styleUrl: './divider-code.component.scss'
})
export class DividerCodeComponent implements OnInit {
  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Horizontal Divider',
      description: 'Simple horizontal divider',
      code: `<!-- Basic Horizontal Divider -->
<p>Content above</p>
<amw-divider></amw-divider>
<p>Content below</p>`
    },
    {
      key: 'vertical',
      title: 'Vertical Divider',
      description: 'Divider with vertical orientation',
      code: `<!-- Vertical Divider -->
<div style="display: flex; align-items: center; height: 50px;">
  <span>Left</span>
  <amw-divider [vertical]="true"></amw-divider>
  <span>Center</span>
  <amw-divider [vertical]="true"></amw-divider>
  <span>Right</span>
</div>

<!-- Note: Container needs height for vertical divider to be visible -->`
    },
    {
      key: 'inset',
      title: 'Inset Divider',
      description: 'Divider with left margin for lists with icons',
      code: `<!-- Inset Divider (for lists with icons) -->
<div class="list-item">
  <mat-icon>inbox</mat-icon>
  <span>Inbox</span>
</div>
<amw-divider [inset]="true"></amw-divider>
<div class="list-item">
  <mat-icon>send</mat-icon>
  <span>Sent</span>
</div>

<!-- Inset adds left margin (72px default) to align with content after icons -->`
    },
    {
      key: 'list',
      title: 'In Lists',
      description: 'Using dividers within lists',
      code: `<!-- Divider in List -->
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
</amw-list>`
    },
    {
      key: 'sections',
      title: 'Section Dividers',
      description: 'Using dividers between sections',
      code: `<!-- Section Dividers -->
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
    }
  ];

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
  }
}
