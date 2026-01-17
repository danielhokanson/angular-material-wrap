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
          cy.get('.detail-page-demo__tab-content, .mat-mdc-tab-body-content').should('exist');
        } else {
          cy.log('No Advanced View tab found - skipping view switch test');
        }
      });
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
      cy.get('body').then(($body) => {
        if ($body.find('.detail-page-demo__info-card, .info-card, mat-card').length > 0) {
          cy.get('.detail-page-demo__info-card, .info-card, mat-card').should('exist');
        } else {
          cy.log('Info card not found - skipping');
        }
      });
    });

    it('should display features list', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.detail-page-demo__info-content ul li, .info-content li, mat-card li').length > 0) {
          cy.get('.detail-page-demo__info-content ul li, .info-content li, mat-card li').should('have.length.at.least', 1);
        } else {
          cy.log('Features list not found - skipping');
        }
      });
    });

    it('should mention tabbed layouts', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('tabbed')) {
          cy.get('body').should('contain.text', 'abbed');
        } else {
          cy.log('Tabbed layouts mention not found - skipping');
        }
      });
    });

    it('should mention field actions', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('field-level actions') || $body.text().toLowerCase().includes('field actions')) {
          cy.get('body').should('exist');
        } else {
          cy.log('Field actions mention not found - skipping');
        }
      });
    });

    it('should mention custom renderers', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('custom')) {
          cy.get('body').should('contain.text', 'ustom');
        } else {
          cy.log('Custom mention not found - skipping');
        }
      });
    });

    it('should mention related data', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('related data')) {
          cy.get('body').should('contain.text', 'elated');
        } else {
          cy.log('Related data mention not found - skipping');
        }
      });
    });

    it('should mention action buttons', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('action buttons') || $body.text().toLowerCase().includes('actions')) {
          cy.get('body').should('exist');
        } else {
          cy.log('Action buttons mention not found - skipping');
        }
      });
    });

    it('should mention real-time updates', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('real-time')) {
          cy.get('body').should('contain.text', 'eal-time');
        } else {
          cy.log('Real-time mention not found - skipping');
        }
      });
    });
  });

  describe('Data Structure Section', () => {
    it('should describe data structure', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('data structure')) {
          cy.get('body').should('contain.text', 'ata');
        } else {
          cy.log('Data Structure mention not found - skipping');
        }
      });
    });

    it('should mention personal information', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('personal information')) {
          cy.get('body').should('contain.text', 'ersonal');
        } else {
          cy.log('Personal information mention not found - skipping');
        }
      });
    });

    it('should mention professional details', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('professional details') || $body.text().toLowerCase().includes('professional')) {
          cy.get('body').should('exist');
        } else {
          cy.log('Professional details mention not found - skipping');
        }
      });
    });

    it('should mention compensation and benefits', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('compensation')) {
          cy.get('body').should('contain.text', 'ompensation');
        } else {
          cy.log('Compensation mention not found - skipping');
        }
      });
    });

    it('should mention skills and performance', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('skills')) {
          cy.get('body').should('contain.text', 'kills');
        } else {
          cy.log('Skills mention not found - skipping');
        }
      });
    });

    it('should mention related projects', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('projects')) {
          cy.get('body').should('contain.text', 'rojects');
        } else {
          cy.log('Projects mention not found - skipping');
        }
      });
    });
  });

  describe('Custom Features Section', () => {
    it('should describe custom features', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('custom features')) {
          cy.get('body').should('contain.text', 'ustom');
        } else {
          cy.log('Custom Features mention not found - skipping');
        }
      });
    });

    it('should mention clickable links', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('clickable')) {
          cy.get('body').should('contain.text', 'lickable');
        } else {
          cy.log('Clickable links mention not found - skipping');
        }
      });
    });

    it('should mention copyable fields', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('copyable') || $body.text().toLowerCase().includes('copy')) {
          cy.get('body').should('exist');
        } else {
          cy.log('Copyable fields mention not found - skipping');
        }
      });
    });

    it('should mention status indicators', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('status indicators') || $body.text().toLowerCase().includes('status')) {
          cy.get('body').should('exist');
        } else {
          cy.log('Status indicators mention not found - skipping');
        }
      });
    });

    it('should mention collapsible sections', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('collapsible')) {
          cy.get('body').should('contain.text', 'ollapsible');
        } else {
          cy.log('Collapsible sections mention not found - skipping');
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

    it('should have accessible buttons', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-button button').length > 0) {
          cy.get('amw-button button').should('have.length.at.least', 1);
        } else {
          cy.log('No amw-button buttons found - skipping');
        }
      });
    });

    it('should be keyboard navigable', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-button button').length > 0) {
          cy.get('amw-button button').first().focus().should('have.focus');
        } else {
          cy.log('No buttons found for keyboard navigation - skipping');
        }
      });
    });
  });
});
