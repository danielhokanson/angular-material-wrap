import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AmwAutocompleteComponent, AutocompleteOption, AutocompleteSize, AutocompleteAppearance } from '../../../../library/src/controls/components/amw-autocomplete/amw-autocomplete.component';

@Component({
    selector: 'amw-demo-autocomplete',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        AmwAutocompleteComponent
    ],
    templateUrl: './autocomplete-demo.component.html',
    styleUrl: './autocomplete-demo.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class AutocompleteDemoComponent {
    autocompleteVariations = {
        sizes: [
            { size: 'small' as AutocompleteSize, label: 'Small' },
            { size: 'medium' as AutocompleteSize, label: 'Medium' },
            { size: 'large' as AutocompleteSize, label: 'Large' }
        ],
        appearances: [
            { appearance: 'outline' as AutocompleteAppearance, label: 'Outline' },
            { appearance: 'fill' as AutocompleteAppearance, label: 'Fill' }
        ],
        states: [
            { disabled: false, required: false, label: 'Default' },
            { disabled: false, required: true, label: 'Required' },
            { disabled: true, required: false, label: 'Disabled' }
        ]
    };

    sampleOptions: AutocompleteOption[] = [
        { value: 'angular', label: 'Angular' },
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue.js' },
        { value: 'svelte', label: 'Svelte' },
        { value: 'ember', label: 'Ember.js' },
        { value: 'backbone', label: 'Backbone.js' },
        { value: 'knockout', label: 'Knockout.js' },
        { value: 'jquery', label: 'jQuery' }
    ];

    countryOptions: AutocompleteOption[] = [
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'de', label: 'Germany' },
        { value: 'fr', label: 'France' },
        { value: 'es', label: 'Spain' },
        { value: 'it', label: 'Italy' },
        { value: 'jp', label: 'Japan' },
        { value: 'au', label: 'Australia' },
        { value: 'br', label: 'Brazil' }
    ];

    selectedFramework: string | null = null;
    selectedCountry: string | null = null;
    selectedMultiple: string[] = [];
}
