import { TemplateRef } from '@angular/core';

export interface DataTableColumn {
    key: string;
    label?: string;
    type?: 'text' | 'number' | 'currency' | 'date' | 'boolean' | 'custom';
    sortable?: boolean;
    filterable?: boolean;
    hidden?: boolean;
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    align?: 'left' | 'center' | 'right';
    currency?: string;
    decimals?: number;
    dateFormat?: string;
    template?: TemplateRef<any>;
    formatter?: (value: any, row: any) => string;
    sortValue?: (value: any, row: any) => any;
    filterValue?: (value: any, row: any) => any;
    class?: string;
    style?: { [key: string]: any };
}

