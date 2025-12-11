import { Component, ViewEncapsulation, SecurityContext } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'amw-demo-accordion-code',
  standalone: true,
  imports: [
    FormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './accordion-code.component.html',
  styleUrl: './accordion-code.component.scss'
})
export class AccordionCodeComponent {
  // State for live previews
  step = 0;

  // Editable code examples - these will be bound to textareas
  editableCode = {
    basic: '',
    multiExpand: '',
    hideToggle: '',
    disabled: '',
    programmatic: '',
    events: '',
    togglePosition: ''
  };

  // Rendered HTML for previews
  renderedHtml: Record<string, SafeHtml> = {};

  // Error tracking
  errors: Record<string, string> = {};

  // Syntax highlighting cache
  highlightedCode: Record<string, string> = {};

  constructor(private sanitizer: DomSanitizer) {
    // Initialize editable code with original examples
    this.editableCode.basic = this.codeExamples.basic;
    this.editableCode.multiExpand = this.codeExamples.multiExpand;
    this.editableCode.hideToggle = this.codeExamples.hideToggle;
    this.editableCode.disabled = this.codeExamples.disabled;
    this.editableCode.programmatic = this.codeExamples.programmatic;
    this.editableCode.events = this.codeExamples.events;
    this.editableCode.togglePosition = this.codeExamples.togglePosition;

    // Initialize rendered HTML
    this.updateAllPreviews();
  }

  // Event handlers for event example
  onOpened() {
    console.log('Panel opened');
  }

  onClosed() {
    console.log('Panel closed');
  }

  onAfterExpand() {
    console.log('Expansion animation complete');
  }

  onAfterCollapse() {
    console.log('Collapse animation complete');
  }

  resetCode(exampleKey: keyof typeof this.codeExamples) {
    this.editableCode[exampleKey] = this.codeExamples[exampleKey];
    this.updatePreview(exampleKey);
  }

  onCodeChange(exampleKey: keyof typeof this.codeExamples) {
    this.updatePreview(exampleKey);
    this.highlightSyntax(exampleKey);
  }

  private updatePreview(exampleKey: keyof typeof this.codeExamples) {
    const code = this.editableCode[exampleKey];

    try {
      // Validate HTML structure
      this.validateHtml(code);

      // Sanitize and render HTML
      const sanitized = this.sanitizer.sanitize(SecurityContext.HTML, code);
      if (sanitized) {
        this.renderedHtml[exampleKey] = this.sanitizer.bypassSecurityTrustHtml(sanitized);
        this.errors[exampleKey] = '';
      }
    } catch (error) {
      this.errors[exampleKey] = error instanceof Error ? error.message : 'Invalid HTML';
      console.error(`Error rendering ${exampleKey}:`, error);
    }
  }

  private updateAllPreviews() {
    const keys: Array<keyof typeof this.codeExamples> = [
      'basic', 'multiExpand', 'hideToggle', 'disabled',
      'programmatic', 'events', 'togglePosition'
    ];

    keys.forEach(key => {
      this.updatePreview(key);
      this.highlightSyntax(key);
    });
  }

  private validateHtml(html: string): void {
    // Basic HTML validation
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Check for parsing errors
    const parserError = doc.querySelector('parsererror');
    if (parserError) {
      throw new Error('HTML parsing error: Invalid syntax');
    }

    // Check for balanced tags
    const openTags = (html.match(/<[^/][^>]*>/g) || []).length;
    const closeTags = (html.match(/<\/[^>]+>/g) || []).length;
    const selfClosing = (html.match(/<[^>]+\/>/g) || []).length;

    if (openTags - selfClosing !== closeTags) {
      throw new Error('Unbalanced HTML tags detected');
    }
  }

  private highlightSyntax(exampleKey: keyof typeof this.codeExamples) {
    const code = this.editableCode[exampleKey];

    // Simple syntax highlighting
    let highlighted = code
      // Tags
      .replace(/(&lt;|<)(\/?[\w-]+)((?:\s+[\w-]+(?:=(?:"[^"]*"|'[^']*'))?)*)(\/?)(&gt;|>)/g,
        (match, lt, tag, attrs, slash, gt) => {
          const tagColor = '#569cd6';
          const attrColor = '#9cdcfe';

          let result = `<span style="color: #808080">${lt}</span>`;
          result += `<span style="color: ${tagColor}">${tag}</span>`;

          if (attrs) {
            result += attrs.replace(/([\w-]+)(?:=(?:"([^"]*)"|'([^']*)'))?/g,
              (m: string, attr: string, val1: string, val2: string) => {
                const val = val1 || val2;
                return `<span style="color: ${attrColor}"> ${attr}</span>${val ? `=<span style="color: #ce9178">"${val}"</span>` : ''}`;
              });
          }

          if (slash) result += `<span style="color: #808080">${slash}</span>`;
          result += `<span style="color: #808080">${gt}</span>`;

          return result;
        })
      // Comments
      .replace(/(&lt;!--|<!-)-(.*?)(-&gt;|-->)/g,
        '<span style="color: #6a9955">$1$2$3</span>');

    this.highlightedCode[exampleKey] = highlighted;
  }

  getHighlightedCode(exampleKey: keyof typeof this.codeExamples): string {
    return this.highlightedCode[exampleKey] || '';
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
    basic: `<mat-accordion>
  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title>Personal Information</mat-panel-title>
      <mat-panel-description>Enter your details</mat-panel-description>
    </mat-expansion-panel-header>
    <p>Panel content goes here</p>
  </mat-expansion-panel>
</mat-accordion>`,

    multiExpand: `<mat-accordion [multi]="true">
  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title>Panel 1</mat-panel-title>
    </mat-expansion-panel-header>
    <p>First panel content</p>
  </mat-expansion-panel>
  
  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title>Panel 2</mat-panel-title>
    </mat-expansion-panel-header>
    <p>Second panel content</p>
  </mat-expansion-panel>
</mat-accordion>`,

    hideToggle: `<mat-accordion>
  <mat-expansion-panel [hideToggle]="true">
    <mat-expansion-panel-header>
      <mat-panel-title>No Toggle Indicator</mat-panel-title>
    </mat-expansion-panel-header>
    <p>This panel has no toggle indicator</p>
  </mat-expansion-panel>
</mat-accordion>`,

    disabled: `<mat-accordion>
  <mat-expansion-panel [disabled]="true">
    <mat-expansion-panel-header>
      <mat-panel-title>Disabled Panel</mat-panel-title>
    </mat-expansion-panel-header>
    <p>This panel cannot be opened</p>
  </mat-expansion-panel>
</mat-accordion>`,

    programmatic: `<!-- Template -->
<mat-accordion>
  <mat-expansion-panel #myPanel>
    <mat-expansion-panel-header>
      <mat-panel-title>Controlled Panel</mat-panel-title>
    </mat-expansion-panel-header>
    <p>Panel controlled by buttons</p>
  </mat-expansion-panel>
</mat-accordion>

<button mat-button (click)="myPanel.open()">Open</button>
<button mat-button (click)="myPanel.close()">Close</button>
<button mat-button (click)="myPanel.toggle()">Toggle</button>`,

    events: `<!-- Template -->
<mat-expansion-panel
  (opened)="onOpened()"
  (closed)="onClosed()"
  (afterExpand)="onAfterExpand()"
  (afterCollapse)="onAfterCollapse()">
  <mat-expansion-panel-header>
    <mat-panel-title>Event Handling</mat-panel-title>
  </mat-expansion-panel-header>
  <p>Panel with event listeners</p>
</mat-expansion-panel>

<!-- Component -->
export class MyComponent {
  onOpened() {
    console.log('Panel opened');
  }
  
  onClosed() {
    console.log('Panel closed');
  }
  
  onAfterExpand() {
    console.log('Expansion animation complete');
  }
  
  onAfterCollapse() {
    console.log('Collapse animation complete');
  }
}`,

    togglePosition: `<mat-accordion [togglePosition]="'before'">
  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title>Toggle on Left</mat-panel-title>
    </mat-expansion-panel-header>
    <p>Toggle indicator appears before the title</p>
  </mat-expansion-panel>
</mat-accordion>`
  };
}
