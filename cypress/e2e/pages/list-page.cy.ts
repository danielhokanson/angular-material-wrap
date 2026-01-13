/// <reference types="cypress" />

describe('AMW List Page', () => {
  beforeEach(() => {
    cy.visit('/pages/list');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the List Page demo', () => {
      cy.get('h1').should('contain.text', 'List');
    });

    it('should display page description', () => {
      cy.get('.list-page-demo__header p').should('contain.text', 'AMW List Page');
    });

    it('should have list page component', () => {
      cy.get('amw-list-page').should('exist');
    });
  });

  describe('View Tabs', () => {
    it('should have view tabs', () => {
      cy.get('amw-tabs').should('exist');
    });

    it('should have Basic View tab', () => {
      cy.get('amw-tab').contains('Basic View').should('exist');
    });

    it('should have Advanced View tab', () => {
      cy.get('amw-tab').contains('Advanced View').should('exist');
    });

    it('should switch between views', () => {
      cy.get('.amw-tabs__tab, amw-tab').contains('Advanced View').click();
      cy.get('.list-page-demo__tab-content').should('contain.text', 'all features');
    });
  });

  describe('List Page Component', () => {
    it('should display data table', () => {
      cy.get('amw-list-page table, amw-list-page .mat-mdc-table, amw-data-table').should('exist');
    });

    it('should have search functionality', () => {
      cy.get('amw-list-page input, .amw-list-page__search').should('exist');
    });

    it('should have pagination', () => {
      cy.get('amw-list-page .mat-mdc-paginator, mat-paginator').should('exist');
    });
  });

  describe('Data Display', () => {
    it('should display data rows', () => {
      cy.get('amw-list-page .mat-mdc-row, amw-list-page tr').should('have.length.at.least', 1);
    });

    it('should display column headers', () => {
      cy.get('amw-list-page .mat-mdc-header-cell, amw-list-page th').should('have.length.at.least', 1);
    });
  });

  describe('Demo Information Card', () => {
    it('should display info card', () => {
      cy.get('.list-page-demo__info-card').should('exist');
    });

    it('should display features list', () => {
      cy.get('.list-page-demo__info-content ul li').should('have.length.at.least', 5);
    });

    it('should mention real-time search', () => {
      cy.get('.list-page-demo__info-content').should('contain.text', 'search');
    });

    it('should mention filtering', () => {
      cy.get('.list-page-demo__info-content').should('contain.text', 'filter');
    });

    it('should mention sorting', () => {
      cy.get('.list-page-demo__info-content').should('contain.text', 'sort');
    });

    it('should mention pagination', () => {
      cy.get('.list-page-demo__info-content').should('contain.text', 'Pagination');
    });

    it('should mention bulk operations', () => {
      cy.get('.list-page-demo__info-content').should('contain.text', 'Bulk');
    });

    it('should display selected items section', () => {
      cy.get('.list-page-demo__info-section').should('contain.text', 'Selected Items');
    });
  });

  describe('Interactions', () => {
    it('should allow row selection', () => {
      cy.get('amw-list-page .mat-mdc-row, amw-list-page tr').first().click();
    });

    it('should allow sorting by column', () => {
      cy.get('amw-list-page .mat-sort-header, amw-list-page th').first().click();
    });

    it('should allow pagination', () => {
      cy.get('.mat-mdc-paginator-navigation-next').should('exist');
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      cy.get('h1').should('exist');
      cy.get('h2').should('exist');
      cy.get('h4').should('have.length.at.least', 2);
    });

    it('should have accessible table structure', () => {
      cy.get('table, .mat-mdc-table').should('exist');
    });

    it('should have accessible pagination', () => {
      cy.get('mat-paginator').should('exist');
    });
  });
});
