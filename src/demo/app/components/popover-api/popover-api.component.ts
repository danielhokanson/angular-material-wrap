import { Component, OnInit, OnDestroy } from '@angular/core';
import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { Subject, takeUntil } from 'rxjs';
import { AmwPopoverComponent } from '../../../../library/src/components/components/amw-popover/amw-popover.component';
import { PopoverConfig } from '../../../../library/src/components/components/amw-popover/interfaces/popover-config.interface';
import { PopoverTrigger } from '../../../../library/src/components/components/amw-popover/interfaces/popover-trigger.interface';
import { PopoverService } from '../../../../library/src/components/services/popover.service';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwTabsComponent, AmwTabComponent, AmwIconComponent } from '../../../../library/src/components/components';
import { TabItem } from '../../../../library/src/components/components/amw-tabs/interfaces';

interface PopoverApiDocumentation {
    component: any;
    service: any;
    interfaces: {
        PopoverConfig: any;
        PopoverTrigger: any;
    };
}

/**
 * API demo component for popover
 *
 * Shows API documentation and usage examples for the popover component
 */
@Component({
    selector: 'app-popover-api',
    standalone: true,
    imports: [
        AmwPopoverComponent,
        AmwTabsComponent,
        AmwTabComponent,
        AmwButtonComponent,
        AmwIconComponent
],
    templateUrl: './popover-api.component.html',
    styleUrl: './popover-api.component.scss'
})
export class PopoverApiComponent implements OnInit, OnDestroy {
    /** Subject for component destruction */
    private destroy$ = new Subject<void>();

    /** Current popover configuration */
    currentConfig: PopoverConfig = { opened: false };

    /** Current popover trigger */
    currentTrigger: PopoverTrigger = {};

    /** Tab indices */
    selectedApiTab: number = 0;
    selectedInterfaceTab: number = 0;

    /** Tab items for API documentation */
    apiTabs: TabItem[] = [
        { label: 'Component', content: '' },
        { label: 'Interfaces', content: '' },
        { label: 'Service', content: '' },
        { label: 'Examples', content: '' }
    ];

    /** Tab items for interfaces */
    interfaceTabs: TabItem[] = [
        { label: 'PopoverConfig', content: '' },
        { label: 'PopoverTrigger', content: '' }
    ];

    /** API documentation */
    apiDocumentation: PopoverApiDocumentation = {
        component: {
            name: 'AmwPopoverComponent',
            selector: 'amw-popover',
            description: 'A flexible popover component that provides positioning, triggering, and content management with comprehensive configuration options and accessibility support.',
            inputs: [
                {
                    name: 'config',
                    type: 'PopoverConfig',
                    description: 'Configuration object for the popover',
                    required: false,
                    default: '{}'
                },
                {
                    name: 'trigger',
                    type: 'PopoverTrigger',
                    description: 'Trigger configuration for the popover',
                    required: false,
                    default: '{}'
                },
                {
                    name: 'opened',
                    type: 'boolean',
                    description: 'Whether the popover is opened',
                    required: false,
                    default: 'false'
                },
                {
                    name: 'triggerTemplate',
                    type: 'TemplateRef<any>',
                    description: 'Custom trigger template',
                    required: false,
                    default: 'undefined'
                },
                {
                    name: 'contentTemplate',
                    type: 'TemplateRef<any>',
                    description: 'Custom content template',
                    required: false,
                    default: 'undefined'
                },
                {
                    name: 'headerTemplate',
                    type: 'TemplateRef<any>',
                    description: 'Custom header template',
                    required: false,
                    default: 'undefined'
                },
                {
                    name: 'footerTemplate',
                    type: 'TemplateRef<any>',
                    description: 'Custom footer template',
                    required: false,
                    default: 'undefined'
                }
            ],
            outputs: [
                {
                    name: 'openedChange',
                    type: 'EventEmitter<boolean>',
                    description: 'Event emitted when popover opened state changes'
                },
                {
                    name: 'beforeOpen',
                    type: 'EventEmitter<void>',
                    description: 'Event emitted before popover opens'
                },
                {
                    name: 'afterOpen',
                    type: 'EventEmitter<void>',
                    description: 'Event emitted after popover opens'
                },
                {
                    name: 'beforeClose',
                    type: 'EventEmitter<void>',
                    description: 'Event emitted before popover closes'
                },
                {
                    name: 'afterClose',
                    type: 'EventEmitter<void>',
                    description: 'Event emitted after popover closes'
                },
                {
                    name: 'toggle',
                    type: 'EventEmitter<boolean>',
                    description: 'Event emitted when popover is toggled'
                },
                {
                    name: 'close',
                    type: 'EventEmitter<void>',
                    description: 'Event emitted when popover is closed'
                }
            ]
        },
        interfaces: {
            PopoverConfig: {
                description: 'Configuration interface for amw-popover component',
                properties: [
                    {
                        name: 'opened',
                        type: 'boolean',
                        description: 'Whether the popover is opened',
                        required: false
                    },
                    {
                        name: 'size',
                        type: 'AmwSize',
                        description: 'The size of the popover',
                        required: false,
                        values: ['small', 'medium', 'large']
                    },
                    {
                        name: 'position',
                        type: 'string',
                        description: 'The position of the popover',
                        required: false,
                        values: ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right']
                    },
                    {
                        name: 'width',
                        type: 'string | number',
                        description: 'The width of the popover',
                        required: false
                    },
                    {
                        name: 'height',
                        type: 'string | number',
                        description: 'The height of the popover',
                        required: false
                    },
                    {
                        name: 'showArrow',
                        type: 'boolean',
                        description: 'Whether to show the arrow',
                        required: false,
                        default: 'true'
                    },
                    {
                        name: 'showClose',
                        type: 'boolean',
                        description: 'Whether to show the close button',
                        required: false,
                        default: 'true'
                    },
                    {
                        name: 'showHeader',
                        type: 'boolean',
                        description: 'Whether to show the header',
                        required: false,
                        default: 'false'
                    },
                    {
                        name: 'showFooter',
                        type: 'boolean',
                        description: 'Whether to show the footer',
                        required: false,
                        default: 'false'
                    },
                    {
                        name: 'headerTitle',
                        type: 'string',
                        description: 'The header title',
                        required: false
                    },
                    {
                        name: 'headerSubtitle',
                        type: 'string',
                        description: 'The header subtitle',
                        required: false
                    },
                    {
                        name: 'footerText',
                        type: 'string',
                        description: 'The footer text',
                        required: false
                    },
                    {
                        name: 'closeText',
                        type: 'string',
                        description: 'The close button text',
                        required: false,
                        default: 'Close'
                    },
                    {
                        name: 'closeIcon',
                        type: 'string',
                        description: 'The close button icon',
                        required: false,
                        default: 'close'
                    },
                    {
                        name: 'arrowSize',
                        type: 'string',
                        description: 'The arrow size',
                        required: false,
                        values: ['small', 'medium', 'large']
                    },
                    {
                        name: 'arrowColor',
                        type: 'string',
                        description: 'The arrow color',
                        required: false
                    },
                    {
                        name: 'offsetX',
                        type: 'number',
                        description: 'The horizontal offset from the trigger',
                        required: false,
                        default: '0'
                    },
                    {
                        name: 'offsetY',
                        type: 'number',
                        description: 'The vertical offset from the trigger',
                        required: false,
                        default: '0'
                    },
                    {
                        name: 'zIndex',
                        type: 'number',
                        description: 'The z-index of the popover',
                        required: false,
                        default: '1000'
                    },
                    {
                        name: 'disabled',
                        type: 'boolean',
                        description: 'Whether the popover is disabled',
                        required: false,
                        default: 'false'
                    },
                    {
                        name: 'autoFocus',
                        type: 'boolean',
                        description: 'Whether the popover is auto focus',
                        required: false,
                        default: 'true'
                    },
                    {
                        name: 'restoreFocus',
                        type: 'boolean',
                        description: 'Whether to restore focus to the previously focused element',
                        required: false,
                        default: 'true'
                    },
                    {
                        name: 'keyboardNavigation',
                        type: 'boolean',
                        description: 'Whether to enable keyboard navigation',
                        required: false,
                        default: 'true'
                    },
                    {
                        name: 'escapeKeyClose',
                        type: 'boolean',
                        description: 'Whether to enable escape key to close',
                        required: false,
                        default: 'true'
                    },
                    {
                        name: 'clickOutsideClose',
                        type: 'boolean',
                        description: 'Whether to enable click outside to close',
                        required: false,
                        default: 'true'
                    },
                    {
                        name: 'hoverOpen',
                        type: 'boolean',
                        description: 'Whether to enable hover to open',
                        required: false,
                        default: 'false'
                    },
                    {
                        name: 'hoverClose',
                        type: 'boolean',
                        description: 'Whether to enable hover to close',
                        required: false,
                        default: 'false'
                    },
                    {
                        name: 'focusOpen',
                        type: 'boolean',
                        description: 'Whether to enable focus to open',
                        required: false,
                        default: 'false'
                    },
                    {
                        name: 'focusClose',
                        type: 'boolean',
                        description: 'Whether to enable focus to close',
                        required: false,
                        default: 'false'
                    },
                    {
                        name: 'animationDuration',
                        type: 'number',
                        description: 'The animation duration in milliseconds',
                        required: false,
                        default: '300'
                    },
                    {
                        name: 'animationEasing',
                        type: 'string',
                        description: 'The animation easing function',
                        required: false,
                        default: 'cubic-bezier(0.4, 0, 0.2, 1)'
                    }
                ]
            },
            PopoverTrigger: {
                description: 'Interface for popover trigger configuration',
                properties: [
                    {
                        name: 'type',
                        type: 'string',
                        description: 'The type of trigger',
                        required: false,
                        values: ['click', 'hover', 'focus', 'manual']
                    },
                    {
                        name: 'disabled',
                        type: 'boolean',
                        description: 'Whether the trigger is disabled',
                        required: false,
                        default: 'false'
                    },
                    {
                        name: 'delay',
                        type: 'number',
                        description: 'The trigger delay in milliseconds',
                        required: false,
                        default: '0'
                    },
                    {
                        name: 'closeDelay',
                        type: 'number',
                        description: 'The trigger close delay in milliseconds',
                        required: false,
                        default: '0'
                    },
                    {
                        name: 'toggle',
                        type: 'boolean',
                        description: 'Whether to toggle on trigger',
                        required: false,
                        default: 'true'
                    },
                    {
                        name: 'escapeKey',
                        type: 'boolean',
                        description: 'Whether to close on escape key',
                        required: false,
                        default: 'true'
                    },
                    {
                        name: 'outsideClick',
                        type: 'boolean',
                        description: 'Whether to close on outside click',
                        required: false,
                        default: 'true'
                    },
                    {
                        name: 'keyboardNavigation',
                        type: 'boolean',
                        description: 'Whether to enable keyboard navigation',
                        required: false,
                        default: 'true'
                    },
                    {
                        name: 'focusManagement',
                        type: 'boolean',
                        description: 'Whether to enable focus management',
                        required: false,
                        default: 'true'
                    },
                    {
                        name: 'ariaAttributes',
                        type: 'boolean',
                        description: 'Whether to enable aria attributes',
                        required: false,
                        default: 'true'
                    },
                    {
                        name: 'ariaLabel',
                        type: 'string',
                        description: 'The aria label for the trigger',
                        required: false
                    },
                    {
                        name: 'ariaDescribedBy',
                        type: 'string',
                        description: 'The aria described by for the trigger',
                        required: false
                    },
                    {
                        name: 'ariaControls',
                        type: 'string',
                        description: 'The aria controls for the trigger',
                        required: false
                    },
                    {
                        name: 'ariaExpanded',
                        type: 'boolean',
                        description: 'The aria expanded state',
                        required: false,
                        default: 'false'
                    },
                    {
                        name: 'ariaHasPopup',
                        type: 'boolean',
                        description: 'The aria has popup for the trigger',
                        required: false,
                        default: 'true'
                    }
                ]
            }
        },
        service: {
            name: 'PopoverService',
            description: 'Service for managing popover state and behavior',
            methods: [
                {
                    name: 'open',
                    parameters: 'config?: Partial<PopoverConfig>',
                    description: 'Opens the popover',
                    returnType: 'void'
                },
                {
                    name: 'close',
                    parameters: '',
                    description: 'Closes the popover',
                    returnType: 'void'
                },
                {
                    name: 'toggle',
                    parameters: 'config?: Partial<PopoverConfig>',
                    description: 'Toggles the popover open/closed state',
                    returnType: 'void'
                },
                {
                    name: 'setConfig',
                    parameters: 'config: PopoverConfig',
                    description: 'Sets the popover configuration',
                    returnType: 'void'
                },
                {
                    name: 'updateConfig',
                    parameters: 'config: Partial<PopoverConfig>',
                    description: 'Updates the popover configuration',
                    returnType: 'void'
                },
                {
                    name: 'setTrigger',
                    parameters: 'trigger: PopoverTrigger',
                    description: 'Sets the popover trigger',
                    returnType: 'void'
                },
                {
                    name: 'updateTrigger',
                    parameters: 'trigger: Partial<PopoverTrigger>',
                    description: 'Updates the popover trigger',
                    returnType: 'void'
                },
                {
                    name: 'setPosition',
                    parameters: 'position: PopoverConfig[\'position\']',
                    description: 'Sets the popover position',
                    returnType: 'void'
                },
                {
                    name: 'setSize',
                    parameters: 'size: PopoverConfig[\'size\']',
                    description: 'Sets the popover size',
                    returnType: 'void'
                },
                {
                    name: 'setWidth',
                    parameters: 'width: string | number',
                    description: 'Sets the popover width',
                    returnType: 'void'
                },
                {
                    name: 'setHeight',
                    parameters: 'height: string | number',
                    description: 'Sets the popover height',
                    returnType: 'void'
                },
                {
                    name: 'setOffset',
                    parameters: 'offsetX: number, offsetY: number',
                    description: 'Sets the popover offset',
                    returnType: 'void'
                },
                {
                    name: 'setZIndex',
                    parameters: 'zIndex: number',
                    description: 'Sets the popover z-index',
                    returnType: 'void'
                },
                {
                    name: 'setDisabled',
                    parameters: 'disabled: boolean',
                    description: 'Enables or disables the popover',
                    returnType: 'void'
                },
                {
                    name: 'reset',
                    parameters: '',
                    description: 'Resets the popover to default state',
                    returnType: 'void'
                }
            ],
            observables: [
                {
                    name: 'opened$',
                    type: 'Observable<boolean>',
                    description: 'Observable for popover opened state'
                },
                {
                    name: 'config$',
                    type: 'Observable<PopoverConfig>',
                    description: 'Observable for popover configuration'
                },
                {
                    name: 'trigger$',
                    type: 'Observable<PopoverTrigger>',
                    description: 'Observable for popover trigger'
                },
                {
                    name: 'events$',
                    type: 'Observable<PopoverEvent>',
                    description: 'Observable for popover events'
                }
            ]
        }
    };

    constructor(
        private popoverService: PopoverService,
        private notification: AmwNotificationService
    ) { }

    ngOnInit(): void {
        this.loadDefaultConfig();
        this.setupServiceSubscriptions();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    /**
     * Loads default configuration
     */
    private loadDefaultConfig(): void {
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
     * Sets up service subscriptions
     */
    private setupServiceSubscriptions(): void {
        this.popoverService.events$
            .pipe(takeUntil(this.destroy$))
            .subscribe(event => {
                this.notification.info('Info', `Popover event: ${event.type}`, { duration: 2000 });
            });
    }

    /**
     * Handles popover opened state change
     * @param opened Whether the popover is opened
     */
    onPopoverOpenedChange(opened: boolean): void {
        this.currentConfig.opened = opened;
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
     * Tests service methods
     */
    testServiceMethods(): void {
        this.popoverService.open();
        setTimeout(() => this.popoverService.close(), 2000);
    }

    /**
     * Tests configuration updates
     */
    testConfigUpdates(): void {
        this.popoverService.setPosition('top');
        this.popoverService.setSize('large');
        this.popoverService.setShowHeader(true);
        this.popoverService.setHeaderTitle('API Demo');
        this.popoverService.setHeaderSubtitle('Testing configuration updates');
    }

    /**
     * Tests trigger updates
     */
    testTriggerUpdates(): void {
        this.popoverService.setTrigger({
            type: 'hover',
            delay: 500,
            closeDelay: 200
        });
    }

    /**
     * Resets configuration
     */
    resetConfiguration(): void {
        this.popoverService.reset();
        this.loadDefaultConfig();
    }

    /**
     * Copies code to clipboard
     * @param code The code to copy
     * @param type The type of code
     */
    copyCode(code: string, type: string): void {
        navigator.clipboard.writeText(code).then(() => {
            this.notification.info('Info', `${type} code copied to clipboard`, { duration: 2000 });
        });
    }

    /**
     * Gets the syntax highlighting class for code blocks
     * @param type The type of code
     * @returns CSS class name
     */
    getSyntaxClass(type: string): string {
        switch (type) {
            case 'html':
                return 'language-html';
            case 'typescript':
                return 'language-typescript';
            case 'scss':
                return 'language-scss';
            default:
                return 'language-text';
        }
    }

    /**
     * Gets basic usage HTML example
     * @returns HTML code
     */
    getBasicUsageHtml(): string {
        return `<amw-popover
  [config]="popoverConfig"
  [trigger]="popoverTrigger"
  [opened]="true"
  (openedChange)="onPopoverToggle($event)">
  <ng-template #trigger>
    <amw-button variant="text">Click me</amw-button>
  </ng-template>
  <ng-template #content>
    <div>Popover content</div>
  </ng-template>
</amw-popover>`;
    }

    /**
     * Gets basic usage TypeScript example
     * @returns TypeScript code
     */
    getBasicUsageTypescript(): string {
        return `import { Component, OnInit } from '@angular/core';
import { AmwPopoverComponent } from '@angular-material-wrap/components';
import { PopoverConfig, PopoverTrigger } from '@angular-material-wrap/components';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';
import { MatTabsModule } from '@angular/material/tabs';

@Componentimport { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-example',
  template: \`<!-- HTML template above -->\`
})
export class ExampleComponent {
  popoverConfig: PopoverConfig = {
    size: 'medium',
    position: 'bottom',
    showArrow: true,
    showClose: true,
    showHeader: false,
    showFooter: false
  };

  popoverTrigger: PopoverTrigger = {
    type: 'click',
    toggle: true,
    escapeKey: true,
    outsideClick: true
  };

  onPopoverToggle(opened: boolean): void {
    console.log('Popover opened:', opened);
  }
}`;
    }

    /**
     * Gets service usage example
     * @returns TypeScript code
     */
    getServiceUsage(): string {
        return `import { Component, OnInit, OnDestroy } from '@angular/core';
import { PopoverService } from '@angular-material-wrap/components';
import { Subject, takeUntil } from 'rxjs';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';
import { MatTabsModule } from '@angular/material/tabs';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
@Componentimport { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-service-example',
  template: \`<!-- HTML template -->\`
})
export class ServiceExampleComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private popoverService: PopoverService) {}

  ngOnInit(): void {
    // Listen to popover events
    this.popoverService.events$
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        console.log('Popover event:', event);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openPopover(): void {
    this.popoverService.open({
      size: 'medium',
      position: 'bottom',
      showArrow: true,
      showClose: true
    });
  }

  closePopover(): void {
    this.popoverService.close();
  }

  togglePopover(): void {
    this.popoverService.toggle();
  }
}`;
    }
}
