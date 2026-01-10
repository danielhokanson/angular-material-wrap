import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { Subject, takeUntil } from 'rxjs';

import { AmwDataTableComponent } from '../../../../library/src/components/components/amw-data-table/amw-data-table.component';
import {
    DataTableConfig,
    DataTableColumn,
    DataTableAction,
    DataTableSort,
    DataTableFilter,
    DataTableSelectionEvent,
    DataTableEditEvent
} from '../../../../library/src/components/components/amw-data-table/interfaces/data-table.interface';

/**
 * Data Table Demo Component
 * Demonstrates all features of the AMW Data Table component
 */import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
@Component({
    selector: 'app-data-table-demo',
    standalone: true,
    imports: [FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    AmwInputComponent,
    MatTooltipModule,
    AmwDataTableComponent,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    AmwButtonComponent],
    templateUrl: './data-table-demo.component.html',
    styleUrl: './data-table-demo.component.scss'
})
export class DataTableDemoComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();

    // Sample data
    sampleData: any[] = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            age: 28,
            department: 'Engineering',
            salary: 75000,
            active: true,
            joinDate: '2022-01-15',
            skills: ['Angular', 'TypeScript', 'Node.js']
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            age: 32,
            department: 'Marketing',
            salary: 65000,
            active: true,
            joinDate: '2021-11-20',
            skills: ['Marketing', 'SEO', 'Analytics']
        },
        {
            id: 3,
            name: 'Bob Johnson',
            email: 'bob.johnson@example.com',
            age: 45,
            department: 'Sales',
            salary: 80000,
            active: false,
            joinDate: '2020-03-10',
            skills: ['Sales', 'CRM', 'Negotiation']
        },
        {
            id: 4,
            name: 'Alice Brown',
            email: 'alice.brown@example.com',
            age: 29,
            department: 'Engineering',
            salary: 78000,
            active: true,
            joinDate: '2022-06-01',
            skills: ['React', 'JavaScript', 'CSS']
        },
        {
            id: 5,
            name: 'Charlie Wilson',
            email: 'charlie.wilson@example.com',
            age: 38,
            department: 'HR',
            salary: 60000,
            active: true,
            joinDate: '2021-09-15',
            skills: ['HR', 'Recruitment', 'Training']
        }
    ];

    // Table configuration
    tableConfig: DataTableConfig = {
        columns: [
            {
                id: 'id',
                label: 'ID',
                property: 'id',
                type: 'number',
                sortable: true,
                filterable: true,
                visible: true,
                width: '80px',
                align: 'center'
            },
            {
                id: 'name',
                label: 'Name',
                property: 'name',
                type: 'text',
                sortable: true,
                filterable: true,
                visible: true,
                width: '150px',
                editable: true,
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 50
                }
            },
            {
                id: 'email',
                label: 'Email',
                property: 'email',
                type: 'email',
                sortable: true,
                filterable: true,
                visible: true,
                width: '200px',
                editable: true,
                validation: {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                }
            },
            {
                id: 'age',
                label: 'Age',
                property: 'age',
                type: 'number',
                sortable: true,
                filterable: true,
                visible: true,
                width: '80px',
                align: 'center',
                editable: true,
                validation: {
                    required: true,
                    min: 18,
                    max: 100
                }
            },
            {
                id: 'department',
                label: 'Department',
                property: 'department',
                type: 'text',
                sortable: true,
                filterable: true,
                visible: true,
                width: '120px',
                editable: true,
                editor: {
                    type: 'select',
                    options: [
                        { value: 'Engineering', label: 'Engineering' },
                        { value: 'Marketing', label: 'Marketing' },
                        { value: 'Sales', label: 'Sales' },
                        { value: 'HR', label: 'HR' },
                        { value: 'Design', label: 'Design' },
                        { value: 'Finance', label: 'Finance' }
                    ]
                },
                validation: {
                    required: true
                }
            },
            {
                id: 'salary',
                label: 'Salary',
                property: 'salary',
                type: 'currency',
                sortable: true,
                filterable: true,
                visible: true,
                width: '120px',
                align: 'right',
                formatter: (value) => `$${value.toLocaleString()}`
            },
            {
                id: 'active',
                label: 'Active',
                property: 'active',
                type: 'boolean',
                sortable: true,
                filterable: true,
                visible: true,
                width: '80px',
                align: 'center',
                editable: true,
                editor: {
                    type: 'checkbox'
                },
                renderer: (value) => value ? '✓' : '✗'
            }
        ],
        actions: [
            {
                id: 'edit',
                label: 'Edit',
                icon: 'edit',
                type: 'button',
                color: 'primary',
                tooltip: 'Edit this record',
                handler: (row: any, index: number) => {
                    this.editRecord(row, index);
                }
            },
            {
                id: 'delete',
                label: 'Delete',
                icon: 'delete',
                type: 'button',
                color: 'warn',
                tooltip: 'Delete this record',
                confirmMessage: 'Are you sure you want to delete this record?',
                handler: (row: any, index: number) => {
                    this.deleteRecord(row, index);
                }
            }
        ],
        sortable: true,
        filterable: true,
        editable: true,
        selectable: true,
        selectionMode: 'multiple',
        paginated: true,
        pageSizeOptions: [5, 10, 25, 50],
        defaultPageSize: 10,
        showPageSizeSelector: true,
        showFirstLastButtons: true,
        loading: false,
        loadingMessage: 'Loading data...',
        emptyMessage: 'No records found',
        showHeader: true,
        showFooter: true,
        density: 'comfortable',
        striped: true,
        hoverable: true,
        responsive: true,
        showBorders: true,
        showRowBorders: true,
        showActions: true,
        actionsPosition: 'end',
        showSelection: true,
        selectionPosition: 'start',
        showTotalCount: true,
        totalCountLabel: 'Total Records'
    };

    // Demo state
    selectedRows: any[] = [];
    currentSort: DataTableSort | null = null;
    currentFilters: DataTableFilter[] = [];
    loading = false;

    constructor(private notification: AmwNotificationService) { }

    ngOnInit(): void {
        // Initialize demo
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    /**
     * Handle sort change
     */
    onSortChange(sort: DataTableSort | null): void {
        this.currentSort = sort;
        console.log('Sort changed:', sort);
    }

    /**
     * Handle filter change
     */
    onFilterChange(filters: DataTableFilter[]): void {
        this.currentFilters = filters;
        console.log('Filters changed:', filters);
    }

    /**
     * Handle page change
     */
    onPageChange(event: any): void {
        console.log('Page changed:', event);
    }

    /**
     * Handle selection change
     */
    onSelectionChange(selection: DataTableSelectionEvent): void {
        this.selectedRows = selection.selected;
        console.log('Selection changed:', selection);
    }

    /**
     * Handle edit change
     */
    onEditChange(event: DataTableEditEvent): void {
        console.log('Edit changed:', event);
    }

    /**
     * Handle action click
     */
    onActionClick(event: { action: DataTableAction; row: any; index: number }): void {
        console.log('Action clicked:', event);
    }

    /**
     * Edit record - this will be called when save is clicked in edit mode
     */
    editRecord(row: any, index: number): void {
        this.notification.success('Success', `Record saved: ${row.name}`, { duration: 3000 });
        console.log('Record saved:', row);
    }

    /**
     * Delete record
     */
    deleteRecord(row: any, index: number): void {
        this.notification.info('Info', `Delete record: ${row.name}`, { duration: 3000 });
    }

    /**
     * Toggle loading state
     */
    toggleLoading(): void {
        this.loading = !this.loading;
        this.tableConfig = { ...this.tableConfig, loading: this.loading };
    }

    /**
     * Add sample record
     */
    addSampleRecord(): void {
        const newRecord = {
            id: this.sampleData.length + 1,
            name: `New User ${this.sampleData.length + 1}`,
            email: `user${this.sampleData.length + 1}@example.com`,
            age: Math.floor(Math.random() * 30) + 25,
            department: ['Engineering', 'Marketing', 'Sales', 'HR', 'Design', 'Finance'][Math.floor(Math.random() * 6)],
            salary: Math.floor(Math.random() * 50000) + 50000,
            active: Math.random() > 0.5,
            joinDate: new Date().toISOString().split('T')[0],
            skills: ['New Skill', 'Another Skill']
        };

        this.sampleData = [...this.sampleData, newRecord];
        this.notification.info('Info', 'New record added', { duration: 3000 });
    }

    /**
     * Clear selection
     */
    clearSelection(): void {
        this.selectedRows = [];
    }

    /**
     * Export data
     */
    exportData(): void {
        this.notification.info('Info', 'Exporting data...', { duration: 3000 });
    }

    /**
     * Refresh data
     */
    refreshData(): void {
        this.loading = true;
        this.tableConfig = { ...this.tableConfig, loading: true };

        setTimeout(() => {
            this.loading = false;
            this.tableConfig = { ...this.tableConfig, loading: false };
            this.notification.info('Info', 'Data refreshed', { duration: 3000 });
        }, 2000);
    }
}