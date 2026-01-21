import { Component, OnInit, OnDestroy } from '@angular/core';

import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AmwPopoverComponent } from '../../../../library/src/components/components/amw-popover/amw-popover.component';
import { PopoverConfig } from '../../../../library/src/components/components/amw-popover/interfaces/popover-config.interface';
import { PopoverTrigger } from '../../../../library/src/components/components/amw-popover/interfaces/popover-trigger.interface';
import { AmwPopoverService } from '../../../../library/src/components/services/amw-popover.service';
import { AmwSize } from '../../../../library/src/shared/types';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwSelectComponent } from '../../../../library/src/controls/components/amw-select/amw-select.component';
import { AmwCardComponent } from '../../../../library/src/components/components';

/**
 * Validation demo component for popover
 *
 * Demonstrates form validation and error handling for popover configuration
 */
@Component({
    selector: 'app-popover-validation',
    standalone: true,
    imports: [
    ReactiveFormsModule,
    AmwPopoverComponent,
    AmwButtonComponent,
    AmwInputComponent,
    AmwSelectComponent,
    AmwCardComponent,
],
    templateUrl: './popover-validation.component.html',
    styleUrl: './popover-validation.component.scss'
})
export class PopoverValidationComponent implements OnInit, OnDestroy {
    /** Subject for component destruction */
    private destroy$ = new Subject<void>();

    /** Form for popover configuration validation */
    configForm: FormGroup;

    /** Form for popover trigger validation */
    triggerForm: FormGroup;

    /** Current popover configuration */
    currentConfig: PopoverConfig = { opened: false };

    /** Current popover trigger */
    currentTrigger: PopoverTrigger = {};

    /** Form validation errors */
    validationErrors: { [key: string]: string } = {};

    /** Whether the form has been submitted */
    formSubmitted = false;

    /** Whether to show validation errors */
    showValidationErrors = false;

    constructor(
        private fb: FormBuilder,
        private popoverService: AmwPopoverService,
        private notification: AmwNotificationService
    ) {
        this.configForm = this.createConfigForm();
        this.triggerForm = this.createTriggerForm();
    }

    ngOnInit(): void {
        this.setupFormSubscriptions();
        this.loadSampleData();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    /**
     * Creates the configuration form with validation
     */
    private createConfigForm(): FormGroup {
        return this.fb.group({
            size: ['medium', [Validators.required]],
            position: ['bottom', [Validators.required]],
            width: ['', [Validators.pattern(/^\d+(px|%|rem|em|vw|vh)?$/)]],
            height: ['', [Validators.pattern(/^\d+(px|%|rem|em|vw|vh)?$/)]],
            minWidth: ['', [Validators.pattern(/^\d+(px|%|rem|em|vw|vh)?$/)]],
            maxWidth: ['', [Validators.pattern(/^\d+(px|%|rem|em|vw|vh)?$/)]],
            minHeight: ['', [Validators.pattern(/^\d+(px|%|rem|em|vw|vh)?$/)]],
            maxHeight: ['', [Validators.pattern(/^\d+(px|%|rem|em|vw|vh)?$/)]],
            offsetX: [0, [Validators.min(-1000), Validators.max(1000)]],
            offsetY: [0, [Validators.min(-1000), Validators.max(1000)]],
            zIndex: [1000, [Validators.min(0), Validators.max(10000)]],
            animationDuration: [300, [Validators.min(0), Validators.max(5000)]],
            animationEasing: ['cubic-bezier(0.4, 0, 0.2, 1)', [Validators.pattern(/^(cubic-bezier\([^)]+\)|ease|ease-in|ease-out|ease-in-out|linear)$/)]],
            headerTitle: ['', [Validators.maxLength(100)]],
            headerSubtitle: ['', [Validators.maxLength(200)]],
            footerText: ['', [Validators.maxLength(200)]],
            closeText: ['Close', [Validators.maxLength(50)]],
            closeIcon: ['close', [Validators.pattern(/^[a-zA-Z_][a-zA-Z0-9_]*$/)]],
            arrowColor: ['', [Validators.pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)]],
            showArrow: [true],
            showClose: [true],
            showHeader: [false],
            showFooter: [false],
            showBackdrop: [false],
            showScrollbar: [false],
            disabled: [false],
            autoFocus: [true],
            restoreFocus: [true],
            keyboardNavigation: [true],
            escapeKeyClose: [true],
            clickOutsideClose: [true],
            hoverOpen: [false],
            hoverClose: [false],
            focusOpen: [false],
            focusClose: [false],
            scrollClose: [false],
            resizeClose: [false]
        });
    }

    /**
     * Creates the trigger form with validation
     */
    private createTriggerForm(): FormGroup {
        return this.fb.group({
            type: ['click', [Validators.required]],
            disabled: [false],
            preventDefault: [false],
            stopPropagation: [false],
            delay: [0, [Validators.min(0), Validators.max(10000)]],
            closeDelay: [0, [Validators.min(0), Validators.max(10000)]],
            toggle: [true],
            escapeKey: [true],
            outsideClick: [true],
            scroll: [false],
            resize: [false],
            orientationChange: [false],
            windowBlur: [false],
            windowFocus: [false],
            windowResize: [false],
            windowScroll: [false],
            windowOrientationChange: [false],
            windowVisibilityChange: [false],
            keyboardNavigation: [true],
            focusManagement: [true],
            ariaAttributes: [true],
            ariaLabel: ['', [Validators.maxLength(200)]],
            ariaDescribedBy: ['', [Validators.maxLength(200)]],
            ariaControls: ['', [Validators.maxLength(200)]]
        });
    }

    /**
     * Sets up form subscriptions
     */
    private setupFormSubscriptions(): void {
        this.configForm.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(value => {
                this.currentConfig = { ...value };
                this.validateConfig();
            });

        this.triggerForm.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(value => {
                this.currentTrigger = { ...value };
                this.validateTrigger();
            });
    }

    /**
     * Loads sample data
     */
    private loadSampleData(): void {
        this.currentConfig = {
            size: 'medium',
            position: 'bottom',
            showArrow: true,
            showClose: true,
            showHeader: false,
            showFooter: false,
            showBackdrop: false,
            disabled: false,
            autoFocus: true,
            restoreFocus: true,
            keyboardNavigation: true,
            escapeKeyClose: true,
            clickOutsideClose: true,
            hoverOpen: false,
            hoverClose: false,
            focusOpen: false,
            focusClose: false,
            scrollClose: false,
            resizeClose: false,
            animationDuration: 300,
            animationEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 1000,
            offsetX: 0,
            offsetY: 0
        };

        this.currentTrigger = {
            type: 'click',
            disabled: false,
            preventDefault: false,
            stopPropagation: false,
            delay: 0,
            closeDelay: 0,
            toggle: true,
            escapeKey: true,
            outsideClick: true,
            scroll: false,
            resize: false,
            orientationChange: false,
            windowBlur: false,
            windowFocus: false,
            windowResize: false,
            windowScroll: false,
            windowOrientationChange: false,
            windowVisibilityChange: false,
            keyboardNavigation: true,
            focusManagement: true,
            ariaAttributes: true,
            ariaExpanded: false,
            ariaHasPopup: true
        };

        this.popoverService.setConfig(this.currentConfig);
        this.popoverService.setTrigger(this.currentTrigger);
    }

    /**
     * Validates the configuration form
     */
    private validateConfig(): void {
        this.validationErrors = {};

        if (this.configForm.invalid) {
            Object.keys(this.configForm.controls).forEach(key => {
                const control = this.configForm.get(key);
                if (control && control.invalid && control.errors) {
                    this.validationErrors[key] = this.getErrorMessage(key, control.errors);
                }
            });
        }
    }

    /**
     * Validates the trigger form
     */
    private validateTrigger(): void {
        this.validationErrors = {};

        if (this.triggerForm.invalid) {
            Object.keys(this.triggerForm.controls).forEach(key => {
                const control = this.triggerForm.get(key);
                if (control && control.invalid && control.errors) {
                    this.validationErrors[key] = this.getErrorMessage(key, control.errors);
                }
            });
        }
    }

    /**
     * Gets error message for a form control
     * @param controlName The control name
     * @param errors The validation errors
     * @returns Error message
     */
    private getErrorMessage(controlName: string, errors: any): string {
        if (errors['required']) {
            return `${this.getFieldLabel(controlName)} is required`;
        }
        if (errors['minlength']) {
            return `${this.getFieldLabel(controlName)} must be at least ${errors['minlength'].requiredLength} characters`;
        }
        if (errors['maxlength']) {
            return `${this.getFieldLabel(controlName)} must not exceed ${errors['maxlength'].requiredLength} characters`;
        }
        if (errors['min']) {
            return `${this.getFieldLabel(controlName)} must be at least ${errors['min'].min}`;
        }
        if (errors['max']) {
            return `${this.getFieldLabel(controlName)} must not exceed ${errors['max'].max}`;
        }
        if (errors['pattern']) {
            return `${this.getFieldLabel(controlName)} has invalid format`;
        }
        return `${this.getFieldLabel(controlName)} is invalid`;
    }

    /**
     * Gets field label for error messages
     * @param controlName The control name
     * @returns Field label
     */
    private getFieldLabel(controlName: string): string {
        const labels: { [key: string]: string } = {
            size: 'Size',
            position: 'Position',
            width: 'Width',
            height: 'Height',
            minWidth: 'Min Width',
            maxWidth: 'Max Width',
            minHeight: 'Min Height',
            maxHeight: 'Max Height',
            offsetX: 'Offset X',
            offsetY: 'Offset Y',
            zIndex: 'Z-Index',
            animationDuration: 'Animation Duration',
            animationEasing: 'Animation Easing',
            headerTitle: 'Header Title',
            headerSubtitle: 'Header Subtitle',
            footerText: 'Footer Text',
            closeText: 'Close Text',
            closeIcon: 'Close Icon',
            arrowColor: 'Arrow Color',
            type: 'Trigger Type',
            delay: 'Delay',
            closeDelay: 'Close Delay',
            ariaLabel: 'ARIA Label',
            ariaDescribedBy: 'ARIA Described By',
            ariaControls: 'ARIA Controls'
        };
        return labels[controlName] || controlName;
    }

    /**
     * Handles form submission
     */
    onSubmit(): void {
        this.formSubmitted = true;
        this.showValidationErrors = true;

        if (this.configForm.valid && this.triggerForm.valid) {
            this.currentConfig = { ...this.configForm.value };
            this.currentTrigger = { ...this.triggerForm.value };
            this.popoverService.setConfig(this.currentConfig);
            this.popoverService.setTrigger(this.currentTrigger);

            this.notification.success('Success', 'Configuration updated successfully!', { duration: 3000 });
        } else {
            this.validateConfig();
            this.validateTrigger();
            this.notification.error('Error', 'Please fix the validation errors', { duration: 3000 });
        }
    }

    /**
     * Handles popover opened state change
     * @param opened Whether the popover is opened
     */
    onPopoverOpenedChange(opened: boolean): void {
        this.currentConfig.opened = opened;
        this.configForm.patchValue({ opened });
    }

    /**
     * Handles popover before open
     */
    onPopoverBeforeOpen(): void {
        this.notification.info('Info', 'Popover is about to open', { duration: 2000 });
    }

    /**
     * Handles popover after open
     */
    onPopoverAfterOpen(): void {
        this.notification.info('Info', 'Popover opened', { duration: 2000 });
    }

    /**
     * Handles popover before close
     */
    onPopoverBeforeClose(): void {
        this.notification.info('Info', 'Popover is about to close', { duration: 2000 });
    }

    /**
     * Handles popover after close
     */
    onPopoverAfterClose(): void {
        this.notification.info('Info', 'Popover closed', { duration: 2000 });
    }

    /**
     * Resets the configuration form
     */
    resetConfig(): void {
        this.configForm.reset({
            size: 'medium',
            position: 'bottom',
            width: '',
            height: '',
            minWidth: '',
            maxWidth: '',
            minHeight: '',
            maxHeight: '',
            offsetX: 0,
            offsetY: 0,
            zIndex: 1000,
            animationDuration: 300,
            animationEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            headerTitle: '',
            headerSubtitle: '',
            footerText: '',
            closeText: 'Close',
            closeIcon: 'close',
            arrowColor: '',
            showArrow: true,
            showClose: true,
            showHeader: false,
            showFooter: false,
            showBackdrop: false,
            showScrollbar: false,
            disabled: false,
            autoFocus: true,
            restoreFocus: true,
            keyboardNavigation: true,
            escapeKeyClose: true,
            clickOutsideClose: true,
            hoverOpen: false,
            hoverClose: false,
            focusOpen: false,
            focusClose: false,
            scrollClose: false,
            resizeClose: false
        });
        this.formSubmitted = false;
        this.showValidationErrors = false;
        this.validationErrors = {};
    }

    /**
     * Resets the trigger form
     */
    resetTrigger(): void {
        this.triggerForm.reset({
            type: 'click',
            disabled: false,
            preventDefault: false,
            stopPropagation: false,
            delay: 0,
            closeDelay: 0,
            toggle: true,
            escapeKey: true,
            outsideClick: true,
            scroll: false,
            resize: false,
            orientationChange: false,
            windowBlur: false,
            windowFocus: false,
            windowResize: false,
            windowScroll: false,
            windowOrientationChange: false,
            windowVisibilityChange: false,
            keyboardNavigation: true,
            focusManagement: true,
            ariaAttributes: true,
            ariaLabel: '',
            ariaDescribedBy: '',
            ariaControls: ''
        });
        this.formSubmitted = false;
        this.showValidationErrors = false;
        this.validationErrors = {};
    }

    /** Size options for select dropdown */
    readonly sizeOptions: { value: string; label: string }[] = [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' }
    ];

    /** Position options for select dropdown */
    readonly positionOptions: { value: string; label: string }[] = [
        { value: 'top', label: 'Top' },
        { value: 'bottom', label: 'Bottom' },
        { value: 'left', label: 'Left' },
        { value: 'right', label: 'Right' },
        { value: 'top-left', label: 'Top Left' },
        { value: 'top-right', label: 'Top Right' },
        { value: 'bottom-left', label: 'Bottom Left' },
        { value: 'bottom-right', label: 'Bottom Right' }
    ];

    /** Trigger type options for select dropdown */
    readonly triggerTypeOptions: { value: string; label: string }[] = [
        { value: 'click', label: 'Click' },
        { value: 'hover', label: 'Hover' },
        { value: 'focus', label: 'Focus' },
        { value: 'manual', label: 'Manual' }
    ];

    /** Animation easing options for select dropdown */
    readonly animationEasingOptions: { value: string; label: string }[] = [
        { value: 'cubic-bezier(0.4, 0, 0.2, 1)', label: 'Standard' },
        { value: 'cubic-bezier(0.25, 0.8, 0.25, 1)', label: 'Decelerated' },
        { value: 'cubic-bezier(0.4, 0, 1, 1)', label: 'Accelerated' },
        { value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', label: 'Sharp' },
        { value: 'ease', label: 'Ease' },
        { value: 'ease-in', label: 'Ease In' },
        { value: 'ease-out', label: 'Ease Out' },
        { value: 'ease-in-out', label: 'Ease In Out' },
        { value: 'linear', label: 'Linear' }
    ];

    /**
     * Checks if a form control has an error
     * @param controlName The control name
     * @returns Whether the control has an error
     */
    hasError(controlName: string): boolean {
        const control = this.configForm.get(controlName) || this.triggerForm.get(controlName);
        return !!(control && control.invalid && (control.dirty || control.touched || this.formSubmitted));
    }

    /**
     * Gets the error message for a form control
     * @param controlName The control name
     * @returns Error message
     */
    getError(controlName: string): string {
        return this.validationErrors[controlName] || '';
    }
}
