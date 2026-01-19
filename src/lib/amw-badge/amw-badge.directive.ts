import { Directive, Input, ElementRef, Renderer2, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[amwBadge]',
    standalone: true
})
export class AmwBadgeDirective implements OnChanges {
    @Input('amwBadge') content?: string | number;
    @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
    @Input() position: 'above after' | 'above before' | 'below before' | 'below after' = 'above after';
    @Input() size: 'small' | 'medium' | 'large' = 'medium';
    @Input() overlap = true;
    @Input() disabled = false;
    @Input() hidden = false;

    private badgeEl?: HTMLElement;

    constructor(private el: ElementRef, private r: Renderer2) { }

    ngOnChanges(changes: SimpleChanges) {
        if (this.hidden || this.disabled || !this.content) {
            this._removeBadge();
            return;
        }
        this._renderBadge();
    }

    private _renderBadge() {
        if (!this.badgeEl) {
            this.badgeEl = this.r.createElement('span');
            this.r.addClass(this.badgeEl, 'amw-badge');
            this.r.appendChild(this.el.nativeElement, this.badgeEl);
        }
        this.badgeEl.textContent = String(this.content);
        this.badgeEl.setAttribute('data-color', this.color);
        this.badgeEl.setAttribute('data-pos', this.position);
        this.badgeEl.setAttribute('data-size', this.size);
    }

    private _removeBadge() {
        if (this.badgeEl) {
            this.r.removeChild(this.el.nativeElement, this.badgeEl);
            this.badgeEl = undefined;
        }
    }
}

export const AMW_BADGE_COMPONENTS = [
    AmwBadgeDirective
] as const;
