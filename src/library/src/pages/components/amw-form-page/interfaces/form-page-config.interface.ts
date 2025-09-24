import { FormPageSection } from './form-page-section.interface';

// Form Page Configuration Interface
export interface FormPageConfig {
    title?: string;
    subtitle?: string;
    mode?: 'create' | 'edit' | 'view';
    showBackButton?: boolean;
    showSaveButton?: boolean;
    showCancelButton?: boolean;
    showResetButton?: boolean;
    showDeleteButton?: boolean;
    showPreviewButton?: boolean;
    showPrintButton?: boolean;
    autoSave?: boolean;
    sections: FormPageSection[];
    customActions?: FormPageAction[];
    customClasses?: string[];
    customStyles?: { [key: string]: string };
}

export interface FormPageAction {
    key: string;
    label: string;
    icon: string;
    color?: 'primary' | 'accent' | 'warn';
    onClick: (formData: any) => void;
}

