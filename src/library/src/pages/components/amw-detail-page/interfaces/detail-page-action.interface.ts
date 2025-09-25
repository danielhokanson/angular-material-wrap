// Detail Page Action Interface
export interface DetailPageAction {
    key: string;
    label: string;
    icon: string;
    color?: 'primary' | 'accent' | 'warn';
    onClick: (item: any) => void;
}
