/// <reference types="cypress" />

describe('AMW Pipes', () => {
  describe('Pipes Demo Page', () => {
    beforeEach(() => {
      cy.visit('/pipes');
      cy.waitForAngular();
    });

    it('should display the Pipes demo page', () => {
      cy.get('h1').should('contain.text', 'Angular Pipes');
    });

    it('should have pipe demo card', () => {
      cy.get('amw-card').should('exist');
    });

    it('should have tabs for Demo, Code, and API', () => {
      cy.get('amw-tabs').should('exist');
      cy.get('.amw-tabs__tab').should('have.length.at.least', 3);
    });
  });

  describe('Currency Pipe', () => {
    beforeEach(() => {
      cy.visit('/pipes/currency');
      cy.waitForAngular();
    });

    it('should display Currency Pipe demo', () => {
      cy.get('h2, h3').should('contain.text', 'Currency');
    });

    it('should show currency formatting result', () => {
      cy.get('.result-text, .preview p').first().should('exist');
    });

    it('should format basic USD currency', () => {
      // Check that some currency formatted value is shown
      cy.get('.preview').should('contain.text', '$');
    });

    it('should show different currencies in code examples', () => {
      // Navigate to Code tab
      cy.get('.amw-tabs__tab').contains('Code').click();
      cy.get('.preview').should('contain.text', 'USD');
      cy.get('.preview').should('contain.text', 'EUR');
    });

    it('should format amount with currency symbol', () => {
      // The preview should show formatted currency values
      cy.get('.preview, .pipe-result').should('exist');
    });

    it('should update result when input changes', () => {
      cy.get('amw-input input[type="number"]').first().then(($input) => {
        if ($input.length) {
          cy.wrap($input).clear().type('999.99');
          cy.get('.result-text, .preview').should('contain.text', '999');
        }
      });
    });
  });

  describe('Date Pipe', () => {
    beforeEach(() => {
      cy.visit('/pipes/date');
      cy.waitForAngular();
    });

    it('should display Date Pipe demo', () => {
      cy.get('h2, h3').should('contain.text', 'Date');
    });

    it('should show formatted date result', () => {
      cy.get('.result-text, .preview').should('exist');
    });

    it('should show different date formats in code tab', () => {
      // Navigate to Code tab
      cy.get('.amw-tabs__tab').contains('Code').click();
      cy.waitForAngular();

      // Should show different format examples
      cy.get('.preview').should('contain.text', 'Short');
      cy.get('.preview').should('contain.text', 'Medium');
    });

    it('should have date-related content', () => {
      // The date pipe should show some date-related text
      cy.get('.demo-content, .date-code-examples').should('exist');
    });
  });

  describe('Text Transform Pipe', () => {
    beforeEach(() => {
      cy.visit('/pipes/text-transform');
      cy.waitForAngular();
    });

    it('should display Text Transform Pipe demo', () => {
      cy.get('h2, h3').should('contain.text', 'Text Transform');
    });

    it('should show transformation results', () => {
      cy.get('.pipe-result, .preview').should('exist');
    });

    it('should show uppercase transformation', () => {
      cy.get('.pipe-result, .preview').should('contain.text', 'Uppercase');
    });

    it('should show lowercase transformation', () => {
      cy.get('.pipe-result, .preview').should('contain.text', 'Lowercase');
    });

    it('should show title case transformation', () => {
      cy.get('.pipe-result, .preview').should('contain.text', 'Title');
    });

    it('should update transformations when input changes', () => {
      cy.get('amw-input input').first().then(($input) => {
        if ($input.length) {
          cy.wrap($input).clear().type('test input');
          cy.get('.pipe-result').should('contain.text', 'TEST INPUT');
        }
      });
    });

    it('should show programming case styles in code tab', () => {
      // Navigate to Code tab
      cy.get('.amw-tabs__tab').contains('Code').click();
      cy.waitForAngular();

      cy.get('.preview').should('contain.text', 'Camel Case');
      cy.get('.preview').should('contain.text', 'Kebab Case');
      cy.get('.preview').should('contain.text', 'Snake Case');
    });
  });

  describe('Pipe API Documentation', () => {
    it('should show Currency Pipe API', () => {
      cy.visit('/pipes/currency');
      cy.waitForAngular();

      // Navigate to API tab
      cy.get('.amw-tabs__tab').contains('API').click();
      cy.waitForAngular();

      cy.get('.api-table, .api-section__parameters').should('exist');
      cy.get('.api-content, .currency-api').should('contain.text', 'Parameter');
    });

    it('should show Date Pipe API', () => {
      cy.visit('/pipes/date');
      cy.waitForAngular();

      // Navigate to API tab
      cy.get('.amw-tabs__tab').contains('API').click();
      cy.waitForAngular();

      cy.get('.api-table, .api-section__parameters').should('exist');
    });

    it('should show Text Transform Pipe API', () => {
      cy.visit('/pipes/text-transform');
      cy.waitForAngular();

      // Navigate to API tab
      cy.get('.amw-tabs__tab').contains('API').click();
      cy.waitForAngular();

      cy.get('.api-table, .api-section__transforms').should('exist');
    });
  });

  describe('Tab Navigation', () => {
    beforeEach(() => {
      cy.visit('/pipes/currency');
      cy.waitForAngular();
    });

    it('should switch to Demo tab', () => {
      cy.get('.amw-tabs__tab').contains('Demo').click();
      cy.get('.demo-content, .demo-section').should('exist');
    });

    it('should switch to Code tab', () => {
      cy.get('.amw-tabs__tab').contains('Code').click();
      cy.get('.code-content, .currency-code-examples').should('exist');
    });

    it('should switch to API tab', () => {
      cy.get('.amw-tabs__tab').contains('API').click();
      cy.get('.api-content, .currency-api').should('exist');
    });
  });
});
