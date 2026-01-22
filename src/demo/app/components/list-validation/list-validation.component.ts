import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwListComponent } from '../../../../library/src/components/components/amw-list/amw-list.component';
import { AmwListItemComponent } from '../../../../library/src/components/components/amw-list/amw-list-item.component';
import { AmwIconComponent, AmwCardComponent } from '../../../../library/src/components/components';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

interface ListItem {
  title: string;
  subtitle?: string;
  icon: string;
  disabled?: boolean;
  selected?: boolean;
}

@Component({
  selector: 'amw-demo-list-validation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwListComponent,
    AmwListItemComponent,
    AmwIconComponent,
    AmwCardComponent,
    AmwButtonComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './list-validation.component.html',
  styleUrl: './list-validation.component.scss'
})
export class ListValidationComponent extends BaseValidationComponent {
  validationForm: FormGroup = this.fb.group({});

  validationInfo: ValidationInfo[] = [
    { title: 'Disabled Items', description: 'Cannot be clicked or selected, visually dimmed' },
    { title: 'Selected Items', description: 'Shows visual indication of current selection' },
    { title: 'Mixed States', description: 'Combines both disabled and selected states' },
    { title: 'Click Events', description: 'Only fire on enabled items' }
  ];

  disabledItems: ListItem[] = [
    { title: 'Available Item', subtitle: 'This item is enabled', icon: 'check_circle', disabled: false },
    { title: 'Disabled Item', subtitle: 'This item is disabled', icon: 'block', disabled: true },
    { title: 'Another Available', subtitle: 'This item is also enabled', icon: 'check_circle', disabled: false },
    { title: 'Unavailable Item', subtitle: 'This item is also disabled', icon: 'block', disabled: true }
  ];

  selectableItems: ListItem[] = [
    { title: 'Inbox', subtitle: '5 new messages', icon: 'inbox', selected: false },
    { title: 'Starred', subtitle: '12 items', icon: 'star', selected: true },
    { title: 'Drafts', subtitle: '3 drafts', icon: 'drafts', selected: false },
    { title: 'Sent', subtitle: '45 sent messages', icon: 'send', selected: false }
  ];

  mixedStateItems: ListItem[] = [
    { title: 'Home', subtitle: 'Go to home page', icon: 'home', disabled: false, selected: true },
    { title: 'Settings', subtitle: 'Configure app', icon: 'settings', disabled: false, selected: false },
    { title: 'Admin Panel', subtitle: 'Admin access only', icon: 'admin_panel_settings', disabled: true, selected: false },
    { title: 'Profile', subtitle: 'View your profile', icon: 'person', disabled: false, selected: false },
    { title: 'Deprecated Feature', subtitle: 'No longer available', icon: 'warning', disabled: true, selected: false }
  ];

  lastClickedItem: string | null = null;

  onItemClick(item: ListItem): void {
    if (!item.disabled) {
      this.lastClickedItem = item.title;
    }
  }

  toggleSelection(item: ListItem): void {
    if (!item.disabled) {
      this.selectableItems.forEach(i => i.selected = false);
      item.selected = true;
    }
  }

  toggleMixedSelection(item: ListItem): void {
    if (!item.disabled) {
      this.mixedStateItems.forEach(i => i.selected = false);
      item.selected = true;
    }
  }

  getSelectedItem(): string {
    const selected = this.selectableItems.find(item => item.selected);
    return selected ? selected.title : 'None';
  }

  getMixedSelectedItem(): string {
    const selected = this.mixedStateItems.find(item => item.selected);
    return selected ? selected.title : 'None';
  }
}
