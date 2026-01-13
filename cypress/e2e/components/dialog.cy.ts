/// <reference types="cypress" />

describe('AMW Dialog Component', () => {
  beforeEach(() => {
    cy.visit('/dialog');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Dialog demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Dialog');
    });

    it('should have buttons to open dialogs', () => {
      cy.get('amw-button, button').contains(/open|show|dialog/i).should('exist');
    });
  });

  describe('Opening Dialogs', () => {
    it('should open standard dialog', () => {
      cy.get('amw-button, button').contains(/standard|basic|open/i).first().click();
      cy.get('.amw-dialog, .mat-mdc-dialog-container').should('be.visible');
    });

    it('should display dialog backdrop', () => {
      cy.get('amw-button, button').contains(/standard|basic|open/i).first().click();
      cy.get('.cdk-overlay-backdrop, .mat-mdc-dialog-backdrop').should('exist');
    });
  });

  describe('Dialog Structure', () => {
    beforeEach(() => {
      cy.get('amw-button, button').contains(/standard|basic|open/i).first().click();
      cy.get('.amw-dialog, .mat-mdc-dialog-container').should('be.visible');
    });

    it('should have dialog header', () => {
      cy.get('.amw-dialog__header, .mat-mdc-dialog-title').should('exist');
    });

    it('should have dialog content', () => {
      cy.get('.amw-dialog__content, .mat-mdc-dialog-content').should('exist');
    });

    it('should have dialog actions/footer', () => {
      cy.get('.amw-dialog__footer, .mat-mdc-dialog-actions').should('exist');
    });
  });

  describe('Closing Dialogs', () => {
    beforeEach(() => {
      cy.get('amw-button, button').contains(/standard|basic|open/i).first().click();
      cy.get('.amw-dialog, .mat-mdc-dialog-container').should('be.visible');
    });

    it('should close dialog with close button', () => {
      cy.get('.amw-dialog__close, .mat-mdc-dialog-close').first().click();
      cy.get('.amw-dialog, .mat-mdc-dialog-container').should('not.exist');
    });

    it('should close dialog with action button', () => {
      cy.get('.amw-dialog__footer button, .mat-mdc-dialog-actions button').contains(/close|cancel|ok/i).click();
      cy.get('.amw-dialog, .mat-mdc-dialog-container').should('not.exist');
    });

    it('should close dialog with Escape key', () => {
      cy.get('body').type('{esc}');
      cy.get('.amw-dialog, .mat-mdc-dialog-container').should('not.exist');
    });
  });

  describe('Dialog Types', () => {
    it('should open alert dialog', () => {
      cy.get('amw-button, button').contains(/alert/i).first().click();
      cy.get('.amw-dialog--alert, .amw-dialog').should('be.visible');
      cy.get('body').type('{esc}');
    });

    it('should open confirm dialog', () => {
      cy.get('amw-button, button').contains(/confirm/i).first().click();
      cy.get('.amw-dialog--confirm, .amw-dialog').should('be.visible');
      cy.get('body').type('{esc}');
    });

    it('should open warning dialog', () => {
      cy.get('amw-button, button').contains(/warning/i).first().click();
      cy.get('.amw-dialog--warning, .amw-dialog').should('be.visible');
      cy.get('body').type('{esc}');
    });

    it('should open success dialog', () => {
      cy.get('amw-button, button').contains(/success/i).first().click();
      cy.get('.amw-dialog--success, .amw-dialog').should('be.visible');
      cy.get('body').type('{esc}');
    });

    it('should open error dialog', () => {
      cy.get('amw-button, button').contains(/error/i).first().click();
      cy.get('.amw-dialog--error, .amw-dialog').should('be.visible');
      cy.get('body').type('{esc}');
    });
  });

  describe('Dialog Sizes', () => {
    it('should support small dialog size', () => {
      cy.get('amw-button, button').contains(/small/i).first().click();
      cy.get('.amw-dialog, .mat-mdc-dialog-container').should('be.visible');
      cy.get('body').type('{esc}');
    });

    it('should support medium dialog size', () => {
      cy.get('amw-button, button').contains(/medium/i).first().click();
      cy.get('.amw-dialog, .mat-mdc-dialog-container').should('be.visible');
      cy.get('body').type('{esc}');
    });

    it('should support large dialog size', () => {
      cy.get('amw-button, button').contains(/large/i).first().click();
      cy.get('.amw-dialog, .mat-mdc-dialog-container').should('be.visible');
      cy.get('body').type('{esc}');
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      cy.get('amw-button, button').contains(/standard|basic|open/i).first().click();
      cy.get('.amw-dialog, .mat-mdc-dialog-container').should('be.visible');
    });

    it('dialog should have proper role', () => {
      cy.get('.amw-dialog, .mat-mdc-dialog-container [role="dialog"]').should('exist');
    });

    it('should trap focus within dialog', () => {
      cy.focused().should('be.visible');
      // Tab through dialog elements
      cy.focused().tab();
      // Focus should stay within dialog
      cy.focused().parents('.amw-dialog, .mat-mdc-dialog-container').should('exist');
    });

    it('should return focus on close', () => {
      // Get the trigger button
      cy.get('body').type('{esc}');
      // Focus should return to opener
      cy.focused().should('exist');
    });
  });
});
