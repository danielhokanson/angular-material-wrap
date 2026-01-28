import { Component, input, output, signal, model, computed, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { AmwIconComponent } from '../amw-icon/amw-icon.component';
import { MatDividerModule } from '@angular/material/divider';
import { Subject } from 'rxjs';
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
        AmwIconComponent,
        MatCardModule,
        MatDividerModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-stepper.component.html',
    styleUrl: './amw-stepper.component.scss'
})
export class AmwStepperComponent extends BaseComponent implements OnInit, OnDestroy {
    /** Stepper configuration */
    config = input<StepperConfig | undefined>(undefined);

    /** Array of stepper steps */
    steps = input<StepperStep[]>([]);

    /** Current active step index */
    currentStepIndex = input<number>(0);

    /** Whether the stepper is disabled */
    override disabled = input<boolean>(false);

    /** Whether the stepper is linear (must complete steps in order) */
    linear = input<boolean>(true);

    /** Whether the stepper is vertical */
    vertical = input<boolean>(false);

    /** Whether to show step labels */
    showLabels = input<boolean>(true);

    /** Whether to show step icons */
    showIcons = input<boolean>(true);

    /** Whether to show step descriptions */
    showDescriptions = input<boolean>(true);

    /** Whether to show navigation buttons */
    showNavigation = input<boolean>(true);

    /** Whether to show completion button */
    showCompletion = input<boolean>(true);

    /** Step change event */
    stepChange = output<number>();

    /** Stepper completed event */
    completed = output<void>();

    /** Step validation event */
    stepValidated = output<{ stepIndex: number; isValid: boolean }>();

    /** Current stepper configuration */
    currentConfig = signal<StepperConfig>({});

    /** Subject for component destruction */
    private destroy$ = new Subject<void>();

    /** Whether the stepper is currently completing */
    isCompleting = signal<boolean>(false);

    /** Current step - model signal for two-way binding */
    currentStep = model<number>(0);

    constructor(private cdr: ChangeDetectorRef) {
        super();
    }

    ngOnInit(): void {
        this.currentStep.set(this.currentStepIndex());
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
        this.currentConfig.set({
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
            ...this.config()
        });
    }

    /**
     * Validates all steps
     */
    private validateSteps(): void {
        this.steps().forEach((step, index) => {
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
            const nextStep = this.currentStep() + 1;
            this.goToStep(nextStep);
        }
    }

    /**
     * Goes to the previous step
     */
    previousStep(): void {
        if (this.canGoBack()) {
            const prevStep = this.currentStep() - 1;
            this.goToStep(prevStep);
        }
    }

    /**
     * Goes to a specific step
     */
    goToStep(stepIndex: number): void {
        if (this.isValidStepIndex(stepIndex) && this.canGoToStep(stepIndex)) {
            this.currentStep.set(stepIndex);
            this.stepChange.emit(stepIndex);
            this.cdr.detectChanges();
        }
    }

    /**
     * Completes the stepper
     */
    completeStepper(): void {
        if (this.canComplete()) {
            this.isCompleting.set(true);
            this.completed.emit();
            this.cdr.detectChanges();
        }
    }

    /**
     * Resets the stepper
     */
    resetStepper(): void {
        this.currentStep.set(0);
        this.isCompleting.set(false);
        this.steps().forEach(step => {
            step.isCompleted = false;
            step.isValid = true;
        });
        this.cdr.detectChanges();
    }

    /**
     * Checks if can go to next step
     */
    canGoNext(): boolean {
        return this.currentStep() < this.steps().length - 1 &&
            (!this.currentConfig().linear || this.isCurrentStepValid());
    }

    /**
     * Checks if can go to previous step
     */
    canGoBack(): boolean {
        return this.currentStep() > 0 && (this.currentConfig().allowBackNavigation ?? true);
    }

    /**
     * Checks if can go to specific step
     */
    canGoToStep(stepIndex: number): boolean {
        if (!this.isValidStepIndex(stepIndex)) return false;

        if (this.currentConfig().linear) {
            // In linear mode, can only go to current step or next step
            return stepIndex <= this.currentStep() + 1;
        }

        return true;
    }

    /**
     * Checks if can complete stepper
     */
    canComplete(): boolean {
        return this.currentStep() === this.steps().length - 1 &&
            this.isCurrentStepValid() &&
            !this.isCompleting();
    }

    /**
     * Checks if current step is valid
     */
    isCurrentStepValid(): boolean {
        const currentStepData = this.steps()[this.currentStep()];
        return currentStepData ? (currentStepData.isValid ?? true) : true;
    }

    /**
     * Checks if step index is valid
     */
    private isValidStepIndex(stepIndex: number): boolean {
        return stepIndex >= 0 && stepIndex < this.steps().length;
    }

    /**
     * Gets the current step
     */
    getCurrentStep(): StepperStep | undefined {
        return this.steps()[this.currentStep()];
    }

    /**
     * Gets the progress percentage
     */
    getProgress(): number {
        return ((this.currentStep() + 1) / this.steps().length) * 100;
    }

    /**
     * Checks if step is completed
     */
    isStepCompleted(stepIndex: number): boolean {
        return this.steps()[stepIndex]?.isCompleted ?? false;
    }

    /**
     * Checks if step is active
     */
    isStepActive(stepIndex: number): boolean {
        return stepIndex === this.currentStep();
    }

    /**
     * Checks if step is accessible
     */
    isStepAccessible(stepIndex: number): boolean {
        if (!this.currentConfig().linear) return true;
        return stepIndex <= this.currentStep() + 1;
    }
}
