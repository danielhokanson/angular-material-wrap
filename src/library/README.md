# Angular Material Wrap

A comprehensive Angular library providing enhanced Material Design components, complete page layouts, and advanced UI patterns built on top of Angular Material.

## Features

- **Enhanced Controls** (20+ components): Advanced wrappers for Angular Material controls with additional functionality
- **Complex Components** (10+ components): Ready-to-use components like Calendar, Data Table, Dialog, and more
- **Page Layouts** (6 stereotypes): Complete page templates for common use cases (List, Detail, Form, Search, Workflow, Report)
- **Theme Management**: Material Design 3 implementation with dynamic theme switching
- **TypeScript**: Full type safety and IntelliSense support
- **Tree-shakable**: Optimized bundle size with ES modules

## Installation

```bash
npm install angular-material-wrap
```

## Peer Dependencies

This library requires the following peer dependencies:

```json
{
  "@angular/animations": "^21.0.0",
  "@angular/cdk": "^21.0.0",
  "@angular/common": "^21.0.0",
  "@angular/core": "^21.0.0",
  "@angular/forms": "^21.0.0",
  "@angular/material": "^21.0.0",
  "@angular/platform-browser": "^21.0.0"
}
```

Install them using:

```bash
npm install @angular/animations @angular/cdk @angular/common @angular/core @angular/forms @angular/material @angular/platform-browser
```

## Quick Start

### 1. Configure Animations

Add Angular animations to your application bootstrap (`main.ts`):

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

**For module-based apps**, add to your `app.module.ts`:

```typescript
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [BrowserAnimationsModule, /* ... */]
})
export class AppModule { }
```

### 2. Import Library Styles

Add the library styles to your global `styles.scss` file:

```scss
/* Import Angular Material Wrap Library Styles */
@use 'angular-material-wrap/styles';

/* Your other styles */
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
}
```

### 3. Import and Use Components

All components are standalone and can be imported directly:

```typescript
import { Component } from '@angular/core';
import { AmwButtonComponent, AmwInputComponent } from 'angular-material-wrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AmwButtonComponent, AmwInputComponent, FormsModule],
  template: `
    <amw-input
      [config]="{ label: 'Username', placeholder: 'Enter username' }"
      [(ngModel)]="username">
    </amw-input>

    <amw-button
      [config]="{ color: 'primary', variant: 'raised' }"
      (click)="handleClick()">
      Submit
    </amw-button>
  `
})
export class AppComponent {
  username = '';

  handleClick() {
    console.log('Username:', this.username);
  }
}
```

### Available Components

#### Controls
- **Form Controls**: `AmwButtonComponent`, `AmwInputComponent`, `AmwSelectComponent`, `AmwCheckboxComponent`, `AmwRadioComponent`, `AmwSwitchComponent`, `AmwToggleComponent`, `AmwSliderComponent`, `AmwRangeSliderComponent`
- **Advanced Controls**: `AmwAutocompleteComponent`, `AmwChipsComponent`, `AmwColorPickerComponent`, `AmwDatePickerComponent`, `AmwTimePickerComponent`, `AmwFileInputComponent`
- **Data Controls**: `AmwDataTableComponent`

#### Components
- **Layout**: `AmwCardComponent`, `AmwDialogComponent`, `AmwPopoverComponent`, `AmwSidenavComponent`, `AmwStepperComponent`, `AmwTabsComponent`, `AmwAccordionComponent`
- **Data Display**: `AmwCalendarComponent` (Full, Mini, Item Dialog, Item Editor)

#### Pages
- `AmwListPageComponent` - Data tables with advanced filtering and bulk actions
- `AmwDetailPageComponent` - Item detail views with related data sections
- `AmwFormPageComponent` - Dynamic forms with validation and sections
- `AmwSearchPageComponent` - Advanced search with collapsible filters
- `AmwWorkflowPageComponent` - Multi-step processes with progress tracking
- `AmwReportPageComponent` - Dashboard-style reports with widgets

#### Styling
- `ThemeService` - Dynamic theme management
- `ThemePickerComponent` - Theme selection UI
- `ThemeEditorComponent` - Theme customization UI
- `ThemeManagerComponent` - Complete theme management UI

## Theme Setup

```typescript
import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'angular-material-wrap';

@Component({
  selector: 'app-root',
  template: `...`
})
export class AppComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // Initialize with default theme
    this.themeService.setTheme('light');
  }

  toggleTheme() {
    const currentTheme = this.themeService.getCurrentTheme();
    this.themeService.setTheme(currentTheme === 'light' ? 'dark' : 'light');
  }
}
```

## Documentation

Complete documentation is included in this package:
- **[Implementation Guide](./docs/IMPLEMENTATION-GUIDE.md)** - Complete step-by-step guide with examples
- **[Quick Start for AI](./docs/CLAUDE-QUICK-START.md)** - Concise guide for AI assistants
- **[API Reference](./docs/API-REFERENCE.md)** - Full API documentation

Additional resources:
- [GitHub Repository](https://github.com/danielhokanson/angular-material-wrap)
- [Issues & Support](https://github.com/danielhokanson/angular-material-wrap/issues)

## Component Areas

The library is organized into four main areas:

1. **Controls** (`/controls`) - Enhanced wrappers of Angular Material controls with additional functionality
2. **Components** (`/components`) - Complex UI components combining multiple controls
3. **Pages** (`/pages`) - Complete page layouts and common page patterns
4. **Styling** (`/styling`) - Theme management and Material Design 3 implementation

## Browser Support

This library supports the same browsers as Angular 21:
- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)

## License

MIT

## Author

Daniel Hokanson

## Contributing

Contributions are welcome! Please visit the [GitHub repository](https://github.com/danielhokanson/angular-material-wrap) to report issues or submit pull requests.

## Changelog

### 0.1.0-beta.0 (Initial Beta Release)
- Initial beta release
- 20+ enhanced Material controls
- 10+ complex components
- 6 page layout stereotypes
- Material Design 3 theme management
- Full TypeScript support
- Tree-shakable ES modules
