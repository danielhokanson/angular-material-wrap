import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwPaginatorComponent, AmwPageEvent } from '../../../../library/src/components/components/amw-paginator/amw-paginator.component';
import { AmwIconComponent } from '../../../../library/src/components/components';

@Component({
  selector: 'amw-demo-paginator-code',
  standalone: true,
  imports: [
    FormsModule,
    AmwCodeDocComponent,
    AmwPaginatorComponent,
    AmwIconComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './paginator-code.component.html',
  styleUrl: './paginator-code.component.scss'
})
export class PaginatorCodeComponent implements OnInit {
  // Expose Math for template usage
  Math = Math;

  // State for live preview examples
  basicPageIndex = 0;
  basicPageSize = 10;
  basicLength = 100;

  optionsPageIndex = 0;
  optionsPageSize = 25;
  optionsLength = 500;

  firstLastPageIndex = 0;
  firstLastPageSize = 10;
  firstLastLength = 100;

  hidePageSizeIndex = 0;
  hidePageSizeValue = 20;
  hidePageSizeLength = 200;

  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Paginator',
      description: 'A simple paginator with default settings',
      code: `<amw-paginator
  [length]="100"
  [pageSize]="10"
  (page)="onPageChange($event)">
</amw-paginator>

// Component
onPageChange(event: AmwPageEvent): void {
  console.log('Page index:', event.pageIndex);
  console.log('Page size:', event.pageSize);
  console.log('Total items:', event.length);
}`
    },
    {
      key: 'pageSizeOptions',
      title: 'Page Size Options',
      description: 'Paginator with custom page size options',
      code: `<amw-paginator
  [length]="500"
  [pageSize]="25"
  [pageSizeOptions]="[10, 25, 50, 100]"
  (page)="onPageChange($event)">
</amw-paginator>

// Component
pageSize = 25;
pageSizeOptions = [10, 25, 50, 100];

onPageChange(event: AmwPageEvent): void {
  this.pageSize = event.pageSize;
  this.loadData(event.pageIndex, event.pageSize);
}`
    },
    {
      key: 'firstLast',
      title: 'First/Last Buttons',
      description: 'Paginator with first and last page buttons',
      code: `<amw-paginator
  [length]="100"
  [pageSize]="10"
  [showFirstLastButtons]="true"
  (page)="onPageChange($event)">
</amw-paginator>

// Shows first/last page navigation buttons
// Useful for quickly jumping to the beginning
// or end of large datasets`
    },
    {
      key: 'hidePageSize',
      title: 'Hide Page Size',
      description: 'Paginator with hidden page size selector',
      code: `<amw-paginator
  [length]="200"
  [pageSize]="20"
  [hidePageSize]="true"
  (page)="onPageChange($event)">
</amw-paginator>

// Hides the page size selector
// Useful when you want to control the
// page size programmatically`
    }
  ];

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
  }

  // Event handlers for preview examples
  onBasicPageChange(event: AmwPageEvent): void {
    this.basicPageIndex = event.pageIndex;
    this.basicPageSize = event.pageSize;
    console.log('Basic paginator:', event);
  }

  onOptionsPageChange(event: AmwPageEvent): void {
    this.optionsPageIndex = event.pageIndex;
    this.optionsPageSize = event.pageSize;
    console.log('Options paginator:', event);
  }

  onFirstLastPageChange(event: AmwPageEvent): void {
    this.firstLastPageIndex = event.pageIndex;
    this.firstLastPageSize = event.pageSize;
    console.log('First/Last paginator:', event);
  }

  onHidePageSizeChange(event: AmwPageEvent): void {
    this.hidePageSizeIndex = event.pageIndex;
    console.log('Hide page size paginator:', event);
  }
}
