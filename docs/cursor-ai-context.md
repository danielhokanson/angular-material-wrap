# Cursor AI Context

## Project Summary for AI Assistants

This document provides essential context for AI assistants (like Cursor AI) to quickly understand and work with this Angular Material Wrap project.

## Quick Project Overview

**Project Type**: Comprehensive Angular library with demo application
**Angular Version**: 20.2.0
**Angular Material**: 20.2.0
**TypeScript**: 5.8.0
**Build System**: ng-packagr (library) + Angular CLI (demo app)

## Key Project Structure

```
angular-material-wrap/
├── src/
│   ├── library/          # Library source (amw- prefix)
│   │   └── src/
│   │       ├── controls/     # 20+ enhanced Material control wrappers
│   │       │   ├── components/   # Individual control components
│   │       │   ├── interfaces/   # Type definitions
│   │       │   └── services/     # Control-specific services
│   │       ├── components/   # 10+ complex UI components
│   │       │   ├── components/   # Complex component implementations
│   │       │   ├── directives/   # Custom directives
│   │       │   ├── interfaces/   # Component interfaces
│   │       │   └── services/     # Component services
│   │       ├── pages/        # 6 complete page layout patterns
│   │       │   ├── components/   # Page stereotype components
│   │       │   └── interfaces/   # Page configuration interfaces
│   │       ├── styling/      # Material Design 3 theme management
│   │       │   ├── components/   # Theme management components
│   │       │   ├── interfaces/   # Theme configuration
│   │       │   └── services/     # Theme service
│   │       ├── directives/   # 4 utility directives
│   │       ├── pipes/        # 3 utility pipes
│   │       ├── services/     # 3 global services
│   │       └── public-api.ts # Public API exports
│   └── demo/             # Comprehensive demo app (amw-demo- prefix)
│       ├── app/          # Demo components and pages
│       │   ├── components/   # Individual component demos
│       │   ├── pages/        # Page layout demos
│       │   └── shared/       # Shared demo components
│       └── main.ts       # Bootstrap
├── dist/                 # Build outputs
└── docs/                 # Complete documentation
```

## Library Architecture

### Four Main Areas

1. **Controls** (`/controls`) - 20+ enhanced wrappers of Angular Material controls
2. **Components** (`/components`) - 10+ complex UI components combining multiple controls
3. **Pages** (`/pages`) - 6 complete page layout patterns for common use cases
4. **Styling** (`/styling`) - Material Design 3 theme management and customization

### Component Standards

- **Standalone**: All components are standalone (`standalone: true`)
- **No View Encapsulation**: `encapsulation: ViewEncapsulation.None`
- **Form Integration**: Work inside and outside forms using `ControlValueAccessor`
- **BEM CSS**: Component selector as block name (e.g., `amw-button`)
- **Separate Files**: HTML, SCSS, and TypeScript in separate files
- **Single Responsibility**: One class per TypeScript file
- **Interface-Driven**: Comprehensive TypeScript interfaces for all configurations

## Naming Conventions

- **Library components**: `amw-*` prefix (e.g., `amw-button`, `amw-data-table`, `amw-list-page`)
- **Demo components**: `amw-demo-*` prefix (e.g., `amw-demo-root`)
- **SCSS classes**: BEM methodology with `amw-` prefix
- **Interfaces**: Descriptive names (e.g., `ButtonConfig`, `ListPageData`, `ThemeConfig`)

## File Organization Rules

### Component Structure

- **TypeScript files**: Component logic only (no HTML, no inline styles)
- **HTML files**: Separate `.html` files for templates
- **SCSS files**: Separate `.scss` files with BEM methodology
- **One class per file**: Each TypeScript file contains exactly one class, enum, service, directive, model, etc.
- **Interface files**: Separate `.interface.ts` files for type definitions

### Example Structure

```
amw-button/
├── amw-button.component.ts      # Component class only
├── amw-button.component.html    # Template
├── amw-button.component.scss    # BEM styles
├── amw-button.component.spec.ts # Tests
├── interfaces/
│   ├── button-config.interface.ts
│   ├── button-size.type.ts
│   └── button-color.type.ts
└── index.ts                     # Exports
```

## Component Categories

### Controls (20+ Components)

**Form Controls:**

- Button, Input, Select, Checkbox, Radio, Radio Group, Switch, Toggle
- Slider, Range Slider, Textarea

**Advanced Controls:**

- Autocomplete, Chips, Color Picker, Date Picker, Time Picker, File Input

**Data Controls:**

- Data Table with sorting, filtering, pagination, and bulk actions

### Components (10+ Components)

**Layout:**

- Card, Dialog, Popover, Sidenav, Stepper, Tabs, Accordion

**Data Display:**

- Calendar (Full, Mini, Item Dialog, Item Editor)

### Pages (6 Page Stereotypes)

**Complete Page Layouts:**

- List/Table Page - Data tables with advanced filtering and bulk actions
- Detail/View Page - Item detail views with related data sections
- Form/Create-Edit Page - Dynamic forms with validation and sections
- Search/Filter Page - Advanced search with collapsible filters
- Workflow/Process Page - Multi-step processes with progress tracking
- Report/Analytics Page - Dashboard-style reports with widgets

### Styling & Theme

**Material Design 3:**

- Complete M3 implementation with dynamic theming
- Theme management components (Picker, Editor, Manager)
- SCSS architecture with BEM methodology

## Critical Files

### Configuration Files

- `angular.json` - Workspace configuration (2 projects)
- `package.json` - Dependencies and scripts
- `tsconfig.json` - Root TypeScript config

### Library Files

- `src/library/ng-package.json` - ng-packagr config
- `src/library/src/public-api.ts` - Public API exports
- `src/library/src/controls/components/index.ts` - Controls exports
- `src/library/src/components/components/index.ts` - Components exports
- `src/library/src/pages/components/index.ts` - Pages exports
- `src/library/src/styling/components/index.ts` - Styling exports

### Demo Files

- `src/demo/app/app.component.ts` - Demo app component
- `src/demo/app/app.routes.ts` - Demo routing
- `src/demo/app/components/demo-navigation/` - Navigation component
- `src/demo/app/pages/` - Page demos
- `src/demo/main.ts` - Demo bootstrap

## Build Commands

```bash
# Development
npm start                    # Start demo app (port 4201)
npm run build:lib           # Build library
npm run build:demo          # Build demo app

# Testing
npm run test:lib            # Test library
npm run test:demo           # Test demo app

# Watch mode
npm run watch               # Watch library changes
npm run watch:demo          # Watch demo changes
```

## Common Issues & Solutions

### Library Component Not Rendering

- **Cause**: Component not properly exported or imported
- **Solution**: Check `public-api.ts` exports and component imports

### Import Errors

- **Cause**: Incorrect import paths or missing exports
- **Solution**: Use correct import paths and ensure components are exported

### Build Failures

- **Cause**: TypeScript errors, missing dependencies, or interface mismatches
- **Solution**: Check `npx tsc --noEmit`, ensure all dependencies installed, verify interfaces

### Template Binding Errors

- **Cause**: Missing methods or properties in component classes
- **Solution**: Ensure all template-referenced methods are public and implemented

## Development Workflow

1. **Add Library Component**: Create in appropriate area (`controls/`, `components/`, `pages/`)
2. **Create Interfaces**: Define configuration and data interfaces
3. **Export API**: Add to appropriate `index.ts` and `public-api.ts`
4. **Create Demo**: Add demo component in `src/demo/app/components/`
5. **Test**: Run `npm run test:lib && npm run test:demo`
6. **Build**: Run `npm run build:lib && npm run build:demo`

## Key Technical Details

### Library Build (ng-packagr)

- **Input**: `src/library/`
- **Output**: `dist/angular-material-wrap/`
- **Config**: `src/library/ng-package.json`

### Demo Build (Angular CLI)

- **Input**: `src/demo/`
- **Output**: `dist/angular-material-wrap-demo/`
- **Config**: `angular.json` (angular-material-wrap-demo project)

### TypeScript Configs

- **Root**: `tsconfig.json`
- **Library**: `src/library/tsconfig.lib.json`
- **Demo**: `src/demo/tsconfig.app.json`

## Current State

### Working Features

- Comprehensive component library (40+ components)
- Complete page layout patterns (6 page stereotypes)
- Material Design 3 implementation
- Dual build system (library + demo)
- Component naming conventions (amw-_ and amw-demo-_)
- Standalone components throughout
- Comprehensive demo application
- Development server with HMR (port 4201)
- TypeScript strict mode
- SCSS with BEM methodology
- Complete documentation

### Recent Major Additions

- **Page Stereotypes**: Complete page layout components
- **Enhanced Controls**: 20+ control components with advanced features
- **Complex Components**: 10+ complex UI components
- **Theme Management**: Complete Material Design 3 theming
- **Demo Application**: Comprehensive showcase with navigation
- **Documentation**: Complete API documentation and guides

## AI Assistant Guidelines

### When Working on This Project

1. **Always check naming conventions** - Use `amw-*` for library, `amw-demo-*` for demo
2. **Maintain four-area structure** - Controls, Components, Pages, Styling
3. **Update public API** - Add new exports to appropriate `index.ts` files
4. **Test both builds** - Verify library and demo build successfully
5. **Follow TypeScript strict mode** - Maintain type safety
6. **Separate files properly** - HTML in `.html` files, SCSS in `.scss` files, TypeScript in `.ts` files
7. **One class per file** - Each TypeScript file contains exactly one class, enum, service, directive, model, etc.
8. **No inline templates/styles** - Always use external template and style files
9. **Use BEM methodology** - Follow BEM naming for SCSS classes
10. **Create comprehensive interfaces** - Define all configuration and data interfaces

### Common Tasks

#### Adding New Control Component

1. Create component in `src/library/src/controls/components/amw-[name]/`
2. Create interfaces in `interfaces/` subdirectory
3. Add to `src/library/src/controls/components/index.ts`
4. Export from `src/library/src/public-api.ts`
5. Create demo component in `src/demo/app/components/[name]-demo/`
6. Add to demo navigation

#### Adding New Complex Component

1. Create component in `src/library/src/components/components/amw-[name]/`
2. Create interfaces and services as needed
3. Add to `src/library/src/components/components/index.ts`
4. Export from `src/library/src/public-api.ts`
5. Create demo component
6. Add to demo navigation

#### Adding New Page Component

1. Create component in `src/library/src/pages/components/amw-[name]-page/`
2. Create comprehensive interfaces for configuration and data
3. Add to `src/library/src/pages/components/index.ts`
4. Export from `src/library/src/public-api.ts`
5. Create demo component in `src/demo/app/pages/[name]-page-demo/`
6. Add to demo navigation and routing

#### Debugging Build Issues

1. Check TypeScript errors: `npx tsc --noEmit`
2. Verify import paths are correct
3. Ensure all dependencies are installed
4. Check Angular CLI configuration
5. Verify all interfaces are properly defined
6. Check that all template-referenced methods are public

### File Locations Reference

- **Controls**: `src/library/src/controls/components/`
- **Components**: `src/library/src/components/components/`
- **Pages**: `src/library/src/pages/components/`
- **Styling**: `src/library/src/styling/components/`
- **Public API**: `src/library/src/public-api.ts`
- **Demo Components**: `src/demo/app/components/`
- **Demo Pages**: `src/demo/app/pages/`
- **Demo Navigation**: `src/demo/app/components/demo-navigation/`

### Memory Context

The project follows these key architectural patterns:

- **Standalone Components**: All components are standalone
- **Interface-Driven Design**: Comprehensive TypeScript interfaces
- **BEM SCSS**: Consistent CSS naming methodology
- **Four-Area Organization**: Controls, Components, Pages, Styling
- **Comprehensive Demo**: Complete showcase application
- **Material Design 3**: Full M3 implementation with theming

This context should help AI assistants quickly understand the project structure and work effectively with the comprehensive codebase.
