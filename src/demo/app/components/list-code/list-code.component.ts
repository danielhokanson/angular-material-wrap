import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwListComponent } from '../../../../library/src/components/components/amw-list/amw-list.component';
import { AmwListItemComponent } from '../../../../library/src/components/components/amw-list/amw-list-item.component';
import { AmwIconComponent } from '../../../../library/src/components/components';

@Component({
  selector: 'amw-demo-list-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AmwCodeDocComponent,
    AmwListComponent,
    AmwListItemComponent,
    AmwIconComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './list-code.component.html',
  styleUrl: './list-code.component.scss'
})
export class ListCodeComponent implements OnInit {
  // Track click events for demo
  lastClickedItem: string | null = null;

  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic List',
      description: 'Simple list with icons, titles, subtitles and meta',
      code: `<amw-list>
  <amw-list-item>
    <amw-icon amwListItemIcon name="inbox"></amw-icon>
    <span amwListItemTitle>Inbox</span>
    <span amwListItemSubtitle>5 new messages</span>
    <span amwListItemMeta>5</span>
  </amw-list-item>
  <amw-list-item>
    <amw-icon amwListItemIcon name="star"></amw-icon>
    <span amwListItemTitle>Starred</span>
    <span amwListItemSubtitle>12 items</span>
    <span amwListItemMeta>12</span>
  </amw-list-item>
  <amw-list-item>
    <amw-icon amwListItemIcon name="send"></amw-icon>
    <span amwListItemTitle>Sent</span>
    <span amwListItemSubtitle>45 sent messages</span>
    <span amwListItemMeta>45</span>
  </amw-list-item>
</amw-list>`
    },
    {
      key: 'dense',
      title: 'Dense List',
      description: 'Compact list with reduced spacing',
      code: `<amw-list [dense]="true">
  <amw-list-item>
    <amw-icon amwListItemIcon name="folder"></amw-icon>
    <span amwListItemTitle>Documents</span>
  </amw-list-item>
  <amw-list-item>
    <amw-icon amwListItemIcon name="image"></amw-icon>
    <span amwListItemTitle>Photos</span>
  </amw-list-item>
  <amw-list-item>
    <amw-icon amwListItemIcon name="music_note"></amw-icon>
    <span amwListItemTitle>Music</span>
  </amw-list-item>
  <amw-list-item>
    <amw-icon amwListItemIcon name="video_library"></amw-icon>
    <span amwListItemTitle>Videos</span>
  </amw-list-item>
</amw-list>`
    },
    {
      key: 'navigation',
      title: 'Navigation List',
      description: 'List items with router navigation',
      code: `<amw-list>
  <amw-list-item [routerLink]="['/home']">
    <amw-icon amwListItemIcon name="home"></amw-icon>
    <span amwListItemTitle>Home</span>
    <span amwListItemSubtitle>Go to home page</span>
  </amw-list-item>
  <amw-list-item [routerLink]="['/profile']">
    <amw-icon amwListItemIcon name="person"></amw-icon>
    <span amwListItemTitle>Profile</span>
    <span amwListItemSubtitle>View your profile</span>
  </amw-list-item>
  <amw-list-item [routerLink]="['/settings']">
    <amw-icon amwListItemIcon name="settings"></amw-icon>
    <span amwListItemTitle>Settings</span>
    <span amwListItemSubtitle>Configure app</span>
  </amw-list-item>
</amw-list>`
    },
    {
      key: 'disabled',
      title: 'Disabled Items',
      description: 'List with disabled items that cannot be clicked',
      code: `<amw-list>
  <amw-list-item>
    <amw-icon amwListItemIcon name="check_circle"></amw-icon>
    <span amwListItemTitle>Available Item</span>
    <span amwListItemSubtitle>This item is enabled</span>
  </amw-list-item>
  <amw-list-item [disabled]="true">
    <amw-icon amwListItemIcon name="block"></amw-icon>
    <span amwListItemTitle>Disabled Item</span>
    <span amwListItemSubtitle>This item is disabled</span>
  </amw-list-item>
  <amw-list-item>
    <amw-icon amwListItemIcon name="check_circle"></amw-icon>
    <span amwListItemTitle>Another Available</span>
    <span amwListItemSubtitle>This item is enabled</span>
  </amw-list-item>
</amw-list>`
    }
  ];

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
  }

  onItemClick(itemName: string): void {
    this.lastClickedItem = itemName;
  }
}
