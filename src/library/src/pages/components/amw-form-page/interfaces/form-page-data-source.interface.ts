import { Observable } from 'rxjs';
import { FormPageData } from './form-page-data.interface';
import { FormPageValidation } from './form-page-validation.interface';

// Form Page Data Source Interface
export interface FormPageDataSource {
    getData(id?: string): Observable<FormPageData>;
    saveData(data: any): Observable<boolean>;
    deleteData(id: string): Observable<boolean>;
    validateData(data: any): Observable<FormPageValidation>;
}

