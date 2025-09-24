import { ReportWidget } from './report-widget.interface';
import { ReportFilter } from './report-filter.interface';
import { DateRange } from './date-range.interface';

// Report Page Configuration Interface
export interface ReportPageConfig {
    title?: string;
    subtitle?: string;
    showDateRange?: boolean;
    showFilters?: boolean;
    showExport?: boolean;
    showRefresh?: boolean;
    showFullscreen?: boolean;
    showPrint?: boolean;
    widgets?: ReportWidget[];
    filters?: ReportFilter[];
    dateRange?: DateRange;
    customActions?: ReportAction[];
    customClasses?: string[];
    customStyles?: { [key: string]: string };
}

export interface ReportAction {
    key: string;
    label: string;
    icon: string;
    color?: 'primary' | 'accent' | 'warn';
    onClick: (data: any) => void;
}
