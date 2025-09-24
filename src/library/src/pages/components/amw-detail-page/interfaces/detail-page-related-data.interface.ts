// Detail Page Related Data Interface
export interface DetailPageRelatedData {
    key: string;
    title: string;
    type: 'table' | 'list' | 'chart' | 'custom';
    data: any[];
    items?: any[];
    columns?: { key: string; title: string; type: string }[];
    visible?: boolean;
    collapsible?: boolean;
    expanded?: boolean;
}

