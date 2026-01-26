/**
 * Centralized error messages for consistent user-facing text.
 *
 * These messages are intended to be user-friendly and can be:
 * - Displayed in UI notifications
 * - Used as default messages for error handlers
 * - Customized by overriding specific messages
 *
 * @example
 * ```typescript
 * // Using in a service
 * catchError((error: HttpErrorResponse) => {
 *   if (error.status === 401) {
 *     this.notification.error('Error', ERROR_MESSAGES.UNAUTHORIZED);
 *   }
 *   return throwError(() => error);
 * })
 *
 * // Using with type safety
 * const message: ErrorMessageKey = 'NETWORK_ERROR';
 * console.log(ERROR_MESSAGES[message]);
 * ```
 */
export const ERROR_MESSAGES = {
    // =========================================================================
    // Network/HTTP Errors
    // =========================================================================

    /** Network connectivity issues */
    NETWORK_ERROR: 'Unable to connect to the server. Please check your internet connection.',

    /** Generic server error (5xx) */
    SERVER_ERROR: 'Server error. Please try again later.',

    /** Authentication required or failed (401) */
    UNAUTHORIZED: 'Authentication failed. Please log in again.',

    /** Permission denied (403) */
    FORBIDDEN: 'Access denied. You do not have permission to perform this action.',

    /** Resource not found (404) */
    NOT_FOUND: 'The requested resource was not found.',

    /** Invalid request (400) */
    BAD_REQUEST: 'Invalid request. Please check your input.',

    /** Request timeout (408) */
    TIMEOUT: 'The request timed out. Please try again.',

    /** Conflict error (409) */
    CONFLICT: 'A conflict occurred. The resource may have been modified by another user.',

    /** Rate limiting (429) */
    RATE_LIMITED: 'Too many requests. Please wait a moment and try again.',

    /** Service unavailable (503) */
    SERVICE_UNAVAILABLE: 'Service temporarily unavailable. Please try again later.',

    /** Generic unknown error */
    UNKNOWN: 'An unexpected error occurred. Please try again.',

    // =========================================================================
    // Generic Operation Errors
    // =========================================================================

    /** Failed to load data */
    LOAD_FAILED: 'Failed to load data. Please try again.',

    /** Failed to save data */
    SAVE_FAILED: 'Failed to save. Please try again.',

    /** Failed to delete data */
    DELETE_FAILED: 'Failed to delete. Please try again.',

    /** Failed to submit form */
    SUBMIT_FAILED: 'Failed to submit. Please try again.',

    /** Failed to update data */
    UPDATE_FAILED: 'Failed to update. Please try again.',

    /** Failed to create data */
    CREATE_FAILED: 'Failed to create. Please try again.',

    // =========================================================================
    // Form/Validation Errors
    // =========================================================================

    /** Form has validation errors */
    FORM_INVALID: 'Please fix the errors in the form before submitting.',

    /** Required field is empty */
    FIELD_REQUIRED: 'This field is required.',

    /** Field value is invalid */
    FIELD_INVALID: 'Please enter a valid value.',

    // =========================================================================
    // Authentication/Authorization Errors
    // =========================================================================

    /** Login failed */
    LOGIN_FAILED: 'Login failed. Please check your credentials.',

    /** Session expired */
    SESSION_EXPIRED: 'Your session has expired. Please log in again.',

    /** Password requirements not met */
    PASSWORD_REQUIREMENTS: 'Password does not meet the security requirements.',

    /** Account locked */
    ACCOUNT_LOCKED: 'Your account has been locked. Please contact support.',

    // =========================================================================
    // File/Upload Errors
    // =========================================================================

    /** File upload failed */
    UPLOAD_FAILED: 'Failed to upload file. Please try again.',

    /** File too large */
    FILE_TOO_LARGE: 'File is too large. Please select a smaller file.',

    /** Invalid file type */
    INVALID_FILE_TYPE: 'Invalid file type. Please select a supported file format.',

    /** Download failed */
    DOWNLOAD_FAILED: 'Failed to download file. Please try again.',

    // =========================================================================
    // Clipboard Errors
    // =========================================================================

    /** Clipboard copy failed */
    CLIPBOARD_COPY_FAILED: 'Failed to copy to clipboard. Please try again.',

    /** Clipboard paste failed */
    CLIPBOARD_PASTE_FAILED: 'Failed to paste from clipboard. Please try again.',

    // =========================================================================
    // Data Errors
    // =========================================================================

    /** No data available */
    NO_DATA: 'No data available.',

    /** Data is stale/outdated */
    DATA_STALE: 'The data may be outdated. Please refresh to see the latest information.',

    /** Data has been modified */
    DATA_MODIFIED: 'The data has been modified by another user. Please refresh and try again.',

    // =========================================================================
    // Connection Errors
    // =========================================================================

    /** WebSocket connection failed */
    WEBSOCKET_FAILED: 'Real-time connection failed. Some features may not work.',

    /** Reconnecting */
    RECONNECTING: 'Reconnecting to server...',

    /** Connection restored */
    CONNECTION_RESTORED: 'Connection restored.',

    // =========================================================================
    // Permission Errors
    // =========================================================================

    /** Camera permission denied */
    CAMERA_PERMISSION_DENIED: 'Camera access was denied. Please enable camera permissions.',

    /** Microphone permission denied */
    MICROPHONE_PERMISSION_DENIED: 'Microphone access was denied. Please enable microphone permissions.',

    /** Location permission denied */
    LOCATION_PERMISSION_DENIED: 'Location access was denied. Please enable location permissions.',

    /** Notification permission denied */
    NOTIFICATION_PERMISSION_DENIED: 'Notification permission was denied. Please enable notifications in your browser settings.',

} as const;

/**
 * Type for error message keys
 */
export type ErrorMessageKey = keyof typeof ERROR_MESSAGES;

/**
 * Type for error message values
 */
export type ErrorMessageValue = typeof ERROR_MESSAGES[ErrorMessageKey];

/**
 * Gets an error message by key with optional fallback.
 *
 * @param key The error message key
 * @param fallback Optional fallback message if key not found
 * @returns The error message
 */
export function getErrorMessage(
    key: string,
    fallback: string = ERROR_MESSAGES.UNKNOWN
): string {
    return (ERROR_MESSAGES as Record<string, string>)[key] || fallback;
}

/**
 * Gets an error message for an HTTP status code.
 *
 * @param statusCode The HTTP status code
 * @returns The appropriate error message
 */
export function getHttpErrorMessage(statusCode: number): string {
    switch (statusCode) {
        case 0:
            return ERROR_MESSAGES.NETWORK_ERROR;
        case 400:
            return ERROR_MESSAGES.BAD_REQUEST;
        case 401:
            return ERROR_MESSAGES.UNAUTHORIZED;
        case 403:
            return ERROR_MESSAGES.FORBIDDEN;
        case 404:
            return ERROR_MESSAGES.NOT_FOUND;
        case 408:
            return ERROR_MESSAGES.TIMEOUT;
        case 409:
            return ERROR_MESSAGES.CONFLICT;
        case 429:
            return ERROR_MESSAGES.RATE_LIMITED;
        case 500:
        case 502:
        case 503:
        case 504:
            return ERROR_MESSAGES.SERVER_ERROR;
        default:
            return ERROR_MESSAGES.UNKNOWN;
    }
}
