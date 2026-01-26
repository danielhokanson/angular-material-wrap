import { Observable } from 'rxjs';

/**
 * Service health status
 */
export interface IServiceHealthStatus {
    /** Whether the service is healthy */
    isHealthy: boolean;
    /** Name of the service */
    serviceName: string;
    /** Timestamp of the health check */
    timestamp: Date;
    /** List of any errors that occurred */
    errors: string[];
    /** Additional details about the service state */
    details?: Record<string, unknown>;
}

/**
 * Configuration for service behavior
 */
export interface ServiceConfig {
    /** Whether to enable console logging (default: true in development) */
    enableLogging?: boolean;
    /** Whether to enable periodic health checks (default: false) */
    enableHealthChecks?: boolean;
    /** Interval for health checks in milliseconds (default: 30000) */
    healthCheckInterval?: number;
    /** Maximum retry attempts for failed operations (default: 3) */
    maxRetryAttempts?: number;
    /** Base delay between retries in milliseconds (default: 1000) */
    retryDelay?: number;
    /** Whether to use exponential backoff for retries (default: true) */
    useExponentialBackoff?: boolean;
}

/**
 * Interface for services with standardized lifecycle management
 */
export interface IBaseService {
    /** Name of the service for logging and debugging */
    readonly serviceName: string;

    /** Whether the service has been initialized */
    readonly isInitialized: boolean;

    /**
     * Initializes the service.
     * Call this when the service needs async setup.
     */
    initialize(): Promise<void>;

    /**
     * Disposes of the service and cleans up resources.
     * Call this when the service is no longer needed.
     */
    dispose(): Promise<void>;

    /**
     * Gets the current health status of the service.
     */
    getHealthStatus(): Observable<IServiceHealthStatus>;

    /**
     * Handles an error with logging and optional rethrow.
     *
     * @param error The error to handle
     * @param context Optional context for logging
     */
    handleError(error: Error | string | unknown, context?: string): void;

    /**
     * Logs an info message.
     *
     * @param message The message to log
     * @param data Optional data to include
     */
    logInfo(message: string, data?: unknown): void;

    /**
     * Logs a warning message.
     *
     * @param message The message to log
     * @param data Optional data to include
     */
    logWarning(message: string, data?: unknown): void;

    /**
     * Logs an error message.
     *
     * @param message The message to log
     * @param error Optional error object
     */
    logError(message: string, error?: Error | string | unknown): void;
}

/**
 * Default service configuration
 */
export const DEFAULT_SERVICE_CONFIG: Required<ServiceConfig> = {
    enableLogging: true,
    enableHealthChecks: false,
    healthCheckInterval: 30000,
    maxRetryAttempts: 3,
    retryDelay: 1000,
    useExponentialBackoff: true
};
