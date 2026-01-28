import { Component, ViewEncapsulation, forwardRef, TemplateRef, input, output, contentChild, computed } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { AmwIconComponent } from '../amw-icon/amw-icon.component';
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
        NgTemplateOutlet,
        MatCardModule,
        AmwButtonComponent,
        AmwIconComponent,
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
export class AmwCardComponent {
    /** Card configuration object */
    readonly config = input<CardConfig>({});
    /** Visual variant of the card */
    readonly variant = input<CardVariant>('elevated');
    /** Size variant of the card */
    readonly size = input<AmwSize>('medium');
    /** Elevation level for shadow */
    readonly elevation = input<CardElevation>(1);
    /** Whether the card is clickable */
    readonly clickable = input(false);
    /** Whether the card is disabled */
    readonly disabled = input(false);
    /** Whether the card is in loading state */
    readonly loading = input(false);
    /** Title text for the card header */
    readonly headerTitle = input('');
    /** Subtitle text for the card header */
    readonly headerSubtitle = input('');
    /** Material icon name for the header */
    readonly headerIcon = input('');
    /** Image URL for the header avatar */
    readonly headerImage = input('');
    /** Text content for the card body */
    readonly content = input('');
    /** Array of action buttons */
    readonly actions = input<{ label: string; icon?: string; color?: 'primary' | 'accent' | 'warn'; disabled?: boolean }[]>([]);
    /** Whether to show action buttons */
    readonly showActions = input(true);
    /** Whether to show the header */
    readonly showHeader = input(true);
    /** Whether to show the content */
    readonly showContent = input(true);
    /** Whether to show the footer */
    readonly showFooter = input(false);
    /** Text content for the card footer */
    readonly footerContent = input('');
    /** Image URL for the card image */
    readonly image = input('');
    /** Alt text for the card image */
    readonly imageAlt = input('');
    /** Height of the card image */
    readonly imageHeight = input('200px');
    /** Position of the card image */
    readonly imagePosition = input<'top' | 'bottom'>('top');

    /** Emitted when the card is clicked */
    readonly cardClick = output<void>();
    /** Emitted when an action button is clicked */
    readonly actionClick = output<{ action: any; index: number }>();
    /** Emitted when the header is clicked */
    readonly headerClick = output<void>();
    /** Emitted when the image is clicked */
    readonly imageClick = output<void>();

    readonly headerTemplate = contentChild<TemplateRef<any>>('cardHeader');
    readonly contentTemplate = contentChild<TemplateRef<any>>('cardContent');
    readonly actionsTemplate = contentChild<TemplateRef<any>>('cardActions');
    readonly footerTemplate = contentChild<TemplateRef<any>>('cardFooter');

    /**
     * Handles card click events
     *
     * Only emits if card is clickable, not disabled, and not loading
     */
    onCardClick() {
        if (!this.disabled() && !this.loading() && this.clickable()) {
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
        if (!action.disabled && !this.disabled() && !this.loading()) {
            this.actionClick.emit({ action, index });
        }
    }

    onHeaderClick() {
        if (!this.disabled() && !this.loading()) {
            this.headerClick.emit();
        }
    }

    onImageClick() {
        if (!this.disabled() && !this.loading()) {
            this.imageClick.emit();
        }
    }

    readonly cardClasses = computed(() => {
        const classes = ['amw-card'];
        const v = this.variant();
        const s = this.size();
        const cfg = this.config();

        if (v) classes.push(`amw-card--${v}`);
        if (s) classes.push(`amw-card--${s}`);
        if (this.clickable()) classes.push('amw-card--clickable');
        if (this.disabled()) classes.push('amw-card--disabled');
        if (this.loading()) classes.push('amw-card--loading');
        if (cfg.class) classes.push(cfg.class);

        return classes.join(' ');
    });

    readonly cardStyles = computed(() => {
        const styles: { [key: string]: string } = {};
        const elev = this.elevation();
        const cfg = this.config();

        if (elev) {
            styles['--amw-card-elevation'] = `var(--mdc-elevation-level${elev})`;
        }

        if (cfg.style) {
            Object.assign(styles, cfg.style);
        }

        return styles;
    });

    readonly hasImage = computed(() => {
        return !!(this.image() || this.headerImage());
    });

    readonly hasHeader = computed(() => {
        return this.showHeader() && (!!this.headerTitle() || !!this.headerSubtitle() || !!this.headerIcon() || !!this.headerImage() || !!this.headerTemplate());
    });

    readonly hasContent = computed(() => {
        return this.showContent() && (!!this.content() || !!this.contentTemplate());
    });

    readonly hasActions = computed(() => {
        return this.showActions() && (this.actions().length > 0 || !!this.actionsTemplate());
    });

    readonly hasFooter = computed(() => {
        return this.showFooter() && (!!this.footerContent() || !!this.footerTemplate());
    });

    readonly imageClasses = 'amw-card__image';

    readonly actionAlignment: 'start' | 'end' = 'end';

    readonly actionTemplate = computed(() => {
        return this.actionsTemplate() || null;
    });
}
