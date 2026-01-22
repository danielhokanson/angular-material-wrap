import { Component, OnInit, OnDestroy } from '@angular/core';

import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
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
    FormPageAction,
    FormPageValidation
} from '../../../../library/src/pages/components/amw-form-page';

// Import shared components
import { AmwTabsComponent, AmwTabComponent, AmwDividerComponent, AmwCardComponent } from '../../../../library/src/components/components';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwApiDocComponent, ApiInterface } from '../../shared/components/api-doc/api-doc.component';
import { ApiDocumentation } from '../../components/base/base-api.component';

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

    validateData(data: any): Observable<FormPageValidation> {
        const errors: { [key: string]: string } = {};

        if (!data.firstName || data.firstName.trim().length < 2) {
            errors['firstName'] = 'First name must be at least 2 characters';
        }

        if (!data.lastName || data.lastName.trim().length < 2) {
            errors['lastName'] = 'Last name must be at least 2 characters';
        }

        if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors['email'] = 'Please enter a valid email address';
        }

        if (!data.phone || !/^\+?[\d\s\-\(\)]+$/.test(data.phone)) {
            errors['phone'] = 'Please enter a valid phone number';
        }

        if (!data.salary || data.salary < 30000 || data.salary > 500000) {
            errors['salary'] = 'Salary must be between $30,000 and $500,000';
        }

        return of({
            isValid: Object.keys(errors).length === 0,
            errors: errors
        }).pipe(delay(200));
    }
}

@Component({
    selector: 'app-form-page-demo',
    standalone: true,
    imports: [
        AmwFormPageComponent,
        AmwTabsComponent,
        AmwTabComponent,
        AmwDividerComponent,
        AmwButtonComponent,
        AmwCardComponent,
        AmwApiDocComponent,
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
                onClick: (formData: any) => {
                    this.notification.info('Info', 'Duplicating employee record', { duration: 2000 });
                }
            },
            {
                key: 'archive',
                label: 'Archive Employee',
                icon: 'archive',
                color: 'warn',
                onClick: (formData: any) => {
                    this.notification.info('Info', 'Archiving employee record', { duration: 2000 });
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
                        label: 'Benefits Selection',
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
        autoSave: false
    };

    // Data source
    dataSource = new FormPageDemoDataSource();

    // State
    currentItemId = '1';
    currentViewIndex = 0;
    currentMode = 'edit';
    selectedTab = 0; // 0 = Demo, 1 = Code, 2 = API

    // Code examples for the Code tab
    codeExamples = {
        basic: `// Basic usage of AmwFormPageComponent
import { AmwFormPageComponent, FormPageConfig, FormPageDataSource } from 'angular-material-wrap';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [AmwFormPageComponent],
  template: \`
    <amw-form-page
      [config]="formConfig"
      [itemId]="itemId"
      [dataSource]="dataSource"
      (formSubmit)="onFormSubmit($event)"
      (formCancel)="onFormCancel()"
      (formChange)="onFormChange($event)">
    </amw-form-page>
  \`
})
export class EmployeeFormComponent {
  itemId = '1';
  dataSource = new MyFormDataSource();

  formConfig: FormPageConfig = {
    title: 'Employee Form',
    subtitle: 'Create or edit employee information',
    mode: 'edit',
    showSaveButton: true,
    showCancelButton: true,
    sections: [...]
  };

  onFormSubmit(data: any): void {
    console.log('Form submitted:', data);
  }
}`,

        configuration: `// FormPageConfig - Configuration options
const formConfig: FormPageConfig = {
  // Page header
  title: 'Employee Form',
  subtitle: 'Create or edit employee',

  // Form mode
  mode: 'edit',              // 'create' | 'edit' | 'view'

  // Button visibility
  showBackButton: true,
  showSaveButton: true,
  showCancelButton: true,
  showDeleteButton: true,
  showResetButton: true,
  showPreviewButton: false,
  showPrintButton: false,

  // Auto-save functionality
  autoSave: false,
  autoSaveInterval: 30000,   // 30 seconds

  // Form sections
  sections: [
    {
      key: 'personal',
      title: 'Personal Information',
      subtitle: 'Basic personal details',
      icon: 'person',
      collapsible: true,
      collapsed: false,
      fields: [...]
    }
  ],

  // Custom action buttons
  customActions: [
    {
      key: 'duplicate',
      label: 'Duplicate',
      icon: 'content_copy',
      color: 'accent',
      onClick: (formData) => { ... }
    }
  ]
};`,

        fields: `// FormPageField - Field configuration
const field: FormPageField = {
  key: 'email',              // Unique field identifier
  label: 'Email Address',    // Display label
  type: 'email',             // Field type (see below)
  value: '',                 // Initial value
  placeholder: 'Enter email',
  required: true,
  disabled: false,
  visible: true,

  // Type-specific options
  maxLength: 100,            // For text fields
  min: 0,                    // For number fields
  max: 100,                  // For number fields
  step: 1,                   // For number fields
  rows: 4,                   // For textarea
  options: [                 // For select/radio
    { value: 'opt1', label: 'Option 1' }
  ],

  // Validation
  validators: [
    Validators.required,
    Validators.email
  ],
  errorMessages: {
    required: 'Email is required',
    email: 'Invalid email format'
  }
};

// Supported field types:
// 'text', 'email', 'tel', 'password', 'number', 'date',
// 'datetime', 'time', 'textarea', 'select', 'radio',
// 'checkbox', 'toggle', 'chips', 'file', 'custom'`,

        dataSource: `// Implementing FormPageDataSource
import { FormPageDataSource, FormPageValidation } from 'angular-material-wrap';

class MyFormDataSource implements FormPageDataSource {
  // Required: Load form data by ID
  getData(id?: string): Observable<any> {
    if (id) {
      return this.http.get(\`/api/employees/\${id}\`);
    }
    return of({}); // Return empty object for create mode
  }

  // Required: Save form data
  saveData(data: any): Observable<any> {
    if (data.id) {
      return this.http.put(\`/api/employees/\${data.id}\`, data);
    }
    return this.http.post('/api/employees', data);
  }

  // Optional: Delete record
  deleteData(id: string): Observable<boolean> {
    return this.http.delete<boolean>(\`/api/employees/\${id}\`);
  }

  // Optional: Server-side validation
  validateData(data: any): Observable<FormPageValidation> {
    return this.http.post<FormPageValidation>(
      '/api/employees/validate',
      data
    );
  }
}`,

        eventHandling: `// Event handling for form page
@Component({
  template: \`
    <amw-form-page
      [config]="formConfig"
      [itemId]="itemId"
      [dataSource]="dataSource"
      [autoSave]="true"
      (formSubmit)="onFormSubmit($event)"
      (formCancel)="onFormCancel()"
      (formChange)="onFormChange($event)"
      (formReset)="onFormReset()"
      (formDelete)="onFormDelete($event)">
    </amw-form-page>
  \`
})
export class FormComponent {
  // Called when form is submitted
  onFormSubmit(data: any): void {
    console.log('Form submitted:', data);
    this.notification.success('Success', 'Form saved!');
    this.router.navigate(['/employees', data.id]);
  }

  // Called when user cancels
  onFormCancel(): void {
    if (this.hasUnsavedChanges) {
      const confirmed = confirm('Discard unsaved changes?');
      if (!confirmed) return;
    }
    this.router.navigate(['/employees']);
  }

  // Called on every form value change
  onFormChange(data: FormPageData): void {
    console.log('Form changed:', data.values);
    console.log('Is dirty:', data.isDirty);
    console.log('Is valid:', data.isValid);
  }

  // Called when form is reset
  onFormReset(): void {
    console.log('Form reset to initial values');
  }

  // Called when delete is confirmed
  onFormDelete(item: any): void {
    console.log('Item deleted:', item);
    this.router.navigate(['/employees']);
  }
}`
    };

    // API documentation for the API tab
    formPageApiDoc: ApiDocumentation = {
        inputs: [
            {
                name: 'config',
                type: 'FormPageConfig',
                default: '{}',
                description: 'Configuration object containing form title, sections, fields, actions, and display options'
            },
            {
                name: 'itemId',
                type: 'string',
                default: 'undefined',
                description: 'ID of the item to load for editing. If not provided, the form operates in create mode'
            },
            {
                name: 'dataSource',
                type: 'FormPageDataSource',
                default: 'undefined',
                description: 'Data source implementation for loading, saving, deleting, and validating form data'
            },
            {
                name: 'autoSave',
                type: 'boolean',
                default: 'false',
                description: 'When enabled, automatically saves form data at regular intervals'
            },
            {
                name: 'autoSaveInterval',
                type: 'number',
                default: '30000',
                description: 'Interval in milliseconds between auto-save operations (default: 30 seconds)'
            }
        ],
        outputs: [
            {
                name: 'formSubmit',
                type: 'EventEmitter<any>',
                description: 'Emits when the form is successfully submitted with the complete form data'
            },
            {
                name: 'formCancel',
                type: 'EventEmitter<void>',
                description: 'Emits when the user cancels the form'
            },
            {
                name: 'formChange',
                type: 'EventEmitter<FormPageData>',
                description: 'Emits on every form value change with current values, validity, and dirty state'
            },
            {
                name: 'formReset',
                type: 'EventEmitter<void>',
                description: 'Emits when the form is reset to its initial values'
            },
            {
                name: 'formDelete',
                type: 'EventEmitter<any>',
                description: 'Emits when the delete action is confirmed, providing the deleted item'
            }
        ],
        usageNotes: [
            'The form component supports three modes: create (new record), edit (existing record), and view (read-only)',
            'Implement FormPageDataSource to integrate with your backend API for CRUD operations',
            'Configure sections to group related fields together with optional icons and descriptions',
            'Supported field types include: text, email, tel, password, number, date, datetime, time, textarea, select, radio, checkbox, toggle, chips, file, and custom',
            'Use the autoSave feature for long forms to prevent data loss',
            'Custom actions can be added to the toolbar for form-specific operations like duplicate or archive',
            'Field validation supports both Angular validators and custom server-side validation via validateData()',
            'The formChange event provides real-time updates for implementing features like unsaved changes warning',
            'Sections can be made collapsible to improve form usability for large forms',
            'The preview button allows users to see how the data will appear before saving'
        ]
    };

    // Interface documentation for the API tab
    formPageInterfaces: ApiInterface[] = [
        {
            name: 'FormPageConfig',
            description: 'Configuration object for the form page component',
            properties: [
                { name: 'title', type: 'string', description: 'The main title displayed at the top of the form' },
                { name: 'subtitle', type: 'string', description: 'Optional subtitle providing additional context' },
                { name: 'mode', type: "'create' | 'edit' | 'view'", description: "Form operation mode (default: 'create')" },
                { name: 'showBackButton', type: 'boolean', description: 'Whether to show the back button (default: true)' },
                { name: 'showSaveButton', type: 'boolean', description: 'Whether to show the save button (default: true)' },
                { name: 'showCancelButton', type: 'boolean', description: 'Whether to show the cancel button (default: true)' },
                { name: 'showDeleteButton', type: 'boolean', description: 'Whether to show the delete button (default: false)' },
                { name: 'showResetButton', type: 'boolean', description: 'Whether to show the reset button (default: false)' },
                { name: 'showPreviewButton', type: 'boolean', description: 'Whether to show the preview button (default: false)' },
                { name: 'sections', type: 'FormPageSection[]', description: 'Array of form section configurations' },
                { name: 'customActions', type: 'FormPageAction[]', description: 'Array of custom action buttons' },
                { name: 'autoSave', type: 'boolean', description: 'Enable auto-save functionality (default: false)' }
            ]
        },
        {
            name: 'FormPageSection',
            description: 'Configuration for a form section',
            properties: [
                { name: 'key', type: 'string', description: 'Unique identifier for the section' },
                { name: 'title', type: 'string', description: 'Display title for the section' },
                { name: 'subtitle', type: 'string', description: 'Optional section description' },
                { name: 'icon', type: 'string', description: 'Material icon name for the section' },
                { name: 'fields', type: 'FormPageField[]', description: 'Array of field configurations' },
                { name: 'collapsible', type: 'boolean', description: 'Whether the section can be collapsed' },
                { name: 'collapsed', type: 'boolean', description: 'Initial collapsed state' }
            ]
        },
        {
            name: 'FormPageDataSource',
            description: 'Interface for the form page data source',
            properties: [
                { name: 'getData(id?: string)', type: 'Observable<any>', description: 'Load form data by ID (required)' },
                { name: 'saveData(data: any)', type: 'Observable<any>', description: 'Save form data (required)' },
                { name: 'deleteData(id: string)', type: 'Observable<boolean>', description: 'Delete record by ID (optional)' },
                { name: 'validateData(data: any)', type: 'Observable<FormPageValidation>', description: 'Server-side validation (optional)' }
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

    onFormSubmit(data: any): void {
        this.notification.success('Success', 'Form submitted successfully', { duration: 3000 });
        console.log('Form submitted:', data);
    }

    onFormCancel(): void {
        this.notification.info('Info', 'Form cancelled', { duration: 2000 });
        console.log('Form cancelled');
    }

    onFormChange(data: FormPageData): void {
        console.log('Form changed:', data);
    }

    onFormSave(data: any): void {
        this.notification.success('Success', 'Form saved successfully', { duration: 2000 });
        console.log('Form saved:', data);
    }

    onFormDelete(): void {
        this.notification.info('Info', 'Form cancelled', { duration: 2000 });
        console.log('Form cancelled');
    }

    onFormReset(): void {
        this.notification.info('Info', 'Form reset', { duration: 2000 });
        console.log('Form reset');
    }

    onViewChange(index: number): void {
        this.currentViewIndex = index;

        if (index === 1) {
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
                        onClick: (formData: any) => {
                            this.notification.info('Info', 'Advanced options clicked', { duration: 2000 });
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
