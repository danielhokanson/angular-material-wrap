// Report Action Interface
export interface ReportAction {
    key: string;
    label: string;
    icon: string;
    color?: 'primary' | 'accent' | 'warn';
    onClick: (data: any) => void;
}
