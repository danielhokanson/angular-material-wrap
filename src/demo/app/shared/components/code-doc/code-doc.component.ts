import { Component, Input, ViewEncapsulation, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwIconComponent } from '../../../../../library/src/components/components';
import { AmwButtonComponent } from '../../../../../library/src/controls/components/amw-button/amw-button.component';

/**
 * Represents a single code example with its code and optional preview template
 */
export interface CodeExample {
  /** Unique key for the example */
  key: string;
  /** Display title for the accordion header */
  title: string;
  /** Description shown in the accordion header */
  description: string;
  /** The code to display in the editor */
  code: string;
}

/**
 * Shared component for Code tab display
 * Provides consistent accordion-based code examples with live previews
 *
 * Usage:
 * ```html
 * <amw-code-doc
 *   [examples]="codeExamples"
 *   [editableCode]="editableCode"
 *   (resetCode)="resetCode($event)"
 *   (codeChange)="onCodeChange($event)">
 *
 *   <ng-template #preview let-example>
 *     @switch (example.key) {
 *       @case ('basic') {
 *         <amw-button>Basic</amw-button>
 *       }
 *     }
 *   </ng-template>
 * </amw-code-doc>
 * ```
 */
@Component({
  selector: 'amw-code-doc',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AmwAccordionComponent,
    AmwAccordionPanelComponent,
    AmwIconComponent,
    AmwButtonComponent
  ],
  templateUrl: './code-doc.component.html',
  styleUrl: './code-doc.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AmwCodeDocComponent {
  /** Component name for the header */
  @Input() componentName = '';

  /** Array of code examples to display */
  @Input() examples: CodeExample[] = [];

  /** Editable code object - keys match example keys */
  @Input() editableCode: Record<string, string> = {};

  /** Template for rendering the preview for each example */
  @ContentChild('preview') previewTemplate?: TemplateRef<{ $implicit: CodeExample }>;

  /** Reset a single code example */
  onResetCode(example: CodeExample): void {
    this.editableCode[example.key] = example.code;
  }

  /** Reset all code examples */
  onResetAllCode(): void {
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
  }

  /** Update editable code when textarea changes */
  onCodeChange(key: string, value: string): void {
    this.editableCode[key] = value;
  }
}
