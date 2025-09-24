// List Page Column Interface
export interface ListPageColumn {
    key: string;
    title: string;
    sortable?: boolean;
    filterable?: boolean;
    visible?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  type?: 'text' | 'number' | 'date' | 'boolean' | 'custom' | 'currency';
  customRenderer?: (value: any, row: any) => string;
}

