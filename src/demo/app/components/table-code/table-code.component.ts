import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwIconComponent } from '../../../../library/src/components/components';

@Component({
  selector: 'amw-demo-table-code',
  standalone: true,
  imports: [
    AmwCodeDocComponent,
    AmwIconComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './table-code.component.html',
  styleUrl: './table-code.component.scss'
})
export class TableCodeComponent implements OnInit {
  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Table',
      description: 'Simple table with data source',
      code: `<!-- Basic Table -->
<amw-table
  [dataSource]="dataSource"
  [displayedColumns]="['position', 'name', 'weight', 'symbol']">
</amw-table>

<!-- In component -->
dataSource = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' }
];`
    },
    {
      key: 'withTrackBy',
      title: 'With TrackBy',
      description: 'Table with TrackBy for performance',
      code: `<!-- Table with TrackBy for performance -->
<amw-table
  [dataSource]="dataSource"
  [displayedColumns]="displayedColumns"
  [trackBy]="trackByFn">
</amw-table>

<!-- In component -->
trackByFn(index: number, item: PeriodicElement): number {
  return item.position;
}`
    },
    {
      key: 'withSort',
      title: 'With Sorting',
      description: 'Table with sorting functionality',
      code: `<!-- Table with Sorting -->
<div amwSort
     [amwSortActive]="sortActive"
     [amwSortDirection]="sortDirection"
     (amwSortChange)="onSortChange($event)">
  <amw-table
    [dataSource]="sortedData"
    [displayedColumns]="displayedColumns">
  </amw-table>
</div>

<!-- In component -->
sortActive = 'name';
sortDirection: 'asc' | 'desc' | '' = 'asc';

onSortChange(event: { active: string; direction: string }) {
  this.sortActive = event.active;
  this.sortDirection = event.direction;
  // Re-sort data based on active column and direction
}`
    },
    {
      key: 'withPagination',
      title: 'With Pagination',
      description: 'Table with pagination',
      code: `<!-- Table with Pagination -->
<amw-table
  [dataSource]="paginatedData"
  [displayedColumns]="displayedColumns">
</amw-table>
<amw-paginator
  [length]="totalItems"
  [pageSize]="pageSize"
  [pageIndex]="pageIndex"
  [pageSizeOptions]="[5, 10, 25]"
  (page)="onPageChange($event)">
</amw-paginator>

<!-- In component -->
pageSize = 10;
pageIndex = 0;
totalItems = 100;

get paginatedData() {
  const start = this.pageIndex * this.pageSize;
  return this.allData.slice(start, start + this.pageSize);
}

onPageChange(event: AmwPageEvent) {
  this.pageIndex = event.pageIndex;
  this.pageSize = event.pageSize;
}`
    },
    {
      key: 'directives',
      title: 'Directive-Based Table',
      description: 'Table with column definition directives',
      code: `<!-- Table with Column Definition Directives -->
<table amw-table [dataSource]="dataSource">
  <ng-container amwColumnDef="position">
    <th *amwHeaderCellDef>No.</th>
    <td *amwCellDef="let element">{{ element.position }}</td>
  </ng-container>

  <ng-container amwColumnDef="name">
    <th *amwHeaderCellDef>Name</th>
    <td *amwCellDef="let element">{{ element.name }}</td>
  </ng-container>

  <tr *amwHeaderRowDef="displayedColumns"></tr>
  <tr *amwRowDef="let row; columns: displayedColumns"></tr>
</table>`
    }
  ];

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
  }
}
