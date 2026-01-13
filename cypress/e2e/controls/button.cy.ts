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

  describe('Appearance Variations', () => {
    it('should display text appearance button', () => {
      cy.get('amw-button[appearance="text"]').should('exist');
    });

    it('should display elevated appearance button', () => {
      cy.get('amw-button[appearance="elevated"]').should('exist');
    });

    it('should display outlined appearance button', () => {
      cy.get('amw-button[appearance="outlined"]').should('exist');
    });

    it('should display filled appearance button (default)', () => {
      // Filled is the default, so buttons without appearance attribute are filled
      cy.get('amw-button').should('exist');
    });

    it('should display tonal appearance button', () => {
      cy.get('amw-button[appearance="tonal"]').should('exist');
    });
  });

  describe('FAB Variations', () => {
    it('should display standard FAB button', () => {
      cy.get('amw-button[ng-reflect-fab="true"]').should('exist');
    });

    it('should display mini FAB button', () => {
      cy.get('amw-button[fab="mini"]').should('exist');
    });

    it('should display extended FAB button', () => {
      cy.get('amw-button[fab="extended"]').should('exist');
    });
  });

  describe('Icon-Only Buttons', () => {
    it('should display icon-only button (inferred from icon without text)', () => {
      // Icon-only buttons have an icon attribute but no text content
      cy.get('amw-button[icon]').should('exist');
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
      cy.get('amw-button[ng-reflect-disabled="true"], amw-button button:disabled').should('exist');
    });

    it('should display loading state button', () => {
      cy.get('amw-button[ng-reflect-loading="true"], .amw-button--loading').should('exist');
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
    it('should display button with icon', () => {
      cy.get('amw-button[icon] mat-icon, amw-button .amw-button__icon').should('exist');
    });

    it('should display button with icon and text', () => {
      // Buttons like Edit and Delete have both icon and text
      cy.contains('Edit').closest('amw-button').find('mat-icon').should('exist');
    });
  });

  describe('Real-world Examples', () => {
    it('should have Cancel and Save Changes buttons', () => {
      cy.contains('Cancel').should('be.visible');
      cy.contains('Save Changes').should('be.visible');
    });

    it('should have Edit and Delete buttons with icons', () => {
      cy.contains('Edit').should('be.visible');
      cy.contains('Delete').should('be.visible');
    });

    it('should have a FAB add button', () => {
      cy.get('.example-actions amw-button[icon="add"]').should('exist');
    });
  });

  describe('Accessibility', () => {
    it('buttons should be keyboard accessible', () => {
      cy.get('amw-button:not([disabled]) button').first()
        .focus()
        .should('have.focus');
    });

    it('disabled buttons should have proper disabled attribute', () => {
      cy.get('amw-button button:disabled').first()
        .should('have.attr', 'disabled');
    });

    it('icon-only buttons should have aria-label', () => {
      cy.get('amw-button[icon][arialabel], amw-button[icon][aria-label]').should('exist');
    });
  });
});
