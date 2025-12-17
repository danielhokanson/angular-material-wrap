import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectorRef, Inject, Optional, Injectable, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil, BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

// Injection token for WorkflowPageDataSource
export const WORKFLOW_PAGE_DATA_SOURCE = new InjectionToken<WorkflowPageDataSource>('WorkflowPageDataSource');

// Import interfaces
import { WorkflowPageConfig, WorkflowStep, WorkflowData, WorkflowPageDataSource } from './interfaces';

// Default data source implementation
@Injectable()
export class DefaultWorkflowPageDataSource implements WorkflowPageDataSource {
    constructor() { }

    getWorkflow(id: string): Observable<WorkflowPageConfig> {
        const workflow: WorkflowPageConfig = {
            title: 'Workflow',
            steps: []
        };
        return of(workflow).pipe(delay(500));
    }

    saveStepData(stepId: string, data: any): Observable<boolean> {
        return of(true).pipe(delay(500));
    }

    validateStep(stepId: string, data: any): Observable<{ isValid: boolean; errors: string[] }> {
        return of({ isValid: true, errors: [] }).pipe(delay(500));
    }

    completeWorkflow(data: any): Observable<boolean> {
        return of(true).pipe(delay(500));
    }
}

@Component({
    selector: 'amw-workflow-page',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatStepperModule,
        MatProgressBarModule,
        MatChipsModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MatExpansionModule,
        MatTooltipModule,
        MatSnackBarModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-workflow-page.component.html',
    styleUrl: './amw-workflow-page.component.scss',
    providers: [
        { provide: WORKFLOW_PAGE_DATA_SOURCE, useFactory: () => new DefaultWorkflowPageDataSource() }
    ]
})
export class AmwWorkflowPageComponent implements OnInit, OnDestroy {
    @Input() config: WorkflowPageConfig = { steps: [] };
    @Input() workflowId?: string;
    @Input() dataSource?: WorkflowPageDataSource;
    @Input() autoSave = false;
    @Input() autoSaveInterval = 30000; // 30 seconds

    @Output() stepChange = new EventEmitter<{ step: WorkflowStep; stepIndex: number }>();
    @Output() workflowComplete = new EventEmitter<any>();
    @Output() workflowCancel = new EventEmitter<void>();
    @Output() workflowSave = new EventEmitter<any>();
    @Output() workflowReset = new EventEmitter<void>();
    @Output() customAction = new EventEmitter<{ action: string; step: WorkflowStep; stepIndex: number; data: any }>();

    // Current state
    currentConfig: WorkflowPageConfig = { steps: [] };
    currentData: WorkflowData = {
        currentStep: 0,
        completedSteps: 0,
        totalSteps: 0,
        stepData: {},
        errors: {}
    };

    // Form
    form: FormGroup = new FormGroup({});

    // UI state
    loading = false;
    saving = false;
    error: string | null = null;

    // Subject for component destruction
    private destroy$ = new Subject<void>();

    // Math object for templates
    Math = Math;

    constructor(
        private cdr: ChangeDetectorRef,
        private snackBar: MatSnackBar,
        private fb: FormBuilder,
        @Optional() @Inject(WORKFLOW_PAGE_DATA_SOURCE) private injectedDataSource?: WorkflowPageDataSource
    ) { }

    ngOnInit(): void {
        this.initializeConfig();
        this.initializeForm();
        if (this.workflowId) {
            this.loadWorkflow();
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private initializeConfig(): void {
        this.currentConfig = {
            title: 'Workflow',
            subtitle: 'Complete the workflow steps',
            showSaveButton: true,
            showCancelButton: true,
            showResetButton: true,
            showPreviewButton: false,
            customActions: [],
            customClasses: [],
            customStyles: {},
            ...this.config
        };
    }

    private initializeForm(): void {
        const controls: { [key: string]: any } = {};
        this.form = this.fb.group(controls);
    }

    loadWorkflow(): void {
        if (!this.workflowId) return;

        this.loading = true;
        this.error = null;

        const dataSource = this.dataSource || this.injectedDataSource;
        if (!dataSource) {
            this.error = 'No data source provided';
            this.loading = false;
            return;
        }

        dataSource.getWorkflow(this.workflowId).pipe(
            takeUntil(this.destroy$)
        ).subscribe({
            next: (workflow) => {
                this.currentConfig = { ...this.currentConfig, ...workflow };
                this.currentData.totalSteps = this.currentConfig.steps.length;
                this.loading = false;
                this.cdr.detectChanges();
            },
            error: (err) => {
                this.error = err.message || 'Failed to load workflow';
                this.loading = false;
                this.cdr.detectChanges();
            }
        });
    }

    // Public methods for template
    onNextStep(): void {
        if (this.currentData.currentStep < this.currentData.totalSteps - 1) {
            this.currentData.currentStep++;
            this.updateStepStatus();
            this.cdr.detectChanges();
        }
    }

    onPreviousStep(): void {
        if (this.currentData.currentStep > 0) {
            this.currentData.currentStep--;
            this.updateStepStatus();
            this.cdr.detectChanges();
        }
    }

    onStepClick(stepIndex: number): void {
        if (stepIndex <= this.currentData.completedSteps || stepIndex === this.currentData.currentStep) {
            this.currentData.currentStep = stepIndex;
            this.updateStepStatus();
            this.cdr.detectChanges();
        }
    }

    onCompleteWorkflow(): void {
        this.saving = true;
        const dataSource = this.dataSource || this.injectedDataSource;
        if (dataSource) {
            dataSource.completeWorkflow(this.currentData.stepData).pipe(
                takeUntil(this.destroy$)
            ).subscribe({
                next: (success) => {
                    this.saving = false;
                    if (success) {
                        this.snackBar.open('Workflow completed successfully', 'Close', { duration: 3000 });
                        this.workflowComplete.emit(this.currentData.stepData);
                    } else {
                        this.snackBar.open('Failed to complete workflow', 'Close', { duration: 3000 });
                    }
                },
                error: (err) => {
                    this.saving = false;
                    this.snackBar.open('Error completing workflow', 'Close', { duration: 3000 });
                }
            });
        } else {
            this.saving = false;
            this.workflowComplete.emit(this.currentData.stepData);
        }
    }

    onCancelWorkflow(): void {
        this.workflowCancel.emit();
    }

    onSaveWorkflow(): void {
        this.workflowSave.emit(this.currentData.stepData);
    }

    onResetWorkflow(): void {
        this.currentData.currentStep = 0;
        this.currentData.completedSteps = 0;
        this.currentData.stepData = {};
        this.currentData.errors = {};
        this.updateStepStatus();
        this.workflowReset.emit();
    }

    onActionClick(action: string): void {
        // Emit custom action event with action name, current step, and workflow data
        const currentStep = this.getCurrentStep();
        if (currentStep) {
            this.customAction.emit({
                action,
                step: currentStep,
                stepIndex: this.currentData.currentStep,
                data: this.currentData.stepData
            });
            this.snackBar.open(`Custom action '${action}' triggered for step ${this.currentData.currentStep + 1}`, 'Close', { duration: 3000 });
        } else {
            this.snackBar.open(`Invalid workflow state`, 'Close', { duration: 3000 });
        }
    }

    private updateStepStatus(): void {
        this.currentConfig.steps.forEach((step, index) => {
            if (index < this.currentData.currentStep) {
                step.status = 'completed';
            } else if (index === this.currentData.currentStep) {
                step.status = 'current';
            } else {
                step.status = 'pending';
            }
        });
        this.currentData.completedSteps = this.currentData.currentStep;
    }

    getCurrentStep(): WorkflowStep | undefined {
        return this.currentConfig.steps[this.currentData.currentStep];
    }

    getStepStatus(stepIndex: number): string {
        const step = this.currentConfig.steps[stepIndex];
        return step ? step.status : 'pending';
    }

    isStepCompleted(stepIndex: number): boolean {
        return stepIndex < this.currentData.completedSteps;
    }

    isStepCurrent(stepIndex: number): boolean {
        return stepIndex === this.currentData.currentStep;
    }

    isStepAccessible(stepIndex: number): boolean {
        return stepIndex <= this.currentData.completedSteps || stepIndex === this.currentData.currentStep;
    }

    getProgressPercentage(): number {
        return this.currentData.totalSteps > 0 ? (this.currentData.completedSteps / this.currentData.totalSteps) * 100 : 0;
    }

    canGoNext(): boolean {
        return this.currentData.currentStep < this.currentData.totalSteps - 1;
    }

    canGoPrevious(): boolean {
        return this.currentData.currentStep > 0;
    }

    isWorkflowComplete(): boolean {
        return this.currentData.currentStep === this.currentData.totalSteps - 1;
    }
}