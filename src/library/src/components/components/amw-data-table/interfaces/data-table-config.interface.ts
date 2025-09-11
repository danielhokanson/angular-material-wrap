import { DataTableColumn } from './data-table-column.interface';
import { DataTableAction } from './data-table-action.interface';

/**
 * Data table configuration interface
 */
export interface DataTableConfig {
    /** Table columns configuration */
    columns: DataTableColumn[];

    /** Table actions configuration */
    actions?: DataTableAction[];

    /** Whether the table is sortable */
    sortable?: boolean;

    /** Whether the table is filterable */
    filterable?: boolean;

    /** Whether the table is editable */
    editable?: boolean;

    /** Whether the table has row selection */
    selectable?: boolean;

    /** Selection mode */
    selectionMode?: 'single' | 'multiple' | 'none';

    /** Whether the table has pagination */
    paginated?: boolean;

    /** Page size options */
    pageSizeOptions?: number[];

    /** Default page size */
    defaultPageSize?: number;

    /** Whether to show page size selector */
    showPageSizeSelector?: boolean;

    /** Whether to show first/last page buttons */
    showFirstLastButtons?: boolean;

    /** Whether the table is loading */
    loading?: boolean;

    /** Loading message */
    loadingMessage?: string;

    /** Empty state message */
    emptyMessage?: string;

    /** Whether to show table header */
    showHeader?: boolean;

    /** Whether to show table footer */
    showFooter?: boolean;

    /** Table density */
    density?: 'compact' | 'comfortable' | 'spacious';

    /** Table height */
    height?: string;

    /** Maximum table height */
    maxHeight?: string;

    /** Whether the table is striped */
    striped?: boolean;

    /** Whether the table has hover effects */
    hoverable?: boolean;

    /** Whether the table is responsive */
    responsive?: boolean;

    /** Custom CSS classes */
    cssClass?: string;

    /** Whether to show column borders */
    showBorders?: boolean;

    /** Whether to show row borders */
    showRowBorders?: boolean;

    /** Whether to show action column */
    showActions?: boolean;

    /** Action column position */
    actionsPosition?: 'start' | 'end';

    /** Whether to show selection column */
    showSelection?: boolean;

    /** Selection column position */
    selectionPosition?: 'start' | 'end';

    /** Whether to show expandable rows */
    expandable?: boolean;

    /** Expandable row template */
    expandableTemplate?: string;

    /** Whether to show row numbers */
    showRowNumbers?: boolean;

    /** Row number column label */
    rowNumberLabel?: string;

    /** Whether to show total count */
    showTotalCount?: boolean;

    /** Total count label */
    totalCountLabel?: string;

    /** Whether to show column visibility toggle */
    showColumnVisibility?: boolean;

    /** Whether to show export options */
    showExport?: boolean;

    /** Export formats */
    exportFormats?: ('csv' | 'excel' | 'pdf')[];

    /** Whether to show refresh button */
    showRefresh?: boolean;

    /** Whether to show settings button */
    showSettings?: boolean;
}
