import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectorRef, Inject, Optional, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, takeUntil, BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

// Import interfaces
import {
    SearchPageConfig,
    SearchField,
    SearchPageSortOption,
    SearchPageViewMode,
    SearchData,
    SearchPageDataSource
} from './interfaces';
import { DefaultSearchPageDataSource } from './services/default-search-page-data-source.service';


@Component({
    selector: 'amw-search-page',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDividerModule,
        MatTabsModule,
        MatExpansionModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatProgressSpinnerModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-search-page.component.html',
    styleUrl: './amw-search-page.component.scss',
    providers: [
        { provide: 'SEARCH_PAGE_DATA_SOURCE', useFactory: () => new DefaultSearchPageDataSource() }
    ]
})
export class AmwSearchPageComponent implements OnInit, OnDestroy {
    @Input() config: SearchPageConfig = { searchFields: [] };
    @Input() dataSource?: SearchPageDataSource;
    @Input() realTimeUpdates = false;

    @Output() search = new EventEmitter<{ query: string; filters: { [key: string]: any } }>();
    @Output() resultClick = new EventEmitter<any>();
    @Output() filterChange = new EventEmitter<{ filters: { [key: string]: any } }>();

    // Current state
    currentConfig: SearchPageConfig = { searchFields: [] };
    currentData: SearchData = {
        results: [],
        totalCount: 0,
        pageIndex: 0,
        pageSize: 10,
        searchQuery: '',
        filters: {}
    };

    // UI state
    loading = false;
    error: string | null = null;
    searchQuery = '';
    currentFilters: { [key: string]: any } = {};
    sortField = '';
    viewMode = 'list';
    showSuggestions = false;
    filtersVisible = false;

    // Subject for component destruction
    private destroy$ = new Subject<void>();

    // Math object for templates
    Math = Math;

    constructor(
        private cdr: ChangeDetectorRef,
        private snackBar: MatSnackBar,
        @Optional() @Inject('SEARCH_PAGE_DATA_SOURCE') private injectedDataSource?: SearchPageDataSource
    ) { }

    ngOnInit(): void {
        this.initializeConfig();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private initializeConfig(): void {
        this.currentConfig = {
            title: 'Search Page',
            subtitle: 'Search and filter data',
            showAdvancedFilters: true,
            showSuggestions: true,
            showSortOptions: true,
            showViewModes: true,
            sortOptions: [
                { value: 'relevance', label: 'Relevance' },
                { value: 'date', label: 'Date' },
                { value: 'name', label: 'Name' }
            ],
            viewModes: [
                { value: 'list', label: 'List', icon: 'view_list' },
                { value: 'grid', label: 'Grid', icon: 'view_module' },
                { value: 'card', label: 'Cards', icon: 'view_quilt' }
            ],
            customActions: [],
            customClasses: [],
            customStyles: {},
            ...this.config
        };
    }

    // Public methods for template
    onSearch(): void {
        this.loading = true;
        this.error = null;

        const dataSource = this.dataSource || this.injectedDataSource;
        if (!dataSource) {
            this.error = 'No data source provided';
            this.loading = false;
            return;
        }

        const params = {
            query: this.searchQuery,
            filters: this.currentFilters,
            sortField: this.sortField || undefined,
            sortDirection: 'asc' as 'asc' | 'desc',
            pageIndex: this.currentData.pageIndex,
            pageSize: this.currentData.pageSize
        };

        dataSource.search(params).pipe(
            takeUntil(this.destroy$)
        ).subscribe({
            next: (data) => {
                this.currentData = data;
                this.loading = false;
                this.cdr.detectChanges();
            },
            error: (err) => {
                this.error = err.message || 'Search failed';
                this.loading = false;
                this.cdr.detectChanges();
            }
        });

        this.search.emit({ query: this.searchQuery, filters: this.currentFilters });
    }

    onResultClick(result: any): void {
        this.resultClick.emit(result);
    }

    onFilterChange(): void {
        this.currentData.pageIndex = 0;
        this.onSearch();
        this.filterChange.emit({ filters: this.currentFilters });
    }

    onSortChange(): void {
        this.onSearch();
    }

    onViewModeChange(mode: string): void {
        this.viewMode = mode;
    }

    onClearFilters(): void {
        this.currentFilters = {};
        this.searchQuery = '';
        this.onSearch();
    }

    isFieldVisible(field: SearchField): boolean {
        return field.visible !== false;
    }

    getFieldValue(field: SearchField): any {
        return this.currentFilters[field.key] || '';
    }

    setFieldValue(field: SearchField, value: any): void {
        this.currentFilters[field.key] = value;
    }

    onSuggestionClick(suggestion: string): void {
        this.searchQuery = suggestion;
        this.showSuggestions = false;
        this.onSearch();
    }

    onSearchInputFocus(): void {
        this.showSuggestions = true;
    }

    onSearchInputBlur(): void {
        setTimeout(() => this.showSuggestions = false, 200);
    }

    toggleFilters(): void {
        this.filtersVisible = !this.filtersVisible;
    }
}