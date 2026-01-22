import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwCheckboxComponent } from '../../../../library/src/controls/components/amw-checkbox/amw-checkbox.component';
import { AmwIconComponent } from '../../../../library/src/components/components';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'amw-demo-data-table-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AmwCodeDocComponent,
    AmwButtonComponent,
    AmwCheckboxComponent,
    AmwIconComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './data-table-code.component.html',
  styleUrl: './data-table-code.component.scss'
})
export class DataTableCodeComponent implements OnInit {
  // Data for live preview examples
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumnsWithSelection: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  displayedColumnsWithActions: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];

  dataSource: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'}
  ];

  selection: PeriodicElement[] = [];

  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Table',
      description: 'Simple data table with static data',
      code: `<table mat-table [dataSource]="dataSource">
  <!-- Position Column -->
  <ng-container matColumnDef="position">
    <th mat-header-cell *matHeaderCellDef>No.</th>
    <td mat-cell *matCellDef="let element">{{element.position}}</td>
  </ng-container>

  <!-- Name Column -->
  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef>Name</th>
    <td mat-cell *matCellDef="let element">{{element.name}}</td>
  </ng-container>

  <!-- Weight Column -->
  <ng-container matColumnDef="weight">
    <th mat-header-cell *matHeaderCellDef>Weight</th>
    <td mat-cell *matCellDef="let element">{{element.weight}}</td>
  </ng-container>

  <!-- Symbol Column -->
  <ng-container matColumnDef="symbol">
    <th mat-header-cell *matHeaderCellDef>Symbol</th>
    <td mat-cell *matCellDef="let element">{{element.symbol}}</td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>`
    },
    {
      key: 'sorting',
      title: 'Sortable Table',
      description: 'Table with sortable columns',
      code: `<table mat-table [dataSource]="dataSource" matSort>
  <ng-container matColumnDef="position">
    <th mat-header-cell *matHeaderCellDef mat-sort-header>No.</th>
    <td mat-cell *matCellDef="let element">{{element.position}}</td>
  </ng-container>

  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
    <td mat-cell *matCellDef="let element">{{element.name}}</td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>`
    },
    {
      key: 'pagination',
      title: 'Table with Pagination',
      description: 'Add pagination controls to the table',
      code: `<table mat-table [dataSource]="dataSource">
  <!-- Column definitions here -->
  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>

<mat-paginator [pageSizeOptions]="[5, 10, 20]"
               showFirstLastButtons>
</mat-paginator>`
    },
    {
      key: 'selection',
      title: 'Table with Selection',
      description: 'Allow row selection with checkboxes',
      code: `<table mat-table [dataSource]="dataSource">
  <!-- Checkbox Column -->
  <ng-container matColumnDef="select">
    <th mat-header-cell *matHeaderCellDef>
      <amw-checkbox (change)="toggleAll()"
                    [checked]="isAllSelected()">
      </amw-checkbox>
    </th>
    <td mat-cell *matCellDef="let row">
      <amw-checkbox (change)="toggleRow(row)"
                    [checked]="isSelected(row)">
      </amw-checkbox>
    </td>
  </ng-container>

  <!-- Other columns... -->

  <tr mat-header-row *matHeaderRowDef="displayedColumnsWithSelection"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumnsWithSelection;"></tr>
</table>`
    },
    {
      key: 'actions',
      title: 'Table with Actions',
      description: 'Add action buttons to each row',
      code: `<table mat-table [dataSource]="dataSource">
  <!-- Regular columns... -->

  <!-- Actions Column -->
  <ng-container matColumnDef="actions">
    <th mat-header-cell *matHeaderCellDef>Actions</th>
    <td mat-cell *matCellDef="let element">
      <amw-button icon="edit" (click)="onEdit(element)">
      </amw-button>
      <amw-button icon="delete" (click)="onDelete(element)">
      </amw-button>
    </td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumnsWithActions"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumnsWithActions;"></tr>
</table>`
    },
    {
      key: 'filtering',
      title: 'Table with Filtering',
      description: 'Add search/filter functionality',
      code: `<amw-input
  label="Filter"
  (input)="applyFilter($event)"
  placeholder="Ex. Hydrogen">
</amw-input>

<table mat-table [dataSource]="dataSource">
  <!-- Column definitions here -->
  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>

// In component:
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}`
    }
  ];

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
  }

  // Selection methods
  isSelected(row: PeriodicElement): boolean {
    return this.selection.includes(row);
  }

  toggleRow(row: PeriodicElement) {
    const index = this.selection.indexOf(row);
    if (index === -1) {
      this.selection.push(row);
    } else {
      this.selection.splice(index, 1);
    }
  }

  isAllSelected(): boolean {
    return this.selection.length === this.dataSource.length;
  }

  toggleAll() {
    if (this.isAllSelected()) {
      this.selection = [];
    } else {
      this.selection = [...this.dataSource];
    }
  }

  // Action methods
  onEdit(element: PeriodicElement) {
    console.log('Edit:', element);
  }

  onDelete(element: PeriodicElement) {
    console.log('Delete:', element);
  }
}
