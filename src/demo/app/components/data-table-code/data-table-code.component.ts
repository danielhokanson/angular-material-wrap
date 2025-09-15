import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'amw-demo-data-table-code',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="data-table-code-demo">
      <h3>Data Table Code Examples</h3>
      <p>Code examples and implementation patterns for the data table component.</p>
      
      <mat-tab-group>
        <mat-tab label="Basic Usage">
          <div class="code-example">
            <h4>Basic Data Table</h4>
            <pre><code>{{ basicUsageCode }}</code></pre>
          </div>
        </mat-tab>
        
        <mat-tab label="With Actions">
          <div class="code-example">
            <h4>Data Table with Actions</h4>
            <pre><code>{{ actionsCode }}</code></pre>
          </div>
        </mat-tab>
        
        <mat-tab label="Editable Table">
          <div class="code-example">
            <h4>Editable Data Table</h4>
            <pre><code>{{ editableCode }}</code></pre>
          </div>
        </mat-tab>
        
        <mat-tab label="Custom Styling">
          <div class="code-example">
            <h4>Custom Styling</h4>
            <pre><code>{{ stylingCode }}</code></pre>
          </div>
        </mat-tab>
        
        <mat-tab label="TypeScript">
          <div class="code-example">
            <h4>Component TypeScript</h4>
            <pre><code>{{ typescriptCode }}</code></pre>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styleUrl: './data-table-code.component.scss'
})
export class DataTableCodeComponent implements OnInit {
  basicUsageCode = `<amw-data-table
  [data]="tableData"
  [columns]="tableColumns"
  [config]="tableConfig">
</amw-data-table>`;

  actionsCode = `<amw-data-table
  [data]="tableData"
  [columns]="tableColumns"
  [config]="tableConfig"
  (rowClick)="onRowClick($event)"
  (actionClick)="onActionClick($event)">
</amw-data-table>`;

  editableCode = `<amw-data-table
  [data]="tableData"
  [columns]="tableColumns"
  [config]="editableConfig"
  (rowUpdate)="onRowUpdate($event)"
  (rowDelete)="onRowDelete($event)">
</amw-data-table>`;

  stylingCode = `// Custom CSS
.amw-data-table {
  .table-header {
    background-color: #f5f5f5;
    font-weight: bold;
  }
  
  .table-row:hover {
    background-color: #e3f2fd;
  }
  
  .action-button {
    margin: 0 4px;
  }
}`;

  typescriptCode = `export class MyComponent {
  tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];

  tableColumns = [
    { key: 'name', title: 'Name', type: 'text' },
    { key: 'email', title: 'Email', type: 'email' }
  ];

  tableConfig = {
    editable: true,
    showActions: true,
    pageSize: 10
  };

  onRowClick(row: any): void {
    console.log('Row clicked:', row);
  }

  onActionClick(action: any): void {
    console.log('Action clicked:', action);
  }
}`;

  constructor() { }

  ngOnInit(): void { }
}