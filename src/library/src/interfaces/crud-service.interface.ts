import { Observable } from 'rxjs';
import { IBaseService } from '../services/amw-base-service/base-service.interface';

/**
 * Paginated result container
 */
export interface IPagedResult<T> {
    /** Items for the current page */
    items: T[];
    /** Total count of items across all pages */
    totalCount: number;
    /** Current page number (1-based) */
    page: number;
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
 * Validation result for item validation
 */
export interface IValidationResult {
    /** Whether the item is valid */
    isValid: boolean;
    /** Validation errors (if invalid) */
    errors: string[];
    /** Validation warnings (non-blocking) */
    warnings: string[];
}

/**
 * Options for pagination
 */
export interface IPaginationOptions {
    /** Page number (1-based) */
    page: number;
    /** Number of items per page */
    pageSize: number;
    /** Sort field */
    sortField?: string;
    /** Sort direction */
    sortDirection?: 'asc' | 'desc';
}

/**
 * Options for searching/filtering
 */
export interface ISearchOptions extends IPaginationOptions {
    /** Search/filter query */
    query: string;
    /** Fields to search in (if supported) */
    searchFields?: string[];
    /** Additional filters */
    filters?: Record<string, unknown>;
}

/**
 * Standard CRUD service interface
 *
 * Provides a standardized interface for Create, Read, Update, Delete operations.
 *
 * @template T The entity type
 * @template TId The entity ID type (default: number)
 *
 * @example
 * ```typescript
 * interface User {
 *   id: number;
 *   name: string;
 *   email: string;
 * }
 *
 * @Injectable({ providedIn: 'root' })
 * export class UserService implements ICrudService<User> {
 *   getAll(): Observable<User[]> { ... }
 *   getById(id: number): Observable<User | null> { ... }
 *   // ... etc.
 * }
 * ```
 */
export interface ICrudService<T, TId = number> extends IBaseService {
    /**
     * Gets all items.
     *
     * @returns Observable with array of all items
     */
    getAll(): Observable<T[]>;

    /**
     * Gets an item by its ID.
     *
     * @param id The item ID
     * @returns Observable with the item or null if not found
     */
    getById(id: TId): Observable<T | null>;

    /**
     * Creates a new item.
     *
     * @param item The item data (without ID)
     * @returns Observable with the created item (including generated ID)
     */
    create(item: Partial<T>): Observable<T>;

    /**
     * Updates an existing item.
     *
     * @param id The item ID
     * @param item The updated item data
     * @returns Observable with the updated item
     */
    update(id: TId, item: Partial<T>): Observable<T>;

    /**
     * Deletes an item by its ID.
     *
     * @param id The item ID
     * @returns Observable with success status
     */
    delete(id: TId): Observable<boolean>;

    /**
     * Checks if an item exists.
     *
     * @param id The item ID
     * @returns Observable with existence status
     */
    exists(id: TId): Observable<boolean>;

    /**
     * Gets a page of items.
     *
     * @param page Page number (1-based)
     * @param pageSize Number of items per page
     * @returns Observable with paginated result
     */
    getPaged(page: number, pageSize: number): Observable<IPagedResult<T>>;

    /**
     * Searches for items matching a query.
     *
     * @param query Search query string
     * @returns Observable with matching items
     */
    search(query: string): Observable<T[]>;

    /**
     * Validates an item before create/update.
     *
     * @param item The item to validate
     * @returns Observable with validation result
     */
    validate(item: Partial<T>): Observable<IValidationResult>;
}

/**
 * Extended CRUD service with additional operations
 */
export interface IExtendedCrudService<T, TId = number> extends ICrudService<T, TId> {
    /**
     * Gets multiple items by their IDs.
     *
     * @param ids Array of item IDs
     * @returns Observable with array of items
     */
    getByIds(ids: TId[]): Observable<T[]>;

    /**
     * Creates multiple items at once.
     *
     * @param items Array of items to create
     * @returns Observable with array of created items
     */
    createMany(items: Partial<T>[]): Observable<T[]>;

    /**
     * Updates multiple items at once.
     *
     * @param updates Array of id/data pairs
     * @returns Observable with array of updated items
     */
    updateMany(updates: { id: TId; data: Partial<T> }[]): Observable<T[]>;

    /**
     * Deletes multiple items at once.
     *
     * @param ids Array of item IDs
     * @returns Observable with success status
     */
    deleteMany(ids: TId[]): Observable<boolean>;

    /**
     * Gets the total count of items.
     *
     * @returns Observable with total count
     */
    count(): Observable<number>;

    /**
     * Advanced search with pagination and filters.
     *
     * @param options Search options
     * @returns Observable with paginated result
     */
    searchPaged(options: ISearchOptions): Observable<IPagedResult<T>>;
}

/**
 * Read-only service interface (for services that don't allow modifications)
 */
export interface IReadOnlyService<T, TId = number> {
    /**
     * Gets all items.
     */
    getAll(): Observable<T[]>;

    /**
     * Gets an item by its ID.
     */
    getById(id: TId): Observable<T | null>;

    /**
     * Checks if an item exists.
     */
    exists(id: TId): Observable<boolean>;

    /**
     * Gets a page of items.
     */
    getPaged(page: number, pageSize: number): Observable<IPagedResult<T>>;

    /**
     * Searches for items.
     */
    search(query: string): Observable<T[]>;
}

/**
 * Creates an empty paged result
 */
export function createEmptyPagedResult<T>(page = 1, pageSize = 10): IPagedResult<T> {
    return {
        items: [],
        totalCount: 0,
        page,
        pageSize,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false
    };
}

/**
 * Creates a paged result from an array of items
 */
export function createPagedResult<T>(
    items: T[],
    totalCount: number,
    page: number,
    pageSize: number
): IPagedResult<T> {
    const totalPages = Math.ceil(totalCount / pageSize);
    return {
        items,
        totalCount,
        page,
        pageSize,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
    };
}

/**
 * Creates a successful validation result
 */
export function createValidationSuccess(): IValidationResult {
    return {
        isValid: true,
        errors: [],
        warnings: []
    };
}

/**
 * Creates a failed validation result
 */
export function createValidationFailure(errors: string[], warnings: string[] = []): IValidationResult {
    return {
        isValid: false,
        errors,
        warnings
    };
}
