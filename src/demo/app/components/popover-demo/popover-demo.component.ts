import { Component, OnInit, OnDestroy } from '@angular/core';

import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AmwPopoverComponent } from '../../../../library/src/components/components/amw-popover/amw-popover.component';
import { PopoverConfig } from '../../../../library/src/components/components/amw-popover/interfaces/popover-config.interface';
import { PopoverTrigger } from '../../../../library/src/components/components/amw-popover/interfaces/popover-trigger.interface';
import { AmwPopoverService } from '../../../../library/src/components/services/amw-popover.service';
import { AmwSize } from '../../../../library/src/shared/types';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwSelectComponent } from '../../../../library/src/controls/components/amw-select/amw-select.component';
import { AmwSwitchComponent } from '../../../../library/src/controls/components/amw-switch/amw-switch.component';
import { AmwCardComponent, AmwIconComponent } from '../../../../library/src/components/components';

/**
 * Demo component for showcasing popover variations and configurations
 */
@Component({
    selector: 'app-popover-demo',
    standalone: true,
    imports: [
    ReactiveFormsModule,
    AmwPopoverComponent,
    AmwButtonComponent,
    AmwInputComponent,
    AmwSelectComponent,
    AmwSwitchComponent,
    AmwCardComponent,
    AmwIconComponent
],
    templateUrl: './popover-demo.component.html',
    styleUrl: './popover-demo.component.scss'
})
export class PopoverDemoComponent implements OnInit, OnDestroy {
    /** Subject for component destruction */
    private destroy$ = new Subject<void>();

    /** Form for popover configuration */
    configForm: FormGroup;

    /** Current popover configuration */
    currentConfig: PopoverConfig = { opened: false };

    /** Current popover trigger */
    currentTrigger: PopoverTrigger = {};

    /** Popover variations */
    popoverVariations = [
        {
            title: 'Basic Popover',
            description: 'Simple popover with click trigger and basic content',
            config: {
                size: 'medium' as AmwSize,
                position: 'bottom' as const,
                showArrow: true,
                showClose: true,
                showHeader: false,
                showFooter: false
            },
            trigger: {
                type: 'click' as const,
                toggle: true,
                escapeKey: true,
                outsideClick: true
            }
        },
        {
            title: 'Hover Popover',
            description: 'Popover that opens on hover with delay',
            config: {
                size: 'medium' as AmwSize,
                position: 'top' as const,
                showArrow: true,
                showClose: false,
                showHeader: false,
                showFooter: false
            },
            trigger: {
                type: 'hover' as const,
                delay: 300,
                closeDelay: 100
            }
        },
        {
            title: 'Focus Popover',
            description: 'Popover that opens on focus for accessibility',
            config: {
                size: 'small' as AmwSize,
                position: 'right' as const,
                showArrow: true,
                showClose: false,
                showHeader: false,
                showFooter: false
            },
            trigger: {
                type: 'focus' as const
            }
        },
        {
            title: 'Large Popover',
            description: 'Large popover with header and footer',
            config: {
                size: 'large' as AmwSize,
                position: 'bottom' as const,
                showArrow: true,
                showClose: true,
                showHeader: true,
                showFooter: true,
                headerTitle: 'Popover Title',
                headerSubtitle: 'This is a subtitle',
                footerText: 'Footer information'
            },
            trigger: {
                type: 'click' as const,
                toggle: true
            }
        },
        {
            title: 'No Arrow Popover',
            description: 'Popover without arrow for clean appearance',
            config: {
                size: 'medium' as AmwSize,
                position: 'left' as const,
                showArrow: false,
                showClose: true,
                showHeader: false,
                showFooter: false
            },
            trigger: {
                type: 'click' as const
            }
        },
        {
            title: 'Custom Width Popover',
            description: 'Popover with custom width and height',
            config: {
                width: '500px',
                height: '300px',
                position: 'bottom' as const,
                showArrow: true,
                showClose: true,
                showHeader: true,
                headerTitle: 'Custom Size',
                showFooter: false
            },
            trigger: {
                type: 'click' as const
            }
        },
        {
            title: 'Top Position Popover',
            description: 'Popover positioned above the trigger',
            config: {
                size: 'medium' as AmwSize,
                position: 'top' as const,
                showArrow: true,
                showClose: true,
                showHeader: false,
                showFooter: false
            },
            trigger: {
                type: 'click' as const
            }
        },
        {
            title: 'Left Position Popover',
            description: 'Popover positioned to the left of the trigger',
            config: {
                size: 'medium' as AmwSize,
                position: 'left' as const,
                showArrow: true,
                showClose: true,
                showHeader: false,
                showFooter: false
            },
            trigger: {
                type: 'click' as const
            }
        },
        {
            title: 'Right Position Popover',
            description: 'Popover positioned to the right of the trigger',
            config: {
                size: 'medium' as AmwSize,
                position: 'right' as const,
                showArrow: true,
                showClose: true,
                showHeader: false,
                showFooter: false
            },
            trigger: {
                type: 'click' as const
            }
        },
        {
            title: 'Corner Position Popover',
            description: 'Popover positioned in top-left corner',
            config: {
                size: 'medium' as AmwSize,
                position: 'top-left' as const,
                showArrow: true,
                showClose: true,
                showHeader: false,
                showFooter: false
            },
            trigger: {
                type: 'click' as const
            }
        },
        {
            title: 'Backdrop Popover',
            description: 'Popover with backdrop for modal-like behavior',
            config: {
                size: 'medium' as AmwSize,
                position: 'bottom' as const,
                showArrow: true,
                showClose: true,
                showBackdrop: true,
                showHeader: false,
                showFooter: false
            },
            trigger: {
                type: 'click' as const
            }
        },
        {
            title: 'Scrollable Popover',
            description: 'Popover with scrollable content and custom scrollbar',
            config: {
                size: 'medium' as AmwSize,
                position: 'bottom' as const,
                showArrow: true,
                showClose: true,
                showScrollbar: true,
                scrollbarClass: 'custom-scrollbar',
                showHeader: false,
                showFooter: false
            },
            trigger: {
                type: 'click' as const
            }
        }
    ];

    /** Selected variation */
    selectedVariation = this.popoverVariations[0];

    /** Whether to show configuration panel */
    showConfig = false;

    constructor(
        private fb: FormBuilder,
        private popoverService: AmwPopoverService,
        private notification: AmwNotificationService
    ) {
        this.configForm = this.createConfigForm();
    }

    ngOnInit(): void {
        this.setupFormSubscriptions();
        this.loadVariation(this.selectedVariation);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    /**
     * Creates the configuration form
     */
    private createConfigForm(): FormGroup {
        return this.fb.group({
            size: ['medium'],
            position: ['bottom'],
            width: [''],
            height: [''],
            minWidth: [''],
            maxWidth: [''],
            minHeight: [''],
            maxHeight: [''],
            showArrow: [true],
            showClose: [true],
            showHeader: [false],
            showFooter: [false],
            showBackdrop: [false],
            showScrollbar: [false],
            headerTitle: [''],
            headerSubtitle: [''],
            footerText: [''],
            closeText: ['Close'],
            closeIcon: ['close'],
            arrowSize: ['medium'],
            arrowColor: [''],
            offsetX: [0],
            offsetY: [0],
            zIndex: [1000],
            animationDuration: [300],
            animationEasing: ['cubic-bezier(0.4, 0, 0.2, 1)'],
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
     * Sets up form subscriptions
     */
    private setupFormSubscriptions(): void {
        this.configForm.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(value => {
                this.currentConfig = { ...value };
                this.popoverService.setConfig(this.currentConfig);
            });
    }

    /**
     * Loads a popover variation
     * @param variation The variation to load
     */
    loadVariation(variation: any): void {
        this.selectedVariation = variation;
        this.currentConfig = { ...variation.config };
        this.currentTrigger = { ...variation.trigger };
        this.configForm.patchValue(this.currentConfig);
        this.popoverService.setConfig(this.currentConfig);
        this.popoverService.setTrigger(this.currentTrigger);
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
     * Handles popover toggle
     * @param opened Whether the popover is opened
     */
    onPopoverToggle(opened: boolean): void {
        this.notification.info('Info', `Popover ${opened ? 'opened' : 'closed'}`, { duration: 2000 });
    }

    /**
     * Handles popover close
     */
    onPopoverClose(): void {
        this.notification.info('Info', 'Popover closed', { duration: 2000 });
    }

    /**
     * Toggles the configuration panel
     */
    toggleConfig(): void {
        this.showConfig = !this.showConfig;
    }

    /**
     * Resets the configuration to default
     */
    resetConfig(): void {
        this.configForm.patchValue({
            size: 'medium',
            position: 'bottom',
            width: '',
            height: '',
            minWidth: '',
            maxWidth: '',
            minHeight: '',
            maxHeight: '',
            showArrow: true,
            showClose: true,
            showHeader: false,
            showFooter: false,
            showBackdrop: false,
            showScrollbar: false,
            headerTitle: '',
            headerSubtitle: '',
            footerText: '',
            closeText: 'Close',
            closeIcon: 'close',
            arrowSize: 'medium',
            arrowColor: '',
            offsetX: 0,
            offsetY: 0,
            zIndex: 1000,
            animationDuration: 300,
            animationEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
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

    /** Arrow size options for select dropdown */
    readonly arrowSizeOptions: { value: string; label: string }[] = [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' }
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
}
