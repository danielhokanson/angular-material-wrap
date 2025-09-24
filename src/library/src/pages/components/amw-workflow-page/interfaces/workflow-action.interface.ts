// Workflow Action Interface
export interface WorkflowAction {
    key: string;
    label: string;
    icon: string;
    color?: 'primary' | 'accent' | 'warn';
    onClick: (data: any) => void;
}
