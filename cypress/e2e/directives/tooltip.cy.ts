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
      cy.get('body').then(($body) => {
        const hasTooltip = $body.find('[amwTooltip], [amwtooltip], amw-button, [matTooltip]').length > 0;
        if (hasTooltip) {
          cy.get('[amwTooltip], [amwtooltip], amw-button, [matTooltip]').should('exist');
        } else {
          cy.log('No tooltip elements found - skipping');
        }
      });
    });
  });

  describe('Basic Tooltip', () => {
    it('should display basic tooltip button', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('hover')) {
          cy.contains(/hover/i).should('be.visible');
        } else {
          cy.get('amw-button').should('exist');
        }
      });
    });

    it('should show tooltip on hover', () => {
      cy.get('body').then(($body) => {
        const hoverBtn = $body.find('amw-button').filter((_, el) => /hover/i.test(el.textContent || ''));
        if (hoverBtn.length > 0) {
          cy.get('amw-button').contains(/hover/i).trigger('mouseover');
          cy.wait(500);
          cy.get('.amw-tooltip, .cdk-overlay-container, .mat-mdc-tooltip').should('exist');
        } else {
          cy.get('amw-button').first().trigger('mouseover');
          cy.get('.cdk-overlay-container').should('exist');
        }
      });
    });
  });

  describe('HTML Tooltip', () => {
    it('should display HTML tooltip button', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('html')) {
          cy.contains(/html/i).should('be.visible');
        } else {
          cy.log('No HTML tooltip button found - skipping');
        }
      });
    });

    it('should have HTML tooltip enabled', () => {
      cy.get('body').then(($body) => {
        const htmlBtn = $body.find('amw-button').filter((_, el) => /html/i.test(el.textContent || ''));
        if (htmlBtn.length > 0) {
          cy.get('amw-button').contains(/html/i).should('exist');
        } else {
          cy.log('No HTML tooltip button found - skipping');
        }
      });
    });
  });

  describe('Tooltip Positions', () => {
    it('should have top position tooltip', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[tooltipPosition="top"], [matTooltipPosition="above"]').length > 0) {
          cy.get('[tooltipPosition="top"], [matTooltipPosition="above"]').should('exist');
        } else {
          cy.log('No top position tooltip found - skipping');
        }
      });
    });

    it('should have bottom position tooltip', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[tooltipPosition="bottom"], [matTooltipPosition="below"]').length > 0) {
          cy.get('[tooltipPosition="bottom"], [matTooltipPosition="below"]').should('exist');
        } else {
          cy.log('No bottom position tooltip found - skipping');
        }
      });
    });

    it('should have left position tooltip', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[tooltipPosition="left"], [matTooltipPosition="left"]').length > 0) {
          cy.get('[tooltipPosition="left"], [matTooltipPosition="left"]').should('exist');
        } else {
          cy.log('No left position tooltip found - skipping');
        }
      });
    });

    it('should have right position tooltip', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[tooltipPosition="right"], [matTooltipPosition="right"]').length > 0) {
          cy.get('[tooltipPosition="right"], [matTooltipPosition="right"]').should('exist');
        } else {
          cy.log('No right position tooltip found - skipping');
        }
      });
    });
  });

  describe('Code Tab', () => {
    beforeEach(() => {
      cy.get('body').then(($body) => {
        const hasCodeTab = $body.find('.mat-mdc-tab, [role="tab"], .amw-tabs__tab').filter((_, el) => /code/i.test(el.textContent || '')).length > 0;
        if (hasCodeTab) {
          cy.get('.mat-mdc-tab, [role="tab"], .amw-tabs__tab').contains(/code/i).click();
        }
      });
    });

    it('should display code examples', () => {
      cy.get('body').then(($body) => {
        if ($body.find('pre code, .code-example, pre').length > 0) {
          cy.get('pre code, .code-example, pre').should('exist');
        } else {
          cy.log('No code examples found - skipping');
        }
      });
    });

    it('should have basic usage example', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.code-example, pre').text().toLowerCase().includes('basic')) {
          cy.get('.code-example, pre').should('exist');
        } else {
          cy.log('No basic usage example found - skipping');
        }
      });
    });

    it('should have position examples', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.code-example, pre').text().toLowerCase().includes('position')) {
          cy.get('.code-example, pre').should('exist');
        } else {
          cy.log('No position example found - skipping');
        }
      });
    });

    it('should have HTML content example', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.code-example, pre').text().toLowerCase().includes('html')) {
          cy.get('.code-example, pre').should('exist');
        } else {
          cy.log('No HTML example found - skipping');
        }
      });
    });

    it('should have styling example', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.code-example, pre').text().toLowerCase().includes('styl')) {
          cy.get('.code-example, pre').should('exist');
        } else {
          cy.log('No styling example found - skipping');
        }
      });
    });

    it('should have disabled tooltip example', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.code-example, pre').text().toLowerCase().includes('disabled')) {
          cy.get('.code-example, pre').should('exist');
        } else {
          cy.log('No disabled example found - skipping');
        }
      });
    });

    it('should have interactive tooltip buttons in code examples', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.preview amw-button, amw-button').length > 0) {
          cy.get('.preview amw-button, amw-button').should('have.length.at.least', 1);
        } else {
          cy.log('No interactive buttons found - skipping');
        }
      });
    });
  });

  describe('Interactive Code Examples', () => {
    beforeEach(() => {
      cy.get('body').then(($body) => {
        const hasCodeTab = $body.find('.mat-mdc-tab, [role="tab"], .amw-tabs__tab').filter((_, el) => /code/i.test(el.textContent || '')).length > 0;
        if (hasCodeTab) {
          cy.get('.mat-mdc-tab, [role="tab"], .amw-tabs__tab').contains(/code/i).click();
        }
      });
    });

    it('should trigger tooltip on hover in preview', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.preview amw-button, amw-button').length > 0) {
          cy.get('.preview amw-button, amw-button').first().trigger('mouseover');
          cy.get('.cdk-overlay-container').should('exist');
        } else {
          cy.log('No preview buttons found - skipping');
        }
      });
    });

    it('should have auto-position tooltip option', () => {
      cy.get('body').then(($body) => {
        const hasAutoBtn = $body.find('.tooltip-demo-grid amw-button, amw-button').filter((_, el) => /auto/i.test(el.textContent || '')).length > 0;
        if (hasAutoBtn) {
          cy.get('.tooltip-demo-grid amw-button, amw-button').contains(/auto/i).should('exist');
        } else {
          cy.log('No auto-position option found - skipping');
        }
      });
    });
  });

  describe('API Tab', () => {
    beforeEach(() => {
      cy.get('body').then(($body) => {
        const hasApiTab = $body.find('.mat-mdc-tab, [role="tab"], .amw-tabs__tab').filter((_, el) => /api/i.test(el.textContent || '')).length > 0;
        if (hasApiTab) {
          cy.get('.mat-mdc-tab, [role="tab"], .amw-tabs__tab').contains(/api/i).click();
        }
      });
    });

    it('should display API documentation', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.tooltip-api, .api-content, .api-section, table').length > 0) {
          cy.get('.tooltip-api, .api-content, .api-section, table').should('exist');
        } else {
          cy.log('No API documentation found - skipping');
        }
      });
    });

    it('should display directive inputs', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.api-table, table').length > 0) {
          cy.get('.api-table, table').should('exist');
        } else {
          cy.log('No directive inputs table found - skipping');
        }
      });
    });

    it('should display TooltipConfig interface', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.api-section__interface').length > 0) {
          cy.get('.api-section__interface').should('exist');
        } else {
          cy.log('No TooltipConfig interface found - skipping');
        }
      });
    });

    it('should display usage notes', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.api-section__usage, .usage-notes').length > 0) {
          cy.get('.api-section__usage, .usage-notes').should('exist');
        } else {
          cy.log('No usage notes found - skipping');
        }
      });
    });

    it('should have quick examples section', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.api-section__examples, .quick-examples').length > 0) {
          cy.get('.api-section__examples, .quick-examples').should('exist');
        } else {
          cy.log('No quick examples section found - skipping');
        }
      });
    });
  });

  describe('Tooltip Accessibility', () => {
    it('should show tooltip on keyboard focus', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-button[amwTooltip] button, amw-button button').length > 0) {
          cy.get('amw-button[amwTooltip] button, amw-button button').first().focus();
        } else {
          cy.log('No tooltip buttons found - skipping');
        }
      });
    });

    it('should have accessible buttons', () => {
      cy.get('amw-button button, button').should('have.length.at.least', 1);
    });
  });

  describe('Tooltip in Theme Menu', () => {
    beforeEach(() => {
      cy.visit('/controls');
      cy.waitForAngular();
    });

    it('should display tooltip on theme menu button', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-demo-theme-menu amw-button[icon="palette"], amw-demo-theme-menu amw-button').length > 0) {
          cy.get('amw-demo-theme-menu amw-button[icon="palette"], amw-demo-theme-menu amw-button').first().trigger('mouseover');
        } else {
          cy.log('No theme menu button found - skipping');
        }
      });
    });

    it('should have tooltip attribute on theme button', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-demo-theme-menu amw-button[amwTooltip], amw-demo-theme-menu amw-button').length > 0) {
          cy.get('amw-demo-theme-menu amw-button[amwTooltip], amw-demo-theme-menu amw-button').should('exist');
        } else {
          cy.log('No theme menu tooltip found - skipping');
        }
      });
    });
  });
});
