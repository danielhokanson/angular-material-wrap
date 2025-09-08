import { ThemeColors } from './theme-colors.interface';

/**
 * Complete theme configuration
 */
export interface ThemeConfig {
    /** Unique theme identifier */
    id: string;
    /** Theme name */
    name: string;
    /** Display name for UI */
    displayName: string;
    /** Color palette */
    colors: ThemeColors;
    /** Whether this is a dark theme */
    isDark: boolean;
    /** Whether this is a custom theme */
    isCustom: boolean;
}

