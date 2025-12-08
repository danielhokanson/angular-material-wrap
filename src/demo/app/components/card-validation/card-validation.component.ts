import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { AmwCardComponent } from '../../../../library/src/components/components/amw-card/amw-card.component';
import { CardConfig, CardVariant, CardElevation } from '../../../../library/src/components/components/amw-card/interfaces';
import { AmwSize } from '../../../../library/src/shared/types';

@Component({
    selector: 'amw-demo-card-validation',
    standalone: true,
    imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
    AmwCardComponent
],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './card-validation.component.html',
    styleUrl: './card-validation.component.scss'
})
export class CardValidationComponent implements OnInit {
    cardForm: FormGroup;
    selectedCards: any[] = [];

    cardOptions = [
        { id: 1, title: 'Basic Plan', subtitle: 'Perfect for individuals', price: '$9.99', features: ['Feature 1', 'Feature 2'] },
        { id: 2, title: 'Pro Plan', subtitle: 'Great for small teams', price: '$19.99', features: ['Feature 1', 'Feature 2', 'Feature 3'] },
        { id: 3, title: 'Enterprise Plan', subtitle: 'For large organizations', price: '$49.99', features: ['All Features', 'Priority Support', 'Custom Integration'] }
    ];

    constructor(
        private fb: FormBuilder,
        private snackBar: MatSnackBar
    ) {
        this.cardForm = this.fb.group({
            selectedCards: [[], Validators.required],
            minSelection: [1, [Validators.required, Validators.min(1)]],
            maxSelection: [2, [Validators.required, Validators.min(1)]]
        });
    }

    ngOnInit() {
        this.cardForm.patchValue({
            selectedCards: this.selectedCards
        });
    }

    onCardClick(card: any) {
        const currentSelection = this.cardForm.get('selectedCards')?.value || [];
        const maxSelection = this.cardForm.get('maxSelection')?.value || 2;

        if (currentSelection.includes(card.id)) {
            // Remove from selection
            this.selectedCards = currentSelection.filter((id: any) => id !== card.id);
        } else if (currentSelection.length < maxSelection) {
            // Add to selection
            this.selectedCards = [...currentSelection, card.id];
        } else {
            this.snackBar.open(`Maximum ${maxSelection} cards can be selected`, 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
            return;
        }

        this.cardForm.patchValue({ selectedCards: this.selectedCards });
        this.validateSelection();
    }

    validateSelection() {
        const selectedCards = this.cardForm.get('selectedCards')?.value || [];
        const minSelection = this.cardForm.get('minSelection')?.value || 1;
        const maxSelection = this.cardForm.get('maxSelection')?.value || 2;

        let errors: any = {};

        if (selectedCards.length === 0) {
            errors['required'] = true;
        } else if (selectedCards.length < minSelection) {
            errors['minSelection'] = { required: minSelection, actual: selectedCards.length };
        } else if (selectedCards.length > maxSelection) {
            errors['maxSelection'] = { max: maxSelection, actual: selectedCards.length };
        }

        if (Object.keys(errors).length > 0) {
            this.cardForm.get('selectedCards')?.setErrors(errors);
        } else {
            this.cardForm.get('selectedCards')?.setErrors(null);
        }
    }

    onSubmit() {
        if (this.cardForm.valid) {
            const selectedCards = this.cardForm.get('selectedCards')?.value || [];
            this.snackBar.open(`Form submitted successfully! Selected ${selectedCards.length} cards.`, 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
            console.log('Form values:', this.cardForm.value);
        } else {
            const errors = this.cardForm.get('selectedCards')?.errors;
            let message = 'Please fix the validation errors';

            if (errors?.['required']) {
                message = 'Please select at least one card';
            } else if (errors?.['minSelection']) {
                const min = errors['minSelection'].required;
                message = `Please select at least ${min} cards`;
            } else if (errors?.['maxSelection']) {
                const max = errors['maxSelection'].max;
                message = `Please select no more than ${max} cards`;
            }

            this.snackBar.open(message, 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
        }
    }

    onReset() {
        this.cardForm.reset();
        this.selectedCards = [];
    }

    isCardSelected(cardId: number): boolean {
        return this.selectedCards.includes(cardId);
    }

    /** Get selected cards - computed property that updates when selection changes */
    get selectedCardsList() {
        return this.cardOptions.filter(card => this.selectedCards.includes(card.id));
    }
}
