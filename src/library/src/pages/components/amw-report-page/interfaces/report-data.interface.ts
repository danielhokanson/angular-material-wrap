import { ReportWidget } from './report-widget.interface';
import { ReportFilter } from './report-filter.interface';
import { DateRange } from './date-range.interface';

// Report Data Interface
export interface ReportData {
    widgets: ReportWidget[];
    dateRange?: DateRange;
    filters?: { [key: string]: any };
    lastUpdated?: Date;
}
