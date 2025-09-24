import { WorkflowStep } from './workflow-step.interface';
import { WorkflowAction } from './workflow-action.interface';

// Workflow Page Configuration Interface
export interface WorkflowPageConfig {
    title?: string;
    subtitle?: string;
    steps: WorkflowStep[];
    showProgress?: boolean;
    showStepNumbers?: boolean;
    allowBackNavigation?: boolean;
    customActions?: WorkflowAction[];
    customClasses?: string[];
    customStyles?: { [key: string]: string };
}
