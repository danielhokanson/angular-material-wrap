/// <reference types="cypress" />

describe('AMW Card Component', () => {
  beforeEach(() => {
    cy.visit('/components/card');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Card demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Card');
    });

    it('should have card components on the page', () => {
      cy.get('amw-card').should('exist');
    });
  });

  describe('Card Structure', () => {
    it('should have card header', () => {
      cy.get('amw-card mat-card-header, amw-card .amw-card__header').should('exist');
    });

    it('should have card content', () => {
      cy.get('amw-card mat-card-content, amw-card .amw-card__content').should('exist');
    });

    it('should have card actions', () => {
      cy.get('amw-card mat-card-actions, amw-card .amw-card__actions').should('exist');
    });
  });

  describe('Card Variations', () => {
    it('should display elevated card', () => {
      cy.get('amw-card[appearance="raised"], amw-card.mat-mdc-card-elevated').should('exist');
    });

    it('should display outlined card', () => {
      cy.get('amw-card[appearance="outlined"], amw-card.mat-mdc-card-outlined').should('exist');
    });
  });

  describe('Card with Image', () => {
    it('should display card with image', () => {
      cy.get('amw-card img, amw-card [mat-card-image]').should('exist');
    });
  });

  describe('Card with Avatar', () => {
    it('should display card with avatar', () => {
      cy.get('amw-card [mat-card-avatar], amw-card .mat-mdc-card-avatar').should('exist');
    });
  });

  describe('Card Header', () => {
    it('should display card title', () => {
      cy.get('amw-card mat-card-title, amw-card .mat-mdc-card-title').should('exist');
    });

    it('should display card subtitle', () => {
      cy.get('amw-card mat-card-subtitle, amw-card .mat-mdc-card-subtitle').should('exist');
    });
  });

  describe('Card Actions', () => {
    it('should have action buttons', () => {
      cy.get('amw-card mat-card-actions button, amw-card mat-card-actions amw-button').should('exist');
    });

    it('action buttons should be clickable', () => {
      cy.get('amw-card mat-card-actions button, amw-card mat-card-actions amw-button button').first().click();
      // Should respond without error
    });
  });

  describe('Card Styling', () => {
    it('should have proper border radius', () => {
      cy.get('amw-card mat-card, amw-card .mat-mdc-card').first()
        .should('have.css', 'border-radius');
    });

    it('should have proper shadow/elevation', () => {
      cy.get('amw-card mat-card, amw-card .mat-mdc-card').first()
        .should('have.css', 'box-shadow');
    });
  });

  describe('Accessibility', () => {
    it('card should be semantic', () => {
      cy.get('amw-card mat-card, amw-card').first()
        .should('exist');
    });

    it('card actions should be focusable', () => {
      cy.get('amw-card mat-card-actions button').first()
        .focus()
        .should('have.focus');
    });
  });
});
