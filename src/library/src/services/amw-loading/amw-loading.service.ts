import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface LoadingState {
    isLoading: boolean;
    message?: string;
    progress?: number;
    overlay?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AmwLoadingService {
    private loadingSubject = new BehaviorSubject<LoadingState>({ isLoading: false });
    private loadingStack: string[] = [];

    public loading$: Observable<LoadingState> = this.loadingSubject.asObservable();

    constructor() { }

    /**
     * Show loading with optional message and progress
     */
    show(message?: string, options?: { progress?: number; overlay?: boolean }): string {
        const id = this.generateLoadingId();
        this.loadingStack.push(id);

        const state: LoadingState = {
            isLoading: true,
            message,
            progress: options?.progress,
            overlay: options?.overlay !== false
        };

        this.loadingSubject.next(state);
        return id;
    }

    /**
     * Hide loading by ID
     */
    hide(id?: string): void {
        if (id) {
            const index = this.loadingStack.indexOf(id);
            if (index > -1) {
                this.loadingStack.splice(index, 1);
            }
        } else {
            this.loadingStack = [];
        }

        if (this.loadingStack.length === 0) {
            this.loadingSubject.next({ isLoading: false });
        }
    }

    /**
     * Update loading message
     */
    updateMessage(message: string): void {
        const currentState = this.loadingSubject.value;
        if (currentState.isLoading) {
            this.loadingSubject.next({ ...currentState, message });
        }
    }

    /**
     * Update loading progress (0-100)
     */
    updateProgress(progress: number): void {
        const currentState = this.loadingSubject.value;
        if (currentState.isLoading) {
            this.loadingSubject.next({ ...currentState, progress: Math.max(0, Math.min(100, progress)) });
        }
    }

    /**
     * Check if currently loading
     */
    isLoading(): boolean {
        return this.loadingSubject.value.isLoading;
    }

    /**
     * Get current loading state
     */
    getCurrentState(): LoadingState {
        return this.loadingSubject.value;
    }

    /**
     * Clear all loading states
     */
    clear(): void {
        this.loadingStack = [];
        this.loadingSubject.next({ isLoading: false });
    }

    private generateLoadingId(): string {
        return `loading_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}
