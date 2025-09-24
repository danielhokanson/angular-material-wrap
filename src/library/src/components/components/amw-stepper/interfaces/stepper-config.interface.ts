/**
 * Stepper configuration interface
 */
export interface StepperConfig {
    /** Stepper orientation */
    orientation?: 'horizontal' | 'vertical';

    /** Whether the stepper is linear */
    linear?: boolean;

    /** Whether to show step labels */
    showLabels?: boolean;

    /** Whether to show step icons */
    showIcons?: boolean;

    /** Whether to show step descriptions */
    showDescriptions?: boolean;

    /** Whether to show navigation buttons */
    showNavigation?: boolean;

    /** Whether to show completion button */
    showCompletion?: boolean;

    /** Whether to allow back navigation */
    allowBackNavigation?: boolean;

    /** Whether to allow skipping steps */
    allowSkipSteps?: boolean;

    /** Whether to validate steps */
    validateSteps?: boolean;

    /** Animation duration in milliseconds */
    animationDuration?: number;

    /** Animation easing function */
    animationEasing?: string;

    /** Custom CSS classes */
    customClasses?: string[];

    /** Custom styles */
    customStyles?: { [key: string]: string };
}

