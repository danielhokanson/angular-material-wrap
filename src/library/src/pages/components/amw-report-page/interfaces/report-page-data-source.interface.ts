import { Observable } from 'rxjs';
import { ReportData } from './report-data.interface';
import { DateRange } from './date-range.interface';

// Report Page Data Source Interface
export interface ReportPageDataSource {
    getData(params: {
        dateRange?: DateRange;
        filters?: { [key: string]: any };
    }): Observable<ReportData>;
}
