import { Component, OnInit, OnDestroy } from '@angular/core';

import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AmwSidenavComponent } from '../../../../library/src/components/components/amw-sidenav/amw-sidenav.component';
import { SidenavConfig } from '../../../../library/src/components/components/amw-sidenav/interfaces/sidenav-config.interface';
import { SidenavItem } from '../../../../library/src/components/components/amw-sidenav/interfaces/sidenav-item.interface';
import { SidenavService } from '../../../../library/src/components/services/sidenav.service';
import { AmwSize } from '../../../../library/src/shared/types';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwSelectComponent } from '../../../../library/src/controls/components/amw-select/amw-select.component';
import { AmwSwitchComponent } from '../../../../library/src/controls/components/amw-switch/amw-switch.component';
import { AmwCardComponent } from '../../../../library/src/components/components';

/**
 * Validation demo component for sidenav
 *
 * Demonstrates form validation and error handling for sidenav configuration
 */
@Component({
    selector: 'app-sidenav-validation',
    standalone: true,
    imports: [
    ReactiveFormsModule,
    AmwSidenavComponent,
    AmwButtonComponent,
    AmwInputComponent,
    AmwSelectComponent,
    AmwSwitchComponent,
    AmwCardComponent
],
    templateUrl: './sidenav-validation.component.html',
    styleUrl: './sidenav-validation.component.scss'
})
export class SidenavValidationComponent implements OnInit, OnDestroy {
    /** Subject for component destruction */
    private destroy$ = new Subject<void>();

    /** Form for sidenav configuration validation */
    configForm: FormGroup;

    /** Form for navigation item validation */
    itemForm: FormGroup;

    /** Current sidenav configuration */
    currentConfig: SidenavConfig = { opened: false };

    /** Navigation items */
    navigationItems: SidenavItem[] = [];

    /** Form validation errors */
    validationErrors: { [key: string]: string } = {};

    /** Whether the form has been submitted */
    formSubmitted = false;

    /** Whether to show validation errors */
    showValidationErrors = false;

    constructor(
        private fb: FormBuilder,
        private sidenavService: SidenavService,
        private notification: AmwNotificationService
    ) {
        this.configForm = this.createConfigForm();
        this.itemForm = this.createItemForm();
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
            mode: ['side', [Validators.required]],
            size: ['medium', [Validators.required]],
            position: ['start', [Validators.required]],
            width: ['', [Validators.pattern(/^\d+(px|%|rem|em|vw|vh)?$/)]],
            minWidth: ['', [Validators.pattern(/^\d+(px|%|rem|em|vw|vh)?$/)]],
            maxWidth: ['', [Validators.pattern(/^\d+(px|%|rem|em|vw|vh)?$/)]],
            opened: [true],
            showToggle: [true],
            showClose: [true],
            showBackdrop: [true],
            disableClose: [false],
            fixedInViewport: [false],
            autoFocus: [true],
            restoreFocus: [true],
            responsive: [true],
            disabled: [false]
        });
    }

    /**
     * Creates the item form with validation
     */
    private createItemForm(): FormGroup {
        return this.fb.group({
            id: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            label: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
            icon: ['', [Validators.pattern(/^[a-zA-Z_][a-zA-Z0-9_]*$/)]],
            route: ['', [Validators.pattern(/^\/[a-zA-Z0-9\/\-_]*$/)]],
            href: ['', [Validators.pattern(/^https?:\/\/.+/)]],
            tooltip: ['', [Validators.maxLength(200)]],
            badge: ['', [Validators.maxLength(10)]],
            badgeColor: ['primary', [Validators.pattern(/^(primary|accent|warn|basic)$/)]],
            disabled: [false]
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

        this.itemForm.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.validateItem();
            });
    }

    /**
     * Loads sample data
     */
    private loadSampleData(): void {
        this.navigationItems = [
            {
                id: 'dashboard',
                label: 'Dashboard',
                icon: 'dashboard',
                route: '/dashboard',
                tooltip: 'View dashboard overview'
            },
            {
                id: 'users',
                label: 'Users',
                icon: 'people',
                route: '/users',
                tooltip: 'Manage users',
                children: [
                    {
                        id: 'users-list',
                        label: 'All Users',
                        icon: 'list',
                        route: '/users/list',
                        tooltip: 'View all users'
                    },
                    {
                        id: 'users-add',
                        label: 'Add User',
                        icon: 'person_add',
                        route: '/users/add',
                        tooltip: 'Add new user'
                    }
                ]
            },
            {
                id: 'settings',
                label: 'Settings',
                icon: 'settings',
                route: '/settings',
                tooltip: 'Application settings'
            }
        ];

        this.sidenavService.setItems(this.navigationItems);
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
     * Validates the item form
     */
    private validateItem(): void {
        this.validationErrors = {};

        if (this.itemForm.invalid) {
            Object.keys(this.itemForm.controls).forEach(key => {
                const control = this.itemForm.get(key);
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
            mode: 'Mode',
            size: 'Size',
            position: 'Position',
            width: 'Width',
            minWidth: 'Min Width',
            maxWidth: 'Max Width',
            id: 'ID',
            label: 'Label',
            icon: 'Icon',
            route: 'Route',
            href: 'URL',
            tooltip: 'Tooltip',
            badge: 'Badge',
            badgeColor: 'Badge Color'
        };
        return labels[controlName] || controlName;
    }

    /**
     * Handles form submission
     */
    onSubmit(): void {
        this.formSubmitted = true;
        this.showValidationErrors = true;

        if (this.configForm.valid) {
            this.currentConfig = { ...this.configForm.value };
            this.sidenavService.setConfig(this.currentConfig);

            this.notification.success('Success', 'Configuration updated successfully!', { duration: 3000 });
        } else {
            this.validateConfig();
            this.notification.error('Error', 'Please fix the validation errors', { duration: 3000 });
        }
    }

    /**
     * Handles item form submission
     */
    onItemSubmit(): void {
        this.formSubmitted = true;
        this.showValidationErrors = true;

        if (this.itemForm.valid) {
            const newItem: SidenavItem = { ...this.itemForm.value };
            this.navigationItems.push(newItem);
            this.sidenavService.setItems(this.navigationItems);

            this.notification.success('Success', 'Navigation item added successfully!', { duration: 3000 });

            this.itemForm.reset();
        } else {
            this.validateItem();
            this.notification.error('Error', 'Please fix the validation errors', { duration: 3000 });
        }
    }

    /**
     * Handles sidenav opened state change
     * @param opened Whether the sidenav is opened
     */
    onSidenavOpenedChange(opened: boolean): void {
        this.currentConfig.opened = opened;
        this.configForm.patchValue({ opened });
    }

    /**
     * Handles navigation item click
     * @param item The clicked item
     */
    onItemClick(item: SidenavItem): void {
        this.notification.info('Info', `Clicked: ${item.label}`, { duration: 2000 });
    }

    /**
     * Resets the configuration form
     */
    resetConfig(): void {
        this.configForm.reset({
            mode: 'side',
            size: 'medium',
            position: 'start',
            width: '',
            minWidth: '',
            maxWidth: '',
            opened: true,
            showToggle: true,
            showClose: true,
            showBackdrop: true,
            disableClose: false,
            fixedInViewport: false,
            autoFocus: true,
            restoreFocus: true,
            responsive: true,
            disabled: false
        });
        this.formSubmitted = false;
        this.showValidationErrors = false;
        this.validationErrors = {};
    }

    /**
     * Resets the item form
     */
    resetItem(): void {
        this.itemForm.reset();
        this.formSubmitted = false;
        this.showValidationErrors = false;
        this.validationErrors = {};
    }

    /** Size options for select dropdown */
    readonly sizeOptions = [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' }
    ];

    /** Mode options for select dropdown */
    readonly modeOptions = [
        { value: 'over', label: 'Over' },
        { value: 'push', label: 'Push' },
        { value: 'side', label: 'Side' }
    ];

    /** Position options for select dropdown */
    readonly positionOptions = [
        { value: 'start', label: 'Start' },
        { value: 'end', label: 'End' }
    ];

    /** Badge color options for select dropdown */
    readonly badgeColorOptions = [
        { value: 'primary', label: 'Primary' },
        { value: 'accent', label: 'Accent' },
        { value: 'warn', label: 'Warn' },
        { value: 'basic', label: 'Basic' }
    ];

    /**
     * Checks if a form control has an error
     * @param controlName The control name
     * @returns Whether the control has an error
     */
    hasError(controlName: string): boolean {
        const control = this.configForm.get(controlName) || this.itemForm.get(controlName);
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
