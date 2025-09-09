import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'amw-demo-card-code',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatTabsModule,
        MatButtonModule,
        MatIconModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './card-code.component.html',
    styleUrl: './card-code.component.scss'
})
export class CardCodeComponent {
    codeExamples = {
        basic: {
            title: 'Basic Card',
            description: 'Simple card with title, subtitle, and content',
            html: `<amw-card
  headerTitle="Card Title"
  headerSubtitle="Card subtitle"
  content="This is a basic card with title, subtitle, and content."
  [actions]="actions">
</amw-card>`,
            typescript: `export class MyComponent {
  actions = [
    { label: 'Action 1', icon: 'favorite' },
    { label: 'Action 2', icon: 'share' }
  ];
}`
        },
        withImage: {
            title: 'Card with Image',
            description: 'Card featuring an image with content',
            html: `<amw-card
  headerTitle="Beautiful Landscape"
  headerSubtitle="Nature Photography"
  image="https://example.com/image.jpg"
  imageAlt="Beautiful landscape"
  content="This card features a beautiful landscape image."
  [actions]="actions">
</amw-card>`,
            typescript: `export class MyComponent {
  actions = [
    { label: 'View', icon: 'visibility' },
    { label: 'Download', icon: 'download' }
  ];
}`
        },
        clickable: {
            title: 'Clickable Card',
            description: 'Interactive card that responds to clicks',
            html: `<amw-card
  headerTitle="Interactive Card"
  headerSubtitle="Click me!"
  content="This card is clickable and will respond to user interactions."
  [clickable]="true"
  (cardClick)="onCardClick()">
</amw-card>`,
            typescript: `export class MyComponent {
  onCardClick() {
    console.log('Card clicked!');
  }
}`
        },
        variants: {
            title: 'Card Variants',
            description: 'Different card styles and variants',
            html: `<amw-card
  headerTitle="Outlined Card"
  content="This card uses an outlined style."
  variant="outlined">
</amw-card>

<amw-card
  headerTitle="Filled Card"
  content="This card uses a filled background."
  variant="filled">
</amw-card>

<amw-card
  headerTitle="Elevated Card"
  content="This card has high elevation."
  elevation="4">
</amw-card>`,
            typescript: `// No additional TypeScript needed for basic variants`
        },
        sizes: {
            title: 'Card Sizes',
            description: 'Different card size variants',
            html: `<amw-card
  headerTitle="Small Card"
  content="This is a small, compact card."
  size="small">
</amw-card>

<amw-card
  headerTitle="Medium Card"
  content="This is a medium-sized card."
  size="medium">
</amw-card>

<amw-card
  headerTitle="Large Card"
  content="This is a large card with more space."
  size="large">
</amw-card>`,
            typescript: `// No additional TypeScript needed for size variants`
        },
        customContent: {
            title: 'Custom Content Templates',
            description: 'Card with custom content using templates',
            html: `<amw-card
  headerTitle="Custom Content"
  headerSubtitle="Using templates">
  
  <ng-template #cardContent>
    <div class="custom-content">
      <h4>Custom Title</h4>
      <p>This is custom content using Angular templates.</p>
      <mat-chip-list>
        <mat-chip>Tag 1</mat-chip>
        <mat-chip>Tag 2</mat-chip>
      </mat-chip-list>
    </div>
  </ng-template>
  
  <ng-template #cardActions>
    <button mat-button color="primary">Custom Action</button>
  </ng-template>
</amw-card>`,
            typescript: `// No additional TypeScript needed for template usage`
        },
        configuration: {
            title: 'Advanced Configuration',
            description: 'Card with custom configuration and event handling',
            html: `<amw-card
  headerTitle="Advanced Card"
  headerSubtitle="With full configuration"
  content="This card demonstrates advanced configuration options."
  [config]="cardConfig"
  [clickable]="true"
  [loading]="isLoading"
  [actions]="cardActions"
  (cardClick)="onCardClick()"
  (actionClick)="onActionClick($event)"
  (headerClick)="onHeaderClick()"
  (imageClick)="onImageClick()">
</amw-card>`,
            typescript: `export class MyComponent {
  isLoading = false;
  
  cardConfig: CardConfig = {
    class: 'custom-card',
    style: { 'border-radius': '12px' },
    theme: 'primary'
  };
  
  cardActions = [
    { label: 'Edit', icon: 'edit', color: 'primary' },
    { label: 'Delete', icon: 'delete', color: 'warn' }
  ];
  
  onCardClick() {
    console.log('Card clicked!');
  }
  
  onActionClick(event: { action: any; index: number }) {
    console.log('Action clicked:', event);
  }
  
  onHeaderClick() {
    console.log('Header clicked!');
  }
  
  onImageClick() {
    console.log('Image clicked!');
  }
}`
        }
    };

    copyToClipboard(code: string) {
        navigator.clipboard.writeText(code).then(() => {
            console.log('Code copied to clipboard');
        });
    }
}


