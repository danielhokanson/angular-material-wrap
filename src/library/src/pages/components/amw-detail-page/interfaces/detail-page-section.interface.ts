import { DetailPageField } from './detail-page-field.interface';

// Detail Page Section Interface
export interface DetailPageSection {
    key: string;
    title: string;
    subtitle?: string;
    icon?: string;
    fields: DetailPageField[];
    visible?: boolean;
    collapsible?: boolean;
    expanded?: boolean;
}

