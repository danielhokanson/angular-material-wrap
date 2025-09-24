import { FormPageField } from './form-page-field.interface';

// Form Page Section Interface
export interface FormPageSection {
    key: string;
    title: string;
    subtitle?: string;
    icon?: string;
    fields: FormPageField[];
    visible?: boolean;
    collapsible?: boolean;
    expanded?: boolean;
}

