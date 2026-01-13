/// <reference types="cypress" />

describe('AMW Popover Component', () => {
  beforeEach(() => {
    cy.visit('/popover');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Popover demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Popover');
    });

    it('should have popover trigger buttons', () => {
      cy.get('amw-popover .amw-popover__trigger, amw-popover amw-button').should('exist');
    });
  });

  describe('Opening Popover', () => {
    it('should open popover on click', () => {
      cy.get('amw-popover .amw-popover__trigger, amw-popover amw-button').first().click();
      cy.get('.amw-popover__popover').should('be.visible');
    });

    it('should display popover content', () => {
      cy.get('amw-popover .amw-popover__trigger, amw-popover amw-button').first().click();
      cy.get('.amw-popover__content').should('be.visible');
    });
  });

  describe('Closing Popover', () => {
    beforeEach(() => {
      cy.get('amw-popover .amw-popover__trigger, amw-popover amw-button').first().click();
      cy.get('.amw-popover__popover').should('be.visible');
    });

    it('should close popover with close button', () => {
      cy.get('.amw-popover__close button, .amw-popover__header button').first().click();
      cy.get('.amw-popover__popover').should('not.exist');
    });

    it('should close popover on outside click', () => {
      cy.get('body').click(0, 0);
      cy.get('.amw-popover__popover').should('not.exist');
    });

    it('should close popover with Escape key', () => {
      cy.get('body').type('{esc}');
      cy.get('.amw-popover__popover').should('not.exist');
    });
  });

  describe('Popover Structure', () => {
    beforeEach(() => {
      cy.get('amw-popover[showHeader="true"] .amw-popover__trigger, amw-popover[showHeader="true"] amw-button').first().click();
      cy.get('.amw-popover__popover').should('be.visible');
    });

    it('should have popover header', () => {
      cy.get('.amw-popover__header').should('exist');
    });

    it('should display header title', () => {
      cy.get('.amw-popover__header-title').should('exist');
    });

    it('should display header subtitle', () => {
      cy.get('.amw-popover__header-subtitle').should('exist');
    });

    it('should have popover content area', () => {
      cy.get('.amw-popover__content').should('exist');
    });
  });

  describe('Popover Positions', () => {
    it('should support top position', () => {
      cy.get('amw-popover[position="top"] .amw-popover__trigger').first().click();
      cy.get('.amw-popover__popover').should('be.visible');
      cy.get('body').type('{esc}');
    });

    it('should support bottom position', () => {
      cy.get('amw-popover[position="bottom"] .amw-popover__trigger').first().click();
      cy.get('.amw-popover__popover').should('be.visible');
      cy.get('body').type('{esc}');
    });

    it('should support left position', () => {
      cy.get('amw-popover[position="left"] .amw-popover__trigger').first().click();
      cy.get('.amw-popover__popover').should('be.visible');
      cy.get('body').type('{esc}');
    });

    it('should support right position', () => {
      cy.get('amw-popover[position="right"] .amw-popover__trigger').first().click();
      cy.get('.amw-popover__popover').should('be.visible');
      cy.get('body').type('{esc}');
    });
  });

  describe('Popover Sizes', () => {
    it('should support small size', () => {
      cy.get('amw-popover[size="small"] .amw-popover__trigger').first().click();
      cy.get('.amw-popover__popover--small').should('be.visible');
      cy.get('body').type('{esc}');
    });

    it('should support medium size', () => {
      cy.get('amw-popover[size="medium"] .amw-popover__trigger').first().click();
      cy.get('.amw-popover__popover--medium').should('be.visible');
      cy.get('body').type('{esc}');
    });

    it('should support large size', () => {
      cy.get('amw-popover[size="large"] .amw-popover__trigger').first().click();
      cy.get('.amw-popover__popover--large').should('be.visible');
      cy.get('body').type('{esc}');
    });

    it('should support extra-large size', () => {
      cy.get('amw-popover[size="extra-large"] .amw-popover__trigger').first().click();
      cy.get('.amw-popover__popover--extra-large').should('be.visible');
      cy.get('body').type('{esc}');
    });
  });

  describe('Popover with Arrow', () => {
    it('should display arrow when configured', () => {
      cy.get('amw-popover[showArrow="true"] .amw-popover__trigger').first().click();
      cy.get('.amw-popover__arrow').should('exist');
      cy.get('body').type('{esc}');
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      cy.get('amw-popover .amw-popover__trigger, amw-popover amw-button').first().click();
      cy.get('.amw-popover__popover').should('be.visible');
    });

    it('popover should have dialog role', () => {
      cy.get('.amw-popover__popover[role="dialog"]').should('exist');
    });

    it('trigger should have aria-expanded attribute', () => {
      cy.get('amw-popover .amw-popover__trigger[aria-expanded], amw-popover button[aria-expanded]')
        .should('exist');
    });

    it('should be keyboard accessible', () => {
      cy.get('.amw-popover__close button').first()
        .focus()
        .should('have.focus');
    });
  });
});
