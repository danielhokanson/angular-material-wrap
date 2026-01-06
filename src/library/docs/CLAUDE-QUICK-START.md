# Angular Material Wrap - Quick Start for AI Assistants

## What This Is
A comprehensive Angular library with 40+ Material Design components, including enhanced controls, complex components, and complete page layouts. Angular 21+, standalone components, Material Design 3, TypeScript 5.8+.

## For Implementing in Another App

### Installation
```bash
npm install angular-material-wrap
npm install @angular/common @angular/core @angular/cdk @angular/material @angular/animations
```

### Setup (3 steps)
1. **Add animations** in `main.ts`:
```typescript
import { provideAnimations } from '@angular/platform-browser/animations';
bootstrapApplication(AppComponent, {
  providers: [provideAnimations()]
});
```

2. **Import styles** in `styles.scss`:
```scss
@use 'angular-material-wrap/styles';
```

3. **Import components** (all are standalone):
```typescript
import { AmwButtonComponent, AmwInputComponent, AmwDataTableComponent } from 'angular-material-wrap';

@Component({
  standalone: true,
  imports: [AmwButtonComponent, AmwInputComponent],
  template: `
    <amw-input [config]="{ label: 'Name' }" [(ngModel)]="name" />
    <amw-button [config]="{ color: 'primary' }" (click)="save()">Save</amw-button>
  `
})
```

### Quick Examples

**Simple Form:**
```typescript
import { AmwInputComponent, AmwSelectComponent, AmwButtonComponent } from 'angular-material-wrap';
// Use: <amw-input>, <amw-select>, <amw-button>
```

**Data Table:**
```typescript
import { AmwDataTableComponent, DataTableConfig } from 'angular-material-wrap';
// Use: <amw-data-table [config]="config" [columns]="columns" [data]="data">
```

**Complete Page:**
```typescript
import { AmwListPageComponent, ListPageData } from 'angular-material-wrap';
// Use: <amw-list-page [config]="config" [data]="pageData">
```

**Theme:**
```typescript
import { ThemeService } from 'angular-material-wrap';
themeService.setTheme('light' | 'dark');
```

## Library Organization

### 1. Controls (17 Components)
- **Forms**: Button, Input, Select, Checkbox, Radio, Radio Group, Switch, Toggle, Slider, Range Slider, Textarea
- **Advanced**: Autocomplete, Chips, Color Picker, Date Picker, Time Picker, File Input
- **Data**: Data Table with sorting, filtering, pagination

### 2. Components (9 Components)
- **Layout**: Card, Dialog, Popover, Sidenav, Stepper, Tabs, Accordion
- **Data**: Calendar (Full, Mini, Item Editor)

### 3. Pages (6 Complete Layouts)
- List/Table Page, Detail/View Page, Form/Create-Edit Page
- Search/Filter Page, Workflow/Process Page, Report/Analytics Page

### 4. Services (5 Services)
- **ThemeService**: Dynamic theme management
- **AmwLoadingService**: Loading state management
- **AmwMessagingService**: Inter-component messaging
- **AmwNotificationService**: Toast notifications
- **AmwHttpCacheService**: HTTP caching with IndexedDB + memory storage

### 5. Directives & Pipes
- **Directives (4)**: AutoFocus, ClickOutside, CopyToClipboard, Tooltip
- **Pipes (3)**: Currency, Date, TextTransform

### 6. Styling
- Material Design 3 with dynamic theming

## Key Points
- All components use `amw-` prefix
- All components are standalone (no NgModules)
- Fully typed with comprehensive interfaces
- BEM CSS methodology
- Works with Angular 21+ and Material 21+

## Full Documentation
For complete details, see:
- [Implementation Guide](./docs/implementation-guide.md) - Complete step-by-step guide
- [Library API](./docs/library-api.md) - Full API reference
- [Demo App](./src/demo/) - Working examples

## Common Pattern
```typescript
import { Component } from '@angular/core';
import {
  AmwInputComponent,
  AmwSelectComponent,
  AmwButtonComponent,
  SelectOption
} from 'angular-material-wrap';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [AmwInputComponent, AmwSelectComponent, AmwButtonComponent],
  template: `
    <amw-input
      [config]="{ label: 'Name', required: true }"
      [(ngModel)]="name" />

    <amw-select
      [config]="{ label: 'Role' }"
      [options]="roles"
      [(ngModel)]="role" />

    <amw-button
      [config]="{ color: 'primary' }"
      (click)="save()">
      Save
    </amw-button>
  `
})
export class UserFormComponent {
  name = '';
  role = '';
  roles: SelectOption[] = [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' }
  ];

  save() { /* ... */ }
}
```

## Troubleshooting
- **Import errors**: Check `npm list angular-material-wrap` and verify installation
- **No styles**: Ensure `@use 'angular-material-wrap/styles';` in `styles.scss`
- **No animations**: Add `provideAnimations()` to app bootstrap
- **Type errors**: Ensure TypeScript 5.8+ and `"moduleResolution": "node"` in `tsconfig.json`
