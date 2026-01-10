import { MasterDetailColumn, DetailSection } from './master-detail-data.interface';
import { MasterDetailAction } from './master-detail-action.interface';
import { TemplateRef } from '@angular/core';

/**
 * Configuration for master-detail page component
 *
 * @description
 * Main configuration interface for AmwMasterDetailPageComponent.
 * Defines all options for layout, behavior, and appearance.
 *
 * @example
 * ```typescript
 * const config: MasterDetailConfig = {
 *   masterTitle: 'Curation Queue',
 *   masterColumns: [
 *     { key: 'title', label: 'Title', type: 'text' },
 *     { key: 'status', label: 'Status', type: 'badge' }
 *   ],
 *   detailTitle: (item) => `Recipe: ${item.title}`,
 *   detailSections: [
 *     {
 *       id: 'basic',
 *       title: 'Basic Information',
 *       fields: [
 *         { key: 'title', label: 'Title' },
 *         { key: 'author', label: 'Author' }
 *       ]
 *     }
 *   ],
 *   actions: [
 *     { id: 'approve', label: 'Approve', icon: 'check_circle', color: 'primary' },
 *     { id: 'reject', label: 'Reject', icon: 'cancel', color: 'warn' }
 *   ],
 *   showSearch: true,
 *   keyboardNavigation: true
 * };
 * ```
 */
export interface MasterDetailConfig {
  // Master Panel Configuration
  /**
   * Title for the master panel
   *
   * @example 'Curation Queue'
   */
  masterTitle?: string;

  /**
   * Subtitle for the master panel
   */
  masterSubtitle?: string;

  /**
   * Columns to display in the master list
   *
   * @description
   * Defines how items are displayed in the master panel.
   */
  masterColumns: MasterDetailColumn[];

  /**
   * Custom template for master list items
   *
   * @description
   * If provided, overrides default item rendering. Receives item context.
   */
  masterItemTemplate?: TemplateRef<any>;

  /**
   * Message to display when master list is empty
   *
   * @default 'No items found'
   */
  masterEmptyMessage?: string;

  /**
   * Placeholder text for search input
   *
   * @default 'Search...'
   */
  masterSearchPlaceholder?: string;

  /**
   * Height of master panel
   *
   * @default 'calc(100vh - 200px)'
   */
  masterHeight?: string;

  // Detail Panel Configuration
  /**
   * Title for the detail panel
   *
   * @description
   * Can be a static string or function that returns title based on selected item.
   *
   * @example
   * ```typescript
   * detailTitle: (item) => `Recipe: ${item.title}`
   * ```
   */
  detailTitle?: string | ((item: any) => string);

  /**
   * Subtitle for the detail panel
   *
   * @description
   * Can be a static string or function that returns subtitle based on selected item.
   */
  detailSubtitle?: string | ((item: any) => string);

  /**
   * Sections to display in the detail panel
   *
   * @description
   * Organizes detail information into collapsible sections.
   */
  detailSections?: DetailSection[];

  /**
   * Message to display when no item is selected
   *
   * @default 'Select an item to view details'
   */
  detailEmptyMessage?: string;

  /**
   * Custom template for detail panel content
   *
   * @description
   * If provided, overrides default detail rendering. Receives selected item context.
   */
  detailTemplate?: TemplateRef<any>;

  // Actions Configuration
  /**
   * Actions available for selected items
   *
   * @description
   * Buttons displayed in the detail panel header for performing operations.
   */
  actions?: MasterDetailAction[];

  /**
   * Actions available for multiple selected items (multi-select mode)
   */
  bulkActions?: MasterDetailAction[];

  // Feature Flags
  /**
   * Whether to show search input in master panel
   *
   * @default true
   */
  showSearch?: boolean;

  /**
   * Whether to show filter controls in master panel
   *
   * @default false
   */
  showMasterFilter?: boolean;

  /**
   * Whether to show refresh button
   *
   * @default true
   */
  showRefresh?: boolean;

  /**
   * Whether to allow multiple item selection
   *
   * @default false
   */
  multiSelect?: boolean;

  /**
   * Whether to enable keyboard navigation (Up/Down/Enter)
   *
   * @default true
   */
  keyboardNavigation?: boolean;

  /**
   * Whether detail header should stick to top on scroll
   *
   * @default false
   */
  stickyDetailHeader?: boolean;

  // Layout Configuration
  /**
   * Width of master panel in pixels
   *
   * @default 350
   */
  masterWidth?: number;

  /**
   * Split orientation
   *
   * @default 'vertical'
   */
  splitMode?: 'vertical' | 'horizontal';

  /**
   * Breakpoint (in pixels) for responsive stacking
   *
   * @description
   * Below this width, panels stack vertically instead of side-by-side.
   *
   * @default 768
   */
  responsiveBreakpoint?: number;

  // Styling Configuration
  /**
   * Visual density of the component
   *
   * @default 'comfortable'
   */
  density?: 'compact' | 'comfortable' | 'spacious';

  /**
   * Custom CSS classes to apply to the component
   */
  customClasses?: string[];

  /**
   * Custom inline styles
   */
  customStyles?: { [key: string]: string };
}
