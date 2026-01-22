import { Component, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AmwChipInputComponent, ChipInputOption } from '../../../../library/src/controls/components/amw-chip-input';
import { AmwDemoDocComponent } from '../../shared/components/demo-doc/demo-doc.component';

@Component({
    selector: 'amw-demo-chip-input',
    standalone: true,
    imports: [
        FormsModule,
        AmwChipInputComponent,
        AmwDemoDocComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './chip-input-demo.component.html',
    styleUrl: './chip-input-demo.component.scss'
})
export class ChipInputDemoComponent {
    // Sample suggestions
    ingredientSuggestions: ChipInputOption[] = [
        { value: 'tomato', label: 'Tomato', icon: 'eco' },
        { value: 'onion', label: 'Onion', icon: 'eco' },
        { value: 'garlic', label: 'Garlic', icon: 'eco' },
        { value: 'pepper', label: 'Bell Pepper', icon: 'eco' },
        { value: 'carrot', label: 'Carrot', icon: 'eco' },
        { value: 'potato', label: 'Potato', icon: 'eco' },
        { value: 'spinach', label: 'Spinach', icon: 'eco' },
        { value: 'broccoli', label: 'Broccoli', icon: 'eco' }
    ];

    tagSuggestions: ChipInputOption[] = [
        { value: 'angular', label: 'Angular', subtitle: 'Frontend' },
        { value: 'react', label: 'React', subtitle: 'Frontend' },
        { value: 'vue', label: 'Vue', subtitle: 'Frontend' },
        { value: 'node', label: 'Node.js', subtitle: 'Backend' },
        { value: 'python', label: 'Python', subtitle: 'Backend' },
        { value: 'typescript', label: 'TypeScript', subtitle: 'Language' }
    ];

    dietaryRestrictions: ChipInputOption[] = [
        { value: 'vegetarian', label: 'Vegetarian' },
        { value: 'vegan', label: 'Vegan' },
        { value: 'gluten-free', label: 'Gluten-Free' },
        { value: 'dairy-free', label: 'Dairy-Free' },
        { value: 'nut-free', label: 'Nut-Free' },
        { value: 'halal', label: 'Halal' },
        { value: 'kosher', label: 'Kosher' }
    ];

    // State for demos
    selectedIngredients: ChipInputOption[] = [];
    selectedTags: ChipInputOption[] = [];
    selectedRestrictions: ChipInputOption[] = [];
    customOnlyChips: ChipInputOption[] = [];
    limitedChips: ChipInputOption[] = [];
    isLoading = signal(false);

    onChipAdded(chip: ChipInputOption): void {
        console.log('Chip added:', chip);
    }

    onChipRemoved(chip: ChipInputOption): void {
        console.log('Chip removed:', chip);
    }

    simulateLoading(): void {
        this.isLoading.set(true);
        setTimeout(() => this.isLoading.set(false), 2000);
    }
}
