import { DashboardStat } from './dashboard-stat.interface';
import { DashboardWidget } from './dashboard-data.interface';

/**
 * Dashboard page configuration
 *
 * @description
 * Main configuration interface for the dashboard page component.
 * Defines stats, view modes, layout, and features.
 *
 * @example
 * ```typescript
 * const config: DashboardConfig = {
 *   title: 'Meal Planning Dashboard',
 *   stats: [
 *     { id: 'total', label: 'Total Meals', value: 0, icon: 'restaurant' },
 *     { id: 'thisWeek', label: 'This Week', value: 0, icon: 'calendar_today' }
 *   ],
 *   viewModes: ['week', 'month', 'list'],
 *   defaultViewMode: 'week',
 *   showSearch: true,
 *   contentLayout: 'calendar'
 * };
 * ```
 */
export interface DashboardConfig {
  /**
   * Dashboard title
   *
   * @description
   * Main heading displayed at the top of the dashboard
   *
   * @default 'Dashboard'
   */
  title?: string;

  /**
   * Stat pill configurations
   *
   * @description
   * Array of stat definitions displayed at the top of the dashboard.
   * Actual values come from the data source.
   */
  stats: DashboardStat[];

  /**
   * Available view modes
   *
   * @description
   * Array of view mode identifiers. Creates toggle buttons for switching views.
   *
   * @example
   * viewModes: ['week', 'month', 'list', 'grid']
   */
  viewModes: string[];

  /**
   * Default view mode on initialization
   *
   * @description
   * Must be one of the values in viewModes array
   */
  defaultViewMode?: string;

  /**
   * View mode display labels
   *
   * @description
   * Optional mapping of view mode IDs to display labels.
   * If not provided, view mode IDs will be capitalized.
   *
   * @example
   * ```typescript
   * viewModeLabels: {
   *   'week': 'Week View',
   *   'month': 'Month View',
   *   'list': 'List View'
   * }
   * ```
   */
  viewModeLabels?: { [key: string]: string };

  /**
   * View mode icons
   *
   * @description
   * Optional mapping of view mode IDs to Material icons
   *
   * @example
   * ```typescript
   * viewModeIcons: {
   *   'week': 'view_week',
   *   'month': 'calendar_month',
   *   'list': 'view_list',
   *   'grid': 'view_module'
   * }
   * ```
   */
  viewModeIcons?: { [key: string]: string };

  /**
   * Content layout type
   *
   * @description
   * Determines how items are displayed in the main content area
   *
   * @default 'grid'
   */
  contentLayout?: 'grid' | 'list' | 'calendar' | 'widgets' | 'custom';

  /**
   * Widget configurations (for 'widgets' layout)
   *
   * @description
   * Array of widget definitions for dashboard with multiple sections
   */
  widgets?: DashboardWidget[];

  /**
   * Whether to show the search input
   *
   * @default true
   */
  showSearch?: boolean;

  /**
   * Search input placeholder text
   *
   * @default 'Search...'
   */
  searchPlaceholder?: string;

  /**
   * Whether to show filter controls
   *
   * @default false
   */
  showFilters?: boolean;

  /**
   * Whether to show the refresh button
   *
   * @default true
   */
  showRefresh?: boolean;

  /**
   * Whether to show the date range picker
   *
   * @default false
   */
  showDateRange?: boolean;

  /**
   * Number of stat pills per row
   *
   * @description
   * Controls responsive layout of stat pills
   *
   * @default 4
   */
  statsPerRow?: number;

  /**
   * Grid columns (for 'grid' layout)
   *
   * @description
   * Number of columns in the grid layout
   *
   * @default 3
   */
  gridColumns?: number;

  /**
   * Empty state message
   *
   * @default 'No data available'
   */
  emptyMessage?: string;

  /**
   * Whether to enable auto-refresh
   *
   * @default false
   */
  autoRefresh?: boolean;

  /**
   * Auto-refresh interval in milliseconds
   *
   * @default 30000 (30 seconds)
   */
  refreshInterval?: number;

  /**
   * Action buttons in the header
   *
   * @description
   * Additional action buttons displayed in the dashboard header
   *
   * @example
   * ```typescript
   * actions: [
   *   { id: 'export', label: 'Export', icon: 'download' },
   *   { id: 'settings', label: 'Settings', icon: 'settings' }
   * ]
   * ```
   */
  actions?: DashboardAction[];

  /**
   * Density setting for compact/comfortable/spacious layouts
   *
   * @default 'comfortable'
   */
  density?: 'compact' | 'comfortable' | 'spacious';

  /**
   * Whether to show stat trend indicators
   *
   * @default true
   */
  showTrends?: boolean;

  /**
   * Custom CSS class for the dashboard container
   */
  customClass?: string;
}

/**
 * Dashboard action button configuration
 */
export interface DashboardAction {
  /**
   * Unique identifier for the action
   */
  id: string;

  /**
   * Display label for the action button
   */
  label: string;

  /**
   * Material icon name for the action
   */
  icon?: string;

  /**
   * Button color theme
   *
   * @default undefined (default button color)
   */
  color?: 'primary' | 'accent' | 'warn';

  /**
   * Whether the action button is disabled
   */
  disabled?: boolean;

  /**
   * Tooltip text for the action button
   */
  tooltip?: string;
}
