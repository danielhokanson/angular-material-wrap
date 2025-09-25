import { DetailPageField } from './detail-page-field.interface';
import { DetailPageRelatedData } from './detail-page-related-data.interface';
import { DetailPageAction } from './detail-page-action.interface';

// Detail Page Configuration Interface
export interface DetailPageConfig {
    title?: string;
    subtitle?: string;
    showBackButton?: boolean;
    showEditButton?: boolean;
    showDeleteButton?: boolean;
    showPrintButton?: boolean;
    showShareButton?: boolean;
    showRefreshButton?: boolean;
    fields?: DetailPageField[];
    relatedData?: DetailPageRelatedData[];
    customActions?: DetailPageAction[];
    customClasses?: string[];
    customStyles?: { [key: string]: string };
}


