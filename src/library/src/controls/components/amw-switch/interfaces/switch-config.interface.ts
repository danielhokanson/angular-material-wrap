import { AmwColor } from '../../../../shared/types/amw-color.type';

export interface SwitchConfig {
    checked: boolean;
    disabled: boolean;
    size: 'small' | 'medium' | 'large';
    color: AmwColor;
    labelPosition: 'before' | 'after';
    indeterminate: boolean;
    required: boolean;
}

