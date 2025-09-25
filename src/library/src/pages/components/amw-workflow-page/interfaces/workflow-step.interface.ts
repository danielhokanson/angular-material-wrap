// Workflow Step Interface
export interface WorkflowStep {
    id: string;
    title: string;
    description?: string;
    icon?: string;
    status: 'pending' | 'current' | 'completed' | 'error';
    required?: boolean;
    skippable?: boolean;
    data?: any;
    validation?: {
        required?: boolean;
        requiredFields?: string[];
        customValidator?: (data: any) => boolean;
        errorMessage?: string;
    };
}
