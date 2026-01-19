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

      // AMW Data Table
      getAmwDataTable(selector?: string): Chainable<JQuery<HTMLElement>>;
      sortAmwTableColumn(selector: string, columnName: string): Chainable<void>;
      filterAmwTable(selector: string, filterText: string): Chainable<void>;
      paginateAmwTable(selector: string, page: number): Chainable<void>;
      selectAmwTableRow(selector: string, rowIndex: number): Chainable<void>;
      getAmwTableRows(selector?: string): Chainable<JQuery<HTMLElement>>;

      // AMW Stepper
      getAmwStepper(selector?: string): Chainable<JQuery<HTMLElement>>;
      nextAmwStep(selector?: string): Chainable<void>;
      previousAmwStep(selector?: string): Chainable<void>;
      goToAmwStep(selector: string, stepIndex: number): Chainable<void>;
      getAmwCurrentStep(selector?: string): Chainable<number>;

      // AMW Accordion
      getAmwAccordion(selector?: string): Chainable<JQuery<HTMLElement>>;
      expandAmwPanel(selector: string, panelIndex: number): Chainable<void>;
      collapseAmwPanel(selector: string, panelIndex: number): Chainable<void>;
      isAmwPanelExpanded(selector: string, panelIndex: number): Chainable<boolean>;

      // AMW Calendar
      getAmwCalendar(selector?: string): Chainable<JQuery<HTMLElement>>;
      selectAmwDate(selector: string, day: number): Chainable<void>;
      navigateAmwMonth(selector: string, direction: 'next' | 'prev'): Chainable<void>;
      getAmwSelectedDate(selector?: string): Chainable<string>;

      // AMW Menu
      getAmwMenu(selector?: string): Chainable<JQuery<HTMLElement>>;
      openAmwMenu(triggerSelector: string): Chainable<void>;
      selectAmwMenuItem(itemText: string): Chainable<void>;
      closeAmwMenu(): Chainable<void>;

      // AMW Slider
      getAmwSlider(selector?: string): Chainable<JQuery<HTMLElement>>;
      setAmwSliderValue(selector: string, value: number): Chainable<void>;

      // AMW Range Slider
      getAmwRangeSlider(selector?: string): Chainable<JQuery<HTMLElement>>;
      setAmwRangeSliderValues(selector: string, startValue: number, endValue: number): Chainable<void>;

      // AMW Chips
      getAmwChips(selector?: string): Chainable<JQuery<HTMLElement>>;
      addAmwChip(selector: string, text: string): Chainable<void>;
      removeAmwChip(selector: string, chipIndex: number): Chainable<void>;
      getAmwChipValues(selector?: string): Chainable<string[]>;

      // AMW File Input
      getAmwFileInput(selector?: string): Chainable<JQuery<HTMLElement>>;
      uploadAmwFile(selector: string, fileName: string, fileContent?: string): Chainable<void>;

      // AMW Color Picker
      getAmwColorPicker(selector?: string): Chainable<JQuery<HTMLElement>>;
      selectAmwColor(selector: string, color: string): Chainable<void>;

      // AMW Datepicker
      getAmwDatepicker(selector?: string): Chainable<JQuery<HTMLElement>>;
      openAmwDatepicker(selector: string): Chainable<void>;
      selectAmwDatepickerDate(selector: string, day: number): Chainable<void>;

      // AMW Timepicker
      getAmwTimepicker(selector?: string): Chainable<JQuery<HTMLElement>>;
      setAmwTime(selector: string, hours: number, minutes: number): Chainable<void>;

      // AMW Textarea
      getAmwTextarea(selector?: string): Chainable<JQuery<HTMLElement>>;
      typeInAmwTextarea(selector: string, text: string): Chainable<void>;

      // AMW Switch/Toggle
      getAmwSwitch(selector?: string): Chainable<JQuery<HTMLElement>>;
      toggleAmwSwitch(selector: string): Chainable<void>;

      // Notifications
      waitForNotification(text?: string): Chainable<JQuery<HTMLElement>>;
      dismissNotification(): Chainable<void>;

      // Loading
      waitForLoadingComplete(): Chainable<void>;

      // Theme
      selectTheme(themeId: string): Chainable<void>;
      getCurrentTheme(): Chainable<string>;

      // AMW Table (directive-based)
      getAmwTable(selector?: string): Chainable<JQuery<HTMLElement>>;
      getAmwTableHeaders(selector?: string): Chainable<JQuery<HTMLElement>>;
      getAmwTableCells(selector?: string): Chainable<JQuery<HTMLElement>>;

      // AMW Sort
      getAmwSort(selector?: string): Chainable<JQuery<HTMLElement>>;
      getAmwSortHeader(selector?: string): Chainable<JQuery<HTMLElement>>;
      clickAmwSortHeader(selector: string, headerIndex?: number): Chainable<void>;
      getAmwSortDirection(selector: string): Chainable<string>;

      // AMW Paginator
      getAmwPaginator(selector?: string): Chainable<JQuery<HTMLElement>>;
      clickAmwPaginatorNext(selector?: string): Chainable<void>;
      clickAmwPaginatorPrev(selector?: string): Chainable<void>;
      clickAmwPaginatorFirst(selector?: string): Chainable<void>;
      clickAmwPaginatorLast(selector?: string): Chainable<void>;
      setAmwPageSize(selector: string, size: number): Chainable<void>;
      getAmwPaginatorRange(selector?: string): Chainable<string>;

      // AMW List
      getAmwList(selector?: string): Chainable<JQuery<HTMLElement>>;
      getAmwListItems(selector?: string): Chainable<JQuery<HTMLElement>>;
      clickAmwListItem(selector: string, itemIndex: number): Chainable<void>;
      getAmwListItemText(selector: string, itemIndex: number): Chainable<string>;

      // AMW Badge
      getAmwBadge(selector?: string): Chainable<JQuery<HTMLElement>>;
      getAmwBadgeContent(selector?: string): Chainable<string>;
      isAmwBadgeHidden(selector?: string): Chainable<boolean>;

      // AMW Button Toggle
      getAmwButtonToggleGroup(selector?: string): Chainable<JQuery<HTMLElement>>;
      getAmwButtonToggle(selector?: string): Chainable<JQuery<HTMLElement>>;
      selectAmwButtonToggle(selector: string, toggleIndex: number): Chainable<void>;
      selectAmwButtonToggleByValue(selector: string, value: string): Chainable<void>;
      getAmwSelectedToggle(selector?: string): Chainable<JQuery<HTMLElement>>;

      // AMW Expansion Panel
      getAmwExpansionPanel(selector?: string): Chainable<JQuery<HTMLElement>>;
      expandAmwExpansionPanel(selector: string, panelIndex?: number): Chainable<void>;
      collapseAmwExpansionPanel(selector: string, panelIndex?: number): Chainable<void>;
      isAmwExpansionPanelExpanded(selector: string, panelIndex?: number): Chainable<boolean>;
      getAmwExpansionPanelHeader(selector?: string): Chainable<JQuery<HTMLElement>>;

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
  cy.get('.amw-popover__close').click();
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

// AMW Data Table Commands
Cypress.Commands.add('getAmwDataTable', (selector?: string) => {
  const baseSelector = selector ? `${selector} amw-data-table` : 'amw-data-table';
  return cy.get(baseSelector);
});

Cypress.Commands.add('sortAmwTableColumn', (selector: string, columnName: string) => {
  cy.get(`${selector} .mat-sort-header`).contains(columnName).click();
});

Cypress.Commands.add('filterAmwTable', (selector: string, filterText: string) => {
  cy.get(`${selector} .amw-data-table__filter input, ${selector} amw-input input`).first().clear().type(filterText);
});

Cypress.Commands.add('paginateAmwTable', (selector: string, page: number) => {
  // Click the page number or use next/previous buttons
  cy.get(`${selector} .mat-mdc-paginator-navigation-next`).as('nextBtn');
  for (let i = 1; i < page; i++) {
    cy.get('@nextBtn').click();
  }
});

Cypress.Commands.add('selectAmwTableRow', (selector: string, rowIndex: number) => {
  cy.get(`${selector} .mat-mdc-row, ${selector} tr`).eq(rowIndex).click();
});

Cypress.Commands.add('getAmwTableRows', (selector?: string) => {
  const baseSelector = selector ? `${selector} .mat-mdc-row, ${selector} tr:not(:first-child)` : '.mat-mdc-row, tr:not(:first-child)';
  return cy.get(baseSelector);
});

// AMW Stepper Commands
Cypress.Commands.add('getAmwStepper', (selector?: string) => {
  const baseSelector = selector ? `${selector} amw-stepper` : 'amw-stepper';
  return cy.get(baseSelector);
});

Cypress.Commands.add('nextAmwStep', (selector?: string) => {
  const base = selector || '';
  cy.get(`${base} .amw-stepper__next button, ${base} [matStepperNext]`.trim()).first().click();
});

Cypress.Commands.add('previousAmwStep', (selector?: string) => {
  const base = selector || '';
  cy.get(`${base} .amw-stepper__previous button, ${base} [matStepperPrevious]`.trim()).first().click();
});

Cypress.Commands.add('goToAmwStep', (selector: string, stepIndex: number) => {
  cy.get(`${selector} .mat-step-header`).eq(stepIndex).click();
});

Cypress.Commands.add('getAmwCurrentStep', (selector?: string) => {
  const base = selector || '';
  return cy.get(`${base} .mat-step-header[aria-selected="true"]`.trim()).invoke('index');
});

// AMW Accordion Commands
Cypress.Commands.add('getAmwAccordion', (selector?: string) => {
  const baseSelector = selector ? `${selector} amw-accordion` : 'amw-accordion';
  return cy.get(baseSelector);
});

Cypress.Commands.add('expandAmwPanel', (selector: string, panelIndex: number) => {
  cy.get(`${selector} mat-expansion-panel`).eq(panelIndex).find('mat-expansion-panel-header').click();
});

Cypress.Commands.add('collapseAmwPanel', (selector: string, panelIndex: number) => {
  cy.get(`${selector} mat-expansion-panel.mat-expanded`).eq(panelIndex).find('mat-expansion-panel-header').click();
});

Cypress.Commands.add('isAmwPanelExpanded', (selector: string, panelIndex: number) => {
  return cy.get(`${selector} mat-expansion-panel`).eq(panelIndex).then($panel => {
    return $panel.hasClass('mat-expanded');
  });
});

// AMW Calendar Commands
Cypress.Commands.add('getAmwCalendar', (selector?: string) => {
  const baseSelector = selector ? `${selector} amw-calendar` : 'amw-calendar';
  return cy.get(baseSelector);
});

Cypress.Commands.add('selectAmwDate', (selector: string, day: number) => {
  cy.get(`${selector} .mat-calendar-body-cell`).contains(new RegExp(`^${day}$`)).click();
});

Cypress.Commands.add('navigateAmwMonth', (selector: string, direction: 'next' | 'prev') => {
  const buttonSelector = direction === 'next'
    ? `${selector} .mat-calendar-next-button`
    : `${selector} .mat-calendar-previous-button`;
  cy.get(buttonSelector).click();
});

Cypress.Commands.add('getAmwSelectedDate', (selector?: string) => {
  const base = selector || '';
  return cy.get(`${base} .mat-calendar-body-selected`.trim()).invoke('text');
});

// AMW Menu Commands
Cypress.Commands.add('getAmwMenu', (selector?: string) => {
  const baseSelector = selector ? `${selector} amw-menu` : 'amw-menu';
  return cy.get(baseSelector);
});

Cypress.Commands.add('openAmwMenu', (triggerSelector: string) => {
  cy.get(`${triggerSelector} [mat-menu-trigger-for], ${triggerSelector} [matMenuTriggerFor], ${triggerSelector} amw-button`).first().click();
  cy.get('.mat-mdc-menu-panel').should('be.visible');
});

Cypress.Commands.add('selectAmwMenuItem', (itemText: string) => {
  cy.get('.mat-mdc-menu-panel .mat-mdc-menu-item').contains(itemText).click();
});

Cypress.Commands.add('closeAmwMenu', () => {
  cy.get('body').click(0, 0);
  cy.get('.mat-mdc-menu-panel').should('not.exist');
});

// AMW Slider Commands
Cypress.Commands.add('getAmwSlider', (selector?: string) => {
  const baseSelector = selector ? `${selector} amw-slider` : 'amw-slider';
  return cy.get(baseSelector);
});

Cypress.Commands.add('setAmwSliderValue', (selector: string, value: number) => {
  cy.get(`${selector} mat-slider input, ${selector} .mat-mdc-slider-input`).first()
    .invoke('val', value)
    .trigger('input', { force: true })
    .trigger('change', { force: true });
});

// AMW Range Slider Commands
Cypress.Commands.add('getAmwRangeSlider', (selector?: string) => {
  const baseSelector = selector ? `${selector} amw-range-slider` : 'amw-range-slider';
  return cy.get(baseSelector);
});

Cypress.Commands.add('setAmwRangeSliderValues', (selector: string, startValue: number, endValue: number) => {
  cy.get(`${selector} mat-slider input`).first()
    .invoke('val', startValue)
    .trigger('input', { force: true });
  cy.get(`${selector} mat-slider input`).last()
    .invoke('val', endValue)
    .trigger('input', { force: true });
});

// AMW Chips Commands
Cypress.Commands.add('getAmwChips', (selector?: string) => {
  const baseSelector = selector ? `${selector} amw-chips` : 'amw-chips';
  return cy.get(baseSelector);
});

Cypress.Commands.add('addAmwChip', (selector: string, text: string) => {
  cy.get(`${selector} amw-chips input, ${selector} .mat-mdc-chip-input`).first().type(`${text}{enter}`);
});

Cypress.Commands.add('removeAmwChip', (selector: string, chipIndex: number) => {
  cy.get(`${selector} .mat-mdc-chip-remove, ${selector} .mat-mdc-chip button`).eq(chipIndex).click();
});

Cypress.Commands.add('getAmwChipValues', (selector?: string) => {
  const base = selector || '';
  return cy.get(`${base} .mat-mdc-chip`.trim()).then($chips => {
    return [...$chips].map(chip => chip.textContent?.trim() || '');
  });
});

// AMW File Input Commands
Cypress.Commands.add('getAmwFileInput', (selector?: string) => {
  const baseSelector = selector ? `${selector} amw-file-input` : 'amw-file-input';
  return cy.get(baseSelector);
});

Cypress.Commands.add('uploadAmwFile', (selector: string, fileName: string, fileContent?: string) => {
  const content = fileContent || 'test file content';
  cy.get(`${selector} input[type="file"]`).selectFile({
    contents: Cypress.Buffer.from(content),
    fileName: fileName,
    mimeType: 'text/plain',
  }, { force: true });
});

// AMW Color Picker Commands
Cypress.Commands.add('getAmwColorPicker', (selector?: string) => {
  const baseSelector = selector ? `${selector} amw-color-picker` : 'amw-color-picker';
  return cy.get(baseSelector);
});

Cypress.Commands.add('selectAmwColor', (selector: string, color: string) => {
  cy.get(`${selector} amw-color-picker input, ${selector} input[type="color"]`).first()
    .invoke('val', color)
    .trigger('input', { force: true })
    .trigger('change', { force: true });
});

// AMW Datepicker Commands
Cypress.Commands.add('getAmwDatepicker', (selector?: string) => {
  const baseSelector = selector ? `${selector} amw-datepicker` : 'amw-datepicker';
  return cy.get(baseSelector);
});

Cypress.Commands.add('openAmwDatepicker', (selector: string) => {
  cy.get(`${selector} .mat-datepicker-toggle button, ${selector} mat-datepicker-toggle button`).click();
  cy.get('.mat-datepicker-content').should('be.visible');
});

Cypress.Commands.add('selectAmwDatepickerDate', (selector: string, day: number) => {
  cy.openAmwDatepicker(selector);
  cy.get('.mat-calendar-body-cell').contains(new RegExp(`^${day}$`)).click();
});

// AMW Timepicker Commands
Cypress.Commands.add('getAmwTimepicker', (selector?: string) => {
  const baseSelector = selector ? `${selector} amw-timepicker` : 'amw-timepicker';
  return cy.get(baseSelector);
});

Cypress.Commands.add('setAmwTime', (selector: string, hours: number, minutes: number) => {
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  cy.get(`${selector} amw-timepicker input, ${selector} input[type="time"]`).first()
    .clear()
    .type(formattedTime);
});

// AMW Textarea Commands
Cypress.Commands.add('getAmwTextarea', (selector?: string) => {
  const baseSelector = selector ? `${selector} amw-textarea` : 'amw-textarea';
  return cy.get(baseSelector);
});

Cypress.Commands.add('typeInAmwTextarea', (selector: string, text: string) => {
  cy.get(`${selector} amw-textarea textarea, ${selector} textarea`).first().clear().type(text);
});

// AMW Switch/Toggle Commands
Cypress.Commands.add('getAmwSwitch', (selector?: string) => {
  const baseSelector = selector ? `${selector} amw-switch, ${selector} amw-toggle` : 'amw-switch, amw-toggle';
  return cy.get(baseSelector);
});

Cypress.Commands.add('toggleAmwSwitch', (selector: string) => {
  cy.get(`${selector} amw-switch, ${selector} amw-toggle, ${selector} mat-slide-toggle`).first().click();
});

// Notification Commands
Cypress.Commands.add('waitForNotification', (text?: string) => {
  const selector = '.mat-mdc-snack-bar-container, .mat-snack-bar-container, .amw-notification';
  if (text) {
    return cy.get(selector).should('contain.text', text);
  }
  return cy.get(selector).should('be.visible');
});

Cypress.Commands.add('dismissNotification', () => {
  cy.get('.mat-mdc-snack-bar-action button, .mat-simple-snackbar-action button').click();
});

// Loading Commands
Cypress.Commands.add('waitForLoadingComplete', () => {
  // Wait for any loading spinners to disappear
  cy.get('.amw-loading, mat-progress-spinner, mat-progress-bar', { timeout: 10000 }).should('not.exist');
});

// AMW Table Commands (directive-based)
Cypress.Commands.add('getAmwTable', (selector?: string) => {
  const baseSelector = selector ? `${selector} amw-table, ${selector} table[amwTable]` : 'amw-table, table[amwTable]';
  return cy.get(baseSelector);
});

Cypress.Commands.add('getAmwTableHeaders', (selector?: string) => {
  const base = selector || '';
  return cy.get(`${base} amw-header-cell, ${base} th[amwHeaderCell], ${base} [amw-header-cell]`.trim());
});

Cypress.Commands.add('getAmwTableCells', (selector?: string) => {
  const base = selector || '';
  return cy.get(`${base} amw-cell, ${base} td[amwCell], ${base} [amw-cell]`.trim());
});

// AMW Sort Commands
Cypress.Commands.add('getAmwSort', (selector?: string) => {
  const baseSelector = selector ? `${selector} [amwSort]` : '[amwSort]';
  return cy.get(baseSelector);
});

Cypress.Commands.add('getAmwSortHeader', (selector?: string) => {
  const baseSelector = selector ? `${selector} amw-sort-header, ${selector} [amwSortHeader]` : 'amw-sort-header, [amwSortHeader]';
  return cy.get(baseSelector);
});

Cypress.Commands.add('clickAmwSortHeader', (selector: string, headerIndex?: number) => {
  const index = headerIndex ?? 0;
  cy.get(`${selector} amw-sort-header, ${selector} [amwSortHeader]`).eq(index).click();
});

Cypress.Commands.add('getAmwSortDirection', (selector: string) => {
  return cy.get(`${selector} amw-sort-header, ${selector} [amwSortHeader]`).first().then($header => {
    return $header.attr('aria-sort') || $header.attr('ng-reflect-sort-direction') || 'none';
  });
});

// AMW Paginator Commands
Cypress.Commands.add('getAmwPaginator', (selector?: string) => {
  const baseSelector = selector ? `${selector} amw-paginator` : 'amw-paginator';
  return cy.get(baseSelector);
});

Cypress.Commands.add('clickAmwPaginatorNext', (selector?: string) => {
  const base = selector || '';
  cy.get(`${base} .amw-paginator__next, ${base} .mat-mdc-paginator-navigation-next, ${base} button[aria-label*="Next"]`.trim()).first().click();
});

Cypress.Commands.add('clickAmwPaginatorPrev', (selector?: string) => {
  const base = selector || '';
  cy.get(`${base} .amw-paginator__prev, ${base} .mat-mdc-paginator-navigation-previous, ${base} button[aria-label*="Previous"]`.trim()).first().click();
});

Cypress.Commands.add('clickAmwPaginatorFirst', (selector?: string) => {
  const base = selector || '';
  cy.get(`${base} .amw-paginator__first, ${base} .mat-mdc-paginator-navigation-first, ${base} button[aria-label*="First"]`.trim()).first().click();
});

Cypress.Commands.add('clickAmwPaginatorLast', (selector?: string) => {
  const base = selector || '';
  cy.get(`${base} .amw-paginator__last, ${base} .mat-mdc-paginator-navigation-last, ${base} button[aria-label*="Last"]`.trim()).first().click();
});

Cypress.Commands.add('setAmwPageSize', (selector: string, size: number) => {
  cy.get(`${selector} .amw-paginator__page-size select, ${selector} .mat-mdc-paginator-page-size-select`).first().click();
  cy.get('.mat-mdc-option, .mat-option').contains(size.toString()).click();
});

Cypress.Commands.add('getAmwPaginatorRange', (selector?: string) => {
  const base = selector || '';
  return cy.get(`${base} .amw-paginator__range, ${base} .mat-mdc-paginator-range-label`.trim()).invoke('text');
});

// AMW List Commands
Cypress.Commands.add('getAmwList', (selector?: string) => {
  const baseSelector = selector ? `${selector} amw-list` : 'amw-list';
  return cy.get(baseSelector);
});

Cypress.Commands.add('getAmwListItems', (selector?: string) => {
  const base = selector || '';
  return cy.get(`${base} amw-list-item, ${base} [amwListItem]`.trim());
});

Cypress.Commands.add('clickAmwListItem', (selector: string, itemIndex: number) => {
  cy.get(`${selector} amw-list-item, ${selector} [amwListItem]`).eq(itemIndex).click();
});

Cypress.Commands.add('getAmwListItemText', (selector: string, itemIndex: number) => {
  return cy.get(`${selector} amw-list-item, ${selector} [amwListItem]`).eq(itemIndex).invoke('text');
});

// AMW Badge Commands
Cypress.Commands.add('getAmwBadge', (selector?: string) => {
  const baseSelector = selector ? `${selector} [amwBadge]` : '[amwBadge]';
  return cy.get(baseSelector);
});

Cypress.Commands.add('getAmwBadgeContent', (selector?: string) => {
  const base = selector || '';
  return cy.get(`${base} .amw-badge, ${base} .mat-badge-content`.trim()).first().invoke('text');
});

Cypress.Commands.add('isAmwBadgeHidden', (selector?: string) => {
  const base = selector || '';
  return cy.get(`${base} [amwBadge]`.trim()).first().then($badge => {
    return $badge.attr('amwBadgeHidden') === 'true' || $badge.hasClass('amw-badge-hidden');
  });
});

// AMW Button Toggle Commands
Cypress.Commands.add('getAmwButtonToggleGroup', (selector?: string) => {
  const baseSelector = selector ? `${selector} amw-button-toggle-group` : 'amw-button-toggle-group';
  return cy.get(baseSelector);
});

Cypress.Commands.add('getAmwButtonToggle', (selector?: string) => {
  const baseSelector = selector ? `${selector} amw-button-toggle` : 'amw-button-toggle';
  return cy.get(baseSelector);
});

Cypress.Commands.add('selectAmwButtonToggle', (selector: string, toggleIndex: number) => {
  cy.get(`${selector} amw-button-toggle`).eq(toggleIndex).click();
});

Cypress.Commands.add('selectAmwButtonToggleByValue', (selector: string, value: string) => {
  cy.get(`${selector} amw-button-toggle[value="${value}"], ${selector} amw-button-toggle`).contains(value).click();
});

Cypress.Commands.add('getAmwSelectedToggle', (selector?: string) => {
  const base = selector || '';
  return cy.get(`${base} amw-button-toggle.selected, ${base} amw-button-toggle[aria-pressed="true"], ${base} .mat-button-toggle-checked`.trim());
});

// AMW Expansion Panel Commands
Cypress.Commands.add('getAmwExpansionPanel', (selector?: string) => {
  const baseSelector = selector ? `${selector} amw-expansion-panel` : 'amw-expansion-panel';
  return cy.get(baseSelector);
});

Cypress.Commands.add('expandAmwExpansionPanel', (selector: string, panelIndex?: number) => {
  const index = panelIndex ?? 0;
  cy.get(`${selector} amw-expansion-panel`).eq(index).then($panel => {
    const isExpanded = $panel.find('.amw-expansion-panel-content:visible').length > 0 || $panel.hasClass('expanded');
    if (!isExpanded) {
      cy.wrap($panel).find('amw-expansion-panel-header').click();
    }
  });
});

Cypress.Commands.add('collapseAmwExpansionPanel', (selector: string, panelIndex?: number) => {
  const index = panelIndex ?? 0;
  cy.get(`${selector} amw-expansion-panel`).eq(index).then($panel => {
    const isExpanded = $panel.find('.amw-expansion-panel-content:visible').length > 0 || $panel.hasClass('expanded');
    if (isExpanded) {
      cy.wrap($panel).find('amw-expansion-panel-header').click();
    }
  });
});

Cypress.Commands.add('isAmwExpansionPanelExpanded', (selector: string, panelIndex?: number) => {
  const index = panelIndex ?? 0;
  return cy.get(`${selector} amw-expansion-panel`).eq(index).then($panel => {
    return $panel.find('.amw-expansion-panel-content:visible').length > 0 || $panel.hasClass('expanded') || $panel.attr('expanded') === 'true';
  });
});

Cypress.Commands.add('getAmwExpansionPanelHeader', (selector?: string) => {
  const baseSelector = selector ? `${selector} amw-expansion-panel-header` : 'amw-expansion-panel-header';
  return cy.get(baseSelector);
});

export {};
