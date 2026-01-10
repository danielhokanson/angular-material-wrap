import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
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
import { AmwTabsComponent } from '@angular/material/tabs';

@Component({
    selector: 'app-workflow-page-demo',
    standalone: true,
    imports: [
    MatIconModule,
    MatTooltipModule,
    AmwWorkflowPageComponent,
    AmwTabsComponent,
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
    currentView = 'basic';

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

    onViewChange(view: string): void {
        this.currentView = view;

        if (view === 'advanced') {
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
