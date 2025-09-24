// Detail Page Field Interface
export interface DetailPageField {
    key: string;
    label: string;
    value: any;
    type: 'text' | 'number' | 'date' | 'email' | 'phone' | 'url' | 'currency' | 'boolean' | 'custom';
    icon?: string;
    color?: 'primary' | 'accent' | 'warn';
    copyable?: boolean;
    linkable?: boolean;
    linkUrl?: string;
    visible?: boolean;
    customRenderer?: (value: any) => string;
}

