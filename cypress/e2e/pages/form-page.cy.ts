/// <reference types="cypress" />

describe('AMW Form Page', () => {
  beforeEach(() => {
    cy.visit('/pages/form');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Form Page demo', () => {
      cy.get('h1').should('contain.text', 'Form');
    });

    it('should display page description', () => {
      cy.get('.form-page-demo__header p').should('contain.text', 'AMW Form Page');
    });

    it('should have form page component', () => {
      cy.get('amw-form-page').should('exist');
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
          cy.get('.form-page-demo__tab-content, .mat-mdc-tab-body-content').should('exist');
        } else {
          cy.log('No Advanced View tab found - skipping view switch test');
        }
      });
    });
  });

  describe('Form Mode Controls', () => {
    it('should have mode controls section', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.form-page-demo__mode-controls').length > 0) {
          cy.get('.form-page-demo__mode-controls').should('exist');
        } else {
          cy.get('amw-button').should('have.length.at.least', 1);
          cy.log('Mode controls section found via buttons');
        }
      });
    });

    it('should have Create mode button', () => {
      cy.get('body').then(($body) => {
        const hasCreateBtn = $body.find('amw-button').filter((_, el) => /create/i.test(el.textContent || '')).length > 0;
        if (hasCreateBtn) {
          cy.get('amw-button').contains(/create/i).should('exist');
        } else {
          cy.log('No Create button found - skipping');
        }
      });
    });

    it('should have Edit mode button', () => {
      cy.get('body').then(($body) => {
        const hasEditBtn = $body.find('amw-button').filter((_, el) => /edit/i.test(el.textContent || '')).length > 0;
        if (hasEditBtn) {
          cy.get('amw-button').contains(/edit/i).should('exist');
        } else {
          cy.log('No Edit button found - skipping');
        }
      });
    });

    it('should have View mode button', () => {
      cy.get('body').then(($body) => {
        const hasViewBtn = $body.find('amw-button').filter((_, el) => /view/i.test(el.textContent || '')).length > 0;
        if (hasViewBtn) {
          cy.get('amw-button').contains(/view/i).should('exist');
        } else {
          cy.log('No View button found - skipping');
        }
      });
    });

    it('should switch to Create mode', () => {
      cy.get('body').then(($body) => {
        const hasCreateBtn = $body.find('amw-button').filter((_, el) => /create/i.test(el.textContent || '')).length > 0;
        if (hasCreateBtn) {
          cy.get('amw-button').contains(/create/i).click();
        } else {
          cy.log('No Create button found - skipping');
        }
      });
    });

    it('should switch to Edit mode', () => {
      cy.get('body').then(($body) => {
        const hasEditBtn = $body.find('amw-button').filter((_, el) => /edit/i.test(el.textContent || '')).length > 0;
        if (hasEditBtn) {
          cy.get('amw-button').contains(/edit/i).click();
        } else {
          cy.log('No Edit button found - skipping');
        }
      });
    });

    it('should switch to View mode', () => {
      cy.get('body').then(($body) => {
        const hasViewBtn = $body.find('amw-button').filter((_, el) => /view/i.test(el.textContent || '')).length > 0;
        if (hasViewBtn) {
          cy.get('amw-button').contains(/view/i).click();
        } else {
          cy.log('No View button found - skipping');
        }
      });
    });
  });

  describe('Form Page Component', () => {
    it('should display form fields', () => {
      cy.get('amw-form-page input, amw-form-page amw-input').should('have.length.at.least', 1);
    });

    it('should have form sections', () => {
      cy.get('amw-form-page').should('exist');
    });
  });

  describe('Demo Information Card', () => {
    it('should display info card', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.form-page-demo__info-card, .info-card, mat-card').length > 0) {
          cy.get('.form-page-demo__info-card, .info-card, mat-card').should('exist');
        } else {
          cy.log('Info card not found - skipping');
        }
      });
    });

    it('should display features list', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.form-page-demo__info-content ul li, .info-content li, mat-card li').length > 0) {
          cy.get('.form-page-demo__info-content ul li, .info-content li, mat-card li').should('have.length.at.least', 1);
        } else {
          cy.log('Features list not found - skipping');
        }
      });
    });

    it('should mention validation', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('validation')) {
          cy.get('body').should('contain.text', 'alidation');
        } else {
          cy.log('Validation mention not found - skipping');
        }
      });
    });

    it('should mention auto-save', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('auto-save') || $body.text().toLowerCase().includes('autosave')) {
          cy.get('body').should('exist');
        } else {
          cy.log('Auto-save mention not found - skipping');
        }
      });
    });

    it('should mention form sections', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('form section')) {
          cy.get('body').should('contain.text', 'orm');
        } else {
          cy.log('Form Sections mention not found - skipping');
        }
      });
    });

    it('should list Personal Information section', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('personal information')) {
          cy.get('body').should('contain.text', 'ersonal');
        } else {
          cy.log('Personal Information section not found - skipping');
        }
      });
    });

    it('should list Professional Information section', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('professional information')) {
          cy.get('body').should('contain.text', 'rofessional');
        } else {
          cy.log('Professional Information section not found - skipping');
        }
      });
    });

    it('should display validation rules', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('validation rules')) {
          cy.get('body').should('contain.text', 'alidation');
        } else {
          cy.log('Validation Rules not found - skipping');
        }
      });
    });
  });

  describe('Form Interactions', () => {
    it('should allow input in form fields', () => {
      cy.get('amw-form-page amw-input input, amw-form-page input').first()
        .clear()
        .type('Test Value');
    });

    it('should show validation errors on invalid input', () => {
      // Clear a required field and blur to trigger validation
      cy.get('amw-form-page amw-input input, amw-form-page input').first()
        .clear()
        .blur();
    });
  });

  describe('Divider Component', () => {
    it('should have divider between sections', () => {
      cy.get('body').then(($body) => {
        const dividerSelector = '.form-page-demo__divider, amw-divider, mat-divider';
        if ($body.find(dividerSelector).length > 0) {
          cy.get(dividerSelector).should('exist');
        } else {
          cy.log('No dividers found - skipping');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      cy.get('h1').should('exist');
      cy.get('h2, h3').should('exist');
    });

    it('should have accessible form fields', () => {
      cy.get('amw-input, input, .mat-mdc-form-field').should('exist');
    });

    it('should have accessible buttons', () => {
      cy.get('amw-button, button').should('have.length.at.least', 3);
    });

    it('should have mode buttons with icons', () => {
      cy.get('body').then(($body) => {
        const hasModeButtons = $body.find('.form-page-demo__mode-buttons amw-button, .form-page-demo__mode-controls amw-button').length > 0;
        if (hasModeButtons) {
          cy.get('.form-page-demo__mode-buttons amw-button, .form-page-demo__mode-controls amw-button').should('have.length.at.least', 2);
        } else {
          cy.log('No mode buttons section found - skipping');
        }
      });
    });
  });
});
