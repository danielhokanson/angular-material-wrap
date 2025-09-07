export interface SwitchConfig {
    checked: boolean;
    disabled: boolean;
    size: 'small' | 'medium' | 'large';
    color: 'primary' | 'accent' | 'warn';
    labelPosition: 'before' | 'after';
    indeterminate: boolean;
    required: boolean;
}
