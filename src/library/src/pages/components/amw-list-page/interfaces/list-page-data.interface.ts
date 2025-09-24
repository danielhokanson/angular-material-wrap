// List Page Data Interface
export interface ListPageData {
    items: any[];
    totalCount: number;
    pageIndex: number;
    pageSize: number;
    sortField?: string;
    sortDirection?: 'asc' | 'desc';
    filters?: { [key: string]: any };
    searchQuery?: string;
}

