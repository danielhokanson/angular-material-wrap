/**
 * Data structure for master-detail page
 *
 * @description
 * Defines the data structure returned by the data source for the master panel.
 */
export interface MasterDetailData {
  /**
   * Array of items to display in the master list
   */
  items: any[];

  /**
   * Total count of items (for pagination)
   */
  totalCount: number;

  /**
   * Current page index (0-based)
   */
  pageIndex: number;

  /**
   * Number of items per page
   */
  pageSize: number;

  /**
   * Current search query
   */
  searchQuery?: string;

  /**
   * Applied filters
   */
  filters?: { [key: string]: any };
}

/**
 * Column configuration for master list display
 *
 * @description
 * Defines how to display data in the master panel list.
 *
 * @example
 * ```typescript
 * const statusColumn: MasterDetailColumn = {
 *   key: 'status',
 *   label: 'Status',
 *   type: 'badge',
 *   badgeColor: (value) => value === 'pending' ? 'warn' : 'primary'
 * };
 * ```
 */
export interface MasterDetailColumn {
  /**
   * Property key in the data object
   */
  key: string;

  /**
   * Display label for the column
   */
  label?: string;

  /**
   * Type of data display
   *
   * @default 'text'
   */
  type?: 'text' | 'date' | 'badge' | 'icon' | 'custom';

  /**
   * Format function for displaying the value
   *
   * @example
   * ```typescript
   * format: (value) => new Date(value).toLocaleDateString()
   * ```
   */
  format?: (value: any) => string;

  /**
   * Icon to display (for 'icon' type)
   *
   * @description
   * Can be a static string or function that returns icon based on item.
   *
   * @example
   * ```typescript
   * icon: (item) => item.priority === 'high' ? 'priority_high' : 'arrow_forward'
   * ```
   */
  icon?: string | ((item: any) => string);

  /**
   * Badge color (for 'badge' type)
   *
   * @example
   * ```typescript
   * badgeColor: (value) => value === 'active' ? 'primary' : 'accent'
   * ```
   */
  badgeColor?: string | ((value: any) => string);

  /**
   * Whether column is visible
   *
   * @default true
   */
  visible?: boolean;
}

/**
 * Section configuration for detail panel
 *
 * @description
 * Defines sections to display in the detail panel.
 */
export interface DetailSection {
  /**
   * Unique identifier for the section
   */
  id: string;

  /**
   * Section title
   */
  title: string;

  /**
   * Section icon
   */
  icon?: string;

  /**
   * Fields to display in this section
   */
  fields: DetailField[];

  /**
   * Whether section is collapsible
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
}

/**
 * Field configuration for detail section
 */
export interface DetailField {
  /**
   * Property key in the data object
   */
  key: string;

  /**
   * Display label for the field
   */
  label: string;

  /**
   * Type of field display
   *
   * @default 'text'
   */
  type?: 'text' | 'date' | 'boolean' | 'list' | 'custom';

  /**
   * Format function for displaying the value
   */
  format?: (value: any) => string;

  /**
   * Icon to display before the field
   */
  icon?: string;
}
