import { Component, ViewEncapsulation } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AmwThemeManagerComponent } from '../../../../library/src/styling/components/theme-manager/theme-manager.component';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwSelectComponent } from '../../../../library/src/controls/components/amw-select/amw-select.component';
import { AmwCheckboxComponent } from '../../../../library/src/controls/components/amw-checkbox/amw-checkbox.component';
import { AmwRadioComponent } from '../../../../library/src/controls/components/amw-radio/amw-radio.component';
import { AmwRadioGroupComponent } from '../../../../library/src/controls/components/amw-radio-group/amw-radio-group.component';
import { AmwSwitchComponent } from '../../../../library/src/controls/components/amw-switch/amw-switch.component';
import { AmwSliderComponent } from '../../../../library/src/controls/components/amw-slider/amw-slider.component';
import { AmwCardComponent, AmwIconComponent } from '../../../../library/src/components/components';
import { AmwDemoDocComponent } from '../../shared/components/demo-doc/demo-doc.component';

@Component({
    selector: 'amw-demo-theme',
    standalone: true,
    imports: [FormsModule,
    AmwThemeManagerComponent,
    AmwButtonComponent,
    AmwInputComponent,
    AmwSelectComponent,
    AmwCheckboxComponent,
    AmwRadioComponent,
    AmwRadioGroupComponent,
    AmwSwitchComponent,
    AmwSliderComponent,
    AmwCardComponent,
    AmwIconComponent,
    AmwDemoDocComponent],
    templateUrl: './theme-demo.component.html',
    styleUrl: './theme-demo.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class ThemeDemoComponent {
    // Sample form data for demonstration
    sampleForm = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        country: 'us',
        newsletter: true,
        notifications: 'email',
        volume: 75,
        darkMode: false
    };

    countries = [
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'de', label: 'Germany' },
        { value: 'fr', label: 'France' }
    ];

    notificationOptions = [
        { value: 'email', label: 'Email' },
        { value: 'push', label: 'Push Notifications' },
        { value: 'sms', label: 'SMS' },
        { value: 'none', label: 'None' }
    ];
}
