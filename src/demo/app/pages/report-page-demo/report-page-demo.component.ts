import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { Subject, takeUntil, BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

// Import the page components
import {
    AmwReportPageComponent,
    ReportPageConfig,
    ReportPageDataSource,
    ReportData,
    ReportWidget,
    ReportAction,
    DateRange,
} from '../../../../library/src/pages/components/amw-report-page';

// Sample data
const SAMPLE_METRICS = {
    totalRevenue: 1250000,
    totalOrders: 3420,
    averageOrderValue: 365.50,
    customerSatisfaction: 4.7,
    newCustomers: 156,
    returningCustomers: 89,
    conversionRate: 3.2,
    bounceRate: 28.5
};

const SAMPLE_SALES_DATA = [
    { month: 'Jan', revenue: 95000, orders: 280, customers: 245 },
    { month: 'Feb', revenue: 110000, orders: 320, customers: 289 },
    { month: 'Mar', revenue: 125000, orders: 365, customers: 312 },
    { month: 'Apr', revenue: 98000, orders: 290, customers: 267 },
    { month: 'May', revenue: 135000, orders: 385, customers: 334 },
    { month: 'Jun', revenue: 142000, orders: 410, customers: 356 },
    { month: 'Jul', revenue: 128000, orders: 375, customers: 321 },
    { month: 'Aug', revenue: 155000, orders: 445, customers: 389 },
    { month: 'Sep', revenue: 138000, orders: 395, customers: 345 },
    { month: 'Oct', revenue: 162000, orders: 465, customers: 412 },
    { month: 'Nov', revenue: 175000, orders: 500, customers: 445 },
    { month: 'Dec', revenue: 189000, orders: 540, customers: 478 }
];

const SAMPLE_PRODUCT_DATA = [
    { product: 'Product A', sales: 45000, units: 120, growth: 12.5 },
    { product: 'Product B', sales: 38000, units: 95, growth: 8.3 },
    { product: 'Product C', sales: 32000, units: 80, growth: -2.1 },
    { product: 'Product D', sales: 28000, units: 70, growth: 15.7 },
    { product: 'Product E', sales: 25000, units: 65, growth: 5.2 }
];

const SAMPLE_CUSTOMER_DATA = [
    { region: 'North America', customers: 1250, revenue: 450000, growth: 8.5 },
    { region: 'Europe', customers: 980, revenue: 380000, growth: 12.3 },
    { region: 'Asia Pacific', customers: 750, revenue: 290000, growth: 15.7 },
    { region: 'Latin America', customers: 420, revenue: 180000, growth: 6.8 },
    { region: 'Middle East & Africa', customers: 280, revenue: 120000, growth: 9.2 }
];

// Custom data source implementation
class ReportPageDemoDataSource implements ReportPageDataSource {
    constructor(private data: any = SAMPLE_METRICS) { }

    getData(params: {
        dateRange?: DateRange;
        filters?: { [key: string]: any };
    }): Observable<ReportData> {
        return of({
            widgets: this.buildWidgets(params),
            dateRange: params.dateRange || { start: new Date(), end: new Date() },
            filters: params.filters || {},
            lastUpdated: new Date()
        }).pipe(delay(800));
    }

    getReportData(params: {
        dateRange: DateRange;
        filters: { [key: string]: any };
        widgets: string[];
    }): Observable<ReportData> {
        return of({
            widgets: this.buildWidgets(params),
            dateRange: params.dateRange,
            filters: params.filters,
            lastUpdated: new Date(),
            totalRecords: 5000
        }).pipe(delay(800));
    }

    exportReport(format: 'pdf' | 'excel' | 'csv', params: any): Observable<Blob> {
        const content = `Report exported in ${format} format\nDate: ${new Date().toISOString()}\nFilters: ${JSON.stringify(params.filters)}`;
        const blob = new Blob([content], { type: 'text/plain' });
        return of(blob).pipe(delay(1000));
    }

    refreshWidget(widgetId: string, params: any): Observable<any> {
        console.log(`Refreshing widget ${widgetId} with params:`, params);
        return of({ refreshed: true, timestamp: new Date() }).pipe(delay(500));
    }

    private buildWidgets(params: any): ReportWidget[] {
        return [
            {
                id: 'revenue-metric',
                title: 'Total Revenue',
                type: 'metric',
                size: 'small',
                position: { row: 0, col: 0 },
                data: {
                    value: this.data.totalRevenue,
                    label: 'Total Revenue',
                    change: 12.5,
                    changeType: 'increase',
                    format: 'currency',
                    icon: 'attach_money',
                    color: 'primary'
                },
                visible: true,
                refreshable: true
            },
            {
                id: 'orders-metric',
                title: 'Total Orders',
                type: 'metric',
                size: 'small',
                position: { row: 0, col: 1 },
                data: {
                    value: this.data.totalOrders,
                    label: 'Total Orders',
                    change: 8.3,
                    changeType: 'increase',
                    format: 'number',
                    icon: 'shopping_cart',
                    color: 'accent'
                },
                visible: true,
                refreshable: true
            },
            {
                id: 'satisfaction-metric',
                title: 'Customer Satisfaction',
                type: 'metric',
                size: 'small',
                position: { row: 0, col: 2 },
                data: {
                    value: this.data.customerSatisfaction,
                    label: 'Customer Satisfaction',
                    change: 0.3,
                    changeType: 'increase',
                    format: 'number',
                    icon: 'star',
                    color: 'warn'
                },
                visible: true,
                refreshable: true
            },
            {
                id: 'conversion-metric',
                title: 'Conversion Rate',
                type: 'metric',
                size: 'small',
                position: { row: 0, col: 3 },
                data: {
                    value: this.data.conversionRate,
                    label: 'Conversion Rate',
                    change: -0.5,
                    changeType: 'decrease',
                    format: 'percentage',
                    icon: 'trending_up',
                    color: 'primary'
                },
                visible: true,
                refreshable: true
            },
            {
                id: 'sales-chart',
                title: 'Sales Trend',
                type: 'chart',
                size: 'large',
                position: { row: 1, col: 0, colspan: 2 },
                data: {
                    labels: SAMPLE_SALES_DATA.map(d => d.month),
                    datasets: [
                        {
                            label: 'Revenue',
                            data: SAMPLE_SALES_DATA.map(d => d.revenue),
                            backgroundColor: 'rgba(25, 118, 210, 0.2)',
                            borderColor: 'rgba(25, 118, 210, 1)',
                            borderWidth: 2,
                            fill: true
                        }
                    ]
                },
                config: {
                    type: 'line',
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    callback: (value: any) => `$${value.toLocaleString()}`
                                }
                            }
                        }
                    }
                },
                visible: true,
                refreshable: true
            },
            {
                id: 'orders-chart',
                title: 'Orders by Month',
                type: 'chart',
                size: 'medium',
                position: { row: 1, col: 2, colspan: 2 },
                data: {
                    labels: SAMPLE_SALES_DATA.map(d => d.month),
                    datasets: [
                        {
                            label: 'Orders',
                            data: SAMPLE_SALES_DATA.map(d => d.orders),
                            backgroundColor: 'rgba(76, 175, 80, 0.2)',
                            borderColor: 'rgba(76, 175, 80, 1)',
                            borderWidth: 2
                        }
                    ]
                },
                config: {
                    type: 'bar',
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                },
                visible: true,
                refreshable: true
            },
            {
                id: 'product-table',
                title: 'Top Products',
                type: 'table',
                size: 'medium',
                position: { row: 2, col: 0, colspan: 2 },
                data: {
                    columns: [
                        { key: 'product', title: 'Product', type: 'text', sortable: true },
                        { key: 'sales', title: 'Sales', type: 'currency', sortable: true },
                        { key: 'units', title: 'Units', type: 'number', sortable: true },
                        { key: 'growth', title: 'Growth %', type: 'percentage', sortable: true }
                    ],
                    rows: SAMPLE_PRODUCT_DATA,
                    totalCount: SAMPLE_PRODUCT_DATA.length,
                    pageSize: 10,
                    pageIndex: 0
                },
                visible: true,
                refreshable: true
            },
            {
                id: 'customer-table',
                title: 'Regional Performance',
                type: 'table',
                size: 'medium',
                position: { row: 2, col: 2, colspan: 2 },
                data: {
                    columns: [
                        { key: 'region', title: 'Region', type: 'text', sortable: true },
                        { key: 'customers', title: 'Customers', type: 'number', sortable: true },
                        { key: 'revenue', title: 'Revenue', type: 'currency', sortable: true },
                        { key: 'growth', title: 'Growth %', type: 'percentage', sortable: true }
                    ],
                    rows: SAMPLE_CUSTOMER_DATA,
                    totalCount: SAMPLE_CUSTOMER_DATA.length,
                    pageSize: 10,
                    pageIndex: 0
                },
                visible: true,
                refreshable: true
            },
            {
                id: 'kpi-summary',
                title: 'Key Performance Indicators',
                type: 'kpi',
                size: 'full',
                position: { row: 3, col: 0, colspan: 4 },
                data: {
                    value: 94.2,
                    label: 'Overall Performance Score',
                    icon: 'dashboard',
                    color: 'primary'
                },
                visible: true,
                refreshable: true
            }
        ];
    }
}
import { AmwTabsComponent } from '../../../../library/src/components/components/amw-tabs/amw-tabs.component';

@Component({
    selector: 'app-report-page-demo',
    standalone: true,
    imports: [
    MatIconModule,
    MatTooltipModule,
    AmwReportPageComponent,
    AmwTabsComponent,
],
    templateUrl: './report-page-demo.component.html',
    styleUrl: './report-page-demo.component.scss'
})
export class ReportPageDemoComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();

    // Configuration
    reportConfig: ReportPageConfig = {
        title: 'Sales Dashboard',
        subtitle: 'Comprehensive sales analytics and performance metrics',
        showDateRange: true,
        showFilters: true,
        showExport: true,
        showPrint: true,
        showRefresh: true,
        showFullscreen: true,
        dateRange: {
            start: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), // 1 year ago
            end: new Date(),
            preset: 'lastYear'
        },
        filters: [
            {
                key: 'region',
                label: 'Region',
                type: 'select',
                options: [
                    { value: '', label: 'All Regions' },
                    { value: 'North America', label: 'North America' },
                    { value: 'Europe', label: 'Europe' },
                    { value: 'Asia Pacific', label: 'Asia Pacific' },
                    { value: 'Latin America', label: 'Latin America' },
                    { value: 'Middle East & Africa', label: 'Middle East & Africa' }
                ],
                visible: true
            },
            {
                key: 'product',
                label: 'Product Category',
                type: 'select',
                options: [
                    { value: '', label: 'All Products' },
                    { value: 'Electronics', label: 'Electronics' },
                    { value: 'Clothing', label: 'Clothing' },
                    { value: 'Home & Garden', label: 'Home & Garden' },
                    { value: 'Sports', label: 'Sports' },
                    { value: 'Books', label: 'Books' }
                ],
                visible: true
            },
            {
                key: 'customerType',
                label: 'Customer Type',
                type: 'select',
                options: [
                    { value: '', label: 'All Customers' },
                    { value: 'new', label: 'New Customers' },
                    { value: 'returning', label: 'Returning Customers' },
                    { value: 'vip', label: 'VIP Customers' }
                ],
                visible: true
            }
        ],
        widgets: [], // Will be populated by data source
        customActions: [
            {
                key: 'schedule',
                label: 'Schedule Report',
                icon: 'schedule',
                color: 'primary',
                onClick: (data: any) => {
                    this.notification.info('Info', 'Scheduling report', { duration: 2000 });
                }
            },
            {
                key: 'share',
                label: 'Share Dashboard',
                icon: 'share',
                color: 'accent',
                onClick: (data: any) => {
                    this.notification.info('Info', 'Sharing dashboard', { duration: 2000 });
                }
            }
        ]
    };

    // Data source
    dataSource = new ReportPageDemoDataSource();

    // State
    currentView = 'basic';

    constructor(private notification: AmwNotificationService) { }

    ngOnInit(): void {
        // Initialize component
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onWidgetClick(event: { widget: ReportWidget; data: any }): void {
        this.notification.info('Info', `Clicked on ${event.widget.title}`, { duration: 2000 });
        console.log('Widget clicked:', event);
    }

    onFilterChange(event: { filters: { [key: string]: any }; dateRange: DateRange }): void {
        console.log('Filter changed:', event);
    }

    onDateRangeChange(dateRange: DateRange): void {
        console.log('Date range changed:', dateRange);
    }

    onExportClick(event: { format: string; data: any }): void {
        this.notification.info('Info', `Exporting as ${event.format.toUpperCase()}`, { duration: 2000 });
        console.log('Export clicked:', event);
    }

    onViewChange(view: string): void {
        this.currentView = view;

        if (view === 'advanced') {
            this.reportConfig = {
                ...this.reportConfig,
                showFullscreen: true,
                customActions: [
                    ...this.reportConfig.customActions || [],
                    {
                        key: 'advanced',
                        label: 'Advanced Analytics',
                        icon: 'analytics',
                        color: 'accent',
                        onClick: (data: any) => {
                            this.notification.info('Info', 'Opening advanced analytics', { duration: 2000 });
                        }
                    }
                ]
            };
        } else {
            this.reportConfig = {
                ...this.reportConfig,
                showFullscreen: false,
                customActions: this.reportConfig.customActions?.filter((action: any) => action.key !== 'advanced') || []
            };
        }
    }
}
