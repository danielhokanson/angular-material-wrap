import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseCodeComponent } from '../base/base-code.component';
import { AmwListComponent } from '../../../../library/src/components/components/amw-list/amw-list.component';
import { AmwListItemComponent } from '../../../../library/src/components/components/amw-list/amw-list-item.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwIconComponent } from '../../../../library/src/components/components';

type ListExamples = 'basic' | 'dense' | 'navigation' | 'disabled';

@Component({
  selector: 'amw-demo-list-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AmwListComponent,
    AmwListItemComponent,
    AmwButtonComponent,
    AmwAccordionComponent,
    AmwAccordionPanelComponent,
    AmwIconComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './list-code.component.html',
  styleUrl: './list-code.component.scss'
})
export class ListCodeComponent extends BaseCodeComponent<ListExamples> {
  readonly codeExamples: Record<ListExamples, string> = {
    basic: `<amw-list>
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
</amw-list>`,

    dense: `<amw-list [dense]="true">
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
</amw-list>`,

    navigation: `<amw-list>
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
</amw-list>`,

    disabled: `<amw-list>
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
  };

  // Track click events for demo
  lastClickedItem: string | null = null;

  onItemClick(itemName: string): void {
    this.lastClickedItem = itemName;
  }

  constructor() {
    super();
  }
}
