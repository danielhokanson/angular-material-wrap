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
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AmwSidenavComponent } from '../../../../library/src/components/components/amw-sidenav/amw-sidenav.component';
import { SidenavConfig } from '../../../../library/src/components/components/amw-sidenav/interfaces/sidenav-config.interface';
import { SidenavItem } from '../../../../library/src/components/components/amw-sidenav/interfaces/sidenav-item.interface';
import { SidenavService } from '../../../../library/src/components/services/sidenav.service';
import { AmwSize } from '../../../../library/src/shared/types';

/**
 * Demo component for showcasing sidenav variations and configurations
 */
@Component({
    selector: 'app-sidenav-demo',
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
        MatBadgeModule,
        MatTooltipModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        AmwSidenavComponent
    ],
    templateUrl: './sidenav-demo.component.html',
    styleUrl: './sidenav-demo.component.scss'
})
export class SidenavDemoComponent implements OnInit, OnDestroy {
    /** Subject for component destruction */
    private destroy$ = new Subject<void>();

    /** Form for sidenav configuration */
    configForm: FormGroup;

    /** Current sidenav configuration */
    currentConfig: SidenavConfig = { opened: false, showToggle: false, showClose: false };

    /** Sample navigation items */
    sampleItems: SidenavItem[] = [
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
                },
                {
                    id: 'users-roles',
                    label: 'User Roles',
                    icon: 'admin_panel_settings',
                    route: '/users/roles',
                    tooltip: 'Manage user roles'
                }
            ]
        },
        {
            id: 'products',
            label: 'Products',
            icon: 'inventory',
            route: '/products',
            tooltip: 'Manage products',
            children: [
                {
                    id: 'products-list',
                    label: 'All Products',
                    icon: 'inventory_2',
                    route: '/products/list',
                    tooltip: 'View all products'
                },
                {
                    id: 'products-add',
                    label: 'Add Product',
                    icon: 'add_box',
                    route: '/products/add',
                    tooltip: 'Add new product'
                },
                {
                    id: 'products-categories',
                    label: 'Categories',
                    icon: 'category',
                    route: '/products/categories',
                    tooltip: 'Manage categories'
                }
            ]
        },
        {
            id: 'orders',
            label: 'Orders',
            icon: 'shopping_cart',
            route: '/orders',
            tooltip: 'Manage orders',
            badge: '5',
            badgeColor: 'warn'
        },
        {
            id: 'analytics',
            label: 'Analytics',
            icon: 'analytics',
            route: '/analytics',
            tooltip: 'View analytics',
            disabled: true
        },
        {
            id: 'settings',
            label: 'Settings',
            icon: 'settings',
            route: '/settings',
            tooltip: 'Application settings'
        },
        {
            id: 'help',
            label: 'Help & Support',
            icon: 'help',
            href: 'https://help.example.com',
            tooltip: 'Get help and support'
        }
    ];

    /** Sidenav variations */
    sidenavVariations = [
        {
            title: 'Basic Sidenav',
            description: 'Simple sidenav with basic navigation items',
            config: {
                mode: 'side' as const,
                opened: true,
                size: 'medium' as AmwSize,
                showToggle: true,
                showClose: true
            },
            items: this.sampleItems.slice(0, 4)
        },
        {
            title: 'Overlay Sidenav',
            description: 'Sidenav that overlays the main content',
            config: {
                mode: 'over' as const,
                opened: false,
                size: 'medium' as AmwSize,
                showToggle: true,
                showClose: true,
                showBackdrop: true
            },
            items: this.sampleItems.slice(0, 5)
        },
        {
            title: 'Push Sidenav',
            description: 'Sidenav that pushes the main content',
            config: {
                mode: 'push' as const,
                opened: true,
                size: 'large' as AmwSize,
                showToggle: true,
                showClose: true
            },
            items: this.sampleItems
        },
        {
            title: 'Small Sidenav',
            description: 'Compact sidenav with small size',
            config: {
                mode: 'side' as const,
                opened: true,
                size: 'small' as AmwSize,
                showToggle: true,
                showClose: true
            },
            items: this.sampleItems.slice(0, 3)
        },
        {
            title: 'Large Sidenav',
            description: 'Spacious sidenav with large size',
            config: {
                mode: 'side' as const,
                opened: true,
                size: 'large' as AmwSize,
                showToggle: true,
                showClose: true
            },
            items: this.sampleItems
        },
        {
            title: 'End Position Sidenav',
            description: 'Sidenav positioned on the right side',
            config: {
                mode: 'side' as const,
                opened: true,
                size: 'medium' as AmwSize,
                position: 'end' as const,
                showToggle: true,
                showClose: true
            },
            items: this.sampleItems.slice(0, 4)
        },
        {
            title: 'No Toggle Button',
            description: 'Sidenav without toggle button',
            config: {
                mode: 'side' as const,
                opened: true,
                size: 'medium' as AmwSize,
                showToggle: false,
                showClose: true
            },
            items: this.sampleItems.slice(0, 4)
        },
        {
            title: 'No Close Button',
            description: 'Sidenav without close button',
            config: {
                mode: 'side' as const,
                opened: true,
                size: 'medium' as AmwSize,
                showToggle: true,
                showClose: false
            },
            items: this.sampleItems.slice(0, 4)
        },
        {
            title: 'Custom Width',
            description: 'Sidenav with custom width',
            config: {
                mode: 'side' as const,
                opened: true,
                width: '400px',
                showToggle: true,
                showClose: true
            },
            items: this.sampleItems
        },
        {
            title: 'Responsive Sidenav',
            description: 'Sidenav that adapts to screen size',
            config: {
                mode: 'side' as const,
                opened: true,
                size: 'medium' as AmwSize,
                responsive: true,
                showToggle: true,
                showClose: true
            },
            items: this.sampleItems
        },
        {
            title: 'Nested Navigation',
            description: 'Sidenav with nested navigation items',
            config: {
                mode: 'side' as const,
                opened: true,
                size: 'medium' as AmwSize,
                showToggle: true,
                showClose: true
            },
            items: this.sampleItems
        },
        {
            title: 'With Badges',
            description: 'Sidenav with badge indicators',
            config: {
                mode: 'side' as const,
                opened: true,
                size: 'medium' as AmwSize,
                showToggle: true,
                showClose: true
            },
            items: [
                ...this.sampleItems.slice(0, 3),
                {
                    id: 'notifications',
                    label: 'Notifications',
                    icon: 'notifications',
                    route: '/notifications',
                    tooltip: 'View notifications',
                    badge: '12',
                    badgeColor: 'primary'
                },
                {
                    id: 'messages',
                    label: 'Messages',
                    icon: 'message',
                    route: '/messages',
                    tooltip: 'View messages',
                    badge: '3',
                    badgeColor: 'accent'
                }
            ]
        }
    ];

    /** Selected variation */
    selectedVariation = this.sidenavVariations[0];

    /** Whether to show configuration panel */
    showConfig = false;

    constructor(
        private fb: FormBuilder,
        private sidenavService: SidenavService,
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
            mode: ['side'],
            opened: [true],
            size: ['medium'],
            position: ['start'],
            width: [''],
            minWidth: [''],
            maxWidth: [''],
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
     * Sets up form subscriptions
     */
    private setupFormSubscriptions(): void {
        this.configForm.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(value => {
                this.currentConfig = { ...value };
                this.sidenavService.setConfig(this.currentConfig);
            });
    }

    /**
     * Loads a sidenav variation
     * @param variation The variation to load
     */
    loadVariation(variation: any): void {
        this.selectedVariation = variation;
        this.currentConfig = { ...variation.config };
        this.configForm.patchValue(this.currentConfig);
        this.sidenavService.setConfig(this.currentConfig);
        this.sidenavService.setItems(variation.items);
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
        this.snackBar.open(`Clicked: ${item.label}`, 'Close', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
        });
    }

    /**
     * Handles sidenav toggle
     * @param opened Whether the sidenav is opened
     */
    onSidenavToggle(opened: boolean): void {
        this.snackBar.open(`Sidenav ${opened ? 'opened' : 'closed'}`, 'Close', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
        });
    }

    /**
     * Handles sidenav close
     */
    onSidenavClose(): void {
        this.snackBar.open('Sidenav closed', 'Close', {
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
            mode: 'side',
            opened: true,
            size: 'medium',
            position: 'start',
            width: '',
            minWidth: '',
            maxWidth: '',
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
}
