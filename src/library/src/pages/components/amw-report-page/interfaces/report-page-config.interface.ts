import { ReportWidget } from './report-widget.interface';
import { ReportFilter } from './report-filter.interface';
import { DateRange } from './date-range.interface';
import { ReportAction } from './report-action.interface';

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

