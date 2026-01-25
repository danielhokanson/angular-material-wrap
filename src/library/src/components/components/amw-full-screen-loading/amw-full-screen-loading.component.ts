import { Component, ViewEncapsulation, inject, Injector, OnInit, OnDestroy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmwFullScreenLoadingService, LoadingItem } from '../../../services/amw-full-screen-loading/amw-full-screen-loading.service';

/**
 * AMW Full Screen Loading Component
 *
 * Displays a full-screen loading overlay with multiple animated messages.
 * Each message is keyed to an observable and dismisses with a smooth animation
 * when the observable completes.
 *
 * Add this component once at the root of your application (e.g., in app.component.html):
 *
 * @example
 * ```html
 * <!-- In app.component.html -->
 * <router-outlet></router-outlet>
 * <amw-full-screen-loading></amw-full-screen-loading>
 * ```
 *
 * Then use the loading() operator in your services:
 *
 * @example
 * ```typescript
 * // In your component/service
 * import { loading } from '@angular-material-wrap';
 *
 * this.userService.getUser(id)
 *   .pipe(loading('Loading user profile...'))
 *   .subscribe(user => this.user = user);
 *
 * // Multiple simultaneous operations
 * this.dataService.fetchData()
 *   .pipe(loading('Fetching data...'))
 *   .subscribe();
 *
 * this.otherService.process()
 *   .pipe(loading('Processing...'))
 *   .subscribe();
 * ```
 *
 * Features:
 * - Smooth 300ms transitions for overlay appearance/disappearance
 * - Multiple messages can display simultaneously
 * - Messages dismiss with a slide-right + fade animation
 * - Centered spinner and message display
 * - Subtle pulse animation on the spinner
 */
@Component({
    selector: 'amw-full-screen-loading',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './amw-full-screen-loading.component.html',
    styleUrl: './amw-full-screen-loading.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class AmwFullScreenLoadingComponent implements OnInit, OnDestroy {
    private injector = inject(Injector);
    protected loadingService = inject(AmwFullScreenLoadingService);

    /** Computed signal for loading items */
    protected items = computed(() => this.loadingService.loadingItems());

    /** Computed signal for overlay visibility */
    protected isVisible = computed(() => this.loadingService.overlayVisible());

    /** Computed signal for whether loading is active (items exist) */
    protected isLoading = computed(() => this.loadingService.isLoading());

    ngOnInit(): void {
        // Register the injector globally for the loading() operator to use
        (globalThis as any).__amwFullScreenLoadingInjector = this.injector;
    }

    ngOnDestroy(): void {
        // Clean up global injector reference
        if ((globalThis as any).__amwFullScreenLoadingInjector === this.injector) {
            delete (globalThis as any).__amwFullScreenLoadingInjector;
        }
    }

    /**
     * Track by function for ngFor
     */
    trackByItem(index: number, item: LoadingItem): string {
        return item.id;
    }
}
