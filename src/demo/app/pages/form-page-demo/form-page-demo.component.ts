import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    AmwFormPageComponent,
    FormPageConfig,
    FormPageDataSource,
    FormPageData,
    FormPageSection,
    FormPageField,
    FormPageAction
} from '../../../../library/src/pages/components/amw-form-page';

// Sample data
const SAMPLE_EMPLOYEE = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    department: 'Engineering',
    role: 'Senior Developer',
    status: 'Active',
    salary: 95000,
    startDate: new Date('2022-01-15'),
    location: 'San Francisco, CA',
    address: '123 Main St, San Francisco, CA 94105',
    skills: ['Angular', 'TypeScript', 'Node.js'],
    bio: 'Experienced full-stack developer with 8+ years of experience.',
    emergencyContact: {
        name: 'Jane Doe',
        relationship: 'Spouse',
        phone: '+1 (555) 987-6543'
    },
    benefits: {
        healthInsurance: true,
        dentalInsurance: true,
        visionInsurance: false,
        retirement401k: true
    },
    preferences: {
        notifications: true,
        emailUpdates: true,
        smsUpdates: false,
        darkMode: false
    }
};

// Custom data source implementation
class FormPageDemoDataSource implements FormPageDataSource {
    constructor(private data: any = SAMPLE_EMPLOYEE) { }

    getData(id?: string): Observable<any> {
        // Simulate API delay
        return of(this.data).pipe(delay(300));
    }

    saveData(data: any): Observable<any> {
        // Simulate API delay
        return of({ ...data, id: data.id || Date.now(), savedAt: new Date() }).pipe(delay(1000));
    }

    deleteData(id: string): Observable<boolean> {
        return of(true).pipe(delay(500));
    }

    validateData(data: any): Observable<{ [key: string]: string[] }> {
        const errors: { [key: string]: string[] } = {};

        if (!data.firstName || data.firstName.trim().length < 2) {
            errors['firstName'] = ['First name must be at least 2 characters'];
        }

        if (!data.lastName || data.lastName.trim().length < 2) {
            errors['lastName'] = ['Last name must be at least 2 characters'];
        }

        if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors['email'] = ['Please enter a valid email address'];
        }

        if (!data.phone || !/^\+?[\d\s\-\(\)]+$/.test(data.phone)) {
            errors['phone'] = ['Please enter a valid phone number'];
        }

        if (!data.salary || data.salary < 30000 || data.salary > 500000) {
            errors['salary'] = ['Salary must be between $30,000 and $500,000'];
        }

        return of(errors).pipe(delay(200));
    }
}

@Component({
    selector: 'app-form-page-demo',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        MatDividerModule,
        MatTabsModule,
        MatExpansionModule,
        MatTooltipModule,
        MatSnackBarModule,
        AmwFormPageComponent
    ],
    templateUrl: './form-page-demo.component.html',
    styleUrl: './form-page-demo.component.scss'
})
export class FormPageDemoComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();

    // Configuration
    formConfig: FormPageConfig = {
        title: 'Employee Form',
        subtitle: 'Create or edit employee information',
        mode: 'edit',
        showBackButton: true,
        showSaveButton: true,
        showCancelButton: true,
        showDeleteButton: true,
        showResetButton: true,
        showPreviewButton: true,
        showPrintButton: false,
        customActions: [
            {
                key: 'duplicate',
                label: 'Duplicate Employee',
                icon: 'content_copy',
                color: 'accent',
                onClick: (form: any, data: any) => {
                    this.snackBar.open('Duplicating employee record', 'Close', { duration: 2000 });
                }
            },
            {
                key: 'archive',
                label: 'Archive Employee',
                icon: 'archive',
                color: 'warn',
                onClick: (form: any, data: any) => {
                    this.snackBar.open('Archiving employee record', 'Close', { duration: 2000 });
                }
            }
        ],
        sections: [
            {
                key: 'personal',
                title: 'Personal Information',
                subtitle: 'Basic personal details and contact information',
                icon: 'person',
                fields: [
                    {
                        key: 'firstName',
                        label: 'First Name',
                        type: 'text',
                        value: '',
                        placeholder: 'Enter first name',
                        required: true,
                        maxLength: 50,
                        visible: true
                    },
                    {
                        key: 'lastName',
                        label: 'Last Name',
                        type: 'text',
                        value: '',
                        placeholder: 'Enter last name',
                        required: true,
                        maxLength: 50,
                        visible: true
                    },
                    {
                        key: 'email',
                        label: 'Email Address',
                        type: 'email',
                        value: '',
                        placeholder: 'Enter email address',
                        required: true,
                        visible: true
                    },
                    {
                        key: 'phone',
                        label: 'Phone Number',
                        type: 'tel',
                        value: '',
                        placeholder: 'Enter phone number',
                        required: true,
                        visible: true
                    },
                    {
                        key: 'address',
                        label: 'Address',
                        type: 'textarea',
                        value: '',
                        placeholder: 'Enter full address',
                        rows: 3,
                        visible: true
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
                        type: 'select',
                        value: '',
                        required: true,
                        options: [
                            { value: '', label: 'Select Department' },
                            { value: 'Engineering', label: 'Engineering' },
                            { value: 'Design', label: 'Design' },
                            { value: 'Marketing', label: 'Marketing' },
                            { value: 'Sales', label: 'Sales' },
                            { value: 'HR', label: 'Human Resources' },
                            { value: 'Finance', label: 'Finance' },
                            { value: 'Operations', label: 'Operations' }
                        ],
                        visible: true
                    },
                    {
                        key: 'role',
                        label: 'Job Title',
                        type: 'text',
                        value: '',
                        placeholder: 'Enter job title',
                        required: true,
                        maxLength: 100,
                        visible: true
                    },
                    {
                        key: 'status',
                        label: 'Employment Status',
                        type: 'select',
                        value: 'Active',
                        required: true,
                        options: [
                            { value: 'Active', label: 'Active' },
                            { value: 'Inactive', label: 'Inactive' },
                            { value: 'On Leave', label: 'On Leave' },
                            { value: 'Terminated', label: 'Terminated' }
                        ],
                        visible: true
                    },
                    {
                        key: 'salary',
                        label: 'Annual Salary',
                        type: 'number',
                        value: 0,
                        placeholder: 'Enter annual salary',
                        required: true,
                        min: 30000,
                        max: 500000,
                        step: 1000,
                        visible: true
                    },
                    {
                        key: 'startDate',
                        label: 'Start Date',
                        type: 'date',
                        value: new Date(),
                        required: true,
                        visible: true
                    },
                    {
                        key: 'location',
                        label: 'Work Location',
                        type: 'text',
                        value: '',
                        placeholder: 'Enter work location',
                        visible: true
                    }
                ]
            },
            {
                key: 'skills',
                title: 'Skills & Preferences',
                subtitle: 'Technical skills and work preferences',
                icon: 'star',
                fields: [
                    {
                        key: 'skills',
                        label: 'Technical Skills',
                        type: 'chips',
                        value: [],
                        placeholder: 'Add skills',
                        visible: true
                    },
                    {
                        key: 'bio',
                        label: 'Bio/Description',
                        type: 'textarea',
                        value: '',
                        placeholder: 'Enter a brief bio or description',
                        rows: 4,
                        maxLength: 500,
                        visible: true
                    },
                    {
                        key: 'benefits',
                        title: 'Benefits Selection',
                        type: 'custom',
                        value: {},
                        visible: true,
                        customComponent: null // Would be a custom benefits component
                    }
                ]
            },
            {
                key: 'preferences',
                title: 'User Preferences',
                subtitle: 'Notification and display preferences',
                icon: 'settings',
                fields: [
                    {
                        key: 'notifications',
                        label: 'Enable Notifications',
                        type: 'toggle',
                        value: true,
                        visible: true
                    },
                    {
                        key: 'emailUpdates',
                        label: 'Email Updates',
                        type: 'checkbox',
                        value: true,
                        visible: true
                    },
                    {
                        key: 'smsUpdates',
                        label: 'SMS Updates',
                        type: 'checkbox',
                        value: false,
                        visible: true
                    },
                    {
                        key: 'darkMode',
                        label: 'Dark Mode',
                        type: 'toggle',
                        value: false,
                        visible: true
                    }
                ]
            }
        ],
        validation: {
            showErrorsOnSubmit: true,
            showErrorsOnBlur: true,
            showErrorsOnChange: false
        },
        autoSave: false,
        autoSaveInterval: 30000,
        showProgress: true
    };

    // Data source
    dataSource = new FormPageDemoDataSource();

    // State
    currentItemId = '1';
    currentView = 'basic';
    currentMode = 'edit';

    constructor(private snackBar: MatSnackBar) { }

    ngOnInit(): void {
        // Initialize component
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onFormSubmit(data: any): void {
        this.snackBar.open('Form submitted successfully', 'Close', { duration: 3000 });
        console.log('Form submitted:', data);
    }

    onFormCancel(): void {
        this.snackBar.open('Form cancelled', 'Close', { duration: 2000 });
        console.log('Form cancelled');
    }

    onFormChange(data: FormPageData): void {
        console.log('Form changed:', data);
    }

    onFormSave(data: any): void {
        this.snackBar.open('Form saved successfully', 'Close', { duration: 2000 });
        console.log('Form saved:', data);
    }

    onFormDelete(itemId: string): void {
        this.snackBar.open(`Employee ${itemId} deleted`, 'Close', { duration: 2000 });
        console.log('Form deleted:', itemId);
    }

    onFormReset(): void {
        this.snackBar.open('Form reset', 'Close', { duration: 2000 });
        console.log('Form reset');
    }

    onViewChange(view: string): void {
        this.currentView = view;

        if (view === 'advanced') {
            this.formConfig = {
                ...this.formConfig,
                showPreviewButton: true,
                showPrintButton: true,
                autoSave: true,
                customActions: [
                    ...this.formConfig.customActions || [],
                    {
                        key: 'advanced',
                        label: 'Advanced Options',
                        icon: 'settings',
                        color: 'accent',
                        onClick: (form: any, data: any) => {
                            this.snackBar.open('Advanced options clicked', 'Close', { duration: 2000 });
                        }
                    }
                ]
            };
        } else {
            this.formConfig = {
                ...this.formConfig,
                showPreviewButton: false,
                showPrintButton: false,
                autoSave: false,
                customActions: this.formConfig.customActions?.filter((action: any) => action.key !== 'advanced') || []
            };
        }
    }

    onModeChange(mode: 'create' | 'edit' | 'view'): void {
        this.currentMode = mode;
        this.formConfig = {
            ...this.formConfig,
            mode: mode
        };
    }
}
