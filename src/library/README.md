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

### Import Components

```typescript
import { Component } from '@angular/core';
import { AmwButtonComponent } from 'angular-material-wrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AmwButtonComponent],
  template: `
    <amw-button
      label="Click me"
      type="raised"
      color="primary"
      (clicked)="handleClick()">
    </amw-button>
  `
})
export class AppComponent {
  handleClick() {
    console.log('Button clicked!');
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

For complete documentation, examples, and API reference, visit:
- [GitHub Repository](https://github.com/danielhokanson/angular-material-wrap)
- [API Documentation](https://github.com/danielhokanson/angular-material-wrap/blob/main/docs/library-api.md)
- [Development Guide](https://github.com/danielhokanson/angular-material-wrap/blob/main/docs/development-workflow.md)

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
