import { Component, ViewEncapsulation, signal } from '@angular/core';
import { AmwBadgeDirective } from '../../../../library/src/directives/amw-badge/amw-badge.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwIconButtonComponent } from '../../../../library/src/controls/components/amw-icon-button/amw-icon-button.component';
import { AmwDemoDocComponent } from '../../shared/components/demo-doc/demo-doc.component';

@Component({
    selector: 'amw-demo-badge',
    standalone: true,
    imports: [AmwBadgeDirective, MatIconModule, MatButtonModule, AmwButtonComponent, AmwIconButtonComponent, AmwDemoDocComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './badge-demo.component.html',
    styleUrl: './badge-demo.component.scss'
})
export class BadgeDemoComponent {
    notificationCount = signal(5);
    messageCount = signal(12);
    isHidden = signal(false);

    incrementNotifications(): void {
        this.notificationCount.update(count => count + 1);
    }

    clearNotifications(): void {
        this.notificationCount.set(0);
    }

    toggleHidden(): void {
        this.isHidden.update(hidden => !hidden);
    }
}
