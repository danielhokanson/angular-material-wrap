import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AmwCardComponent } from '../../../../library/src/components/components/amw-card/amw-card.component';
import { CardService, CardData, CardFilter, CardSort } from '../../../../library/src/components/services/card.service';
import { CardConfig, CardVariant, CardElevation } from '../../../../library/src/components/components/amw-card/interfaces';
import { AmwSize } from '../../../../library/src/shared/types';
import { Subscription } from 'rxjs';

@Component({
    selector: 'amw-demo-card',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        AmwCardComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './card-demo.component.html',
    styleUrl: './card-demo.component.scss'
})
export class CardDemoComponent implements OnInit, OnDestroy {
    cards: CardData[] = [];
    filteredCards: CardData[] = [];
    searchTerm = '';
    selectedVariant: CardVariant | '' = '';
    selectedSize: AmwSize | '' = '';
    showClickableOnly = false;
    showWithImagesOnly = false;
    showWithActionsOnly = false;
    sortField: keyof CardData = 'createdAt';
    sortDirection: 'asc' | 'desc' = 'desc';
    isLoading = false;
    private subscription = new Subscription();

    constructor(
        private cardService: CardService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        // Subscribe to cards
        this.subscription.add(
            this.cardService.cards$.subscribe(cards => {
                this.cards = cards;
            })
        );

        // Subscribe to filtered cards
        this.subscription.add(
            this.cardService.filteredCards$.subscribe(filteredCards => {
                this.filteredCards = filteredCards;
            })
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    // Service methods
    onSearch() {
        this.cardService.searchCards(this.searchTerm);
    }

    onFilterChange() {
        const filter: CardFilter = {};

        if (this.selectedVariant) filter.variant = this.selectedVariant;
        if (this.selectedSize) filter.size = this.selectedSize;
        if (this.showClickableOnly) filter.clickable = true;
        if (this.showWithImagesOnly) filter.hasImage = true;
        if (this.showWithActionsOnly) filter.hasActions = true;

        this.cardService.filterCards(filter);
    }

    onSortChange() {
        this.cardService.sortCards({
            field: this.sortField,
            direction: this.sortDirection
        });
    }

    clearFilters() {
        this.searchTerm = '';
        this.selectedVariant = '';
        this.selectedSize = '';
        this.showClickableOnly = false;
        this.showWithImagesOnly = false;
        this.showWithActionsOnly = false;
        this.cardService.clearFilters();
    }

    addSampleCard() {
        const sampleCard = this.cardService.addCard({
            title: 'New Sample Card',
            subtitle: 'Created via service',
            content: 'This card was created using the CardService.',
            variant: 'elevated',
            size: 'medium',
            clickable: true,
            actions: [
                { label: 'Edit', icon: 'edit', color: 'primary' as const },
                { label: 'Delete', icon: 'delete', color: 'warn' as const }
            ]
        });

        this.snackBar.open(`Card "${sampleCard.title}" added successfully!`, 'Close', {
            duration: 3000
        });
    }

    duplicateCard(card: CardData) {
        const duplicatedCard = this.cardService.duplicateCard(card.id);
        if (duplicatedCard) {
            this.snackBar.open(`Card "${duplicatedCard.title}" duplicated!`, 'Close', {
                duration: 3000
            });
        }
    }

    deleteCard(card: CardData) {
        if (this.cardService.removeCard(card.id)) {
            this.snackBar.open(`Card "${card.title}" deleted!`, 'Close', {
                duration: 3000
            });
        }
    }

    toggleCardLoading(card: CardData) {
        this.cardService.updateCard(card.id, {
            loading: !card.loading
        });
    }

    toggleCardDisabled(card: CardData) {
        this.cardService.updateCard(card.id, {
            disabled: !card.disabled
        });
    }

    getCardStatistics() {
        const stats = this.cardService.getCardStatistics();
        this.snackBar.open(
            `Total: ${stats.total} | Clickable: ${stats.clickable} | With Images: ${stats.withImages} | With Actions: ${stats.withActions}`,
            'Close',
            { duration: 5000 }
        );
    }

    exportCards() {
        const jsonData = this.cardService.exportCards();
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'cards-export.json';
        link.click();
        window.URL.revokeObjectURL(url);

        this.snackBar.open('Cards exported successfully!', 'Close', {
            duration: 3000
        });
    }

    cardVariations = [
        {
            title: 'Basic Card',
            description: 'Simple card with title and content',
            card: {
                headerTitle: 'Card Title',
                headerSubtitle: 'Card subtitle',
                content: 'This is a basic card with title, subtitle, and content.',
                actions: [
                    { label: 'Action 1', icon: 'favorite' },
                    { label: 'Action 2', icon: 'share' }
                ]
            }
        },
        {
            title: 'Card with Image',
            description: 'Card with header image and content',
            card: {
                headerTitle: 'Beautiful Landscape',
                headerSubtitle: 'Nature Photography',
                image: 'https://picsum.photos/400/200?random=1',
                imageAlt: 'Beautiful landscape',
                content: 'This card features a beautiful landscape image with descriptive content.',
                actions: [
                    { label: 'View', icon: 'visibility' },
                    { label: 'Download', icon: 'download' }
                ]
            }
        },
        {
            title: 'Card with Avatar',
            description: 'Card with user avatar and information',
            card: {
                headerTitle: 'John Doe',
                headerSubtitle: 'Software Engineer',
                headerIcon: 'person',
                content: 'Experienced software engineer with expertise in Angular, TypeScript, and modern web technologies.',
                actions: [
                    { label: 'Contact', icon: 'email', color: 'primary' as const },
                    { label: 'Profile', icon: 'person' }
                ]
            }
        },
        {
            title: 'Clickable Card',
            description: 'Interactive card that responds to clicks',
            card: {
                headerTitle: 'Interactive Card',
                headerSubtitle: 'Click me!',
                content: 'This card is clickable and will respond to user interactions.',
                clickable: true,
                actions: [
                    { label: 'Learn More', icon: 'info' }
                ]
            }
        },
        {
            title: 'Outlined Card',
            description: 'Card with outlined style instead of elevation',
            card: {
                headerTitle: 'Outlined Style',
                headerSubtitle: 'Clean and minimal',
                content: 'This card uses an outlined style for a clean, minimal appearance.',
                variant: 'outlined' as CardVariant,
                actions: [
                    { label: 'Action', icon: 'settings' }
                ]
            }
        },
        {
            title: 'Filled Card',
            description: 'Card with filled background',
            card: {
                headerTitle: 'Filled Background',
                headerSubtitle: 'Surface variant',
                content: 'This card uses a filled background for a different visual style.',
                variant: 'filled' as CardVariant,
                actions: [
                    { label: 'Action', icon: 'star' }
                ]
            }
        },
        {
            title: 'Small Card',
            description: 'Compact card variant',
            card: {
                headerTitle: 'Small Card',
                headerSubtitle: 'Compact size',
                content: 'This is a small, compact card.',
                size: 'small' as AmwSize,
                actions: [
                    { label: 'Action', icon: 'more_vert' }
                ]
            }
        },
        {
            title: 'Large Card',
            description: 'Larger card variant',
            card: {
                headerTitle: 'Large Card',
                headerSubtitle: 'Spacious design',
                content: 'This is a large card with more space for content and better readability.',
                size: 'large' as AmwSize,
                actions: [
                    { label: 'Primary Action', icon: 'check_circle', color: 'primary' as const },
                    { label: 'Secondary Action', icon: 'cancel' }
                ]
            }
        },
        {
            title: 'High Elevation',
            description: 'Card with high elevation shadow',
            card: {
                headerTitle: 'Elevated Card',
                headerSubtitle: 'High elevation',
                content: 'This card has a high elevation for a prominent appearance.',
                elevation: 4 as CardElevation,
                actions: [
                    { label: 'Action', icon: 'launch' }
                ]
            }
        },
        {
            title: 'Loading State',
            description: 'Card in loading state',
            card: {
                headerTitle: 'Loading Card',
                headerSubtitle: 'Please wait...',
                content: 'This card is currently loading.',
                loading: true,
                actions: [
                    { label: 'Action', icon: 'refresh' }
                ]
            }
        },
        {
            title: 'Disabled Card',
            description: 'Disabled card state',
            card: {
                headerTitle: 'Disabled Card',
                headerSubtitle: 'Not available',
                content: 'This card is disabled and cannot be interacted with.',
                disabled: true,
                actions: [
                    { label: 'Action', icon: 'block' }
                ]
            }
        },
        {
            title: 'Primary Theme',
            description: 'Card with primary theme colors',
            card: {
                headerTitle: 'Primary Theme',
                headerSubtitle: 'Brand colors',
                content: 'This card uses the primary theme colors for a branded appearance.',
                config: { theme: 'primary' } as CardConfig,
                actions: [
                    { label: 'Action', icon: 'favorite', color: 'accent' as const }
                ]
            }
        }
    ];

    onCardClick() {
        console.log('Card clicked!');
    }

    onActionClick(event: { action: any; index: number }) {
        console.log('Action clicked:', event);
    }

    onHeaderClick() {
        console.log('Header clicked!');
    }

    onImageClick() {
        console.log('Image clicked!');
    }
}
