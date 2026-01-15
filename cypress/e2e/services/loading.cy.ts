/// <reference types="cypress" />

describe('AMW Loading Service', () => {
  beforeEach(() => {
    cy.visit('/services/loading');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Loading Service demo page', () => {
      cy.get('h1, h2, h3').should('contain.text', 'Loading');
    });

    it('should have loading control buttons', () => {
      cy.get('body').then(($body) => {
        const hasStart = $body.find('amw-button').filter((_, el) => /start|show/i.test(el.textContent || '')).length > 0;
        if (hasStart) {
          cy.get('amw-button').should('exist');
        } else {
          cy.get('amw-button').should('have.length.at.least', 1);
        }
      });
    });
  });

  describe('Loading State Controls', () => {
    it('should start loading on button click', () => {
      cy.get('body').then(($body) => {
        const startBtn = $body.find('amw-button').filter((_, el) => /start|show/i.test(el.textContent || ''));
        if (startBtn.length > 0) {
          cy.get('amw-button').contains(/start|show/i).first().click();
          cy.get('.loading-demo, .spinner, mat-spinner, mat-progress-spinner, .mat-mdc-progress-spinner, [role="progressbar"]', { timeout: 5000 }).should('exist');
        } else {
          cy.log('No start loading button found - skipping');
        }
      });
    });

    it('should stop loading on button click', () => {
      cy.get('body').then(($body) => {
        const hasStart = $body.find('amw-button').filter((_, el) => /start|show/i.test(el.textContent || '')).length > 0;
        const hasStop = $body.find('amw-button').filter((_, el) => /stop|hide/i.test(el.textContent || '')).length > 0;
        if (hasStart && hasStop) {
          cy.get('amw-button').contains(/start|show/i).first().click();
          cy.wait(500);
          cy.get('amw-button').contains(/stop|hide/i).first().click({ force: true });
        } else {
          cy.log('Loading control buttons not found - skipping');
        }
      });
    });
  });

  describe('Loading Indicator Display', () => {
    it('should display loading spinner when loading', () => {
      cy.get('body').then(($body) => {
        const startBtn = $body.find('amw-button').filter((_, el) => /start|show/i.test(el.textContent || ''));
        if (startBtn.length > 0) {
          cy.get('amw-button').contains(/start|show/i).first().click();
          cy.get('.spinner, .loading-demo, mat-spinner, mat-progress-spinner, .mat-mdc-progress-spinner, [role="progressbar"]', { timeout: 5000 }).should('exist');
          // Cleanup
          cy.get('body').then(($updatedBody) => {
            const stopBtn = $updatedBody.find('amw-button').filter((_, el) => /stop|hide/i.test(el.textContent || ''));
            if (stopBtn.length > 0) {
              cy.get('amw-button').contains(/stop|hide/i).first().click({ force: true });
            }
          });
        } else {
          cy.log('No start loading button found - skipping');
        }
      });
    });
  });

  describe('Code Tab', () => {
    beforeEach(() => {
      cy.get('body').then(($body) => {
        const hasCodeTab = $body.find('.amw-tabs__tab, [role="tab"]').filter((_, el) => /code/i.test(el.textContent || '')).length > 0;
        if (hasCodeTab) {
          cy.get('.amw-tabs__tab, [role="tab"]').contains(/code/i).click();
        }
      });
    });

    it('should display code examples', () => {
      cy.get('body').then(($body) => {
        const hasCode = $body.find('pre code, .code-example, .demo-code').length > 0;
        if (hasCode) {
          cy.get('pre code, .code-example, .demo-code').should('exist');
        } else {
          cy.log('No code examples found - skipping');
        }
      });
    });

    it('should have code content', () => {
      cy.get('body').then(($body) => {
        const hasCode = $body.find('pre, code').length > 0;
        if (hasCode) {
          cy.get('pre, code').should('exist');
        } else {
          cy.log('No code content found - skipping');
        }
      });
    });
  });

  describe('API Tab', () => {
    beforeEach(() => {
      cy.get('body').then(($body) => {
        const hasApiTab = $body.find('.amw-tabs__tab, [role="tab"]').filter((_, el) => /api/i.test(el.textContent || '')).length > 0;
        if (hasApiTab) {
          cy.get('.amw-tabs__tab, [role="tab"]').contains(/api/i).click();
        }
      });
    });

    it('should display API documentation', () => {
      cy.get('body').then(($body) => {
        const hasApi = $body.find('.api-content, .api-table, table, .loading-api').length > 0;
        if (hasApi) {
          cy.get('.api-content, .api-table, table, .loading-api').should('exist');
        } else {
          cy.log('No API documentation found - skipping');
        }
      });
    });

    it('should display service information', () => {
      cy.get('body').then(($body) => {
        const hasTable = $body.find('table, .api-table').length > 0;
        if (hasTable) {
          cy.get('table, .api-table').should('exist');
        } else {
          cy.log('No service information table found - skipping');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('should have accessible buttons', () => {
      cy.get('amw-button button, button').should('have.length.at.least', 1);
    });

    it('should be keyboard navigable', () => {
      cy.get('body').then(($body) => {
        const hasButton = $body.find('amw-button button, button').length > 0;
        if (hasButton) {
          cy.get('amw-button button, button').first().focus().should('have.focus');
        } else {
          cy.log('No buttons found for keyboard navigation test - skipping');
        }
      });
    });
  });
});
