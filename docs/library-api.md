# Library API

## Overview

The Angular Material Wrap library provides a comprehensive set of reusable Angular components, services, and utilities for Material Design implementations. The library is organized into four main areas: Controls, Components, Pages, and Styling.

## Public API

### Entry Point

All public exports are available through the main entry point:

```typescript
// Import from the library
import { AmwButtonComponent, AmwDataTableComponent, AmwListPageComponent, ThemeService } from "angular-material-wrap";
```

## Library Structure

### Controls (`/controls`)

Enhanced wrappers of Angular Material controls with additional functionality.

### Components (`/components`)

Complex UI components combining multiple controls for common patterns.

### Pages (`/pages`)

Complete page layouts and common page patterns.

### Styling (`/styling`)

Theme management and Material Design 3 implementation.

## Controls API

### Form Controls

#### AmwButtonComponent

Enhanced button component with additional styling and functionality.

```typescript
import { AmwButtonComponent } from "angular-material-wrap";

// Usage
<amw-button
  [config]="buttonConfig"
  [disabled]="false"
  (click)="onButtonClick($event)">
  Click Me
</amw-button>
```

**Properties:**

- `config: ButtonConfig` - Button configuration
- `disabled: boolean` - Disabled state
- `type: 'button' | 'submit' | 'reset'` - Button type

**Events:**

- `click: EventEmitter<MouseEvent>` - Click event

#### AmwInputComponent

Enhanced input component with validation and styling.

```typescript
import { AmwInputComponent } from "angular-material-wrap";

// Usage
<amw-input
  [config]="inputConfig"
  [(ngModel)]="value"
  (valueChange)="onValueChange($event)">
</amw-input>
```

#### AmwSelectComponent

Enhanced select component with search and multi-select capabilities.

```typescript
import { AmwSelectComponent } from "angular-material-wrap";

// Usage
<amw-select
  [config]="selectConfig"
  [options]="options"
  [(ngModel)]="selectedValue"
  (selectionChange)="onSelectionChange($event)">
</amw-select>
```

#### AmwCheckboxComponent

Enhanced checkbox component with custom styling.

```typescript
import { AmwCheckboxComponent } from "angular-material-wrap";

// Usage
<amw-checkbox
  [config]="checkboxConfig"
  [(ngModel)]="checked"
  (change)="onCheckboxChange($event)">
</amw-checkbox>
```

#### AmwRadioGroupComponent

Enhanced radio group component with custom styling.

```typescript
import { AmwRadioGroupComponent } from "angular-material-wrap";

// Usage
<amw-radio-group
  [config]="radioConfig"
  [options]="radioOptions"
  [(ngModel)]="selectedValue"
  (selectionChange)="onRadioChange($event)">
</amw-radio-group>
```

#### AmwChipsComponent

Enhanced chips component with add/remove functionality.

```typescript
import { AmwChipsComponent } from "angular-material-wrap";

// Usage
<amw-chips
  [config]="chipsConfig"
  [chips]="chipList"
  (chipAdd)="onChipAdd($event)"
  (chipRemove)="onChipRemove($event)">
</amw-chips>
```

### Advanced Controls

#### AmwDataTableComponent

Comprehensive data table with sorting, filtering, and pagination.

```typescript
import { AmwDataTableComponent } from "angular-material-wrap";

// Usage
<amw-data-table
  [config]="tableConfig"
  [data]="tableData"
  (rowClick)="onRowClick($event)"
  (sortChange)="onSortChange($event)"
  (pageChange)="onPageChange($event)">
</amw-data-table>
```

#### AmwAutocompleteComponent

Enhanced autocomplete with custom filtering and display.

```typescript
import { AmwAutocompleteComponent } from "angular-material-wrap";

// Usage
<amw-autocomplete
  [config]="autocompleteConfig"
  [options]="autocompleteOptions"
  [(ngModel)]="selectedValue"
  (optionSelected)="onOptionSelected($event)">
</amw-autocomplete>
```

#### AmwDatePickerComponent

Enhanced date picker with range selection and custom formatting.

```typescript
import { AmwDatePickerComponent } from "angular-material-wrap";

// Usage
<amw-date-picker
  [config]="datePickerConfig"
  [(ngModel)]="selectedDate"
  (dateChange)="onDateChange($event)">
</amw-date-picker>
```

## Components API

### Layout Components

#### AmwCardComponent

Enhanced card component with customizable sections and actions.

```typescript
import { AmwCardComponent } from "angular-material-wrap";

// Usage
<amw-card
  [config]="cardConfig"
  [data]="cardData"
  (actionClick)="onCardAction($event)">
</amw-card>
```

#### AmwDialogComponent

Enhanced dialog component with custom styling and animations.

```typescript
import { AmwDialogComponent } from "angular-material-wrap";

// Usage
<amw-dialog
  [config]="dialogConfig"
  [visible]="dialogVisible"
  (close)="onDialogClose($event)">
  <ng-content></ng-content>
</amw-dialog>
```

#### AmwPopoverComponent

Enhanced popover component with positioning and animations.

```typescript
import { AmwPopoverComponent } from "angular-material-wrap";

// Usage
<amw-popover
  [config]="popoverConfig"
  [visible]="popoverVisible"
  (close)="onPopoverClose($event)">
  <ng-content></ng-content>
</amw-popover>
```

#### AmwSidenavComponent

Enhanced sidenav component with responsive behavior.

```typescript
import { AmwSidenavComponent } from "angular-material-wrap";

// Usage
<amw-sidenav
  [config]="sidenavConfig"
  [open]="sidenavOpen"
  (toggle)="onSidenavToggle($event)">
  <ng-content></ng-content>
</amw-sidenav>
```

#### AmwStepperComponent

Enhanced stepper component with validation and navigation.

```typescript
import { AmwStepperComponent } from "angular-material-wrap";

// Usage
<amw-stepper
  [config]="stepperConfig"
  [currentStep]="currentStep"
  (stepChange)="onStepChange($event)"
  (complete)="onStepperComplete($event)">
</amw-stepper>
```

#### AmwTabsComponent

Enhanced tabs component with custom styling and animations.

```typescript
import { AmwTabsComponent } from "angular-material-wrap";

// Usage
<amw-tabs
  [config]="tabsConfig"
  [activeTab]="activeTab"
  (tabChange)="onTabChange($event)">
</amw-tabs>
```

#### AmwAccordionComponent

Enhanced accordion component with custom styling.

```typescript
import { AmwAccordionComponent } from "angular-material-wrap";

// Usage
<amw-accordion
  [config]="accordionConfig"
  [panels]="accordionPanels"
  (panelToggle)="onPanelToggle($event)">
</amw-accordion>
```

### Data Display Components

#### AmwCalendarComponent

Comprehensive calendar component with multiple display modes.

```typescript
import { AmwCalendarComponent } from "angular-material-wrap";

// Usage
<amw-calendar
  [config]="calendarConfig"
  [events]="calendarEvents"
  (eventClick)="onEventClick($event)"
  (dateSelect)="onDateSelect($event)">
</amw-calendar>
```

## Pages API

### Page Layout Components

#### AmwListPageComponent

Complete list/table page with filtering, sorting, and bulk actions.

```typescript
import { AmwListPageComponent } from "angular-material-wrap";

// Usage
<amw-list-page
  [config]="listPageConfig"
  [dataSource]="listPageDataSource"
  (itemSelect)="onItemSelect($event)"
  (actionClick)="onActionClick($event)"
  (bulkActionClick)="onBulkActionClick($event)">
</amw-list-page>
```

#### AmwDetailPageComponent

Complete detail/view page with sections and related data.

```typescript
import { AmwDetailPageComponent } from "angular-material-wrap";

// Usage
<amw-detail-page
  [config]="detailPageConfig"
  [dataSource]="detailPageDataSource"
  (editClick)="onEditClick($event)"
  (deleteClick)="onDeleteClick($event)"
  (actionClick)="onActionClick($event)">
</amw-detail-page>
```

#### AmwFormPageComponent

Complete form page with validation and sections.

```typescript
import { AmwFormPageComponent } from "angular-material-wrap";

// Usage
<amw-form-page
  [config]="formPageConfig"
  [dataSource]="formPageDataSource"
  (formSubmit)="onFormSubmit($event)"
  (formCancel)="onFormCancel($event)"
  (formChange)="onFormChange($event)">
</amw-form-page>
```

#### AmwSearchPageComponent

Complete search page with advanced filtering and results.

```typescript
import { AmwSearchPageComponent } from "angular-material-wrap";

// Usage
<amw-search-page
  [config]="searchPageConfig"
  [dataSource]="searchPageDataSource"
  (search)="onSearch($event)"
  (resultClick)="onResultClick($event)"
  (filterChange)="onFilterChange($event)">
</amw-search-page>
```

#### AmwWorkflowPageComponent

Complete workflow page with multi-step processes.

```typescript
import { AmwWorkflowPageComponent } from "angular-material-wrap";

// Usage
<amw-workflow-page
  [config]="workflowPageConfig"
  [dataSource]="workflowPageDataSource"
  (stepChange)="onStepChange($event)"
  (workflowComplete)="onWorkflowComplete($event)">
</amw-workflow-page>
```

#### AmwReportPageComponent

Complete report page with widgets and analytics.

```typescript
import { AmwReportPageComponent } from "angular-material-wrap";

// Usage
<amw-report-page
  [config]="reportPageConfig"
  [dataSource]="reportPageDataSource"
  (widgetRefresh)="onWidgetRefresh($event)"
  (filterChange)="onFilterChange($event)">
</amw-report-page>
```

## Styling API

### Theme Management

#### ThemeService

Service for managing themes and Material Design 3 implementation.

```typescript
import { ThemeService } from "angular-material-wrap";

// Usage
constructor(private themeService: ThemeService) {}

// Change theme
this.themeService.setTheme('light');
this.themeService.setTheme('dark');

// Get current theme
const currentTheme = this.themeService.getCurrentTheme();

// Subscribe to theme changes
this.themeService.themeChanges$.subscribe(theme => {
  console.log('Theme changed to:', theme);
});
```

#### ThemePickerComponent

Component for selecting and switching themes.

```typescript
import { ThemePickerComponent } from "angular-material-wrap";

// Usage
<amw-theme-picker
  [availableThemes]="availableThemes"
  [currentTheme]="currentTheme"
  (themeChange)="onThemeChange($event)">
</amw-theme-picker>
```

#### ThemeEditorComponent

Component for editing and customizing themes.

```typescript
import { ThemeEditorComponent } from "angular-material-wrap";

// Usage
<amw-theme-editor
  [theme]="currentTheme"
  (themeUpdate)="onThemeUpdate($event)">
</amw-theme-editor>
```

#### ThemeManagerComponent

Component for managing all theme-related functionality.

```typescript
import { ThemeManagerComponent } from "angular-material-wrap";

// Usage
<amw-theme-manager
  [themes]="availableThemes"
  [currentTheme]="currentTheme"
  (themeChange)="onThemeChange($event)"
  (themeSave)="onThemeSave($event)">
</amw-theme-manager>
```

## Directives API

### Utility Directives

#### AmwAutoFocusDirective

Automatically focuses an element when it becomes visible.

```typescript
import { AmwAutoFocusDirective } from "angular-material-wrap";

// Usage
<input amwAutoFocus />;
```

#### AmwClickOutsideDirective

Detects clicks outside an element.

```typescript
import { AmwClickOutsideDirective } from "angular-material-wrap";

// Usage
<div amwClickOutside (clickOutside)="onClickOutside($event)">
  Content
</div>
```

#### AmwCopyToClipboardDirective

Copies text to clipboard when clicked.

```typescript
import { AmwCopyToClipboardDirective } from "angular-material-wrap";

// Usage
<button amwCopyToClipboard [text]="textToCopy" (copied)="onCopied($event)">
  Copy
</button>
```

#### AmwTooltipDirective

Enhanced tooltip with custom positioning and styling.

```typescript
import { AmwTooltipDirective } from "angular-material-wrap";

// Usage
<button amwTooltip="Tooltip text" [tooltipConfig]="tooltipConfig">
  Hover me
</button>
```

## Pipes API

### Utility Pipes

#### AmwCurrencyPipe

Enhanced currency formatting pipe.

```typescript
import { AmwCurrencyPipe } from "angular-material-wrap";

// Usage
{{ amount | amwCurrency:'USD':'symbol':'1.2-2' }}
```

#### AmwDatePipe

Enhanced date formatting pipe.

```typescript
import { AmwDatePipe } from "angular-material-wrap";

// Usage
{{ date | amwDate:'short' }}
{{ date | amwDate:'full' }}
```

#### AmwTextTransformPipe

Text transformation pipe.

```typescript
import { AmwTextTransformPipe } from "angular-material-wrap";

// Usage
{{ text | amwTextTransform:'uppercase' }}
{{ text | amwTextTransform:'lowercase' }}
{{ text | amwTextTransform:'capitalize' }}
```

## Services API

### Global Services

#### AmwLoadingService

Service for managing loading states.

```typescript
import { AmwLoadingService } from "angular-material-wrap";

// Usage
constructor(private loadingService: AmwLoadingService) {}

// Show loading
this.loadingService.show('Loading...');

// Hide loading
this.loadingService.hide();

// Check loading state
const isLoading = this.loadingService.isLoading();
```

#### AmwMessagingService

Service for managing messages and notifications.

```typescript
import { AmwMessagingService } from "angular-material-wrap";

// Usage
constructor(private messagingService: AmwMessagingService) {}

// Show message
this.messagingService.showMessage('Success!', 'success');
this.messagingService.showMessage('Error!', 'error');

// Show notification
this.messagingService.showNotification({
  title: 'Notification',
  message: 'This is a notification',
  type: 'info'
});
```

#### AmwNotificationService

Service for managing notifications.

```typescript
import { AmwNotificationService } from "angular-material-wrap";

// Usage
constructor(private notificationService: AmwNotificationService) {}

// Show notification
this.notificationService.show({
  title: 'Notification',
  message: 'This is a notification',
  type: 'info',
  duration: 5000
});
```

## TypeScript Support

### Type Definitions

The library includes comprehensive TypeScript definitions:

- Component interfaces
- Configuration interfaces
- Service interfaces
- Event interfaces
- Data source interfaces

### IntelliSense Support

- Full autocomplete support
- Type checking
- JSDoc documentation
- Interface definitions

## Styling

### CSS Classes

Library components use BEM methodology with `amw-` prefix:

```scss
.amw-button {
}
.amw-button--primary {
}
.amw-button__icon {
}
.amw-button__text {
}
```

### SCSS Variables

Library components can be customized using SCSS variables:

```scss
// Customize library components
$amw-primary-color: #1976d2;
$amw-secondary-color: #dc004e;
$amw-border-radius: 4px;
```

## Browser Support

### Supported Browsers

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Polyfills

The library requires standard Angular polyfills:

- Zone.js
- Reflect metadata (if using decorators)

## Dependencies

### Peer Dependencies

```json
{
  "@angular/common": "^20.2.0",
  "@angular/core": "^20.2.0",
  "@angular/material": "^20.2.0",
  "@angular/cdk": "^20.2.0"
}
```

### Internal Dependencies

```json
{
  "tslib": "^2.3.0"
}
```

## Installation

### NPM

```bash
npm install angular-material-wrap
```

### Yarn

```bash
yarn add angular-material-wrap
```

### Manual Installation

1. Build the library: `npm run build:lib`
2. Copy `dist/angular-material-wrap/` to your project
3. Import from the local path

## Version Compatibility

### Angular Versions

- **Angular 20+**: Full support
- **Angular 19**: May work with minor adjustments
- **Angular 18 and below**: Not supported

### TypeScript Versions

- **TypeScript 5.8+**: Full support
- **TypeScript 5.0-5.7**: May work with minor adjustments
- **TypeScript 4.x**: Not supported

## Migration Guide

### From Previous Versions

When updating the library:

1. **Check Breaking Changes**: Review changelog for breaking changes
2. **Update Imports**: Update import statements if needed
3. **Update Usage**: Update component usage if API changed
4. **Test Integration**: Test your application with the new version

### Common Migration Steps

```typescript
// Before (example)
import { OldComponent } from "angular-material-wrap";

// After (example)
import { AmwButtonComponent } from "angular-material-wrap";
```

## Troubleshooting

### Common Issues

#### Import Errors

```typescript
// Error: Module not found
import { AmwButtonComponent } from 'angular-material-wrap';

// Solution: Check if library is properly installed
npm list angular-material-wrap
```

#### Type Errors

```typescript
// Error: Type not found
import { ButtonConfig } from "angular-material-wrap";

// Solution: Check TypeScript configuration
// Ensure "moduleResolution": "node" in tsconfig.json
```

#### Build Errors

```bash
# Error: Build fails
ng build

# Solution: Check peer dependencies
npm install @angular/common@^20.2.0 @angular/core@^20.2.0 @angular/material@^20.2.0
```

### Getting Help

1. **Documentation**: Check this documentation
2. **Issues**: Report issues on GitHub
3. **Examples**: Check demo app for usage examples
4. **Community**: Ask questions in Angular community forums
