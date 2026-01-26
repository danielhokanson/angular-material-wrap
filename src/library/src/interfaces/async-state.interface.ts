import { WritableSignal, Signal } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Represents the state of an async operation.
 */
export interface IAsyncOperationState {
    /** Whether the operation is currently loading */
    isLoading: boolean;
    /** Error message if the operation failed, null otherwise */
    error: string | null;
    /** Timestamp of the last successful update */
    lastUpdated: Date | null;
}

/**
 * Options for executing an async operation.
 */
export interface IAsyncExecuteOptions<T> {
    /** Signal to update for loading state */
    loadingSignal?: WritableSignal<boolean>;
    /** Signal to update for error state */
    errorSignal?: WritableSignal<string | null>;
    /** Callback on successful completion */
    onSuccess?: (result: T) => void;
    /** Callback on error */
    onError?: (error: Error) => void;
    /** Custom error message to display (overrides parsed error) */
    errorMessage?: string;
    /** Success notification message */
    successMessage?: string;
    /** Whether to show error notification (default: false) */
    notifyOnError?: boolean;
    /** Whether to show success notification (default: false) */
    notifyOnSuccess?: boolean;
}

/**
 * Options for form submission.
 */
export interface IFormSubmitOptions<T> extends IAsyncExecuteOptions<T> {
    /** Callback on successful form submission */
    successCallback?: (result: T) => void;
    /** Whether to reset the form on success (default: false) */
    resetOnSuccess?: boolean;
    /** Whether to mark form as pristine on success (default: true) */
    markPristineOnSuccess?: boolean;
}

/**
 * Configuration for retry behavior.
 */
export interface IRetryConfig {
    /** Maximum number of retry attempts */
    maxRetries: number;
    /** Initial delay between retries in milliseconds */
    delayMs: number;
    /** Whether to use exponential backoff (default: false) */
    exponentialBackoff?: boolean;
    /** Maximum delay in milliseconds when using exponential backoff */
    maxDelayMs?: number;
    /** Function to determine if an error is retryable */
    shouldRetry?: (error: Error, attempt: number) => boolean;
}

/**
 * Interface for components with async state management.
 */
export interface IAsyncComponent {
    /** Signal indicating loading state */
    readonly isLoading: WritableSignal<boolean>;
    /** Signal containing error message or null */
    readonly error: WritableSignal<string | null>;

    /**
     * Executes an async operation with automatic state management.
     * Updates loading and error signals automatically.
     *
     * @param operation The observable to execute
     * @param options Optional configuration
     */
    executeAsync<T>(operation: Observable<T>, options?: IAsyncExecuteOptions<T>): void;
}

/**
 * Interface for components with form handling.
 */
export interface IFormComponent extends IAsyncComponent {
    /** Signal indicating form submission in progress */
    readonly isSubmitting: WritableSignal<boolean>;

    /**
     * Checks if a form field has a specific error.
     *
     * @param fieldName The name of the form field
     * @param errorType Optional specific error type to check
     * @returns True if the field has the error
     */
    hasError(fieldName: string, errorType?: string): boolean;

    /**
     * Gets the error ID for accessibility (aria-describedby).
     *
     * @param fieldName The name of the form field
     * @returns The error element ID
     */
    getErrorId(fieldName: string): string;
}

/**
 * Interface for paginated data state.
 */
export interface IPaginatedState<T> extends IAsyncOperationState {
    /** The items for the current page */
    items: T[];
    /** Total number of items across all pages */
    totalCount: number;
    /** Current page number (1-based) */
    currentPage: number;
    /** Number of items per page */
    pageSize: number;
    /** Total number of pages */
    totalPages: number;
    /** Whether there is a next page */
    hasNextPage: boolean;
    /** Whether there is a previous page */
    hasPreviousPage: boolean;
}

/**
 * Interface for list data state with filtering and sorting.
 */
export interface IListState<T> extends IAsyncOperationState {
    /** All items in the list */
    items: T[];
    /** Current filter/search term */
    filterTerm: string;
    /** Current sort field */
    sortField: string | null;
    /** Sort direction */
    sortDirection: 'asc' | 'desc';
    /** Filtered and sorted items */
    filteredItems: T[];
}

/**
 * Interface for detail/edit data state.
 */
export interface IDetailState<T> extends IAsyncOperationState {
    /** The item being viewed/edited */
    item: T | null;
    /** Whether the item is being edited */
    isEditing: boolean;
    /** Whether there are unsaved changes */
    isDirty: boolean;
    /** Original item for comparison */
    originalItem: T | null;
}

/**
 * Creates default async operation state.
 */
export function createDefaultAsyncState(): IAsyncOperationState {
    return {
        isLoading: false,
        error: null,
        lastUpdated: null
    };
}

/**
 * Creates default paginated state.
 */
export function createDefaultPaginatedState<T>(): IPaginatedState<T> {
    return {
        ...createDefaultAsyncState(),
        items: [],
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false
    };
}

/**
 * Creates default list state.
 */
export function createDefaultListState<T>(): IListState<T> {
    return {
        ...createDefaultAsyncState(),
        items: [],
        filterTerm: '',
        sortField: null,
        sortDirection: 'asc',
        filteredItems: []
    };
}

/**
 * Creates default detail state.
 */
export function createDefaultDetailState<T>(): IDetailState<T> {
    return {
        ...createDefaultAsyncState(),
        item: null,
        isEditing: false,
        isDirty: false,
        originalItem: null
    };
}
