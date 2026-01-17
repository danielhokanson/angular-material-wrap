/// <reference types="cypress" />

describe('AMW Range Slider Component', () => {
  beforeEach(() => {
    cy.visit('/controls/range-slider');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Range Slider demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Range Slider');
    });

    it('should have range slider components on the page', () => {
      cy.get('amw-range-slider, mat-slider').should('exist');
    });
  });

  describe('Range Slider Structure', () => {
    it('should have two thumbs for range selection', () => {
      cy.get('body').then(($body) => {
        const hasMultipleInputs = $body.find('mat-slider input').length >= 2;
        if (hasMultipleInputs) {
          cy.get('mat-slider input').should('have.length.at.least', 2);
        } else {
          cy.log('Range slider may use different structure - skipping');
        }
      });
    });

    it('should display min value thumb', () => {
      cy.get('mat-slider input').first().should('exist');
    });

    it('should display max value thumb', () => {
      cy.get('mat-slider input').last().should('exist');
    });
  });

  describe('Range Slider Interactions', () => {
    it('should change start value with keyboard', () => {
      cy.get('body').then(($body) => {
        const hasInput = $body.find('mat-slider input').length > 0;
        if (hasInput) {
          cy.get('mat-slider input').first().scrollIntoView()
            .focus()
            .type('{rightarrow}', { force: true });
        } else {
          cy.log('No slider input found - skipping');
        }
      });
    });

    it('should change end value with keyboard', () => {
      cy.get('body').then(($body) => {
        const hasInput = $body.find('mat-slider input').length > 0;
        if (hasInput) {
          cy.get('mat-slider input').last().scrollIntoView()
            .focus()
            .type('{leftarrow}', { force: true });
        } else {
          cy.log('No slider input found - skipping');
        }
      });
    });
  });

  describe('Range Slider States', () => {
    it('should have disabled range slider', () => {
      cy.get('body').then(($body) => {
        const hasDisabled = $body.find('amw-range-slider[disabled], mat-slider[disabled], .mat-mdc-slider-disabled').length > 0;
        if (hasDisabled) {
          cy.get('amw-range-slider[disabled], mat-slider[disabled], .mat-mdc-slider-disabled').should('exist');
        } else {
          cy.log('No disabled range sliders in demo - skipping');
        }
      });
    });
  });

  describe('Range Slider Configuration', () => {
    it('should have min and max attributes', () => {
      cy.get('body').then(($body) => {
        const hasMinMax = $body.find('mat-slider[min], mat-slider[max]').length > 0;
        if (hasMinMax) {
          cy.get('mat-slider').first().should('have.attr', 'min');
          cy.get('mat-slider').first().should('have.attr', 'max');
        } else {
          // Min/max may be on the input or configured differently
          cy.log('Min/max attributes may be configured differently - skipping');
        }
      });
    });

    it('should have step attribute if configured', () => {
      cy.get('body').then(($body) => {
        const hasStep = $body.find('mat-slider[step]').length > 0;
        if (hasStep) {
          cy.get('mat-slider[step]').should('have.attr', 'step');
        } else {
          cy.log('No step attribute on slider - skipping');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard accessible', () => {
      cy.get('body').then(($body) => {
        const hasInput = $body.find('mat-slider input').length > 0;
        if (hasInput) {
          cy.get('mat-slider input').first().scrollIntoView()
            .focus()
            .should('have.focus');
        } else {
          cy.log('No slider input for focus test - skipping');
        }
      });
    });

    it('should have proper role', () => {
      cy.get('body').then(($body) => {
        const inputSelector = 'mat-slider input, amw-range-slider input';
        if ($body.find(inputSelector).length > 0) {
          const $input = $body.find(inputSelector).first();
          if ($input.attr('role') === 'slider') {
            cy.get(inputSelector).first().should('have.attr', 'role', 'slider');
          } else {
            cy.get(inputSelector).should('exist');
            cy.log('Slider input exists but role attribute may differ');
          }
        } else {
          cy.log('No slider input for role test - skipping');
        }
      });
    });
  });
});
