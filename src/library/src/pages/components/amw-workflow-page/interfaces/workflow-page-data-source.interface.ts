import { Observable } from 'rxjs';
import { WorkflowData } from './workflow-data.interface';
import { WorkflowPageConfig } from './workflow-page-config.interface';

// Workflow Page Data Source Interface
export interface WorkflowPageDataSource {
    getWorkflow(id: string): Observable<WorkflowPageConfig>;
    saveStepData(stepId: string, data: any): Observable<boolean>;
    validateStep(stepId: string, data: any): Observable<{ isValid: boolean; errors: string[] }>;
    completeWorkflow(data: any): Observable<boolean>;
}
