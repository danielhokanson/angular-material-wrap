import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import {
    DataTableConfig,
    DataTableColumn,
    DataTableSort,
    DataTableFilter,
    DataTablePagination,
    DataTableSelectionEvent
} from '../components/amw-data-table/interfaces/data-table.interface';

/**
 * Data Table Service
 * Handles data manipulation, filtering, sorting, and pagination for data tables
 */
@Injectable({
    providedIn: 'root'
})
export class DataTableService {
    private dataSubject = new BehaviorSubject<any[]>([]);
    private configSubject = new BehaviorSubject<DataTableConfig | null>(null);
    private sortSubject = new BehaviorSubject<DataTableSort | null>(null);
    private filtersSubject = new BehaviorSubject<DataTableFilter[]>([]);
    private paginationSubject = new BehaviorSubject<DataTablePagination>({
        pageIndex: 0,
        pageSize: 10,
        length: 0,
        pageSizeOptions: [5, 10, 25, 50, 100],
        showFirstLastButtons: true,
        hidePageSize: false
    });
    private selectionSubject = new BehaviorSubject<DataTableSelectionEvent>({
        selected: [],
        mode: 'none',
        allSelected: false,
        someSelected: false,
        count: 0
    });

    // Observables
    public data$ = this.dataSubject.asObservable();
    public config$ = this.configSubject.asObservable();
    public sort$ = this.sortSubject.asObservable();
    public filters$ = this.filtersSubject.asObservable();
    public pagination$ = this.paginationSubject.asObservable();
    public selection$ = this.selectionSubject.asObservable();

    // Processed data observable
    public processedData$ = combineLatest([
        this.data$,
        this.config$,
        this.sort$,
        this.filters$,
        this.pagination$
    ]).pipe(
        map(([data, config, sort, filters, pagination]) => {
            let processedData = [...data];

            // Apply filters
            if (filters.length > 0) {
                processedData = this.applyFilters(processedData, filters, config);
            }

            // Apply sorting
            if (sort) {
                processedData = this.applySorting(processedData, sort, config);
            }

            // Update pagination length
            const updatedPagination = { ...pagination, length: processedData.length };
            this.paginationSubject.next(updatedPagination);

            // Apply pagination
            if (config?.paginated !== false) {
                const startIndex = pagination.pageIndex * pagination.pageSize;
                const endIndex = startIndex + pagination.pageSize;
                processedData = processedData.slice(startIndex, endIndex);
            }

            return processedData;
        })
    );

    /**
     * Set data
     */
    setData(data: any[]): void {
        this.dataSubject.next(data);
    }

    /**
     * Set configuration
     */
    setConfig(config: DataTableConfig): void {
        this.configSubject.next(config);
    }

    /**
     * Set sorting
     */
    setSort(sort: DataTableSort | null): void {
        this.sortSubject.next(sort);
    }

    /**
     * Set filters
     */
    setFilters(filters: DataTableFilter[]): void {
        this.filtersSubject.next(filters);
    }

    /**
     * Set pagination
     */
    setPagination(pagination: Partial<DataTablePagination>): void {
        const currentPagination = this.paginationSubject.value;
        const updatedPagination = { ...currentPagination, ...pagination };
        this.paginationSubject.next(updatedPagination);
    }

    /**
     * Set selection
     */
    setSelection(selection: DataTableSelectionEvent): void {
        this.selectionSubject.next(selection);
    }

    /**
     * Apply filters to data
     */
    private applyFilters(data: any[], filters: DataTableFilter[], config: DataTableConfig | null): any[] {
        return data.filter(row => {
            return filters.every(filter => {
                const column = config?.columns?.find(col => col.property === filter.column);
                return this.matchesFilter(row[filter.column], filter.value, filter.operator, column);
            });
        });
    }

    /**
     * Check if value matches filter
     */
    private matchesFilter(value: any, filterValue: any, operator: string, column?: DataTableColumn): boolean {
        if (value === null || value === undefined) return false;

        switch (operator) {
            case 'equals':
                return this.equals(value, filterValue, column);
            case 'contains':
                return this.contains(value, filterValue, column);
            case 'startsWith':
                return this.startsWith(value, filterValue, column);
            case 'endsWith':
                return this.endsWith(value, filterValue, column);
            case 'greaterThan':
                return this.greaterThan(value, filterValue, column);
            case 'lessThan':
                return this.lessThan(value, filterValue, column);
            case 'greaterThanOrEqual':
                return this.greaterThanOrEqual(value, filterValue, column);
            case 'lessThanOrEqual':
                return this.lessThanOrEqual(value, filterValue, column);
            case 'between':
                return this.between(value, filterValue, column);
            case 'in':
                return this.in(value, filterValue, column);
            case 'notIn':
                return this.notIn(value, filterValue, column);
            case 'isNull':
                return value === null || value === undefined;
            case 'isNotNull':
                return value !== null && value !== undefined;
            case 'custom':
                return this.customFilter(value, filterValue, column);
            default:
                return this.contains(value, filterValue, column);
        }
    }

    /**
     * Apply sorting to data
     */
    private applySorting(data: any[], sort: DataTableSort, config: DataTableConfig | null): any[] {
        const column = config?.columns?.find(col => col.property === sort.column);
        if (!column) return data;

        return [...data].sort((a, b) => {
            let aValue = a[sort.column];
            let bValue = b[sort.column];

            // Handle null/undefined values
            if (aValue === null || aValue === undefined) aValue = '';
            if (bValue === null || bValue === undefined) bValue = '';

            // Apply custom formatter if available
            if (column.formatter) {
                aValue = column.formatter(aValue);
                bValue = column.formatter(bValue);
            }

            // Handle different column types
            let comparison = 0;
            if (column.type === 'number') {
                const aNum = Number(aValue);
                const bNum = Number(bValue);
                if (!isNaN(aNum) && !isNaN(bNum)) {
                    comparison = aNum - bNum;
                } else {
                    comparison = String(aValue).localeCompare(String(bValue));
                }
            } else if (column.type === 'date') {
                const aDate = new Date(aValue);
                const bDate = new Date(bValue);
                if (!isNaN(aDate.getTime()) && !isNaN(bDate.getTime())) {
                    comparison = aDate.getTime() - bDate.getTime();
                } else {
                    comparison = String(aValue).localeCompare(String(bValue));
                }
            } else {
                comparison = String(aValue).toLowerCase().localeCompare(String(bValue).toLowerCase());
            }

            return sort.direction === 'asc' ? comparison : -comparison;
        });
    }

    // Filter operators
    private equals(value: any, filterValue: any, column?: DataTableColumn): boolean {
        if (column?.type === 'number') {
            return Number(value) === Number(filterValue);
        }
        if (column?.type === 'boolean') {
            return Boolean(value) === Boolean(filterValue);
        }
        return String(value).toLowerCase() === String(filterValue).toLowerCase();
    }

    private contains(value: any, filterValue: any, column?: DataTableColumn): boolean {
        return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
    }

    private startsWith(value: any, filterValue: any, column?: DataTableColumn): boolean {
        return String(value).toLowerCase().startsWith(String(filterValue).toLowerCase());
    }

    private endsWith(value: any, filterValue: any, column?: DataTableColumn): boolean {
        return String(value).toLowerCase().endsWith(String(filterValue).toLowerCase());
    }

    private greaterThan(value: any, filterValue: any, column?: DataTableColumn): boolean {
        const numValue = Number(value);
        const numFilter = Number(filterValue);
        return !isNaN(numValue) && !isNaN(numFilter) && numValue > numFilter;
    }

    private lessThan(value: any, filterValue: any, column?: DataTableColumn): boolean {
        const numValue = Number(value);
        const numFilter = Number(filterValue);
        return !isNaN(numValue) && !isNaN(numFilter) && numValue < numFilter;
    }

    private greaterThanOrEqual(value: any, filterValue: any, column?: DataTableColumn): boolean {
        const numValue = Number(value);
        const numFilter = Number(filterValue);
        return !isNaN(numValue) && !isNaN(numFilter) && numValue >= numFilter;
    }

    private lessThanOrEqual(value: any, filterValue: any, column?: DataTableColumn): boolean {
        const numValue = Number(value);
        const numFilter = Number(filterValue);
        return !isNaN(numValue) && !isNaN(numFilter) && numValue <= numFilter;
    }

    private between(value: any, filterValue: any, column?: DataTableColumn): boolean {
        if (!Array.isArray(filterValue) || filterValue.length !== 2) return false;
        const numValue = Number(value);
        const min = Number(filterValue[0]);
        const max = Number(filterValue[1]);
        return !isNaN(numValue) && !isNaN(min) && !isNaN(max) && numValue >= min && numValue <= max;
    }

    private in(value: any, filterValue: any, column?: DataTableColumn): boolean {
        if (!Array.isArray(filterValue)) return false;
        return filterValue.includes(value);
    }

    private notIn(value: any, filterValue: any, column?: DataTableColumn): boolean {
        if (!Array.isArray(filterValue)) return false;
        return !filterValue.includes(value);
    }

    private customFilter(value: any, filterValue: any, column?: DataTableColumn): boolean {
        // This would be implemented by the user
        return true;
    }

    /**
     * Get current data
     */
    getCurrentData(): any[] {
        return this.dataSubject.value;
    }

    /**
     * Get current config
     */
    getCurrentConfig(): DataTableConfig | null {
        return this.configSubject.value;
    }

    /**
     * Get current sort
     */
    getCurrentSort(): DataTableSort | null {
        return this.sortSubject.value;
    }

    /**
     * Get current filters
     */
    getCurrentFilters(): DataTableFilter[] {
        return this.filtersSubject.value;
    }

    /**
     * Get current pagination
     */
    getCurrentPagination(): DataTablePagination {
        return this.paginationSubject.value;
    }

    /**
     * Get current selection
     */
    getCurrentSelection(): DataTableSelectionEvent {
        return this.selectionSubject.value;
    }

    /**
     * Clear all data
     */
    clear(): void {
        this.dataSubject.next([]);
        this.configSubject.next(null);
        this.sortSubject.next(null);
        this.filtersSubject.next([]);
        this.paginationSubject.next({
            pageIndex: 0,
            pageSize: 10,
            length: 0,
            pageSizeOptions: [5, 10, 25, 50, 100],
            showFirstLastButtons: true,
            hidePageSize: false
        });
        this.selectionSubject.next({
            selected: [],
            mode: 'none',
            allSelected: false,
            someSelected: false,
            count: 0
        });
    }
}
