import { Directive, ViewEncapsulation } from '@angular/core';

/**
 * Base class for all -code demo components
 * Provides standard structure for code examples with live previews
 */
@Directive()
export abstract class BaseCodeComponent<T extends string = string> {
  /**
   * Editable code examples that users can modify
   */
  editableCode: Record<T, string> = {} as Record<T, string>;

  /**
   * Original code examples (read-only for reset functionality)
   */
  abstract readonly codeExamples: Record<T, string>;

  /**
   * View encapsulation is None to allow global styling
   */
  protected constructor() {
    // Initialize editable code from original examples
    this.initializeEditableCode();
  }

  /**
   * Initialize editable code from code examples
   * Called automatically in constructor
   */
  protected initializeEditableCode(): void {
    if (this.codeExamples) {
      Object.keys(this.codeExamples).forEach(key => {
        this.editableCode[key as T] = this.codeExamples[key as T];
      });
    }
  }

  /**
   * Reset a specific code example to its original state
   * @param exampleKey - The key of the example to reset
   */
  resetCode(exampleKey: T): void {
    this.editableCode[exampleKey] = this.codeExamples[exampleKey];
  }

  /**
   * Reset all code examples to their original state
   */
  resetAllCode(): void {
    Object.keys(this.codeExamples).forEach(key => {
      this.editableCode[key as T] = this.codeExamples[key as T];
    });
  }
}
