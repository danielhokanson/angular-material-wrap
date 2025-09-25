import { SearchOption } from './search-option.interface';

// Search Field Interface
export interface SearchField {
    key: string;
    label: string;
    type: 'text' | 'select' | 'boolean' | 'date' | 'number';
    placeholder?: string;
    options?: SearchOption[];
    advanced?: boolean;
    required?: boolean;
    visible?: boolean;
}

