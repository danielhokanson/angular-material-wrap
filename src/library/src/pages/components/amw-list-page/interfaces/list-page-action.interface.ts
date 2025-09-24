// List Page Action Interface
export interface ListPageAction {
    key: string;
    label: string;
    icon: string;
    color?: 'primary' | 'accent' | 'warn';
    requiresSelection?: boolean;
    onClick: (items: any[]) => void;
}

