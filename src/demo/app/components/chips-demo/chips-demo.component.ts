import { Component, ViewEncapsulation } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { AmwChipsComponent } from '../../../../library/src/controls/components/amw-chips/amw-chips.component';
import { Chip, ChipConfig, ChipEvent, ChipChangeEvent, ChipMenuItem } from '../../../../library/src/controls/components/amw-chips/interfaces';

@Component({
    selector: 'amw-demo-chips',
    standalone: true,
    imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTabsModule,
    MatSnackBarModule,
    AmwChipsComponent
],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './chips-demo.component.html',
    styleUrl: './chips-demo.component.scss'
})
export class ChipsDemoComponent {
    selectedTab = 0;

    // Basic chips
    basicChips: Chip[] = [
        { id: '1', label: 'Angular', removable: true },
        { id: '2', label: 'Material Design', removable: true },
        { id: '3', label: 'TypeScript', removable: true }
    ];

    // Choice chips
    choiceChips: Chip[] = [
        { id: '1', label: 'Small', selected: false },
        { id: '2', label: 'Medium', selected: true },
        { id: '3', label: 'Large', selected: false }
    ];

    // Filter chips
    filterChips: Chip[] = [
        { id: '1', label: 'Frontend', selected: true },
        { id: '2', label: 'Backend', selected: false },
        { id: '3', label: 'Mobile', selected: true },
        { id: '4', label: 'Desktop', selected: false }
    ];

    // Input chips
    inputChips: Chip[] = [];
    inputValue = '';

    // Avatar chips
    avatarChips: Chip[] = [
        {
            id: '1',
            label: 'John Doe',
            avatar: 'https://via.placeholder.com/32x32/6750a4/ffffff?text=JD',
            removable: true
        },
        {
            id: '2',
            label: 'Jane Smith',
            avatar: 'https://via.placeholder.com/32x32/625b71/ffffff?text=JS',
            removable: true
        }
    ];

    // Icon chips
    iconChips: Chip[] = [
        { id: '1', label: 'Email', icon: 'email', removable: true },
        { id: '2', label: 'Phone', icon: 'phone', removable: true },
        { id: '3', label: 'Location', icon: 'location_on', removable: true }
    ];

    // Menu chips
    menuChips: Chip[] = [
        {
            id: '1',
            label: 'Project Alpha',
            removable: true,
            showMenu: true,
            menuItems: [
                { id: 'edit', label: 'Edit', icon: 'edit', action: (chip) => this.editChip(chip) },
                { id: 'duplicate', label: 'Duplicate', icon: 'content_copy', action: (chip) => this.duplicateChip(chip) },
                { id: 'archive', label: 'Archive', icon: 'archive', action: (chip) => this.archiveChip(chip) }
            ]
        },
        {
            id: '2',
            label: 'Project Beta',
            removable: true,
            showMenu: true,
            menuItems: [
                { id: 'edit', label: 'Edit', icon: 'edit', action: (chip) => this.editChip(chip) },
                { id: 'duplicate', label: 'Duplicate', icon: 'content_copy', action: (chip) => this.duplicateChip(chip) },
                { id: 'delete', label: 'Delete', icon: 'delete', action: (chip) => this.deleteChip(chip) }
            ]
        }
    ];

    // Validation chips
    validationChips: Chip[] = [];
    validationError = '';

    // Suggestion chips
    suggestionChips: Chip[] = [];
    availableSuggestions: Chip[] = [
        { id: '1', label: 'JavaScript' },
        { id: '2', label: 'TypeScript' },
        { id: '3', label: 'Angular' },
        { id: '4', label: 'React' },
        { id: '5', label: 'Vue' },
        { id: '6', label: 'Node.js' },
        { id: '7', label: 'Python' },
        { id: '8', label: 'Java' }
    ];

    // Configuration examples
    basicConfig: ChipConfig = {
        chips: this.basicChips,
        addable: true,
        removable: true,
        placeholder: 'Add a chip...',
        maxChips: 5
    };

    choiceConfig: ChipConfig = {
        chips: this.choiceChips,
        selectable: true,
        multiple: false,
        placeholder: 'Select size'
    };

    filterConfig: ChipConfig = {
        chips: this.filterChips,
        selectable: true,
        multiple: true,
        placeholder: 'Filter by category'
    };

    inputConfig: ChipConfig = {
        chips: this.inputChips,
        addable: true,
        removable: true,
        placeholder: 'Add tags...',
        maxChips: 10
    };

    avatarConfig: ChipConfig = {
        chips: this.avatarChips,
        addable: false,
        removable: true,
        placeholder: 'Team members'
    };

    iconConfig: ChipConfig = {
        chips: this.iconChips,
        addable: false,
        removable: true,
        placeholder: 'Contact methods'
    };

    validationConfig: ChipConfig = {
        chips: this.validationChips,
        addable: true,
        removable: true,
        placeholder: 'Enter email addresses...',
        validator: this.emailValidator.bind(this),
        minChips: 1,
        maxChips: 5
    };

    suggestionConfig: ChipConfig = {
        chips: this.suggestionChips,
        addable: true,
        removable: true,
        placeholder: 'Add skills...',
        showSuggestions: true,
        filterFn: this.filterSuggestions.bind(this),
        maxSuggestions: 5
    };

    menuConfig: ChipConfig = {
        chips: this.menuChips,
        addable: false,
        removable: true,
        showMenus: true,
        placeholder: 'Projects with menus'
    };

    constructor(private snackBar: MatSnackBar) { }

    /**
     * Email validator function
     */
    emailValidator(chip: Chip): boolean | string {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(chip.label)) {
            return 'Please enter a valid email address';
        }
        return true;
    }

    /**
     * Filter suggestions function
     */
    filterSuggestions(query: string, chips: Chip[]): Chip[] {
        const lowerQuery = query.toLowerCase();
        return this.availableSuggestions.filter(suggestion =>
            suggestion.label.toLowerCase().includes(lowerQuery) &&
            !chips.some(chip => chip.label === suggestion.label)
        );
    }

    /**
     * Handle chip add event
     */
    onChipAdd(event: ChipEvent): void {
        this.snackBar.open(`Added chip: ${event.chip.label}`, 'Close', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
        });
    }

    /**
     * Handle chip remove event
     */
    onChipRemove(event: ChipEvent): void {
        this.snackBar.open(`Removed chip: ${event.chip.label}`, 'Close', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
        });
    }

    /**
     * Handle chip select event
     */
    onChipSelect(event: ChipEvent): void {
        this.snackBar.open(`Selected chip: ${event.chip.label}`, 'Close', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
        });
    }

    /**
     * Handle chip deselect event
     */
    onChipDeselect(event: ChipEvent): void {
        this.snackBar.open(`Deselected chip: ${event.chip.label}`, 'Close', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
        });
    }

    /**
     * Handle chips change event
     */
    onChipsChange(event: ChipChangeEvent): void {
        console.log('Chips changed:', event);
    }

    /**
     * Handle validation error
     */
    onValidationError(error: string): void {
        this.validationError = error;
    }

    /**
     * Clear validation error
     */
    clearValidationError(): void {
        this.validationError = '';
    }

    /**
     * Get selected choice chips
     */
    getSelectedChoiceChips(): Chip[] {
        return this.choiceChips.filter(chip => chip.selected);
    }

    /**
     * Get selected filter chips
     */
    getSelectedFilterChips(): Chip[] {
        return this.filterChips.filter(chip => chip.selected);
    }

    /**
     * Clear all chips
     */
    clearAllChips(): void {
        this.inputChips = [];
        this.suggestionChips = [];
        this.validationChips = [];
        this.snackBar.open('All chips cleared', 'Close', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
        });
    }

    /**
     * Add sample chips
     */
    addSampleChips(): void {
        const sampleChips: Chip[] = [
            { id: '1', label: 'Sample 1', removable: true },
            { id: '2', label: 'Sample 2', removable: true },
            { id: '3', label: 'Sample 3', removable: true }
        ];

        this.inputChips = [...this.inputChips, ...sampleChips];
        this.suggestionChips = [...this.suggestionChips, ...sampleChips];
        this.validationChips = [...this.validationChips, ...sampleChips];

        this.snackBar.open('Sample chips added', 'Close', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
        });
    }

    /**
     * Menu action methods
     */
    editChip(chip: Chip): void {
        this.snackBar.open(`Edit: ${chip.label}`, 'Close', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
        });
    }

    duplicateChip(chip: Chip): void {
        const newChip: Chip = {
            id: Date.now().toString(),
            label: `${chip.label} (Copy)`,
            removable: true,
            showMenu: true,
            menuItems: chip.menuItems
        };
        this.menuChips.push(newChip);
        this.snackBar.open(`Duplicated: ${chip.label}`, 'Close', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
        });
    }

    archiveChip(chip: Chip): void {
        this.snackBar.open(`Archived: ${chip.label}`, 'Close', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
        });
    }

    deleteChip(chip: Chip): void {
        const index = this.menuChips.findIndex(c => c.id === chip.id);
        if (index > -1) {
            this.menuChips.splice(index, 1);
            this.snackBar.open(`Deleted: ${chip.label}`, 'Close', {
                duration: 2000,
                horizontalPosition: 'end',
                verticalPosition: 'top'
            });
        }
    }

    /**
     * Handle menu item click
     */
    onMenuItemClick(event: { chip: Chip, menuItem: ChipMenuItem }): void {
        this.snackBar.open(`Menu action: ${event.menuItem.label} on ${event.chip.label}`, 'Close', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
        });
    }
}
