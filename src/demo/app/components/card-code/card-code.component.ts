import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwCardComponent } from '../../../../library/src/components/components';

@Component({
  selector: 'amw-demo-card-code',
  standalone: true,
  imports: [
    FormsModule,
    AmwCodeDocComponent,
    AmwButtonComponent,
    AmwCardComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './card-code.component.html',
  styleUrl: './card-code.component.scss'
})
export class CardCodeComponent implements OnInit {
  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Card',
      description: 'Simple card with title, subtitle, and content',
      code: `<amw-card
  headerTitle="Card Title"
  headerSubtitle="Card subtitle"
  content="This is a basic card with title, subtitle, and content."
  [actions]="[
    { label: 'ACTION 1' },
    { label: 'ACTION 2' }
  ]">
</amw-card>`
    },
    {
      key: 'withImage',
      title: 'Card with Image',
      description: 'Card featuring an image with content',
      code: `<amw-card
  headerTitle="Shiba Inu"
  headerSubtitle="Dog Breed"
  image="https://material.angular.io/assets/img/examples/shiba2.jpg"
  imageAlt="Photo of a Shiba Inu"
  content="The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan."
  [actions]="[
    { label: 'LIKE', icon: 'favorite' },
    { label: 'SHARE', icon: 'share' }
  ]">
</amw-card>`
    },
    {
      key: 'clickable',
      title: 'Clickable Card',
      description: 'Interactive card that responds to clicks',
      code: `<amw-card
  headerTitle="Interactive Card"
  headerSubtitle="Click anywhere on this card"
  headerIcon="person"
  content="This entire card is clickable and will respond to user interactions."
  [clickable]="true"
  (cardClick)="onCardClick()">
</amw-card>`
    },
    {
      key: 'variants',
      title: 'Card Variants',
      description: 'Different card styles and appearances',
      code: `<!-- Outlined Card -->
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
    }
  ];

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
  }

  // Event handler for clickable card example
  onCardClick() {
    console.log('Card clicked!');
  }
}
