export interface DataTableConfig {
    size?: 'small' | 'medium' | 'large';
    theme?: 'primary' | 'accent' | 'warn';
    pageSize?: number;
    pageSizeOptions?: number[];
    showFirstLastButtons?: boolean;
    hidePageSize?: boolean;
    disabled?: boolean;
    loading?: boolean;
    emptyMessage?: string;
    noDataIcon?: string;
    stickyHeader?: boolean;
    stickyFooter?: boolean;
    striped?: boolean;
    hoverable?: boolean;
    selectable?: boolean;
    multiSelect?: boolean;
    sortable?: boolean;
    filterable?: boolean;
    pageable?: boolean;
    exportable?: boolean;
    resizable?: boolean;
    reorderable?: boolean;
}

