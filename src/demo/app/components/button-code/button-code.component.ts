import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'amw-demo-button-code',
  standalone: true,
  imports: [
    FormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './button-code.component.html',
  styleUrl: './button-code.component.scss'
})
export class ButtonCodeComponent {
  // State for live preview examples
  isLoading = false;
  clickCount = 0;

  // Editable code examples
  editableCode = {
    basic: '',
    raised: '',
    stroked: '',
    flat: '',
    icon: '',
    fab: '',
    disabled: ''
  };

  // Original code examples (for reset functionality)
  readonly codeExamples = {
    basic: `<button mat-button color="primary">Basic Button</button>
<button mat-button color="accent">Accent Button</button>
<button mat-button color="warn">Warn Button</button>`,

    raised: `<button mat-raised-button color="primary">Raised Button</button>
<button mat-raised-button color="accent">Accent Raised</button>
<button mat-raised-button color="warn">Warn Raised</button>`,

    stroked: `<button mat-stroked-button color="primary">Stroked Button</button>
<button mat-stroked-button color="accent">Accent Stroked</button>
<button mat-stroked-button color="warn">Warn Stroked</button>`,

    flat: `<button mat-flat-button color="primary">Flat Button</button>
<button mat-flat-button color="accent">Accent Flat</button>
<button mat-flat-button color="warn">Warn Flat</button>`,

    icon: `<button mat-icon-button color="primary">
  <mat-icon>favorite</mat-icon>
</button>
<button mat-icon-button color="accent">
  <mat-icon>delete</mat-icon>
</button>
<button mat-icon-button color="warn">
  <mat-icon>warning</mat-icon>
</button>`,

    fab: `<button mat-fab color="primary">
  <mat-icon>add</mat-icon>
</button>
<button mat-mini-fab color="accent">
  <mat-icon>edit</mat-icon>
</button>
<button mat-mini-fab color="warn">
  <mat-icon>delete</mat-icon>
</button>`,

    disabled: `<button mat-raised-button color="primary" disabled>Disabled Button</button>
<button mat-raised-button color="accent" [disabled]="true">Disabled Accent</button>`
  };

  constructor() {
    // Initialize editable code
    Object.keys(this.codeExamples).forEach(key => {
      this.editableCode[key as keyof typeof this.codeExamples] =
        this.codeExamples[key as keyof typeof this.codeExamples];
    });
  }

  // Reset code to original
  resetCode(exampleKey: keyof typeof this.codeExamples) {
    this.editableCode[exampleKey] = this.codeExamples[exampleKey];
  }

  // Event handlers for examples
  onButtonClick() {
    this.clickCount++;
    console.log('Button clicked! Count:', this.clickCount);
  }

  toggleLoading() {
    this.isLoading = !this.isLoading;
  }
}



