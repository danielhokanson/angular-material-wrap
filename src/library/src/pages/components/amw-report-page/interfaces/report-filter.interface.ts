// Report Filter Interface
export interface ReportFilter {
    key: string;
    label: string;
    type: 'text' | 'select' | 'boolean' | 'date' | 'number';
    options?: { value: any; label: string }[];
    placeholder?: string;
    visible?: boolean;
}
