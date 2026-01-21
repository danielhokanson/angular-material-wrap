import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PopoverConfig } from '../components/amw-popover/interfaces/popover-config.interface';
import { PopoverTrigger } from '../components/amw-popover/interfaces/popover-trigger.interface';

/**
 * Service for managing popover state and behavior
 * 
 * Provides programmatic control over popover components, including opening/closing,
 * configuration management, and trigger handling.
 * 
 * @example
 * ```typescript
 * constructor(private popoverService: PopoverService) {}
 * 
 * // Open popover
 * this.popoverService.open();
 * 
 * // Close popover
 * this.popoverService.close();
 * 
 * // Toggle popover
 * this.popoverService.toggle();
 * 
 * // Set configuration
 * this.popoverService.setConfig(popoverConfig);
 * ```
 */
@Injectable({
    providedIn: 'root'
})
export class AmwPopoverService {
    /** Subject for popover opened state */
    private openedSubject = new BehaviorSubject<boolean>(false);

    /** Subject for popover configuration */
    private configSubject = new BehaviorSubject<PopoverConfig>({});

    /** Subject for popover trigger */
    private triggerSubject = new BehaviorSubject<PopoverTrigger>({});

    /** Subject for popover events */
    private eventsSubject = new Subject<AmwPopoverEvent>();

    /** Current popover configuration */
    private currentConfig: PopoverConfig = {};

    /** Current popover trigger */
    private currentTrigger: PopoverTrigger = {};

    /**
     * Observable for popover opened state
     */
    get opened$(): Observable<boolean> {
        return this.openedSubject.asObservable();
    }

    /**
     * Observable for popover configuration
     */
    get config$(): Observable<PopoverConfig> {
        return this.configSubject.asObservable();
    }

    /**
     * Observable for popover trigger
     */
    get trigger$(): Observable<PopoverTrigger> {
        return this.triggerSubject.asObservable();
    }

    /**
     * Observable for popover events
     */
    get events$(): Observable<AmwPopoverEvent> {
        return this.eventsSubject.asObservable();
    }

    /**
     * Current popover opened state
     */
    get opened(): boolean {
        return this.openedSubject.value;
    }

    /**
     * Current popover configuration
     */
    get config(): PopoverConfig {
        return this.currentConfig;
    }

    /**
     * Current popover trigger
     */
    get trigger(): PopoverTrigger {
        return this.currentTrigger;
    }

    /**
     * Opens the popover
     * @param config Optional configuration to apply
     */
    open(config?: Partial<PopoverConfig>): void {
        if (config) {
            this.updateConfig(config);
        }

        this.openedSubject.next(true);
        this.emitEvent('opened');
    }

    /**
     * Closes the popover
     */
    close(): void {
        this.openedSubject.next(false);
        this.emitEvent('closed');
    }

    /**
     * Toggles the popover open/closed state
     * @param config Optional configuration to apply
     */
    toggle(config?: Partial<PopoverConfig>): void {
        if (this.opened) {
            this.close();
        } else {
            this.open(config);
        }
    }

    /**
     * Sets the popover configuration
     * @param config The configuration to set
     */
    setConfig(config: PopoverConfig): void {
        this.currentConfig = { ...config };
        this.configSubject.next(this.currentConfig);
        this.emitEvent('configChanged', { config: this.currentConfig });
    }

    /**
     * Updates the popover configuration
     * @param config Partial configuration to update
     */
    updateConfig(config: Partial<PopoverConfig>): void {
        this.currentConfig = { ...this.currentConfig, ...config };
        this.configSubject.next(this.currentConfig);
        this.emitEvent('configChanged', { config: this.currentConfig });
    }

    /**
     * Sets the popover trigger
     * @param trigger The trigger to set
     */
    setTrigger(trigger: PopoverTrigger): void {
        this.currentTrigger = { ...trigger };
        this.triggerSubject.next(this.currentTrigger);
        this.emitEvent('triggerChanged', { trigger: this.currentTrigger });
    }

    /**
     * Updates the popover trigger
     * @param trigger Partial trigger to update
     */
    updateTrigger(trigger: Partial<PopoverTrigger>): void {
        this.currentTrigger = { ...this.currentTrigger, ...trigger };
        this.triggerSubject.next(this.currentTrigger);
        this.emitEvent('triggerChanged', { trigger: this.currentTrigger });
    }

    /**
     * Sets the popover position
     * @param position The position to set
     */
    setPosition(position: PopoverConfig['position']): void {
        this.updateConfig({ position });
    }

    /**
     * Sets the popover size
     * @param size The size to set
     */
    setSize(size: PopoverConfig['size']): void {
        this.updateConfig({ size });
    }

    /**
     * Sets the popover width
     * @param width The width to set
     */
    setWidth(width: string | number): void {
        this.updateConfig({ width });
    }

    /**
     * Sets the popover height
     * @param height The height to set
     */
    setHeight(height: string | number): void {
        this.updateConfig({ height });
    }

    /**
     * Sets the popover offset
     * @param offsetX The horizontal offset
     * @param offsetY The vertical offset
     */
    setOffset(offsetX: number, offsetY: number): void {
        this.updateConfig({ offsetX, offsetY });
    }

    /**
     * Sets the popover z-index
     * @param zIndex The z-index to set
     */
    setZIndex(zIndex: number): void {
        this.updateConfig({ zIndex });
    }

    /**
     * Enables or disables the popover
     * @param disabled Whether the popover is disabled
     */
    setDisabled(disabled: boolean): void {
        this.updateConfig({ disabled });
    }

    /**
     * Shows or hides the arrow
     * @param showArrow Whether to show the arrow
     */
    setShowArrow(showArrow: boolean): void {
        this.updateConfig({ showArrow });
    }

    /**
     * Shows or hides the close button
     * @param showClose Whether to show the close button
     */
    setShowClose(showClose: boolean): void {
        this.updateConfig({ showClose });
    }

    /**
     * Shows or hides the header
     * @param showHeader Whether to show the header
     */
    setShowHeader(showHeader: boolean): void {
        this.updateConfig({ showHeader });
    }

    /**
     * Shows or hides the footer
     * @param showFooter Whether to show the footer
     */
    setShowFooter(showFooter: boolean): void {
        this.updateConfig({ showFooter });
    }

    /**
     * Sets the header title
     * @param title The header title
     */
    setHeaderTitle(title: string): void {
        this.updateConfig({ headerTitle: title });
    }

    /**
     * Sets the header subtitle
     * @param subtitle The header subtitle
     */
    setHeaderSubtitle(subtitle: string): void {
        this.updateConfig({ headerSubtitle: subtitle });
    }

    /**
     * Sets the footer text
     * @param text The footer text
     */
    setFooterText(text: string): void {
        this.updateConfig({ footerText: text });
    }

    /**
     * Sets the close button text
     * @param text The close button text
     */
    setCloseButtonText(text: string): void {
        this.updateConfig({ closeText: text });
    }

    /**
     * Sets the close button icon
     * @param icon The close button icon
     */
    setCloseButtonIcon(icon: string): void {
        this.updateConfig({ closeIcon: icon });
    }

    /**
     * Sets the arrow size
     * @param size The arrow size
     */
    setArrowSize(size: PopoverConfig['arrowSize']): void {
        this.updateConfig({ arrowSize: size });
    }

    /**
     * Sets the arrow color
     * @param color The arrow color
     */
    setArrowColor(color: string): void {
        this.updateConfig({ arrowColor: color });
    }

    /**
     * Sets the animation duration
     * @param duration The animation duration in milliseconds
     */
    setAnimationDuration(duration: number): void {
        this.updateConfig({ animationDuration: duration });
    }

    /**
     * Sets the animation easing
     * @param easing The animation easing function
     */
    setAnimationEasing(easing: string): void {
        this.updateConfig({ animationEasing: easing });
    }

    /**
     * Enables or disables click outside to close
     * @param enabled Whether click outside to close is enabled
     */
    setClickOutsideClose(enabled: boolean): void {
        this.updateConfig({ clickOutsideClose: enabled });
    }

    /**
     * Enables or disables hover to open
     * @param enabled Whether hover to open is enabled
     */
    setHoverOpen(enabled: boolean): void {
        this.updateConfig({ hoverOpen: enabled });
    }

    /**
     * Enables or disables hover to close
     * @param enabled Whether hover to close is enabled
     */
    setHoverClose(enabled: boolean): void {
        this.updateConfig({ hoverClose: enabled });
    }

    /**
     * Sets the hover delay
     * @param delay The hover delay in milliseconds
     */
    setHoverDelay(delay: number): void {
        this.updateConfig({ hoverDelay: delay });
    }

    /**
     * Sets the hover close delay
     * @param delay The hover close delay in milliseconds
     */
    setHoverCloseDelay(delay: number): void {
        this.updateConfig({ hoverCloseDelay: delay });
    }

    /**
     * Enables or disables focus to open
     * @param enabled Whether focus to open is enabled
     */
    setFocusOpen(enabled: boolean): void {
        this.updateConfig({ focusOpen: enabled });
    }

    /**
     * Enables or disables focus to close
     * @param enabled Whether focus to close is enabled
     */
    setFocusClose(enabled: boolean): void {
        this.updateConfig({ focusClose: enabled });
    }

    /**
     * Enables or disables keyboard navigation
     * @param enabled Whether keyboard navigation is enabled
     */
    setKeyboardNavigation(enabled: boolean): void {
        this.updateConfig({ keyboardNavigation: enabled });
    }

    /**
     * Enables or disables escape key to close
     * @param enabled Whether escape key to close is enabled
     */
    setEscapeKeyClose(enabled: boolean): void {
        this.updateConfig({ escapeKeyClose: enabled });
    }

    /**
     * Enables or disables auto focus
     * @param enabled Whether auto focus is enabled
     */
    setAutoFocus(enabled: boolean): void {
        this.updateConfig({ autoFocus: enabled });
    }

    /**
     * Enables or disables restore focus
     * @param enabled Whether restore focus is enabled
     */
    setRestoreFocus(enabled: boolean): void {
        this.updateConfig({ restoreFocus: enabled });
    }

    /**
     * Enables or disables backdrop
     * @param enabled Whether backdrop is enabled
     */
    setShowBackdrop(enabled: boolean): void {
        this.updateConfig({ showBackdrop: enabled });
    }

    /**
     * Sets the backdrop class
     * @param className The backdrop class name
     */
    setBackdropClass(className: string): void {
        this.updateConfig({ backdropClass: className });
    }

    /**
     * Sets the panel class
     * @param className The panel class name
     */
    setPanelClass(className: string): void {
        this.updateConfig({ panelClass: className });
    }

    /**
     * Sets the scrollbar class
     * @param className The scrollbar class name
     */
    setScrollbarClass(className: string): void {
        this.updateConfig({ scrollbarClass: className });
    }

    /**
     * Resets the popover to default state
     */
    reset(): void {
        this.openedSubject.next(false);
        this.configSubject.next({});
        this.triggerSubject.next({});
        this.currentConfig = {};
        this.currentTrigger = {};
        this.emitEvent('reset');
    }

    /**
     * Emits a popover event
     * @param type The event type
     * @param data Optional event data
     */
    private emitEvent(type: string, data?: any): void {
        this.eventsSubject.next({ type, data, timestamp: new Date() });
    }
}

/**
 * Interface for popover events
 */
export interface AmwPopoverEvent {
    /** The event type */
    type: string;

    /** Optional event data */
    data?: any;

    /** Event timestamp */
    timestamp: Date;
}
