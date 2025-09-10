import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnInit, OnChanges, SimpleChanges, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Subject, takeUntil } from 'rxjs';

import { BaseComponent } from '../base/base.component';
import { 
    DataTableConfig, 
    DataTableColumn, 
    DataTableAction, 
    DataTableSort, 
    DataTableFilter, 
    DataTablePagination,
    DataTableSelectionEvent,
    DataTableEditEvent
} from './interfaces/data-table.interface';

/**
 * AMW Data Table Component
 * A comprehensive data table with sorting, filtering, pagination, selection, and editing capabilities
 */
@Component({
    selector: 'amw-data-table',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatMenuModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatSlideToggleModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-data-table.component.html',
    styleUrl: './amw-data-table.component.scss'
})
export class AmwDataTableComponent extends BaseComponent implements OnInit, OnChanges, OnDestroy {
    // Input properties
    @Input() data: any[] = [];
    @Input() config: DataTableConfig | null = null;
    @Input() loading: boolean = false;
    @Input() loadingMessage: string = 'Loading...';
    @Input() emptyMessage: string = 'No data available';
    
    // Output events
    @Output() sortChange = new EventEmitter<DataTableSort>();
    @Output() filterChange = new EventEmitter<DataTableFilter[]>();
    @Output() pageChange = new EventEmitter<PageEvent>();
    @Output() selectionChange = new EventEmitter<DataTableSelectionEvent>();
    @Output() editChange = new EventEmitter<DataTableEditEvent>();
    @Output() actionClick = new EventEmitter<{ action: DataTableAction; row: any; index: number }>();
    
    // Internal state
    displayedColumns: string[] = [];
    filteredData: any[] = [];
    selectedRows: Set<any> = new Set();
    editingRow: any = null;
    editingIndex: number = -1;
    editingValues: { [key: string]: any } = {};
    editingErrors: { [key: string]: string[] } = {};
    
    // Pagination
    pagination: DataTablePagination = {
        pageIndex: 0,
        pageSize: 10,
        length: 0,
        pageSizeOptions: [5, 10, 25, 50, 100],
        showFirstLastButtons: true,
        hidePageSize: false
    };
    
    // Sorting
    currentSort: DataTableSort | null = null;
    
    // Filtering
    globalFilter: string = '';
    columnFilters: { [key: string]: any } = {};
    
    // Destroy subject
    private destroy$ = new Subject<void>();
    
    constructor(private cdr: ChangeDetectorRef) {
        super();
    }
    
    ngOnInit(): void {
        this.initializeComponent();
    }
    
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data'] || changes['config']) {
            this.initializeComponent();
        }
    }
    
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
    
    /**
     * Initialize component
     */
    private initializeComponent(): void {
        if (this.config) {
            this.setupColumns();
            this.setupPagination();
            this.applyFilters();
        }
    }
    
    /**
     * Setup table columns
     */
    private setupColumns(): void {
        if (!this.config?.columns) return;
        
        this.displayedColumns = this.config.columns
            .filter(col => col.visible !== false)
            .map(col => col.property);
            
        // Add selection column if enabled
        if (this.config.selectable && this.config.selectionMode !== 'none') {
            if (this.config.selectionPosition === 'start') {
                this.displayedColumns.unshift('select');
            } else {
                this.displayedColumns.push('select');
            }
        }
        
        // Add actions column if enabled
        if (this.config.actions && this.config.actions.length > 0) {
            if (this.config.actionsPosition === 'start') {
                this.displayedColumns.unshift('actions');
            } else {
                this.displayedColumns.push('actions');
            }
        }
    }
    
    /**
     * Setup pagination
     */
    private setupPagination(): void {
        if (!this.config?.paginated) return;
        
        this.pagination = {
            pageIndex: 0,
            pageSize: this.config.defaultPageSize || 10,
            length: this.data.length,
            pageSizeOptions: this.config.pageSizeOptions || [5, 10, 25, 50, 100],
            showFirstLastButtons: this.config.showFirstLastButtons !== false,
            hidePageSize: this.config.showPageSizeSelector === false
        };
    }
    
    /**
     * Apply filters to data
     */
    private applyFilters(): void {
        let filtered = [...this.data];
        
        // Apply global filter
        if (this.globalFilter) {
            filtered = filtered.filter(row => 
                this.config?.columns?.some(col => 
                    col.filterable !== false && 
                    this.matchesFilter(row[col.property], this.globalFilter)
                )
            );
        }
        
        // Apply column filters
        Object.keys(this.columnFilters).forEach(column => {
            const filterValue = this.columnFilters[column];
            if (filterValue !== null && filterValue !== undefined && filterValue !== '') {
                filtered = filtered.filter(row => 
                    this.matchesFilter(row[column], filterValue)
                );
            }
        });
        
        this.filteredData = filtered;
        this.pagination.length = filtered.length;
    }
    
    /**
     * Check if value matches filter
     */
    private matchesFilter(value: any, filter: any): boolean {
        if (value === null || value === undefined) return false;
        
        const strValue = String(value).toLowerCase();
        const strFilter = String(filter).toLowerCase();
        
        return strValue.includes(strFilter);
    }
    
    /**
     * Handle sort change
     */
    onSortChange(sort: Sort): void {
        if (!sort.active || !sort.direction) {
            this.currentSort = null;
            return;
        }
        
        this.currentSort = {
            column: sort.active,
            direction: sort.direction as 'asc' | 'desc'
        };
        
        this.sortChange.emit(this.currentSort);
    }
    
    /**
     * Handle page change
     */
    onPageChange(event: PageEvent): void {
        this.pagination.pageIndex = event.pageIndex;
        this.pagination.pageSize = event.pageSize;
        this.pagination.length = event.length;
        
        this.pageChange.emit(event);
    }
    
    /**
     * Handle global filter change
     */
    onGlobalFilterChange(): void {
        this.applyFilters();
    }
    
    /**
     * Handle column filter change
     */
    onColumnFilterChange(column: string, value: any): void {
        this.columnFilters[column] = value;
        this.applyFilters();
    }
    
    /**
     * Handle row selection
     */
    onRowSelectionChange(row: any, selected: boolean): void {
        if (selected) {
            this.selectedRows.add(row);
        } else {
            this.selectedRows.delete(row);
        }
        
        this.selectionChange.emit({
            selected: Array.from(this.selectedRows),
            mode: this.config?.selectionMode || 'multiple',
            allSelected: this.isAllSelected(),
            someSelected: this.selectedRows.size > 0,
            count: this.selectedRows.size
        });
    }
    
    /**
     * Handle master selection
     */
    onMasterSelectionChange(selected: boolean): void {
        if (selected) {
            this.filteredData.forEach(row => this.selectedRows.add(row));
        } else {
            this.filteredData.forEach(row => this.selectedRows.delete(row));
        }
        
        this.selectionChange.emit({
            selected: Array.from(this.selectedRows),
            mode: this.config?.selectionMode || 'multiple',
            allSelected: selected,
            someSelected: false,
            count: this.selectedRows.size
        });
    }
    
    /**
     * Check if all rows are selected
     */
    isAllSelected(): boolean {
        return this.filteredData.length > 0 && 
               this.filteredData.every(row => this.selectedRows.has(row));
    }
    
    /**
     * Check if some rows are selected
     */
    isSomeSelected(): boolean {
        return this.selectedRows.size > 0 && !this.isAllSelected();
    }
    
    /**
     * Check if row is selected
     */
    isRowSelected(row: any): boolean {
        return this.selectedRows.has(row);
    }
    
    /**
     * Handle action click
     */
    onActionClick(action: DataTableAction, row: any, index: number): void {
        this.actionClick.emit({ action, row, index });
    }
    
    /**
     * Get column configuration
     */
    getColumnConfig(property: string): DataTableColumn | undefined {
        return this.config?.columns?.find(col => col.property === property);
    }
    
    /**
     * Get cell value
     */
    getCellValue(row: any, property: string): any {
        return row[property];
    }
    
    /**
     * Get formatted cell value
     */
    getFormattedCellValue(row: any, property: string): string {
        const column = this.getColumnConfig(property);
        const value = this.getCellValue(row, property);
        
        if (column?.formatter) {
            return column.formatter(value);
        }
        
        if (column?.renderer) {
            return column.renderer(value, row);
        }
        
        return String(value || '');
    }
    
    /**
     * Get CSS classes for row
     */
    getRowClasses(row: any, index: number): string {
        const classes = ['amw-data-table__row'];
        
        if (this.isRowSelected(row)) {
            classes.push('amw-data-table__row--selected');
        }
        
        if (this.editingRow === row) {
            classes.push('amw-data-table__row--editing');
        }
        
        if (this.config?.striped && index % 2 === 1) {
            classes.push('amw-data-table__row--striped');
        }
        
        return classes.join(' ');
    }
    
    /**
     * Get CSS classes for cell
     */
    getCellClasses(property: string): string {
        const classes = ['amw-data-table__cell'];
        const column = this.getColumnConfig(property);
        
        if (column?.cssClass) {
            classes.push(column.cssClass);
        }
        
        if (column?.align) {
            classes.push(`amw-data-table__cell--${column.align}`);
        }
        
        return classes.join(' ');
    }
}
