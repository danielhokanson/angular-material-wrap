import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwCardComponent } from '../../../../library/src/components/components/amw-card/amw-card.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';

@Component({
  selector: 'amw-demo-card-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwCardComponent,
    AmwInputComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './card-validation.component.html',
  styleUrl: './card-validation.component.scss'
})
export class CardValidationComponent extends BaseValidationComponent implements OnInit {
  selectedCards: number[] = [];

  cardOptions = [
    { id: 1, title: 'Basic Plan', subtitle: 'Perfect for individuals', price: '$9.99', features: ['Feature 1', 'Feature 2'] },
    { id: 2, title: 'Pro Plan', subtitle: 'Great for small teams', price: '$19.99', features: ['Feature 1', 'Feature 2', 'Feature 3'] },
    { id: 3, title: 'Enterprise Plan', subtitle: 'For large organizations', price: '$49.99', features: ['All Features', 'Priority Support', 'Custom Integration'] }
  ];

  validationForm: FormGroup = this.fb.group({
    selectedCards: [[], Validators.required],
    minSelection: [1, [Validators.required, Validators.min(1)]],
    maxSelection: [2, [Validators.required, Validators.min(1)]]
  });

  validationInfo: ValidationInfo[] = [
    { title: 'Card Selection', description: 'Must select at least one card' },
    { title: 'Minimum Selection', description: 'Configure minimum number of cards to select' },
    { title: 'Maximum Selection', description: 'Configure maximum number of cards to select' },
    { title: 'Dynamic Validation', description: 'Selection limits are configurable' }
  ];

  ngOnInit() {
    this.validationForm.patchValue({
      selectedCards: this.selectedCards
    });
  }

  onCardClick(card: { id: number; title: string; subtitle: string; price: string; features: string[] }) {
    const currentSelection = this.validationForm.get('selectedCards')?.value || [];
    const maxSelection = this.validationForm.get('maxSelection')?.value || 2;

    if (currentSelection.includes(card.id)) {
      this.selectedCards = currentSelection.filter((id: number) => id !== card.id);
    } else if (currentSelection.length < maxSelection) {
      this.selectedCards = [...currentSelection, card.id];
    } else {
      this.notification.info('Info', `Maximum ${maxSelection} cards can be selected`, { duration: 3000 });
      return;
    }

    this.validationForm.patchValue({ selectedCards: this.selectedCards });
    this.validateSelection();
  }

  validateSelection() {
    const selectedCards = this.validationForm.get('selectedCards')?.value || [];
    const minSelection = this.validationForm.get('minSelection')?.value || 1;
    const maxSelection = this.validationForm.get('maxSelection')?.value || 2;

    const errors: Record<string, unknown> = {};

    if (selectedCards.length === 0) {
      errors['required'] = true;
    } else if (selectedCards.length < minSelection) {
      errors['minSelection'] = { required: minSelection, actual: selectedCards.length };
    } else if (selectedCards.length > maxSelection) {
      errors['maxSelection'] = { max: maxSelection, actual: selectedCards.length };
    }

    if (Object.keys(errors).length > 0) {
      this.validationForm.get('selectedCards')?.setErrors(errors);
    } else {
      this.validationForm.get('selectedCards')?.setErrors(null);
    }
  }

  isCardSelected(cardId: number): boolean {
    return this.selectedCards.includes(cardId);
  }

  get selectedCardsList() {
    return this.cardOptions.filter(card => this.selectedCards.includes(card.id));
  }
}
