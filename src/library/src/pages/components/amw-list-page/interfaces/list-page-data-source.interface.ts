import { Observable } from 'rxjs';
import { ListPageData } from './list-page-data.interface';

// List Page Data Source Interface
export interface ListPageDataSource {
    getData(params: {
        pageIndex: number;
        pageSize: number;
        sortField?: string;
        sortDirection?: 'asc' | 'desc';
        filters?: { [key: string]: any };
        searchQuery?: string;
    }): Observable<ListPageData>;
}

