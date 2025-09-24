import { FormPageSection } from './form-page-section.interface';
import { FormPageValidation } from './form-page-validation.interface';

// Form Page Data Interface
export interface FormPageData {
    item: any;
    sections: FormPageSection[];
    isValid?: boolean;
    errors?: { [key: string]: string };
    validation?: FormPageValidation;
}

