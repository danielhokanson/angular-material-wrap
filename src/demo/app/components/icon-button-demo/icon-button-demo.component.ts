import { Component, ViewEncapsulation } from '@angular/core';
import { AmwIconButtonComponent } from '../../../../library/src/controls/components/amw-icon-button/amw-icon-button.component';
import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';

@Component({
    selector: 'amw-demo-icon-button',
    standalone: true,
    imports: [AmwIconButtonComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './icon-button-demo.component.html',
    styleUrl: './icon-button-demo.component.scss'
})
export class IconButtonDemoComponent {
    isLoading = false;

    constructor(private notification: AmwNotificationService) {}

    onButtonClick(name: string): void {
        this.notification.info('Icon Button Clicked', `${name} clicked!`, { duration: 2000 });
    }

    simulateLoading(): void {
        this.isLoading = true;
        setTimeout(() => {
            this.isLoading = false;
            this.notification.success('Complete', 'Action completed!', { duration: 2000 });
        }, 2000);
    }
}
