import { Component, OnInit, OnDestroy } from '@angular/core';

import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { Subject, takeUntil, BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

// Import the page components
import {
    AmwWorkflowPageComponent,
    WorkflowPageConfig,
    WorkflowPageDataSource,
    WorkflowData,
    WorkflowStep,
    WorkflowAction
} from '../../../../library/src/pages/components/amw-workflow-page';

// Import shared components
import { AmwTabsComponent, AmwTabComponent, AmwCardComponent } from '../../../../library/src/components/components';
import { AmwApiDocComponent, ApiInterface } from '../../shared/components/api-doc/api-doc.component';
import { ApiDocumentation } from '../../components/base/base-api.component';

// Sample workflow data
const SAMPLE_WORKFLOW: WorkflowPageConfig = {
    title: 'Employee Onboarding',
    subtitle: 'Complete the employee onboarding process',
    showProgress: true,
    showStepNumbers: true,
    showStepIcons: true,
    showStepDescriptions: true,
    allowStepNavigation: true,
    allowStepSkipping: true,
    showSaveButton: true,
    showCancelButton: true,
    showResetButton: true,
    showPreviewButton: true,
    customActions: [
        {
            key: 'pause',
            label: 'Pause Workflow',
            icon: 'pause',
            color: 'accent',
            onClick: (data: any) => {
                console.log('Workflow paused');
            }
        },
        {
            key: 'assign',
            label: 'Assign to HR',
            icon: 'person_add',
            color: 'primary',
            onClick: (data: any) => {
                console.log('Workflow assigned to HR');
            }
        }
    ],
    steps: [
        {
            id: 'personal-info',
            title: 'Personal Information',
            description: 'Enter basic personal details and contact information',
            icon: 'person',
            status: 'pending',
            required: true,
            skippable: false,
            data: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: '',
                emergencyContact: ''
            },
            validation: {
                required: true,
                customValidator: (data: any) => {
                    return data.firstName && data.lastName && data.email && data.phone;
                },
                errorMessage: 'Please fill in all required personal information fields'
            }
        },
        {
            id: 'employment-details',
            title: 'Employment Details',
            description: 'Provide employment-related information',
            icon: 'work',
            status: 'pending',
            required: true,
            skippable: false,
            data: {
                jobTitle: '',
                department: '',
                startDate: '',
                employmentType: '',
                manager: '',
                workLocation: ''
            },
            validation: {
                required: true,
                customValidator: (data: any) => {
                    return data.jobTitle && data.department && data.startDate;
                },
                errorMessage: 'Please provide job title, department, and start date'
            }
        },
        {
            id: 'documents',
            title: 'Document Upload',
            description: 'Upload required documents and forms',
            icon: 'upload_file',
            status: 'pending',
            required: true,
            skippable: true,
            data: {
                documents: []
            },
            validation: {
                required: false,
                customValidator: (data: any) => {
                    return data.documents && data.documents.length > 0;
                },
                errorMessage: 'Please upload at least one required document'
            }
        },
        {
            id: 'benefits',
            title: 'Benefits Selection',
            description: 'Choose your benefits package',
            icon: 'card_membership',
            status: 'pending',
            required: true,
            skippable: true,
            data: {
                healthInsurance: '',
                dentalInsurance: false,
                visionInsurance: false,
                retirement401k: false,
                lifeInsurance: false
            },
            validation: {
                required: false,
                customValidator: (data: any) => {
                    return data.healthInsurance;
                },
                errorMessage: 'Please select a health insurance option'
            }
        },
        {
            id: 'equipment',
            title: 'Equipment & Access',
            description: 'Request equipment and system access',
            icon: 'computer',
            status: 'pending',
            required: false,
            skippable: true,
            data: {
                computer: false,
                software: [],
                systemAccess: [],
                phone: false
            }
        },
        {
            id: 'orientation',
            title: 'Orientation & Training',
            description: 'Complete orientation and required training',
            icon: 'school',
            status: 'pending',
            required: true,
            skippable: false,
            data: {
                orientationCompleted: false,
                safetyTraining: false,
                hrPolicies: false,
                roleTraining: false
            },
            validation: {
                required: true,
                customValidator: (data: any) => {
                    return data.orientationCompleted && data.safetyTraining && data.hrPolicies;
                },
                errorMessage: 'Please complete all required training modules'
            }
        },
        {
            id: 'review',
            title: 'Review & Approval',
            description: 'Review all information and submit for approval',
            icon: 'check_circle',
            status: 'pending',
            required: true,
            skippable: false,
            data: {
                personalInfoVerified: false,
                employmentDetailsVerified: false,
                benefitsVerified: false,
                readyForApproval: false
            },
            validation: {
                required: true,
                customValidator: (data: any) => {
                    return data.personalInfoVerified && data.employmentDetailsVerified && data.readyForApproval;
                },
                errorMessage: 'Please verify all information before submitting for approval'
            }
        }
    ]
};

// Custom data source implementation
class WorkflowPageDemoDataSource implements WorkflowPageDataSource {
    constructor(private workflow: WorkflowPageConfig = SAMPLE_WORKFLOW) { }

    getWorkflow(id: string): Observable<WorkflowPageConfig> {
        return of(this.workflow).pipe(delay(300));
    }

    saveStepData(stepId: string, data: any): Observable<boolean> {
        console.log(`Saving step data for ${stepId}:`, data);
        return of(true).pipe(delay(500));
    }

    validateStep(stepId: string, data: any): Observable<{ isValid: boolean; errors: string[] }> {
        const step = this.workflow.steps.find((s: any) => s.id === stepId);
        if (!step || !step.validation) {
            return of({ isValid: true, errors: [] });
        }

        const isValid = step.validation.customValidator ? step.validation.customValidator(data) : true;
        const errors = isValid ? [] : [step.validation.errorMessage || 'Validation failed'];

        return of({ isValid, errors }).pipe(delay(200));
    }

    completeWorkflow(data: any): Observable<boolean> {
        console.log('Completing workflow with data:', data);
        return of(true).pipe(delay(1000));
    }
}

@Component({
    selector: 'app-workflow-page-demo',
    standalone: true,
    imports: [
        AmwWorkflowPageComponent,
        AmwTabsComponent,
        AmwTabComponent,
        AmwCardComponent,
        AmwApiDocComponent,
    ],
    templateUrl: './workflow-page-demo.component.html',
    styleUrl: './workflow-page-demo.component.scss'
})
export class WorkflowPageDemoComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();

    // Configuration
    workflowConfig: WorkflowPageConfig = SAMPLE_WORKFLOW;

    // Data source
    dataSource = new WorkflowPageDemoDataSource();

    // State
    currentWorkflowId = 'employee-onboarding';
    currentViewIndex = 0;
    selectedTab = 0; // 0 = Demo, 1 = Code, 2 = API
    isAdvancedView = false;

    // Code examples for the Code tab
    codeExamples = {
        basic: `// Basic usage of AmwWorkflowPageComponent
import { AmwWorkflowPageComponent, WorkflowPageConfig } from 'angular-material-wrap';

@Component({
  selector: 'app-my-workflow',
  template: \`
    <amw-workflow-page
      [config]="workflowConfig"
      [workflowId]="workflowId"
      [dataSource]="dataSource"
      (stepChange)="onStepChange($event)"
      (workflowComplete)="onWorkflowComplete($event)">
    </amw-workflow-page>
  \`
})
export class MyWorkflowComponent {
  workflowId = 'my-workflow';
  dataSource = new MyWorkflowDataSource();

  workflowConfig: WorkflowPageConfig = {
    title: 'My Workflow',
    subtitle: 'Complete the workflow process',
    showProgress: true,
    showStepNumbers: true,
    steps: [
      {
        id: 'step-1',
        title: 'Step 1',
        description: 'First step description',
        icon: 'looks_one',
        status: 'pending',
        required: true
      },
      {
        id: 'step-2',
        title: 'Step 2',
        description: 'Second step description',
        icon: 'looks_two',
        status: 'pending',
        required: true
      }
    ]
  };
}`,

        configuration: `// WorkflowPageConfig interface
interface WorkflowPageConfig {
  title: string;                    // Workflow title
  subtitle?: string;                // Optional subtitle
  showProgress?: boolean;           // Show progress bar (default: true)
  showStepNumbers?: boolean;        // Show step numbers (default: true)
  showStepIcons?: boolean;          // Show step icons (default: true)
  showStepDescriptions?: boolean;   // Show step descriptions (default: true)
  allowStepNavigation?: boolean;    // Allow clicking steps to navigate (default: true)
  allowStepSkipping?: boolean;      // Allow skipping optional steps (default: false)
  showSaveButton?: boolean;         // Show save button (default: true)
  showCancelButton?: boolean;       // Show cancel button (default: true)
  showResetButton?: boolean;        // Show reset button (default: false)
  showPreviewButton?: boolean;      // Show preview button (default: false)
  customActions?: WorkflowAction[]; // Custom action buttons
  steps: WorkflowStep[];            // Array of workflow steps
}

// WorkflowStep interface
interface WorkflowStep {
  id: string;                       // Unique step identifier
  title: string;                    // Step title
  description?: string;             // Step description
  icon?: string;                    // Material icon name
  status: 'pending' | 'active' | 'completed' | 'error' | 'skipped';
  required?: boolean;               // Is this step required?
  skippable?: boolean;              // Can this step be skipped?
  data?: any;                       // Step-specific data
  validation?: {
    required?: boolean;
    customValidator?: (data: any) => boolean;
    errorMessage?: string;
  };
}`,

        dataSource: `// Implementing WorkflowPageDataSource
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

class MyWorkflowDataSource implements WorkflowPageDataSource {

  // Load workflow configuration by ID
  getWorkflow(id: string): Observable<WorkflowPageConfig> {
    // Fetch workflow config from API
    return this.http.get<WorkflowPageConfig>(\`/api/workflows/\${id}\`);
  }

  // Save step data (called when step is completed or manually saved)
  saveStepData(stepId: string, data: any): Observable<boolean> {
    return this.http.post<boolean>(\`/api/workflows/steps/\${stepId}\`, data);
  }

  // Validate step data before proceeding
  validateStep(stepId: string, data: any): Observable<{ isValid: boolean; errors: string[] }> {
    return this.http.post<{ isValid: boolean; errors: string[] }>(
      \`/api/workflows/steps/\${stepId}/validate\`,
      data
    );
  }

  // Complete the entire workflow
  completeWorkflow(data: any): Observable<boolean> {
    return this.http.post<boolean>('/api/workflows/complete', data);
  }
}`,

        eventHandling: `// Event handling for workflow component
@Component({
  selector: 'app-my-workflow',
  template: \`
    <amw-workflow-page
      [config]="workflowConfig"
      [workflowId]="workflowId"
      [dataSource]="dataSource"
      [autoSave]="true"
      (stepChange)="onStepChange($event)"
      (workflowComplete)="onWorkflowComplete($event)"
      (workflowCancel)="onWorkflowCancel()"
      (workflowSave)="onWorkflowSave($event)"
      (workflowReset)="onWorkflowReset()">
    </amw-workflow-page>
  \`
})
export class MyWorkflowComponent {

  // Called when user navigates to a different step
  onStepChange(event: { step: WorkflowStep; stepIndex: number }): void {
    console.log('Navigated to step:', event.step.title);
    // Track analytics, update UI state, etc.
  }

  // Called when workflow is completed
  onWorkflowComplete(data: any): void {
    console.log('Workflow completed with data:', data);
    this.notification.success('Success', 'Workflow completed!');
    this.router.navigate(['/dashboard']);
  }

  // Called when user cancels the workflow
  onWorkflowCancel(): void {
    console.log('Workflow cancelled');
    if (confirm('Are you sure you want to cancel?')) {
      this.router.navigate(['/home']);
    }
  }

  // Called when workflow is saved (manual or auto-save)
  onWorkflowSave(data: any): void {
    console.log('Workflow saved:', data);
    this.notification.info('Saved', 'Progress has been saved');
  }

  // Called when workflow is reset to initial state
  onWorkflowReset(): void {
    console.log('Workflow reset');
    this.notification.info('Reset', 'Workflow has been reset');
  }
}`,

        customActions: `// Adding custom actions to the workflow
const workflowConfig: WorkflowPageConfig = {
  title: 'Employee Onboarding',
  steps: [...],
  customActions: [
    {
      key: 'pause',
      label: 'Pause Workflow',
      icon: 'pause',
      color: 'accent',
      onClick: (data: any) => {
        console.log('Workflow paused');
        // Save current state and pause
      }
    },
    {
      key: 'assign',
      label: 'Assign to HR',
      icon: 'person_add',
      color: 'primary',
      disabled: false,
      onClick: (data: any) => {
        // Open assignment dialog
        this.openAssignmentDialog(data);
      }
    },
    {
      key: 'export',
      label: 'Export',
      icon: 'download',
      color: 'basic',
      onClick: (data: any) => {
        // Export workflow data
        this.exportWorkflowData(data);
      }
    }
  ]
};`
    };

    // API documentation for the API tab
    workflowPageApiDoc: ApiDocumentation = {
        inputs: [
            {
                name: 'config',
                type: 'WorkflowPageConfig',
                default: '{}',
                description: 'Configuration object containing workflow title, steps, actions, and display options'
            },
            {
                name: 'workflowId',
                type: 'string',
                default: '""',
                description: 'Unique identifier for the workflow instance, used to load and save workflow state'
            },
            {
                name: 'dataSource',
                type: 'WorkflowPageDataSource',
                default: 'undefined',
                description: 'Data source implementation for loading workflow configuration, saving step data, and validation'
            },
            {
                name: 'autoSave',
                type: 'boolean',
                default: 'false',
                description: 'When enabled, automatically saves step data when navigating between steps'
            }
        ],
        outputs: [
            {
                name: 'stepChange',
                type: 'EventEmitter<{ step: WorkflowStep; stepIndex: number }>',
                description: 'Emits when the user navigates to a different step, providing the new step and its index'
            },
            {
                name: 'workflowComplete',
                type: 'EventEmitter<any>',
                description: 'Emits when the workflow is successfully completed, providing all collected workflow data'
            },
            {
                name: 'workflowCancel',
                type: 'EventEmitter<void>',
                description: 'Emits when the user cancels the workflow'
            },
            {
                name: 'workflowSave',
                type: 'EventEmitter<any>',
                description: 'Emits when the workflow data is saved (manually or via auto-save), providing current data'
            },
            {
                name: 'workflowReset',
                type: 'EventEmitter<void>',
                description: 'Emits when the workflow is reset to its initial state'
            }
        ],
        usageNotes: [
            'The workflow component provides a step-by-step process for completing complex tasks',
            'Implement WorkflowPageDataSource to integrate with your backend API for data persistence',
            'Use the config.steps array to define each step with its title, description, icon, and validation rules',
            'Steps can be marked as required or skippable - skippable steps allow users to proceed without completion',
            'Custom validators can be defined per step using the validation.customValidator function',
            'Enable autoSave to automatically persist step data when users navigate between steps',
            'Use customActions to add workflow-specific buttons like "Assign", "Pause", or "Export"',
            'The component tracks step status (pending, active, completed, error, skipped) automatically',
            'Progress is displayed visually with a stepper component and optional progress bar',
            'Navigation between steps can be restricted based on validation rules and step requirements'
        ]
    };

    // Interface documentation for the API tab
    workflowPageInterfaces: ApiInterface[] = [
        {
            name: 'WorkflowPageConfig',
            description: 'Configuration options for the workflow page component',
            properties: [
                { name: 'title', type: 'string', description: 'The main title displayed at the top of the workflow' },
                { name: 'subtitle', type: 'string', description: 'Optional subtitle providing additional context' },
                { name: 'showProgress', type: 'boolean', description: 'Whether to display the progress bar (default: true)' },
                { name: 'showStepNumbers', type: 'boolean', description: 'Whether to display step numbers in the stepper (default: true)' },
                { name: 'showStepIcons', type: 'boolean', description: 'Whether to display icons for each step (default: true)' },
                { name: 'showStepDescriptions', type: 'boolean', description: 'Whether to display step descriptions (default: true)' },
                { name: 'allowStepNavigation', type: 'boolean', description: 'Whether users can click on steps to navigate (default: true)' },
                { name: 'allowStepSkipping', type: 'boolean', description: 'Whether optional steps can be skipped (default: false)' },
                { name: 'showSaveButton', type: 'boolean', description: 'Whether to show the save button (default: true)' },
                { name: 'showCancelButton', type: 'boolean', description: 'Whether to show the cancel button (default: true)' },
                { name: 'showResetButton', type: 'boolean', description: 'Whether to show the reset button (default: false)' },
                { name: 'showPreviewButton', type: 'boolean', description: 'Whether to show the preview button (default: false)' },
                { name: 'customActions', type: 'WorkflowAction[]', description: 'Array of custom action buttons to add to the toolbar' },
                { name: 'steps', type: 'WorkflowStep[]', description: 'Array of workflow step configurations' }
            ]
        },
        {
            name: 'WorkflowStep',
            description: 'Configuration for individual workflow steps',
            properties: [
                { name: 'id', type: 'string', description: 'Unique identifier for the step' },
                { name: 'title', type: 'string', description: 'Display title for the step' },
                { name: 'description', type: 'string', description: 'Optional description text for the step' },
                { name: 'icon', type: 'string', description: 'Material icon name to display for the step' },
                { name: 'status', type: "'pending' | 'active' | 'completed' | 'error' | 'skipped'", description: 'Current status of the step' },
                { name: 'required', type: 'boolean', description: 'Whether the step must be completed' },
                { name: 'skippable', type: 'boolean', description: 'Whether the step can be skipped' },
                { name: 'data', type: 'any', description: 'Step-specific data object' },
                { name: 'validation', type: 'WorkflowStepValidation', description: 'Validation configuration for the step' }
            ]
        },
        {
            name: 'WorkflowPageDataSource',
            description: 'Interface for workflow page data source implementations',
            properties: [
                { name: 'getWorkflow(id: string)', type: 'Observable<WorkflowPageConfig>', description: 'Load workflow configuration by ID' },
                { name: 'saveStepData(stepId: string, data: any)', type: 'Observable<boolean>', description: 'Save data for a specific step' },
                { name: 'validateStep(stepId: string, data: any)', type: 'Observable<{ isValid: boolean; errors: string[] }>', description: 'Validate step data before proceeding' },
                { name: 'completeWorkflow(data: any)', type: 'Observable<boolean>', description: 'Complete the entire workflow with all collected data' }
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

    onStepChange(event: { step: WorkflowStep; stepIndex: number }): void {
        console.log('Step changed:', event);
        this.notification.info('Info', `Switched to step: ${event.step.title}`, { duration: 2000 });
    }

    onWorkflowComplete(data: any): void {
        this.notification.success('Success', 'Workflow completed successfully!', { duration: 3000 });
        console.log('Workflow completed:', data);
    }

    onWorkflowCancel(): void {
        this.notification.info('Info', 'Workflow cancelled', { duration: 2000 });
        console.log('Workflow cancelled');
    }

    onWorkflowSave(data: any): void {
        this.notification.success('Success', 'Workflow saved', { duration: 2000 });
        console.log('Workflow saved:', data);
    }

    onWorkflowReset(): void {
        this.notification.info('Info', 'Workflow reset', { duration: 2000 });
        console.log('Workflow reset');
    }

    onViewToggle(isAdvanced: boolean): void {
        this.isAdvancedView = isAdvanced;

        if (isAdvanced) {
            this.workflowConfig = {
                ...this.workflowConfig,
                showPreviewButton: true,
                customActions: [
                    ...this.workflowConfig.customActions || [],
                    {
                        key: 'advanced',
                        label: 'Advanced Options',
                        icon: 'settings',
                        color: 'accent',
                        onClick: (data: any) => {
                            this.notification.info('Info', 'Advanced options clicked', { duration: 2000 });
                        }
                    }
                ]
            };
        } else {
            this.workflowConfig = {
                ...this.workflowConfig,
                showPreviewButton: false,
                customActions: this.workflowConfig.customActions?.filter((action: any) => action.key !== 'advanced') || []
            };
        }
    }
}
