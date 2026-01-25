import { Injectable, signal, computed, WritableSignal, Signal } from '@angular/core';
import { Subject, Observable } from 'rxjs';

/**
 * Represents a single error in the error state
 */
export interface ErrorItem {
    /** Unique identifier for this error */
    id: string;
    /** The error message to display */
    message: string;
    /** Error code (optional, for programmatic handling) */
    code?: string;
    /** Severity level of the error */
    severity: 'error' | 'warning' | 'info';
    /** Optional source/origin of the error */
    source?: string;
    /** Optional field this error is associated with */
    field?: string;
    /** Timestamp when the error occurred */
    timestamp: number;
    /** Whether the error has been dismissed by the user */
    dismissed: boolean;
    /** Whether the error can be dismissed */
    dismissible: boolean;
    /** Original error object (if available) */
    originalError?: Error | unknown;
    /** Retry action (if applicable) */
    retryAction?: () => void;
}

/**
 * Configuration for error state behavior
 */
export interface ErrorStateConfig {
    /** Maximum number of errors to retain */
    maxErrors?: number;
    /** Auto-dismiss errors after this duration (ms), 0 = never */
    autoDismissAfter?: number;
    /** Whether to log errors to console */
    logToConsole?: boolean;
    /** Whether to track error history */
    trackHistory?: boolean;
    /** Maximum history entries to retain */
    maxHistory?: number;
}

/**
 * Error context for a component
 */
export interface ErrorContext {
    /** Unique ID for this context */
    id: string;
    /** The errors for this context */
    errors: WritableSignal<ErrorItem[]>;
    /** Whether the context has any active errors */
    hasErrors: Signal<boolean>;
    /** Whether the context has any warnings */
    hasWarnings: Signal<boolean>;
    /** Count of active errors */
    errorCount: Signal<number>;
    /** Configuration for this context */
    config: ErrorStateConfig;
}

const DEFAULT_CONFIG: ErrorStateConfig = {
    maxErrors: 50,
    autoDismissAfter: 0,
    logToConsole: true,
    trackHistory: true,
    maxHistory: 100
};

/**
 * AMW Error State Service
 *
 * Provides centralized error state management for components and applications.
 * Components can create error contexts, add/remove errors, and display them
 * in a consistent manner.
 *
 * @example
 * ```typescript
 * // In your component
 * export class MyComponent implements OnInit, OnDestroy {
 *   private errorContext!: ErrorContext;
 *
 *   constructor(private errorStateService: AmwErrorStateService) {}
 *
 *   ngOnInit() {
 *     this.errorContext = this.errorStateService.createContext({
 *       autoDismissAfter: 5000
 *     });
 *   }
 *
 *   ngOnDestroy() {
 *     this.errorStateService.destroyContext(this.errorContext.id);
 *   }
 *
 *   handleApiError(error: HttpErrorResponse) {
 *     this.errorStateService.addError(this.errorContext.id, {
 *       message: error.message,
 *       code: error.status.toString(),
 *       severity: 'error',
 *       source: 'API',
 *       originalError: error,
 *       retryAction: () => this.retryRequest()
 *     });
 *   }
 * }
 * ```
 */
@Injectable({
    providedIn: 'root'
})
export class AmwErrorStateService {
    /** Map of all error contexts by ID */
    private contexts = new Map<string, ErrorContext>();

    /** Global error history */
    private errorHistory = signal<ErrorItem[]>([]);

    /** Counter for generating unique IDs */
    private idCounter = 0;

    /** Map of auto-dismiss timers */
    private dismissTimers = new Map<string, ReturnType<typeof setTimeout>>();

    /** Subject for error events */
    private errorSubject = new Subject<ErrorItem>();

    /** Observable for error events */
    readonly errors$ = this.errorSubject.asObservable();

    /** Global config */
    private globalConfig: ErrorStateConfig = { ...DEFAULT_CONFIG };

    constructor() { }

    /**
     * Configure global error state settings
     */
    configure(config: Partial<ErrorStateConfig>): void {
        this.globalConfig = { ...this.globalConfig, ...config };
    }

    /**
     * Create a new error context for a component
     * @param config Optional configuration
     * @returns The created error context
     */
    createContext(config?: Partial<ErrorStateConfig>): ErrorContext {
        const id = this.generateId();
        const errors = signal<ErrorItem[]>([]);
        const mergedConfig = { ...this.globalConfig, ...config };

        const hasErrors = computed(() =>
            errors().some(e => e.severity === 'error' && !e.dismissed)
        );

        const hasWarnings = computed(() =>
            errors().some(e => e.severity === 'warning' && !e.dismissed)
        );

        const errorCount = computed(() =>
            errors().filter(e => !e.dismissed).length
        );

        const context: ErrorContext = {
            id,
            errors,
            hasErrors,
            hasWarnings,
            errorCount,
            config: mergedConfig
        };

        this.contexts.set(id, context);
        return context;
    }

    /**
     * Destroy an error context and clean up timers
     * @param contextId The context ID to destroy
     */
    destroyContext(contextId: string): void {
        // Clean up any dismiss timers
        const context = this.contexts.get(contextId);
        if (context) {
            context.errors().forEach(error => {
                const timerKey = `${contextId}_${error.id}`;
                const timer = this.dismissTimers.get(timerKey);
                if (timer) {
                    clearTimeout(timer);
                    this.dismissTimers.delete(timerKey);
                }
            });
        }

        this.contexts.delete(contextId);
    }

    /**
     * Add an error to a context
     * @param contextId The context ID
     * @param error The error to add (without ID, one will be generated)
     * @returns The error ID
     */
    addError(
        contextId: string,
        error: Omit<ErrorItem, 'id' | 'timestamp' | 'dismissed' | 'dismissible'> & { id?: string; dismissible?: boolean }
    ): string {
        const context = this.contexts.get(contextId);
        if (!context) {
            throw new Error(`Error context ${contextId} not found`);
        }

        const errorId = error.id || this.generateErrorId();
        const fullError: ErrorItem = {
            ...error,
            id: errorId,
            timestamp: Date.now(),
            dismissed: false,
            dismissible: error.dismissible ?? true
        };

        // Log to console if configured
        if (context.config.logToConsole) {
            this.logError(fullError);
        }

        // Check max errors
        let currentErrors = context.errors();
        if (context.config.maxErrors && currentErrors.length >= context.config.maxErrors) {
            // Remove oldest error
            currentErrors = currentErrors.slice(1);
        }

        // Add new error
        context.errors.set([...currentErrors, fullError]);

        // Add to history if configured
        if (context.config.trackHistory) {
            this.addToHistory(fullError);
        }

        // Emit error event
        this.errorSubject.next(fullError);

        // Set up auto-dismiss if configured
        if (context.config.autoDismissAfter && context.config.autoDismissAfter > 0) {
            this.setupAutoDismiss(contextId, errorId, context.config.autoDismissAfter);
        }

        return errorId;
    }

    /**
     * Add an error from a caught exception
     * @param contextId The context ID
     * @param error The caught error
     * @param options Additional options
     */
    addFromException(
        contextId: string,
        error: Error | unknown,
        options?: {
            source?: string;
            field?: string;
            severity?: 'error' | 'warning' | 'info';
            retryAction?: () => void;
        }
    ): string {
        const message = error instanceof Error ? error.message : String(error);
        const code = error instanceof Error ? error.name : 'UNKNOWN';

        return this.addError(contextId, {
            message,
            code,
            severity: options?.severity || 'error',
            source: options?.source,
            field: options?.field,
            originalError: error,
            retryAction: options?.retryAction
        });
    }

    /**
     * Dismiss an error
     * @param contextId The context ID
     * @param errorId The error ID to dismiss
     */
    dismissError(contextId: string, errorId: string): void {
        const context = this.contexts.get(contextId);
        if (!context) return;

        context.errors.update(errors =>
            errors.map(e =>
                e.id === errorId ? { ...e, dismissed: true } : e
            )
        );

        // Clear auto-dismiss timer
        const timerKey = `${contextId}_${errorId}`;
        const timer = this.dismissTimers.get(timerKey);
        if (timer) {
            clearTimeout(timer);
            this.dismissTimers.delete(timerKey);
        }
    }

    /**
     * Remove an error completely
     * @param contextId The context ID
     * @param errorId The error ID to remove
     */
    removeError(contextId: string, errorId: string): void {
        const context = this.contexts.get(contextId);
        if (!context) return;

        context.errors.update(errors =>
            errors.filter(e => e.id !== errorId)
        );

        // Clear auto-dismiss timer
        const timerKey = `${contextId}_${errorId}`;
        const timer = this.dismissTimers.get(timerKey);
        if (timer) {
            clearTimeout(timer);
            this.dismissTimers.delete(timerKey);
        }
    }

    /**
     * Clear all errors from a context
     * @param contextId The context ID
     */
    clearErrors(contextId: string): void {
        const context = this.contexts.get(contextId);
        if (!context) return;

        // Clear all timers for this context
        context.errors().forEach(error => {
            const timerKey = `${contextId}_${error.id}`;
            const timer = this.dismissTimers.get(timerKey);
            if (timer) {
                clearTimeout(timer);
                this.dismissTimers.delete(timerKey);
            }
        });

        context.errors.set([]);
    }

    /**
     * Get all errors for a context
     * @param contextId The context ID
     * @returns Array of errors
     */
    getErrors(contextId: string): ErrorItem[] {
        const context = this.contexts.get(contextId);
        return context?.errors() || [];
    }

    /**
     * Get active (non-dismissed) errors
     * @param contextId The context ID
     * @returns Array of active errors
     */
    getActiveErrors(contextId: string): ErrorItem[] {
        return this.getErrors(contextId).filter(e => !e.dismissed);
    }

    /**
     * Get errors for a specific field
     * @param contextId The context ID
     * @param field The field name
     * @returns Array of errors for the field
     */
    getFieldErrors(contextId: string, field: string): ErrorItem[] {
        return this.getErrors(contextId).filter(e => e.field === field && !e.dismissed);
    }

    /**
     * Check if a context has any active errors
     * @param contextId The context ID
     * @returns True if active errors exist
     */
    hasActiveErrors(contextId: string): boolean {
        return this.getActiveErrors(contextId).length > 0;
    }

    /**
     * Get the error history
     * @returns Array of historical errors
     */
    getErrorHistory(): ErrorItem[] {
        return this.errorHistory();
    }

    /**
     * Clear the error history
     */
    clearHistory(): void {
        this.errorHistory.set([]);
    }

    /**
     * Get a context by ID
     * @param contextId The context ID
     * @returns The error context or undefined
     */
    getContext(contextId: string): ErrorContext | undefined {
        return this.contexts.get(contextId);
    }

    /**
     * Retry an error's action if available
     * @param contextId The context ID
     * @param errorId The error ID
     */
    retryError(contextId: string, errorId: string): void {
        const context = this.contexts.get(contextId);
        if (!context) return;

        const error = context.errors().find(e => e.id === errorId);
        if (error?.retryAction) {
            // Dismiss the error before retrying
            this.dismissError(contextId, errorId);
            // Execute retry action
            error.retryAction();
        }
    }

    /**
     * Add error to history
     */
    private addToHistory(error: ErrorItem): void {
        let history = this.errorHistory();
        if (this.globalConfig.maxHistory && history.length >= this.globalConfig.maxHistory) {
            history = history.slice(1);
        }
        this.errorHistory.set([...history, error]);
    }

    /**
     * Log error to console
     */
    private logError(error: ErrorItem): void {
        const prefix = `[AMW Error State] [${error.severity.toUpperCase()}]`;
        const message = `${prefix} ${error.message}`;

        switch (error.severity) {
            case 'error':
                console.error(message, error.originalError || '');
                break;
            case 'warning':
                console.warn(message, error.originalError || '');
                break;
            case 'info':
                console.info(message);
                break;
        }
    }

    /**
     * Set up auto-dismiss timer
     */
    private setupAutoDismiss(contextId: string, errorId: string, duration: number): void {
        const timerKey = `${contextId}_${errorId}`;
        const timer = setTimeout(() => {
            this.dismissError(contextId, errorId);
            this.dismissTimers.delete(timerKey);
        }, duration);
        this.dismissTimers.set(timerKey, timer);
    }

    private generateId(): string {
        return `ec_${Date.now()}_${++this.idCounter}`;
    }

    private generateErrorId(): string {
        return `err_${Date.now()}_${++this.idCounter}`;
    }
}

/**
 * Mixin/base class functionality for components that need error state management
 * This can be used via composition or inheritance
 */
export abstract class ErrorStateMixin {
    protected errorStateService!: AmwErrorStateService;
    protected errorContext!: ErrorContext;

    /**
     * Initialize error state for this component
     * Call this in ngOnInit
     */
    protected initializeErrorState(
        service: AmwErrorStateService,
        config?: Partial<ErrorStateConfig>
    ): void {
        this.errorStateService = service;
        this.errorContext = service.createContext(config);
    }

    /**
     * Clean up error context
     * Call this in ngOnDestroy
     */
    protected destroyErrorState(): void {
        if (this.errorContext) {
            this.errorStateService.destroyContext(this.errorContext.id);
        }
    }

    /**
     * Add an error
     */
    protected addError(
        error: Omit<ErrorItem, 'id' | 'timestamp' | 'dismissed'> & { id?: string }
    ): string {
        return this.errorStateService.addError(this.errorContext.id, error);
    }

    /**
     * Add error from exception
     */
    protected addErrorFromException(
        error: Error | unknown,
        options?: {
            source?: string;
            field?: string;
            severity?: 'error' | 'warning' | 'info';
            retryAction?: () => void;
        }
    ): string {
        return this.errorStateService.addFromException(this.errorContext.id, error, options);
    }

    /**
     * Dismiss an error
     */
    protected dismissError(errorId: string): void {
        this.errorStateService.dismissError(this.errorContext.id, errorId);
    }

    /**
     * Clear all errors
     */
    protected clearErrors(): void {
        this.errorStateService.clearErrors(this.errorContext.id);
    }

    /**
     * Get all active errors
     */
    protected get activeErrors(): ErrorItem[] {
        return this.errorContext?.errors().filter(e => !e.dismissed) || [];
    }

    /**
     * Check if there are any active errors
     */
    protected get hasErrors(): boolean {
        return this.errorContext?.hasErrors() || false;
    }

    /**
     * Check if there are any warnings
     */
    protected get hasWarnings(): boolean {
        return this.errorContext?.hasWarnings() || false;
    }

    /**
     * Get error count
     */
    protected get errorCount(): number {
        return this.errorContext?.errorCount() || 0;
    }
}
