import { Component, Input, Output, EventEmitter, ViewEncapsulation, forwardRef, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BaseComponent } from '../base/base.component';
import { DataTableConfig, DataTableColumn, DataTableAction, DataTableFilter, DataTableSort, DataTablePage } from './interfaces';

@Component({
    selector: 'amw-data-table',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatMenuModule,
        MatTooltipModule,
        MatProgressSpinnerModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-data-table.component.html',
    styleUrl: './amw-data-table.component.scss',
    providers: [
        {
            provide: forwardRef(() => AmwDataTableComponent),
            multi: true
        }
    ]
})
export class AmwDataTableComponent extends BaseComponent implements OnInit, OnChanges {
    @Input() override set value(val: any[]) {
        this._value = val;
        this.data = val || [];
        this.updateDisplayedData();
    }
    override get value(): any[] {
        return this._value || [];
    }
    @Input() config: DataTableConfig = {};
    @Input() columns: DataTableColumn[] = [];
    @Input() actions: DataTableAction[] = [];
    @Input() filters: DataTableFilter[] = [];
    @Input() selectable = false;
    @Input() multiSelect = false;
    @Input() sortable = true;
    @Input() filterable = true;
    @Input() pageable = true;
    @Input() loading = false;
    @Input() emptyMessage = 'No data available';
    @Input() noDataIcon = 'inbox';

    @Output() dataChange = new EventEmitter<any[]>();
    @Output() selectionChange = new EventEmitter<any[]>();
    @Output() sortChange = new EventEmitter<DataTableSort>();
    @Output() pageChange = new EventEmitter<DataTablePage>();
    @Output() filterChange = new EventEmitter<DataTableFilter[]>();
    @Output() actionClick = new EventEmitter<{ action: DataTableAction; row: any; index: number }>();

    data: any[] = [];
    displayedData: any[] = [];
    selectedRows: any[] = [];
    selectedRow: any = null;
    sort: DataTableSort = { column: '', direction: 'asc' };
    page: DataTablePage = { pageIndex: 0, pageSize: 10, length: 0 };
    searchTerm = '';
    columnFilters: { [key: string]: string } = {};

    displayedColumns: string[] = [];
    allSelected = false;
    someSelected = false;

    ngOnInit() {
        this.updateDisplayedColumns();
        this.updateDisplayedData();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['columns']) {
            this.updateDisplayedColumns();
        }
        if (changes['data'] || changes['value']) {
            this.updateDisplayedData();
        }
    }

    updateDisplayedColumns() {
        const cols = [...this.columns.map(col => col.key)];
        if (this.selectable) {
            cols.unshift('select');
        }
        if (this.actions.length > 0) {
            cols.push('actions');
        }
        this.displayedColumns = cols;
    }

    updateDisplayedData() {
        let filteredData = [...this.data];

        // Apply search filter
        if (this.searchTerm) {
            filteredData = filteredData.filter(row => {
                return this.columns.some(col => {
                    const value = this.getCellValue(row, col);
                    return value && value.toString().toLowerCase().includes(this.searchTerm.toLowerCase());
                });
            });
        }

        // Apply column filters
        Object.keys(this.columnFilters).forEach(key => {
            const filterValue = this.columnFilters[key];
            if (filterValue) {
                filteredData = filteredData.filter(row => {
                    const value = this.getCellValue(row, { key });
                    return value && value.toString().toLowerCase().includes(filterValue.toLowerCase());
                });
            }
        });

        // Apply sorting
        if (this.sort.column) {
            filteredData.sort((a, b) => {
                const aVal = this.getCellValue(a, { key: this.sort.column });
                const bVal = this.getCellValue(b, { key: this.sort.column });

                if (aVal < bVal) return this.sort.direction === 'asc' ? -1 : 1;
                if (aVal > bVal) return this.sort.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        // Update page length
        this.page.length = filteredData.length;

        // Apply pagination
        if (this.pageable) {
            const startIndex = this.page.pageIndex * this.page.pageSize;
            const endIndex = startIndex + this.page.pageSize;
            this.displayedData = filteredData.slice(startIndex, endIndex);
        } else {
            this.displayedData = filteredData;
        }
    }

    getCellValue(row: any, column: { key: string }): any {
        return column.key.split('.').reduce((obj, key) => obj?.[key], row);
    }

    onSortChange(sort: Sort) {
        this.sort = {
            column: sort.active,
            direction: sort.direction as 'asc' | 'desc'
        };
        this.updateDisplayedData();
        this.sortChange.emit(this.sort);
    }

    onPageChange(event: PageEvent) {
        this.page = {
            pageIndex: event.pageIndex,
            pageSize: event.pageSize,
            length: event.length
        };
        this.updateDisplayedData();
        this.pageChange.emit(this.page);
    }

    onSearchChange() {
        this.page.pageIndex = 0;
        this.updateDisplayedData();
    }

    onColumnFilterChange(columnKey: string, value: string) {
        this.columnFilters[columnKey] = value;
        this.page.pageIndex = 0;
        this.updateDisplayedData();
        this.filterChange.emit(this.filters);
    }

    onSelectAllChange(checked: boolean) {
        if (checked) {
            this.selectedRows = [...this.displayedData];
        } else {
            this.selectedRows = [];
        }
        this.updateSelectionState();
        this.selectionChange.emit(this.selectedRows);
    }

    onRowSelectChange(row: any, checked: boolean) {
        if (checked) {
            if (this.multiSelect) {
                this.selectedRows.push(row);
            } else {
                this.selectedRows = [row];
                this.selectedRow = row;
            }
        } else {
            this.selectedRows = this.selectedRows.filter(r => r !== row);
            if (this.selectedRow === row) {
                this.selectedRow = null;
            }
        }
        this.updateSelectionState();
        this.selectionChange.emit(this.selectedRows);
    }

    updateSelectionState() {
        this.allSelected = this.displayedData.length > 0 && this.selectedRows.length === this.displayedData.length;
        this.someSelected = this.selectedRows.length > 0 && !this.allSelected;
    }

    onActionClick(action: DataTableAction, row: any, index: number) {
        this.actionClick.emit({ action, row, index });
    }

    clearFilters() {
        this.searchTerm = '';
        this.columnFilters = {};
        this.page.pageIndex = 0;
        this.updateDisplayedData();
    }

    exportData(format: 'csv' | 'json' = 'csv') {
        const dataToExport = this.selectedRows.length > 0 ? this.selectedRows : this.displayedData;

        if (format === 'csv') {
            this.exportToCSV(dataToExport);
        } else {
            this.exportToJSON(dataToExport);
        }
    }

    private exportToCSV(data: any[]) {
        const headers = this.columns.map(col => col.label || col.key);
        const csvContent = [
            headers.join(','),
            ...data.map(row =>
                this.columns.map(col => {
                    const value = this.getCellValue(row, col);
                    return `"${value || ''}"`;
                }).join(',')
            )
        ].join('\n');

        this.downloadFile(csvContent, 'data.csv', 'text/csv');
    }

    private exportToJSON(data: any[]) {
        const jsonContent = JSON.stringify(data, null, 2);
        this.downloadFile(jsonContent, 'data.json', 'application/json');
    }

    private downloadFile(content: string, filename: string, mimeType: string) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    }

    getCellDisplayValue(row: any, column: DataTableColumn): string {
        const value = this.getCellValue(row, column);

        if (column.type === 'date' && value) {
            return new Date(value).toLocaleDateString();
        }

        if (column.type === 'currency' && value !== null && value !== undefined) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: column.currency || 'USD'
            }).format(value);
        }

        if (column.type === 'number' && value !== null && value !== undefined) {
            return new Intl.NumberFormat('en-US', {
                minimumFractionDigits: column.decimals || 0,
                maximumFractionDigits: column.decimals || 0
            }).format(value);
        }

        if (column.type === 'boolean') {
            return value ? 'Yes' : 'No';
        }

        return value?.toString() || '';
    }

    isRowSelected(row: any): boolean {
        return this.selectedRows.includes(row);
    }

    get hasData(): boolean {
        return this.displayedData.length > 0;
    }

    get hasFilters(): boolean {
        return !!this.searchTerm || Object.values(this.columnFilters).some(v => !!v);
    }
}
