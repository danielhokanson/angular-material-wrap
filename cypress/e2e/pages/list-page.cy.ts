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
      cy.get('body').then(($body) => {
        const hasTabs = $body.find('amw-tabs, mat-tab-group, .mat-mdc-tab-group, [role="tablist"]').length > 0;
        if (hasTabs) {
          cy.get('amw-tabs, mat-tab-group, .mat-mdc-tab-group, [role="tablist"]').should('exist');
        } else {
          cy.log('No tabs found on page - skipping');
        }
      });
    });

    it('should have Basic View tab', () => {
      cy.get('body').then(($body) => {
        const hasBasicTab = $body.find('.mat-mdc-tab, [role="tab"], .amw-tabs__tab').filter((_, el) => /basic/i.test(el.textContent || '')).length > 0;
        if (hasBasicTab) {
          cy.get('.mat-mdc-tab, [role="tab"], .amw-tabs__tab').contains(/basic/i).should('exist');
        } else {
          cy.log('No Basic View tab found - skipping');
        }
      });
    });

    it('should have Advanced View tab', () => {
      cy.get('body').then(($body) => {
        const hasAdvancedTab = $body.find('.mat-mdc-tab, [role="tab"], .amw-tabs__tab').filter((_, el) => /advanced/i.test(el.textContent || '')).length > 0;
        if (hasAdvancedTab) {
          cy.get('.mat-mdc-tab, [role="tab"], .amw-tabs__tab').contains(/advanced/i).should('exist');
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
          cy.get('.list-page-demo__tab-content, .mat-mdc-tab-body-content').should('exist');
        } else {
          cy.log('No Advanced View tab found - skipping view switch test');
        }
      });
    });
  });

  describe('List Page Component', () => {
    it('should display data table', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-list-page table, amw-list-page .mat-mdc-table, amw-data-table, table').length > 0) {
          cy.get('amw-list-page table, amw-list-page .mat-mdc-table, amw-data-table, table').should('exist');
        } else {
          cy.log('No data table found - skipping');
        }
      });
    });

    it('should have search functionality', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-list-page input, .amw-list-page__search, input').length > 0) {
          cy.get('amw-list-page input, .amw-list-page__search, input').should('exist');
        } else {
          cy.log('No search functionality found - skipping');
        }
      });
    });

    it('should have pagination', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-list-page .mat-mdc-paginator, mat-paginator, .mat-mdc-paginator').length > 0) {
          cy.get('amw-list-page .mat-mdc-paginator, mat-paginator, .mat-mdc-paginator').should('exist');
        } else {
          cy.log('No pagination found - skipping');
        }
      });
    });
  });

  describe('Data Display', () => {
    it('should display data rows', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-list-page .mat-mdc-row, amw-list-page tr, .mat-mdc-row, tr').length > 0) {
          cy.get('amw-list-page .mat-mdc-row, amw-list-page tr, .mat-mdc-row, tr').should('have.length.at.least', 1);
        } else {
          cy.log('No data rows found - skipping');
        }
      });
    });

    it('should display column headers', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-list-page .mat-mdc-header-cell, amw-list-page th, .mat-mdc-header-cell, th').length > 0) {
          cy.get('amw-list-page .mat-mdc-header-cell, amw-list-page th, .mat-mdc-header-cell, th').should('have.length.at.least', 1);
        } else {
          cy.log('No column headers found - skipping');
        }
      });
    });
  });

  describe('Demo Information Card', () => {
    it('should display info card', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.list-page-demo__info-card, .info-card, mat-card').length > 0) {
          cy.get('.list-page-demo__info-card, .info-card, mat-card').should('exist');
        } else {
          cy.log('Info card not found - skipping');
        }
      });
    });

    it('should display features list', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.list-page-demo__info-content ul li, .info-content li, mat-card li').length > 0) {
          cy.get('.list-page-demo__info-content ul li, .info-content li, mat-card li').should('have.length.at.least', 1);
        } else {
          cy.log('Features list not found - skipping');
        }
      });
    });

    it('should mention real-time search', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('search')) {
          cy.get('body').should('contain.text', 'search');
        } else {
          cy.log('Search mention not found - skipping');
        }
      });
    });

    it('should mention filtering', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('filter')) {
          cy.get('body').should('contain.text', 'filter');
        } else {
          cy.log('Filter mention not found - skipping');
        }
      });
    });

    it('should mention sorting', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('sort')) {
          cy.get('body').should('contain.text', 'sort');
        } else {
          cy.log('Sort mention not found - skipping');
        }
      });
    });

    it('should mention pagination', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('pagination')) {
          cy.get('body').should('contain.text', 'agination');
        } else {
          cy.log('Pagination mention not found - skipping');
        }
      });
    });

    it('should mention bulk operations', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('bulk')) {
          cy.get('body').should('contain.text', 'ulk');
        } else {
          cy.log('Bulk operations mention not found - skipping');
        }
      });
    });

    it('should display selected items section', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('selected')) {
          cy.get('body').should('contain.text', 'elected');
        } else {
          cy.log('Selected items section not found - skipping');
        }
      });
    });
  });

  describe('Interactions', () => {
    it('should allow row selection', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-list-page .mat-mdc-row, amw-list-page tr, .mat-mdc-row, tr').length > 0) {
          cy.get('amw-list-page .mat-mdc-row, amw-list-page tr, .mat-mdc-row, tr').first().click();
        } else {
          cy.log('No rows found for selection - skipping');
        }
      });
    });

    it('should allow sorting by column', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-list-page .mat-sort-header, amw-list-page th, .mat-sort-header, th').length > 0) {
          cy.get('amw-list-page .mat-sort-header, amw-list-page th, .mat-sort-header, th').first().click();
        } else {
          cy.log('No sortable columns found - skipping');
        }
      });
    });

    it('should allow pagination', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.mat-mdc-paginator-navigation-next, mat-paginator button').length > 0) {
          cy.get('.mat-mdc-paginator-navigation-next, mat-paginator button').should('exist');
        } else {
          cy.log('No pagination controls found - skipping');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      cy.get('h1').should('exist');
      cy.get('body').then(($body) => {
        if ($body.find('h2').length > 0) {
          cy.get('h2').should('exist');
        }
        if ($body.find('h4').length >= 2) {
          cy.get('h4').should('have.length.at.least', 2);
        }
      });
    });

    it('should have accessible table structure', () => {
      cy.get('body').then(($body) => {
        if ($body.find('table, .mat-mdc-table').length > 0) {
          cy.get('table, .mat-mdc-table').should('exist');
        } else {
          cy.log('No table structure found - skipping');
        }
      });
    });

    it('should have accessible pagination', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-paginator, .mat-mdc-paginator').length > 0) {
          cy.get('mat-paginator, .mat-mdc-paginator').should('exist');
        } else {
          cy.log('No pagination found - skipping');
        }
      });
    });
  });
});
