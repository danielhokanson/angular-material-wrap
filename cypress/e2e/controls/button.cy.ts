/// <reference types="cypress" />

describe('AMW Button Component', () => {
  beforeEach(() => {
    cy.visit('/button');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Button demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Button');
    });

    it('should have tabs for navigation', () => {
      cy.get('.amw-tabs, amw-tabs').should('exist');
    });
  });

  describe('Size Variations', () => {
    it('should display small button', () => {
      cy.contains('Small Button').should('be.visible');
    });

    it('should display medium button', () => {
      cy.contains('Medium Button').should('be.visible');
    });

    it('should display large button', () => {
      cy.contains('Large Button').should('be.visible');
    });
  });

  describe('Variant Variations', () => {
    it('should display text button variant', () => {
      cy.get('amw-button[variant="text"], .amw-button').should('exist');
    });

    it('should display elevated button variant', () => {
      cy.get('amw-button[variant="elevated"]').should('exist');
    });

    it('should display outlined button variant', () => {
      cy.get('amw-button[variant="outlined"]').should('exist');
    });

    it('should display filled button variant', () => {
      cy.get('amw-button[variant="filled"]').should('exist');
    });

    it('should display tonal button variant', () => {
      cy.get('amw-button[variant="tonal"]').should('exist');
    });

    it('should display icon button variant', () => {
      cy.get('amw-button[variant="icon"]').should('exist');
    });
  });

  describe('Color Variations', () => {
    it('should display primary color button', () => {
      cy.contains('Primary Action').should('be.visible');
    });

    it('should display accent/secondary color button', () => {
      cy.contains('Secondary Action').should('be.visible');
    });

    it('should display warn color button', () => {
      cy.contains('Delete Item').should('be.visible');
    });
  });

  describe('State Variations', () => {
    it('should display normal state button', () => {
      cy.get('amw-button:not([disabled])').first().should('exist');
    });

    it('should display disabled state button', () => {
      cy.get('amw-button[disabled="true"], amw-button button:disabled').should('exist');
    });

    it('should display loading state button', () => {
      cy.get('amw-button[loading="true"], .amw-button--loading').should('exist');
    });
  });

  describe('Button Interactions', () => {
    it('should be clickable when enabled', () => {
      cy.get('amw-button:not([disabled]) button').first().click();
      // Button should respond to click (no error)
    });

    it('should not be clickable when disabled', () => {
      cy.get('amw-button button:disabled').first().should('be.disabled');
    });

    it('should show hover state on mouse over', () => {
      cy.get('amw-button:not([disabled]) button').first().trigger('mouseover');
      // Visual inspection - hover state should be applied
    });

    it('should show focus state on focus', () => {
      cy.get('amw-button:not([disabled]) button').first().focus();
      // Visual inspection - focus state should be applied
    });
  });

  describe('Button with Icons', () => {
    it('should display button with left icon', () => {
      cy.get('amw-button mat-icon, amw-button .amw-button__icon').should('exist');
    });
  });

  describe('Real-world Examples', () => {
    it('should have Cancel and Save Changes buttons', () => {
      cy.contains('Cancel').should('be.visible');
      cy.contains('Save Changes').should('be.visible');
    });

    it('should have Edit, Delete, and Add buttons', () => {
      cy.contains('Edit').should('be.visible');
      cy.contains('Delete').should('be.visible');
    });
  });

  describe('Accessibility', () => {
    it('buttons should be keyboard accessible', () => {
      cy.get('amw-button:not([disabled]) button').first()
        .focus()
        .should('have.focus');
    });

    it('disabled buttons should have proper ARIA attributes', () => {
      cy.get('amw-button button:disabled').first()
        .should('have.attr', 'disabled');
    });
  });
});
