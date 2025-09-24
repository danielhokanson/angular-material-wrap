// Quick Filter Interface
export interface QuickFilter {
    key: string;
    label: string;
    value: any;
    icon?: string;
    color?: 'primary' | 'accent' | 'warn';
    active?: boolean;
}
