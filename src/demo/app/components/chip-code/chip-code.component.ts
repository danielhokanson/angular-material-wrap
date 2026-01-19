import { Component, ViewEncapsulation } from '@angular/core';
import { BaseCodeComponent } from '../base/base-code.component';

type ChipCodeExamples = 'basic' | 'removable' | 'selectable' | 'icons' | 'avatars';

@Component({
    selector: 'amw-demo-chip-code',
    standalone: true,
    imports: [],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './chip-code.component.html',
    styleUrl: './chip-code.component.scss'
})
export class ChipCodeComponent extends BaseCodeComponent<ChipCodeExamples> {
    readonly codeExamples: Record<ChipCodeExamples, string> = {
        basic: `<amw-chip label="Basic Chip"></amw-chip>
<amw-chip label="Primary" color="primary"></amw-chip>
<amw-chip label="Accent" color="accent"></amw-chip>
<amw-chip label="Warn" color="warn"></amw-chip>`,

        removable: `<amw-chip
  label="Removable"
  [removable]="true"
  (removed)="onChipRemoved()">
</amw-chip>`,

        selectable: `<amw-chip
  label="Option"
  [selectable]="true"
  [(selected)]="isSelected"
  (selectionChange)="onSelectionChange($event)">
</amw-chip>`,

        icons: `<amw-chip label="Home" icon="home"></amw-chip>
<amw-chip label="Settings" icon="settings"></amw-chip>
<amw-chip label="Favorite" icon="favorite" color="warn"></amw-chip>`,

        avatars: `<amw-chip
  label="John Doe"
  avatar="https://example.com/avatar.jpg">
</amw-chip>

<amw-chip
  label="User"
  avatar="/assets/user.png"
  [removable]="true">
</amw-chip>`
    };

    constructor() {
        super();
    }
}
