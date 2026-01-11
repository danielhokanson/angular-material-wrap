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
import { AmwTabsComponent, AmwTabComponent, AmwCardComponent, AmwIconComponent } from '../../../../library/src/components/components';
import { AmwChipsComponent } from '../../../../library/src/controls/components/amw-chips/amw-chips.component';

@Component({
    selector: 'app-list-page-demo',
    standalone: true,
    imports: [
    AmwListPageComponent,
    AmwTabsComponent,
    AmwTabComponent,
    AmwCardComponent,
    AmwIconComponent,
    AmwChipsComponent,
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
