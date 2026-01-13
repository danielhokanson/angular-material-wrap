/// <reference types="cypress" />

describe('AMW Detail Page', () => {
  beforeEach(() => {
    cy.visit('/pages/detail');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Detail Page demo', () => {
      cy.get('h1').should('contain.text', 'Detail');
    });

    it('should display page description', () => {
      cy.get('.detail-page-demo__header p').should('contain.text', 'AMW Detail Page');
    });

    it('should have detail page component', () => {
      cy.get('amw-detail-page').should('exist');
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
      cy.get('.detail-page-demo__tab-content').should('contain.text', 'print');
    });
  });

  describe('Detail Page Component', () => {
    it('should display detail content', () => {
      cy.get('amw-detail-page').should('exist');
    });

    it('should have action buttons', () => {
      cy.get('amw-detail-page amw-button, amw-detail-page button').should('have.length.at.least', 1);
    });
  });

  describe('Demo Information Card', () => {
    it('should display info card', () => {
      cy.get('.detail-page-demo__info-card').should('exist');
    });

    it('should display features list', () => {
      cy.get('.detail-page-demo__info-content ul li').should('have.length.at.least', 5);
    });

    it('should mention tabbed layouts', () => {
      cy.get('.detail-page-demo__info-content').should('contain.text', 'Tabbed');
    });

    it('should mention field actions', () => {
      cy.get('.detail-page-demo__info-content').should('contain.text', 'Field-level actions');
    });

    it('should mention custom renderers', () => {
      cy.get('.detail-page-demo__info-content').should('contain.text', 'Custom');
    });

    it('should mention related data', () => {
      cy.get('.detail-page-demo__info-content').should('contain.text', 'Related data');
    });

    it('should mention action buttons', () => {
      cy.get('.detail-page-demo__info-content').should('contain.text', 'Action buttons');
    });

    it('should mention real-time updates', () => {
      cy.get('.detail-page-demo__info-content').should('contain.text', 'Real-time');
    });
  });

  describe('Data Structure Section', () => {
    it('should describe data structure', () => {
      cy.get('.detail-page-demo__info-content').should('contain.text', 'Data Structure');
    });

    it('should mention personal information', () => {
      cy.get('.detail-page-demo__info-content').should('contain.text', 'Personal information');
    });

    it('should mention professional details', () => {
      cy.get('.detail-page-demo__info-content').should('contain.text', 'Professional details');
    });

    it('should mention compensation and benefits', () => {
      cy.get('.detail-page-demo__info-content').should('contain.text', 'Compensation');
    });

    it('should mention skills and performance', () => {
      cy.get('.detail-page-demo__info-content').should('contain.text', 'Skills');
    });

    it('should mention related projects', () => {
      cy.get('.detail-page-demo__info-content').should('contain.text', 'projects');
    });
  });

  describe('Custom Features Section', () => {
    it('should describe custom features', () => {
      cy.get('.detail-page-demo__info-content').should('contain.text', 'Custom Features');
    });

    it('should mention clickable links', () => {
      cy.get('.detail-page-demo__info-content').should('contain.text', 'Clickable');
    });

    it('should mention copyable fields', () => {
      cy.get('.detail-page-demo__info-content').should('contain.text', 'Copyable');
    });

    it('should mention status indicators', () => {
      cy.get('.detail-page-demo__info-content').should('contain.text', 'status indicators');
    });

    it('should mention collapsible sections', () => {
      cy.get('.detail-page-demo__info-content').should('contain.text', 'Collapsible');
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      cy.get('h1').should('exist');
      cy.get('h2').should('exist');
      cy.get('h4').should('have.length.at.least', 2);
    });

    it('should have accessible buttons', () => {
      cy.get('amw-button button').should('have.length.at.least', 1);
    });

    it('should be keyboard navigable', () => {
      cy.get('amw-button button').first().focus();
    });
  });
});
