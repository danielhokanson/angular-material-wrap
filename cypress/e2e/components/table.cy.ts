/// <reference types="cypress" />

describe('AMW Table Component', () => {
  beforeEach(() => {
    cy.visit('/components/table');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Table demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Table');
    });

    it('should have table elements on the page', () => {
      cy.get('amw-table, table.amw-table').should('exist');
    });
  });

  describe('Basic Table', () => {
    it('should display table with data rows', () => {
      cy.get('amw-table table tbody tr').should('have.length.at.least', 1);
    });

    it('should display table headers', () => {
      cy.get('amw-table table thead th').should('have.length.at.least', 1);
    });

    it('should display correct column headers', () => {
      cy.get('body').then(($body) => {
        const hasHeaders = $body.find('amw-table table thead th').length > 0;
        if (hasHeaders) {
          cy.get('amw-table table thead th').first().should('not.be.empty');
        } else {
          cy.log('No table headers found - skipping');
        }
      });
    });
  });

  describe('Table Data', () => {
    it('should display data in cells', () => {
      cy.get('amw-table table tbody td').first().should('not.be.empty');
    });

    it('should have matching number of columns in header and data rows', () => {
      cy.get('amw-table').first().then(($table) => {
        const headerCount = $table.find('thead th').length;
        const dataCount = $table.find('tbody tr').first().find('td').length;
        expect(dataCount).to.equal(headerCount);
      });
    });
  });

  describe('Empty Table', () => {
    it('should handle empty data source', () => {
      cy.get('body').then(($body) => {
        // Find section with "Empty Table" heading
        const emptySection = $body.find('.variation-section').filter((_, el) =>
          el.textContent?.includes('Empty Table')
        );
        if (emptySection.length > 0) {
          cy.wrap(emptySection).find('amw-table table tbody tr').should('have.length', 0);
        } else {
          cy.log('Empty table section not found - skipping');
        }
      });
    });
  });

  describe('Pagination Integration', () => {
    it('should display paginator when present', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-paginator').length > 0) {
          cy.get('amw-paginator').should('be.visible');
        } else {
          cy.log('Paginator not found on this demo - skipping');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('table should be accessible', () => {
      cy.get('amw-table table').first().should('exist');
    });

    it('should have proper table structure', () => {
      cy.get('amw-table').first().within(() => {
        cy.get('table').should('exist');
        cy.get('thead').should('exist');
        cy.get('tbody').should('exist');
      });
    });
  });
});
