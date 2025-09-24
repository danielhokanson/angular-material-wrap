import { ListPageColumn } from './list-page-column.interface';
import { ListPageFilter } from './list-page-filter.interface';
import { ListPageAction } from './list-page-action.interface';

// List Page Configuration Interface
export interface ListPageConfig {
    title?: string;
    subtitle?: string;
    columns: ListPageColumn[];
    filters?: ListPageFilter[];
    pageSizeOptions?: number[];
    showSearch?: boolean;
    showFilters?: boolean;
    showBulkActions?: boolean;
    showColumnVisibility?: boolean;
    showDensity?: boolean;
    showExport?: boolean;
    showRefresh?: boolean;
    bulkActions?: ListPageAction[];
    customActions?: ListPageAction[];
    customClasses?: string[];
    customStyles?: { [key: string]: string };
}

