import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { AmwDataTableComponent } from '../../../../library/src/controls/components/amw-data-table/amw-data-table.component';
import { DataTableColumn, DataTableAction, DataTableConfig } from '../../../../library/src/controls/components/amw-data-table/interfaces';

@Component({
    selector: 'amw-demo-data-table',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        AmwDataTableComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './data-table-demo.component.html',
    styleUrl: './data-table-demo.component.scss'
})
export class DataTableDemoComponent {
    sampleData = [
        { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, salary: 75000, department: 'Engineering', active: true, joinDate: '2020-01-15', role: 'Senior Developer', location: 'San Francisco', skills: ['Angular', 'TypeScript', 'Node.js'] },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 28, salary: 82000, department: 'Marketing', active: true, joinDate: '2019-03-22', role: 'Marketing Manager', location: 'New York', skills: ['Digital Marketing', 'Analytics', 'SEO'] },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35, salary: 68000, department: 'Sales', active: false, joinDate: '2021-06-10', role: 'Sales Representative', location: 'Chicago', skills: ['CRM', 'Negotiation', 'Lead Generation'] },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', age: 32, salary: 91000, department: 'Engineering', active: true, joinDate: '2018-11-05', role: 'Tech Lead', location: 'Seattle', skills: ['React', 'Python', 'AWS'] },
        { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', age: 29, salary: 73000, department: 'HR', active: true, joinDate: '2022-02-14', role: 'HR Specialist', location: 'Austin', skills: ['Recruitment', 'Employee Relations', 'Benefits'] },
        { id: 6, name: 'Diana Davis', email: 'diana@example.com', age: 31, salary: 88000, department: 'Marketing', active: false, joinDate: '2020-09-18', role: 'Brand Manager', location: 'Los Angeles', skills: ['Brand Strategy', 'Content Marketing', 'Social Media'] },
        { id: 7, name: 'Eve Miller', email: 'eve@example.com', age: 27, salary: 65000, department: 'Sales', active: true, joinDate: '2023-01-08', role: 'Junior Sales Rep', location: 'Miami', skills: ['Cold Calling', 'Prospecting', 'Presentation'] },
        { id: 8, name: 'Frank Garcia', email: 'frank@example.com', age: 33, salary: 95000, department: 'Engineering', active: true, joinDate: '2017-12-03', role: 'Principal Engineer', location: 'Boston', skills: ['System Architecture', 'Microservices', 'DevOps'] },
        { id: 9, name: 'Grace Lee', email: 'grace@example.com', age: 26, salary: 70000, department: 'Design', active: true, joinDate: '2022-05-20', role: 'UX Designer', location: 'Portland', skills: ['Figma', 'User Research', 'Prototyping'] },
        { id: 10, name: 'Henry Kim', email: 'henry@example.com', age: 38, salary: 105000, department: 'Engineering', active: true, joinDate: '2016-08-12', role: 'Engineering Manager', location: 'Denver', skills: ['Team Leadership', 'Project Management', 'Java'] },
        { id: 11, name: 'Ivy Chen', email: 'ivy@example.com', age: 24, salary: 60000, department: 'Marketing', active: true, joinDate: '2023-03-15', role: 'Marketing Coordinator', location: 'Phoenix', skills: ['Content Creation', 'Email Marketing', 'Event Planning'] },
        { id: 12, name: 'Jack Wilson', email: 'jack@example.com', age: 41, salary: 120000, department: 'Sales', active: true, joinDate: '2015-01-10', role: 'Sales Director', location: 'Dallas', skills: ['Strategic Planning', 'Team Building', 'Revenue Growth'] }
    ];

    columns: DataTableColumn[] = [
        { key: 'id', label: 'ID', type: 'number', sortable: true, width: '80px' },
        { key: 'name', label: 'Name', type: 'text', sortable: true, filterable: true },
        { key: 'email', label: 'Email', type: 'text', sortable: true, filterable: true },
        { key: 'age', label: 'Age', type: 'number', sortable: true, filterable: true, width: '80px' },
        { key: 'salary', label: 'Salary', type: 'currency', sortable: true, filterable: true, currency: 'USD' },
        { key: 'department', label: 'Department', type: 'text', sortable: true, filterable: true },
        { key: 'role', label: 'Role', type: 'text', sortable: true, filterable: true },
        { key: 'location', label: 'Location', type: 'text', sortable: true, filterable: true },
        { key: 'active', label: 'Active', type: 'boolean', sortable: true, filterable: true, width: '100px' },
        { key: 'joinDate', label: 'Join Date', type: 'date', sortable: true, filterable: true }
    ];

    extendedColumns: DataTableColumn[] = [
        { key: 'id', label: 'ID', type: 'number', sortable: true, width: '60px' },
        { key: 'name', label: 'Name', type: 'text', sortable: true, filterable: true },
        { key: 'email', label: 'Email', type: 'text', sortable: true, filterable: true },
        { key: 'age', label: 'Age', type: 'number', sortable: true, filterable: true, width: '60px' },
        { key: 'salary', label: 'Salary', type: 'currency', sortable: true, filterable: true, currency: 'USD' },
        { key: 'department', label: 'Department', type: 'text', sortable: true, filterable: true },
        { key: 'role', label: 'Role', type: 'text', sortable: true, filterable: true },
        { key: 'location', label: 'Location', type: 'text', sortable: true, filterable: true },
        { key: 'skills', label: 'Skills', type: 'text', sortable: false, filterable: true, formatter: (value) => Array.isArray(value) ? value.join(', ') : value },
        { key: 'active', label: 'Active', type: 'boolean', sortable: true, filterable: true, width: '80px' },
        { key: 'joinDate', label: 'Join Date', type: 'date', sortable: true, filterable: true }
    ];

    actions: DataTableAction[] = [
        { key: 'edit', label: 'Edit', icon: 'edit', color: 'primary' },
        { key: 'delete', label: 'Delete', icon: 'delete', color: 'warn' },
        { key: 'view', label: 'View', icon: 'visibility' }
    ];

    advancedActions: DataTableAction[] = [
        { key: 'edit', label: 'Edit', icon: 'edit', color: 'primary' },
        { key: 'delete', label: 'Delete', icon: 'delete', color: 'warn', disabled: (row) => row.active },
        { key: 'view', label: 'View', icon: 'visibility' },
        { key: 'email', label: 'Send Email', icon: 'email', color: 'accent' },
        { key: 'profile', label: 'View Profile', icon: 'person' }
    ];

    dataTableVariations = [
        {
            title: 'Basic Data Table',
            description: 'Simple data table with sorting and pagination',
            dataTable: {
                data: this.sampleData,
                columns: this.columns,
                config: { pageSize: 5 }
            }
        },
        {
            title: 'With Selection',
            description: 'Data table with row selection capabilities',
            dataTable: {
                data: this.sampleData,
                columns: this.columns,
                selectable: true,
                multiSelect: true,
                config: { pageSize: 5 }
            }
        },
        {
            title: 'With Actions',
            description: 'Data table with action buttons for each row',
            dataTable: {
                data: this.sampleData,
                columns: this.columns,
                actions: this.actions,
                config: { pageSize: 5 }
            }
        },
        {
            title: 'Advanced Actions',
            description: 'Data table with conditional actions and multiple options',
            dataTable: {
                data: this.sampleData,
                columns: this.columns,
                actions: this.advancedActions,
                config: { pageSize: 5 }
            }
        },
        {
            title: 'With Filtering',
            description: 'Data table with search and column filters',
            dataTable: {
                data: this.sampleData,
                columns: this.columns,
                filterable: true,
                config: { pageSize: 5 }
            }
        },
        {
            title: 'Extended Data',
            description: 'Data table with more columns and complex data formatting',
            dataTable: {
                data: this.sampleData,
                columns: this.extendedColumns,
                filterable: true,
                config: { pageSize: 4 }
            }
        },
        {
            title: 'Small Size',
            description: 'Compact data table variant',
            dataTable: {
                data: this.sampleData,
                columns: this.columns,
                config: { size: 'small' as 'small' | 'medium' | 'large', pageSize: 6 }
            }
        },
        {
            title: 'Large Size',
            description: 'Larger data table variant',
            dataTable: {
                data: this.sampleData,
                columns: this.columns,
                config: { size: 'large' as 'small' | 'medium' | 'large', pageSize: 4 }
            }
        },
        {
            title: 'No Pagination',
            description: 'Data table without pagination',
            dataTable: {
                data: this.sampleData.slice(0, 8),
                columns: this.columns,
                pageable: false
            }
        },
        {
            title: 'Loading State',
            description: 'Data table in loading state',
            dataTable: {
                data: [],
                columns: this.columns,
                loading: true,
                config: { pageSize: 5 }
            }
        },
        {
            title: 'Empty State',
            description: 'Data table with no data',
            dataTable: {
                data: [],
                columns: this.columns,
                config: { pageSize: 5 }
            }
        },
        {
            title: 'Full Featured',
            description: 'Data table with all features enabled',
            dataTable: {
                data: this.sampleData,
                columns: this.extendedColumns,
                actions: this.advancedActions,
                selectable: true,
                multiSelect: true,
                filterable: true,
                config: { pageSize: 4 }
            }
        }
    ];

    onDataChange(data: any[], index: number) {
        console.log(`Data table ${index} data changed:`, data);
    }

    onSelectionChange(selection: any[], index: number) {
        console.log(`Data table ${index} selection changed:`, selection);
    }

    onSortChange(sort: any, index: number) {
        console.log(`Data table ${index} sort changed:`, sort);
    }

    onPageChange(page: any, index: number) {
        console.log(`Data table ${index} page changed:`, page);
    }

    onFilterChange(filters: any[], index: number) {
        console.log(`Data table ${index} filters changed:`, filters);
    }

    onActionClick(event: { action: DataTableAction; row: any; index: number }, tableIndex: number) {
        console.log(`Data table ${tableIndex} action clicked:`, event);
    }
}
