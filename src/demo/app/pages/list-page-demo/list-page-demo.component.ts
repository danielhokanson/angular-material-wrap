import { Component, OnInit, OnDestroy } from '@angular/core';

import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { Subject, takeUntil, BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

// Import the page components
import {
    AmwListPageComponent,
    ListPageConfig,
    ListPageDataSource,
    ListPageData,
    ListPageColumn,
    ListPageAction,
    ListPageFilter
} from '../../../../library/src/pages/components/amw-list-page';

// Import shared components
import { AmwTabsComponent, AmwTabComponent, AmwCardComponent } from '../../../../library/src/components/components';
import { AmwApiDocComponent, ApiInterface } from '../../shared/components/api-doc/api-doc.component';
import { ApiDocumentation } from '../../components/base/base-api.component';

// Sample data
const SAMPLE_DATA = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        department: 'Engineering',
        role: 'Senior Developer',
        status: 'Active',
        salary: 95000,
        startDate: new Date('2022-01-15'),
        location: 'San Francisco, CA',
        skills: ['Angular', 'TypeScript', 'Node.js'],
        performance: 4.8
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        department: 'Design',
        role: 'UX Designer',
        status: 'Active',
        salary: 85000,
        startDate: new Date('2021-08-20'),
        location: 'New York, NY',
        skills: ['Figma', 'Sketch', 'Adobe Creative Suite'],
        performance: 4.6
    },
    {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        department: 'Engineering',
        role: 'DevOps Engineer',
        status: 'Active',
        salary: 105000,
        startDate: new Date('2020-03-10'),
        location: 'Austin, TX',
        skills: ['AWS', 'Docker', 'Kubernetes'],
        performance: 4.9
    },
    {
        id: 4,
        name: 'Sarah Wilson',
        email: 'sarah.wilson@example.com',
        department: 'Marketing',
        role: 'Marketing Manager',
        status: 'Active',
        salary: 78000,
        startDate: new Date('2022-06-01'),
        location: 'Chicago, IL',
        skills: ['Google Analytics', 'HubSpot', 'Content Marketing'],
        performance: 4.4
    },
    {
        id: 5,
        name: 'David Brown',
        email: 'david.brown@example.com',
        department: 'Sales',
        role: 'Sales Director',
        status: 'Active',
        salary: 120000,
        startDate: new Date('2019-11-15'),
        location: 'Los Angeles, CA',
        skills: ['CRM', 'Salesforce', 'Lead Generation'],
        performance: 4.7
    },
    {
        id: 6,
        name: 'Lisa Davis',
        email: 'lisa.davis@example.com',
        department: 'HR',
        role: 'HR Specialist',
        status: 'Inactive',
        salary: 65000,
        startDate: new Date('2021-02-28'),
        location: 'Seattle, WA',
        skills: ['Recruitment', 'Employee Relations', 'Benefits'],
        performance: 4.2
    },
    {
        id: 7,
        name: 'Tom Anderson',
        email: 'tom.anderson@example.com',
        department: 'Engineering',
        role: 'Frontend Developer',
        status: 'Active',
        salary: 88000,
        startDate: new Date('2023-01-10'),
        location: 'Denver, CO',
        skills: ['React', 'Vue.js', 'CSS'],
        performance: 4.5
    },
    {
        id: 8,
        name: 'Emily Taylor',
        email: 'emily.taylor@example.com',
        department: 'Finance',
        role: 'Financial Analyst',
        status: 'Active',
        salary: 72000,
        startDate: new Date('2022-09-05'),
        location: 'Boston, MA',
        skills: ['Excel', 'Financial Modeling', 'Budgeting'],
        performance: 4.3
    }
];

// Custom data source implementation
class ListPageDemoDataSource implements ListPageDataSource {
    constructor(private data: any[] = SAMPLE_DATA) { }

    getData(params: {
        pageIndex: number;
        pageSize: number;
        sortField?: string;
        sortDirection?: 'asc' | 'desc';
        filters?: { [key: string]: any };
        searchQuery?: string;
    }): Observable<ListPageData> {
        // Simulate API delay
        return of(this.processData(params)).pipe(delay(500));
    }

    private processData(params: any): ListPageData {
        let filteredData = [...this.data];

        // Apply search filter
        if (params.searchQuery) {
            const query = params.searchQuery.toLowerCase();
            filteredData = filteredData.filter(item =>
                item.name.toLowerCase().includes(query) ||
                item.email.toLowerCase().includes(query) ||
                item.department.toLowerCase().includes(query) ||
                item.role.toLowerCase().includes(query)
            );
        }

        // Apply filters
        if (params.filters) {
            Object.keys(params.filters).forEach(key => {
                const value = params.filters[key];
                if (value !== null && value !== undefined && value !== '') {
                    filteredData = filteredData.filter(item => {
                        if (key === 'department') {
                            return item.department === value;
                        } else if (key === 'status') {
                            return item.status === value;
                        } else if (key === 'location') {
                            return item.location.includes(value);
                        } else if (key === 'salaryRange') {
                            const [min, max] = value.split('-').map(Number);
                            return item.salary >= min && item.salary <= max;
                        }
                        return true;
                    });
                }
            });
        }

        // Apply sorting
        if (params.sortField) {
            filteredData.sort((a, b) => {
                const aVal = a[params.sortField];
                const bVal = b[params.sortField];
                const direction = params.sortDirection === 'desc' ? -1 : 1;

                if (aVal < bVal) return -1 * direction;
                if (aVal > bVal) return 1 * direction;
                return 0;
            });
        }

        // Apply pagination
        const startIndex = params.pageIndex * params.pageSize;
        const endIndex = startIndex + params.pageSize;
        const paginatedData = filteredData.slice(startIndex, endIndex);

        return {
            items: paginatedData,
            totalCount: filteredData.length,
            pageIndex: params.pageIndex,
            pageSize: params.pageSize,
            sortField: params.sortField,
            sortDirection: params.sortDirection,
            filters: params.filters
        };
    }
}

@Component({
    selector: 'app-list-page-demo',
    standalone: true,
    imports: [
        AmwListPageComponent,
        AmwTabsComponent,
        AmwTabComponent,
        AmwCardComponent,
        AmwApiDocComponent,
    ],
    templateUrl: './list-page-demo.component.html',
    styleUrl: './list-page-demo.component.scss'
})
export class ListPageDemoComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();

    // Configuration
    listConfig: ListPageConfig = {
        title: 'Employee Directory',
        subtitle: 'Manage and view employee information',
        showSearch: true,
        showFilters: true,
        showBulkActions: true,
        showExport: true,
        showRefresh: true,
        showAddButton: true,
        pageSize: 10,
        pageSizeOptions: [5, 10, 25, 50],
        sortable: true,
        selectable: true,
        multiSelect: true,
        stickyHeader: true,
        showColumnVisibility: true,
        showDensity: true,
        density: 'comfortable',
        columns: [
            {
                key: 'name',
                title: 'Name',
                type: 'text',
                sortable: true,
                filterable: true,
                visible: true,
                width: '200px',
                align: 'left'
            },
            {
                key: 'email',
                title: 'Email',
                type: 'text',
                sortable: true,
                filterable: true,
                visible: true,
                width: '250px',
                align: 'left'
            },
            {
                key: 'department',
                title: 'Department',
                type: 'text',
                sortable: true,
                filterable: true,
                visible: true,
                width: '150px',
                align: 'left'
            },
            {
                key: 'role',
                title: 'Role',
                type: 'text',
                sortable: true,
                filterable: true,
                visible: true,
                width: '180px',
                align: 'left'
            },
            {
                key: 'status',
                title: 'Status',
                type: 'text',
                sortable: true,
                filterable: true,
                visible: true,
                width: '100px',
                align: 'center',
                customRenderer: (value: string) => value
            },
            {
                key: 'salary',
                title: 'Salary',
                type: 'currency',
                sortable: true,
                filterable: true,
                visible: true,
                width: '120px',
                align: 'right'
            },
            {
                key: 'startDate',
                title: 'Start Date',
                type: 'date',
                sortable: true,
                filterable: true,
                visible: true,
                width: '120px',
                align: 'center'
            },
            {
                key: 'location',
                title: 'Location',
                type: 'text',
                sortable: true,
                filterable: true,
                visible: true,
                width: '200px',
                align: 'left'
            },
            {
                key: 'performance',
                title: 'Performance',
                type: 'number',
                sortable: true,
                filterable: true,
                visible: true,
                width: '120px',
                align: 'center'
            }
        ],
        customActions: [
            {
                key: 'edit',
                label: 'Edit Selected',
                icon: 'edit',
                color: 'primary',
                requiresSelection: true,
                onClick: (selectedItems: any[]) => {
                    this.notification.info('Info', `Editing ${selectedItems.length} item(s)`, { duration: 2000 });
                }
            },
            {
                key: 'delete',
                label: 'Delete Selected',
                icon: 'delete',
                color: 'warn',
                requiresSelection: true,
                onClick: (selectedItems: any[]) => {
                    this.notification.info('Info', `Deleting ${selectedItems.length} item(s)`, { duration: 2000 });
                }
            },
            {
                key: 'export',
                label: 'Export Selected',
                icon: 'download',
                color: 'accent',
                requiresSelection: true,
                onClick: (selectedItems: any[]) => {
                    this.notification.info('Info', `Exporting ${selectedItems.length} item(s)`, { duration: 2000 });
                }
            }
        ]
    };

    // Data source
    dataSource = new ListPageDemoDataSource();

    // State
    selectedItems: any[] = [];
    currentViewIndex = 0;
    selectedTab = 0; // 0 = Demo, 1 = Code, 2 = API

    // Code examples for the Code tab
    codeExamples = {
        basic: `// Basic usage of AmwListPageComponent
import { AmwListPageComponent, ListPageConfig, ListPageDataSource } from 'angular-material-wrap';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [AmwListPageComponent],
  template: \`
    <amw-list-page
      [config]="listConfig"
      [dataSource]="dataSource"
      (itemClick)="onItemClick($event)"
      (itemSelect)="onItemSelect($event)"
      (actionClick)="onActionClick($event)">
    </amw-list-page>
  \`
})
export class EmployeeListComponent {
  dataSource = new MyListDataSource();

  listConfig: ListPageConfig = {
    title: 'Employee Directory',
    subtitle: 'Manage and view employees',
    showSearch: true,
    showFilters: true,
    selectable: true,
    columns: [...]
  };

  onItemClick(item: any): void {
    console.log('Item clicked:', item);
  }
}`,

        configuration: `// ListPageConfig - Configuration options
const listConfig: ListPageConfig = {
  // Page header
  title: 'Employee Directory',
  subtitle: 'Manage employees',

  // Feature toggles
  showSearch: true,         // Enable search input
  showFilters: true,        // Enable filter panel
  showBulkActions: true,    // Enable bulk action buttons
  showExport: true,         // Enable export button
  showRefresh: true,        // Enable refresh button
  showAddButton: true,      // Enable add new button
  showColumnVisibility: true, // Enable column visibility toggle
  showDensity: true,        // Enable density selector

  // Pagination
  pageSize: 10,
  pageSizeOptions: [5, 10, 25, 50, 100],

  // Table behavior
  sortable: true,           // Enable column sorting
  selectable: true,         // Enable row selection
  multiSelect: true,        // Allow multiple selection
  stickyHeader: true,       // Sticky table header
  density: 'comfortable',   // 'compact' | 'comfortable' | 'spacious'

  // Column definitions
  columns: [...],

  // Custom actions
  customActions: [...]
};`,

        columns: `// ListPageColumn - Column configuration
const columns: ListPageColumn[] = [
  {
    key: 'name',            // Data field key
    title: 'Name',          // Column header
    type: 'text',           // Column type (see below)
    sortable: true,         // Enable sorting
    filterable: true,       // Enable filtering
    visible: true,          // Column visibility
    width: '200px',         // Column width
    align: 'left',          // Text alignment: 'left' | 'center' | 'right'
    sticky: false,          // Sticky column
    customRenderer: (value, row) => value  // Custom cell renderer
  },
  {
    key: 'salary',
    title: 'Salary',
    type: 'currency',       // Formats as currency
    sortable: true,
    align: 'right'
  },
  {
    key: 'startDate',
    title: 'Start Date',
    type: 'date',           // Formats as date
    format: 'MMM d, yyyy',  // Date format
    sortable: true
  },
  {
    key: 'status',
    title: 'Status',
    type: 'badge',          // Renders as badge/chip
    badgeConfig: {
      Active: { color: 'primary', icon: 'check' },
      Inactive: { color: 'warn', icon: 'close' }
    }
  }
];

// Supported column types:
// 'text', 'number', 'currency', 'date', 'datetime',
// 'boolean', 'badge', 'link', 'image', 'actions', 'custom'`,

        dataSource: `// Implementing ListPageDataSource
import { ListPageDataSource, ListPageData } from 'angular-material-wrap';

class MyListDataSource implements ListPageDataSource {
  // Required: Fetch data with pagination, sorting, and filtering
  getData(params: {
    pageIndex: number;
    pageSize: number;
    sortField?: string;
    sortDirection?: 'asc' | 'desc';
    filters?: { [key: string]: any };
    searchQuery?: string;
  }): Observable<ListPageData> {
    // Build API request
    const queryParams = new HttpParams()
      .set('page', params.pageIndex.toString())
      .set('size', params.pageSize.toString())
      .set('sort', \`\${params.sortField},\${params.sortDirection}\`)
      .set('search', params.searchQuery || '');

    return this.http.get<ListPageData>('/api/employees', { params: queryParams });
  }
}

// ListPageData interface
interface ListPageData {
  items: any[];              // Array of row data
  totalCount: number;        // Total items for pagination
  pageIndex: number;         // Current page (0-based)
  pageSize: number;          // Items per page
  sortField?: string;        // Current sort field
  sortDirection?: 'asc' | 'desc';
  filters?: { [key: string]: any };
}`,

        eventHandling: `// Event handling for list page
@Component({
  template: \`
    <amw-list-page
      [config]="listConfig"
      [dataSource]="dataSource"
      (itemClick)="onItemClick($event)"
      (itemSelect)="onItemSelect($event)"
      (actionClick)="onActionClick($event)"
      (bulkActionClick)="onBulkActionClick($event)"
      (filterChange)="onFilterChange($event)"
      (sortChange)="onSortChange($event)"
      (pageChange)="onPageChange($event)">
    </amw-list-page>
  \`
})
export class ListComponent {
  // Handle row click (navigate to detail)
  onItemClick(item: any): void {
    this.router.navigate(['/employees', item.id]);
  }

  // Handle row selection change
  onItemSelect(event: { item: any; selected: boolean }): void {
    console.log('Selection changed:', event);
    this.updateSelectedItems();
  }

  // Handle row action click (edit, delete, etc.)
  onActionClick(event: { action: string; item: any }): void {
    switch (event.action) {
      case 'edit':
        this.router.navigate(['/employees', event.item.id, 'edit']);
        break;
      case 'delete':
        this.confirmDelete(event.item);
        break;
    }
  }

  // Handle bulk action click
  onBulkActionClick(event: { action: string; items: any[] }): void {
    console.log(\`Bulk \${event.action} on \${event.items.length} items\`);
    if (event.action === 'delete') {
      this.confirmBulkDelete(event.items);
    }
  }

  // Handle filter changes
  onFilterChange(event: { filters: { [key: string]: any }; searchQuery: string }): void {
    console.log('Filters:', event.filters);
    console.log('Search:', event.searchQuery);
    // URL sync, analytics, etc.
  }

  // Handle sort changes
  onSortChange(event: { field: string; direction: 'asc' | 'desc' }): void {
    console.log('Sort by:', event.field, event.direction);
  }

  // Handle page changes
  onPageChange(event: { pageIndex: number; pageSize: number }): void {
    console.log('Page:', event.pageIndex, 'Size:', event.pageSize);
  }
}`
    };

    // API documentation for the API tab
    listPageApiDoc: ApiDocumentation = {
        inputs: [
            {
                name: 'config',
                type: 'ListPageConfig',
                default: '{}',
                description: 'Configuration object containing table columns, actions, pagination settings, and display options'
            },
            {
                name: 'dataSource',
                type: 'ListPageDataSource',
                default: 'undefined',
                description: 'Data source implementation for fetching paginated, sorted, and filtered data'
            },
            {
                name: 'realTimeUpdates',
                type: 'boolean',
                default: 'false',
                description: 'When enabled, subscribes to real-time data updates via WebSocket or polling'
            }
        ],
        outputs: [
            {
                name: 'itemClick',
                type: 'EventEmitter<any>',
                description: 'Emits when a row is clicked, providing the clicked item data'
            },
            {
                name: 'itemSelect',
                type: 'EventEmitter<{ item: any; selected: boolean }>',
                description: 'Emits when a row selection state changes'
            },
            {
                name: 'actionClick',
                type: 'EventEmitter<{ action: string; item: any }>',
                description: 'Emits when a row action button is clicked (edit, delete, etc.)'
            },
            {
                name: 'bulkActionClick',
                type: 'EventEmitter<{ action: string; items: any[] }>',
                description: 'Emits when a bulk action is performed on selected items'
            },
            {
                name: 'filterChange',
                type: 'EventEmitter<{ filters: { [key: string]: any }; searchQuery: string }>',
                description: 'Emits when filters or search query change'
            },
            {
                name: 'sortChange',
                type: 'EventEmitter<{ field: string; direction: "asc" | "desc" }>',
                description: 'Emits when the sort field or direction changes'
            },
            {
                name: 'pageChange',
                type: 'EventEmitter<{ pageIndex: number; pageSize: number }>',
                description: 'Emits when the page index or page size changes'
            }
        ],
        usageNotes: [
            'The list component is designed for displaying and managing tabular data with pagination, sorting, and filtering',
            'Implement ListPageDataSource to integrate with your backend API - the getData method receives all query parameters',
            'Column types include: text, number, currency, date, datetime, boolean, badge, link, image, actions, and custom',
            'Use customRenderer in column config for complex cell content or formatting',
            'Enable selectable and multiSelect for row selection with bulk actions',
            'The component supports three density modes: compact (for data-heavy views), comfortable (default), and spacious',
            'Column visibility can be toggled by users when showColumnVisibility is enabled',
            'Use stickyHeader for tables with many rows to keep column headers visible while scrolling',
            'Custom actions can be added as row-level actions or bulk actions for selected items',
            'The component handles loading states, empty states, and error states automatically'
        ]
    };

    // Interface documentation for the API tab
    listPageInterfaces: ApiInterface[] = [
        {
            name: 'ListPageConfig',
            description: 'Configuration options for the list page component',
            properties: [
                { name: 'title', type: 'string', description: 'The main title displayed at the top of the list' },
                { name: 'subtitle', type: 'string', description: 'Optional subtitle providing additional context' },
                { name: 'showSearch', type: 'boolean', description: 'Whether to show the search input (default: true)' },
                { name: 'showFilters', type: 'boolean', description: 'Whether to show the filter panel (default: false)' },
                { name: 'showBulkActions', type: 'boolean', description: 'Whether to show bulk action buttons (default: false)' },
                { name: 'showExport', type: 'boolean', description: 'Whether to show the export button (default: false)' },
                { name: 'pageSize', type: 'number', description: 'Default number of items per page (default: 10)' },
                { name: 'pageSizeOptions', type: 'number[]', description: 'Available page size options' },
                { name: 'selectable', type: 'boolean', description: 'Whether rows can be selected (default: false)' },
                { name: 'multiSelect', type: 'boolean', description: 'Whether multiple rows can be selected (default: false)' },
                { name: 'columns', type: 'ListPageColumn[]', description: 'Array of column configurations' },
                { name: 'customActions', type: 'ListPageAction[]', description: 'Array of custom action buttons' }
            ]
        },
        {
            name: 'ListPageColumn',
            description: 'Configuration for individual list/table columns',
            properties: [
                { name: 'key', type: 'string', description: 'Data field key for the column' },
                { name: 'title', type: 'string', description: 'Column header text' },
                { name: 'type', type: 'string', description: 'Column type: text, number, currency, date, boolean, badge, etc.' },
                { name: 'sortable', type: 'boolean', description: 'Whether the column is sortable' },
                { name: 'filterable', type: 'boolean', description: 'Whether the column is filterable' },
                { name: 'visible', type: 'boolean', description: 'Whether the column is visible' },
                { name: 'width', type: 'string', description: "Column width (e.g., '200px', '20%')" },
                { name: 'align', type: "'left' | 'center' | 'right'", description: 'Text alignment' }
            ]
        },
        {
            name: 'ListPageDataSource',
            description: 'Interface for list page data source implementations',
            properties: [
                { name: 'getData(params)', type: 'Observable<ListPageData>', description: 'Fetch data with pagination, sorting, and filtering parameters' }
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

    onItemSelect(event: { item: any; selected: boolean }): void {
        console.log('Item selected:', event);
        this.notification.info('Info', `Item ${event.selected ? 'selected' : 'deselected'}`, { duration: 2000 });
    }

    onItemClick(item: any): void {
        this.notification.info('Info', `Clicked on ${item.name}`, { duration: 2000 });
        console.log('Item clicked:', item);
    }

    onActionClick(event: { action: string; item: any }): void {
        console.log('Action clicked:', event);
        this.notification.info('Info', `Action ${event.action} performed on item`, { duration: 2000 });
    }

    onBulkActionClick(event: { action: string; items: any[] }): void {
        console.log('Bulk action clicked:', event);
        this.notification.info('Info', `Bulk action ${event.action} performed on ${event.items.length} items`, { duration: 2000 });
    }

    onFilterChange(event: { filters: { [key: string]: any }; searchQuery: string }): void {
        console.log('Filter changed:', event);
    }

    onSortChange(event: { field: string; direction: 'asc' | 'desc' }): void {
        console.log('Sort changed:', event);
    }

    onPageChange(event: { pageIndex: number; pageSize: number }): void {
        console.log('Page changed:', event);
    }

    onViewChange(index: number): void {
        this.currentViewIndex = index;

        if (index === 1) {
            this.listConfig = {
                ...this.listConfig,
                showFilters: true,
                showBulkActions: true,
                showExport: true,
                showColumnVisibility: true,
                showDensity: true
            };
        } else {
            this.listConfig = {
                ...this.listConfig,
                showFilters: false,
                showBulkActions: false,
                showExport: false,
                showColumnVisibility: false,
                showDensity: false
            };
        }
    }
}
