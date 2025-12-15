import { Directive, ViewEncapsulation } from '@angular/core';

/**
 * Interface for API input documentation
 */
export interface ApiInput {
  name: string;
  type: string;
  default: string;
  description: string;
  options?: string[];
}

/**
 * Interface for API output documentation
 */
export interface ApiOutput {
  name: string;
  type: string;
  description: string;
}

/**
 * Interface for API method documentation
 */
export interface ApiMethod {
  name: string;
  returns: string;
  description: string;
  parameters?: string;
}

/**
 * Interface for complete API documentation
 */
export interface ApiDocumentation {
  inputs?: ApiInput[];
  outputs?: ApiOutput[];
  methods?: ApiMethod[];
  usageNotes?: string[];
}

/**
 * Base class for all -api demo components
 * Provides standard structure for API documentation
 */
@Directive()
export abstract class BaseApiComponent {
  /**
   * API documentation for the component
   * Contains inputs, outputs, methods, and usage notes
   */
  abstract apiDocumentation: ApiDocumentation;

  /**
   * View encapsulation is None to allow global styling
   */
  protected constructor() {}
}
