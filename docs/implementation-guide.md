# Angular Material Wrap - Implementation Guide

## Guide for AI Assistants

This document provides step-by-step instructions for implementing the Angular Material Wrap library in another Angular application. This guide is optimized for AI assistants (like Claude) to quickly understand how to integrate and use this library effectively.

## Overview

**Angular Material Wrap** is a comprehensive Angular library providing enhanced Material Design components, complete page layouts, and advanced UI patterns. It includes:
- **20+ Enhanced Controls**: Form controls with additional functionality
- **10+ Complex Components**: Advanced UI components
- **6 Page Stereotypes**: Complete page layout patterns
- **Material Design 3**: Full theme management

**Key Characteristics:**
- All components are **standalone** (no NgModules required)
- Works with Angular 20+ and Angular Material 20+
- TypeScript 5.8+ required
- Fully typed with comprehensive interfaces

## Prerequisites

Before implementing this library, ensure the target application has:

1. **Angular 20.2.0 or higher**
2. **Angular Material 20.2.0 or higher**
3. **TypeScript 5.8.0 or higher**
4. **Node.js and npm**

## Installation Steps

### Step 1: Install the Library

```bash
npm install angular-material-wrap
```

**Note**: If the library is not yet published to npm, use local installation:

```bash
# Build the library first
cd /path/to/angular-material-wrap
npm run build:lib

# In your target application
npm install /path/to/angular-material-wrap/dist/angular-material-wrap
```

### Step 2: Install Peer Dependencies

Ensure Angular Material and its dependencies are installed:

```bash
npm install @angular/common@^21.0.0 \
            @angular/core@^21.0.0 \
            @angular/cdk@^21.0.0 \
            @angular/material@^21.0.0 \
            @angular/animations@^21.0.0
```

### Step 3: Configure Angular Animations

In your `main.ts` or application bootstrap file, add `provideAnimations()`:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    // ... other providers
  ]
}).catch((err) => console.error(err));
```

**For module-based apps**, add to `app.module.ts`:

```typescript
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    // ... other imports
  ]
})
export class AppModule { }
```

### Step 4: Import Library Styles

Add the library styles to your global `styles.scss` file:

```scss
/* Import Angular Material Wrap Library Styles */
@use 'angular-material-wrap/styles';

/* Your other global styles */
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
}
```

**Note**: The library includes Material Design 3 theme styles. If you have custom Material themes, import them after the library styles.

### Step 5: Configure TypeScript (if needed)

Ensure your `tsconfig.json` has proper module resolution:

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true
  }
}
```

## Basic Usage

### Using Components (Standalone Apps)

Since all components are standalone, simply import them directly in your component:

```typescript
import { Component } from '@angular/core';
import { AmwButtonComponent, AmwInputComponent } from 'angular-material-wrap';

@Component({
  selector: 'app-my-form',
  standalone: true,
  imports: [AmwButtonComponent, AmwInputComponent],
  template: `
    <div class="form-container">
      <amw-input
        [config]="{ label: 'Username', placeholder: 'Enter username' }"
        [(ngModel)]="username">
      </amw-input>

      <amw-button
        appearance="filled"
        color="primary"
        (click)="onSubmit()">
        Submit
      </amw-button>
    </div>
  `
})
export class MyFormComponent {
  username = '';

  onSubmit() {
    console.log('Username:', this.username);
  }
}
```

### Using Components (Module-Based Apps)

For module-based apps, import components in your module:

```typescript
import { NgModule } from '@angular/core';
import { AmwButtonComponent, AmwInputComponent, AmwDataTableComponent } from 'angular-material-wrap';

@NgModule({
  imports: [
    AmwButtonComponent,
    AmwInputComponent,
    AmwDataTableComponent,
    // ... other imports
  ],
  declarations: [
    // Your components
  ]
})
export class FeatureModule { }
```

## Common Patterns

### Pattern 1: Simple Form with Controls

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AmwInputComponent,
  AmwSelectComponent,
  AmwButtonComponent,
  SelectOption
} from 'angular-material-wrap';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule, AmwInputComponent, AmwSelectComponent, AmwButtonComponent],
  template: `
    <form (ngSubmit)="onSubmit()">
      <amw-input
        [config]="{ label: 'Name', required: true }"
        [(ngModel)]="user.name"
        name="name">
      </amw-input>

      <amw-select
        [config]="{ label: 'Role', placeholder: 'Select role' }"
        [options]="roleOptions"
        [(ngModel)]="user.role"
        name="role">
      </amw-select>

      <amw-button
        [config]="{ color: 'primary' }"
        type="submit">
        Save User
      </amw-button>
    </form>
  `
})
export class UserFormComponent {
  user = { name: '', role: '' };

  roleOptions: SelectOption[] = [
    { value: 'admin', label: 'Administrator' },
    { value: 'user', label: 'User' },
    { value: 'guest', label: 'Guest' }
  ];

  onSubmit() {
    console.log('User:', this.user);
  }
}
```

### Pattern 2: Data Table with Actions

```typescript
import { Component } from '@angular/core';
import {
  AmwDataTableComponent,
  DataTableConfig,
  DataTableColumn
} from 'angular-material-wrap';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [AmwDataTableComponent],
  template: `
    <amw-data-table
      [config]="tableConfig"
      [columns]="columns"
      [data]="users"
      (rowClick)="onRowClick($event)"
      (actionClick)="onActionClick($event)">
    </amw-data-table>
  `
})
export class UserListComponent {
  tableConfig: DataTableConfig = {
    title: 'Users',
    enableSearch: true,
    enablePagination: true,
    pageSize: 10
  };

  columns: DataTableColumn[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role', sortable: true }
  ];

  users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
  ];

  onRowClick(row: any) {
    console.log('Row clicked:', row);
  }

  onActionClick(event: any) {
    console.log('Action clicked:', event);
  }
}
```

### Pattern 3: Complete List Page

```typescript
import { Component } from '@angular/core';
import {
  AmwListPageComponent,
  ListPageData,
  ListPageConfig
} from 'angular-material-wrap';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [AmwListPageComponent],
  template: `
    <amw-list-page
      [config]="pageConfig"
      [data]="pageData"
      (actionClick)="onAction($event)"
      (rowClick)="onRowClick($event)">
    </amw-list-page>
  `
})
export class ProductsPageComponent {
  pageConfig: ListPageConfig = {
    title: 'Products',
    enableSearch: true,
    enableFilters: true,
    enableBulkActions: true
  };

  pageData: ListPageData = {
    columns: [
      { key: 'name', label: 'Product Name', sortable: true },
      { key: 'price', label: 'Price', sortable: true },
      { key: 'stock', label: 'Stock', sortable: true }
    ],
    data: [
      { id: 1, name: 'Widget A', price: 29.99, stock: 100 },
      { id: 2, name: 'Widget B', price: 49.99, stock: 50 }
    ],
    actions: [
      { id: 'view', label: 'View', icon: 'visibility' },
      { id: 'edit', label: 'Edit', icon: 'edit' },
      { id: 'delete', label: 'Delete', icon: 'delete' }
    ]
  };

  onAction(event: any) {
    console.log('Action:', event);
  }

  onRowClick(row: any) {
    console.log('Row clicked:', row);
  }
}
```

### Pattern 4: Theme Management

```typescript
import { Component, inject } from '@angular/core';
import { ThemeService } from 'angular-material-wrap';

@Component({
  selector: 'app-settings',
  standalone: true,
  template: `
    <div>
      <h2>Theme Settings</h2>
      <button (click)="toggleTheme()">
        Current: {{ currentTheme }}
      </button>
    </div>
  `
})
export class SettingsComponent {
  private themeService = inject(ThemeService);

  get currentTheme() {
    return this.themeService.getCurrentTheme();
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.themeService.setTheme(newTheme);
  }
}
```

## Library Organization

The library is organized into four main areas:

### 1. Controls (`/controls`)
Enhanced wrappers of Angular Material form controls:
- **Basic**: Button, Input, Select, Checkbox, Radio, Switch, Toggle, Slider
- **Advanced**: Autocomplete, Chips, Color Picker, Date Picker, Time Picker, File Input
- **Data**: Data Table with sorting, filtering, pagination

### 2. Components (`/components`)
Complex UI components:
- **Layout**: Card, Dialog, Popover, Sidenav, Stepper, Tabs, Accordion
- **Data Display**: Calendar (Full, Mini, with Item Dialog/Editor)

### 3. Pages (`/pages`)
Complete page layout patterns:
- **List/Table Page**: Data tables with filtering and bulk actions
- **Detail/View Page**: Item detail views with sections
- **Form/Create-Edit Page**: Dynamic forms with validation
- **Search/Filter Page**: Advanced search interfaces
- **Workflow/Process Page**: Multi-step processes
- **Report/Analytics Page**: Dashboard-style reports

### 4. Styling (`/styling`)
Theme management and Material Design 3:
- **Theme Service**: Dynamic theme switching
- **Theme Components**: Picker, Editor, Manager

## Import Patterns

### Importing Multiple Components

```typescript
import {
  AmwButtonComponent,
  AmwInputComponent,
  AmwSelectComponent,
  AmwDataTableComponent
} from 'angular-material-wrap';
```

### Importing Interfaces

```typescript
import {
  ButtonConfig,
  InputConfig,
  DataTableConfig,
  DataTableColumn,
  ListPageData
} from 'angular-material-wrap';
```

### Importing Services

```typescript
import { ThemeService } from 'angular-material-wrap';
```

## Common Configuration Patterns

### Button Configuration

```typescript
import { ButtonConfig } from 'angular-material-wrap';

const buttonConfig: ButtonConfig = {
  appearance: 'filled',    // 'text' | 'elevated' | 'outlined' | 'filled' | 'tonal'
  fab: false,              // false | true | 'standard' | 'mini' | 'extended'
  color: 'primary',        // 'primary' | 'accent' | 'warn'
  size: 'medium',          // 'small' | 'medium' | 'large'
  disabled: false,
  loading: false
};
```

### Input Configuration

```typescript
import { InputConfig } from 'angular-material-wrap';

const inputConfig: InputConfig = {
  label: 'Email',
  placeholder: 'Enter your email',
  type: 'email',
  required: true,
  disabled: false,
  hint: 'We will never share your email'
};
```

### Data Table Configuration

```typescript
import { DataTableConfig, DataTableColumn } from 'angular-material-wrap';

const tableConfig: DataTableConfig = {
  title: 'Users',
  enableSearch: true,
  enablePagination: true,
  enableSorting: true,
  pageSize: 10,
  pageSizeOptions: [5, 10, 25, 50]
};

const columns: DataTableColumn[] = [
  {
    key: 'id',
    label: 'ID',
    sortable: true,
    width: '100px'
  },
  {
    key: 'name',
    label: 'Name',
    sortable: true
  }
];
```

## Styling and Theming

### Using Built-in Themes

The library includes Material Design 3 themes. The theme is automatically applied when you import the library styles.

### Custom Styling

You can override component styles using CSS classes. All components follow BEM methodology with `amw-` prefix:

```scss
// Override button styles
.amw-button {
  &__primary {
    background-color: #custom-color;
  }
}

// Override data table styles
.amw-data-table {
  &__header {
    background-color: #f5f5f5;
  }
}
```

### Theme Customization

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { ThemeService } from 'angular-material-wrap';

@Component({
  selector: 'app-root',
  template: '...'
})
export class AppComponent implements OnInit {
  private themeService = inject(ThemeService);

  ngOnInit() {
    // Set default theme
    this.themeService.setTheme('light');

    // Or load from user preferences
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.themeService.setTheme(savedTheme);
  }
}
```

## Troubleshooting

### Import Errors

**Issue**: `Module not found: 'angular-material-wrap'`

**Solution**:
1. Verify installation: `npm list angular-material-wrap`
2. Rebuild the library if using local installation
3. Check `tsconfig.json` has `"moduleResolution": "node"`

### Type Errors

**Issue**: TypeScript cannot find type definitions

**Solution**:
1. Ensure TypeScript 5.8+ is installed
2. Check `tsconfig.json` includes `"esModuleInterop": true`
3. Restart TypeScript language server

### Style Not Applied

**Issue**: Components render but styles are missing

**Solution**:
1. Verify `@use 'angular-material-wrap/styles';` in `styles.scss`
2. Ensure `provideAnimations()` is included in bootstrap
3. Check browser console for CSS loading errors

### Animation Errors

**Issue**: Animations not working or console errors

**Solution**:
1. Add `provideAnimations()` to application providers
2. Or use `provideNoopAnimations()` to disable animations
3. Ensure `@angular/animations` is installed

## Best Practices

### 1. Use TypeScript Interfaces

Always type your configurations for type safety:

```typescript
import { ButtonConfig, InputConfig } from 'angular-material-wrap';

const buttonConfig: ButtonConfig = { /* ... */ };
const inputConfig: InputConfig = { /* ... */ };
```

### 2. Leverage Page Stereotypes

Instead of building complex pages from scratch, use the pre-built page components:

```typescript
// Instead of building a list page manually
import { AmwListPageComponent } from 'angular-material-wrap';

// Use the list page component with configuration
```

### 3. Consistent Theme Management

Use the ThemeService for centralized theme management:

```typescript
// In app initialization
this.themeService.setTheme(userPreference);

// Subscribe to theme changes if needed
this.themeService.themeChanges$.subscribe(theme => {
  localStorage.setItem('theme', theme);
});
```

### 4. Component Composition

Build complex UIs by composing simple components:

```typescript
@Component({
  template: `
    <amw-card [config]="cardConfig">
      <amw-input [config]="inputConfig" [(ngModel)]="value" />
      <amw-button [config]="buttonConfig" (click)="onSubmit()" />
    </amw-card>
  `
})
```

## Performance Tips

### 1. Lazy Load Page Components

```typescript
const routes: Routes = [
  {
    path: 'users',
    loadComponent: () => import('./pages/users.component').then(m => m.UsersComponent)
  }
];
```

### 2. Use OnPush Change Detection

```typescript
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})
```

### 3. Optimize Data Table Rendering

For large datasets, use pagination and virtual scrolling:

```typescript
const tableConfig: DataTableConfig = {
  enablePagination: true,
  pageSize: 25,
  enableVirtualScroll: true
};
```

## Quick Reference

### Essential Imports

```typescript
// Components
import {
  AmwButtonComponent,
  AmwInputComponent,
  AmwSelectComponent,
  AmwCheckboxComponent,
  AmwDataTableComponent,
  AmwCardComponent,
  AmwListPageComponent,
  AmwFormPageComponent
} from 'angular-material-wrap';

// Interfaces
import {
  ButtonConfig,
  InputConfig,
  SelectOption,
  DataTableConfig,
  DataTableColumn,
  ListPageData,
  FormPageData
} from 'angular-material-wrap';

// Services
import { ThemeService } from 'angular-material-wrap';
```

### Component Selector Reference

- **Controls**: `<amw-button>`, `<amw-input>`, `<amw-select>`, `<amw-checkbox>`, etc.
- **Components**: `<amw-card>`, `<amw-dialog>`, `<amw-data-table>`, `<amw-calendar>`, etc.
- **Pages**: `<amw-list-page>`, `<amw-detail-page>`, `<amw-form-page>`, etc.

## Additional Resources

- **Full API Documentation**: See `docs/library-api.md` for complete API reference
- **Demo Application**: Check the demo app source code for working examples
- **Architecture Guide**: See `docs/library-architecture.md` for architectural details
- **Troubleshooting**: See `docs/troubleshooting.md` for common issues

## Summary Checklist

When implementing this library in a new Angular app:

- [ ] Install `angular-material-wrap` package
- [ ] Install Angular Material peer dependencies
- [ ] Add `provideAnimations()` to app bootstrap
- [ ] Import library styles in `styles.scss`
- [ ] Import components as standalone in your components
- [ ] Use TypeScript interfaces for type safety
- [ ] Configure theme service if needed
- [ ] Reference demo app for complex usage patterns

## Version Information

- **Angular**: 21.0.0+
- **Angular Material**: 21.0.0+
- **TypeScript**: 5.8.0+
- **Library Version**: 0.0.0 (check package.json for current version)
