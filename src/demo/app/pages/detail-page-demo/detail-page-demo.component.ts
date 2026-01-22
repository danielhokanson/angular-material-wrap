import { Component, OnInit, OnDestroy } from '@angular/core';

import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { Subject, takeUntil, BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

// Import the page components
import {
    AmwDetailPageComponent,
    DetailPageConfig,
    DetailPageDataSource,
    DetailPageData,
    DetailPageSection,
    DetailPageField,
    DetailPageRelatedData
} from '../../../../library/src/pages/components/amw-detail-page';

// Import shared components
import { AmwTabsComponent, AmwTabComponent, AmwCardComponent } from '../../../../library/src/components/components';
import { AmwApiDocComponent, ApiInterface } from '../../shared/components/api-doc/api-doc.component';
import { ApiDocumentation } from '../../components/base/base-api.component';

// Sample data
const SAMPLE_EMPLOYEE = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    department: 'Engineering',
    role: 'Senior Developer',
    status: 'Active',
    salary: 95000,
    startDate: new Date('2022-01-15'),
    location: 'San Francisco, CA',
    address: '123 Main St, San Francisco, CA 94105',
    skills: ['Angular', 'TypeScript', 'Node.js', 'AWS', 'Docker'],
    performance: 4.8,
    manager: 'Sarah Johnson',
    team: 'Frontend Development',
    bio: 'Experienced full-stack developer with 8+ years of experience in web development. Passionate about creating scalable and maintainable applications.',
    emergencyContact: {
        name: 'Jane Doe',
        relationship: 'Spouse',
        phone: '+1 (555) 987-6543'
    },
    benefits: {
        healthInsurance: 'Premium Plan',
        dentalInsurance: 'Standard Plan',
        visionInsurance: 'Standard Plan',
        retirement401k: '6% Match',
        vacationDays: 20,
        sickDays: 10
    }
};

const SAMPLE_PROJECTS = [
    {
        id: 1,
        name: 'Customer Portal Redesign',
        status: 'In Progress',
        startDate: new Date('2023-01-01'),
        endDate: new Date('2023-06-30'),
        progress: 75,
        team: ['John Doe', 'Jane Smith', 'Mike Johnson'],
        description: 'Complete redesign of the customer portal with modern UI/UX'
    },
    {
        id: 2,
        name: 'API Migration',
        status: 'Completed',
        startDate: new Date('2022-08-01'),
        endDate: new Date('2022-12-15'),
        progress: 100,
        team: ['John Doe', 'Tom Anderson'],
        description: 'Migration from REST to GraphQL API'
    },
    {
        id: 3,
        name: 'Mobile App Development',
        status: 'Planning',
        startDate: new Date('2023-07-01'),
        endDate: new Date('2023-12-31'),
        progress: 10,
        team: ['John Doe', 'Emily Taylor', 'David Brown'],
        description: 'Development of mobile companion app'
    }
];

const SAMPLE_PERFORMANCE_REVIEWS = [
    {
        id: 1,
        period: 'Q4 2022',
        rating: 4.8,
        goals: [
            'Complete API migration project',
            'Improve code quality metrics',
            'Mentor junior developers'
        ],
        achievements: [
            'Successfully completed API migration ahead of schedule',
            'Reduced code complexity by 30%',
            'Mentored 2 junior developers'
        ],
        areasForImprovement: [
            'Improve documentation practices',
            'Increase test coverage'
        ]
    },
    {
        id: 2,
        period: 'Q3 2022',
        rating: 4.6,
        goals: [
            'Lead customer portal redesign',
            'Implement new testing framework',
            'Improve team collaboration'
        ],
        achievements: [
            'Led successful portal redesign project',
            'Implemented comprehensive testing suite',
            'Improved team velocity by 25%'
        ],
        areasForImprovement: [
            'Better time management',
            'More proactive communication'
        ]
    }
];

// Custom data source implementation
class DetailPageDemoDataSource implements DetailPageDataSource {
    constructor(private data: any = SAMPLE_EMPLOYEE) { }

    getData(id: string): Observable<DetailPageData> {
        // Simulate API delay
        return of({
            item: this.data,
            sections: this.buildSections(),
            relatedData: this.buildRelatedData()
        }).pipe(delay(300));
    }

    deleteItem(id: string): Observable<boolean> {
        return of(true).pipe(delay(500));
    }

    refreshItem(id: string): Observable<DetailPageData> {
        return this.getData(id);
    }

    private buildSections(): DetailPageSection[] {
        return [
            {
                key: 'personal',
                title: 'Personal Information',
                subtitle: 'Basic personal details and contact information',
                icon: 'person',
                fields: [
                    {
                        key: 'name',
                        label: 'Full Name',
                        value: this.data.name,
                        type: 'text',
                        icon: 'person',
                        copyable: true
                    },
                    {
                        key: 'email',
                        label: 'Email Address',
                        value: this.data.email,
                        type: 'email',
                        icon: 'email',
                        copyable: true,
                        linkable: true,
                        linkUrl: `mailto:${this.data.email}`
                    },
                    {
                        key: 'phone',
                        label: 'Phone Number',
                        value: this.data.phone,
                        type: 'phone',
                        icon: 'phone',
                        copyable: true,
                        linkable: true,
                        linkUrl: `tel:${this.data.phone}`
                    },
                    {
                        key: 'address',
                        label: 'Address',
                        value: this.data.address,
                        type: 'text',
                        icon: 'location_on',
                        copyable: true
                    }
                ]
            },
            {
                key: 'professional',
                title: 'Professional Information',
                subtitle: 'Work-related details and career information',
                icon: 'work',
                fields: [
                    {
                        key: 'department',
                        label: 'Department',
                        value: this.data.department,
                        type: 'text',
                        icon: 'business',
                        color: 'primary'
                    },
                    {
                        key: 'role',
                        label: 'Job Title',
                        value: this.data.role,
                        type: 'text',
                        icon: 'badge',
                        color: 'accent'
                    },
                    {
                        key: 'manager',
                        label: 'Manager',
                        value: this.data.manager,
                        type: 'text',
                        icon: 'supervisor_account',
                        color: 'primary'
                    },
                    {
                        key: 'team',
                        label: 'Team',
                        value: this.data.team,
                        type: 'text',
                        icon: 'group',
                        color: 'accent'
                    },
                    {
                        key: 'startDate',
                        label: 'Start Date',
                        value: this.data.startDate,
                        type: 'date',
                        icon: 'event',
                        color: 'primary'
                    },
                    {
                        key: 'status',
                        label: 'Employment Status',
                        value: this.data.status,
                        type: 'text',
                        icon: 'check_circle',
                        color: this.data.status === 'Active' ? 'primary' : 'warn'
                    }
                ]
            },
            {
                key: 'compensation',
                title: 'Compensation & Benefits',
                subtitle: 'Salary and benefits information',
                icon: 'attach_money',
                fields: [
                    {
                        key: 'salary',
                        label: 'Annual Salary',
                        value: this.data.salary,
                        type: 'currency',
                        icon: 'attach_money',
                        color: 'primary'
                    },
                    {
                        key: 'benefits',
                        label: 'Benefits Package',
                        value: this.data.benefits,
                        type: 'custom',
                        customRenderer: (value: any) => {
                            return `${value.healthInsurance} • ${value.retirement401k} • ${value.vacationDays} vacation days`;
                        },
                        icon: 'card_membership',
                        color: 'accent'
                    }
                ]
            },
            {
                key: 'skills',
                title: 'Skills & Performance',
                subtitle: 'Technical skills and performance metrics',
                icon: 'star',
                fields: [
                    {
                        key: 'skills',
                        label: 'Technical Skills',
                        value: this.data.skills,
                        type: 'custom',
                        customRenderer: (value: string[]) => value.join(', '),
                        icon: 'code',
                        color: 'primary'
                    },
                    {
                        key: 'performance',
                        label: 'Performance Rating',
                        value: this.data.performance,
                        type: 'number',
                        icon: 'star',
                        color: this.data.performance >= 4.5 ? 'primary' : 'accent'
                    },
                    {
                        key: 'bio',
                        label: 'Bio',
                        value: this.data.bio,
                        type: 'text',
                        icon: 'description',
                        color: 'primary'
                    }
                ]
            }
        ];
    }

    private buildRelatedData(): DetailPageRelatedData[] {
        return [
            {
                key: 'projects',
                title: 'Current Projects',
                type: 'table',
                data: SAMPLE_PROJECTS,
                columns: [
                    { key: 'name', title: 'Project Name', type: 'text' },
                    { key: 'status', title: 'Status', type: 'text' },
                    { key: 'progress', title: 'Progress', type: 'number' },
                    { key: 'team', title: 'Team Size', type: 'number' }
                ],
                visible: true,
                collapsible: true,
                expanded: true
            },
            {
                key: 'performance',
                title: 'Performance Reviews',
                type: 'list',
                data: SAMPLE_PERFORMANCE_REVIEWS.map(review =>
                    `${review.period}: ${review.rating}/5.0 - ${review.achievements.length} achievements`
                ),
                visible: true,
                collapsible: true,
                expanded: false
            }
        ];
    }
}

@Component({
    selector: 'app-detail-page-demo',
    standalone: true,
    imports: [
        AmwDetailPageComponent,
        AmwTabsComponent,
        AmwTabComponent,
        AmwCardComponent,
        AmwApiDocComponent,
    ],
    templateUrl: './detail-page-demo.component.html',
    styleUrl: './detail-page-demo.component.scss'
})
export class DetailPageDemoComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();

    // Configuration
    detailConfig: DetailPageConfig = {
        title: 'Employee Details',
        subtitle: 'View comprehensive employee information',
        showBackButton: true,
        showEditButton: true,
        showDeleteButton: true,
        showPrintButton: true,
        showShareButton: true,
        showRefreshButton: true,
        customActions: [
            {
                key: 'export',
                label: 'Export Profile',
                icon: 'download',
                color: 'primary',
                onClick: (item: any) => {
                    this.notification.info('Info', `Exporting profile for ${item.name}`, { duration: 2000 });
                }
            },
            {
                key: 'schedule',
                label: 'Schedule Meeting',
                icon: 'event',
                color: 'accent',
                onClick: (item: any) => {
                    this.notification.info('Info', `Scheduling meeting with ${item.name}`, { duration: 2000 });
                }
            }
        ]
    };

    // Data source
    dataSource = new DetailPageDemoDataSource();

    // State
    currentItemId = '1';
    currentViewIndex = 0;
    selectedTab = 0; // 0 = Demo, 1 = Code, 2 = API

    // Code examples for the Code tab
    codeExamples = {
        basic: `// Basic usage of AmwDetailPageComponent
import { AmwDetailPageComponent, DetailPageConfig, DetailPageDataSource } from 'angular-material-wrap';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [AmwDetailPageComponent],
  template: \`
    <amw-detail-page
      [config]="detailConfig"
      [itemId]="itemId"
      [dataSource]="dataSource"
      (editClick)="onEditClick($event)"
      (deleteClick)="onDeleteClick($event)"
      (backClick)="onBackClick()">
    </amw-detail-page>
  \`
})
export class EmployeeDetailComponent {
  itemId = '1';
  dataSource = new MyDetailDataSource();

  detailConfig: DetailPageConfig = {
    title: 'Employee Details',
    subtitle: 'View employee information',
    showBackButton: true,
    showEditButton: true,
    showDeleteButton: true
  };

  onEditClick(item: any): void {
    this.router.navigate(['/employees', item.id, 'edit']);
  }
}`,

        configuration: `// DetailPageConfig - Configuration options
const detailConfig: DetailPageConfig = {
  // Page header
  title: 'Employee Details',
  subtitle: 'View comprehensive information',

  // Action buttons
  showBackButton: true,       // Show back navigation button
  showEditButton: true,       // Show edit button
  showDeleteButton: true,     // Show delete button
  showPrintButton: true,      // Show print button
  showShareButton: true,      // Show share button
  showRefreshButton: true,    // Show refresh button

  // Custom action buttons
  customActions: [
    {
      key: 'export',
      label: 'Export Profile',
      icon: 'download',
      color: 'primary',
      onClick: (item) => { ... }
    },
    {
      key: 'schedule',
      label: 'Schedule Meeting',
      icon: 'event',
      color: 'accent',
      onClick: (item) => { ... }
    }
  ]
};`,

        sections: `// DetailPageSection - Section configuration
const sections: DetailPageSection[] = [
  {
    key: 'personal',          // Unique section identifier
    title: 'Personal Information',
    subtitle: 'Basic personal details',
    icon: 'person',           // Material icon
    collapsible: true,        // Can section be collapsed
    collapsed: false,         // Initial collapsed state
    fields: [                 // Array of field definitions
      {
        key: 'name',
        label: 'Full Name',
        value: 'John Doe',
        type: 'text',
        icon: 'person',
        copyable: true        // Show copy button
      },
      {
        key: 'email',
        label: 'Email',
        value: 'john@example.com',
        type: 'email',
        icon: 'email',
        copyable: true,
        linkable: true,       // Make it a clickable link
        linkUrl: 'mailto:john@example.com'
      }
    ]
  }
];

// Supported field types:
// 'text', 'email', 'phone', 'number', 'currency', 'date',
// 'datetime', 'boolean', 'badge', 'link', 'image', 'custom'`,

        dataSource: `// Implementing DetailPageDataSource
import { DetailPageDataSource, DetailPageData } from 'angular-material-wrap';

class MyDetailDataSource implements DetailPageDataSource {
  // Required: Fetch item data by ID
  getData(id: string): Observable<DetailPageData> {
    return this.http.get<any>(\`/api/employees/\${id}\`).pipe(
      map(item => ({
        item: item,
        sections: this.buildSections(item),
        relatedData: this.buildRelatedData(item)
      }))
    );
  }

  // Optional: Delete item
  deleteItem(id: string): Observable<boolean> {
    return this.http.delete<boolean>(\`/api/employees/\${id}\`);
  }

  // Optional: Refresh item data
  refreshItem(id: string): Observable<DetailPageData> {
    return this.getData(id);
  }

  // Build sections from item data
  private buildSections(item: any): DetailPageSection[] {
    return [
      {
        key: 'personal',
        title: 'Personal Information',
        icon: 'person',
        fields: [
          { key: 'name', label: 'Name', value: item.name, type: 'text' },
          { key: 'email', label: 'Email', value: item.email, type: 'email' }
        ]
      }
    ];
  }

  // Build related data sections
  private buildRelatedData(item: any): DetailPageRelatedData[] {
    return [
      {
        key: 'projects',
        title: 'Projects',
        type: 'table',
        data: item.projects,
        columns: [
          { key: 'name', title: 'Name', type: 'text' },
          { key: 'status', title: 'Status', type: 'badge' }
        ]
      }
    ];
  }
}`,

        eventHandling: `// Event handling for detail page
@Component({
  template: \`
    <amw-detail-page
      [config]="detailConfig"
      [itemId]="itemId"
      [dataSource]="dataSource"
      [realTimeUpdates]="false"
      (editClick)="onEditClick($event)"
      (deleteClick)="onDeleteClick($event)"
      (backClick)="onBackClick()"
      (actionClick)="onActionClick($event)"
      (refreshClick)="onRefreshClick($event)">
    </amw-detail-page>
  \`
})
export class DetailComponent {
  // Handle edit button click
  onEditClick(item: any): void {
    this.router.navigate(['/employees', item.id, 'edit']);
  }

  // Handle delete button click
  onDeleteClick(item: any): void {
    const confirmed = confirm(\`Delete \${item.name}?\`);
    if (confirmed) {
      this.dataSource.deleteItem(item.id).subscribe(() => {
        this.notification.success('Deleted', 'Employee deleted');
        this.router.navigate(['/employees']);
      });
    }
  }

  // Handle back button click
  onBackClick(): void {
    this.router.navigate(['/employees']);
  }

  // Handle custom action clicks
  onActionClick(event: { action: string; item: any }): void {
    switch (event.action) {
      case 'export':
        this.exportEmployee(event.item);
        break;
      case 'schedule':
        this.scheduleMeeting(event.item);
        break;
    }
  }

  // Handle refresh click
  onRefreshClick(item: any): void {
    console.log('Refreshing data for:', item.id);
    // Data will be automatically reloaded
  }
}`,

        relatedData: `// DetailPageRelatedData - Related data sections
const relatedData: DetailPageRelatedData[] = [
  {
    key: 'projects',
    title: 'Current Projects',
    type: 'table',            // 'table', 'list', 'cards', 'timeline'
    data: projectsArray,
    columns: [                // For table type
      { key: 'name', title: 'Project Name', type: 'text' },
      { key: 'status', title: 'Status', type: 'badge' },
      { key: 'progress', title: 'Progress', type: 'number' }
    ],
    visible: true,
    collapsible: true,
    expanded: true
  },
  {
    key: 'reviews',
    title: 'Performance Reviews',
    type: 'list',             // Simple list rendering
    data: reviewStrings,      // Array of strings
    visible: true,
    collapsible: true,
    expanded: false
  },
  {
    key: 'activity',
    title: 'Recent Activity',
    type: 'timeline',         // Timeline rendering
    data: activityItems,
    visible: true,
    collapsible: true,
    expanded: true
  }
];`
    };

    // Interface documentation for the API tab
    detailPageInterfaces: ApiInterface[] = [
        {
            name: 'DetailPageConfig',
            description: 'Configuration options for the detail page component.',
            properties: [
                { name: 'title', type: 'string', description: 'The main title displayed at the top of the page' },
                { name: 'subtitle', type: 'string', description: 'Optional subtitle providing additional context' },
                { name: 'showBackButton', type: 'boolean', description: 'Whether to show the back button (default: true)' },
                { name: 'showEditButton', type: 'boolean', description: 'Whether to show the edit button (default: true)' },
                { name: 'showDeleteButton', type: 'boolean', description: 'Whether to show the delete button (default: false)' },
                { name: 'showPrintButton', type: 'boolean', description: 'Whether to show the print button (default: false)' },
                { name: 'showShareButton', type: 'boolean', description: 'Whether to show the share button (default: false)' },
                { name: 'showRefreshButton', type: 'boolean', description: 'Whether to show the refresh button (default: false)' },
                { name: 'customActions', type: 'DetailPageAction[]', description: 'Array of custom action buttons' }
            ]
        },
        {
            name: 'DetailPageSection',
            description: 'Configuration for a section within the detail page.',
            properties: [
                { name: 'key', type: 'string', description: 'Unique identifier for the section' },
                { name: 'title', type: 'string', description: 'Display title for the section' },
                { name: 'subtitle', type: 'string', description: 'Optional section description' },
                { name: 'icon', type: 'string', description: 'Material icon name for the section' },
                { name: 'fields', type: 'DetailPageField[]', description: 'Array of field definitions' },
                { name: 'collapsible', type: 'boolean', description: 'Whether the section can be collapsed' },
                { name: 'collapsed', type: 'boolean', description: 'Initial collapsed state' }
            ]
        },
        {
            name: 'DetailPageField',
            description: 'Configuration for a field within a detail page section.',
            properties: [
                { name: 'key', type: 'string', description: 'Unique field identifier' },
                { name: 'label', type: 'string', description: 'Display label for the field' },
                { name: 'value', type: 'any', description: 'Field value to display' },
                { name: 'type', type: 'string', description: 'Field type: text, email, phone, number, currency, date, etc.' },
                { name: 'icon', type: 'string', description: 'Material icon for the field' },
                { name: 'copyable', type: 'boolean', description: 'Whether to show copy button' },
                { name: 'linkable', type: 'boolean', description: 'Whether the value is a clickable link' },
                { name: 'linkUrl', type: 'string', description: 'URL for linkable fields' }
            ]
        },
        {
            name: 'DetailPageDataSource',
            description: 'Interface for the data source that provides detail page data.',
            properties: [
                { name: 'getData(id: string)', type: 'Observable<DetailPageData>', description: 'Load item data including sections and related data (required)' },
                { name: 'deleteItem(id: string)', type: 'Observable<boolean>', description: 'Delete item by ID (optional)' },
                { name: 'refreshItem(id: string)', type: 'Observable<DetailPageData>', description: 'Refresh item data (optional)' }
            ]
        }
    ];

    // API documentation for the API tab
    detailPageApiDoc: ApiDocumentation = {
        inputs: [
            {
                name: 'config',
                type: 'DetailPageConfig',
                default: '{}',
                description: 'Configuration object containing page title, action buttons, and display options'
            },
            {
                name: 'itemId',
                type: 'string',
                default: 'undefined',
                description: 'ID of the item to load and display'
            },
            {
                name: 'dataSource',
                type: 'DetailPageDataSource',
                default: 'undefined',
                description: 'Data source implementation for loading item data, sections, and related data'
            },
            {
                name: 'realTimeUpdates',
                type: 'boolean',
                default: 'false',
                description: 'When enabled, subscribes to real-time updates for the displayed item'
            }
        ],
        outputs: [
            {
                name: 'editClick',
                type: 'EventEmitter<any>',
                description: 'Emits when the edit button is clicked, providing the current item'
            },
            {
                name: 'deleteClick',
                type: 'EventEmitter<any>',
                description: 'Emits when the delete button is clicked, providing the current item'
            },
            {
                name: 'backClick',
                type: 'EventEmitter<void>',
                description: 'Emits when the back button is clicked'
            },
            {
                name: 'actionClick',
                type: 'EventEmitter<{ action: string; item: any }>',
                description: 'Emits when a custom action button is clicked'
            },
            {
                name: 'refreshClick',
                type: 'EventEmitter<any>',
                description: 'Emits when the refresh button is clicked'
            },
            {
                name: 'printClick',
                type: 'EventEmitter<any>',
                description: 'Emits when the print button is clicked'
            },
            {
                name: 'shareClick',
                type: 'EventEmitter<any>',
                description: 'Emits when the share button is clicked'
            }
        ],
        usageNotes: [
            'The detail page component is designed for displaying comprehensive information about a single item',
            'Implement DetailPageDataSource to structure your item data into sections and fields',
            'Sections group related fields together with optional icons and descriptions',
            'Fields support various types: text, email, phone, number, currency, date, boolean, badge, link, image, and custom',
            'Use copyable: true to add a copy button for field values',
            'Use linkable: true with linkUrl to make field values clickable links',
            'Related data sections support different display types: table, list, cards, and timeline',
            'Custom actions can be added for item-specific operations like export, schedule, or archive',
            'Enable realTimeUpdates for live data synchronization via WebSocket or polling',
            'The component automatically handles loading states and error handling'
        ]
    };

    constructor(private notification: AmwNotificationService) { }

    ngOnInit(): void {
        // Initialize component
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onActionClick(event: { action: string; item: any }): void {
        console.log('Action clicked:', event);
    }

    onItemDelete(item: any): void {
        this.notification.info('Info', `Deleting employee ${item?.id || 'unknown'}`, { duration: 2000 });
        console.log('Item deleted:', item);
    }

    onItemRefresh(item: any): void {
        this.notification.info('Info', `Refreshing employee ${item?.id || 'unknown'}`, { duration: 2000 });
        console.log('Item refreshed:', item);
    }

    onBackClick(): void {
        this.notification.info('Info', 'Navigating back', { duration: 2000 });
        console.log('Back clicked');
    }

    onViewChange(index: number): void {
        this.currentViewIndex = index;

        if (index === 1) {
            this.detailConfig = {
                ...this.detailConfig,
                showPrintButton: true,
                showShareButton: true,
                customActions: [
                    ...this.detailConfig.customActions || [],
                    {
                        key: 'advanced',
                        label: 'Advanced Actions',
                        icon: 'settings',
                        color: 'accent',
                        onClick: (item: any) => {
                            this.notification.info('Info', 'Advanced actions clicked', { duration: 2000 });
                        }
                    }
                ]
            };
        } else {
            this.detailConfig = {
                ...this.detailConfig,
                showPrintButton: false,
                showShareButton: false,
                customActions: this.detailConfig.customActions?.filter((action: any) => action.key !== 'advanced') || []
            };
        }
    }
}
