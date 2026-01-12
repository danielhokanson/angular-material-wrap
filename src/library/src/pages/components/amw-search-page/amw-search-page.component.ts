import { Component, input, output, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectorRef, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil, BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AmwTooltipDirective } from '../../../directives';
import { AmwInputComponent } from '../../../controls/components/amw-input/amw-input.component';
import { AmwCheckboxComponent } from '../../../controls/components/amw-checkbox/amw-checkbox.component';
import { AmwSelectComponent } from '../../../controls/components/amw-select/amw-select.component';

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
import { AmwProgressSpinnerComponent } from '../../../components/components/amw-progress-spinner/amw-progress-spinner.component';
import { AmwButtonComponent } from '../../../controls/components/amw-button/amw-button.component';


@Component({
    selector: 'amw-search-page',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        AmwButtonComponent,
        AmwInputComponent,
        AmwCheckboxComponent,
        AmwSelectComponent,
        MatIconModule,
        MatChipsModule,
        MatDividerModule,
        MatTabsModule,
        MatExpansionModule,
        AmwTooltipDirective,
        MatSnackBarModule,
        AmwProgressSpinnerComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-search-page.component.html',
    styleUrl: './amw-search-page.component.scss',
    providers: [
        { provide: 'SEARCH_PAGE_DATA_SOURCE', useFactory: () => new DefaultSearchPageDataSource() }
    ]
})
export class AmwSearchPageComponent implements OnInit, OnDestroy {
    /** Configuration for the search page */
    config = input<SearchPageConfig>({ searchFields: [] });

    /** Data source for search operations */
    dataSource = input<SearchPageDataSource | undefined>(undefined);

    /** Whether to enable real-time updates */
    realTimeUpdates = input<boolean>(false);

    /** Emits when a search is performed */
    search = output<{ query: string; filters: { [key: string]: any } }>();

    /** Emits when a result is clicked */
    resultClick = output<any>();

    /** Emits when filters change */
    filterChange = output<{ filters: { [key: string]: any } }>();

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
            ...this.config()
        };
    }

    // Public methods for template
    onSearch(): void {
        this.loading = true;
        this.error = null;

        const dataSource = this.dataSource() || this.injectedDataSource;
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
            next: (data: SearchData) => {
                this.currentData = data;
                this.loading = false;
                this.cdr.detectChanges();
            },
            error: (err: any) => {
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