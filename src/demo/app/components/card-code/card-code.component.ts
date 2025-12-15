import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BaseCodeComponent } from '../base/base-code.component';

type CardExamples = 'basic' | 'withImage' | 'clickable' | 'variants';

@Component({
    selector: 'amw-demo-card-code',
    standalone: true,
    imports: [
        FormsModule,
        MatExpansionModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './card-code.component.html',
    styleUrl: './card-code.component.scss'
})
export class CardCodeComponent extends BaseCodeComponent<CardExamples> {
    // Original code examples (for reset functionality)
    readonly codeExamples: Record<CardExamples, string> = {
        basic: `<mat-card>
  <mat-card-header>
    <mat-card-title>Card Title</mat-card-title>
    <mat-card-subtitle>Card subtitle</mat-card-subtitle>
  </mat-card-header>
  <mat-card-content>
    <p>This is a basic card with title, subtitle, and content.</p>
  </mat-card-content>
  <mat-card-actions>
    <button mat-button>ACTION 1</button>
    <button mat-button>ACTION 2</button>
  </mat-card-actions>
</mat-card>`,

        withImage: `<mat-card>
  <mat-card-header>
    <mat-card-title>Shiba Inu</mat-card-title>
    <mat-card-subtitle>Dog Breed</mat-card-subtitle>
  </mat-card-header>
  <img mat-card-image src="https://material.angular.io/assets/img/examples/shiba2.jpg" alt="Photo of a Shiba Inu">
  <mat-card-content>
    <p>The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.</p>
  </mat-card-content>
  <mat-card-actions>
    <button mat-button>LIKE</button>
    <button mat-button>SHARE</button>
  </mat-card-actions>
</mat-card>`,

        clickable: `<mat-card class="example-card" (click)="onCardClick()">
  <mat-card-header>
    <div mat-card-avatar class="example-header-image"></div>
    <mat-card-title>Interactive Card</mat-card-title>
    <mat-card-subtitle>Click anywhere on this card</mat-card-subtitle>
  </mat-card-header>
  <mat-card-content>
    <p>This entire card is clickable and will respond to user interactions.</p>
  </mat-card-content>
</mat-card>`,

        variants: `<!-- Outlined Card -->
<mat-card appearance="outlined">
  <mat-card-header>
    <mat-card-title>Outlined Card</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <p>This card uses an outlined appearance.</p>
  </mat-card-content>
</mat-card>

<!-- Raised Card (default) -->
<mat-card appearance="raised">
  <mat-card-header>
    <mat-card-title>Raised Card</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <p>This card uses a raised appearance with elevation.</p>
  </mat-card-content>
</mat-card>`
    };

    constructor() {
        super();
    }

    // Event handler for clickable card example
    onCardClick() {
        console.log('Card clicked!');
    }
}


