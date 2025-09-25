import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SearchPageDataSource } from '../interfaces/search-page-data-source.interface';
import { SearchData } from '../interfaces/search-data.interface';

/**
 * Default implementation of SearchPageDataSource
 * Provides mock data for development and testing
 */
@Injectable()
export class DefaultSearchPageDataSource implements SearchPageDataSource {
    constructor() { }

    search(params: {
        query?: string;
        filters?: { [key: string]: any };
        sortField?: string;
        sortDirection?: 'asc' | 'desc';
        pageIndex: number;
        pageSize: number;
    }): Observable<SearchData> {
        // Mock search results
        const mockResults = [
            { id: '1', title: 'Result 1', description: 'Description 1', data: { category: 'A' } },
            { id: '2', title: 'Result 2', description: 'Description 2', data: { category: 'B' } }
        ];

        // Apply text search
        let filteredResults = mockResults;
        if (params.query) {
            filteredResults = mockResults.filter(item =>
                Object.values(item).some(value =>
                    String(value).toLowerCase().includes(params.query!.toLowerCase())
                )
            );
        }

        // Apply filters
        if (params.filters) {
            Object.keys(params.filters).forEach(key => {
                const filterValue = params.filters![key];
                if (filterValue !== null && filterValue !== undefined && filterValue !== '') {
                    filteredResults = filteredResults.filter(item => (item.data as any)[key] === filterValue);
                }
            });
        }

        // Apply sorting
        if (params.sortField) {
            filteredResults.sort((a, b) => {
                const aVal = (a as any)[params.sortField!];
                const bVal = (b as any)[params.sortField!];
                if (aVal < bVal) return params.sortDirection === 'asc' ? -1 : 1;
                if (aVal > bVal) return params.sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
        }

        const startIndex = params.pageIndex * params.pageSize;
        const endIndex = startIndex + params.pageSize;

        return new BehaviorSubject({
            results: filteredResults.slice(startIndex, endIndex),
            totalCount: filteredResults.length,
            pageIndex: params.pageIndex,
            pageSize: params.pageSize,
            searchQuery: params.query,
            filters: params.filters
        }).pipe(delay(500));
    }

    exportSearchResults(format: string, criteria: { [key: string]: any }): Observable<any> {
        return of({ success: true, data: 'Export completed' }).pipe(delay(500));
    }

    saveSearch(name: string, criteria: { [key: string]: any }): Observable<boolean> {
        return of(true).pipe(delay(500));
    }

    loadSavedSearches(): Observable<{ name: string; criteria: { [key: string]: any } }[]> {
        return of([]).pipe(delay(500));
    }

    deleteSavedSearch(name: string): Observable<boolean> {
        return of(true).pipe(delay(500));
    }
}
