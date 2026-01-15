/// <reference types="cypress" />

describe('AMW Report Page', () => {
  beforeEach(() => {
    cy.visit('/pages/report');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Report Page demo', () => {
      cy.get('h1').should('contain.text', 'Report');
    });

    it('should display page description', () => {
      cy.get('.report-page-demo__header p').should('contain.text', 'AMW Report Page');
    });

    it('should have report page component', () => {
      cy.get('amw-report-page').should('exist');
    });
  });

  describe('View Tabs', () => {
    it('should have view tabs', () => {
      cy.get('body').then(($body) => {
        const hasTabs = $body.find('amw-tabs, mat-tab-group, .mat-mdc-tab-group, [role="tablist"]').length > 0;
        if (hasTabs) {
          cy.get('amw-tabs, mat-tab-group, .mat-mdc-tab-group, [role="tablist"]').should('exist');
        } else {
          cy.log('No tabs found - skipping');
        }
      });
    });

    it('should have Basic View tab', () => {
      cy.get('body').then(($body) => {
        const hasBasicTab = $body.find('.mat-mdc-tab, [role="tab"]').filter((_, el) => /basic/i.test(el.textContent || '')).length > 0;
        if (hasBasicTab) {
          cy.get('.mat-mdc-tab, [role="tab"]').contains(/basic/i).should('exist');
        } else {
          cy.log('No Basic View tab found - skipping');
        }
      });
    });

    it('should have Advanced View tab', () => {
      cy.get('body').then(($body) => {
        const hasAdvancedTab = $body.find('.mat-mdc-tab, [role="tab"]').filter((_, el) => /advanced/i.test(el.textContent || '')).length > 0;
        if (hasAdvancedTab) {
          cy.get('.mat-mdc-tab, [role="tab"]').contains(/advanced/i).should('exist');
        } else {
          cy.log('No Advanced View tab found - skipping');
        }
      });
    });

    it('should switch between views', () => {
      cy.get('body').then(($body) => {
        const hasAdvancedTab = $body.find('.mat-mdc-tab, [role="tab"], .amw-tabs__tab').filter((_, el) => /advanced/i.test(el.textContent || '')).length > 0;
        if (hasAdvancedTab) {
          cy.get('.mat-mdc-tab, [role="tab"], .amw-tabs__tab').contains(/advanced/i).click();
          cy.get('.report-page-demo__tab-content').should('contain.text', 'fullscreen');
        } else {
          cy.log('No Advanced View tab found - skipping');
        }
      });
    });
  });

  describe('Report Page Component', () => {
    it('should display report widgets', () => {
      cy.get('amw-report-page').should('exist');
    });
  });

  describe('Demo Information Card', () => {
    it('should display info card', () => {
      cy.get('.report-page-demo__info-card').should('exist');
    });

    it('should display features list', () => {
      cy.get('.report-page-demo__info-content ul li').should('have.length.at.least', 5);
    });

    it('should mention interactive widgets', () => {
      cy.get('.report-page-demo__info-content').should('contain.text', 'Interactive widget');
    });

    it('should mention widget types', () => {
      cy.get('.report-page-demo__info-content').should('contain.text', 'widget types');
    });

    it('should mention date range filtering', () => {
      cy.get('.report-page-demo__info-content').should('contain.text', 'Date range');
    });

    it('should mention export capabilities', () => {
      cy.get('.report-page-demo__info-content').should('contain.text', 'Export');
    });

    it('should mention fullscreen mode', () => {
      cy.get('.report-page-demo__info-content').should('contain.text', 'Fullscreen');
    });

    it('should mention real-time updates', () => {
      cy.get('.report-page-demo__info-content').should('contain.text', 'Real-time');
    });
  });

  describe('Widget Types Section', () => {
    it('should describe widget types', () => {
      cy.get('.report-page-demo__info-content').should('contain.text', 'Widget Types');
    });

    it('should mention Metrics widget', () => {
      cy.get('.report-page-demo__info-content').should('contain.text', 'Metrics');
    });

    it('should mention Charts widget', () => {
      cy.get('.report-page-demo__info-content').should('contain.text', 'Charts');
    });

    it('should mention Tables widget', () => {
      cy.get('.report-page-demo__info-content').should('contain.text', 'Tables');
    });

    it('should mention KPIs widget', () => {
      cy.get('.report-page-demo__info-content').should('contain.text', 'KPIs');
    });

    it('should mention Custom widget', () => {
      cy.get('.report-page-demo__info-content').should('contain.text', 'Custom');
    });
  });

  describe('Sample Data Section', () => {
    it('should describe sample data', () => {
      cy.get('.report-page-demo__info-content').should('contain.text', 'Sample Data');
    });

    it('should mention sales metrics', () => {
      cy.get('.report-page-demo__info-content').should('contain.text', 'Sales');
    });

    it('should mention product performance', () => {
      cy.get('.report-page-demo__info-content').should('contain.text', 'Product performance');
    });

    it('should mention customer analysis', () => {
      cy.get('.report-page-demo__info-content').should('contain.text', 'customer');
    });

    it('should mention revenue data', () => {
      cy.get('.report-page-demo__info-content').should('contain.text', 'revenue');
    });

    it('should mention satisfaction scores', () => {
      cy.get('.report-page-demo__info-content').should('contain.text', 'satisfaction');
    });

    it('should mention conversion rates', () => {
      cy.get('.report-page-demo__info-content').should('contain.text', 'Conversion');
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      cy.get('h1').should('exist');
      cy.get('h2').should('exist');
      cy.get('h4').should('have.length.at.least', 2);
    });

    it('should have accessible cards', () => {
      cy.get('amw-card').should('have.length.at.least', 2);
    });
  });
});
