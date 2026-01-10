import { Observable } from 'rxjs';
import { MasterDetailData } from './master-detail-data.interface';

/**
 * Data source interface for master-detail page
 *
 * @description
 * Defines the contract for loading data in the master-detail view.
 * Implement this interface to provide custom data loading logic.
 *
 * @example
 * ```typescript
 * @Injectable()
 * export class CurationQueueDataSource implements MasterDetailDataSource {
 *   constructor(private http: HttpClient) {}
 *
 *   getMasterData(params: MasterDetailDataParams): Observable<MasterDetailData> {
 *     return this.http.get<MasterDetailData>('/api/queue', { params });
 *   }
 *
 *   getDetailData(itemId: string): Observable<any> {
 *     return this.http.get(`/api/queue/${itemId}`);
 *   }
 * }
 * ```
 */
export interface MasterDetailDataSource {
  /**
   * Load data for the master panel
   *
   * @param params Parameters for data loading (search, filters, pagination)
   * @returns Observable of master panel data
   */
  getMasterData(params: {
    searchQuery?: string;
    filters?: { [key: string]: any };
    pageIndex?: number;
    pageSize?: number;
  }): Observable<MasterDetailData>;

  /**
   * Load detailed data for a selected item
   *
   * @param itemId Unique identifier of the selected item
   * @returns Observable of detailed item data
   */
  getDetailData(itemId: string): Observable<any>;
}

/**
 * Parameters for getMasterData request
 */
export interface MasterDetailDataParams {
  /**
   * Search query string
   */
  searchQuery?: string;

  /**
   * Filter key-value pairs
   */
  filters?: { [key: string]: any };

  /**
   * Page index (0-based)
   */
  pageIndex?: number;

  /**
   * Number of items per page
   */
  pageSize?: number;
}
