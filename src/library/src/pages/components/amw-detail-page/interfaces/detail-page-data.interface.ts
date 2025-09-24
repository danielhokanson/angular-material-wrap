import { DetailPageSection } from './detail-page-section.interface';
import { DetailPageRelatedData } from './detail-page-related-data.interface';

// Detail Page Data Interface
export interface DetailPageData {
    item: any;
    sections: DetailPageSection[];
    relatedData?: DetailPageRelatedData[];
}

