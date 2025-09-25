// Search Action Interface
export interface SearchAction {
    key: string;
    label: string;
    icon: string;
    color?: 'primary' | 'accent' | 'warn';
    onClick: (data: any) => void;
}
