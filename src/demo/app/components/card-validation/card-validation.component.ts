import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { AmwCardComponent } from '../../../../library/src/components/components/amw-card/amw-card.component';
import { CardConfig, CardVariant, CardElevation } from '../../../../library/src/components/components/amw-card/interfaces';
import { AmwSize } from '../../../../library/src/shared/types';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
@Component({
    selector: 'amw-demo-card-validation',
    standalone: true,
    imports: [ReactiveFormsModule,
    AmwInputComponent,
    AmwCardComponent,
    AmwCardComponent,
    MatFormFieldModule,
    AmwButtonComponent],
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
        private notification: AmwNotificationService
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
            this.notification.info('Info', `Maximum ${maxSelection} cards can be selected`, { duration: 3000 });
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
            this.notification.success('Success', `Form submitted successfully! Selected ${selectedCards.length} cards.`, { duration: 3000 });
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

            this.notification.info('Info', message, { duration: 3000 });
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
