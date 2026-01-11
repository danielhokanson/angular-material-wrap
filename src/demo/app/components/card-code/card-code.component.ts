import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseCodeComponent } from '../base/base-code.component';

type CardExamples = 'basic' | 'withImage' | 'clickable' | 'variants';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwIconComponent, AmwCardComponent } from '../../../../library/src/components/components';
@Component({
    selector: 'amw-demo-card-code',
    standalone: true,
    imports: [FormsModule,
    AmwButtonComponent,
    AmwAccordionComponent,
    AmwAccordionPanelComponent,
    AmwIconComponent,
    AmwCardComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './card-code.component.html',
    styleUrl: './card-code.component.scss'
})
export class CardCodeComponent extends BaseCodeComponent<CardExamples> {
    // Original code examples (for reset functionality)
    readonly codeExamples: Record<CardExamples, string> = {
        basic: `<amw-card
  headerTitle="Card Title"
  headerSubtitle="Card subtitle"
  content="This is a basic card with title, subtitle, and content."
  [actions]="[
    { label: 'ACTION 1' },
    { label: 'ACTION 2' }
  ]">
</amw-card>`,

        withImage: `<amw-card
  headerTitle="Shiba Inu"
  headerSubtitle="Dog Breed"
  image="https://material.angular.io/assets/img/examples/shiba2.jpg"
  imageAlt="Photo of a Shiba Inu"
  content="The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan."
  [actions]="[
    { label: 'LIKE', icon: 'favorite' },
    { label: 'SHARE', icon: 'share' }
  ]">
</amw-card>`,

        clickable: `<amw-card
  headerTitle="Interactive Card"
  headerSubtitle="Click anywhere on this card"
  headerIcon="person"
  content="This entire card is clickable and will respond to user interactions."
  [clickable]="true"
  (cardClick)="onCardClick()">
</amw-card>`,

        variants: `<!-- Outlined Card -->
<amw-card
  headerTitle="Outlined Card"
  content="This card uses an outlined appearance."
  variant="outlined">
</amw-card>

<!-- Elevated Card (default) -->
<amw-card
  headerTitle="Elevated Card"
  content="This card uses an elevated appearance with shadow."
  variant="elevated">
</amw-card>`
    };

    constructor() {
        super();
    }

    // Event handler for clickable card example
    onCardClick() {
        console.log('Card clicked!');
    }
}

