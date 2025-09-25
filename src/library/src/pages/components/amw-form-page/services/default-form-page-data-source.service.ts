import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FormPageDataSource } from '../interfaces/form-page-data-source.interface';
import { FormPageData } from '../interfaces/form-page-data.interface';

/**
 * Default implementation of FormPageDataSource
 * Provides mock data for development and testing
 */
@Injectable()
export class DefaultFormPageDataSource implements FormPageDataSource {
    constructor() { }

    getData(id?: string): Observable<FormPageData> {
        // Mock data for demo
        const mockItem = { id: id || '1', name: 'Sample Item', description: 'This is a sample item' };
        return new BehaviorSubject({
            item: mockItem,
            sections: [],
            isValid: true,
            errors: {}
        }).pipe(delay(500));
    }

    saveData(data: any): Observable<boolean> {
        return of(true).pipe(delay(500));
    }

    deleteData(id: string): Observable<boolean> {
        return of(true).pipe(delay(500));
    }

    validateData(data: any): Observable<{ isValid: boolean; errors: { [key: string]: string } }> {
        return of({ isValid: true, errors: {} }).pipe(delay(500));
    }
}
