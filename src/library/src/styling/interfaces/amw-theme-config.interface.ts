import { AmwThemeColors } from './amw-theme-colors.interface';

/**
 * Complete theme configuration
 */
export interface AmwThemeConfig {
    /** Unique theme identifier */
    id: string;
    /** Theme name */
    name: string;
    /** Display name for UI */
    displayName: string;
    /** Color palette */
    colors: AmwThemeColors;
    /** Whether this is a dark theme */
    isDark: boolean;
    /** Whether this is a custom theme */
    isCustom: boolean;
}


