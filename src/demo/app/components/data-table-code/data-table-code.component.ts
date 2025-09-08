import { Component, ViewEncapsulation } from '@angular/core';
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
    templateUrl: './data-table-code.component.html',
    styleUrl: './data-table-code.component.scss'
})
export class DataTableCodeComponent {
    codeExamples = {
        basic: {
            title: 'Basic Data Table',
            description: 'Simple data table with sorting and pagination',
            html: `<amw-data-table
  [value]="users"
  [columns]="columns"
  [config]="{ pageSize: 10 }">
</amw-data-table>`,
            typescript: `export class MyComponent {
  users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 28 }
  ];

  columns: DataTableColumn[] = [
    { key: 'id', label: 'ID', type: 'number', sortable: true },
    { key: 'name', label: 'Name', type: 'text', sortable: true },
    { key: 'email', label: 'Email', type: 'text', sortable: true },
    { key: 'age', label: 'Age', type: 'number', sortable: true }
  ];
}`
        },
        selection: {
            title: 'With Selection',
            description: 'Data table with row selection capabilities',
            html: `<amw-data-table
  [value]="users"
  [columns]="columns"
  [selectable]="true"
  [multiSelect]="true"
  (selectionChange)="onSelectionChange($event)">
</amw-data-table>`,
            typescript: `export class MyComponent {
  selectedUsers: any[] = [];

  onSelectionChange(selection: any[]) {
    this.selectedUsers = selection;
    console.log('Selected users:', selection);
  }
}`
        },
        actions: {
            title: 'With Actions',
            description: 'Data table with action buttons for each row',
            html: `<amw-data-table
  [value]="users"
  [columns]="columns"
  [actions]="actions"
  (actionClick)="onActionClick($event)">
</amw-data-table>`,
            typescript: `export class MyComponent {
  actions: DataTableAction[] = [
    { key: 'edit', label: 'Edit', icon: 'edit', color: 'primary' },
    { key: 'delete', label: 'Delete', icon: 'delete', color: 'warn' }
  ];

  onActionClick(event: { action: DataTableAction; row: any; index: number }) {
    const { action, row } = event;
    if (action.key === 'edit') {
      this.editUser(row);
    } else if (action.key === 'delete') {
      this.deleteUser(row);
    }
  }
}`
        },
        filtering: {
            title: 'With Filtering',
            description: 'Data table with search and column filters',
            html: `<amw-data-table
  [value]="users"
  [columns]="columns"
  [filterable]="true"
  (filterChange)="onFilterChange($event)">
</amw-data-table>`,
            typescript: `export class MyComponent {
  onFilterChange(filters: DataTableFilter[]) {
    console.log('Filters changed:', filters);
  }
}`
        },
        configuration: {
            title: 'Advanced Configuration',
            description: 'Data table with custom configuration',
            html: `<amw-data-table
  [value]="users"
  [columns]="columns"
  [actions]="actions"
  [selectable]="true"
  [multiSelect]="true"
  [filterable]="true"
  [config]="tableConfig"
  (dataChange)="onDataChange($event)"
  (selectionChange)="onSelectionChange($event)"
  (sortChange)="onSortChange($event)"
  (pageChange)="onPageChange($event)">
</amw-data-table>`,
            typescript: `export class MyComponent {
  tableConfig: DataTableConfig = {
    size: 'medium',
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 50],
    showFirstLastButtons: true,
    striped: true,
    hoverable: true
  };

  onDataChange(data: any[]) {
    console.log('Data changed:', data);
  }

  onSelectionChange(selection: any[]) {
    console.log('Selection changed:', selection);
  }

  onSortChange(sort: DataTableSort) {
    console.log('Sort changed:', sort);
  }

  onPageChange(page: DataTablePage) {
    console.log('Page changed:', page);
  }
}`
        },
        customColumns: {
            title: 'Custom Column Formatting',
            description: 'Data table with custom column formatters and complex data',
            html: `<amw-data-table
  [value]="employees"
  [columns]="customColumns"
  [filterable]="true"
  [config]="{ pageSize: 8 }">
</amw-data-table>`,
            typescript: `export class MyComponent {
  employees = [
    { 
      id: 1, 
      name: 'John Doe', 
      salary: 75000, 
      skills: ['Angular', 'TypeScript', 'Node.js'],
      joinDate: '2020-01-15',
      active: true
    }
  ];

  customColumns: DataTableColumn[] = [
    { key: 'id', label: 'ID', type: 'number', sortable: true, width: '60px' },
    { key: 'name', label: 'Name', type: 'text', sortable: true, filterable: true },
    { 
      key: 'salary', 
      label: 'Salary', 
      type: 'currency', 
      sortable: true, 
      currency: 'USD',
      formatter: (value) => \`\${value.toLocaleString()}\`
    },
    { 
      key: 'skills', 
      label: 'Skills', 
      type: 'text', 
      sortable: false, 
      filterable: true,
      formatter: (value) => Array.isArray(value) ? value.join(', ') : value
    },
    { key: 'joinDate', label: 'Join Date', type: 'date', sortable: true },
    { key: 'active', label: 'Active', type: 'boolean', sortable: true }
  ];
}`
        },
        conditionalActions: {
            title: 'Conditional Actions',
            description: 'Data table with conditional action buttons based on row data',
            html: `<amw-data-table
  [value]="users"
  [columns]="columns"
  [actions]="conditionalActions"
  [config]="{ pageSize: 6 }">
</amw-data-table>`,
            typescript: `export class MyComponent {
  conditionalActions: DataTableAction[] = [
    { key: 'edit', label: 'Edit', icon: 'edit', color: 'primary' },
    { 
      key: 'delete', 
      label: 'Delete', 
      icon: 'delete', 
      color: 'warn',
      disabled: (row) => row.active, // Disable delete for active users
      visible: (row) => row.role !== 'admin' // Hide for admin users
    },
    { 
      key: 'activate', 
      label: 'Activate', 
      icon: 'check_circle', 
      color: 'accent',
      visible: (row) => !row.active // Only show for inactive users
    },
    { 
      key: 'deactivate', 
      label: 'Deactivate', 
      icon: 'cancel', 
      color: 'warn',
      visible: (row) => row.active // Only show for active users
    }
  ];

  onActionClick(event: { action: DataTableAction; row: any; index: number }) {
    const { action, row } = event;
    switch (action.key) {
      case 'edit':
        this.editUser(row);
        break;
      case 'delete':
        this.deleteUser(row);
        break;
      case 'activate':
        this.activateUser(row);
        break;
      case 'deactivate':
        this.deactivateUser(row);
        break;
    }
  }
}`
        }
    };

    copyToClipboard(code: string) {
        navigator.clipboard.writeText(code).then(() => {
            console.log('Code copied to clipboard');
        });
    }
}
