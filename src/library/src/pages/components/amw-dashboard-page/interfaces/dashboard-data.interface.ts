/**
 * Dashboard data structure
 *
 * @description
 * Defines the data structure returned by the data source for the dashboard.
 * Includes stats, items, and metadata.
 */
export interface DashboardData {
  /**
   * Array of stat values for the stat pills
   *
   * @description
   * Stats correspond to the DashboardStat configurations but contain the actual data
   */
  stats?: { [key: string]: number | string };

  /**
   * Array of items to display in the dashboard content area
   *
   * @description
   * Structure depends on the contentLayout (grid, list, calendar)
   */
  items: any[];

  /**
   * Total count of items (for pagination)
   */
  totalCount: number;

  /**
   * Current page index (0-based)
   */
  pageIndex?: number;

  /**
   * Number of items per page
   */
  pageSize?: number;

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
   * Current search query
   */
  searchQuery?: string;

  /**
   * Applied filters
   */
  filters?: { [key: string]: any };

  /**
   * Date range for the data
   *
   * @description
   * Used for dashboard views with time-based data
   */
  dateRange?: {
    start: Date;
    end: Date;
  };
}

/**
 * Dashboard widget configuration
 *
 * @description
 * Defines a widget or section within the dashboard content area.
 * Similar to the report page widgets but simpler.
 */
export interface DashboardWidget {
  /**
   * Unique identifier for the widget
   */
  id: string;

  /**
   * Widget title
   */
  title: string;

  /**
   * Widget type
   *
   * @description
   * Determines how the widget data is rendered
   */
  type: 'chart' | 'table' | 'list' | 'calendar' | 'custom';

  /**
   * Icon for the widget header
   */
  icon?: string;

  /**
   * Widget size (for grid layouts)
   *
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large' | 'full';

  /**
   * Whether the widget is collapsible
   *
   * @default false
   */
  collapsible?: boolean;

  /**
   * Initial collapsed state (if collapsible)
   *
   * @default false
   */
  collapsed?: boolean;

  /**
   * Widget data
   *
   * @description
   * Structure depends on the widget type
   */
  data?: any;

  /**
   * Whether the widget is currently loading
   */
  loading?: boolean;

  /**
   * Error message if widget failed to load
   */
  error?: string;
}
