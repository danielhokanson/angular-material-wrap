import { Injectable, OnDestroy, signal, computed } from '@angular/core';
import { Subject, Observable, of, timer, retry, catchError, takeUntil, switchMap } from 'rxjs';
import {
    IBaseService,
    IServiceHealthStatus,
    ServiceConfig,
    DEFAULT_SERVICE_CONFIG
} from './base-service.interface';

/**
 * AMW Base Service
 *
 * Abstract base class for services with standardized lifecycle, logging,
 * health monitoring, and error handling.
 *
 * @example
 * ```typescript
 * @Injectable({ providedIn: 'root' })
 * export class UserService extends AmwBaseService {
 *   constructor() {
 *     super({ enableHealthChecks: true });
 *   }
 *
 *   getServiceName(): string {
 *     return 'UserService';
 *   }
 *
 *   async performInitialization(): Promise<void> {
 *     // Load initial data, setup connections, etc.
 *   }
 *
 *   async performCleanup(): Promise<void> {
 *     // Close connections, clear caches, etc.
 *   }
 *
 *   async performHealthCheck(): Promise<boolean> {
 *     // Check if service is healthy
 *     return true;
 *   }
 * }
 * ```
 */
@Injectable()
export abstract class AmwBaseService implements OnDestroy, IBaseService {
    /** Subject for cleanup on destroy */
    protected readonly destroy$ = new Subject<void>();

    /** Signal for health status */
    protected readonly healthStatus = signal<IServiceHealthStatus>({
        isHealthy: true,
        serviceName: '',
        timestamp: new Date(),
        errors: []
    });

    /** Signal for initialization state */
    protected readonly initialized = signal<boolean>(false);

    /** Service configuration */
    protected readonly config: Required<ServiceConfig>;

    /** Health check interval subscription */
    private healthCheckTimer: ReturnType<typeof setInterval> | null = null;

    constructor(config?: Partial<ServiceConfig>) {
        this.config = { ...DEFAULT_SERVICE_CONFIG, ...config };
    }

    // ========================================================================
    // Abstract Methods - Must be implemented by subclasses
    // ========================================================================

    /**
     * Returns the name of the service for logging and debugging.
     */
    abstract getServiceName(): string;

    /**
     * Performs service-specific initialization.
     * Called by initialize() after base initialization.
     */
    abstract performInitialization(): Promise<void>;

    /**
     * Performs service-specific cleanup.
     * Called by dispose() before base cleanup.
     */
    abstract performCleanup(): Promise<void>;

    /**
     * Performs a health check for the service.
     * Should return true if the service is healthy.
     */
    abstract performHealthCheck(): Promise<boolean>;

    // ========================================================================
    // IBaseService Implementation
    // ========================================================================

    /**
     * Name of the service
     */
    get serviceName(): string {
        return this.getServiceName();
    }

    /**
     * Whether the service has been initialized
     */
    get isInitialized(): boolean {
        return this.initialized();
    }

    /**
     * Initializes the service.
     */
    async initialize(): Promise<void> {
        if (this.initialized()) {
            this.logWarning('Service already initialized');
            return;
        }

        try {
            this.logInfo('Initializing service...');

            // Perform subclass initialization
            await this.performInitialization();

            // Start health checks if enabled
            if (this.config.enableHealthChecks) {
                this.startHealthChecks();
            }

            this.initialized.set(true);
            this.updateHealthStatus(true, []);
            this.logInfo('Service initialized successfully');
        } catch (error) {
            const errorMessage = this.extractErrorMessage(error);
            this.updateHealthStatus(false, [errorMessage]);
            this.logError('Failed to initialize service', error);
            throw error;
        }
    }

    /**
     * Disposes of the service and cleans up resources.
     */
    async dispose(): Promise<void> {
        if (!this.initialized()) {
            return;
        }

        try {
            this.logInfo('Disposing service...');

            // Stop health checks
            this.stopHealthChecks();

            // Perform subclass cleanup
            await this.performCleanup();

            // Signal destruction
            this.destroy$.next();
            this.destroy$.complete();

            this.initialized.set(false);
            this.logInfo('Service disposed successfully');
        } catch (error) {
            this.logError('Error during service disposal', error);
            throw error;
        }
    }

    /**
     * Gets the current health status as an observable.
     */
    getHealthStatus(): Observable<IServiceHealthStatus> {
        return of(this.healthStatus());
    }

    /**
     * Gets the current health status signal (for reactive usage).
     */
    getHealthStatusSignal() {
        return this.healthStatus.asReadonly();
    }

    /**
     * Handles an error with logging.
     */
    handleError(error: Error | string | unknown, context?: string): void {
        const message = this.extractErrorMessage(error);
        const fullContext = context ? `[${context}] ${message}` : message;

        this.logError(fullContext, error);

        // Update health status
        const currentErrors = this.healthStatus().errors;
        this.updateHealthStatus(false, [...currentErrors.slice(-4), fullContext]);
    }

    /**
     * Logs an info message.
     */
    logInfo(message: string, data?: unknown): void {
        if (this.config.enableLogging) {
            const logMessage = `[${this.serviceName}] ${message}`;
            if (data !== undefined) {
                console.info(logMessage, data);
            } else {
                console.info(logMessage);
            }
        }
    }

    /**
     * Logs a warning message.
     */
    logWarning(message: string, data?: unknown): void {
        if (this.config.enableLogging) {
            const logMessage = `[${this.serviceName}] ${message}`;
            if (data !== undefined) {
                console.warn(logMessage, data);
            } else {
                console.warn(logMessage);
            }
        }
    }

    /**
     * Logs an error message.
     */
    logError(message: string, error?: Error | string | unknown): void {
        if (this.config.enableLogging) {
            const logMessage = `[${this.serviceName}] ${message}`;
            if (error !== undefined) {
                console.error(logMessage, error);
            } else {
                console.error(logMessage);
            }
        }
    }

    // ========================================================================
    // Protected Utility Methods
    // ========================================================================

    /**
     * Creates a retry observable with optional exponential backoff.
     *
     * @param source The source observable
     * @param maxRetries Maximum retry attempts (default: from config)
     * @param delay Base delay in milliseconds (default: from config)
     */
    protected createRetryObservable<T>(
        source: Observable<T>,
        maxRetries?: number,
        delay?: number
    ): Observable<T> {
        const retries = maxRetries ?? this.config.maxRetryAttempts;
        const baseDelay = delay ?? this.config.retryDelay;

        return source.pipe(
            retry({
                count: retries,
                delay: (error, retryCount) => {
                    const delayTime = this.config.useExponentialBackoff
                        ? baseDelay * Math.pow(2, retryCount - 1)
                        : baseDelay;

                    this.logWarning(`Retry attempt ${retryCount}/${retries} after ${delayTime}ms`, error);
                    return timer(delayTime);
                }
            }),
            catchError(error => {
                this.handleError(error, 'Max retries exceeded');
                throw error;
            })
        );
    }

    /**
     * Updates the health status.
     */
    protected updateHealthStatus(isHealthy: boolean, errors: string[]): void {
        this.healthStatus.set({
            isHealthy,
            serviceName: this.serviceName,
            timestamp: new Date(),
            errors
        });
    }

    /**
     * Extracts a message from any error type.
     */
    protected extractErrorMessage(error: unknown): string {
        if (error instanceof Error) {
            return error.message;
        }
        if (typeof error === 'string') {
            return error;
        }
        if (error && typeof error === 'object' && 'message' in error) {
            return String((error as { message: unknown }).message);
        }
        return 'Unknown error occurred';
    }

    // ========================================================================
    // Private Methods
    // ========================================================================

    /**
     * Starts periodic health checks.
     */
    private startHealthChecks(): void {
        if (this.healthCheckTimer) {
            return;
        }

        this.logInfo(`Starting health checks (interval: ${this.config.healthCheckInterval}ms)`);

        this.healthCheckTimer = setInterval(async () => {
            try {
                const isHealthy = await this.performHealthCheck();
                if (isHealthy) {
                    this.updateHealthStatus(true, []);
                } else {
                    this.updateHealthStatus(false, ['Health check returned unhealthy']);
                }
            } catch (error) {
                const message = this.extractErrorMessage(error);
                this.updateHealthStatus(false, [message]);
                this.logWarning('Health check failed', error);
            }
        }, this.config.healthCheckInterval);
    }

    /**
     * Stops periodic health checks.
     */
    private stopHealthChecks(): void {
        if (this.healthCheckTimer) {
            clearInterval(this.healthCheckTimer);
            this.healthCheckTimer = null;
            this.logInfo('Health checks stopped');
        }
    }

    ngOnDestroy(): void {
        this.dispose().catch(error => {
            console.error(`[${this.serviceName}] Error in ngOnDestroy:`, error);
        });
    }
}
