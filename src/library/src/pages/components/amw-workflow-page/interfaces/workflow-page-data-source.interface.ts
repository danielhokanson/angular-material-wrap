import { Observable } from 'rxjs';
import { WorkflowData } from './workflow-data.interface';

// Workflow Page Data Source Interface
export interface WorkflowPageDataSource {
    getData(workflowId: string): Observable<WorkflowData>;
    saveData(workflowId: string, data: any): Observable<boolean>;
    completeStep(workflowId: string, stepIndex: number): Observable<boolean>;
}
