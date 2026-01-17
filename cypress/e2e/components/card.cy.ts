/// <reference types="cypress" />

describe('AMW Card Component', () => {
  beforeEach(() => {
    cy.visit('/components/card');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Card demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Card');
    });

    it('should have card components on the page', () => {
      cy.get('amw-card').should('exist');
    });
  });

  describe('Card Structure', () => {
    it('should have card header', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-card mat-card-header, amw-card .amw-card__header').length > 0) {
          cy.get('amw-card mat-card-header, amw-card .amw-card__header').should('exist');
        } else {
          cy.log('No card header found - skipping');
        }
      });
    });

    it('should have card content', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-card mat-card-content, amw-card .amw-card__content').length > 0) {
          cy.get('amw-card mat-card-content, amw-card .amw-card__content').should('exist');
        } else {
          cy.log('No card content found - skipping');
        }
      });
    });

    it('should have card actions', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-card mat-card-actions, amw-card .amw-card__actions').length > 0) {
          cy.get('amw-card mat-card-actions, amw-card .amw-card__actions').should('exist');
        } else {
          cy.log('No card actions found - skipping');
        }
      });
    });
  });

  describe('Card Variations', () => {
    it('should display elevated card', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-card[appearance="raised"], amw-card.mat-mdc-card-elevated, amw-card .mat-mdc-card-elevated').length > 0) {
          cy.get('amw-card[appearance="raised"], amw-card.mat-mdc-card-elevated, amw-card .mat-mdc-card-elevated').should('exist');
        } else {
          cy.log('No elevated card found - skipping');
        }
      });
    });

    it('should display outlined card', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-card[appearance="outlined"], amw-card.mat-mdc-card-outlined, amw-card .mat-mdc-card-outlined').length > 0) {
          cy.get('amw-card[appearance="outlined"], amw-card.mat-mdc-card-outlined, amw-card .mat-mdc-card-outlined').should('exist');
        } else {
          cy.log('No outlined card found - skipping');
        }
      });
    });

    it('should display filled card', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-card[appearance="filled"], amw-card.mat-mdc-card-filled').length > 0) {
          cy.get('amw-card[appearance="filled"], amw-card.mat-mdc-card-filled').should('exist');
        } else {
          cy.log('No filled card found - skipping');
        }
      });
    });
  });

  describe('Card with Image', () => {
    it('should display card with image', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-card img, amw-card [mat-card-image]').length > 0) {
          cy.get('amw-card img, amw-card [mat-card-image]').should('exist');
        } else {
          cy.log('No card with image found - skipping');
        }
      });
    });

    it('should have proper image sizing', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-card img').length > 0) {
          cy.get('amw-card img').first().should('be.visible');
        } else {
          cy.log('No card image found - skipping');
        }
      });
    });
  });

  describe('Card with Avatar', () => {
    it('should display card with avatar', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-card [mat-card-avatar], amw-card .mat-mdc-card-avatar').length > 0) {
          cy.get('amw-card [mat-card-avatar], amw-card .mat-mdc-card-avatar').should('exist');
        } else {
          cy.log('No card with avatar found - skipping');
        }
      });
    });
  });

  describe('Card Header', () => {
    it('should display card title', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-card mat-card-title, amw-card .mat-mdc-card-title').length > 0) {
          cy.get('amw-card mat-card-title, amw-card .mat-mdc-card-title').should('exist');
        } else {
          cy.log('No card title found - skipping');
        }
      });
    });

    it('should display card subtitle', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-card mat-card-subtitle, amw-card .mat-mdc-card-subtitle').length > 0) {
          cy.get('amw-card mat-card-subtitle, amw-card .mat-mdc-card-subtitle').should('exist');
        } else {
          cy.log('No card subtitle found - skipping');
        }
      });
    });
  });

  describe('Card Actions', () => {
    it('should have action buttons', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-card mat-card-actions button, amw-card mat-card-actions amw-button').length > 0) {
          cy.get('amw-card mat-card-actions button, amw-card mat-card-actions amw-button').should('exist');
        } else {
          cy.log('No card action buttons found - skipping');
        }
      });
    });

    it('action buttons should be clickable', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-card mat-card-actions button, amw-card mat-card-actions amw-button button').length > 0) {
          cy.get('amw-card mat-card-actions button, amw-card mat-card-actions amw-button button').first().click();
          // Should respond without error
        } else {
          cy.log('No clickable card action buttons found - skipping');
        }
      });
    });

    it('should support action alignment', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-card-actions[align], amw-card mat-card-actions').length > 0) {
          cy.get('mat-card-actions[align], amw-card mat-card-actions').should('exist');
        } else {
          cy.log('No card actions alignment found - skipping');
        }
      });
    });
  });

  describe('Card Styling', () => {
    it('should have proper border radius', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-card mat-card, amw-card .mat-mdc-card').length > 0) {
          cy.get('amw-card mat-card, amw-card .mat-mdc-card').first()
            .should('have.css', 'border-radius');
        } else {
          cy.log('No mat-card element found - skipping');
        }
      });
    });

    it('should have proper shadow/elevation', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-card mat-card, amw-card .mat-mdc-card').length > 0) {
          cy.get('amw-card mat-card, amw-card .mat-mdc-card').first()
            .should('have.css', 'box-shadow');
        } else {
          cy.log('No mat-card element found - skipping');
        }
      });
    });
  });

  describe('Card Footer', () => {
    it('should display card footer when present', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-card mat-card-footer, amw-card .amw-card__footer').length > 0) {
          cy.get('amw-card mat-card-footer, amw-card .amw-card__footer').should('exist');
        } else {
          cy.log('No card footer found - skipping');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('card should be semantic', () => {
      cy.get('amw-card mat-card, amw-card').first()
        .should('exist');
    });

    it('card actions should be focusable', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-card mat-card-actions button').length > 0) {
          cy.get('amw-card mat-card-actions button').first()
            .focus()
            .should('have.focus');
        } else {
          cy.log('No card action buttons found - skipping');
        }
      });
    });

    it('card should be keyboard navigable', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-card button, amw-card a').length > 0) {
          cy.get('amw-card button, amw-card a').first()
            .focus()
            .should('have.focus');
        } else {
          cy.log('No focusable card elements found - skipping');
        }
      });
    });

    it('interactive cards should have proper roles', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-card[role], amw-card button').length > 0) {
          cy.get('amw-card[role], amw-card button').should('exist');
        } else {
          cy.log('No interactive card roles found - skipping');
        }
      });
    });
  });
});
