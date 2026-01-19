import { Component, ViewEncapsulation } from '@angular/core';
import { BaseCodeComponent } from '../base/base-code.component';

type SortCodeExamples = 'basic' | 'withTable' | 'programmatic' | 'disabled' | 'sortHeader';

@Component({
    selector: 'amw-demo-sort-code',
    standalone: true,
    imports: [],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './sort-code.component.html',
    styleUrl: './sort-code.component.scss'
})
export class SortCodeComponent extends BaseCodeComponent<SortCodeExamples> {
    readonly codeExamples: Record<SortCodeExamples, string> = {
        basic: `<!-- Basic Sort Directive -->
<div amwSort
     [amwSortActive]="'name'"
     [amwSortDirection]="'asc'"
     (amwSortChange)="onSortChange($event)">
  <!-- Content to sort -->
</div>

<!-- In component -->
onSortChange(event: { active: string; direction: 'asc' | 'desc' | '' }) {
  console.log('Sort changed:', event.active, event.direction);
}`,

        withTable: `<!-- Sort with AmwTable -->
<div amwSort
     [amwSortActive]="sortColumn"
     [amwSortDirection]="sortDirection"
     (amwSortChange)="onSortChange($event)">
  <amw-table
    [dataSource]="sortedData"
    [displayedColumns]="displayedColumns">
  </amw-table>
</div>

<!-- In component -->
sortColumn = 'name';
sortDirection: 'asc' | 'desc' | '' = 'asc';

get sortedData() {
  return [...this.data].sort((a, b) => {
    const aVal = a[this.sortColumn];
    const bVal = b[this.sortColumn];
    const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    return this.sortDirection === 'asc' ? comparison : -comparison;
  });
}

onSortChange(event: AmwSort) {
  this.sortColumn = event.active;
  this.sortDirection = event.direction;
}`,

        programmatic: `<!-- Programmatic Sort Control -->
<div amwSort
     [amwSortActive]="sortActive"
     [amwSortDirection]="sortDirection"
     (amwSortChange)="onSortChange($event)">
  <amw-table [dataSource]="data" [displayedColumns]="columns">
  </amw-table>
</div>

<button (click)="setSort('name', 'asc')">Sort by Name</button>
<button (click)="setSort('date', 'desc')">Sort by Date (Desc)</button>
<button (click)="clearSort()">Clear Sort</button>

<!-- In component -->
sortActive = '';
sortDirection: 'asc' | 'desc' | '' = '';

setSort(column: string, direction: 'asc' | 'desc') {
  this.sortActive = column;
  this.sortDirection = direction;
}

clearSort() {
  this.sortActive = '';
  this.sortDirection = '';
}`,

        disabled: `<!-- Disabled Sort -->
<div amwSort
     [amwSortActive]="sortActive"
     [amwSortDirection]="sortDirection"
     [amwSortDisabled]="isSortDisabled"
     (amwSortChange)="onSortChange($event)">
  <amw-table [dataSource]="data" [displayedColumns]="columns">
  </amw-table>
</div>

<button (click)="isSortDisabled = !isSortDisabled">
  {{ isSortDisabled ? 'Enable' : 'Disable' }} Sorting
</button>

<!-- In component -->
isSortDisabled = false;`,

        sortHeader: `<!-- Sort Header Component -->
<table amw-table [dataSource]="data">
  <thead>
    <tr amwSort (amwSortChange)="onSortChange($event)">
      <th amw-sort-header="id">ID</th>
      <th amw-sort-header="name">Name</th>
      <th amw-sort-header="price" [disableClear]="true">Price</th>
      <th amw-sort-header="date" arrowPosition="before">Date</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let row of sortedData">
      <td>{{ row.id }}</td>
      <td>{{ row.name }}</td>
      <td>{{ row.price }}</td>
      <td>{{ row.date }}</td>
    </tr>
  </tbody>
</table>

<!-- amw-sort-header options -->
<!-- [disableClear]="true" - Prevents clearing sort (only asc/desc) -->
<!-- arrowPosition="before" - Shows sort arrow before text -->`
    };

    constructor() {
        super();
    }
}
