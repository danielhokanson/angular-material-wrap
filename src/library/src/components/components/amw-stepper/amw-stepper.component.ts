import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Subject, takeUntil } from 'rxjs';
import { BaseComponent } from '../../../controls/components/base/base.component';
import { StepperConfig, StepperStep } from './interfaces';
import { AmwButtonComponent } from '../../../controls/components/amw-button/amw-button.component';

/**
 * Angular Material Wrap Stepper Component
 * 
 * A flexible stepper component that provides step-by-step navigation
 * with comprehensive configuration options and accessibility support.
 * 
 * @example
 * ```html
 * <amw-stepper
 *   [config]="stepperConfig"
 *   [steps]="stepperSteps"
 *   [currentStep]="0"
 *   (stepChange)="onStepChange($event)"
 *   (completed)="onStepperCompleted()">
 * </amw-stepper>
 * ```
 */
@Component({
    selector: 'amw-stepper',
    standalone: true,
    imports: [
        CommonModule,
        MatStepperModule,
        AmwButtonComponent,
        MatIconModule,
        MatCardModule,
        MatDividerModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-stepper.component.html',
    styleUrl: './amw-stepper.component.scss'
})
export class AmwStepperComponent extends BaseComponent implements OnInit, OnDestroy {
    /** Stepper configuration */
    @Input() config?: StepperConfig;

    /** Array of stepper steps */
    @Input() steps: StepperStep[] = [];

    /** Current active step index */
    @Input() currentStep: number = 0;

    /** Whether the stepper is disabled */
    @Input() override disabled: boolean = false;

    /** Whether the stepper is linear (must complete steps in order) */
    @Input() linear: boolean = true;

    /** Whether the stepper is vertical */
    @Input() vertical: boolean = false;

    /** Whether to show step labels */
    @Input() showLabels: boolean = true;

    /** Whether to show step icons */
    @Input() showIcons: boolean = true;

    /** Whether to show step descriptions */
    @Input() showDescriptions: boolean = true;

    /** Whether to show navigation buttons */
    @Input() showNavigation: boolean = true;

    /** Whether to show completion button */
    @Input() showCompletion: boolean = true;

    /** Step change event */
    @Output() stepChange = new EventEmitter<number>();

    /** Stepper completed event */
    @Output() completed = new EventEmitter<void>();

    /** Step validation event */
    @Output() stepValidated = new EventEmitter<{ stepIndex: number; isValid: boolean }>();

    /** Current stepper configuration */
    currentConfig: StepperConfig = {};

    /** Subject for component destruction */
    private destroy$ = new Subject<void>();

    /** Whether the stepper is currently completing */
    isCompleting = false;

    constructor(private cdr: ChangeDetectorRef) {
        super();
    }

    ngOnInit(): void {
        this.initializeConfig();
        this.validateSteps();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    /**
     * Initializes the stepper configuration
     */
    private initializeConfig(): void {
        this.currentConfig = {
            orientation: 'horizontal',
            linear: true,
            showLabels: true,
            showIcons: true,
            showDescriptions: true,
            showNavigation: true,
            showCompletion: true,
            allowBackNavigation: true,
            allowSkipSteps: false,
            validateSteps: true,
            animationDuration: 300,
            animationEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            ...this.config
        };
    }

    /**
     * Validates all steps
     */
    private validateSteps(): void {
        this.steps.forEach((step, index) => {
            if (step.validator) {
                const isValid = step.validator(step);
                step.isValid = isValid;
                this.stepValidated.emit({ stepIndex: index, isValid });
            }
        });
    }

    /**
     * Goes to the next step
     */
    nextStep(): void {
        if (this.canGoNext()) {
            const nextStep = this.currentStep + 1;
            this.goToStep(nextStep);
        }
    }

    /**
     * Goes to the previous step
     */
    previousStep(): void {
        if (this.canGoBack()) {
            const prevStep = this.currentStep - 1;
            this.goToStep(prevStep);
        }
    }

    /**
     * Goes to a specific step
     */
    goToStep(stepIndex: number): void {
        if (this.isValidStepIndex(stepIndex) && this.canGoToStep(stepIndex)) {
            this.currentStep = stepIndex;
            this.stepChange.emit(stepIndex);
            this.cdr.detectChanges();
        }
    }

    /**
     * Completes the stepper
     */
    completeStepper(): void {
        if (this.canComplete()) {
            this.isCompleting = true;
            this.completed.emit();
            this.cdr.detectChanges();
        }
    }

    /**
     * Resets the stepper
     */
    resetStepper(): void {
        this.currentStep = 0;
        this.isCompleting = false;
        this.steps.forEach(step => {
            step.isCompleted = false;
            step.isValid = true;
        });
        this.cdr.detectChanges();
    }

    /**
     * Checks if can go to next step
     */
    canGoNext(): boolean {
        return this.currentStep < this.steps.length - 1 &&
            (!this.currentConfig.linear || this.isCurrentStepValid());
    }

    /**
     * Checks if can go to previous step
     */
    canGoBack(): boolean {
        return this.currentStep > 0 && (this.currentConfig.allowBackNavigation ?? true);
    }

    /**
     * Checks if can go to specific step
     */
    canGoToStep(stepIndex: number): boolean {
        if (!this.isValidStepIndex(stepIndex)) return false;

        if (this.currentConfig.linear) {
            // In linear mode, can only go to current step or next step
            return stepIndex <= this.currentStep + 1;
        }

        return true;
    }

    /**
     * Checks if can complete stepper
     */
    canComplete(): boolean {
        return this.currentStep === this.steps.length - 1 &&
            this.isCurrentStepValid() &&
            !this.isCompleting;
    }

    /**
     * Checks if current step is valid
     */
    isCurrentStepValid(): boolean {
        const currentStep = this.steps[this.currentStep];
        return currentStep ? (currentStep.isValid ?? true) : true;
    }

    /**
     * Checks if step index is valid
     */
    private isValidStepIndex(stepIndex: number): boolean {
        return stepIndex >= 0 && stepIndex < this.steps.length;
    }

    /**
     * Gets the current step
     */
    getCurrentStep(): StepperStep | undefined {
        return this.steps[this.currentStep];
    }

    /**
     * Gets the progress percentage
     */
    getProgress(): number {
        return ((this.currentStep + 1) / this.steps.length) * 100;
    }

    /**
     * Checks if step is completed
     */
    isStepCompleted(stepIndex: number): boolean {
        return this.steps[stepIndex]?.isCompleted ?? false;
    }

    /**
     * Checks if step is active
     */
    isStepActive(stepIndex: number): boolean {
        return stepIndex === this.currentStep;
    }

    /**
     * Checks if step is accessible
     */
    isStepAccessible(stepIndex: number): boolean {
        if (!this.currentConfig.linear) return true;
        return stepIndex <= this.currentStep + 1;
    }
}
