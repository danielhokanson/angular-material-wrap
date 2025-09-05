# Cursor AI Context

## Project Summary for AI Assistants

This document provides essential context for AI assistants (like Cursor AI) to quickly understand and work with this Angular Material Wrap project.

## Quick Project Overview

**Project Type**: Dual-purpose Angular project (Library + Demo App)
**Angular Version**: 19.2.0
**TypeScript**: 5.7.2
**Build System**: ng-packagr (library) + Angular CLI (demo app)

## Key Project Structure

```
angular-material-wrap/
├── src/
│   ├── library/          # Library source (amw- prefix)
│   │   └── src/
│   │       ├── controls/     # 1:1 Material control wrappers
│   │       ├── components/   # Complex UI components
│   │       ├── pages/        # Page layouts and combinations
│   │       ├── styling/      # Theme and styling logic
│   │       └── public-api.ts # Public exports
│   └── demo/             # Demo app (amw-demo- prefix)
│       ├── app/          # Demo components
│       └── main.ts       # Bootstrap
├── dist/                 # Build outputs
└── docs/                 # This documentation
```

## Library Architecture

### Four Main Areas

1. **Controls** (`/controls`) - 1:1 wrappers of Angular Material controls
2. **Components** (`/components`) - Complex combinations of controls
3. **Pages** (`/pages`) - Complete page layouts and combinations
4. **Styling** (`/styling`) - Theme management and styling logic

### Component Standards

- **Standalone**: All components are standalone (`standalone: true`)
- **No View Encapsulation**: `encapsulation: ViewEncapsulation.None`
- **Form Integration**: Work inside and outside forms using `ControlValueAccessor`
- **BEM CSS**: Component selector as block name (e.g., `amw-button`)
- **Separate Files**: HTML, SCSS, and TypeScript in separate files
- **Single Responsibility**: One class per TypeScript file

## Naming Conventions

- **Library components**: `amw-*` prefix (e.g., `amw-button`, `amw-input`)
- **Demo components**: `amw-demo-*` prefix (e.g., `amw-demo-root`)

## File Organization Rules

### Component Structure

- **TypeScript files**: Component logic only (no HTML, no inline styles)
- **HTML files**: Separate `.html` files for templates
- **SCSS files**: Separate `.scss` files for styles
- **One class per file**: Each TypeScript file contains exactly one class, enum, service, directive, model, etc.

### Example Structure

```
my-component/
├── my-component.component.ts      # Component class only
├── my-component.component.html    # Template
├── my-component.component.scss    # Styles
├── my-component.component.spec.ts # Tests
└── my-component.service.ts        # Related service (if needed)
```

## Component Selectors

- **Library selector**: `amw-angular-material-wrap`
- **Demo selector**: `amw-demo-root`

## Critical Files

### Configuration Files

- `angular.json` - Workspace configuration (2 projects)
- `package.json` - Dependencies and scripts
- `tsconfig.json` - Root TypeScript config

### Library Files

- `src/library/ng-package.json` - ng-packagr config
- `src/library/src/public-api.ts` - Public API exports
- `src/library/src/lib/angular-material-wrap.component.ts` - Main component

### Demo Files

- `src/demo/app/app.component.ts` - Demo app component
- `src/demo/main.ts` - Demo bootstrap
- `src/demo/index.html` - Demo HTML template

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
npm run watch:lib           # Watch library changes
npm run watch:demo          # Watch demo changes
```

## Common Issues & Solutions

### Library Component Not Rendering

- **Cause**: Component is standalone but used in module
- **Solution**: Set `standalone: false` in component decorator

### Import Errors

- **Cause**: Incorrect import paths
- **Solution**: Use relative paths from demo to library: `../../library/src/lib/`

### Build Failures

- **Cause**: TypeScript errors or missing dependencies
- **Solution**: Check `npx tsc --noEmit` and ensure all dependencies installed

## Development Workflow

1. **Add Library Component**: Create in `src/library/src/lib/`
2. **Export API**: Add to `src/library/src/public-api.ts`
3. **Use in Demo**: Import in `src/demo/app/app.component.ts`
4. **Test**: Run `npm run test:lib && npm run test:demo`
5. **Build**: Run `npm run build:lib && npm run build:demo`

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

- ✅ Dual build system (library + demo)
- ✅ Component naming conventions (amw-_ and amw-demo-_)
- ✅ Library component with module structure
- ✅ Demo app using library component
- ✅ Development server with HMR
- ✅ TypeScript strict mode
- ✅ SCSS support

### Recent Changes

- Updated component selectors to use `amw-` and `amw-demo-` prefixes
- Fixed library component to work with ng-packagr (`standalone: false`)
- Created comprehensive documentation structure
- Set up proper build configurations for both library and demo

## AI Assistant Guidelines

### When Working on This Project

1. **Always check naming conventions** - Use `amw-*` for library, `amw-demo-*` for demo
2. **Maintain dual structure** - Keep library and demo separate
3. **Update public API** - Add new exports to `public-api.ts`
4. **Test both builds** - Verify library and demo build successfully
5. **Follow TypeScript strict mode** - Maintain type safety
6. **Separate files properly** - HTML in `.html` files, SCSS in `.scss` files, TypeScript in `.ts` files
7. **One class per file** - Each TypeScript file contains exactly one class, enum, service, directive, model, etc.
8. **No inline templates/styles** - Always use external template and style files

### Common Tasks

#### Adding New Library Component

1. Create component in `src/library/src/lib/`
2. Set `standalone: false`
3. Add to module in `src/library/src/lib/angular-material-wrap.module.ts`
4. Export from `src/library/src/public-api.ts`
5. Use in demo app

#### Adding New Demo Feature

1. Create component in `src/demo/app/`
2. Use `amw-demo-*` prefix
3. Import library components as needed
4. Update routing if needed

#### Debugging Build Issues

1. Check TypeScript errors: `npx tsc --noEmit`
2. Verify import paths are correct
3. Ensure all dependencies are installed
4. Check Angular CLI configuration

### File Locations Reference

- **Library component**: `src/library/src/lib/angular-material-wrap.component.ts`
- **Library module**: `src/library/src/lib/angular-material-wrap.module.ts`
- **Library service**: `src/library/src/lib/angular-material-wrap.service.ts`
- **Public API**: `src/library/src/public-api.ts`
- **Demo component**: `src/demo/app/app.component.ts`
- **Demo HTML**: `src/demo/app/app.component.html`
- **Demo bootstrap**: `src/demo/main.ts`
- **Demo HTML template**: `src/demo/index.html`

This context should help AI assistants quickly understand the project structure and work effectively with the codebase.
