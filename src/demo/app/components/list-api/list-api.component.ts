import { Component, ViewEncapsulation } from '@angular/core';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';
import { AmwApiDocComponent } from '../../shared/components/api-doc/api-doc.component';

@Component({
  selector: 'amw-demo-list-api',
  standalone: true,
  imports: [AmwApiDocComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './list-api.component.html',
  styleUrl: './list-api.component.scss'
})
export class ListApiComponent extends BaseApiComponent {
  apiDocumentation: ApiDocumentation = {
    inputs: [
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        description: 'Use compact spacing for the list items'
      },
      {
        name: 'disableRipple',
        type: 'boolean',
        default: 'false',
        description: 'Disable ripple effect on all list items'
      },
      {
        name: 'listClass',
        type: 'string',
        default: 'undefined',
        description: 'Custom CSS class to apply to the list container'
      }
    ],
    outputs: [],
    usageNotes: [
      'The amw-list component is a container for amw-list-item elements',
      'Use content projection selectors like amwListItemIcon, amwListItemTitle, amwListItemSubtitle, and amwListItemMeta to structure item content',
      'The dense mode reduces vertical padding for more compact display',
      'disableRipple can be set on the parent list to affect all child items'
    ]
  };

  // API documentation for ListItem
  listItemApiDocumentation: ApiDocumentation = {
    inputs: [
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the list item is disabled and cannot be clicked'
      },
      {
        name: 'selected',
        type: 'boolean',
        default: 'false',
        description: 'Whether the list item is currently selected'
      },
      {
        name: 'routerLink',
        type: 'string | any[]',
        default: 'undefined',
        description: 'Navigation link (makes item clickable and navigable via Angular Router)'
      },
      {
        name: 'queryParams',
        type: '{ [key: string]: any }',
        default: 'undefined',
        description: 'Query parameters for router navigation'
      },
      {
        name: 'fragment',
        type: 'string',
        default: 'undefined',
        description: 'Fragment (hash) for router navigation'
      },
      {
        name: 'itemClass',
        type: 'string',
        default: 'undefined',
        description: 'Custom CSS class to apply to the list item'
      },
      {
        name: 'disableRipple',
        type: 'boolean',
        default: 'false',
        description: 'Disable ripple effect for this specific item'
      }
    ],
    outputs: [
      {
        name: 'itemClick',
        type: 'EventEmitter<MouseEvent>',
        description: 'Emitted when the list item is clicked (only fires when not disabled)'
      }
    ],
    usageNotes: [
      'Use content projection selectors to place content in specific areas of the list item',
      '[amwListItemIcon] - Leading icon slot',
      '[amwListItemAvatar] - Leading avatar image slot',
      '[amwListItemTitle] - Primary text (required)',
      '[amwListItemSubtitle] - Secondary text',
      '[amwListItemMeta] - Trailing content (badges, buttons, icons)',
      'The itemClick event only fires when the item is not disabled',
      'When routerLink is set, the item becomes navigable and shows a cursor pointer'
    ]
  };

  constructor() {
    super();
  }
}
