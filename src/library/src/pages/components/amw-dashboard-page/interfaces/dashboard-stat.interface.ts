/**
 * Dashboard stat configuration
 *
 * @description
 * Defines a statistic "pill" or card displayed at the top of the dashboard.
 * Stats can show counts, metrics, and optional trend indicators.
 *
 * @example
 * ```typescript
 * const totalOrders: DashboardStat = {
 *   id: 'total-orders',
 *   label: 'Total Orders',
 *   value: 1247,
 *   icon: 'shopping_cart',
 *   color: 'primary',
 *   trend: {
 *     value: 15,
 *     direction: 'up',
 *     label: 'vs last month'
 *   }
 * };
 * ```
 */
export interface DashboardStat {
  /**
   * Unique identifier for the stat
   */
  id: string;

  /**
   * Display label for the stat
   */
  label: string;

  /**
   * Current value to display
   *
   * @description
   * Can be a number (e.g., 1247) or string (e.g., "98.5%")
   */
  value: number | string;

  /**
   * Material icon name for the stat
   *
   * @example
   * icon: 'shopping_cart'
   * icon: 'people'
   * icon: 'trending_up'
   */
  icon?: string;

  /**
   * Color theme for the stat card
   *
   * @default undefined (default card color)
   */
  color?: 'primary' | 'accent' | 'warn' | 'success' | 'info';

  /**
   * Trend indicator showing change over time
   *
   * @example
   * ```typescript
   * trend: {
   *   value: 15,        // +15% or +15 units
   *   direction: 'up',  // or 'down' or 'neutral'
   *   label: 'vs last month'
   * }
   * ```
   */
  trend?: {
    /**
     * Numeric value of the trend (e.g., 15 for +15%)
     */
    value: number;

    /**
     * Direction of the trend
     */
    direction: 'up' | 'down' | 'neutral';

    /**
     * Optional label describing the trend period
     *
     * @example
     * label: 'vs last month'
     * label: 'from yesterday'
     */
    label?: string;
  };

  /**
   * Subtitle or description text
   *
   * @description
   * Additional context displayed below the main value
   *
   * @example
   * subtitle: 'Last updated 5 minutes ago'
   * subtitle: 'Across all locations'
   */
  subtitle?: string;

  /**
   * Click handler for the stat card
   *
   * @description
   * Makes the stat card interactive. Useful for navigation to detailed views.
   *
   * @example
   * ```typescript
   * onClick: () => this.router.navigate(['/orders'])
   * ```
   */
  onClick?: () => void;

  /**
   * Whether the stat is currently loading
   *
   * @description
   * Shows a loading indicator instead of the value
   *
   * @default false
   */
  loading?: boolean;

  /**
   * Format function for displaying the value
   *
   * @example
   * ```typescript
   * format: (value) => `$${value.toLocaleString()}`
   * format: (value) => `${value}%`
   * ```
   */
  format?: (value: number | string) => string;
}
