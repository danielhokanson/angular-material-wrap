/// <reference types="cypress" />

describe('AMW Signal Forms Integration', () => {
  beforeEach(() => {
    cy.visit('/controls/signal-forms');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Signal Forms demo page', () => {
      cy.get('h2, .demo-header h2').should('contain.text', 'Signal Forms');
    });

    it('should show experimental badge', () => {
      cy.get('.experimental-badge').should('exist');
    });

    it('should have form controls on the page', () => {
      cy.get('amw-input').should('exist');
      cy.get('amw-select').should('exist');
      cy.get('amw-checkbox').should('exist');
    });
  });

  describe('Signal Forms Demo Tab', () => {
    it('should display form status card', () => {
      cy.get('.status-card, .form-status').should('exist');
    });

    it('should show form values as reactive JSON', () => {
      cy.get('pre').should('exist');
    });

    it('should have submit and reset buttons', () => {
      cy.get('amw-button').contains('Submit').should('exist');
      cy.get('amw-button').contains('Reset').should('exist');
    });
  });

  describe('Text Input Fields', () => {
    it('should allow typing in first name field', () => {
      const testValue = 'John';
      cy.get('amw-input input').first()
        .clear()
        .type(testValue)
        .should('have.value', testValue);
    });

    it('should update form values display when typing', () => {
      const testValue = 'TestName';
      cy.get('amw-input input').first()
        .clear()
        .type(testValue);

      // Verify the reactive form values update
      cy.get('pre').should('contain.text', testValue);
    });

    it('should validate email field', () => {
      // Find email input and type invalid email
      cy.get('amw-input input[type="email"]').first()
        .clear()
        .type('invalid-email');

      // Form should be invalid with invalid email
      cy.get('.status-card, .form-status').should('contain.text', 'Invalid');
    });
  });

  describe('Select Field', () => {
    it('should have country select with options', () => {
      cy.get('amw-select').should('exist');
    });

    it('should allow selecting an option', () => {
      // Click to open select
      cy.get('amw-select').first().click();

      // Wait for options to appear and select one
      cy.get('mat-option').should('be.visible');
      cy.get('mat-option').first().click();

      // Verify selection is reflected in form values
      cy.get('pre').should('not.contain.text', '"country": ""');
    });
  });

  describe('Checkbox Field', () => {
    it('should have checkbox for terms agreement', () => {
      cy.get('amw-checkbox').should('exist');
    });

    it('should toggle checkbox state', () => {
      // Find and click checkbox
      cy.get('amw-checkbox input[type="checkbox"], amw-checkbox .mdc-checkbox__native-control').first().click({ force: true });

      // Verify checkbox state changed in form values
      cy.get('pre').should('contain.text', '"agreeToTerms": true');
    });
  });

  describe('Slider Field', () => {
    it('should have slider component', () => {
      cy.get('amw-slider').should('exist');
    });
  });

  describe('Toggle/Switch Fields', () => {
    it('should have toggle component', () => {
      cy.get('amw-toggle, amw-switch').should('exist');
    });
  });

  describe('Form Actions', () => {
    it('should reset form when clicking reset button', () => {
      // Type something first
      cy.get('amw-input input').first()
        .clear()
        .type('Test Value');

      // Click reset
      cy.get('amw-button').contains('Reset').click();

      // Verify input is cleared
      cy.get('amw-input input').first().should('have.value', '');
    });

    it('should disable submit when form is invalid', () => {
      // Ensure form is in invalid state (required fields empty)
      cy.get('amw-input input').first().clear();

      // Submit button should be disabled
      cy.get('amw-button').contains('Submit').should('be.disabled');
    });
  });

  describe('Form Validation Comparison Tab', () => {
    beforeEach(() => {
      // Navigate to validation tab
      cy.get('[role="tab"], .mat-mdc-tab').contains('Validation').click({ force: true });
      cy.waitForAngular();
    });

    it('should display three form binding approaches', () => {
      cy.get('.approach-card, .comparison-grid').should('exist');
    });

    it('should show ngModel approach card', () => {
      cy.get('body').should('contain.text', 'ngModel');
    });

    it('should show formControl approach card', () => {
      cy.get('body').should('contain.text', 'formControl');
    });

    it('should show field (Signal Forms) approach card', () => {
      cy.get('body').should('contain.text', 'field');
    });

    it('should highlight Signal Forms approach', () => {
      cy.get('.signal-forms, .approach-card.signal-forms').should('exist');
    });

    it('should show key differences table', () => {
      cy.get('.differences-table, table').should('exist');
    });
  });

  describe('Code Examples Tab', () => {
    beforeEach(() => {
      // Navigate to code tab
      cy.get('[role="tab"], .mat-mdc-tab').contains('Code').click({ force: true });
      cy.waitForAngular();
    });

    it('should display code examples', () => {
      cy.get('pre code, .code-block').should('exist');
    });

    it('should have example selector buttons', () => {
      cy.get('amw-button').contains('Basic').should('exist');
      cy.get('amw-button').contains('Validation').should('exist');
    });

    it('should switch code examples when clicking buttons', () => {
      // Click validation example
      cy.get('amw-button').contains('Validation').click();

      // Verify code changed
      cy.get('pre code, .code-block code').should('contain.text', 'Validators');
    });

    it('should have copy button', () => {
      cy.get('amw-button').contains('Copy').should('exist');
    });
  });

  describe('API Reference Tab', () => {
    beforeEach(() => {
      // Navigate to API tab
      cy.get('[role="tab"], .mat-mdc-tab').contains('API').click({ force: true });
      cy.waitForAngular();
    });

    it('should display API documentation', () => {
      cy.get('.api-card, .api-table').should('exist');
    });

    it('should document form() factory API', () => {
      cy.get('body').should('contain.text', 'form()');
    });

    it('should document Field API', () => {
      cy.get('body').should('contain.text', 'value()');
      cy.get('body').should('contain.text', 'valid()');
    });

    it('should list supported AMW controls', () => {
      cy.get('body').should('contain.text', 'amw-input');
      cy.get('body').should('contain.text', 'amw-select');
      cy.get('body').should('contain.text', 'amw-checkbox');
    });

    it('should show import statement', () => {
      cy.get('body').should('contain.text', "@angular/forms/signals");
    });

    it('should show usage notes', () => {
      cy.get('.notes-card, .notes-list').should('exist');
    });
  });

  describe('Accessibility', () => {
    it('should have proper form field labels', () => {
      cy.get('amw-input').each(($input) => {
        // Each input should have an associated label or aria-label
        cy.wrap($input).find('mat-label, label, [aria-label]').should('exist');
      });
    });

    it('should have keyboard navigable form fields', () => {
      // Tab through form fields
      cy.get('amw-input input').first().focus();
      cy.focused().should('exist');

      cy.focused().tab();
      cy.focused().should('exist');
    });

    it('should announce form validity state', () => {
      // Form status should be visible/readable
      cy.get('.status-card, .form-status').should('be.visible');
    });
  });
});
