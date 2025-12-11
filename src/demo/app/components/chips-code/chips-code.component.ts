import { Component, ViewEncapsulation, SecurityContext } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'amw-demo-chips-code',
  standalone: true,
  imports: [FormsModule, MatChipsModule, MatIconModule, MatButtonModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './chips-code.component.html',
  styleUrl: './chips-code.component.scss'
})
export class ChipsCodeComponent {
  editableCode = {
    basic: '',
    removable: '',
    selectable: '',
    input: '',
    styled: ''
  };

  renderedHtml: Record<string, SafeHtml> = {};
  errors: Record<string, string> = {};
  highlightedCode: Record<string, string> = {};

  constructor(private sanitizer: DomSanitizer) {
    this.editableCode.basic = this.codeExamples.basic;
    this.editableCode.removable = this.codeExamples.removable;
    this.editableCode.selectable = this.codeExamples.selectable;
    this.editableCode.input = this.codeExamples.input;
    this.editableCode.styled = this.codeExamples.styled;
    this.updateAllPreviews();
  }

  resetCode(exampleKey: keyof typeof this.codeExamples) {
    this.editableCode[exampleKey] = this.codeExamples[exampleKey];
    this.updatePreview(exampleKey);
  }

  onCodeChange(exampleKey: keyof typeof this.codeExamples) {
    this.updatePreview(exampleKey);
  }

  private updatePreview(exampleKey: keyof typeof this.codeExamples) {
    const code = this.editableCode[exampleKey];
    try {
      const sanitized = this.sanitizer.sanitize(SecurityContext.HTML, code);
      if (sanitized) {
        this.renderedHtml[exampleKey] = this.sanitizer.bypassSecurityTrustHtml(sanitized);
        this.errors[exampleKey] = '';
      }
    } catch (error) {
      this.errors[exampleKey] = error instanceof Error ? error.message : 'Invalid HTML';
    }
  }

  private updateAllPreviews() {
    const keys: Array<keyof typeof this.codeExamples> = ['basic', 'removable', 'selectable', 'input', 'styled'];
    keys.forEach(key => this.updatePreview(key));
  }

  hasError(exampleKey: keyof typeof this.codeExamples): boolean {
    return !!this.errors[exampleKey];
  }

  getError(exampleKey: keyof typeof this.codeExamples): string {
    return this.errors[exampleKey] || '';
  }

  getRenderedHtml(exampleKey: keyof typeof this.codeExamples): SafeHtml {
    return this.renderedHtml[exampleKey] || '';
  }

  codeExamples = {
    basic: `<mat-chip-set>
  <mat-chip>Tag 1</mat-chip>
  <mat-chip>Tag 2</mat-chip>
  <mat-chip>Tag 3</mat-chip>
</mat-chip-set>`,

    removable: `<mat-chip-set>
  <mat-chip [removable]="true" (removed)="remove()">
    Removable Chip
    <mat-icon matChipRemove>cancel</mat-icon>
  </mat-chip>
</mat-chip-set>`,

    selectable: `<mat-chip-set [selectable]="true">
  <mat-chip [selected]="true">Selected</mat-chip>
  <mat-chip>Not Selected</mat-chip>
</mat-chip-set>`,

    input: `<mat-chip-grid #chipGrid>
  @for (item of items; track item) {
    <mat-chip-row (removed)="remove(item)">
      {{ item }}
      <mat-icon matChipRemove>cancel</mat-icon>
    </mat-chip-row>
  }
  <input [matChipInputFor]="chipGrid" />
</mat-chip-grid>`,

    styled: `<mat-chip-set>
  <mat-chip color="primary">Primary</mat-chip>
  <mat-chip color="accent">Accent</mat-chip>
  <mat-chip color="warn">Warn</mat-chip>
</mat-chip-set>`
  };
}
