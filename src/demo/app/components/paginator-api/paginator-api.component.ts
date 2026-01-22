import { Component, ViewEncapsulation } from '@angular/core';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';
import { AmwApiDocComponent, ApiInterface } from '../../shared/components/api-doc/api-doc.component';

@Component({
  selector: 'amw-demo-paginator-api',
  standalone: true,
  imports: [AmwApiDocComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './paginator-api.component.html',
  styleUrl: './paginator-api.component.scss'
})
export class PaginatorApiComponent extends BaseApiComponent {
  apiDocumentation: ApiDocumentation = {
    inputs: [
      {
        name: 'length',
        type: 'number',
        default: '0',
        description: 'Total number of items to be paginated'
      },
      {
        name: 'pageSize',
        type: 'number',
        default: '10',
        description: 'Number of items per page (two-way bindable with pageIndex)'
      },
      {
        name: 'pageSizeOptions',
        type: 'number[]',
        default: '[5, 10, 25, 50]',
        description: 'Array of page size options available in the dropdown selector'
      },
      {
        name: 'pageIndex',
        type: 'number',
        default: '0',
        description: 'Current page index (0-based, two-way bindable)'
      },
      {
        name: 'showFirstLastButtons',
        type: 'boolean',
        default: 'false',
        description: 'Whether to show buttons for jumping to the first and last pages'
      },
      {
        name: 'hidePageSize',
        type: 'boolean',
        default: 'false',
        description: 'Whether to hide the page size selector dropdown'
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the paginator is disabled (prevents all user interaction)'
      }
    ],
    outputs: [
      {
        name: 'page',
        type: 'EventEmitter<AmwPageEvent>',
        description: 'Emitted when the page changes. The event contains pageIndex, previousPageIndex, pageSize, and length properties.'
      }
    ],
    usageNotes: [
      'The paginator uses 0-based page indexing. Page 1 is represented as pageIndex 0.',
      'Use two-way binding [(pageIndex)] and [(pageSize)] for controlled pagination.',
      'The page event is emitted after pageIndex and pageSize are updated.',
      'When length is 0 or items fit on a single page, navigation buttons are automatically disabled.',
      'The paginator wraps Angular Material mat-paginator with a consistent AMW API.'
    ]
  };

  interfaces: ApiInterface[] = [
    {
      name: 'AmwPageEvent',
      description: 'Event emitted when the page changes',
      properties: [
        { name: 'pageIndex', type: 'number', description: 'Current page index (0-based)' },
        { name: 'previousPageIndex', type: 'number', description: 'Previous page index before the change' },
        { name: 'pageSize', type: 'number', description: 'Items per page' },
        { name: 'length', type: 'number', description: 'Total number of items' }
      ]
    }
  ];

  constructor() {
    super();
  }
}
