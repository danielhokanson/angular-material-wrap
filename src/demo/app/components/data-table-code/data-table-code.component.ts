import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
    FormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './data-table-code.component.html',
  styleUrl: './data-table-code.component.scss'
})
export class DataTableCodeComponent {
  // Data for live preview examples
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumnsWithSelection: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  displayedColumnsWithActions: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];

  dataSource: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  ];

  selection: PeriodicElement[] = [];

  // Editable code examples
  editableCode = {
    basic: '',
    sorting: '',
    pagination: '',
    selection: '',
    actions: '',
    filtering: ''
  };

  // Original code examples (for reset functionality)
  readonly codeExamples = {
    basic: `<table mat-table [dataSource]="dataSource">
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
</table>`,

    sorting: `<table mat-table [dataSource]="dataSource" matSort>
  <ng-container matColumnDef="position">
    <th mat-header-cell *matHeaderCellDef mat-sort-header>No.</th>
    <td mat-cell *matCellDef="let element">{{element.position}}</td>
  </ng-container>

  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
    <td mat-cell *matCellDef="let element">{{element.name}}</td>
  </ng-container>

  <ng-container matColumnDef="weight">
    <th mat-header-cell *matHeaderCellDef mat-sort-header>Weight</th>
    <td mat-cell *matCellDef="let element">{{element.weight}}</td>
  </ng-container>

  <ng-container matColumnDef="symbol">
    <th mat-header-cell *matHeaderCellDef mat-sort-header>Symbol</th>
    <td mat-cell *matCellDef="let element">{{element.symbol}}</td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>`,

    pagination: `<table mat-table [dataSource]="dataSource">
  <!-- Column definitions here -->
  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>

<mat-paginator [pageSizeOptions]="[5, 10, 20]"
               showFirstLastButtons>
</mat-paginator>`,

    selection: `<table mat-table [dataSource]="dataSource">
  <!-- Checkbox Column -->
  <ng-container matColumnDef="select">
    <th mat-header-cell *matHeaderCellDef>
      <mat-checkbox (change)="toggleAll()"
                    [checked]="isAllSelected()">
      </mat-checkbox>
    </th>
    <td mat-cell *matCellDef="let row">
      <mat-checkbox (change)="toggleRow(row)"
                    [checked]="isSelected(row)">
      </mat-checkbox>
    </td>
  </ng-container>

  <!-- Other columns... -->

  <tr mat-header-row *matHeaderRowDef="displayedColumnsWithSelection"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumnsWithSelection;"></tr>
</table>`,

    actions: `<table mat-table [dataSource]="dataSource">
  <!-- Regular columns... -->

  <!-- Actions Column -->
  <ng-container matColumnDef="actions">
    <th mat-header-cell *matHeaderCellDef>Actions</th>
    <td mat-cell *matCellDef="let element">
      <button mat-icon-button (click)="onEdit(element)">
        <mat-icon>edit</mat-icon>
      </button>
      <button mat-icon-button (click)="onDelete(element)">
        <mat-icon>delete</mat-icon>
      </button>
    </td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumnsWithActions"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumnsWithActions;"></tr>
</table>`,

    filtering: `<mat-form-field>
  <mat-label>Filter</mat-label>
  <input matInput (keyup)="applyFilter($event)" placeholder="Ex. Hydrogen">
</mat-form-field>

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
  };

  constructor() {
    // Initialize editable code
    Object.keys(this.codeExamples).forEach(key => {
      this.editableCode[key as keyof typeof this.codeExamples] =
        this.codeExamples[key as keyof typeof this.codeExamples];
    });
  }

  // Reset code to original
  resetCode(exampleKey: keyof typeof this.codeExamples) {
    this.editableCode[exampleKey] = this.codeExamples[exampleKey];
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
