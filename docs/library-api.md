# Library API

## Overview

The Angular Material Wrap (AMW) library provides enhanced Angular components built on Angular Material with modern signal-based APIs. All components use Angular's latest signal inputs/outputs for reactive, type-safe property binding.

## Public API

### Entry Point

All public exports are available through the main entry point:

```typescript
import {
  AmwButtonComponent,
  AmwInputComponent,
  AmwSelectComponent,
  AmwTabsComponent,
  ThemeService
} from "angular-material-wrap";
```

## Library Structure

### Controls (`/controls`)
Form controls extending Angular Material with enhanced functionality.

### Components (`/components`)
Layout and display components for common UI patterns.

### Services (`/services`)
Theme management and utility services.

### Pipes (`/pipes`)
Data transformation pipes.

### Directives (`/directives`)
Utility directives for common behaviors.

---

## Base Component Properties

All control components extend `BaseComponent<T>` which provides common properties:

### Common Inputs
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Whether the component is disabled |
| `required` | `boolean` | `false` | Whether the component is required |
| `placeholder` | `string` | `''` | Placeholder text |
| `label` | `string` | `''` | Label text |
| `errorMessage` | `string` | `''` | Error message to display |
| `hint` | `string` | `''` | Hint text to display |
| `readonly` | `boolean` | `false` | Whether the field is readonly |
| `name` | `string` | `''` | Component name attribute |
| `id` | `string` | `''` | Component id attribute |
| `tabIndex` | `number \| undefined` | `undefined` | Tab index for keyboard navigation |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Component size |
| `color` | `'primary' \| 'accent' \| 'warn' \| 'basic'` | `'primary'` | Component color theme |

### Accessibility Inputs
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `ariaLabel` | `string \| undefined` | `undefined` | Aria label |
| `ariaLabelledby` | `string \| undefined` | `undefined` | Aria labelledby reference |
| `ariaDescribedby` | `string \| undefined` | `undefined` | Aria describedby reference |
| `ariaRequired` | `boolean \| undefined` | `undefined` | Aria required attribute |
| `ariaInvalid` | `boolean \| undefined` | `undefined` | Aria invalid attribute |

### Model Properties (Two-way Binding)
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `hasError` | `boolean` | `false` | Whether the component has an error |
| `value` | `T \| null` | `null` | The component value |

### Common Events
| Event | Payload | Description |
|-------|---------|-------------|
| `valueChange` | `T \| null` | Emits when value changes |
| `change` | `T \| null` | Generic change event |
| `focus` | `FocusEvent` | Emits on focus |
| `blur` | `FocusEvent` | Emits on blur |

---

## Controls API

### AmwButtonComponent

Enhanced button with Material Design 3 styles and FAB support.

```html
<!-- Basic filled button -->
<amw-button>Click Me</amw-button>

<!-- Outlined button with icon -->
<amw-button appearance="outlined" icon="save" iconPosition="left">
  Save
</amw-button>

<!-- Tonal button with loading state -->
<amw-button appearance="tonal" [loading]="isLoading">
  Submit
</amw-button>

<!-- Icon-only button (inferred from icon + no text) -->
<amw-button icon="close" ariaLabel="Close"></amw-button>

<!-- Floating Action Button -->
<amw-button [fab]="true" icon="add"></amw-button>

<!-- Mini FAB -->
<amw-button fab="mini" icon="edit"></amw-button>

<!-- Extended FAB -->
<amw-button fab="extended" icon="add" text="Create"></amw-button>
```

**Button-Specific Inputs:**
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `appearance` | `'text' \| 'elevated' \| 'outlined' \| 'filled' \| 'tonal'` | `'filled'` | Visual style |
| `fab` | `boolean \| 'standard' \| 'mini' \| 'extended'` | `false` | FAB configuration |
| `icon` | `string \| undefined` | `undefined` | Material icon name |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Icon position |
| `loading` | `boolean` | `false` | Loading state |
| `fullWidth` | `boolean` | `false` | Full width button |
| `text` | `string` | `''` | Button text (alternative to ng-content) |
| `autofocus` | `boolean` | `false` | Auto-focus on render |
| `spinnerSize` | `number` | `20` | Loading spinner diameter |
| `spinnerColor` | `AmwColor` | `'primary'` | Loading spinner color |

**Button Events:**
| Event | Payload | Description |
|-------|---------|-------------|
| `buttonClick` | `MouseEvent` | Button click event |
| `buttonFocus` | `FocusEvent` | Button focus event |
| `buttonBlur` | `FocusEvent` | Button blur event |
| `mouseenter` | `MouseEvent` | Mouse enter event |
| `mouseleave` | `MouseEvent` | Mouse leave event |

**Form Attributes:**
| Property | Type | Description |
|----------|------|-------------|
| `form` | `string` | Form id to associate with |
| `formAction` | `string` | Form action URL |
| `formMethod` | `'get' \| 'post' \| 'put' \| 'delete'` | Form method |
| `formTarget` | `'_blank' \| '_self' \| '_parent' \| '_top'` | Form target |
| `formEnctype` | `string` | Form encoding type |
| `formNoValidate` | `boolean` | Skip form validation |

---

### AmwInputComponent

Enhanced input with validation, icons, and character count.

```html
<!-- Basic text input -->
<amw-input
  label="Username"
  placeholder="Enter username"
  [(value)]="username">
</amw-input>

<!-- Password with toggle -->
<amw-input
  type="password"
  label="Password"
  [showPasswordToggle]="true"
  [(value)]="password">
</amw-input>

<!-- Input with icons and validation -->
<amw-input
  type="email"
  label="Email"
  startIcon="email"
  [required]="true"
  [clearable]="true"
  [validationMessages]="{
    required: 'Email is required',
    email: 'Please enter a valid email'
  }"
  [(value)]="email">
</amw-input>

<!-- Textarea-like with character count -->
<amw-input
  label="Description"
  [maxlength]="500"
  [showCharacterCount]="true"
  [(value)]="description">
</amw-input>
```

**Input-Specific Properties (extends BaseComponent):**
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `InputType` | `'text'` | Input type (text, email, password, number, etc.) |
| `appearance` | `MatFormFieldAppearance` | `'outline'` | Form field appearance |
| `prefix` | `string` | `''` | Prefix text |
| `suffix` | `string` | `''` | Suffix text |
| `maxlength` | `number \| null` | `null` | Maximum length |
| `minlength` | `number \| null` | `null` | Minimum length |
| `max` | `number \| null` | `null` | Maximum value (for number type) |
| `min` | `number \| null` | `null` | Minimum value (for number type) |
| `step` | `number \| null` | `null` | Step value (for number type) |
| `pattern` | `string` | `''` | Validation pattern |
| `autocomplete` | `string` | `''` | Autocomplete attribute |
| `autofocus` | `boolean` | `false` | Auto-focus on render |
| `startIcon` | `string` | `''` | Leading icon |
| `endIcon` | `string` | `''` | Trailing icon |
| `clearable` | `boolean` | `false` | Show clear button |
| `showPasswordToggle` | `boolean` | `false` | Show password toggle |
| `showCharacterCount` | `boolean` | `false` | Show character count |
| `showValidationOnBlur` | `boolean` | `true` | Validate on blur |
| `showValidationOnChange` | `boolean` | `false` | Validate on change |
| `validationMessages` | `object` | `{}` | Custom validation messages |

**Input Events:**
| Event | Payload | Description |
|-------|---------|-------------|
| `inputEvent` | `Event` | Native input event |
| `keydown` | `KeyboardEvent` | Keydown event |
| `keyup` | `KeyboardEvent` | Keyup event |
| `clear` | `void` | Clear button clicked |
| `togglePassword` | `boolean` | Password visibility toggled |

---

### AmwSelectComponent

Enhanced select with search, groups, and multi-select.

```html
<!-- Basic select -->
<amw-select
  label="Country"
  [options]="countries"
  [(value)]="selectedCountry">
</amw-select>

<!-- Multi-select with search -->
<amw-select
  label="Tags"
  [options]="tags"
  [multiple]="true"
  [searchable]="true"
  [clearable]="true"
  [(value)]="selectedTags">
</amw-select>

<!-- Grouped options -->
<amw-select
  label="Category"
  [groups]="categoryGroups"
  [(value)]="selectedCategory">
</amw-select>
```

**SelectOption Interface:**
```typescript
interface SelectOption {
  value: any;
  label: string;
  disabled?: boolean;
  description?: string;
  icon?: string;
}
```

**Select-Specific Properties:**
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `appearance` | `MatFormFieldAppearance` | `'outline'` | Form field appearance |
| `options` | `SelectOption[]` | `[]` | Select options |
| `groups` | `{ [key: string]: SelectOption[] }` | `{}` | Grouped options |
| `multiple` | `boolean` | `false` | Allow multiple selection |
| `searchable` | `boolean` | `false` | Enable search |
| `clearable` | `boolean` | `false` | Show clear button |
| `loading` | `boolean` | `false` | Loading state |
| `compareWith` | `(a, b) => boolean` | `(a, b) => a === b` | Compare function |
| `searchPlaceholder` | `string` | `'Search...'` | Search placeholder |
| `noOptionsText` | `string` | `'No options available'` | Empty state text |
| `loadingText` | `string` | `'Loading...'` | Loading state text |

**Select Events:**
| Event | Payload | Description |
|-------|---------|-------------|
| `selectionChange` | `any` | Selection changed |
| `openedChange` | `boolean` | Panel opened/closed |
| `searchChange` | `string` | Search value changed |
| `clear` | `void` | Clear button clicked |

---

### AmwCheckboxComponent

Enhanced checkbox with indeterminate state support.

```html
<!-- Basic checkbox -->
<amw-checkbox
  label="Accept terms"
  [(checked)]="acceptTerms">
</amw-checkbox>

<!-- Checkbox with value -->
<amw-checkbox
  label="Enable notifications"
  [value]="'notifications'"
  [(checked)]="notificationsEnabled">
</amw-checkbox>

<!-- Indeterminate state -->
<amw-checkbox
  label="Select all"
  [(checked)]="selectAll"
  [(indeterminate)]="isPartialSelection">
</amw-checkbox>
```

**Checkbox-Specific Properties:**
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `labelPosition` | `'before' \| 'after'` | `'after'` | Label position |
| `indeterminate` | `boolean` | `false` | Indeterminate state (two-way) |
| `checked` | `boolean` | `false` | Checked state (two-way) |
| `disableRipple` | `boolean` | `false` | Disable ripple effect |

**Checkbox Events:**
| Event | Payload | Description |
|-------|---------|-------------|
| `checkboxChange` | `{ checked: boolean; value: any }` | Checkbox state changed |
| `indeterminateChange` | `boolean` | Indeterminate state changed |

---

### AmwRadioGroupComponent

Radio button group with enhanced styling.

```html
<amw-radio-group
  label="Shipping Method"
  [options]="shippingOptions"
  [(value)]="selectedShipping">
</amw-radio-group>
```

**RadioGroupOption Interface:**
```typescript
interface RadioGroupOption {
  value: any;
  label: string;
  disabled?: boolean;
  description?: string;
}
```

---

### AmwSliderComponent

Enhanced slider with step marks and value display.

```html
<amw-slider
  label="Volume"
  [min]="0"
  [max]="100"
  [step]="10"
  [showTickMarks]="true"
  [(value)]="volume">
</amw-slider>
```

---

### AmwRangeSliderComponent

Dual-handle range slider.

```html
<amw-range-slider
  label="Price Range"
  [min]="0"
  [max]="1000"
  [(startValue)]="minPrice"
  [(endValue)]="maxPrice">
</amw-range-slider>
```

---

### AmwSwitchComponent

Toggle switch component.

```html
<amw-switch
  label="Dark Mode"
  [(checked)]="isDarkMode">
</amw-switch>
```

---

### AmwTextareaComponent

Multi-line text input.

```html
<amw-textarea
  label="Comments"
  [rows]="5"
  [maxlength]="1000"
  [showCharacterCount]="true"
  [(value)]="comments">
</amw-textarea>
```

---

### AmwAutocompleteComponent

Input with autocomplete suggestions.

```html
<amw-autocomplete
  label="City"
  [options]="cityOptions"
  [displayWith]="displayCity"
  [(value)]="selectedCity">
</amw-autocomplete>
```

---

### AmwDatepickerComponent

Date selection component.

```html
<amw-datepicker
  label="Birth Date"
  [min]="minDate"
  [max]="maxDate"
  [(value)]="birthDate">
</amw-datepicker>
```

---

### AmwTimepickerComponent

Time selection component.

```html
<amw-timepicker
  label="Meeting Time"
  [format]="'12h'"
  [(value)]="meetingTime">
</amw-timepicker>
```

---

### AmwChipsComponent

Chip list for tags and selections.

```html
<amw-chips
  label="Skills"
  [chips]="skills"
  [removable]="true"
  [addOnBlur]="true"
  (chipAdd)="onSkillAdd($event)"
  (chipRemove)="onSkillRemove($event)">
</amw-chips>
```

---

### AmwFileInputComponent

File upload component.

```html
<amw-file-input
  label="Upload Document"
  [accept]="'.pdf,.doc,.docx'"
  [multiple]="true"
  [maxSize]="5242880"
  (fileSelect)="onFileSelect($event)">
</amw-file-input>
```

---

### AmwColorPickerComponent

Color selection component.

```html
<amw-color-picker
  label="Theme Color"
  [mode]="'hex'"
  [(value)]="themeColor">
</amw-color-picker>
```

---

### AmwToggleComponent

Toggle button component.

```html
<amw-toggle
  label="Notifications"
  [(checked)]="notificationsOn">
</amw-toggle>
```

---

## Components API

### AmwCardComponent

Card container with header, content, and actions.

```html
<amw-card
  [title]="'Card Title'"
  [subtitle]="'Card subtitle'"
  [elevation]="2">
  <ng-container amwCardContent>
    Card content goes here
  </ng-container>
  <ng-container amwCardActions>
    <amw-button>Action</amw-button>
  </ng-container>
</amw-card>
```

---

### AmwTabsComponent

Tabbed content container.

```html
<amw-tabs [tabs]="tabItems" (tabChange)="onTabChange($event)">
  <ng-template amwTabContent let-tab>
    {{ tab.content }}
  </ng-template>
</amw-tabs>
```

**TabItem Interface:**
```typescript
interface TabItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  content?: any;
}
```

---

### AmwDialogComponent

Modal dialog component.

```html
<amw-dialog
  [title]="'Confirm Action'"
  [open]="isDialogOpen"
  (close)="onDialogClose($event)">
  <ng-container amwDialogContent>
    Dialog content
  </ng-container>
  <ng-container amwDialogActions>
    <amw-button appearance="text" (buttonClick)="cancel()">Cancel</amw-button>
    <amw-button (buttonClick)="confirm()">Confirm</amw-button>
  </ng-container>
</amw-dialog>
```

---

### AmwAccordionComponent

Expandable panel container.

```html
<amw-accordion [multi]="true">
  <amw-accordion-panel title="Section 1">
    Panel 1 content
  </amw-accordion-panel>
  <amw-accordion-panel title="Section 2">
    Panel 2 content
  </amw-accordion-panel>
</amw-accordion>
```

---

### AmwSidenavComponent

Side navigation drawer.

```html
<amw-sidenav
  [mode]="'side'"
  [opened]="sidenavOpen"
  (openedChange)="onSidenavToggle($event)">
  <ng-container amwSidenavContent>
    Navigation links
  </ng-container>
</amw-sidenav>
```

---

### AmwStepperComponent

Multi-step workflow component.

```html
<amw-stepper
  [linear]="true"
  [orientation]="'horizontal'"
  (selectionChange)="onStepChange($event)">
  <amw-step label="Step 1">
    Step 1 content
  </amw-step>
  <amw-step label="Step 2">
    Step 2 content
  </amw-step>
</amw-stepper>
```

---

### AmwPopoverComponent

Popover/tooltip component.

```html
<amw-button [amwPopoverTrigger]="myPopover">
  Click for popover
</amw-button>

<amw-popover #myPopover [position]="'below'">
  Popover content
</amw-popover>
```

---

### AmwCalendarComponent

Full-featured calendar display.

```html
<amw-calendar-full
  [events]="calendarEvents"
  [view]="'month'"
  (dateSelect)="onDateSelect($event)"
  (eventClick)="onEventClick($event)">
</amw-calendar-full>
```

---

### AmwDataTableComponent

Data table with sorting, filtering, and pagination.

```html
<amw-data-table
  [columns]="tableColumns"
  [data]="tableData"
  [paginator]="true"
  [pageSize]="10"
  [sortable]="true"
  (rowClick)="onRowClick($event)"
  (sortChange)="onSort($event)">
</amw-data-table>
```

---

### Other Components

| Component | Description |
|-----------|-------------|
| `AmwMenuComponent` | Dropdown menu |
| `AmwMenuItemComponent` | Menu item |
| `AmwToolbarComponent` | App toolbar |
| `AmwIconComponent` | Material icon wrapper |
| `AmwDividerComponent` | Visual divider |
| `AmwProgressBarComponent` | Linear progress indicator |
| `AmwProgressSpinnerComponent` | Circular progress indicator |
| `AmwCalendarMiniComponent` | Compact calendar view |
| `AmwCalendarPickerComponent` | Date picker calendar |

---

## Services API

### ThemeService

Service for managing Material Design themes.

```typescript
import { ThemeService } from "angular-material-wrap";

@Component({...})
export class MyComponent {
  constructor(private themeService: ThemeService) {}

  toggleDarkMode() {
    this.themeService.setTheme(
      this.themeService.isDarkMode() ? 'light' : 'dark'
    );
  }

  ngOnInit() {
    // Subscribe to theme changes
    this.themeService.themeChanges$.subscribe(theme => {
      console.log('Theme changed:', theme);
    });
  }
}
```

**ThemeService Methods:**
| Method | Return | Description |
|--------|--------|-------------|
| `setTheme(theme)` | `void` | Set active theme |
| `getCurrentTheme()` | `Theme` | Get current theme |
| `isDarkMode()` | `boolean` | Check if dark mode |
| `toggleDarkMode()` | `void` | Toggle dark mode |

---

## Directives API

### AmwAutoFocusDirective

Auto-focus element on render.

```html
<input amwAutoFocus />
```

### AmwClickOutsideDirective

Detect clicks outside element.

```html
<div amwClickOutside (clickOutside)="onClickOutside()">
  Dropdown content
</div>
```

### AmwCopyToClipboardDirective

Copy text to clipboard.

```html
<button amwCopyToClipboard [text]="textToCopy" (copied)="onCopied()">
  Copy
</button>
```

### AmwTooltipDirective

Enhanced tooltip.

```html
<button amwTooltip="Tooltip text">Hover me</button>
```

---

## Pipes API

### amwDate

Enhanced date formatting.

```html
{{ date | amwDate:'short' }}
{{ date | amwDate:'full' }}
{{ date | amwDate:'relative' }}
```

### amwCurrency

Currency formatting.

```html
{{ amount | amwCurrency:'USD' }}
{{ amount | amwCurrency:'EUR':'symbol':'1.2-2' }}
```

### amwTextTransform

Text transformation.

```html
{{ text | amwTextTransform:'uppercase' }}
{{ text | amwTextTransform:'capitalize' }}
{{ text | amwTextTransform:'truncate':50 }}
```

---

## Styling

### CSS Classes

Components use BEM methodology with `amw-` prefix:

```scss
.amw-button { }
.amw-button--filled { }
.amw-button--outlined { }
.amw-button__icon { }
.amw-button__text { }
```

### CSS Custom Properties

Components use Material Design tokens:

```scss
--mdc-theme-primary
--mdc-theme-secondary
--mdc-theme-surface
--mdc-theme-on-surface
--mdc-shape-small
--mdc-shape-medium
--mdc-shape-large
```

---

## TypeScript Support

### Type Definitions

Full TypeScript support with exported types:

```typescript
import {
  ButtonStyle,
  FabType,
  SelectOption,
  TabItem,
  AmwColor,
  AmwSize
} from "angular-material-wrap";
```

---

## Dependencies

### Peer Dependencies

```json
{
  "@angular/common": "^21.0.0",
  "@angular/core": "^21.0.0",
  "@angular/material": "^21.0.0",
  "@angular/cdk": "^21.0.0"
}
```

---

## Installation

```bash
npm install angular-material-wrap
```

### Module Setup

Components are standalone - import directly:

```typescript
import { AmwButtonComponent, AmwInputComponent } from 'angular-material-wrap';

@Component({
  imports: [AmwButtonComponent, AmwInputComponent],
  // ...
})
export class MyComponent { }
```

---

## Version Compatibility

| Angular Version | Library Version |
|-----------------|-----------------|
| Angular 21+ | Latest |
| Angular 20 | v1.x |

---

## Button API Summary

The button component uses a clean, intuitive API:

- **Visual Style**: Use `appearance` property (`'filled'` default, or `'text'`, `'elevated'`, `'outlined'`, `'tonal'`)
- **FAB Buttons**: Use `fab` property (`true`, `'standard'`, `'mini'`, or `'extended'`)
- **Icon-Only**: Automatically inferred when `icon` is set without text content

```html
<!-- Default filled button -->
<amw-button>Save</amw-button>

<!-- Text button -->
<amw-button appearance="text">Cancel</amw-button>

<!-- Icon-only button (inferred) -->
<amw-button icon="close" ariaLabel="Close"></amw-button>

<!-- FAB -->
<amw-button [fab]="true" icon="add"></amw-button>

<!-- Mini FAB -->
<amw-button fab="mini" icon="edit"></amw-button>
```
