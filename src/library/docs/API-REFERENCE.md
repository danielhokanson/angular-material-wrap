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

#### AmwTimepickerComponent

Enhanced time picker with 12/24-hour format, seconds support, and custom step intervals.

```typescript
import { AmwTimepickerComponent } from "angular-material-wrap";

// Usage
<amw-timepicker
  [value]="'14:30'"
  [format]="'24h'"
  [showSeconds]="false"
  [step]="15"
  [color]="'primary'"
  (timeChange)="onTimeChange($event)">
</amw-timepicker>
```

**Properties:**

- `value: string` - Time value in HH:MM or HH:MM:SS format
- `config: TimepickerConfig` - Configuration object
- `color: AmwColor` - Color theme (primary, accent, warn)
- `size: AmwSize` - Size (small, medium, large)
- `step: number` - Minute increment step (default: 15)
- `format: '12h' | '24h'` - Time format (default: '24h')
- `showSeconds: boolean` - Show seconds selector (default: false)
- `disabled: boolean` - Disable timepicker
- `required: boolean` - Mark as required

**Events:**

- `timeChange: EventEmitter<string>` - Fires on time change
- `timepickerChange: EventEmitter<string>` - Fires on picker change

#### AmwColorPickerComponent

Enhanced color picker with palette, custom color, and text input modes.

```typescript
import { AmwColorPickerComponent } from "angular-material-wrap";

// Usage
<amw-color-picker
  [value]="'#FF5722'"
  [mode]="'palette'"
  [showPreview]="true"
  [showInput]="true"
  (colorChange)="onColorChange($event)">
</amw-color-picker>
```

**Properties:**

- `value: string` - Selected color in hex format
- `config: ColorPickerConfig` - Configuration object
- `mode: ColorPickerMode` - Picker mode (palette, custom, text, all)
- `size: AmwSize` - Size (small, medium, large)
- `showInput: boolean` - Show text input (default: true)
- `showPreview: boolean` - Show color preview (default: true)
- `showPalette: boolean` - Show color palette (default: true)
- `showCustom: boolean` - Show custom color picker (default: true)
- `disabled: boolean` - Disable picker
- `required: boolean` - Mark as required

**Events:**

- `colorChange: EventEmitter<string>` - Fires on color change
- `colorPickerChange: EventEmitter<string>` - Fires on picker change

#### AmwSliderComponent

Enhanced slider with tick marks, thumb labels, and vertical orientation support.

```typescript
import { AmwSliderComponent } from "angular-material-wrap";

// Usage
<amw-slider
  [min]="0"
  [max]="100"
  [step]="1"
  [thumbLabel]="true"
  [tickInterval]="10"
  [color]="'primary'"
  [(ngModel)]="sliderValue">
</amw-slider>
```

**Properties:**

- `color: AmwColor` - Color theme (primary, accent, warn)
- `disabled: boolean` - Disable slider
- `min: number` - Minimum value (default: 0)
- `max: number` - Maximum value (default: 100)
- `step: number` - Increment step (default: 1)
- `thumbLabel: boolean` - Show value label on thumb
- `tickInterval: number | 'auto'` - Distance between tick marks
- `vertical: boolean` - Vertical orientation
- `invert: boolean` - Invert slider range

**Events:**

- `change: EventEmitter<{ value: number; source: any }>` - Fires on value change
- `input: EventEmitter<{ value: number; source: any }>` - Fires during input

#### AmwRangeSliderComponent

Enhanced range slider for selecting min/max value ranges with dual thumbs.

```typescript
import { AmwRangeSliderComponent } from "angular-material-wrap";

// Usage
<amw-range-slider
  [min]="0"
  [max]="100"
  [step]="1"
  [(rangeValue)]="priceRange"
  [showTicks]="true"
  [showLabels]="true"
  (rangeChange)="onRangeChange($event)">
</amw-range-slider>
```

**Properties:**

- `min: number` - Minimum value (default: 0)
- `max: number` - Maximum value (default: 100)
- `step: number` - Increment step (default: 1)
- `rangeValue: { start: number; end: number }` - Current range value
- `showTicks: boolean` - Show tick marks
- `showLabels: boolean` - Show value labels
- `vertical: boolean` - Vertical orientation
- `thumbLabel: boolean` - Show thumb labels
- `color: AmwColor` - Color theme

**Events:**

- `rangeChange: EventEmitter<{ start: number; end: number }>` - Fires on range change
- `rangeValueChange: EventEmitter<{ start: number; end: number }>` - Fires on value change

#### AmwToggleComponent

Enhanced toggle switch with label positioning and ripple effects.

```typescript
import { AmwToggleComponent } from "angular-material-wrap";

// Usage
<amw-toggle
  [label]="'Toggle Label'"
  [checked]="true"
  [labelPosition]="'after'"
  [color]="'primary'"
  (change)="onToggleChange($event)">
</amw-toggle>
```

**Properties:**

- `color: AmwColor` - Color theme
- `disabled: boolean` - Disable toggle
- `required: boolean` - Mark as required
- `checked: boolean` - Initial checked state
- `label: string` - Label text
- `labelPosition: 'before' | 'after'` - Label position (default: 'after')
- `disableRipple: boolean` - Disable ripple effect

**Events:**

- `change: EventEmitter<{ checked: boolean; value: any }>` - Fires on toggle change

#### AmwSwitchComponent

Enhanced switch component with size variants and indeterminate state support.

```typescript
import { AmwSwitchComponent } from "angular-material-wrap";

// Usage
<amw-switch
  [(checked)]="switchValue"
  [size]="'medium'"
  [color]="'primary'"
  [labelPosition]="'after'"
  (switchChange)="onSwitchChange($event)">
  Enable Feature
</amw-switch>
```

**Properties:**

- `checked: boolean` - Initial checked state
- `size: AmwSize` - Size (small, medium, large)
- `color: AmwColor` - Color theme
- `labelPosition: 'before' | 'after'` - Label position
- `indeterminate: boolean` - Indeterminate state
- `disabled: boolean` - Disable switch
- `required: boolean` - Mark as required

**Events:**

- `checkedChange: EventEmitter<boolean>` - Fires when checked state changes
- `switchChange: EventEmitter<boolean>` - Fires on switch change

#### AmwTextareaComponent

Enhanced textarea with auto-resize, character counter, and max length validation.

```typescript
import { AmwTextareaComponent } from "angular-material-wrap";

// Usage
<amw-textarea
  [appearance]="'outline'"
  [label]="'Description'"
  [rows]="4"
  [maxLength]="500"
  [placeholder]="'Enter description...'"
  [(ngModel)]="description">
</amw-textarea>
```

**Properties:**

- `appearance: MatFormFieldAppearance` - Form field appearance (outline, fill, standard)
- `disabled: boolean` - Disable textarea
- `required: boolean` - Mark as required
- `placeholder: string` - Placeholder text
- `label: string` - Label text
- `hint: string` - Hint text
- `rows: number` - Number of visible rows (default: 4)
- `cols: number` - Number of columns
- `maxLength: number` - Maximum text length
- `minLength: number` - Minimum text length
- `wrap: 'soft' | 'hard' | 'off'` - Text wrapping mode
- `readonly: boolean` - Read-only mode
- `spellcheck: boolean` - Enable spellcheck (default: true)

**Events:**

- `change: EventEmitter<string>` - Fires on value change
- `input: EventEmitter<string>` - Fires during input

#### AmwFileInputComponent

Enhanced file input with drag-and-drop, preview, validation, and upload progress tracking.

```typescript
import { AmwFileInputComponent } from "angular-material-wrap";

// Usage
<amw-file-input
  [multiple]="true"
  [accept]="'image/*'"
  [maxSize]="5 * 1024 * 1024"
  [maxFiles]="5"
  [(selectedFiles)]="files"
  (filesChange)="onFilesChange($event)"
  (fileRemove)="onFileRemove($event)">
</amw-file-input>
```

**Properties:**

- `multiple: boolean` - Allow multiple file selection
- `accept: string` - Accepted file types (e.g., 'image/*', 'application/pdf')
- `maxSize: number` - Maximum file size in bytes (default: 10MB)
- `minSize: number` - Minimum file size in bytes
- `maxFiles: number` - Maximum number of files (default: 10)
- `showPreview: boolean` - Show file preview (default: true)
- `showProgress: boolean` - Show upload progress (default: true)
- `allowDragDrop: boolean` - Allow drag and drop (default: true)
- `showFileList: boolean` - Show selected files list (default: true)
- `placeholderText: string` - Placeholder text
- `buttonText: string` - Button text
- `selectedFiles: File[]` - Currently selected files

**Events:**

- `filesChange: EventEmitter<File[]>` - Fires when files change
- `selectedFilesChange: EventEmitter<File[]>` - Fires on file selection
- `fileSelect: EventEmitter<File[]>` - Fires when files are selected
- `fileRemove: EventEmitter<File>` - Fires when a file is removed
- `validationChange: EventEmitter<FileValidationResult>` - Fires on validation
- `uploadProgress: EventEmitter<FileUploadProgress[]>` - Upload progress tracking

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

Enhanced stepper component with validation, navigation, and comprehensive step management.

```typescript
import { AmwStepperComponent, StepperConfig, StepperStep } from "angular-material-wrap";

// Usage
<amw-stepper
  [config]="stepperConfig"
  [steps]="steps"
  [currentStep]="0"
  [linear]="true"
  [vertical]="false"
  (stepChange)="onStepChange($event)"
  (completed)="onCompleted()">
</amw-stepper>
```

**Properties:**

- `config: StepperConfig` - Stepper configuration object
- `steps: StepperStep[]` - Array of stepper steps
- `currentStep: number` - Current active step index (default: 0)
- `linear: boolean` - Must complete steps in order (default: true)
- `vertical: boolean` - Vertical orientation (default: false)
- `showLabels: boolean` - Show step labels (default: true)
- `showIcons: boolean` - Show step icons (default: true)
- `showDescriptions: boolean` - Show step descriptions (default: true)
- `showNavigation: boolean` - Show navigation buttons (default: true)
- `showCompletion: boolean` - Show completion button (default: true)
- `disabled: boolean` - Disable the stepper

**Events:**

- `stepChange: EventEmitter<number>` - Emits new step index when active step changes
- `completed: EventEmitter<void>` - Emitted when stepper is completed
- `stepValidated: EventEmitter<{ stepIndex: number; isValid: boolean }>` - Emitted when step is validated

**StepperConfig Interface:**

```typescript
interface StepperConfig {
  orientation?: 'horizontal' | 'vertical';
  linear?: boolean;
  showLabels?: boolean;
  showIcons?: boolean;
  showDescriptions?: boolean;
  showNavigation?: boolean;
  showCompletion?: boolean;
  allowBackNavigation?: boolean;
  allowSkipSteps?: boolean;
  validateSteps?: boolean;
}
```

**StepperStep Interface:**

```typescript
interface StepperStep {
  label: string;                           // Step label (required)
  description?: string;                    // Step description
  icon?: string;                          // Material icon name
  content?: string;                       // Step content
  isCompleted?: boolean;                  // Completion status
  isValid?: boolean;                      // Validation status
  isDisabled?: boolean;                   // Disabled state
  isOptional?: boolean;                   // Optional flag
  validator?: (step: StepperStep) => boolean;
  data?: any;                             // Additional data
}
```

**Key Methods:**

- `nextStep()` - Navigate to next step
- `previousStep()` - Navigate to previous step
- `goToStep(index: number)` - Navigate to specific step
- `completeStepper()` - Complete the stepper
- `resetStepper()` - Reset to first step
- `getProgress()` - Returns progress percentage (0-100)

#### AmwTabsComponent

Enhanced tabs component with custom styling, animations, closable tabs, and drag-to-reorder support.

```typescript
import { AmwTabsComponent, TabsConfig, TabItem } from "angular-material-wrap";

// Usage
<amw-tabs
  [config]="tabsConfig"
  [tabs]="tabs"
  [activeTab]="0"
  [showIcons]="true"
  [closable]="false"
  [draggable]="false"
  (tabChange)="onTabChange($event)"
  (tabClose)="onTabClose($event)">
</amw-tabs>
```

**Properties:**

- `config: TabsConfig` - Tabs configuration object
- `tabs: TabItem[]` - Array of tab items
- `activeTab: number` - Active tab index (default: 0)
- `showIcons: boolean` - Show tab icons (default: true)
- `showBadges: boolean` - Show tab badges (default: true)
- `showCloseButtons: boolean` - Show close buttons (default: false)
- `closable: boolean` - Tabs are closable (default: false)
- `draggable: boolean` - Tabs are draggable (default: false)
- `disabled: boolean` - Disable the tabs

**Events:**

- `tabChange: EventEmitter<number>` - Emits new tab index when active tab changes
- `tabClose: EventEmitter<number>` - Emitted when a tab is closed; emits closed tab index
- `tabAdd: EventEmitter<void>` - Emitted when a new tab is added
- `tabReorder: EventEmitter<{ from: number; to: number }>` - Emitted when tabs are reordered

**TabsConfig Interface:**

```typescript
interface TabsConfig {
  orientation?: 'horizontal' | 'vertical';
  alignment?: 'start' | 'center' | 'end' | 'stretch';
  showIcons?: boolean;
  showBadges?: boolean;
  showCloseButtons?: boolean;
  closable?: boolean;
  draggable?: boolean;
  showAddButton?: boolean;
  showScrollButtons?: boolean;
}
```

**TabItem Interface:**

```typescript
interface TabItem {
  label: string;                          // Tab label (required)
  content: string;                        // Tab content (required)
  icon?: string;                          // Material icon name
  badgeCount?: number;                    // Badge notification count
  badgeColor?: string;                    // Badge color
  isDisabled?: boolean;                   // Disabled state
  isClosable?: boolean;                   // Closable state
  isValid?: boolean;                      // Validation status
  data?: any;                             // Additional data
}
```

**Key Methods:**

- `changeTab(index: number)` - Change active tab
- `closeTab(index: number)` - Close a tab
- `addTab()` - Add a new tab
- `reorderTabs(from: number, to: number)` - Reorder tabs
- `getActiveTab()` - Returns currently active tab

#### AmwAccordionComponent

Enhanced accordion component with multi-expand support, badges, and comprehensive panel management.

```typescript
import { AmwAccordionComponent, AccordionConfig, AccordionPanel } from "angular-material-wrap";

// Usage
<amw-accordion
  [config]="accordionConfig"
  [panels]="panels"
  [expandedPanels]="[0]"
  [multiExpand]="true"
  [showIcons]="true"
  (panelToggle)="onPanelToggle($event)"
  (panelExpand)="onPanelExpand($event)"
  (panelCollapse)="onPanelCollapse($event)">
</amw-accordion>
```

**Properties:**

- `config: AccordionConfig` - Accordion configuration object
- `panels: AccordionPanel[]` - Array of accordion panels
- `expandedPanels: number[]` - Array of expanded panel indices (default: [])
- `multiExpand: boolean` - Allow multiple panels expanded (default: true)
- `showIcons: boolean` - Show panel icons (default: true)
- `showDescriptions: boolean` - Show panel descriptions (default: true)
- `showBadges: boolean` - Show panel badges (default: true)
- `disabled: boolean` - Disable the accordion

**Events:**

- `panelToggle: EventEmitter<{ panelIndex: number; isExpanded: boolean }>` - Emitted when panel is toggled
- `panelExpand: EventEmitter<number>` - Emitted when panel is expanded; emits panel index
- `panelCollapse: EventEmitter<number>` - Emitted when panel is collapsed; emits panel index
- `panelValidated: EventEmitter<{ panelIndex: number; isValid: boolean }>` - Emitted when panel is validated

**AccordionConfig Interface:**

```typescript
interface AccordionConfig {
  multiExpand?: boolean;
  showIcons?: boolean;
  showDescriptions?: boolean;
  showBadges?: boolean;
  showExpandCollapseAll?: boolean;
  showPanelActions?: boolean;
}
```

**AccordionPanel Interface:**

```typescript
interface AccordionPanel {
  title: string;                          // Panel title (required)
  content: string;                        // Panel content (required)
  description?: string;                   // Panel description
  icon?: string;                          // Material icon name
  badgeCount?: number;                    // Badge notification count
  badgeColor?: string;                    // Badge color
  isDisabled?: boolean;                   // Disabled state
  isExpanded?: boolean;                   // Default expanded state
  isValid?: boolean;                      // Validation status
  data?: any;                             // Additional data
}
```

**Key Methods:**

- `togglePanel(index: number)` - Toggle panel expanded state
- `expandPanel(index: number)` - Expand a panel
- `collapsePanel(index: number)` - Collapse a panel
- `expandAll()` - Expand all panels
- `collapseAll()` - Collapse all panels
- `isPanelExpanded(index: number)` - Check if panel is expanded

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

#### AmwHttpCacheService

Advanced HTTP caching service with two-tier storage (memory + IndexedDB) and cross-tab synchronization.

```typescript
import { HttpCacheService, httpCacheInterceptor } from "angular-material-wrap";
import { provideHttpClient, withInterceptors } from '@angular/common/http';

// Setup (app.config.ts)
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([httpCacheInterceptor]))
  ]
};

// Configuration (assets/cache-map.json)
{
  "api/users": 60000,
  "api/users/:id": 300000,
  "api/products": 30000,
  "api/products/:id": 300000
}

// Usage in component
constructor(private http: HttpClient) {}

ngOnInit() {
  // First call: Makes HTTP request, caches response
  this.http.get('api/users').subscribe(users => {
    console.log('Users:', users);
  });

  // Second call (within timeout): Returns cached response instantly
  this.http.get('api/users').subscribe(users => {
    console.log('Cached users:', users);
  });
}

// Manual cache management (optional)
constructor(private cacheService: HttpCacheService) {}

clearUserCache() {
  this.cacheService.delete('api/users').subscribe();
  this.cacheService.delete('api/users/123').subscribe();
}

monitorStorage() {
  this.cacheService.getStorageStats().subscribe(stats => {
    console.log('Cache size:', stats.memorySize + stats.indexedDbSize);
    console.log('Storage usage:', stats.storageEstimate?.percentage + '%');
  });
}
```

**Key Methods:**

- `get(url: string): Observable<HttpResponse<any> | null>` - Get cached response
- `put(url: string, response: HttpResponse<any>, timeout: number): Observable<void>` - Store response in cache
- `delete(url: string): Observable<void>` - Delete specific cached entry
- `clear(): Observable<void>` - Clear all cached entries
- `size(): number` - Get memory cache size (synchronous)
- `totalSize(): Observable<number>` - Get total cache size including IndexedDB
- `pruneExpired(): Observable<number>` - Remove expired entries
- `getStorageStats(): Observable<StorageStats>` - Get storage statistics

**Features:**

- **Automatic Caching**: Automatically caches GET requests based on configuration
- **Two-Tier Storage**: L1 (memory) for fast access, L2 (IndexedDB) for persistence
- **Cross-Tab Sync**: BroadcastChannel API synchronizes cache across browser tabs
- **Pattern Matching**: Supports :id, :param, and * wildcards in URL patterns
- **Configurable Timeouts**: Set different cache durations per URL pattern
- **In-Flight Deduplication**: Prevents duplicate simultaneous requests
- **Storage Monitoring**: Real-time usage tracking and quota monitoring
- **Automatic Expiration**: Time-based cache invalidation

**Configuration:**

Create `assets/cache-map.json` with URL patterns and timeouts (in milliseconds):

```json
{
  "api/users": 60000,              // 1 minute
  "api/users/:id": 300000,         // 5 minutes
  "api/products": 30000,           // 30 seconds
  "api/products/:id": 300000,      // 5 minutes
  "api/categories": 600000,        // 10 minutes
  "api/search/*": 60000            // 1 minute (wildcard)
}
```

**Pattern Matching:**

- Exact match: `"api/users"` → matches `api/users`
- Numeric ID: `"api/users/:id"` → matches `api/users/123`
- Parameter: `"api/categories/:param"` → matches `api/categories/electronics`
- Wildcard: `"api/search/*"` → matches `api/search/anything/else`

**Best Practices:**

1. Cache immutable/reference data with longer timeouts
2. Use shorter timeouts for frequently changing data
3. Only caches GET requests (mutations not cached)
4. Clear related cache entries after data modifications
5. Monitor storage usage for large datasets
6. Never cache sensitive data (tokens, passwords, PII)

**Performance:**

- Memory cache hit: < 1ms
- IndexedDB hit: 2-10ms
- HTTP request (cache miss): 100-1000ms+

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
