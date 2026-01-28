import { Component, input, output, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectorRef, Inject, effect } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { AmwIconComponent } from '../amw-icon/amw-icon.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { OverlayModule } from '@angular/cdk/overlay';
import { Subject, takeUntil } from 'rxjs';
import { AmwTooltipDirective } from '../../../directives';
import { AmwProgressSpinnerComponent } from '../amw-progress-spinner/amw-progress-spinner.component';
import { AmwButtonComponent } from '../../../controls/components/amw-button/amw-button.component';

// import { BaseComponent } from '../base/base.component';
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
import { AmwDialogService } from '../../services/amw-dialog.service';

/**
 * AMW Data Table Component
 * A comprehensive data table with sorting, filtering, pagination, selection, and editing capabilities
 */
@Component({
    selector: 'amw-data-table',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        AmwButtonComponent,
        AmwIconComponent,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatMenuModule,
        AmwTooltipDirective,
        AmwProgressSpinnerComponent,
        MatChipsModule,
        MatSlideToggleModule,
        OverlayModule
    ],
    encapsulation: ViewEncapsulation.None,
    host: { 'data-amw-id': 'amw-data-table' },
    templateUrl: './amw-data-table.component.html',
    styleUrl: './amw-data-table.component.scss'
})
export class AmwDataTableComponent implements OnInit, OnDestroy {
    // Input properties
    data = input<any[]>([]);
    config = input<DataTableConfig | null>(null);
    loading = input<boolean>(false);
    loadingMessage = input<string>('Loading...');
    emptyMessage = input<string>('No data available');
    ariaLabel = input<string>('Data table');

    // Output events
    sortChange = output<DataTableSort>();
    filterChange = output<DataTableFilter[]>();
    pageChange = output<PageEvent>();
    selectionChange = output<DataTableSelectionEvent>();
    editChange = output<DataTableEditEvent>();
    actionClick = output<{ action: DataTableAction; row: any; index: number }>();

    // Internal state
    displayedColumns: string[] = [];
    filteredData: any[] = [];
    selectedRows: Set<any> = new Set();
    editingRow: any = null;
    editingIndex: number = -1;
    editingValues: { [key: string]: any } = {};
    editingErrors: { [key: string]: string[] } = {};
    editingState: { [key: string]: boolean } = {};
    customSaveHandler: ((row: any, index: number) => void) | null = null;
    fieldEditingState: { [key: string]: { row: any; index: number; column: string; originalValue: any; columnWidth?: number } } = {};

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

    constructor(
        private cdr: ChangeDetectorRef,
        @Inject(AmwDialogService) private dialogService: AmwDialogService
    ) {
        // Effect to reinitialize when data or config changes
        effect(() => {
            // Read signals to register dependencies
            const data = this.data();
            const config = this.config();
            // Reinitialize component when signals change
            if (config) {
                this.initializeComponent();
            }
        });
    }

    ngOnInit(): void {
        this.initializeComponent();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    /**
     * Initialize component
     */
    private initializeComponent(): void {
        const configValue = this.config();
        if (configValue) {
            this.setupColumns();
            this.setupPagination();
            this.applyFilters();
        }
    }

    /**
     * Setup table columns
     */
    private setupColumns(): void {
        const configValue = this.config();
        if (!configValue?.columns) return;

        this.displayedColumns = configValue.columns
            .filter((col: DataTableColumn) => col.visible !== false)
            .map((col: DataTableColumn) => col.property);

        // Add selection column if enabled
        if (configValue.selectable && configValue.selectionMode !== 'none') {
            if (configValue.selectionPosition === 'start') {
                this.displayedColumns.unshift('select');
            } else {
                this.displayedColumns.push('select');
            }
        }

        // Add actions column if enabled
        if (configValue.actions && configValue.actions.length > 0) {
            if (configValue.actionsPosition === 'start') {
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
        const configValue = this.config();
        if (!configValue?.paginated) return;

        this.pagination = {
            pageIndex: 0,
            pageSize: configValue.defaultPageSize || 10,
            length: this.data().length,
            pageSizeOptions: configValue.pageSizeOptions || [5, 10, 25, 50, 100],
            showFirstLastButtons: configValue.showFirstLastButtons !== false,
            hidePageSize: configValue.showPageSizeSelector === false
        };
    }

    /**
     * Apply filters to data
     */
    private applyFilters(): void {
        let filtered = [...this.data()];

        // Apply global filter
        const configValue = this.config();
        if (this.globalFilter) {
            filtered = filtered.filter(row =>
                configValue?.columns?.some((col: DataTableColumn) =>
                    col.filterable !== false &&
                    this.matchesFilter(row[col.property], this.globalFilter, col)
                )
            );
        }

        // Apply column filters
        Object.keys(this.columnFilters).forEach(column => {
            const filterValue = this.columnFilters[column];
            if (filterValue !== null && filterValue !== undefined && filterValue !== '') {
                const columnConfig = this.getColumnConfig(column);
                filtered = filtered.filter(row =>
                    this.matchesFilter(row[column], filterValue, columnConfig)
                );
            }
        });

        this.filteredData = filtered;
        this.pagination.length = filtered.length;

        // Reset pagination if needed
        if (this.pagination.pageIndex > 0 && this.pagination.pageIndex * this.pagination.pageSize >= filtered.length) {
            this.pagination.pageIndex = 0;
        }

        // Apply sorting if active
        if (this.currentSort) {
            this.applySorting();
        }
    }

    /**
     * Check if value matches filter
     */
    private matchesFilter(value: any, filter: any, column?: DataTableColumn): boolean {
        if (value === null || value === undefined) return false;

        const strValue = String(value).toLowerCase();
        const strFilter = String(filter).toLowerCase();

        // For global filter, always use string contains matching
        if (!column) {
            return strValue.includes(strFilter);
        }

        // Handle different column types for column-specific filters
        if (column.type === 'number') {
            const numValue = Number(value);
            const numFilter = Number(filter);
            if (!isNaN(numValue) && !isNaN(numFilter)) {
                return numValue === numFilter;
            }
            // Fallback to string contains for partial number matches
            return strValue.includes(strFilter);
        }

        if (column.type === 'date') {
            const dateValue = new Date(value);
            const dateFilter = new Date(filter);
            if (!isNaN(dateValue.getTime()) && !isNaN(dateFilter.getTime())) {
                return dateValue.toDateString() === dateFilter.toDateString();
            }
            // Fallback to string contains for partial date matches
            return strValue.includes(strFilter);
        }

        if (column.type === 'boolean') {
            const boolValue = Boolean(value);
            const boolFilter = filter === 'true' || filter === '1' || filter === 'yes' || filter === 'on';
            return boolValue === boolFilter;
        }

        // Default string contains filter
        return strValue.includes(strFilter);
    }

    /**
     * Handle sort change
     */
    onSortChange(sort: Sort): void {
        if (!sort.active || !sort.direction) {
            this.currentSort = null;
            this.sortChange.emit(this.currentSort!);
            return;
        }

        this.currentSort = {
            column: sort.active,
            direction: sort.direction as 'asc' | 'desc'
        };

        // Apply sorting to filtered data
        this.applySorting();
        this.sortChange.emit(this.currentSort);
    }

    /**
     * Apply sorting to filtered data
     */
    private applySorting(): void {
        if (!this.currentSort) {
            return;
        }

        const column = this.getColumnConfig(this.currentSort.column);
        if (!column) return;

        this.filteredData.sort((a, b) => {
            let aValue = a[this.currentSort!.column];
            let bValue = b[this.currentSort!.column];

            // Handle null/undefined values
            if (aValue === null || aValue === undefined) aValue = '';
            if (bValue === null || bValue === undefined) bValue = '';

            // Apply custom formatter if available
            if (column.formatter) {
                aValue = column.formatter(aValue);
                bValue = column.formatter(bValue);
            }

            // Convert to strings for comparison
            const aStr = String(aValue).toLowerCase();
            const bStr = String(bValue).toLowerCase();

            let comparison = 0;
            if (aStr > bStr) {
                comparison = 1;
            } else if (aStr < bStr) {
                comparison = -1;
            }

            return this.currentSort!.direction === 'asc' ? comparison : -comparison;
        });
    }

    /**
     * Handle page change
     */
    onPageChange(event: PageEvent): void {
        const previousPageIndex = this.pagination.pageIndex;

        this.pagination.pageIndex = event.pageIndex;
        this.pagination.pageSize = event.pageSize;
        this.pagination.length = event.length;

        // Emit pagination event
        this.pageChange.emit({
            pageIndex: event.pageIndex,
            pageSize: event.pageSize,
            length: event.length,
            previousPageIndex: previousPageIndex
        });
    }

    /**
     * Get paginated data
     */
    getPaginatedData(): any[] {
        if (!this.config()?.paginated) {
            return this.filteredData;
        }

        const startIndex = this.pagination.pageIndex * this.pagination.pageSize;
        const endIndex = startIndex + this.pagination.pageSize;

        return this.filteredData.slice(startIndex, endIndex);
    }

    /**
     * Get total pages
     */
    getTotalPages(): number {
        return Math.ceil(this.pagination.length / this.pagination.pageSize);
    }

    /**
     * Check if there are more pages
     */
    hasNextPage(): boolean {
        return this.pagination.pageIndex < this.getTotalPages() - 1;
    }

    /**
     * Check if there are previous pages
     */
    hasPreviousPage(): boolean {
        return this.pagination.pageIndex > 0;
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
            mode: this.config()?.selectionMode || 'multiple',
            allSelected: this.isAllSelected(),
            someSelected: this.selectedRows.size > 0,
            count: this.selectedRows.size
        });
    }

    /**
     * Handle master selection
     */
    onMasterSelectionChange(selected: boolean): void {
        const currentPageData = this.getPaginatedData();

        if (selected) {
            currentPageData.forEach(row => this.selectedRows.add(row));
        } else {
            currentPageData.forEach(row => this.selectedRows.delete(row));
        }

        this.selectionChange.emit({
            selected: Array.from(this.selectedRows),
            mode: this.config()?.selectionMode || 'multiple',
            allSelected: selected,
            someSelected: false,
            count: this.selectedRows.size
        });
    }

    /**
     * Check if all rows are selected
     */
    isAllSelected(): boolean {
        const currentPageData = this.getPaginatedData();
        return currentPageData.length > 0 &&
            currentPageData.every(row => this.selectedRows.has(row));
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
        // Check if action is disabled
        if (action.disabled || (action.disabledFn && action.disabledFn(row, index))) {
            return;
        }

        // Check if action is visible
        if (action.visible === false || (action.visibilityFn && !action.visibilityFn(row, index))) {
            return;
        }

        // Handle special edit action - trigger inline editing mode
        if (action.id === 'edit' && this.config()?.editable) {
            // Store the custom save handler if it exists
            this.customSaveHandler = action.handler || null;
            this.startEditing(row, index);
            return;
        }

        // Handle confirmation if required
        if (action.confirmMessage) {
            this.dialogService.confirm(action.confirmMessage, 'Confirm Action').subscribe((result: any) => {
                if (result === 'confirm') {
                    this.executeAction(action, row, index);
                }
            });
            return;
        }

        // Execute action handler if provided
        this.executeAction(action, row, index);
    }

    /**
     * Execute action handler
     */
    private executeAction(action: DataTableAction, row: any, index: number): void {
        if (action.handler) {
            action.handler(row, index);
        }

        // Emit action click event
        this.actionClick.emit({ action, row, index });
    }

    /**
     * Check if action is visible
     */
    isActionVisible(action: DataTableAction, row: any, index: number): boolean {
        if (action.visible === false) return false;
        if (action.visibilityFn) return action.visibilityFn(row, index);
        return true;
    }

    /**
     * Check if action is disabled
     */
    isActionDisabled(action: DataTableAction, row: any, index: number): boolean {
        if (action.disabled) return true;
        if (action.disabledFn) return action.disabledFn(row, index);
        return false;
    }

    /**
     * Get actions for a row
     */
    getRowActions(row: any, index: number): DataTableAction[] {
        const configValue = this.config();
        if (!configValue?.actions) return [];

        return configValue.actions.filter((action: DataTableAction) =>
            this.isActionVisible(action, row, index)
        );
    }

    /**
     * Check if actions are available
     */
    hasActions(): boolean {
        const configValue = this.config();
        return !!(configValue?.actions && configValue.actions.length > 0);
    }

    /**
     * Check if there's a custom edit action defined
     */
    hasCustomEditAction(): boolean {
        const configValue = this.config();
        return !!(configValue?.actions && configValue.actions.some((action: DataTableAction) =>
            action.id === 'edit' || action.label?.toLowerCase().includes('edit')
        ));
    }

    /**
     * Start editing a specific field
     */
    startFieldEditing(row: any, index: number, column: string, event?: Event): void {
        const fieldKey = `${index}-${column}`;

        // Capture the current column width
        let columnWidth: number | undefined;
        if (event && event.target) {
            const cellElement = (event.target as HTMLElement).closest('td');
            if (cellElement) {
                columnWidth = cellElement.offsetWidth;
            }
        }

        this.fieldEditingState[fieldKey] = {
            row,
            index,
            column,
            originalValue: row[column],
            columnWidth
        };
    }

    /**
     * Cancel editing a specific field
     */
    cancelFieldEditing(row: any, index: number, column: string): void {
        const fieldKey = `${index}-${column}`;
        const fieldState = this.fieldEditingState[fieldKey];
        if (fieldState) {
            // Restore original value
            row[column] = fieldState.originalValue;
            delete this.fieldEditingState[fieldKey];
        }
    }

    /**
     * Save editing a specific field
     */
    saveFieldEditing(row: any, index: number, column: string): void {
        const fieldKey = `${index}-${column}`;
        const fieldState = this.fieldEditingState[fieldKey];
        if (fieldState) {
            // Emit field edit change event
            this.editChange.emit({
                row,
                index,
                column,
                value: row[column],
                originalValue: fieldState.originalValue,
                valid: true,
                errors: []
            });
            delete this.fieldEditingState[fieldKey];
        }
    }

    /**
     * Check if a field is being edited
     */
    isFieldEditing(row: any, index: number, column: string): boolean {
        const fieldKey = `${index}-${column}`;
        return fieldKey in this.fieldEditingState;
    }

    /**
     * Get the field editing state
     */
    getFieldEditingState(row: any, index: number, column: string): { row: any; index: number; column: string; originalValue: any; columnWidth?: number } | null {
        const fieldKey = `${index}-${column}`;
        return this.fieldEditingState[fieldKey] || null;
    }

    /**
     * Get the column width for a field
     */
    getFieldColumnWidth(row: any, index: number, column: string): number | undefined {
        const fieldState = this.getFieldEditingState(row, index, column);
        return fieldState?.columnWidth;
    }

    /**
     * Clear field editing state for a specific row
     */
    clearFieldEditingForRow(index: number): void {
        Object.keys(this.fieldEditingState).forEach(key => {
            if (key.startsWith(`${index}-`)) {
                delete this.fieldEditingState[key];
            }
        });
    }

    /**
     * Start editing a row
     */
    startEditing(row: any, index: number): void {
        const configValue = this.config();
        if (!configValue?.editable) return;

        // Clear any existing field editing state for this row
        this.clearFieldEditingForRow(index);

        this.editingRow = row;
        this.editingIndex = index;
        this.editingValues = { ...row };
        this.editingErrors = {};
        this.editingState = {};

        // Mark all columns as not being edited initially
        configValue.columns?.forEach((col: DataTableColumn) => {
            this.editingState[col.property] = false;
        });
    }

    /**
     * Cancel editing
     */
    cancelEditing(): void {
        this.editingRow = null;
        this.editingIndex = -1;
        this.editingValues = {};
        this.editingErrors = {};
        this.editingState = {};
        this.customSaveHandler = null;
        this.fieldEditingState = {}; // Clear individual field editing state
    }

    /**
     * Save editing changes
     */
    saveEditing(): void {
        if (!this.editingRow || !this.validateEditing()) return;

        // Update the original row with edited values
        Object.keys(this.editingValues).forEach(key => {
            this.editingRow[key] = this.editingValues[key];
        });

        // Call custom save handler if it exists
        if (this.customSaveHandler) {
            this.customSaveHandler(this.editingRow, this.editingIndex);
        }

        // Emit edit change event
        this.editChange.emit({
            row: this.editingRow,
            index: this.editingIndex,
            column: '',
            value: this.editingValues,
            originalValue: {},
            valid: true,
            errors: []
        });

        this.cancelEditing();
    }

    /**
     * Validate editing values
     */
    validateEditing(): boolean {
        this.editingErrors = {};
        let isValid = true;
        const configValue = this.config();

        configValue?.columns?.forEach((col: DataTableColumn) => {
            if (col.editable && col.validation) {
                const value = this.editingValues[col.property];
                const errors: string[] = [];

                // Required validation
                if (col.validation.required && (!value || value === '')) {
                    errors.push(`${col.label} is required`);
                }

                // Min length validation
                if (col.validation.minLength && value && value.length < col.validation.minLength) {
                    errors.push(`${col.label} must be at least ${col.validation.minLength} characters`);
                }

                // Max length validation
                if (col.validation.maxLength && value && value.length > col.validation.maxLength) {
                    errors.push(`${col.label} must be no more than ${col.validation.maxLength} characters`);
                }

                // Min value validation
                if (col.validation.min !== undefined && value !== undefined && value < col.validation.min) {
                    errors.push(`${col.label} must be at least ${col.validation.min}`);
                }

                // Max value validation
                if (col.validation.max !== undefined && value !== undefined && value > col.validation.max) {
                    errors.push(`${col.label} must be no more than ${col.validation.max}`);
                }

                // Pattern validation
                if (col.validation.pattern && value && !col.validation.pattern.test(value)) {
                    errors.push(`${col.label} format is invalid`);
                }

                // Custom validation
                if (col.validation.custom && value !== undefined) {
                    const customResult = col.validation.custom(value);
                    if (customResult !== true) {
                        errors.push(typeof customResult === 'string' ? customResult : `${col.label} is invalid`);
                    }
                }

                if (errors.length > 0) {
                    this.editingErrors[col.property] = errors;
                    isValid = false;
                }
            }
        });

        return isValid;
    }

    /**
     * Check if a row is being edited
     */
    isRowEditing(row: any): boolean {
        return this.editingRow === row;
    }

    /**
     * Check if a cell is being edited
     */
    isCellEditing(property: string): boolean {
        return this.editingState[property] === true;
    }

    /**
     * Start editing a cell
     */
    startCellEditing(property: string): void {
        if (!this.isRowEditing(this.editingRow)) return;
        this.editingState[property] = true;
    }

    /**
     * Stop editing a cell
     */
    stopCellEditing(property: string): void {
        this.editingState[property] = false;
    }

    /**
     * Get editing value for a property
     */
    getEditingValue(property: string): any {
        return this.editingValues[property] !== undefined ? this.editingValues[property] : this.editingRow[property];
    }

    /**
     * Set editing value for a property
     */
    setEditingValue(property: string, value: any): void {
        this.editingValues[property] = value;
    }

    /**
     * Get editing errors for a property
     */
    getEditingErrors(property: string): string[] {
        return this.editingErrors[property] || [];
    }

    /**
     * Check if editing has changes
     */
    hasEditingChanges(): boolean {
        return Object.keys(this.editingValues).length > 0;
    }

    /**
     * Get column sort state for ARIA
     */
    getColumnSortState(property: string): string {
        if (!this.currentSort || this.currentSort.column !== property) {
            return 'none';
        }
        return this.currentSort.direction === 'asc' ? 'ascending' : 'descending';
    }

    /**
     * Get column configuration
     */
    getColumnConfig(property: string): DataTableColumn | undefined {
        return this.config()?.columns?.find((col: DataTableColumn) => col.property === property);
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

        if (this.config()?.striped && index % 2 === 1) {
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
