export interface DataTableAction {
    key: string;
    label: string;
    icon: string;
    color?: 'primary' | 'accent' | 'warn';
    disabled?: (row: any, index: number) => boolean;
    visible?: (row: any, index: number) => boolean;
    tooltip?: string;
    class?: string;
    style?: { [key: string]: any };
}


