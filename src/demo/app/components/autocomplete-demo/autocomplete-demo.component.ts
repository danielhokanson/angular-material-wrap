import { Component, ViewEncapsulation } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AmwAutocompleteComponent } from '../../../../library/src/controls/components/amw-autocomplete/amw-autocomplete.component';
import { AmwSize, AmwAppearance } from '../../../../library/src/shared/types';
import { AutocompleteOption } from '../../../../library/src/controls/components/amw-autocomplete/interfaces/autocomplete-option.interface';

@Component({
    selector: 'amw-demo-autocomplete',
    standalone: true,
    imports: [
    FormsModule,
    AmwAutocompleteComponent
],
    templateUrl: './autocomplete-demo.component.html',
    styleUrl: './autocomplete-demo.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class AutocompleteDemoComponent {
    autocompleteVariations = {
        sizes: [
            { size: 'small' as AmwSize, label: 'Small' },
            { size: 'medium' as AmwSize, label: 'Medium' },
            { size: 'large' as AmwSize, label: 'Large' }
        ],
        appearances: [
            { appearance: 'outline' as AmwAppearance, label: 'Outline' },
            { appearance: 'fill' as AmwAppearance, label: 'Fill' }
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
