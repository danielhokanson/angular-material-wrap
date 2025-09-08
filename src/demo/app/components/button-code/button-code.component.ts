import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'amw-demo-button-code',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './button-code.component.html',
  styleUrl: './button-code.component.scss'
})
export class ButtonCodeComponent {
  codeExamples = {
    basic: `<amw-button variant="elevated" color="primary">
  Click me
</amw-button>`,
    withIcon: `<amw-button variant="elevated" color="primary" icon="save">
  Save Changes
</amw-button>`,
    fab: `<amw-button variant="fab" color="primary" icon="add">
</amw-button>`,
    loading: `<amw-button variant="elevated" color="primary" [loading]="isLoading">
  {{ isLoading ? 'Saving...' : 'Save' }}
</amw-button>`,
    disabled: `<amw-button variant="elevated" color="primary" [disabled]="!isValid">
  Submit Form
</amw-button>`,
    eventHandling: `<amw-button variant="elevated" color="primary" (click)="onButtonClick($event)">
  Click Handler
</amw-button>`
  };
}



