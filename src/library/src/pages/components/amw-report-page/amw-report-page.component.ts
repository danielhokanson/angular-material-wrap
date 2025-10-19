import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectorRef, Inject, Optional, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { Subject, takeUntil, BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

// Import interfaces
import {
    ReportPageConfig,
    DateRange,
    ReportFilter,
    ReportWidget,
    ReportData,
    ReportPageDataSource
} from './interfaces';

// Default data source implementation
@Injectable()
export class DefaultReportPageDataSource implements ReportPageDataSource {
    constructor() { }

    getData(params: {
        dateRange?: DateRange;
        filters?: { [key: string]: any };
    }): Observable<ReportData> {
        return new BehaviorSubject({
            widgets: [
                {
                    id: 'widget1',
                    title: 'Sample Chart',
                    type: 'chart' as const,
                    size: 'medium' as const,
                    data: { labels: ['Jan', 'Feb', 'Mar'], values: [10, 20, 30] },
                    visible: true
                },
                {
                    id: 'widget2',
                    title: 'Sample Table',
                    type: 'table' as const,
                    size: 'large' as const,
                    data: {
                        columns: [{ key: 'name', title: 'Name' }, { key: 'value', title: 'Value' }],
                        rows: [{ name: 'Item 1', value: 100 }, { name: 'Item 2', value: 200 }]
                    },
                    visible: true
                }
            ],
            dateRange: params.dateRange,
            filters: params.filters,
            lastUpdated: new Date()
        }).pipe(delay(500));
    }
}

@Component({
    selector: 'amw-report-page',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MatExpansionModule,
        MatTooltipModule,
        MatMenuModule,
        MatChipsModule,
        MatDividerModule,
        MatTableModule,
        MatSlideToggleModule,
        MatProgressBarModule,
        MatOptionModule,
        MatSelectModule,
        MatPaginatorModule,
        MatSortModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-report-page.component.html',
    styleUrl: './amw-report-page.component.scss',
    providers: [
        { provide: 'REPORT_PAGE_DATA_SOURCE', useFactory: () => new DefaultReportPageDataSource() }
    ]
})
export class AmwReportPageComponent implements OnInit, OnDestroy {
    @Input() config: ReportPageConfig = { widgets: [] };
    @Input() dataSource?: ReportPageDataSource;
    @Input() autoRefresh = false;
    @Input() refreshInterval = 300000; // 5 minutes

    @Output() widgetClick = new EventEmitter<{ widget: ReportWidget; data: any }>();
    @Output() filterChange = new EventEmitter<{ filters: { [key: string]: any }; dateRange: DateRange }>();
    @Output() dateRangeChange = new EventEmitter<DateRange>();
    @Output() exportClick = new EventEmitter<{ format: string; data: any }>();

    // Current state
    currentConfig: ReportPageConfig = { widgets: [] };
    currentData: ReportData = {
        widgets: [],
        dateRange: {
            start: new Date(),
            end: new Date(),
            preset: 'last7days'
        },
        filters: {},
        lastUpdated: new Date()
    };

    // UI state
    loading = false;
    error: string | null = null;
    isFullscreen = false;

    // Subject for component destruction
    private destroy$ = new Subject<void>();

    // Math object for templates
    Math = Math;

    constructor(
        private cdr: ChangeDetectorRef,
        @Optional() @Inject('REPORT_PAGE_DATA_SOURCE') private injectedDataSource?: ReportPageDataSource
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
            title: 'Report Page',
            subtitle: 'View analytics and reports',
            showRefresh: true,
            showFullscreen: true,
            dateRange: {
                start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
                end: new Date(),
                preset: 'last30days'
            },
            filters: [],
            customActions: [],
            customClasses: [],
            customStyles: {},
            ...this.config
        };

        this.currentData.dateRange = this.currentConfig.dateRange || this.currentData.dateRange;
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
            dateRange: {
                start: this.currentData.dateRange?.start || null,
                end: this.currentData.dateRange?.end || null,
                label: this.currentData.dateRange?.label,
                preset: this.currentData.dateRange?.preset || 'last7days'
            },
            filters: this.currentData.filters
        };

        dataSource.getData(params).pipe(
            takeUntil(this.destroy$)
        ).subscribe({
            next: (data) => {
                this.currentData = {
                    ...data,
                    dateRange: {
                        start: data.dateRange?.start || null,
                        end: data.dateRange?.end || null,
                        label: data.dateRange?.label,
                        preset: data.dateRange?.preset || 'last7days'
                    }
                };
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
    onRefresh(): void {
        this.loadData();
    }

    onExport(format: string): void {
        this.exportClick.emit({ format, data: this.currentData });
    }

    onToggleFullscreen(): void {
        this.isFullscreen = !this.isFullscreen;
        if (this.isFullscreen) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    onActionClick(action: any): void {
        action.onClick(this.currentData);
    }

    onFilterChange(filterKey: string, event: any): void {
        const value = event.value || event.checked || event.target?.value;
        this.currentData.filters = this.currentData.filters || {};
        this.currentData.filters[filterKey] = value;
        this.filterChange.emit({
            filters: this.currentData.filters || {},
            dateRange: this.currentData.dateRange || { start: new Date(), end: new Date() }
        });
        this.loadData();
    }

    onDateRangeChange(): void {
        this.dateRangeChange.emit(this.currentData.dateRange);
        this.loadData();
    }

    onDateRangePresetChange(preset: string): void {
        if (!this.currentData.dateRange) {
            this.currentData.dateRange = { start: null, end: null };
        }
        this.currentData.dateRange.preset = preset;
        this.onDateRangeChange();
    }

    onDateRangeStartChange(start: Date): void {
        if (!this.currentData.dateRange) {
            this.currentData.dateRange = { start: null, end: null };
        }
        this.currentData.dateRange.start = start;
        this.onDateRangeChange();
    }

    onDateRangeEndChange(end: Date): void {
        if (!this.currentData.dateRange) {
            this.currentData.dateRange = { start: null, end: null };
        }
        this.currentData.dateRange.end = end;
        this.onDateRangeChange();
    }

    onFilterValueChange(filterKey: string, value: any): void {
        this.currentData.filters = this.currentData.filters || {};
        this.currentData.filters[filterKey] = value;
        this.filterChange.emit({
            filters: this.currentData.filters || {},
            dateRange: this.currentData.dateRange || { start: new Date(), end: new Date() }
        });
        this.loadData();
    }

    onWidgetClick(widget: ReportWidget): void {
        this.widgetClick.emit({ widget, data: widget.data });
    }

    onRefreshWidget(widget: ReportWidget): void {
        // Implement widget refresh logic
        console.log('Refreshing widget:', widget);
    }

    isWidgetVisible(widget: ReportWidget): boolean {
        return widget.visible !== false;
    }

    getColumnKeys(columns: any[]): string[] {
        return columns.map(c => c.key);
    }

    getWidgetSizeClass(size: string): string {
        switch (size) {
            case 'small': return 'amw-report-page__widget--small';
            case 'medium': return 'amw-report-page__widget--medium';
            case 'large': return 'amw-report-page__widget--large';
            case 'full': return 'amw-report-page__widget--full';
            default: return 'amw-report-page__widget--medium';
        }
    }

    getWidgetGridStyle(widget: ReportWidget): { [key: string]: string } {
        const sizeMap: { [key: string]: string } = {
            'small': '1fr',
            'medium': '2fr',
            'large': '3fr',
            'full': '1fr'
        };
        return {
            'grid-column': sizeMap[widget.size] || '1fr'
        };
    }
}