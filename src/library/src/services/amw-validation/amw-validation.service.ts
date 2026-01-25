import { Injectable, signal, computed, WritableSignal, Signal } from '@angular/core';
import { AbstractControl, FormGroup, FormControl } from '@angular/forms';

/**
 * Represents a single validation violation
 */
export interface ValidationViolation {
    /** Unique identifier for this violation */
    id: string;
    /** The validation message to display */
    message: string;
    /** Severity level of the violation */
    severity: 'error' | 'warning' | 'info';
    /** Optional field name this violation is associated with */
    field?: string;
    /** Optional control reference for automatic reevaluation */
    control?: AbstractControl;
    /** Custom validator function for reevaluation */
    validator?: () => boolean;
}

/**
 * Configuration for validation behavior
 */
export interface ValidationConfig {
    /** Whether to auto-reevaluate when controls change */
    autoReevaluate?: boolean;
    /** Debounce time for reevaluation (ms) */
    debounceTime?: number;
    /** Whether errors should disable submit buttons */
    disableOnErrors?: boolean;
    /** Whether warnings should disable submit buttons */
    disableOnWarnings?: boolean;
}

/**
 * Validation context for a component
 */
export interface ValidationContext {
    /** Unique ID for this context */
    id: string;
    /** The violations for this context */
    violations: WritableSignal<ValidationViolation[]>;
    /** Whether the context has any errors */
    hasErrors: Signal<boolean>;
    /** Whether the context has any warnings */
    hasWarnings: Signal<boolean>;
    /** Whether submit should be disabled */
    isSubmitDisabled: Signal<boolean>;
    /** Configuration for this context */
    config: ValidationConfig;
}

const DEFAULT_CONFIG: ValidationConfig = {
    autoReevaluate: true,
    debounceTime: 300,
    disableOnErrors: true,
    disableOnWarnings: false
};

/**
 * AMW Validation Service
 *
 * Provides centralized validation management for components.
 * Components can create validation contexts, add/remove violations,
 * and automatically reevaluate when associated controls change.
 *
 * @example
 * ```typescript
 * // In your component
 * export class MyFormComponent implements OnInit {
 *   private validationContext!: ValidationContext;
 *
 *   constructor(private validationService: AmwValidationService) {}
 *
 *   ngOnInit() {
 *     this.validationContext = this.validationService.createContext({
 *       disableOnErrors: true
 *     });
 *
 *     // Add a violation
 *     this.validationService.addViolation(this.validationContext.id, {
 *       id: 'name-required',
 *       message: 'Name is required',
 *       severity: 'error',
 *       field: 'name',
 *       control: this.form.get('name'),
 *       validator: () => !!this.form.get('name')?.value
 *     });
 *   }
 * }
 * ```
 */
@Injectable({
    providedIn: 'root'
})
export class AmwValidationService {
    /** Map of all validation contexts by ID */
    private contexts = new Map<string, ValidationContext>();

    /** Counter for generating unique IDs */
    private idCounter = 0;

    /** Map of control subscriptions for cleanup */
    private controlSubscriptions = new Map<string, (() => void)[]>();

    constructor() { }

    /**
     * Create a new validation context for a component
     * @param config Optional configuration
     * @returns The created validation context
     */
    createContext(config?: Partial<ValidationConfig>): ValidationContext {
        const id = this.generateId();
        const violations = signal<ValidationViolation[]>([]);
        const mergedConfig = { ...DEFAULT_CONFIG, ...config };

        const hasErrors = computed(() =>
            violations().some(v => v.severity === 'error')
        );

        const hasWarnings = computed(() =>
            violations().some(v => v.severity === 'warning')
        );

        const isSubmitDisabled = computed(() => {
            if (mergedConfig.disableOnErrors && hasErrors()) return true;
            if (mergedConfig.disableOnWarnings && hasWarnings()) return true;
            return false;
        });

        const context: ValidationContext = {
            id,
            violations,
            hasErrors,
            hasWarnings,
            isSubmitDisabled,
            config: mergedConfig
        };

        this.contexts.set(id, context);
        return context;
    }

    /**
     * Destroy a validation context and clean up subscriptions
     * @param contextId The context ID to destroy
     */
    destroyContext(contextId: string): void {
        // Clean up control subscriptions
        const subscriptions = this.controlSubscriptions.get(contextId);
        if (subscriptions) {
            subscriptions.forEach(unsub => unsub());
            this.controlSubscriptions.delete(contextId);
        }

        this.contexts.delete(contextId);
    }

    /**
     * Add a violation to a context
     * @param contextId The context ID
     * @param violation The violation to add (without ID, one will be generated)
     * @returns The violation ID
     */
    addViolation(
        contextId: string,
        violation: Omit<ValidationViolation, 'id'> & { id?: string }
    ): string {
        const context = this.contexts.get(contextId);
        if (!context) {
            throw new Error(`Validation context ${contextId} not found`);
        }

        const violationId = violation.id || this.generateViolationId();
        const fullViolation: ValidationViolation = {
            ...violation,
            id: violationId
        };

        // Check if violation with same ID already exists
        const existing = context.violations().find(v => v.id === violationId);
        if (existing) {
            // Update existing violation
            context.violations.update(violations =>
                violations.map(v => v.id === violationId ? fullViolation : v)
            );
        } else {
            // Add new violation
            context.violations.update(violations => [...violations, fullViolation]);
        }

        // Set up control subscription for auto-reevaluation
        if (context.config.autoReevaluate && fullViolation.control) {
            this.setupControlSubscription(contextId, fullViolation);
        }

        return violationId;
    }

    /**
     * Remove a violation from a context
     * @param contextId The context ID
     * @param violationId The violation ID to remove
     */
    removeViolation(contextId: string, violationId: string): void {
        const context = this.contexts.get(contextId);
        if (!context) return;

        context.violations.update(violations =>
            violations.filter(v => v.id !== violationId)
        );
    }

    /**
     * Clear all violations from a context
     * @param contextId The context ID
     */
    clearViolations(contextId: string): void {
        const context = this.contexts.get(contextId);
        if (!context) return;

        context.violations.set([]);
    }

    /**
     * Get all violations for a context
     * @param contextId The context ID
     * @returns Array of violations
     */
    getViolations(contextId: string): ValidationViolation[] {
        const context = this.contexts.get(contextId);
        return context?.violations() || [];
    }

    /**
     * Get violations for a specific field
     * @param contextId The context ID
     * @param field The field name
     * @returns Array of violations for the field
     */
    getFieldViolations(contextId: string, field: string): ValidationViolation[] {
        return this.getViolations(contextId).filter(v => v.field === field);
    }

    /**
     * Check if a context has any violations
     * @param contextId The context ID
     * @returns True if violations exist
     */
    hasViolations(contextId: string): boolean {
        return this.getViolations(contextId).length > 0;
    }

    /**
     * Reevaluate all violations in a context
     * @param contextId The context ID
     */
    reevaluate(contextId: string): void {
        const context = this.contexts.get(contextId);
        if (!context) return;

        context.violations.update(violations =>
            violations.filter(v => {
                if (v.validator) {
                    return !v.validator(); // Keep violation if validator returns false
                }
                if (v.control) {
                    return v.control.invalid; // Keep violation if control is invalid
                }
                return true; // Keep violations without validator or control
            })
        );
    }

    /**
     * Get a context by ID
     * @param contextId The context ID
     * @returns The validation context or undefined
     */
    getContext(contextId: string): ValidationContext | undefined {
        return this.contexts.get(contextId);
    }

    /**
     * Set up a subscription to a control for auto-reevaluation
     */
    private setupControlSubscription(
        contextId: string,
        violation: ValidationViolation
    ): void {
        if (!violation.control) return;

        let debounceTimer: ReturnType<typeof setTimeout> | null = null;
        const context = this.contexts.get(contextId);
        if (!context) return;

        const subscription = violation.control.valueChanges.subscribe(() => {
            if (debounceTimer) {
                clearTimeout(debounceTimer);
            }

            debounceTimer = setTimeout(() => {
                // Reevaluate this specific violation
                const shouldKeep = violation.validator
                    ? !violation.validator()
                    : violation.control?.invalid;

                if (!shouldKeep) {
                    this.removeViolation(contextId, violation.id);
                }
            }, context.config.debounceTime);
        });

        // Store unsubscribe function
        const subscriptions = this.controlSubscriptions.get(contextId) || [];
        subscriptions.push(() => subscription.unsubscribe());
        this.controlSubscriptions.set(contextId, subscriptions);
    }

    private generateId(): string {
        return `vc_${Date.now()}_${++this.idCounter}`;
    }

    private generateViolationId(): string {
        return `vv_${Date.now()}_${++this.idCounter}`;
    }
}

/**
 * Mixin/base class functionality for components that need validation
 * This can be used via composition or inheritance
 */
export abstract class ValidationMixin {
    protected validationService!: AmwValidationService;
    protected validationContext!: ValidationContext;

    /**
     * Initialize validation for this component
     * Call this in ngOnInit
     */
    protected initializeValidation(
        service: AmwValidationService,
        config?: Partial<ValidationConfig>
    ): void {
        this.validationService = service;
        this.validationContext = service.createContext(config);
    }

    /**
     * Clean up validation context
     * Call this in ngOnDestroy
     */
    protected destroyValidation(): void {
        if (this.validationContext) {
            this.validationService.destroyContext(this.validationContext.id);
        }
    }

    /**
     * Add a validation violation
     */
    protected addViolation(
        violation: Omit<ValidationViolation, 'id'> & { id?: string }
    ): string {
        return this.validationService.addViolation(
            this.validationContext.id,
            violation
        );
    }

    /**
     * Remove a validation violation
     */
    protected removeViolation(violationId: string): void {
        this.validationService.removeViolation(
            this.validationContext.id,
            violationId
        );
    }

    /**
     * Clear all violations
     */
    protected clearViolations(): void {
        this.validationService.clearViolations(this.validationContext.id);
    }

    /**
     * Get all violations
     */
    protected get violations(): ValidationViolation[] {
        return this.validationContext?.violations() || [];
    }

    /**
     * Check if submit should be disabled
     */
    protected get isSubmitDisabled(): boolean {
        return this.validationContext?.isSubmitDisabled() || false;
    }

    /**
     * Check if there are any errors
     */
    protected get hasErrors(): boolean {
        return this.validationContext?.hasErrors() || false;
    }

    /**
     * Check if there are any warnings
     */
    protected get hasWarnings(): boolean {
        return this.validationContext?.hasWarnings() || false;
    }
}
