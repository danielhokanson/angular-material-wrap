import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmwPaginatorComponent } from '../../../../library/src/components/components/amw-paginator/amw-paginator.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

@Component({
  selector: 'amw-demo-paginator-validation',
  standalone: true,
  imports: [
    CommonModule,
    AmwPaginatorComponent,
    AmwButtonComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './paginator-validation.component.html',
  styleUrl: './paginator-validation.component.scss'
})
export class PaginatorValidationComponent {
  // Expose Math for template usage
  Math = Math;

  // Disabled state
  disabledPageIndex = 0;
  disabledPageSize = 10;

  // Boundary conditions - First page
  firstPageIndex = 0;
  firstPageSize = 10;
  firstPageLength = 100;

  // Boundary conditions - Last page
  lastPageIndex = 9;
  lastPageSize = 10;
  lastPageLength = 100;

  // Empty dataset
  emptyPageIndex = 0;
  emptyPageSize = 10;
  emptyPageLength = 0;

  // Single page
  singlePageIndex = 0;
  singlePageSize = 10;
  singlePageLength = 5;

  // Large dataset
  largePageIndex = 0;
  largePageSize = 25;
  largePageLength = 10000;

  // Page event logs
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
