import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ThemeManagerComponent } from '../../../../library/src/styling/components/theme-manager/theme-manager.component';

@Component({
    selector: 'amw-demo-theme',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatRadioModule,
        MatSliderModule,
        MatSlideToggleModule,
        ThemeManagerComponent
    ],
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
