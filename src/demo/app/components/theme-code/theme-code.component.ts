import { Component, ViewEncapsulation, SecurityContext } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'amw-demo-theme-code',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './theme-code.component.html',
  styleUrl: './theme-code.component.scss'
})
export class ThemeCodeComponent {
  editableCode = {
    colorPalette: '',
    cssVariables: '',
    componentTheming: '',
    darkMode: '',
    customTheme: ''
  };

  renderedHtml: Record<string, SafeHtml> = {};
  errors: Record<string, string> = {};
  highlightedCode: Record<string, string> = {};

  constructor(private sanitizer: DomSanitizer) {
    this.editableCode.colorPalette = this.codeExamples.colorPalette;
    this.editableCode.cssVariables = this.codeExamples.cssVariables;
    this.editableCode.componentTheming = this.codeExamples.componentTheming;
    this.editableCode.darkMode = this.codeExamples.darkMode;
    this.editableCode.customTheme = this.codeExamples.customTheme;
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
    const keys: Array<keyof typeof this.codeExamples> = ['colorPalette', 'cssVariables', 'componentTheming', 'darkMode', 'customTheme'];
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
    colorPalette: `<!-- Using Material theme colors -->
<button mat-raised-button color="primary">Primary</button>
<button mat-raised-button color="accent">Accent</button>
<button mat-raised-button color="warn">Warn</button>`,

    cssVariables: `<!-- Using CSS variables in components -->
<div style="
  background-color: var(--mdc-theme-primary);
  color: var(--mdc-theme-on-primary);
  padding: 16px;
  border-radius: 8px;">
  Themed Container
</div>`,

    componentTheming: `<!-- Component-specific theming -->
<mat-card>
  <mat-card-header>
    <mat-card-title>Themed Card</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    Content styled with theme colors
  </mat-card-content>
  <mat-card-actions>
    <button mat-button color="primary">Action</button>
  </mat-card-actions>
</mat-card>`,

    darkMode: `<!-- Dark mode implementation -->
<div class="dark-theme">
  <mat-card>
    <mat-card-content>
      This content adapts to dark theme
    </mat-card-content>
  </mat-card>
</div>`,

    customTheme: `<!-- Custom theme example -->
<style>
  .custom-theme {
    --mdc-theme-primary: #ff5722;
    --mdc-theme-on-primary: #ffffff;
  }
</style>
<div class="custom-theme">
  <button mat-raised-button color="primary">
    Custom Primary Color
  </button>
</div>`
  };
}
