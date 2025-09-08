export interface DataTableFilter {
    key: string;
    label: string;
    type: 'text' | 'select' | 'date' | 'number' | 'boolean';
    options?: { value: any; label: string }[];
    placeholder?: string;
    value?: any;
    operator?: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan' | 'between';
}


