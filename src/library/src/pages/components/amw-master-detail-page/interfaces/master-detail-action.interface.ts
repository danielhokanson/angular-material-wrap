/**
 * Action configuration for master-detail page
 *
 * @description
 * Defines actions that can be performed on selected items in the master-detail view.
 * Actions can be contextual (based on selection) and support confirmation dialogs.
 *
 * @example
 * ```typescript
 * const approveAction: MasterDetailAction = {
 *   id: 'approve',
 *   label: 'Approve',
 *   icon: 'check_circle',
 *   color: 'primary',
 *   disabled: (item) => item.status === 'approved',
 *   confirmMessage: 'Are you sure you want to approve this item?'
 * };
 * ```
 */
export interface MasterDetailAction {
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
   * Function to determine if action should be disabled
   *
   * @description
   * Receives the selected item(s) and returns true if action should be disabled.
   *
   * @example
   * ```typescript
   * disabled: (item) => item.status === 'completed'
   * ```
   */
  disabled?: (item: any) => boolean;

  /**
   * Function to determine if action should be visible
   *
   * @description
   * Receives the selected item(s) and returns true if action should be shown.
   *
   * @example
   * ```typescript
   * visible: (item) => item.type === 'pending'
   * ```
   */
  visible?: (item: any) => boolean;

  /**
   * Confirmation message to display before executing action
   *
   * @description
   * If provided, shows a confirmation dialog before triggering the action.
   */
  confirmMessage?: string;

  /**
   * Whether action requires at least one item to be selected
   *
   * @default true
   */
  requiresSelection?: boolean;
}
