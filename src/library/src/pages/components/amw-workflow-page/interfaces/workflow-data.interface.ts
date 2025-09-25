// Workflow Data Interface
export interface WorkflowData {
    currentStep: number;
    completedSteps: number;
    totalSteps: number;
    stepData: { [key: string]: any };
    errors: { [key: string]: string };
}
