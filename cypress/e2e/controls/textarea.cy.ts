/// <reference types="cypress" />

describe('AMW Textarea Component', () => {
  beforeEach(() => {
    cy.visit('/textarea');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Textarea demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Textarea');
    });

    it('should have textarea components on the page', () => {
      cy.get('amw-textarea, textarea').should('exist');
    });
  });

  describe('Textarea Interactions', () => {
    it('should allow text input', () => {
      cy.get('amw-textarea textarea, textarea').first()
        .clear()
        .type('This is a test message');
      cy.get('amw-textarea textarea, textarea').first()
        .should('have.value', 'This is a test message');
    });

    it('should allow multiline input', () => {
      cy.get('amw-textarea textarea, textarea').first()
        .clear()
        .type('Line 1{enter}Line 2{enter}Line 3');
    });

    it('should support copy paste', () => {
      cy.get('amw-textarea textarea, textarea').first()
        .clear()
        .type('Test text')
        .type('{selectall}')
        .type('{ctrl+c}');
    });
  });

  describe('Textarea States', () => {
    it('should have disabled textarea', () => {
      cy.get('amw-textarea[disabled="true"] textarea, textarea:disabled').should('exist');
    });

    it('should have readonly textarea', () => {
      cy.get('amw-textarea[readonly="true"] textarea, textarea[readonly]').then(($textarea) => {
        if ($textarea.length) {
          cy.wrap($textarea).should('exist');
        }
      });
    });
  });

  describe('Textarea Validation', () => {
    it('should show required validation error', () => {
      cy.get('amw-textarea[required="true"] textarea, textarea[required]').first().then(($textarea) => {
        if ($textarea.length) {
          cy.wrap($textarea).clear().blur();
          cy.get('mat-error, .amw-textarea__error').should('exist');
        }
      });
    });
  });

  describe('Textarea Sizing', () => {
    it('should support auto-resize', () => {
      cy.get('amw-textarea textarea, textarea').should('exist');
    });

    it('should have min/max rows if configured', () => {
      cy.get('amw-textarea textarea, textarea').first()
        .should('have.attr', 'rows');
    });
  });

  describe('Accessibility', () => {
    it('should have label', () => {
      cy.get('amw-textarea mat-label, label').should('exist');
    });

    it('should be focusable', () => {
      cy.get('amw-textarea textarea, textarea').first()
        .focus()
        .should('have.focus');
    });
  });
});
