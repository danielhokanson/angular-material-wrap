import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AmwPopoverComponent } from '../../../../library/src/components/components/amw-popover/amw-popover.component';
import { PopoverConfig } from '../../../../library/src/components/components/amw-popover/interfaces/popover-config.interface';
import { PopoverTrigger } from '../../../../library/src/components/components/amw-popover/interfaces/popover-trigger.interface';
import { PopoverService } from '../../../../library/src/components/services/popover.service';
import { AmwSize } from '../../../../library/src/shared/types';

/**
 * Demo component for showcasing popover variations and configurations
 */
@Component({
    selector: 'app-popover-demo',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatDividerModule,
        MatFormFieldModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatInputModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        AmwPopoverComponent
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
        private popoverService: PopoverService,
        private snackBar: MatSnackBar
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
        this.snackBar.open('Popover is about to open', 'Close', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
        });
    }

    /**
     * Handles popover after open
     */
    onPopoverAfterOpen(): void {
        this.snackBar.open('Popover opened', 'Close', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
        });
    }

    /**
     * Handles popover before close
     */
    onPopoverBeforeClose(): void {
        this.snackBar.open('Popover is about to close', 'Close', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
        });
    }

    /**
     * Handles popover after close
     */
    onPopoverAfterClose(): void {
        this.snackBar.open('Popover closed', 'Close', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
        });
    }

    /**
     * Handles popover toggle
     * @param opened Whether the popover is opened
     */
    onPopoverToggle(opened: boolean): void {
        this.snackBar.open(`Popover ${opened ? 'opened' : 'closed'}`, 'Close', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
        });
    }

    /**
     * Handles popover close
     */
    onPopoverClose(): void {
        this.snackBar.open('Popover closed', 'Close', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
        });
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

    /**
     * Gets the size options
     */
    get sizeOptions() {
        return [
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' }
        ];
    }

    /**
     * Gets the position options
     */
    get positionOptions() {
        return [
            { value: 'top', label: 'Top' },
            { value: 'bottom', label: 'Bottom' },
            { value: 'left', label: 'Left' },
            { value: 'right', label: 'Right' },
            { value: 'top-left', label: 'Top Left' },
            { value: 'top-right', label: 'Top Right' },
            { value: 'bottom-left', label: 'Bottom Left' },
            { value: 'bottom-right', label: 'Bottom Right' }
        ];
    }

    /**
     * Gets the arrow size options
     */
    get arrowSizeOptions() {
        return [
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' }
        ];
    }

    /**
     * Gets the animation easing options
     */
    get animationEasingOptions() {
        return [
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
}
