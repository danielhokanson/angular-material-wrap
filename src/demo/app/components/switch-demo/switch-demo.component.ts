import { Component, ViewEncapsulation } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AmwSwitchComponent } from '../../../../library/src/controls/components/amw-switch/amw-switch.component';
import { AmwIconComponent } from '../../../../library/src/components/components';

@Component({
    selector: 'amw-demo-switch',
    standalone: true,
    imports: [
    FormsModule,
    AmwSwitchComponent,
    AmwIconComponent
],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './switch-demo.component.html',
    styleUrl: './switch-demo.component.scss'
})
export class SwitchDemoComponent {
    // Basic switch
    basicSwitch = false;

    // Configuration options
    size: 'small' | 'medium' | 'large' = 'medium';
    color: 'primary' | 'accent' | 'warn' = 'primary';
    labelPosition: 'before' | 'after' = 'after';
    disabled = false;
    required = false;

    // Real-world examples
    notificationsEnabled = true;
    darkModeEnabled = false;
    autoSaveEnabled = true;
    emailNotifications = false;
    smsNotifications = true;
    pushNotifications = false;

    onSwitchChange(checked: boolean): void {
        console.log('Switch changed:', checked);
    }

    onNotificationChange(checked: boolean): void {
        console.log('Notifications:', checked);
    }

    onDarkModeChange(checked: boolean): void {
        console.log('Dark mode:', checked);
    }

    onAutoSaveChange(checked: boolean): void {
        console.log('Auto save:', checked);
    }
}

