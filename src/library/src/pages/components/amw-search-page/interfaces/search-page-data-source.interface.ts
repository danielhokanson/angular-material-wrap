import { Observable } from 'rxjs';
import { SearchData } from './search-data.interface';

// Search Page Data Source Interface
export interface SearchPageDataSource {
    search(params: {
        query?: string;
        filters?: { [key: string]: any };
        sortField?: string;
        sortDirection?: 'asc' | 'desc';
        pageIndex: number;
        pageSize: number;
    }): Observable<SearchData>;
    exportSearchResults(format: string, criteria: { [key: string]: any }): Observable<any>;
    saveSearch(name: string, criteria: { [key: string]: any }): Observable<boolean>;
    loadSavedSearches(): Observable<{ name: string; criteria: { [key: string]: any } }[]>;
    deleteSavedSearch(name: string): Observable<boolean>;
}
