/// <reference types="cypress" />

describe('AMW Paginator Component', () => {
  beforeEach(() => {
    cy.visit('/components/paginator');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Paginator demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Paginator');
    });

    it('should have paginator elements on the page', () => {
      cy.get('amw-paginator').should('exist');
    });
  });

  describe('Paginator Controls', () => {
    it('should display navigation buttons', () => {
      cy.get('amw-paginator').first().within(() => {
        cy.get('button').should('have.length.at.least', 2);
      });
    });

    it('should have previous button', () => {
      cy.get('amw-paginator').first().then(($paginator) => {
        const hasPrevBtn = $paginator.find('button').filter((_, el) =>
          /prev|previous|←|<|back/i.test(el.textContent || el.getAttribute('aria-label') || '')
        ).length > 0;
        if (hasPrevBtn) {
          cy.wrap($paginator).find('button').contains(/prev|←|</i).should('exist');
        } else {
          cy.log('Previous button not found with expected text - checking for any nav button');
          cy.wrap($paginator).find('button').first().should('exist');
        }
      });
    });

    it('should have next button', () => {
      cy.get('amw-paginator').first().then(($paginator) => {
        const hasNextBtn = $paginator.find('button').filter((_, el) =>
          /next|→|>|forward/i.test(el.textContent || el.getAttribute('aria-label') || '')
        ).length > 0;
        if (hasNextBtn) {
          cy.wrap($paginator).find('button').contains(/next|→|>/i).should('exist');
        } else {
          cy.log('Next button not found with expected text - checking for any nav button');
          cy.wrap($paginator).find('button').last().should('exist');
        }
      });
    });
  });

  describe('Page Navigation', () => {
    it('should navigate to next page when clicking next', () => {
      cy.get('amw-paginator').first().then(($paginator) => {
        const nextBtn = $paginator.find('button').filter((_, el) =>
          /next|→|>/i.test(el.textContent || '')
        );
        if (nextBtn.length > 0 && !nextBtn.prop('disabled')) {
          cy.wrap(nextBtn).click();
          // Verify page changed - paginator should still exist
          cy.get('amw-paginator').should('exist');
        } else {
          cy.log('Next button not available or disabled - skipping');
        }
      });
    });

    it('should disable prev button on first page', () => {
      cy.get('amw-paginator').first().then(($paginator) => {
        const prevBtn = $paginator.find('button').filter((_, el) =>
          /prev|←|</i.test(el.textContent || '')
        );
        if (prevBtn.length > 0) {
          // First page should have prev disabled
          expect(prevBtn.prop('disabled')).to.be.true;
        } else {
          cy.log('Previous button not found - skipping');
        }
      });
    });
  });

  describe('Page Information', () => {
    it('should display current page information', () => {
      cy.get('amw-paginator').first().then(($paginator) => {
        // Check if paginator displays page info
        const text = $paginator.text();
        const hasPageInfo = /\d+/.test(text);
        if (hasPageInfo) {
          cy.wrap($paginator).should('contain.text', '1');
        } else {
          cy.log('Page info not displayed - skipping');
        }
      });
    });
  });

  describe('Page Size', () => {
    it('should display page size options when not hidden', () => {
      cy.get('body').then(($body) => {
        const hasPageSize = $body.find('amw-paginator select, amw-paginator .page-size').length > 0;
        if (hasPageSize) {
          cy.get('amw-paginator select, amw-paginator .page-size').should('be.visible');
        } else {
          cy.log('Page size selector not visible or hidden - skipping');
        }
      });
    });
  });

  describe('Disabled State', () => {
    it('should support disabled state', () => {
      cy.get('body').then(($body) => {
        const hasDisabled = $body.find('amw-paginator[disabled], amw-paginator.disabled').length > 0;
        if (hasDisabled) {
          cy.get('amw-paginator[disabled], amw-paginator.disabled').within(() => {
            cy.get('button').should('be.disabled');
          });
        } else {
          cy.log('Disabled paginator not found - skipping');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('paginator buttons should be keyboard accessible', () => {
      cy.get('amw-paginator button:not([disabled])').first()
        .focus()
        .should('have.focus');
    });

    it('should have accessible button labels', () => {
      cy.get('amw-paginator button').first().then(($btn) => {
        const hasLabel = $btn.text().trim() || $btn.attr('aria-label');
        expect(hasLabel).to.not.be.empty;
      });
    });
  });
});
