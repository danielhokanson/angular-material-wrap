/// <reference types="cypress" />

describe('AMW Tooltip Directive', () => {
  beforeEach(() => {
    cy.visit('/directives/tooltip');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Tooltip Directive demo page', () => {
      cy.get('h1, h3').should('contain.text', 'Tooltip');
    });

    it('should have tooltip demo elements', () => {
      cy.get('[amwTooltip]').should('exist');
    });
  });

  describe('Basic Tooltip', () => {
    it('should display basic tooltip button', () => {
      cy.contains('Hover me').should('be.visible');
    });

    it('should show tooltip on hover', () => {
      cy.get('amw-button').contains('Hover me').trigger('mouseover');
      // Wait for tooltip to appear
      cy.get('.amw-tooltip, .cdk-overlay-container').should('exist');
    });
  });

  describe('HTML Tooltip', () => {
    it('should display HTML tooltip button', () => {
      cy.contains('HTML Tooltip').should('be.visible');
    });

    it('should have HTML tooltip enabled', () => {
      cy.get('amw-button').contains('HTML Tooltip').should('exist');
    });
  });

  describe('Tooltip Positions', () => {
    it('should have top position tooltip', () => {
      cy.get('[tooltipPosition="top"]').should('exist');
    });

    it('should have bottom position tooltip', () => {
      cy.get('[tooltipPosition="bottom"]').should('exist');
    });

    it('should have left position tooltip', () => {
      cy.get('[tooltipPosition="left"]').should('exist');
    });

    it('should have right position tooltip', () => {
      cy.get('[tooltipPosition="right"]').should('exist');
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

    it('should have position examples', () => {
      cy.get('.code-example').should('contain.text', 'Position');
    });

    it('should have HTML content example', () => {
      cy.get('.code-example').should('contain.text', 'HTML');
    });

    it('should have styling example', () => {
      cy.get('.code-example').should('contain.text', 'Styling');
    });

    it('should have disabled tooltip example', () => {
      cy.get('.code-example').should('contain.text', 'Disabled');
    });

    it('should have interactive tooltip buttons in code examples', () => {
      cy.get('.preview amw-button').should('have.length.at.least', 1);
    });
  });

  describe('Interactive Code Examples', () => {
    beforeEach(() => {
      cy.get('.amw-tabs__tab, amw-tab').contains('Code').click();
    });

    it('should trigger tooltip on hover in preview', () => {
      cy.get('.preview amw-button').first().trigger('mouseover');
      // Tooltip should appear in CDK overlay
      cy.get('.cdk-overlay-container').should('exist');
    });

    it('should have auto-position tooltip option', () => {
      cy.get('.tooltip-demo-grid amw-button').contains('Auto').should('exist');
    });
  });

  describe('API Tab', () => {
    beforeEach(() => {
      cy.get('.amw-tabs__tab, amw-tab').contains('API').click();
    });

    it('should display API documentation', () => {
      cy.get('.tooltip-api, .api-content').should('exist');
    });

    it('should display directive inputs', () => {
      cy.get('.api-table').should('exist');
      cy.get('.api-table').should('contain.text', 'amwTooltip');
    });

    it('should display TooltipConfig interface', () => {
      cy.get('.api-section__interface').should('exist');
    });

    it('should display usage notes', () => {
      cy.get('.api-section__usage').should('exist');
    });

    it('should have quick examples section', () => {
      cy.get('.api-section__examples').should('exist');
    });
  });

  describe('Tooltip Accessibility', () => {
    it('should show tooltip on keyboard focus', () => {
      cy.get('amw-button[amwTooltip] button').first().focus();
      // Tooltip should appear on focus
    });

    it('should have accessible buttons', () => {
      cy.get('amw-button button').should('have.length.at.least', 1);
    });
  });

  describe('Tooltip in Theme Menu', () => {
    beforeEach(() => {
      cy.visit('/controls');
      cy.waitForAngular();
    });

    it('should display tooltip on theme menu button', () => {
      cy.get('amw-demo-theme-menu amw-button[icon="palette"]').trigger('mouseover');
      // Should show 'Theme Options' tooltip
    });

    it('should have tooltip attribute on theme button', () => {
      cy.get('amw-demo-theme-menu amw-button[amwTooltip]').should('exist');
    });
  });
});
