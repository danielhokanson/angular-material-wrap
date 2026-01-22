import { Component, OnInit, OnDestroy } from '@angular/core';

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

// Import API documentation components
import { AmwApiDocComponent, ApiInterface } from '../../shared/components/api-doc/api-doc.component';
import { ApiDocumentation } from '../../components/base/base-api.component';

import { AmwTabsComponent, AmwTabComponent, AmwCardComponent } from '../../../../library/src/components/components';

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

@Component({
    selector: 'app-report-page-demo',
    standalone: true,
    imports: [
        AmwReportPageComponent,
        AmwTabsComponent,
        AmwTabComponent,
        AmwCardComponent,
        AmwApiDocComponent
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
    currentViewIndex = 0;

    // Code Examples
    codeExamples = {
        basic: `import { Component } from '@angular/core';
import { AmwReportPageComponent, ReportPageConfig } from 'angular-material-wrap';

@Component({
  selector: 'app-sales-report',
  standalone: true,
  imports: [AmwReportPageComponent],
  template: \`
    <amw-report-page
      [config]="reportConfig"
      [dataSource]="dataSource"
      (widgetClick)="onWidgetClick($event)"
      (filterChange)="onFilterChange($event)"
      (exportClick)="onExportClick($event)">
    </amw-report-page>
  \`
})
export class SalesReportComponent {
  reportConfig: ReportPageConfig = {
    title: 'Sales Dashboard',
    subtitle: 'Comprehensive sales analytics',
    showDateRange: true,
    showFilters: true,
    showExport: true
  };

  dataSource = new MyReportDataSource();

  onWidgetClick(event: { widget: ReportWidget; data: any }): void {
    console.log('Widget clicked:', event.widget.title);
  }

  onFilterChange(event: { filters: any; dateRange: DateRange }): void {
    console.log('Filters changed:', event);
  }

  onExportClick(event: { format: string; data: any }): void {
    console.log('Export:', event.format);
  }
}`,

        config: `// ReportPageConfig with all options
const reportConfig: ReportPageConfig = {
  // Header
  title: 'Sales Dashboard',
  subtitle: 'Comprehensive sales analytics and performance metrics',

  // Feature toggles
  showDateRange: true,      // Date range picker
  showFilters: true,        // Filter panel
  showExport: true,         // Export button (PDF, Excel, CSV)
  showPrint: true,          // Print button
  showRefresh: true,        // Refresh button
  showFullscreen: true,     // Fullscreen toggle

  // Date range configuration
  dateRange: {
    start: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
    end: new Date(),
    preset: 'lastYear'
  },

  // Filters configuration
  filters: [
    {
      key: 'region',
      label: 'Region',
      type: 'select',
      options: [
        { value: '', label: 'All Regions' },
        { value: 'North America', label: 'North America' },
        { value: 'Europe', label: 'Europe' }
      ],
      visible: true
    },
    {
      key: 'product',
      label: 'Product Category',
      type: 'select',
      options: [...],
      visible: true
    }
  ],

  // Custom action buttons
  customActions: [
    {
      key: 'schedule',
      label: 'Schedule Report',
      icon: 'schedule',
      color: 'primary',
      onClick: (data) => console.log('Schedule clicked')
    },
    {
      key: 'share',
      label: 'Share',
      icon: 'share',
      color: 'accent',
      onClick: (data) => console.log('Share clicked')
    }
  ]
};`,

        dataSource: `import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ReportPageDataSource, ReportData, ReportWidget, DateRange } from 'angular-material-wrap';

class MyReportDataSource implements ReportPageDataSource {
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
    return this.http.post<ReportData>('/api/report', params);
  }

  exportReport(format: 'pdf' | 'excel' | 'csv', params: any): Observable<Blob> {
    return this.http.post('/api/report/export', { format, ...params }, {
      responseType: 'blob'
    });
  }

  refreshWidget(widgetId: string, params: any): Observable<any> {
    return this.http.get(\`/api/widget/\${widgetId}\`, { params });
  }

  private buildWidgets(params: any): ReportWidget[] {
    return [
      {
        id: 'revenue-metric',
        title: 'Total Revenue',
        type: 'metric',
        size: 'small',
        position: { row: 0, col: 0 },
        data: { value: 1250000, change: 12.5, format: 'currency' },
        visible: true,
        refreshable: true
      },
      // ... more widgets
    ];
  }
}`,

        widgets: `// Widget types and configuration
const widgets: ReportWidget[] = [
  // Metric widget - single KPI value
  {
    id: 'revenue',
    title: 'Total Revenue',
    type: 'metric',
    size: 'small',
    position: { row: 0, col: 0 },
    data: {
      value: 1250000,
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

  // Chart widget - line/bar/pie charts
  {
    id: 'sales-chart',
    title: 'Sales Trend',
    type: 'chart',
    size: 'large',
    position: { row: 1, col: 0, colspan: 2 },
    data: {
      labels: ['Jan', 'Feb', 'Mar', ...],
      datasets: [{
        label: 'Revenue',
        data: [95000, 110000, 125000, ...],
        backgroundColor: 'rgba(25, 118, 210, 0.2)',
        borderColor: 'rgba(25, 118, 210, 1)'
      }]
    },
    config: {
      type: 'line',
      options: { responsive: true }
    },
    visible: true,
    refreshable: true
  },

  // Table widget - data grid
  {
    id: 'product-table',
    title: 'Top Products',
    type: 'table',
    size: 'medium',
    position: { row: 2, col: 0, colspan: 2 },
    data: {
      columns: [
        { key: 'product', title: 'Product', type: 'text' },
        { key: 'sales', title: 'Sales', type: 'currency' }
      ],
      rows: [...],
      totalCount: 100,
      pageSize: 10
    },
    visible: true,
    refreshable: true
  },

  // KPI widget - summary score
  {
    id: 'kpi-summary',
    title: 'Performance Score',
    type: 'kpi',
    size: 'full',
    position: { row: 3, col: 0, colspan: 4 },
    data: {
      value: 94.2,
      label: 'Overall Performance',
      icon: 'dashboard',
      color: 'primary'
    },
    visible: true,
    refreshable: true
  }
];`,

        events: `// Handling report page events
@Component({
  template: \`
    <amw-report-page
      [config]="config"
      [dataSource]="dataSource"
      [autoRefresh]="true"
      [refreshInterval]="60000"
      (widgetClick)="onWidgetClick($event)"
      (filterChange)="onFilterChange($event)"
      (dateRangeChange)="onDateRangeChange($event)"
      (exportClick)="onExportClick($event)"
      (refreshClick)="onRefreshClick($event)"
      (fullscreenChange)="onFullscreenChange($event)">
    </amw-report-page>
  \`
})
export class ReportComponent {
  onWidgetClick(event: { widget: ReportWidget; data: any }): void {
    console.log('Widget clicked:', event.widget.title);
    // Navigate to detail view, open dialog, etc.
    if (event.widget.id === 'sales-chart') {
      this.router.navigate(['/reports/sales-detail']);
    }
  }

  onFilterChange(event: { filters: any; dateRange: DateRange }): void {
    console.log('Filters changed:', event.filters);
    console.log('Date range:', event.dateRange);
    // Update URL params, track analytics, etc.
  }

  onDateRangeChange(dateRange: DateRange): void {
    console.log('Date range changed:', dateRange);
    // Refresh data with new date range
  }

  onExportClick(event: { format: string; data: any }): void {
    console.log('Exporting as:', event.format);
    this.notification.info(\`Exporting as \${event.format.toUpperCase()}\`);
    // Trigger download
  }

  onRefreshClick(): void {
    console.log('Manual refresh triggered');
  }

  onFullscreenChange(isFullscreen: boolean): void {
    console.log('Fullscreen:', isFullscreen);
  }
}`
    };

    // API Documentation
    reportPageApiDoc: ApiDocumentation = {
        inputs: [
            {
                name: 'config',
                type: 'ReportPageConfig',
                default: '{}',
                description: 'Configuration object for the report page including title, feature toggles, date range, filters, and custom actions.'
            },
            {
                name: 'dataSource',
                type: 'ReportPageDataSource',
                default: 'undefined',
                description: 'Data source implementing the ReportPageDataSource interface. Provides methods for fetching report data, exporting, and refreshing widgets.'
            },
            {
                name: 'autoRefresh',
                type: 'boolean',
                default: 'false',
                description: 'Enable automatic data refresh at the specified interval.'
            },
            {
                name: 'refreshInterval',
                type: 'number',
                default: '60000',
                description: 'Refresh interval in milliseconds when autoRefresh is enabled.'
            }
        ],
        outputs: [
            {
                name: 'widgetClick',
                type: 'EventEmitter<{ widget: ReportWidget; data: any }>',
                description: 'Emits when a widget is clicked. Includes the widget configuration and associated data.'
            },
            {
                name: 'filterChange',
                type: 'EventEmitter<{ filters: { [key: string]: any }; dateRange: DateRange }>',
                description: 'Emits when filters or date range change. Includes all current filter values and date range.'
            },
            {
                name: 'dateRangeChange',
                type: 'EventEmitter<DateRange>',
                description: 'Emits when the date range is changed via the date picker.'
            },
            {
                name: 'exportClick',
                type: 'EventEmitter<{ format: string; data: any }>',
                description: 'Emits when an export action is triggered. Includes the format (pdf, excel, csv) and current report data.'
            },
            {
                name: 'refreshClick',
                type: 'EventEmitter<void>',
                description: 'Emits when the refresh button is clicked.'
            },
            {
                name: 'fullscreenChange',
                type: 'EventEmitter<boolean>',
                description: 'Emits when fullscreen mode is toggled. True when entering fullscreen, false when exiting.'
            }
        ],
        methods: [
            {
                name: 'refresh()',
                returns: 'void',
                description: 'Manually triggers a refresh of all report data from the data source.'
            },
            {
                name: 'refreshWidget(widgetId: string)',
                returns: 'void',
                description: 'Refreshes a specific widget by its ID.'
            },
            {
                name: 'export(format: string)',
                returns: 'void',
                description: 'Programmatically triggers an export in the specified format.'
            },
            {
                name: 'toggleFullscreen()',
                returns: 'void',
                description: 'Toggles fullscreen mode for the report page.'
            }
        ],
        usageNotes: [
            'Import AmwReportPageComponent from angular-material-wrap',
            'Implement ReportPageDataSource interface for custom data loading',
            'Widgets support multiple types: metric, chart, table, kpi, and custom',
            'Charts are rendered using Chart.js - configure via widget.config',
            'Tables support sorting, pagination, and multiple column types',
            'Use autoRefresh for real-time dashboards with live data',
            'Export functionality supports PDF, Excel, and CSV formats',
            'Fullscreen mode hides browser chrome for presentation/wall displays',
            'Custom actions allow adding application-specific toolbar buttons'
        ]
    };

    // Interface documentation
    reportPageInterfaces: ApiInterface[] = [
        {
            name: 'ReportPageConfig',
            description: 'Configuration interface for the report page component.',
            properties: [
                { name: 'title', type: 'string', description: 'Report page title' },
                { name: 'subtitle', type: 'string', description: 'Report page subtitle/description' },
                { name: 'showDateRange', type: 'boolean', description: 'Show date range picker' },
                { name: 'showFilters', type: 'boolean', description: 'Show filter panel' },
                { name: 'showExport', type: 'boolean', description: 'Show export button' },
                { name: 'showPrint', type: 'boolean', description: 'Show print button' },
                { name: 'showRefresh', type: 'boolean', description: 'Show refresh button' },
                { name: 'showFullscreen', type: 'boolean', description: 'Show fullscreen toggle' },
                { name: 'dateRange', type: 'DateRange', description: 'Initial date range configuration' },
                { name: 'filters', type: 'ReportFilter[]', description: 'Filter field configurations' },
                { name: 'widgets', type: 'ReportWidget[]', description: 'Widget configurations' },
                { name: 'customActions', type: 'ReportAction[]', description: 'Custom toolbar actions' }
            ]
        },
        {
            name: 'ReportPageDataSource',
            description: 'Interface for the report data source. Provides data for widgets and export functionality.',
            properties: [
                { name: 'getData(params)', type: 'Observable<ReportData>', description: 'Required. Fetches initial report data.' },
                { name: 'getReportData(params)', type: 'Observable<ReportData>', description: 'Optional. Fetches report data with specific parameters.' },
                { name: 'exportReport(format, params)', type: 'Observable<Blob>', description: 'Optional. Exports report in specified format.' },
                { name: 'refreshWidget(widgetId, params)', type: 'Observable<any>', description: 'Optional. Refreshes a specific widget.' }
            ]
        },
        {
            name: 'ReportWidget',
            description: 'Configuration for a report widget.',
            properties: [
                { name: 'id', type: 'string', description: 'Unique widget identifier' },
                { name: 'title', type: 'string', description: 'Widget title' },
                { name: 'type', type: "'metric' | 'chart' | 'table' | 'kpi' | 'custom'", description: 'Widget type' },
                { name: 'size', type: "'small' | 'medium' | 'large' | 'full'", description: 'Widget size' },
                { name: 'position', type: '{ row: number; col: number; colspan?: number }', description: 'Grid position' },
                { name: 'data', type: 'any', description: 'Widget-specific data' },
                { name: 'config', type: 'any', description: 'Widget-specific configuration (e.g., chart options)' },
                { name: 'visible', type: 'boolean', description: 'Widget visibility' },
                { name: 'refreshable', type: 'boolean', description: 'Allow individual refresh' }
            ]
        },
        {
            name: 'DateRange',
            description: 'Date range configuration.',
            properties: [
                { name: 'start', type: 'Date', description: 'Start date' },
                { name: 'end', type: 'Date', description: 'End date' },
                { name: 'preset', type: 'string', description: 'Optional preset name (today, lastWeek, lastMonth, etc.)' }
            ]
        }
    ];

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

    onViewChange(index: number): void {
        this.currentViewIndex = index;

        if (index === 1) {
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
