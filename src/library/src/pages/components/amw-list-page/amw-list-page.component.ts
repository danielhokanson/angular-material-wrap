import { Component, input, output, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectorRef, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { AmwIconComponent } from '../../../components/components/amw-icon/amw-icon.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { InjectionToken } from '@angular/core';

// Injection tokens
export const LIST_PAGE_DATA_SOURCE = new InjectionToken<ListPageDataSource>('ListPageDataSource');

// Import interfaces
import {
    ListPageConfig,
    ListPageColumn,
    ListPageFilter,
    ListPageData,
    ListPageDataSource
} from './interfaces';
import { DefaultListPageDataSource } from './services/default-list-page-data-source.service';
import { AmwTooltipDirective } from '../../../directives';
import { AmwProgressSpinnerComponent } from '../../../components/components/amw-progress-spinner/amw-progress-spinner.component';
import { AmwButtonComponent } from '../../../controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../controls/components/amw-input/amw-input.component';
import { AmwCheckboxComponent } from '../../../controls/components/amw-checkbox/amw-checkbox.component';
import { AmwSelectComponent } from '../../../controls/components/amw-select/amw-select.component';


@Component({
    selector: 'amw-list-page',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        AmwCheckboxComponent,
        AmwButtonComponent,
        AmwInputComponent,
        AmwSelectComponent,
        AmwIconComponent,
        MatChipsModule,
        MatDividerModule,
        MatTabsModule,
        MatExpansionModule,
        AmwTooltipDirective,
        MatSnackBarModule,
        AmwProgressSpinnerComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-list-page.component.html',
    styleUrl: './amw-list-page.component.scss',
    providers: [
        { provide: LIST_PAGE_DATA_SOURCE, useFactory: () => new DefaultListPageDataSource() }
    ]
})
export class AmwListPageComponent implements OnInit, OnDestroy {
    config = input<ListPageConfig>({ columns: [] });
    dataSource = input<ListPageDataSource | undefined>(undefined);
    realTimeUpdates = input<boolean>(false);
    autoRefresh = input<boolean>(false);
    refreshInterval = input<number>(30000); // 30 seconds

    itemSelect = output<{ item: any; selected: boolean }>();
    actionClick = output<{ action: string; item: any }>();
    bulkActionClick = output<{ action: string; items: any[] }>();
    filterChange = output<{ filters: { [key: string]: any }; searchQuery: string }>();
    sortChange = output<{ field: string; direction: 'asc' | 'desc' }>();
    pageChange = output<{ pageIndex: number; pageSize: number }>();

    // Current state
    currentConfig: ListPageConfig = { columns: [] };
    currentData: ListPageData = {
        items: [],
        totalCount: 0,
        pageIndex: 0,
        pageSize: 10,
        sortField: undefined,
        sortDirection: 'asc',
        filters: {},
        searchQuery: ''
    };

    // UI state
    loading = false;
    error: string | null = null;
    selectedItems: Set<any> = new Set();
    searchQuery = '';
    currentFilters: { [key: string]: any } = {};

    // Subject for component destruction
    private destroy$ = new Subject<void>();

    constructor(
        private cdr: ChangeDetectorRef,
        private snackBar: MatSnackBar,
        @Optional() @Inject(LIST_PAGE_DATA_SOURCE) private injectedDataSource?: ListPageDataSource
    ) { }

    ngOnInit(): void {
        this.initializeConfig();
        this.loadData();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private initializeConfig(): void {
        this.currentConfig = {
            title: 'List Page',
            subtitle: 'Browse and manage data',
            showSearch: true,
            showFilters: true,
            showBulkActions: true,
            showColumnVisibility: true,
            showDensity: true,
            showExport: true,
            showRefresh: true,
            customActions: [],
            customClasses: [],
            customStyles: {},
            ...this.config()
        };
    }

    private loadData(): void {
        this.loading = true;
        this.error = null;

        const dataSourceValue = this.dataSource() || this.injectedDataSource;
        if (!dataSourceValue) {
            this.error = 'No data source provided';
            this.loading = false;
            return;
        }

        const params = {
            pageIndex: this.currentData.pageIndex,
            pageSize: this.currentData.pageSize,
            sortField: this.currentData.sortField,
            sortDirection: this.currentData.sortDirection,
            filters: this.currentFilters,
            searchQuery: this.searchQuery
        };

        dataSourceValue.getData(params).pipe(
            takeUntil(this.destroy$)
        ).subscribe({
            next: (data) => {
                this.currentData = data;
                this.loading = false;
                this.cdr.detectChanges();
            },
            error: (err) => {
                this.error = err.message || 'Failed to load data';
                this.loading = false;
                this.cdr.detectChanges();
            }
        });
    }

    // Public methods for template
    onSearch(): void {
        this.currentData.pageIndex = 0;
        this.loadData();
    }

    onFilterChange(): void {
        this.currentData.pageIndex = 0;
        this.loadData();
    }

    onSortChange(event: Sort): void {
        this.currentData.sortField = event.active;
        this.currentData.sortDirection = event.direction as 'asc' | 'desc';
        this.loadData();
    }

    onPageChange(event: PageEvent): void {
        this.currentData.pageIndex = event.pageIndex;
        this.currentData.pageSize = event.pageSize;
        this.loadData();
    }

    onItemSelect(item: any, selected: boolean): void {
        if (selected) {
            this.selectedItems.add(item);
        } else {
            this.selectedItems.delete(item);
        }
        this.itemSelect.emit({ item, selected });
    }

    onSelectAll(selected: boolean): void {
        if (selected) {
            this.currentData.items.forEach(item => this.selectedItems.add(item));
        } else {
            this.selectedItems.clear();
        }
    }

    isSelected(item: any): boolean {
        return this.selectedItems.has(item);
    }

    isAllSelected(): boolean {
        return this.currentData.items.length > 0 && this.selectedItems.size === this.currentData.items.length;
    }

    isIndeterminate(): boolean {
        return this.selectedItems.size > 0 && this.selectedItems.size < this.currentData.items.length;
    }

    onBulkAction(action: any): void {
        const selectedItems = Array.from(this.selectedItems);
        action.onClick(selectedItems);
        this.bulkActionClick.emit({ action: action.key, items: selectedItems });
    }

    onActionClick(action: string, item: any): void {
        this.actionClick.emit({ action, item });
    }

    onRefresh(): void {
        this.loadData();
    }

    onExport(): void {
        try {
            const displayedColumns = this.getDisplayedColumns();
            const headers = displayedColumns.map(key => this.getColumnTitle(key));

            // Create CSV content
            const csvRows = [headers.join(',')];

            // Add data rows
            this.currentData.items.forEach(item => {
                const row = displayedColumns.map(key => {
                    const value = item[key];
                    // Handle values that might contain commas, quotes, or newlines
                    if (value === null || value === undefined) {
                        return '';
                    }
                    const stringValue = String(value);
                    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
                        return `"${stringValue.replace(/"/g, '""')}"`;
                    }
                    return stringValue;
                });
                csvRows.push(row.join(','));
            });

            const csvContent = csvRows.join('\n');

            // Create and download the file
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            const fileName = `${this.currentConfig.title || 'export'}_${new Date().toISOString().split('T')[0]}.csv`;

            link.setAttribute('href', url);
            link.setAttribute('download', fileName);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            this.snackBar.open(`Exported ${this.currentData.items.length} items to ${fileName}`, 'Close', { duration: 3000 });
        } catch (error) {
            console.error('Export failed:', error);
            this.snackBar.open('Export failed. Please try again.', 'Close', { duration: 3000 });
        }
    }

    getDisplayedColumns(): string[] {
        return this.currentConfig.columns
            .filter(col => col.visible !== false)
            .map(col => col.key);
    }

    getColumnTitle(key: string): string {
        const column = this.currentConfig.columns.find(col => col.key === key);
        return column?.title || key;
    }

    isColumnSortable(key: string): boolean {
        const column = this.currentConfig.columns.find(col => col.key === key);
        return column?.sortable !== false;
    }

    hasActiveFilters(): boolean {
        return Object.keys(this.currentFilters).length > 0 || this.searchQuery.length > 0;
    }

    getActiveFilterCount(): number {
        let count = this.searchQuery.length > 0 ? 1 : 0;
        count += Object.keys(this.currentFilters).length;
        return count;
    }

    clearFilters(): void {
        this.currentFilters = {};
        this.searchQuery = '';
        this.onFilterChange();
    }

    getRowId(index: number, item: any): any {
        return item.id || index;
    }
}
