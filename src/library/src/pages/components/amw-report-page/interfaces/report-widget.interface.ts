// Report Widget Interface
export interface ReportWidget {
    id: string;
    title: string;
    type: 'chart' | 'table' | 'metric' | 'progress' | 'custom' | 'kpi';
    size: 'small' | 'medium' | 'large' | 'full';
    data: any;
    visible?: boolean;
    refreshable?: boolean;
    config?: any;
    position?: { row: number; col: number; colspan?: number; rowspan?: number };
}
