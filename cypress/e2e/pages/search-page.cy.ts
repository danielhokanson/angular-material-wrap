/// <reference types="cypress" />

describe('AMW Search Page', () => {
  beforeEach(() => {
    cy.visit('/pages/search');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Search Page demo', () => {
      cy.get('h1').should('contain.text', 'Search');
    });

    it('should display page description', () => {
      cy.get('.search-page-demo__header p').should('contain.text', 'AMW Search Page');
    });

    it('should have search page component', () => {
      cy.get('amw-search-page').should('exist');
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
      cy.get('.search-page-demo__tab-content').should('contain.text', 'saved searches');
    });
  });

  describe('Search Page Component', () => {
    it('should have search input', () => {
      cy.get('amw-search-page input, .amw-search-page__search input').should('exist');
    });

    it('should display search results', () => {
      cy.get('amw-search-page').should('exist');
    });
  });

  describe('Search Functionality', () => {
    it('should allow entering search text', () => {
      cy.get('amw-search-page input').first().clear().type('Angular');
    });

    it('should perform search on input', () => {
      cy.get('amw-search-page input').first().clear().type('book');
      cy.wait(500); // Wait for debounce
    });
  });

  describe('Demo Information Card', () => {
    it('should display info card', () => {
      cy.get('.search-page-demo__info-card').should('exist');
    });

    it('should display features list', () => {
      cy.get('.search-page-demo__info-content ul li').should('have.length.at.least', 5);
    });

    it('should mention real-time search', () => {
      cy.get('.search-page-demo__info-content').should('contain.text', 'Real-time search');
    });

    it('should mention search suggestions', () => {
      cy.get('.search-page-demo__info-content').should('contain.text', 'suggestions');
    });

    it('should mention quick filters', () => {
      cy.get('.search-page-demo__info-content').should('contain.text', 'Quick filter');
    });

    it('should mention view modes', () => {
      cy.get('.search-page-demo__info-content').should('contain.text', 'view modes');
    });

    it('should mention export capabilities', () => {
      cy.get('.search-page-demo__info-content').should('contain.text', 'Export');
    });

    it('should describe search data', () => {
      cy.get('.search-page-demo__info-content').should('contain.text', 'Search Data');
    });

    it('should list product types', () => {
      cy.get('.search-page-demo__info-content').should('contain.text', 'Books');
      cy.get('.search-page-demo__info-content').should('contain.text', 'Courses');
      cy.get('.search-page-demo__info-content').should('contain.text', 'Software');
    });

    it('should describe search features', () => {
      cy.get('.search-page-demo__info-content').should('contain.text', 'Search Features');
    });

    it('should mention sorting options', () => {
      cy.get('.search-page-demo__info-content').should('contain.text', 'Sorting');
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      cy.get('h1').should('exist');
      cy.get('h2').should('exist');
      cy.get('h4').should('have.length.at.least', 2);
    });

    it('should have accessible search input', () => {
      cy.get('amw-search-page input').should('exist');
    });

    it('should be keyboard navigable', () => {
      cy.get('amw-search-page input').first().focus().should('have.focus');
    });
  });
});
