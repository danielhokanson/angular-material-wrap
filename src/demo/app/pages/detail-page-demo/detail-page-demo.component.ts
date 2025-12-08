import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
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
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatTabsModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSnackBarModule,
    AmwDetailPageComponent
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
                    this.snackBar.open(`Exporting profile for ${item.name}`, 'Close', { duration: 2000 });
                }
            },
            {
                key: 'schedule',
                label: 'Schedule Meeting',
                icon: 'event',
                color: 'accent',
                onClick: (item: any) => {
                    this.snackBar.open(`Scheduling meeting with ${item.name}`, 'Close', { duration: 2000 });
                }
            }
        ]
    };

    // Data source
    dataSource = new DetailPageDemoDataSource();

    // State
    currentItemId = '1';
    currentView = 'basic';

    constructor(private snackBar: MatSnackBar) { }

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
        this.snackBar.open(`Deleting employee ${item?.id || 'unknown'}`, 'Close', { duration: 2000 });
        console.log('Item deleted:', item);
    }

    onItemRefresh(item: any): void {
        this.snackBar.open(`Refreshing employee ${item?.id || 'unknown'}`, 'Close', { duration: 2000 });
        console.log('Item refreshed:', item);
    }

    onBackClick(): void {
        this.snackBar.open('Navigating back', 'Close', { duration: 2000 });
        console.log('Back clicked');
    }

    onViewChange(view: string): void {
        this.currentView = view;

        if (view === 'advanced') {
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
                            this.snackBar.open('Advanced actions clicked', 'Close', { duration: 2000 });
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
