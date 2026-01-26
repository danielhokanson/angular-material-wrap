import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

/**
 * Options for the error handler
 */
export interface ErrorHandlerOptions {
    /** Context string for logging (e.g., "RecipeService.getRecipe") */
    context?: string;
    /** Whether to log the error to console (default: true) */
    logToConsole?: boolean;
    /** Custom fallback message if parsing fails */
    fallbackMessage?: string;
}

/**
 * Parsed error result
 */
export interface ParsedHttpError {
    /** User-friendly error message */
    message: string;
    /** HTTP status code (0 if no response) */
    statusCode: number;
    /** HTTP status code alias for compatibility */
    status: number;
    /** HTTP status text */
    statusText: string;
    /** Original error object */
    originalError: HttpErrorResponse;
    /** Whether the error is a client-side error (0 or 4xx) */
    isClientError: boolean;
    /** Whether the error is a server error (5xx) */
    isServerError: boolean;
    /** Whether the error is a network error (status 0) */
    isNetworkError: boolean;
    /** Error category */
    category: 'client' | 'server' | 'network' | 'unknown';
    /** Whether the error is retryable */
    isRetryable: boolean;
    /** Field-level validation errors (if available) */
    fieldErrors?: Record<string, string[]>;
}

/**
 * Status code to user-friendly message mapping
 */
const STATUS_MESSAGES: Record<number, string> = {
    0: 'Unable to connect to the server. Please check your internet connection.',
    400: 'Invalid request. Please check your input.',
    401: 'Authentication failed. Please log in again.',
    403: 'Access denied. You do not have permission to perform this action.',
    404: 'The requested resource was not found.',
    408: 'Request timed out. Please try again.',
    409: 'A conflict occurred. The resource may have been modified.',
    413: 'The request is too large. Please reduce the size of your data.',
    422: 'The request could not be processed. Please check your input.',
    429: 'Too many requests. Please wait and try again.',
    500: 'Server error. Please try again later.',
    502: 'Server error. Please try again later.',
    503: 'Service temporarily unavailable. Please try again later.',
    504: 'Server timeout. Please try again later.',
};

/**
 * Default fallback message
 */
const DEFAULT_FALLBACK_MESSAGE = 'An unexpected error occurred. Please try again.';

/**
 * Parses an HttpErrorResponse and returns a user-friendly error message.
 *
 * @param error The HttpErrorResponse to parse
 * @returns User-friendly error message
 *
 * @example
 * ```typescript
 * catchError((error: HttpErrorResponse) => {
 *   const message = parseHttpError(error);
 *   this.notificationService.error('Error', message);
 *   return throwError(() => error);
 * })
 * ```
 */
export function parseHttpError(error: HttpErrorResponse): string {
    // Try to extract message from error body
    if (error.error) {
        // Handle various error response formats
        if (typeof error.error === 'string') {
            try {
                const parsed = JSON.parse(error.error);
                if (parsed.message) return parsed.message;
                if (parsed.error) return parsed.error;
            } catch {
                // Not JSON, use as-is if it looks like a message
                if (error.error.length < 200 && !error.error.includes('<')) {
                    return error.error;
                }
            }
        } else if (typeof error.error === 'object') {
            if (error.error.message) return error.error.message;
            if (error.error.error) return error.error.error;
            if (error.error.detail) return error.error.detail;
            if (Array.isArray(error.error.errors)) {
                return error.error.errors.map((e: any) => e.message || e).join(', ');
            }
        }
    }

    // Fall back to status message
    if (error.message && !error.message.includes('Http failure')) {
        return error.message;
    }

    // Use status code mapping
    return STATUS_MESSAGES[error.status] || DEFAULT_FALLBACK_MESSAGE;
}

/**
 * Extracts field-level validation errors from error response.
 */
function extractFieldErrors(error: HttpErrorResponse): Record<string, string[]> | undefined {
    if (!error.error || typeof error.error !== 'object') {
        return undefined;
    }

    const errorObj = error.error as Record<string, unknown>;

    // Handle { errors: { field: ['message'] } } format
    if (errorObj['errors'] && typeof errorObj['errors'] === 'object') {
        return errorObj['errors'] as Record<string, string[]>;
    }

    // Handle { field: ['message'] } format
    const fieldErrors: Record<string, string[]> = {};
    let hasFieldErrors = false;

    for (const [key, value] of Object.entries(errorObj)) {
        if (Array.isArray(value) && value.every(v => typeof v === 'string')) {
            fieldErrors[key] = value;
            hasFieldErrors = true;
        }
    }

    return hasFieldErrors ? fieldErrors : undefined;
}

/**
 * Determines the error category.
 */
function getErrorCategory(status: number): 'client' | 'server' | 'network' | 'unknown' {
    if (status === 0) return 'network';
    if (status >= 400 && status < 500) return 'client';
    if (status >= 500) return 'server';
    return 'unknown';
}

/**
 * Parses an HttpErrorResponse and returns detailed error information.
 *
 * @param error The HttpErrorResponse to parse
 * @returns ParsedHttpError with message and metadata
 *
 * @example
 * ```typescript
 * const parsed = parseHttpErrorDetailed(error);
 * if (parsed.isNetworkError) {
 *   showOfflineMessage();
 * } else if (parsed.statusCode === 401) {
 *   redirectToLogin();
 * }
 * ```
 */
export function parseHttpErrorDetailed(error: HttpErrorResponse): ParsedHttpError {
    const status = error.status;
    const isClientError = status >= 400 && status < 500;
    const isServerError = status >= 500;
    const isNetworkError = status === 0;

    // Determine if error is retryable
    const isRetryable = isNetworkError || isServerError || status === 429 || status === 408;

    return {
        message: parseHttpError(error),
        statusCode: status,
        status: status,
        statusText: error.statusText || STATUS_MESSAGES[status] || 'Unknown Error',
        originalError: error,
        isClientError,
        isServerError,
        isNetworkError,
        category: getErrorCategory(status),
        isRetryable,
        fieldErrors: extractFieldErrors(error),
    };
}

/**
 * Creates a reusable error handler for RxJS catchError.
 *
 * @param options Error handler options
 * @returns Function to use with catchError
 *
 * @example
 * ```typescript
 * return this.http.get<Recipe>(url).pipe(
 *   catchError(createErrorHandler({ context: 'RecipeService.getRecipe' }))
 * );
 * ```
 *
 * @example
 * ```typescript
 * // With custom fallback
 * return this.http.post<User>(url, data).pipe(
 *   catchError(createErrorHandler({
 *     context: 'UserService.createUser',
 *     fallbackMessage: 'Failed to create user'
 *   }))
 * );
 * ```
 */
export function createErrorHandler(
    options?: ErrorHandlerOptions
): (error: HttpErrorResponse) => Observable<never> {
    const {
        context,
        logToConsole = true,
        fallbackMessage
    } = options || {};

    return (error: HttpErrorResponse): Observable<never> => {
        // Parse the error
        const parsed = parseHttpErrorDetailed(error);
        const message = fallbackMessage || parsed.message;

        // Log to console if enabled
        if (logToConsole) {
            const logMessage = context
                ? `[${context}] HTTP Error ${error.status}: ${message}`
                : `HTTP Error ${error.status}: ${message}`;

            if (parsed.isServerError) {
                console.error(logMessage, error);
            } else if (parsed.isClientError) {
                console.warn(logMessage, error);
            } else {
                console.error(logMessage, error);
            }
        }

        // Create error with user-friendly message
        const userError = new Error(message) as Error & { originalError: HttpErrorResponse };
        userError.originalError = error;

        return throwError(() => userError);
    };
}

/**
 * Type guard to check if an error is an HttpErrorResponse.
 *
 * @param error The error to check
 * @returns True if the error is an HttpErrorResponse
 *
 * @example
 * ```typescript
 * if (isHttpError(error)) {
 *   const message = parseHttpError(error);
 *   // ...
 * }
 * ```
 */
export function isHttpError(error: unknown): error is HttpErrorResponse {
    return error instanceof HttpErrorResponse;
}

/**
 * Extracts an error message from any error type.
 *
 * @param error The error (can be any type)
 * @param fallback Fallback message if extraction fails
 * @returns The error message
 *
 * @example
 * ```typescript
 * catch (error) {
 *   const message = extractErrorMessage(error, 'Operation failed');
 *   this.notificationService.error('Error', message);
 * }
 * ```
 */
export function extractErrorMessage(
    error: unknown,
    fallback: string = DEFAULT_FALLBACK_MESSAGE
): string {
    if (isHttpError(error)) {
        return parseHttpError(error);
    }

    if (error instanceof Error) {
        return error.message || fallback;
    }

    if (typeof error === 'string') {
        return error || fallback;
    }

    if (typeof error === 'object' && error !== null) {
        const errorObj = error as Record<string, unknown>;
        if (typeof errorObj['message'] === 'string') {
            return errorObj['message'];
        }
        if (typeof errorObj['error'] === 'string') {
            return errorObj['error'];
        }
    }

    return fallback;
}

/**
 * Determines if an error is retryable (server errors or network errors).
 *
 * @param error The error to check
 * @returns True if the error is retryable
 *
 * @example
 * ```typescript
 * return this.http.get(url).pipe(
 *   retryWhen(errors => errors.pipe(
 *     filter(isRetryableError),
 *     delay(1000),
 *     take(3)
 *   ))
 * );
 * ```
 */
export function isRetryableError(error: unknown): boolean {
    if (!isHttpError(error)) {
        return false;
    }

    // Network errors are retryable
    if (error.status === 0) {
        return true;
    }

    // Server errors (5xx) are typically retryable
    if (error.status >= 500 && error.status < 600) {
        return true;
    }

    // Rate limiting (429) is retryable after delay
    if (error.status === 429) {
        return true;
    }

    // Request timeout
    if (error.status === 408) {
        return true;
    }

    return false;
}
