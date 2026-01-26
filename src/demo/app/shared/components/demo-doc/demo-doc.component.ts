import { Component, Input, ViewEncapsulation, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Represents a variation section to display
 */
export interface VariationSection {
  /** Section title */
  title: string;
  /** Optional description */
  description?: string;
}

/**
 * Represents a variation item within a section
 */
export interface VariationItem {
  /** Label for the variation */
  label: string;
  /** Any additional data for the template */
  [key: string]: unknown;
}

/**
 * Shared component for Demo/Variations tab display
 * Provides consistent layout for component demonstrations
 *
 * Usage:
 * ```html
 * <amw-demo-doc componentName="amw-button">
 *   <ng-template #content>
 *     <!-- Your variation sections here -->
 *   </ng-template>
 * </amw-demo-doc>
 * ```
 *
 * Or with sections data:
 * ```html
 * <amw-demo-doc
 *   componentName="amw-button"
 *   [sections]="variationSections">
 *
 *   <ng-template #sectionContent let-section>
 *     @switch (section.title) {
 *       @case ('Size Variations') { ... }
 *     }
 *   </ng-template>
 * </amw-demo-doc>
 * ```
 */
@Component({
  selector: 'amw-demo-doc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './demo-doc.component.html',
  styleUrl: './demo-doc.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AmwDemoDocComponent {
  /** Component name for styling context */
  @Input() componentName = '';

  /** Title for the demo page */
  @Input() title = '';

  /** Optional description for the demo */
  @Input() description = '';

  /** Optional sections data for structured rendering */
  @Input() sections: VariationSection[] = [];

  /** Template for all content (simple usage) */
  @ContentChild('content') contentTemplate?: TemplateRef<unknown>;

  /** Template for rendering section content (data-driven usage) */
  @ContentChild('sectionContent') sectionContentTemplate?: TemplateRef<{ $implicit: VariationSection; index: number }>;

  /** Real-world example template */
  @ContentChild('realWorldExample') realWorldExampleTemplate?: TemplateRef<unknown>;

  /** Computed description with fallback */
  get computedDescription(): string {
    if (this.description) return this.description;
    return `Explore the different variations and configurations of the ${this.componentName} component.`;
  }

  /** Check if using sections mode */
  get useSectionsMode(): boolean {
    return this.sections.length > 0 && !!this.sectionContentTemplate;
  }
}
