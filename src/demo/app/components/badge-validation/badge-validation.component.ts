import { Component, ViewEncapsulation, signal } from '@angular/core';
import { AmwBadgeDirective } from '../../../../library/src/directives/amw-badge/amw-badge.directive';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'amw-demo-badge-validation',
    standalone: true,
    imports: [AmwBadgeDirective, MatIconModule],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './badge-validation.component.html',
    styleUrl: './badge-validation.component.scss'
})
export class BadgeValidationComponent {
    isHidden = signal(false);
    dynamicCount = signal(5);

    toggleHidden(): void {
        this.isHidden.update(v => !v);
    }

    incrementCount(): void {
        this.dynamicCount.update(v => v + 1);
    }

    decrementCount(): void {
        this.dynamicCount.update(v => Math.max(0, v - 1));
    }

    resetCount(): void {
        this.dynamicCount.set(0);
    }
}
