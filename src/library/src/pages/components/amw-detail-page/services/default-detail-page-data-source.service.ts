import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DetailPageDataSource } from '../interfaces/detail-page-data-source.interface';
import { DetailPageData } from '../interfaces/detail-page-data.interface';

/**
 * Default implementation of DetailPageDataSource
 * Provides mock data for development and testing
 */
@Injectable()
export class DefaultDetailPageDataSource implements DetailPageDataSource {
    constructor() { }

    getData(id: string): Observable<DetailPageData> {
        // Mock data for demo
        const mockItem = { id, name: 'Sample Item', description: 'This is a sample item' };
        return new BehaviorSubject({
            item: mockItem,
            sections: [],
            relatedData: []
        }).pipe(delay(500));
    }

    deleteItem(id: string): Observable<boolean> {
        return of(true).pipe(delay(500));
    }

    refreshItem(id: string): Observable<DetailPageData> {
        return this.getData(id);
    }
}
