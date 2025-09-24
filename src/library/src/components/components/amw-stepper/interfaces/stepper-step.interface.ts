/**
 * Stepper step interface
 */
export interface StepperStep {
    /** Step label */
    label: string;

    /** Step description */
    description?: string;

    /** Step icon */
    icon?: string;

    /** Step content template */
    content?: string;

    /** Whether the step is completed */
    isCompleted?: boolean;

    /** Whether the step is valid */
    isValid?: boolean;

    /** Whether the step is disabled */
    isDisabled?: boolean;

    /** Whether the step is optional */
    isOptional?: boolean;

    /** Step validator function */
    validator?: (step: StepperStep) => boolean;

    /** Step completion callback */
    onComplete?: () => void;

    /** Step activation callback */
    onActivate?: () => void;

    /** Custom CSS classes */
    customClasses?: string[];

    /** Custom styles */
    customStyles?: { [key: string]: string };

    /** Additional step data */
    data?: any;
}

