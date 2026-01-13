/**
 * Button style types - controls the visual appearance (surface treatment)
 * These are the M3 button styles from Angular Material
 */
export type ButtonStyle = 'text' | 'elevated' | 'outlined' | 'filled' | 'tonal';

/**
 * FAB (Floating Action Button) type
 * - false: not a FAB (regular button)
 * - true or 'standard': standard FAB (56px)
 * - 'mini': mini FAB (40px)
 * - 'extended': extended FAB with text
 */
export type FabType = boolean | 'standard' | 'mini' | 'extended';
