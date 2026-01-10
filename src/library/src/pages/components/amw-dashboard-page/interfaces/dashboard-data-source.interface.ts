import { Observable } from 'rxjs';
import { DashboardData } from './dashboard-data.interface';

/**
 * Data source interface for dashboard page
 *
 * @description
 * Defines the contract for loading dashboard data.
 * Implement this interface to provide custom data loading logic.
 *
 * @example
 * ```typescript
 * @Injectable()
 * export class MealPlanDashboardDataSource implements DashboardDataSource {
 *   constructor(private http: HttpClient) {}
 *
 *   getDashboardData(params: DashboardDataParams): Observable<DashboardData> {
 *     return this.http.get<DashboardData>('/api/dashboard', { params });
 *   }
 *
 *   refreshStats(): Observable<{ [key: string]: number | string }> {
 *     return this.http.get<{ [key: string]: number | string }>('/api/stats');
 *   }
 * }
 * ```
 */
export interface DashboardDataSource {
  /**
   * Load dashboard data including stats and items
   *
   * @param params Parameters for data loading (view mode, filters, date range, etc.)
   * @returns Observable of dashboard data
   */
  getDashboardData(params: DashboardDataParams): Observable<DashboardData>;

  /**
   * Refresh stat values only (for real-time updates)
   *
   * @description
   * Optional method for updating just the stat pills without reloading all data
   *
   * @returns Observable of stat values keyed by stat ID
   */
  refreshStats?(): Observable<{ [key: string]: number | string }>;
}

/**
 * Parameters for getDashboardData request
 */
export interface DashboardDataParams {
  /**
   * Current view mode
   *
   * @example
   * viewMode: 'week'
   * viewMode: 'month'
   * viewMode: 'list'
   */
  viewMode?: string;

  /**
   * Search query string
   */
  searchQuery?: string;

  /**
   * Filter key-value pairs
   */
  filters?: { [key: string]: any };

  /**
   * Date range for time-based data
   */
  dateRange?: {
    start: Date;
    end: Date;
  };

  /**
   * Page index (0-based)
   */
  pageIndex?: number;

  /**
   * Number of items per page
   */
  pageSize?: number;

  /**
   * Sort field
   */
  sortBy?: string;

  /**
   * Sort direction
   */
  sortDirection?: 'asc' | 'desc';
}
