import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ListPageDataSource } from '../interfaces/list-page-data-source.interface';
import { ListPageData } from '../interfaces/list-page-data.interface';

/**
 * Default implementation of ListPageDataSource
 * Provides mock data for development and testing
 */
@Injectable()
export class DefaultListPageDataSource implements ListPageDataSource {
    constructor() { }

    getData(params: any): Observable<ListPageData> {
        // Mock data for demo
        const mockItems = [
            { id: 1, name: 'Item 1', status: 'Active' },
            { id: 2, name: 'Item 2', status: 'Inactive' },
            { id: 3, name: 'Item 3', status: 'Active' }
        ];

        return new BehaviorSubject({
            items: mockItems,
            totalCount: mockItems.length,
            pageIndex: params.pageIndex,
            pageSize: params.pageSize,
            sortField: params.sortField,
            sortDirection: params.sortDirection,
            filters: params.filters,
            searchQuery: params.searchQuery
        }).pipe(delay(500));
    }

    deleteItems(ids: string[]): Observable<boolean> {
        return new BehaviorSubject(true).pipe(delay(500));
    }

    exportData(format: string, filters: { [key: string]: any }): Observable<any> {
        return new BehaviorSubject({ success: true, data: 'Export completed' }).pipe(delay(500));
    }
}
