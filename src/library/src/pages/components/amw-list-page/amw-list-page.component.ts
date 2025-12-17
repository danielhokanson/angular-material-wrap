import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectorRef, Inject, Optional, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, takeUntil, BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
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
        MatCheckboxModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatChipsModule,
        MatDividerModule,
        MatTabsModule,
        MatExpansionModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatProgressSpinnerModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-list-page.component.html',
    styleUrl: './amw-list-page.component.scss',
    providers: [
        { provide: LIST_PAGE_DATA_SOURCE, useFactory: () => new DefaultListPageDataSource() }
    ]
})
export class AmwListPageComponent implements OnInit, OnDestroy {
    @Input() config: ListPageConfig = { columns: [] };
    @Input() dataSource?: ListPageDataSource;
    @Input() realTimeUpdates = false;
    @Input() autoRefresh = false;
    @Input() refreshInterval = 30000; // 30 seconds

    @Output() itemSelect = new EventEmitter<{ item: any; selected: boolean }>();
    @Output() actionClick = new EventEmitter<{ action: string; item: any }>();
    @Output() bulkActionClick = new EventEmitter<{ action: string; items: any[] }>();
    @Output() filterChange = new EventEmitter<{ filters: { [key: string]: any }; searchQuery: string }>();
    @Output() sortChange = new EventEmitter<{ field: string; direction: 'asc' | 'desc' }>();
    @Output() pageChange = new EventEmitter<{ pageIndex: number; pageSize: number }>();

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
            ...this.config
        };
    }

    private loadData(): void {
        this.loading = true;
        this.error = null;

        const dataSource = this.dataSource || this.injectedDataSource;
        if (!dataSource) {
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

        dataSource.getData(params).pipe(
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