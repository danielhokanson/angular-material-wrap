import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CardConfig, CardVariant, CardElevation } from '../components/amw-card/interfaces';
import { AmwSize } from '../../shared/types/amw-size.type';

/**
 * Represents a card data object with all configurable properties
 */
export interface CardData {
    /** Unique identifier for the card */
    id: string;
    /** Card title text */
    title: string;
    /** Card subtitle text */
    subtitle?: string;
    /** Card content text */
    content: string;
    /** Image URL for the card */
    image?: string;
    /** Alt text for the card image */
    imageAlt?: string;
    /** Array of action buttons */
    actions?: Array<{
        /** Button label text */
        label: string;
        /** Material icon name */
        icon?: string;
        /** Button color theme */
        color?: 'primary' | 'accent' | 'warn';
        /** Whether button is disabled */
        disabled?: boolean;
        /** Action identifier for event handling */
        action?: string;
    }>;
    /** Card configuration object */
    config?: CardConfig;
    /** Card visual variant */
    variant?: CardVariant;
    /** Card size variant */
    size?: AmwSize;
    /** Card elevation level */
    elevation?: CardElevation;
    /** Whether card is clickable */
    clickable?: boolean;
    /** Whether card is disabled */
    disabled?: boolean;
    /** Whether card is in loading state */
    loading?: boolean;
    /** Whether to show header section */
    showHeader?: boolean;
    /** Whether to show content section */
    showContent?: boolean;
    /** Whether to show footer section */
    showFooter?: boolean;
    /** Whether to show actions section */
    showActions?: boolean;
    /** Footer content text */
    footerContent?: string;
    /** Height of the card image */
    imageHeight?: string;
    /** Position of the card image */
    imagePosition?: 'top' | 'bottom';
    /** Custom metadata for the card */
    metadata?: any;
    /** Card creation timestamp */
    createdAt?: Date;
    /** Card last update timestamp */
    updatedAt?: Date;
}

/**
 * Filter options for card queries
 */
export interface CardFilter {
    /** Search term to filter by title, subtitle, or content */
    search?: string;
    /** Filter by card variant */
    variant?: CardVariant;
    /** Filter by card size */
    size?: AmwSize;
    /** Filter by disabled state */
    disabled?: boolean;
    /** Filter by loading state */
    loading?: boolean;
    /** Filter by clickable state */
    clickable?: boolean;
    /** Filter by presence of image */
    hasImage?: boolean;
    /** Filter by presence of actions */
    hasActions?: boolean;
    /** Filter by tags */
    tags?: string[];
    /** Filter by date range */
    dateRange?: {
        /** Start date */
        start: Date;
        /** End date */
        end: Date;
    };
}

/**
 * Sort options for card queries
 */
export interface CardSort {
    /** Field to sort by */
    field: keyof CardData;
    /** Sort direction */
    direction: 'asc' | 'desc';
}

/**
 * Service for managing cards programmatically
 * 
 * Provides comprehensive card management including CRUD operations,
 * filtering, sorting, statistics, and data persistence.
 * 
 * @example
 * ```typescript
 * constructor(private cardService: CardService) {}
 * 
 * ngOnInit() {
 *   // Subscribe to cards
 *   this.cardService.cards$.subscribe(cards => {
 *     this.cards = cards;
 *   });
 * 
 *   // Add a new card
 *   this.cardService.addCard({
 *     title: 'New Card',
 *     content: 'Card content',
 *     variant: 'elevated',
 *     size: 'medium'
 *   });
 * 
 *   // Filter cards
 *   this.cardService.filterCards({ variant: 'elevated' });
 * }
 * ```
 */
@Injectable({
    providedIn: 'root'
})
export class CardService {
    private cardsSubject = new BehaviorSubject<CardData[]>([]);
    private filteredCardsSubject = new BehaviorSubject<CardData[]>([]);
    private currentFilter: CardFilter = {};
    private currentSort: CardSort = { field: 'createdAt', direction: 'desc' };

    public cards$ = this.cardsSubject.asObservable();
    public filteredCards$ = this.filteredCardsSubject.asObservable();

    constructor() {
        // Initialize with some sample cards
        this.initializeSampleCards();
    }

    /**
     * Gets all cards
     * 
     * @returns Array of all card data objects
     * 
     * @example
     * ```typescript
     * const allCards = this.cardService.getCards();
     * console.log(`Total cards: ${allCards.length}`);
     * ```
     */
    getCards(): CardData[] {
        return this.cardsSubject.value;
    }

    /**
     * Gets currently filtered cards
     * 
     * @returns Array of filtered card data objects
     * 
     * @example
     * ```typescript
     * const filteredCards = this.cardService.getFilteredCards();
     * console.log(`Filtered cards: ${filteredCards.length}`);
     * ```
     */
    getFilteredCards(): CardData[] {
        return this.filteredCardsSubject.value;
    }

    /**
     * Adds a new card to the collection
     * 
     * @param card - Card data without id, createdAt, and updatedAt (auto-generated)
     * @returns The created card with generated id and timestamps
     * 
     * @example
     * ```typescript
     * const newCard = this.cardService.addCard({
     *   title: 'New Card',
     *   content: 'This is a new card',
     *   variant: 'elevated',
     *   size: 'medium',
     *   clickable: true
     * });
     * console.log('Created card with ID:', newCard.id);
     * ```
     */
    addCard(card: Omit<CardData, 'id' | 'createdAt' | 'updatedAt'>): CardData {
        const newCard: CardData = {
            ...card,
            id: this.generateId(),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const cards = [...this.cardsSubject.value, newCard];
        this.cardsSubject.next(cards);
        this.applyFilters();
        return newCard;
    }

    /**
     * Updates an existing card
     * 
     * @param id - ID of the card to update
     * @param updates - Partial card data with properties to update
     * @returns Updated card data or null if card not found
     * 
     * @example
     * ```typescript
     * const updatedCard = this.cardService.updateCard('card_123', {
     *   title: 'Updated Title',
     *   loading: false
     * });
     * 
     * if (updatedCard) {
     *   console.log('Card updated successfully');
     * } else {
     *   console.log('Card not found');
     * }
     * ```
     */
    updateCard(id: string, updates: Partial<CardData>): CardData | null {
        const cards = this.cardsSubject.value;
        const index = cards.findIndex(card => card.id === id);

        if (index === -1) {
            return null;
        }

        const updatedCard = {
            ...cards[index],
            ...updates,
            id, // Ensure ID doesn't change
            updatedAt: new Date()
        };

        cards[index] = updatedCard;
        this.cardsSubject.next([...cards]);
        this.applyFilters();
        return updatedCard;
    }

    /**
     * Removes a card from the collection
     * 
     * @param id - ID of the card to remove
     * @returns True if card was removed, false if not found
     * 
     * @example
     * ```typescript
     * const removed = this.cardService.removeCard('card_123');
     * if (removed) {
     *   console.log('Card removed successfully');
     * } else {
     *   console.log('Card not found');
     * }
     * ```
     */
    removeCard(id: string): boolean {
        const cards = this.cardsSubject.value;
        const index = cards.findIndex(card => card.id === id);

        if (index === -1) {
            return false;
        }

        cards.splice(index, 1);
        this.cardsSubject.next([...cards]);
        this.applyFilters();
        return true;
    }

    /**
     * Gets a card by its ID
     * 
     * @param id - ID of the card to retrieve
     * @returns Card data or null if not found
     * 
     * @example
     * ```typescript
     * const card = this.cardService.getCardById('card_123');
     * if (card) {
     *   console.log('Found card:', card.title);
     * } else {
     *   console.log('Card not found');
     * }
     * ```
     */
    getCardById(id: string): CardData | null {
        return this.cardsSubject.value.find(card => card.id === id) || null;
    }

    /**
     * Applies filters to the card collection
     * 
     * @param filter - Filter options to apply
     * 
     * @example
     * ```typescript
     * // Filter by variant and search term
     * this.cardService.filterCards({
     *   variant: 'elevated',
     *   search: 'important'
     * });
     * 
     * // Filter by date range
     * this.cardService.filterCards({
     *   dateRange: {
     *     start: new Date('2024-01-01'),
     *     end: new Date('2024-12-31')
     *   }
     * });
     * ```
     */
    filterCards(filter: CardFilter): void {
        this.currentFilter = { ...this.currentFilter, ...filter };
        this.applyFilters();
    }

    /**
     * Clears all applied filters
     * 
     * @example
     * ```typescript
     * this.cardService.clearFilters();
     * // All cards will now be visible
     * ```
     */
    clearFilters(): void {
        this.currentFilter = {};
        this.applyFilters();
    }

    /**
     * Sorts cards by specified field and direction
     * 
     * @param sort - Sort configuration
     * 
     * @example
     * ```typescript
     * // Sort by title ascending
     * this.cardService.sortCards({
     *   field: 'title',
     *   direction: 'asc'
     * });
     * 
     * // Sort by creation date descending
     * this.cardService.sortCards({
     *   field: 'createdAt',
     *   direction: 'desc'
     * });
     * ```
     */
    sortCards(sort: CardSort): void {
        this.currentSort = sort;
        this.applyFilters();
    }

    /**
     * Searches cards by title, subtitle, or content
     * 
     * @param query - Search query string
     * 
     * @example
     * ```typescript
     * this.cardService.searchCards('important');
     * // Will show only cards containing 'important' in title, subtitle, or content
     * ```
     */
    searchCards(query: string): void {
        this.filterCards({ search: query });
    }

    /**
     * Get cards by variant
     */
    getCardsByVariant(variant: CardVariant): CardData[] {
        return this.cardsSubject.value.filter(card => card.variant === variant);
    }

    /**
     * Get cards by size
     */
    getCardsBySize(size: AmwSize): CardData[] {
        return this.cardsSubject.value.filter(card => card.size === size);
    }

    /**
     * Get clickable cards
     */
    getClickableCards(): CardData[] {
        return this.cardsSubject.value.filter(card => card.clickable);
    }

    /**
     * Get cards with images
     */
    getCardsWithImages(): CardData[] {
        return this.cardsSubject.value.filter(card => !!card.image);
    }

    /**
     * Get cards with actions
     */
    getCardsWithActions(): CardData[] {
        return this.cardsSubject.value.filter(card => card.actions && card.actions.length > 0);
    }

    /**
     * Duplicates an existing card
     * 
     * @param id - ID of the card to duplicate
     * @returns Duplicated card data or null if original not found
     * 
     * @example
     * ```typescript
     * const duplicatedCard = this.cardService.duplicateCard('card_123');
     * if (duplicatedCard) {
     *   console.log('Card duplicated with ID:', duplicatedCard.id);
     * }
     * ```
     */
    duplicateCard(id: string): CardData | null {
        const originalCard = this.getCardById(id);
        if (!originalCard) {
            return null;
        }

        const { id: originalId, createdAt, updatedAt, ...cardData } = originalCard;
        return this.addCard({
            ...cardData,
            title: `${cardData.title} (Copy)`
        });
    }

    /**
     * Bulk update cards
     */
    bulkUpdateCards(ids: string[], updates: Partial<CardData>): CardData[] {
        const cards = this.cardsSubject.value;
        const updatedCards: CardData[] = [];

        cards.forEach(card => {
            if (ids.includes(card.id)) {
                const updatedCard = {
                    ...card,
                    ...updates,
                    id: card.id, // Ensure ID doesn't change
                    updatedAt: new Date()
                };
                updatedCards.push(updatedCard);
            }
        });

        if (updatedCards.length > 0) {
            const newCards = cards.map(card => {
                const updated = updatedCards.find(uc => uc.id === card.id);
                return updated || card;
            });

            this.cardsSubject.next(newCards);
            this.applyFilters();
        }

        return updatedCards;
    }

    /**
     * Bulk delete cards
     */
    bulkDeleteCards(ids: string[]): number {
        const cards = this.cardsSubject.value;
        const filteredCards = cards.filter(card => !ids.includes(card.id));
        const deletedCount = cards.length - filteredCards.length;

        this.cardsSubject.next(filteredCards);
        this.applyFilters();

        return deletedCount;
    }

    /**
     * Exports all cards to JSON string
     * 
     * @returns JSON string representation of all cards
     * 
     * @example
     * ```typescript
     * const jsonData = this.cardService.exportCards();
     * // Save to file or send to server
     * ```
     */
    exportCards(): string {
        return JSON.stringify(this.cardsSubject.value, null, 2);
    }

    /**
     * Imports cards from JSON string
     * 
     * @param jsonData - JSON string containing card data
     * @returns Array of imported card data
     * 
     * @example
     * ```typescript
     * const importedCards = this.cardService.importCards(jsonString);
     * console.log(`Imported ${importedCards.length} cards`);
     * ```
     */
    importCards(jsonData: string): CardData[] {
        try {
            const importedCards = JSON.parse(jsonData);
            if (Array.isArray(importedCards)) {
                const validCards = importedCards.map(card => ({
                    ...card,
                    id: this.generateId(),
                    createdAt: new Date(),
                    updatedAt: new Date()
                }));

                const cards = [...this.cardsSubject.value, ...validCards];
                this.cardsSubject.next(cards);
                this.applyFilters();
                return validCards;
            }
        } catch (error) {
            console.error('Error importing cards:', error);
        }
        return [];
    }

    /**
     * Gets comprehensive statistics about the card collection
     * 
     * @returns Statistics object with counts and breakdowns
     * 
     * @example
     * ```typescript
     * const stats = this.cardService.getCardStatistics();
     * console.log(`Total cards: ${stats.total}`);
     * console.log(`Clickable cards: ${stats.clickable}`);
     * console.log(`Cards with images: ${stats.withImages}`);
     * ```
     */
    getCardStatistics(): {
        total: number;
        byVariant: Record<CardVariant, number>;
        bySize: Record<AmwSize, number>;
        clickable: number;
        withImages: number;
        withActions: number;
        disabled: number;
        loading: number;
    } {
        const cards = this.cardsSubject.value;

        const stats = {
            total: cards.length,
            byVariant: {} as Record<CardVariant, number>,
            bySize: {} as Record<AmwSize, number>,
            clickable: 0,
            withImages: 0,
            withActions: 0,
            disabled: 0,
            loading: 0
        };

        cards.forEach(card => {
            // Count by variant
            const variant = card.variant || 'elevated';
            stats.byVariant[variant] = (stats.byVariant[variant] || 0) + 1;

            // Count by size
            const size = card.size || 'medium';
            stats.bySize[size] = (stats.bySize[size] || 0) + 1;

            // Count other properties
            if (card.clickable) stats.clickable++;
            if (card.image) stats.withImages++;
            if (card.actions && card.actions.length > 0) stats.withActions++;
            if (card.disabled) stats.disabled++;
            if (card.loading) stats.loading++;
        });

        return stats;
    }

    private applyFilters(): void {
        let filteredCards = [...this.cardsSubject.value];

        // Apply search filter
        if (this.currentFilter.search) {
            const searchTerm = this.currentFilter.search.toLowerCase();
            filteredCards = filteredCards.filter(card =>
                card.title.toLowerCase().includes(searchTerm) ||
                card.subtitle?.toLowerCase().includes(searchTerm) ||
                card.content.toLowerCase().includes(searchTerm)
            );
        }

        // Apply variant filter
        if (this.currentFilter.variant) {
            filteredCards = filteredCards.filter(card => card.variant === this.currentFilter.variant);
        }

        // Apply size filter
        if (this.currentFilter.size) {
            filteredCards = filteredCards.filter(card => card.size === this.currentFilter.size);
        }

        // Apply boolean filters
        if (this.currentFilter.disabled !== undefined) {
            filteredCards = filteredCards.filter(card => card.disabled === this.currentFilter.disabled);
        }

        if (this.currentFilter.loading !== undefined) {
            filteredCards = filteredCards.filter(card => card.loading === this.currentFilter.loading);
        }

        if (this.currentFilter.clickable !== undefined) {
            filteredCards = filteredCards.filter(card => card.clickable === this.currentFilter.clickable);
        }

        if (this.currentFilter.hasImage !== undefined) {
            filteredCards = filteredCards.filter(card => !!card.image === this.currentFilter.hasImage);
        }

        if (this.currentFilter.hasActions !== undefined) {
            filteredCards = filteredCards.filter(card =>
                (card.actions && card.actions.length > 0) === this.currentFilter.hasActions
            );
        }

        // Apply date range filter
        if (this.currentFilter.dateRange) {
            const { start, end } = this.currentFilter.dateRange;
            filteredCards = filteredCards.filter(card => {
                const cardDate = card.createdAt || new Date();
                return cardDate >= start && cardDate <= end;
            });
        }

        // Apply sorting
        filteredCards.sort((a, b) => {
            const aValue = a[this.currentSort.field];
            const bValue = b[this.currentSort.field];

            if (aValue === bValue) return 0;

            const comparison = aValue < bValue ? -1 : 1;
            return this.currentSort.direction === 'asc' ? comparison : -comparison;
        });

        this.filteredCardsSubject.next(filteredCards);
    }

    private generateId(): string {
        return 'card_' + Math.random().toString(36).substr(2, 9);
    }

    private initializeSampleCards(): void {
        const sampleCards: CardData[] = [
            {
                id: 'card_1',
                title: 'Welcome Card',
                subtitle: 'Getting Started',
                content: 'This is a sample card to help you get started with the card service.',
                variant: 'elevated',
                size: 'medium',
                clickable: true,
                actions: [
                    { label: 'Learn More', icon: 'info', color: 'primary' },
                    { label: 'Get Started', icon: 'play_arrow', color: 'accent' }
                ],
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 'card_2',
                title: 'Image Card',
                subtitle: 'Visual Content',
                content: 'This card demonstrates image support with proper aspect ratios.',
                image: 'https://picsum.photos/400/200?random=1',
                imageAlt: 'Sample image',
                variant: 'outlined',
                size: 'large',
                clickable: true,
                actions: [
                    { label: 'View', icon: 'visibility', color: 'primary' }
                ],
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 'card_3',
                title: 'Loading Card',
                subtitle: 'Processing',
                content: 'This card is currently in a loading state.',
                variant: 'filled',
                size: 'small',
                loading: true,
                disabled: true,
                actions: [
                    { label: 'Cancel', icon: 'cancel', color: 'warn', disabled: true }
                ],
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];

        this.cardsSubject.next(sampleCards);
        this.applyFilters();
    }
}
