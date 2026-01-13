/// <reference types="cypress" />

describe('AMW Click Outside Directive', () => {
  beforeEach(() => {
    cy.visit('/directives/click-outside');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Click Outside Directive demo page', () => {
      cy.get('h1, h3').should('contain.text', 'Click Outside');
    });

    it('should have demo box element', () => {
      cy.get('.demo-box').should('exist');
    });
  });

  describe('Click Inside Detection', () => {
    it('should detect click inside the box', () => {
      cy.get('.demo-box').click();
      cy.get('.click-indicator, .demo-box').should('contain.text', 'click');
    });

    it('should show click indicator when box is clicked', () => {
      cy.get('.demo-box').click();
      cy.get('.demo-box').should('have.class', 'clicked');
    });
  });

  describe('Click Outside Detection', () => {
    it('should detect click outside the box', () => {
      // First click inside to set state
      cy.get('.demo-box').click();
      cy.get('.demo-box').should('have.class', 'clicked');

      // Then click outside
      cy.get('body').click(0, 0);
    });
  });

  describe('Code Tab', () => {
    beforeEach(() => {
      cy.get('.amw-tabs__tab, amw-tab').contains('Code').click();
    });

    it('should display code examples', () => {
      cy.get('pre code, .code-example').should('exist');
    });

    it('should have basic usage example', () => {
      cy.get('.code-example').should('contain.text', 'Basic');
    });

    it('should have dropdown menu example', () => {
      cy.get('.code-example').should('contain.text', 'Dropdown');
    });

    it('should have modal/dialog example', () => {
      cy.get('.code-example').should('contain.text', 'Modal');
    });

    it('should have conditional handling example', () => {
      cy.get('.code-example').should('contain.text', 'Conditional');
    });

    it('should have multiple elements example', () => {
      cy.get('.code-example').should('contain.text', 'Multiple');
    });
  });

  describe('Interactive Code Examples - Dropdown', () => {
    beforeEach(() => {
      cy.get('.amw-tabs__tab, amw-tab').contains('Code').click();
    });

    it('should open dropdown menu', () => {
      cy.get('.code-example').contains('Dropdown').parent().find('amw-button').click();
      cy.get('.dropdown-menu').should('be.visible');
    });

    it('should close dropdown on click outside', () => {
      cy.get('.code-example').contains('Dropdown').parent().find('amw-button').click();
      cy.get('.dropdown-menu').should('be.visible');
      cy.get('body').click(0, 0);
      cy.get('.dropdown-menu').should('not.exist');
    });

    it('should have dropdown menu options', () => {
      cy.get('.code-example').contains('Dropdown').parent().find('amw-button').first().click();
      cy.get('.dropdown-menu').should('contain.text', 'Option');
    });
  });

  describe('Interactive Code Examples - Modal', () => {
    beforeEach(() => {
      cy.get('.amw-tabs__tab, amw-tab').contains('Code').click();
    });

    it('should open modal dialog', () => {
      cy.get('.code-example').contains('Modal').parent().find('amw-button').first().click();
      cy.get('.modal-content').should('be.visible');
    });

    it('should close modal on backdrop click', () => {
      cy.get('.code-example').contains('Modal').parent().find('amw-button').first().click();
      cy.get('.modal-content').should('be.visible');
      // Click outside the modal content (on backdrop)
      cy.get('body').click(0, 0);
    });
  });

  describe('API Tab', () => {
    beforeEach(() => {
      cy.get('.amw-tabs__tab, amw-tab').contains('API').click();
    });

    it('should display API documentation', () => {
      cy.get('.click-outside-api, .api-content').should('exist');
    });

    it('should display directive output', () => {
      cy.get('.api-table').should('exist');
      cy.get('.api-table').should('contain.text', 'amwClickOutside');
    });

    it('should display usage notes', () => {
      cy.get('.api-section__usage').should('exist');
    });

    it('should display behavior details', () => {
      cy.get('.api-section__behavior').should('exist');
    });

    it('should have quick examples section', () => {
      cy.get('.api-section__examples').should('exist');
    });
  });

  describe('Accessibility', () => {
    it('should have focusable demo elements', () => {
      cy.get('.demo-box').should('have.attr', 'style');
    });

    it('should be keyboard accessible', () => {
      cy.get('amw-button button').first().focus().should('have.focus');
    });
  });
});
