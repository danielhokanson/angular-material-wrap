import { SearchResult } from './search-result.interface';

// Search Data Interface
export interface SearchData {
    results: SearchResult[];
    totalCount: number;
    pageIndex: number;
    pageSize: number;
    searchQuery?: string;
    filters?: { [key: string]: any };
}
