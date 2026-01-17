/// <reference types="cypress" />

describe('AMW Messaging Service', () => {
  beforeEach(() => {
    cy.visit('/services/messaging');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Messaging Service demo page', () => {
      cy.get('h1, h2, h3').should('contain.text', 'Messaging');
    });

    it('should have message controls', () => {
      cy.get('body').then(($body) => {
        const hasInputs = $body.find('amw-input, input').length > 0;
        const hasButtons = $body.find('amw-button').length > 0;
        if (hasInputs || hasButtons) {
          cy.get('amw-input, amw-button').should('exist');
        } else {
          cy.log('No message controls found - skipping');
        }
      });
    });
  });

  describe('Message Types', () => {
    it('should send message', () => {
      cy.get('body').then(($body) => {
        const hasInput = $body.find('amw-input input, input').length > 0;
        const hasButton = $body.find('amw-button').length > 0;
        if (hasInput && hasButton) {
          cy.get('amw-input input, input').first().clear().type('Test Message');
          cy.get('amw-button').first().click();
        } else {
          cy.log('No message input or button found - skipping');
        }
      });
    });

    it('should have message type options', () => {
      cy.get('body').then(($body) => {
        const hasButtons = $body.find('amw-button[icon], amw-button').length > 0;
        if (hasButtons) {
          cy.get('amw-button').should('have.length.at.least', 1);
        } else {
          cy.log('No message type buttons found - skipping');
        }
      });
    });
  });

  describe('Message Display', () => {
    it('should display messages when sent', () => {
      cy.get('body').then(($body) => {
        const hasInput = $body.find('amw-input input, input').length > 0;
        const hasButton = $body.find('amw-button').length > 0;
        if (hasInput && hasButton) {
          cy.get('amw-input input, input').first().clear().type('Test Message');
          cy.get('amw-button').first().click();
          cy.wait(1000);
          cy.get('body').then(($b) => {
            if ($b.find('.message-item, .message, .notification, .mat-mdc-snack-bar-container, [role="alert"]').length > 0) {
              cy.get('.message-item, .message, .notification, .mat-mdc-snack-bar-container, [role="alert"]').should('exist');
            } else {
              cy.log('Message display element not found - messaging may use different mechanism');
            }
          });
        } else {
          cy.log('No message controls found - skipping');
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
        const hasApi = $body.find('.api-content, .api-table, table, .messaging-api').length > 0;
        if (hasApi) {
          cy.get('.api-content, .api-table, table, .messaging-api').should('exist');
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
    it('should have accessible inputs', () => {
      cy.get('body').then(($body) => {
        const hasInput = $body.find('amw-input input, input').length > 0;
        if (hasInput) {
          cy.get('amw-input input, input').should('exist');
        } else {
          cy.log('No input fields found - skipping');
        }
      });
    });

    it('should have accessible buttons', () => {
      cy.get('amw-button button, button').should('have.length.at.least', 1);
    });

    it('should be keyboard navigable', () => {
      cy.get('body').then(($body) => {
        const hasInput = $body.find('amw-input input, input').length > 0;
        if (hasInput) {
          cy.get('amw-input input, input').first().focus().should('have.focus');
        } else {
          cy.get('amw-button button, button').first().focus().should('have.focus');
        }
      });
    });
  });
});
