// List Page Filter Interface
export interface ListPageFilter {
    key: string;
    label: string;
    type: 'text' | 'select' | 'boolean' | 'date' | 'number';
    options?: { value: any; label: string }[];
    placeholder?: string;
}

