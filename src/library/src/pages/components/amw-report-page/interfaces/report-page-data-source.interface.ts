import { Observable } from 'rxjs';
import { ReportData } from './report-data.interface';

// Report Page Data Source Interface
export interface ReportPageDataSource {
    getData(params: {
        dateRange?: { start: Date; end: Date };
        filters?: { [key: string]: any };
    }): Observable<ReportData>;
}
