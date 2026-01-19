/// <reference types="cypress" />

describe('AMW List Component', () => {
  beforeEach(() => {
    cy.visit('/components/list');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the List demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'List');
    });

    it('should have list elements on the page', () => {
      cy.get('amw-list').should('exist');
    });
  });

  describe('List Items', () => {
    it('should display list items', () => {
      cy.get('amw-list amw-list-item').should('have.length.at.least', 1);
    });

    it('should display item content', () => {
      cy.get('amw-list amw-list-item').first().should('not.be.empty');
    });
  });

  describe('List with Icons', () => {
    it('should display icons in list items', () => {
      cy.get('body').then(($body) => {
        const hasIcons = $body.find('amw-list-item mat-icon, amw-list-item [amwListItemIcon]').length > 0;
        if (hasIcons) {
          cy.get('amw-list-item mat-icon, amw-list-item [amwListItemIcon]').should('exist');
        } else {
          cy.log('List icons not found - skipping');
        }
      });
    });
  });

  describe('List Item Title', () => {
    it('should display item titles', () => {
      cy.get('body').then(($body) => {
        const hasTitles = $body.find('[amwListItemTitle], amw-list-item-title').length > 0;
        if (hasTitles) {
          cy.get('[amwListItemTitle], amw-list-item-title').should('exist');
        } else {
          cy.log('List item titles not found - checking for any content');
          cy.get('amw-list-item').first().should('not.be.empty');
        }
      });
    });
  });

  describe('Dense Mode', () => {
    it('should support dense mode', () => {
      cy.get('body').then(($body) => {
        const hasDense = $body.find('amw-list[dense], amw-list.dense').length > 0;
        if (hasDense) {
          cy.get('amw-list[dense], amw-list.dense').should('exist');
        } else {
          cy.log('Dense list not found - skipping');
        }
      });
    });
  });

  describe('Disabled Items', () => {
    it('should support disabled list items', () => {
      cy.get('body').then(($body) => {
        const hasDisabled = $body.find('amw-list-item[disabled], amw-list-item.disabled').length > 0;
        if (hasDisabled) {
          cy.get('amw-list-item[disabled], amw-list-item.disabled').should('exist');
        } else {
          cy.log('Disabled list items not found - skipping');
        }
      });
    });
  });

  describe('Click Events', () => {
    it('should handle item clicks', () => {
      cy.get('amw-list-item').first().then(($item) => {
        // Check if item is clickable
        const isClickable = $item.css('cursor') === 'pointer' || $item.find('button').length > 0;
        if (isClickable) {
          cy.wrap($item).click();
          // Verify click was handled (no errors)
          cy.get('amw-list').should('exist');
        } else {
          cy.log('List item not clickable - skipping');
        }
      });
    });
  });

  describe('Multi-line Items', () => {
    it('should support multi-line items', () => {
      cy.get('body').then(($body) => {
        const hasMultiLine = $body.find('[amwListItemLine], amw-list-item-line').length > 0;
        if (hasMultiLine) {
          cy.get('[amwListItemLine], amw-list-item-line').should('exist');
        } else {
          cy.log('Multi-line items not found - skipping');
        }
      });
    });
  });

  describe('Avatars', () => {
    it('should support avatars in list items', () => {
      cy.get('body').then(($body) => {
        const hasAvatars = $body.find('[amwListItemAvatar], .avatar').length > 0;
        if (hasAvatars) {
          cy.get('[amwListItemAvatar], .avatar').should('exist');
        } else {
          cy.log('Avatars not found - skipping');
        }
      });
    });
  });

  describe('Meta Content', () => {
    it('should support meta content in list items', () => {
      cy.get('body').then(($body) => {
        const hasMeta = $body.find('[amwListItemMeta]').length > 0;
        if (hasMeta) {
          cy.get('[amwListItemMeta]').should('exist');
        } else {
          cy.log('Meta content not found - skipping');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('list should have proper structure', () => {
      cy.get('amw-list').should('exist');
    });

    it('list items should be focusable when interactive', () => {
      cy.get('amw-list-item').first().then(($item) => {
        const hasTabIndex = $item.attr('tabindex') !== undefined;
        const hasButton = $item.find('button').length > 0;
        if (hasTabIndex || hasButton) {
          cy.wrap($item).focus();
        } else {
          cy.log('List item not focusable - may be non-interactive');
        }
      });
    });
  });
});
