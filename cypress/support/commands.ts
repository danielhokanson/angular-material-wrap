/// <reference types="cypress" />

// ***********************************************
// AMW Custom Cypress Commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      // Navigation
      navigateTo(route: string): Chainable<void>;

      // AMW Button
      getAmwButton(selector?: string): Chainable<JQuery<HTMLElement>>;
      clickAmwButton(selector?: string): Chainable<void>;

      // AMW Input
      getAmwInput(selector?: string): Chainable<JQuery<HTMLElement>>;
      typeInAmwInput(selector: string, text: string): Chainable<void>;
      clearAmwInput(selector: string): Chainable<void>;

      // AMW Select
      getAmwSelect(selector?: string): Chainable<JQuery<HTMLElement>>;
      selectAmwOption(selector: string, optionText: string): Chainable<void>;

      // AMW Checkbox
      getAmwCheckbox(selector?: string): Chainable<JQuery<HTMLElement>>;
      toggleAmwCheckbox(selector: string): Chainable<void>;

      // AMW Radio
      getAmwRadio(selector?: string): Chainable<JQuery<HTMLElement>>;
      selectAmwRadio(selector: string, value: string): Chainable<void>;

      // AMW Tabs
      getAmwTabs(selector?: string): Chainable<JQuery<HTMLElement>>;
      selectAmwTab(selector: string, tabIndex: number): Chainable<void>;
      selectAmwTabByLabel(selector: string, label: string): Chainable<void>;

      // AMW Dialog
      getAmwDialog(): Chainable<JQuery<HTMLElement>>;
      closeAmwDialog(): Chainable<void>;

      // AMW Popover
      getAmwPopover(): Chainable<JQuery<HTMLElement>>;
      openAmwPopover(triggerSelector: string): Chainable<void>;
      closeAmwPopover(): Chainable<void>;

      // AMW Card
      getAmwCard(selector?: string): Chainable<JQuery<HTMLElement>>;

      // Theme
      selectTheme(themeId: string): Chainable<void>;
      getCurrentTheme(): Chainable<string>;

      // Utility
      waitForAngular(): Chainable<void>;
      shouldBeVisible(selector: string): Chainable<void>;
      shouldHaveText(selector: string, text: string): Chainable<void>;
    }
  }
}

// Navigation
Cypress.Commands.add('navigateTo', (route: string) => {
  cy.visit(route);
  cy.waitForAngular();
});

// AMW Button Commands
Cypress.Commands.add('getAmwButton', (selector?: string) => {
  const baseSelector = selector ? `${selector} amw-button` : 'amw-button';
  return cy.get(baseSelector);
});

Cypress.Commands.add('clickAmwButton', (selector?: string) => {
  const baseSelector = selector ? `${selector} amw-button button` : 'amw-button button';
  cy.get(baseSelector).first().click();
});

// AMW Input Commands
Cypress.Commands.add('getAmwInput', (selector?: string) => {
  const baseSelector = selector ? `${selector} amw-input` : 'amw-input';
  return cy.get(baseSelector);
});

Cypress.Commands.add('typeInAmwInput', (selector: string, text: string) => {
  cy.get(`${selector} amw-input input, ${selector} amw-input textarea`).first().clear().type(text);
});

Cypress.Commands.add('clearAmwInput', (selector: string) => {
  cy.get(`${selector} amw-input input, ${selector} amw-input textarea`).first().clear();
});

// AMW Select Commands
Cypress.Commands.add('getAmwSelect', (selector?: string) => {
  const baseSelector = selector ? `${selector} amw-select` : 'amw-select';
  return cy.get(baseSelector);
});

Cypress.Commands.add('selectAmwOption', (selector: string, optionText: string) => {
  cy.get(`${selector} amw-select`).click();
  cy.get('.mat-mdc-option').contains(optionText).click();
});

// AMW Checkbox Commands
Cypress.Commands.add('getAmwCheckbox', (selector?: string) => {
  const baseSelector = selector ? `${selector} amw-checkbox` : 'amw-checkbox';
  return cy.get(baseSelector);
});

Cypress.Commands.add('toggleAmwCheckbox', (selector: string) => {
  cy.get(`${selector} amw-checkbox`).click();
});

// AMW Radio Commands
Cypress.Commands.add('getAmwRadio', (selector?: string) => {
  const baseSelector = selector ? `${selector} amw-radio` : 'amw-radio';
  return cy.get(baseSelector);
});

Cypress.Commands.add('selectAmwRadio', (selector: string, value: string) => {
  cy.get(`${selector} amw-radio[value="${value}"], ${selector} amw-radio`).contains(value).click();
});

// AMW Tabs Commands
Cypress.Commands.add('getAmwTabs', (selector?: string) => {
  const baseSelector = selector ? `${selector} amw-tabs` : 'amw-tabs';
  return cy.get(baseSelector);
});

Cypress.Commands.add('selectAmwTab', (selector: string, tabIndex: number) => {
  cy.get(`${selector} .amw-tabs__tab`).eq(tabIndex).click();
});

Cypress.Commands.add('selectAmwTabByLabel', (selector: string, label: string) => {
  cy.get(`${selector} .amw-tabs__tab`).contains(label).click();
});

// AMW Dialog Commands
Cypress.Commands.add('getAmwDialog', () => {
  return cy.get('.amw-dialog, .cdk-overlay-pane .amw-dialog');
});

Cypress.Commands.add('closeAmwDialog', () => {
  cy.get('.amw-dialog__close button, .amw-dialog .amw-button').first().click();
});

// AMW Popover Commands
Cypress.Commands.add('getAmwPopover', () => {
  return cy.get('.amw-popover__popover');
});

Cypress.Commands.add('openAmwPopover', (triggerSelector: string) => {
  cy.get(`${triggerSelector} .amw-popover__trigger, ${triggerSelector} amw-button`).first().click();
  cy.get('.amw-popover__popover').should('be.visible');
});

Cypress.Commands.add('closeAmwPopover', () => {
  cy.get('.amw-popover__close button').click();
});

// AMW Card Commands
Cypress.Commands.add('getAmwCard', (selector?: string) => {
  const baseSelector = selector ? `${selector} amw-card` : 'amw-card';
  return cy.get(baseSelector);
});

// Theme Commands
Cypress.Commands.add('selectTheme', (themeId: string) => {
  // Open theme menu
  cy.get('amw-demo-theme-menu amw-button').click();
  cy.get('.theme-menu').should('be.visible');
  // Select theme
  cy.get(`.theme-item`).contains(themeId).click();
});

Cypress.Commands.add('getCurrentTheme', () => {
  return cy.get('.current-theme-info .theme-name').invoke('text');
});

// Utility Commands
Cypress.Commands.add('waitForAngular', () => {
  cy.window().then((win) => {
    // Wait for Angular to be ready
    cy.wrap(null).should(() => {
      expect(win.document.readyState).to.equal('complete');
    });
  });
  // Small delay to ensure Angular change detection completes
  cy.wait(100);
});

Cypress.Commands.add('shouldBeVisible', (selector: string) => {
  cy.get(selector).should('be.visible');
});

Cypress.Commands.add('shouldHaveText', (selector: string, text: string) => {
  cy.get(selector).should('contain.text', text);
});

export {};
