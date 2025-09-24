// Workflow Step Interface
export interface WorkflowStep {
    key: string;
    title: string;
    description?: string;
    icon?: string;
    completed?: boolean;
    disabled?: boolean;
    required?: boolean;
    validation?: {
        required?: boolean;
        requiredFields?: string[];
        customValidator?: (data: any) => boolean;
        errorMessage?: string;
    };
}
