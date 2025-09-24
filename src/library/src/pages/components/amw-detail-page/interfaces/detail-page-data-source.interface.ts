import { Observable } from 'rxjs';
import { DetailPageData } from './detail-page-data.interface';

// Detail Page Data Source Interface
export interface DetailPageDataSource {
    getData(id: string): Observable<DetailPageData>;
    deleteItem(id: string): Observable<boolean>;
    refreshItem(id: string): Observable<DetailPageData>;
}

