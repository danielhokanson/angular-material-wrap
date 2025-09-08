import { AmwSize } from '../../../../shared/types/amw-size.type';

/**
 * Configuration options for the amw-card component
 */
export interface CardConfig {
    /** CSS class to apply to the card */
    class?: string;
    /** Inline styles to apply to the card */
    style?: { [key: string]: any };
    /** Whether the card is disabled */
    disabled?: boolean;
    /** Whether the card is in loading state */
    loading?: boolean;
    /** Whether the card is clickable */
    clickable?: boolean;
    /** Elevation level for shadow (0-5) */
    elevation?: number;
    /** Visual variant of the card */
    variant?: 'elevated' | 'outlined' | 'filled';
    /** Size variant of the card */
    size?: AmwSize;
    /** Theme variant of the card */
    theme?: 'primary' | 'accent' | 'warn';
}
