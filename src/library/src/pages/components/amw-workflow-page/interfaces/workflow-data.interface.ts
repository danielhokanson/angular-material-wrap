// Workflow Data Interface
export interface WorkflowData {
    currentStep: number;
    completedSteps: number[];
    data: any;
    isValid: boolean;
    errors: string[];
}
