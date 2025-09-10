import { RadioGroupOption } from './radio-group-option.interface';
import { AmwSize } from '../../../../shared/types/amw-size.type';

/**
 * Radio group configuration interface
 */
export interface RadioGroupConfig {
    options: RadioGroupOption[];
    size?: AmwSize;
    label?: string;
    hint?: string;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    orientation?: 'horizontal' | 'vertical';
    color?: 'primary' | 'accent' | 'warn';
}
