import { Component, Input, Output, EventEmitter, ViewEncapsulation, forwardRef, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { BaseComponent } from '../../../controls/components/base/base.component';
import { CardConfig, CardVariant, CardElevation } from './interfaces';
import { AmwSize } from '../../../shared/types/amw-size.type';
import { AmwProgressSpinnerComponent } from '../amw-progress-spinner/amw-progress-spinner.component';
import { AmwButtonComponent } from '../../../controls/components/amw-button/amw-button.component';

/**
 * Angular Material Wrap Card Component
 * 
 * A comprehensive card component that wraps Angular Material's mat-card
 * with additional features and Material 3 theming support.
 * 
 * @example
 * ```html
 * <amw-card
 *   headerTitle="Card Title"
 *   headerSubtitle="Card subtitle"
 *   content="This is the card content"
 *   [actions]="cardActions"
 *   [clickable]="true"
 *   [variant]="'elevated'"
 *   [size]="'medium'"
 *   (cardClick)="onCardClick()"
 *   (actionClick)="onActionClick($event)">
 * </amw-card>
 * ```
 * 
 * @example
 * ```typescript
 * export class MyComponent {
 *   cardActions = [
 *     { label: 'Edit', icon: 'edit', color: 'primary' },
 *     { label: 'Delete', icon: 'delete', color: 'warn' }
 *   ];
 * 
 *   onCardClick() {
 *     console.log('Card clicked!');
 *   }
 * 
 *   onActionClick(event: { action: any; index: number }) {
 *     console.log('Action clicked:', event.action.label);
 *   }
 * }
 * ```
 */
@Component({
    selector: 'amw-card',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        AmwButtonComponent,
        MatIconModule,
        MatRippleModule,
        AmwProgressSpinnerComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-card.component.html',
    styleUrl: './amw-card.component.scss',
    providers: [
        {
            provide: forwardRef(() => AmwCardComponent),
            multi: true
        }
    ]
})
export class AmwCardComponent extends BaseComponent {
    /** Card configuration object */
    @Input() config: CardConfig = {};
    /** Visual variant of the card */
    @Input() variant: CardVariant = 'elevated';
    /** Size variant of the card */
    @Input() size: AmwSize = 'medium';
    /** Elevation level for shadow */
    @Input() elevation: CardElevation = 1;
    /** Whether the card is clickable */
    @Input() clickable = false;
    /** Whether the card is disabled */
    @Input() override disabled = false;
    /** Whether the card is in loading state */
    @Input() loading = false;
    /** Title text for the card header */
    @Input() headerTitle = '';
    /** Subtitle text for the card header */
    @Input() headerSubtitle = '';
    /** Material icon name for the header */
    @Input() headerIcon = '';
    /** Image URL for the header avatar */
    @Input() headerImage = '';
    /** Text content for the card body */
    @Input() content = '';
    /** Array of action buttons */
    @Input() actions: { label: string; icon?: string; color?: 'primary' | 'accent' | 'warn'; disabled?: boolean }[] = [];
    /** Whether to show action buttons */
    @Input() showActions = true;
    /** Whether to show the header */
    @Input() showHeader = true;
    /** Whether to show the content */
    @Input() showContent = true;
    /** Whether to show the footer */
    @Input() showFooter = false;
    /** Text content for the card footer */
    @Input() footerContent = '';
    /** Image URL for the card image */
    @Input() image = '';
    /** Alt text for the card image */
    @Input() imageAlt = '';
    /** Height of the card image */
    @Input() imageHeight = '200px';
    /** Position of the card image */
    @Input() imagePosition: 'top' | 'bottom' = 'top';

    /** Emitted when the card is clicked */
    @Output() cardClick = new EventEmitter<void>();
    /** Emitted when an action button is clicked */
    @Output() actionClick = new EventEmitter<{ action: any; index: number }>();
    /** Emitted when the header is clicked */
    @Output() headerClick = new EventEmitter<void>();
    /** Emitted when the image is clicked */
    @Output() imageClick = new EventEmitter<void>();

    @ContentChild('cardHeader') headerTemplate?: TemplateRef<any>;
    @ContentChild('cardContent') contentTemplate?: TemplateRef<any>;
    @ContentChild('cardActions') actionsTemplate?: TemplateRef<any>;
    @ContentChild('cardFooter') footerTemplate?: TemplateRef<any>;

    /**
     * Handles card click events
     * 
     * Only emits if card is clickable, not disabled, and not loading
     */
    onCardClick() {
        if (!this.disabled && !this.loading && this.clickable) {
            this.cardClick.emit();
        }
    }

    /**
     * Handles action button click events
     * 
     * @param action - The action object that was clicked
     * @param index - The index of the action in the actions array
     */
    onActionClick(action: any, index: number, event?: Event) {
        if (!action.disabled && !this.disabled && !this.loading) {
            this.actionClick.emit({ action, index });
        }
    }

    onHeaderClick() {
        if (!this.disabled && !this.loading) {
            this.headerClick.emit();
        }
    }

    onImageClick() {
        if (!this.disabled && !this.loading) {
            this.imageClick.emit();
        }
    }

    get cardClasses(): string {
        const classes = ['amw-card'];

        if (this.variant) classes.push(`amw-card--${this.variant}`);
        if (this.size) classes.push(`amw-card--${this.size}`);
        if (this.clickable) classes.push('amw-card--clickable');
        if (this.disabled) classes.push('amw-card--disabled');
        if (this.loading) classes.push('amw-card--loading');
        if (this.config.class) classes.push(this.config.class);

        return classes.join(' ');
    }

    get cardStyles(): { [key: string]: string } {
        const styles: { [key: string]: string } = {};

        if (this.elevation) {
            styles['--amw-card-elevation'] = `var(--mdc-elevation-level${this.elevation})`;
        }

        if (this.config.style) {
            Object.assign(styles, this.config.style);
        }

        return styles;
    }

    get hasImage(): boolean {
        return !!(this.image || this.headerImage);
    }

    get hasHeader(): boolean {
        return this.showHeader && (!!this.headerTitle || !!this.headerSubtitle || !!this.headerIcon || !!this.headerImage || !!this.headerTemplate);
    }

    get hasContent(): boolean {
        return this.showContent && (!!this.content || !!this.contentTemplate);
    }

    get hasActions(): boolean {
        return this.showActions && (this.actions.length > 0 || !!this.actionsTemplate);
    }

    get hasFooter(): boolean {
        return this.showFooter && (!!this.footerContent || !!this.footerTemplate);
    }

    get imageClasses(): string {
        return 'amw-card__image';
    }

    get actionAlignment(): 'start' | 'end' {
        return 'end';
    }

    get actionTemplate(): TemplateRef<any> | null {
        return this.actionsTemplate || null;
    }
}
