import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwPaginatorComponent } from '../../../../library/src/components/components/amw-paginator/amw-paginator.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

@Component({
  selector: 'amw-demo-paginator-validation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwPaginatorComponent,
    AmwButtonComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './paginator-validation.component.html',
  styleUrl: './paginator-validation.component.scss'
})
export class PaginatorValidationComponent extends BaseValidationComponent {
  Math = Math;

  validationForm: FormGroup = this.fb.group({});

  validationInfo: ValidationInfo[] = [
    { title: 'Disabled', description: 'Paginator should not respond to any user interaction' },
    { title: 'First Page', description: 'Previous and first page buttons should be disabled' },
    { title: 'Last Page', description: 'Next and last page buttons should be disabled' },
    { title: 'Empty Dataset', description: 'All navigation buttons should be disabled' },
    { title: 'Single Page', description: 'All navigation buttons should be disabled when items fit on one page' },
    { title: 'Large Dataset', description: 'Paginator should handle large numbers efficiently' }
  ];

  disabledPageIndex = 0;
  disabledPageSize = 10;

  firstPageIndex = 0;
  firstPageSize = 10;
  firstPageLength = 100;

  lastPageIndex = 9;
  lastPageSize = 10;
  lastPageLength = 100;

  emptyPageIndex = 0;
  emptyPageSize = 10;
  emptyPageLength = 0;

  singlePageIndex = 0;
  singlePageSize = 10;
  singlePageLength = 5;

  largePageIndex = 0;
  largePageSize = 25;
  largePageLength = 10000;

  eventLogs: string[] = [];

  onDisabledPageChange(event: any): void {
    this.eventLogs.unshift(`Disabled paginator (should not fire): Page ${event.pageIndex + 1}`);
  }

  onFirstPageChange(event: any): void {
    this.firstPageIndex = event.pageIndex;
    this.firstPageSize = event.pageSize;
    this.eventLogs.unshift(`First page paginator: Page ${event.pageIndex + 1}, Size ${event.pageSize}`);
  }

  onLastPageChange(event: any): void {
    this.lastPageIndex = event.pageIndex;
    this.lastPageSize = event.pageSize;
    this.eventLogs.unshift(`Last page paginator: Page ${event.pageIndex + 1}, Size ${event.pageSize}`);
  }

  onEmptyPageChange(event: any): void {
    this.emptyPageIndex = event.pageIndex;
    this.emptyPageSize = event.pageSize;
    this.eventLogs.unshift(`Empty dataset paginator: Page ${event.pageIndex + 1}, Size ${event.pageSize}`);
  }

  onSinglePageChange(event: any): void {
    this.singlePageIndex = event.pageIndex;
    this.singlePageSize = event.pageSize;
    this.eventLogs.unshift(`Single page paginator: Page ${event.pageIndex + 1}, Size ${event.pageSize}`);
  }

  onLargePageChange(event: any): void {
    this.largePageIndex = event.pageIndex;
    this.largePageSize = event.pageSize;
    this.eventLogs.unshift(`Large dataset paginator: Page ${event.pageIndex + 1}, Size ${event.pageSize}`);
  }

  resetToFirstPage(): void {
    this.firstPageIndex = 0;
  }

  goToLastPage(): void {
    this.lastPageIndex = Math.ceil(this.lastPageLength / this.lastPageSize) - 1;
  }

  clearLogs(): void {
    this.eventLogs = [];
  }
}
