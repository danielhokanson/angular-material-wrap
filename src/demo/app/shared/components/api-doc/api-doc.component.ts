import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ApiDocumentation,
  ApiInput,
  ApiOutput,
  ApiMethod,
  ApiProperty,
} from '../../../components/base/base-api.component';

/**
 * Interface for API interface property documentation
 */
export interface ApiInterfaceProperty {
  name: string;
  type: string;
  description: string;
}

/**
 * Interface for API interface documentation
 */
export interface ApiInterface {
  name: string;
  description: string;
  properties: ApiInterfaceProperty[];
}

/**
 * Shared component for displaying API documentation
 * Used by all *-api demo components to ensure consistent formatting
 */
@Component({
  selector: 'amw-api-doc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-doc.component.html',
  styleUrl: './api-doc.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AmwApiDocComponent {
  /** The component name to display in the title */
  @Input() componentName = '';

  /** The API documentation to display */
  @Input() apiDocumentation: ApiDocumentation = {};

  /** Optional interfaces to document */
  @Input() interfaces: ApiInterface[] = [];

  /** Optional description override */
  @Input() description = '';

  /** Get computed description */
  get computedDescription(): string {
    if (this.description) {
      return this.description;
    }
    return `Complete reference for the ${this.componentName} component properties, events, and usage.`;
  }
}
