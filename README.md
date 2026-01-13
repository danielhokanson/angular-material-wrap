# Angular Material Wrap

A comprehensive Angular library providing enhanced Material Design components, complete page layouts, and advanced UI patterns. This project includes both a distributable library and a comprehensive demo application showcasing all capabilities.

## Documentation

**Complete documentation is available in the [`docs/`](./docs/) folder.**

### For Using This Library in Your App
- **[Implementation Guide](./docs/implementation-guide.md)** - Step-by-step guide for implementing this library in another Angular app (ideal for AI assistants)
- **[Library API Reference](./docs/library-api.md)** - Complete API documentation

### For Developing This Library
- **[Quick Start for AI Assistants](./docs/cursor-ai-context.md)** - Essential context for AI assistants working on this library
- **[Complete Documentation Index](./docs/index.md)** - Full documentation overview
- **[Project Overview](./docs/project-overview.md)** - High-level project description
- **[Development Workflow](./docs/development-workflow.md)** - How to develop, build, and test

## Quick Start

```bash
# Install dependencies
npm install

# Start demo app (runs on port 4201 for debugging)
npm start

# Build library
npm run build:lib

# Build demo app
npm run build:demo
```

## Four Main Areas

The library is organized into four main areas:

1. **Controls** (`/controls`) - Enhanced wrappers of Angular Material controls with additional functionality
2. **Components** (`/components`) - Complex UI components combining multiple controls
3. **Pages** (`/pages`) - Complete page layouts and common page patterns
4. **Styling** (`/styling`) - Theme management and Material Design 3 implementation

## Project Structure

```
src/
├── library/          # Library source code (amw- prefix)
│   ├── src/
│   │   ├── controls/     # Enhanced Material control wrappers
│   │   │   ├── components/   # 20+ control components
│   │   │   ├── interfaces/   # Type definitions
│   │   │   └── services/     # Control-specific services
│   │   ├── components/   # Complex UI components
│   │   │   ├── components/   # 10+ complex components
│   │   │   ├── directives/   # Custom directives
│   │   │   ├── interfaces/   # Component interfaces
│   │   │   └── services/     # Component services
│   │   ├── pages/        # Complete page layouts
│   │   │   ├── components/   # 6 page stereotype components
│   │   │   └── interfaces/   # Page configuration interfaces
│   │   ├── styling/      # Theme and Material Design 3
│   │   │   ├── components/   # Theme management components
│   │   │   ├── interfaces/   # Theme configuration
│   │   │   └── services/     # Theme service
│   │   ├── directives/   # Global directives
│   │   ├── pipes/        # Utility pipes
│   │   ├── services/     # Global services
│   │   └── public-api.ts # Public API exports
│   ├── package.json
│   ├── ng-package.json
│   └── tsconfig.*.json
└── demo/             # Demo application (amw-demo- prefix)
    ├── app/          # Demo app components
    │   ├── components/   # Individual component demos
    │   ├── pages/        # Page layout demos
    │   └── shared/       # Shared demo components
    ├── main.ts
    ├── index.html
    ├── styles.scss
    └── tsconfig.*.json
```

## Key Commands

### Development

- `npm start` - Start demo app (default, port 4201)
- `npm run start:demo` - Start demo app
- `npm run watch` - Watch library changes
- `npm run watch:demo` - Watch demo changes

### Building

- `npm run build:lib` - Build the library
- `npm run build:demo` - Build the demo app
- `npm run build` - Build library (default)

### Testing

- `npm run test:lib` - Test the library
- `npm run test:demo` - Test the demo app
- `npm test` - Test library (default)

## Naming Conventions

- **Library components**: `amw-*` prefix (e.g., `amw-button`, `amw-data-table`)
- **Demo components**: `amw-demo-*` prefix (e.g., `amw-demo-root`)
- **SCSS classes**: BEM methodology with `amw-` prefix
- **Interfaces**: Descriptive names (e.g., `ButtonConfig`, `ListPageData`)

## What's Included

### Controls (18 Components)

- **Form Controls**: Button, Input, Select, Checkbox, Radio, Radio Group, Switch, Toggle, Slider, Range Slider, Textarea
- **Advanced Controls**: Autocomplete, Chips, Color Picker, Datepicker, Timepicker, File Input
- **Validation**: Form Validation component

### Components (23 Components)

- **Layout**: Card, Dialog, Popover, Sidenav, Stepper, Tabs, Tab, Accordion, Accordion Panel
- **Navigation**: Menu, Menu Item, Toolbar
- **Display**: Icon, Divider, Progress Bar, Progress Spinner
- **Calendar**: Calendar Full, Calendar Mini, Calendar Picker, Calendar Item Dialog, Calendar Item Editor
- **Data**: Data Table with sorting, filtering, pagination

### Styling & Theme

- **Material Design 3**: Complete M3 implementation
- **Theme Management**: Dynamic theme switching and customization
- **SCSS Architecture**: BEM methodology with consistent naming

## Modern Signal-Based API

All components use Angular's modern signal-based API:

```typescript
// Signal inputs
appearance = input<ButtonStyle>('filled');
loading = input<boolean>(false);

// Signal outputs
buttonClick = output<MouseEvent>();

// Two-way binding with model()
value = model<string>('');
```

Example usage:

```html
<!-- Button with M3 styles -->
<amw-button appearance="outlined" icon="save">Save</amw-button>

<!-- FAB button -->
<amw-button [fab]="true" icon="add"></amw-button>

<!-- Input with validation -->
<amw-input
  label="Email"
  type="email"
  [required]="true"
  [clearable]="true"
  [(value)]="email">
</amw-input>
```

## Output

- Library build output: `dist/angular-material-wrap/`
- Demo app build output: `dist/angular-material-wrap-demo/`

## Technology Stack

- **Angular**: 21.x
- **Angular Material**: 21.x
- **TypeScript**: 5.8+
- **SCSS**: For styling with BEM methodology
- **ng-packagr**: For library building
- **Angular CLI**: For development and building
- **Cypress**: For E2E testing
