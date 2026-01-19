import { Component, ViewEncapsulation, signal } from '@angular/core';
import { AmwIconButtonComponent } from '../../../../library/src/controls/components/amw-icon-button/amw-icon-button.component';
import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';

@Component({
    selector: 'amw-demo-icon-button-validation',
    standalone: true,
    imports: [AmwIconButtonComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './icon-button-validation.component.html',
    styleUrl: './icon-button-validation.component.scss'
})
export class IconButtonValidationComponent {
    isDisabled = signal(false);
    isLoading = signal(false);

    constructor(private notification: AmwNotificationService) {}

    toggleDisabled(): void {
        this.isDisabled.update(v => !v);
    }

    toggleLoading(): void {
        this.isLoading.update(v => !v);
        if (this.isLoading()) {
            setTimeout(() => this.isLoading.set(false), 3000);
        }
    }

    onAction(): void {
        this.notification.info('Action', 'Icon button clicked', { duration: 2000 });
    }
}
