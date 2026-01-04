# Angular Material Wrap - Complete Documentation Index

## Quick Start for AI Assistants

**Start here**: [Cursor AI Context](./cursor-ai-context.md) - Essential context for AI assistants

## Complete Documentation

### Core Documentation

- [Project Overview](./project-overview.md) - High-level project description and goals
- [Library Architecture](./library-architecture.md) - Four-area structure and organization
- [Architecture](./architecture.md) - Technical architecture and build system details
- [Naming Conventions](./naming-conventions.md) - Component selectors, prefixes, and file naming

### Development Guides

- [Development Workflow](./development-workflow.md) - How to develop, build, and test
- [Build System](./build-system.md) - Detailed build configurations and outputs
- [Troubleshooting](./troubleshooting.md) - Common issues and solutions

### API Documentation

- [Library API](./library-api.md) - Complete API documentation for all components and services
- [Demo App](./demo-app.md) - Comprehensive demo application structure and features

## Quick Reference

### Project Structure

```
angular-material-wrap/
├── src/
│   ├── library/          # Library source (amw- prefix)
│   │   └── src/
│   │       ├── controls/     # 20+ enhanced Material control wrappers
│   │       ├── components/   # 10+ complex UI components
│   │       ├── pages/        # 6 complete page layout patterns
│   │       ├── styling/      # Material Design 3 theme management
│   │       ├── directives/   # 4 utility directives
│   │       ├── pipes/        # 3 utility pipes
│   │       └── services/     # 3 global services
│   └── demo/             # Comprehensive demo app (amw-demo- prefix)
│       ├── app/
│       │   ├── components/   # Individual component demos
│       │   ├── pages/        # Page layout demos
│       │   └── shared/       # Shared demo components
├── dist/                 # Build outputs
└── docs/                 # This documentation
```

### Key Commands

```bash
npm start                 # Start demo app (port 4201)
npm run build:lib         # Build library
npm run build:demo        # Build demo app
npm run test:lib          # Test library
npm run test:demo         # Test demo app
npm run watch             # Watch library changes
npm run watch:demo        # Watch demo changes
```

### Naming Conventions

- **Library**: `amw-*` prefix (e.g., `amw-button`, `amw-data-table`, `amw-list-page`)
- **Demo**: `amw-demo-*` prefix (e.g., `amw-demo-root`)
- **SCSS**: BEM methodology with `amw-` prefix
- **Interfaces**: Descriptive names (e.g., `ButtonConfig`, `ListPageData`)

### File Organization Rules

- **Separate files**: HTML in `.html`, SCSS in `.scss`, TypeScript in `.ts`
- **One class per file**: Each TypeScript file contains exactly one class, enum, service, directive, model, etc.
- **No inline templates/styles**: Always use external template and style files
- **Interface files**: Separate `.interface.ts` files for type definitions
- **BEM SCSS**: Use BEM methodology for CSS class naming

## Technology Stack

- **Angular**: 20.2.0
- **Angular Material**: 20.2.0
- **TypeScript**: 5.8.0
- **SCSS**: For styling with BEM methodology
- **ng-packagr**: For library building
- **Angular CLI**: For development and building

## File Locations

### Critical Files

- `angular.json` - Workspace configuration
- `package.json` - Dependencies and scripts
- `src/library/src/public-api.ts` - Library exports
- `src/demo/app/app.component.ts` - Demo app component

### Build Outputs

- `dist/angular-material-wrap/` - Library build
- `dist/angular-material-wrap-demo/` - Demo app build

## Common Issues

1. **Component not rendering**: Check component is properly exported and imported
2. **Import errors**: Use correct import paths and ensure components are exported
3. **Build failures**: Check TypeScript errors with `npx tsc --noEmit`
4. **Template binding errors**: Ensure all template-referenced methods are public
5. **Interface errors**: Verify all interfaces are properly defined and exported

## Documentation Usage

### For AI Assistants

Start with [Cursor AI Context](./cursor-ai-context.md) for quick project understanding.

### For Developers

1. Read [Project Overview](./project-overview.md) for context
2. Follow [Development Workflow](./development-workflow.md) for setup
3. Reference [Naming Conventions](./naming-conventions.md) for consistency
4. Use [Troubleshooting](./troubleshooting.md) for problem solving
5. Check [Library API](./library-api.md) for component usage

### For Contributors

1. Understand [Architecture](./architecture.md) for technical details
2. Follow [Build System](./build-system.md) for build processes
3. Reference [Library API](./library-api.md) for API documentation
4. Study [Demo App](./demo-app.md) for implementation examples

## Keeping Documentation Updated

When making changes to the project:

1. **Update relevant docs** - Keep documentation in sync with code changes
2. **Update Cursor AI Context** - Ensure AI assistants have current information
3. **Test documentation** - Verify all commands and examples work
4. **Review naming conventions** - Ensure consistency across the project
5. **Update API docs** - Keep API documentation current with code changes

## Documentation Standards

- **Markdown format** - All docs use Markdown
- **Code examples** - Include working code examples
- **Command references** - Provide exact commands to run
- **File paths** - Use absolute paths for clarity
- **Cross-references** - Link between related documentation
- **Interface documentation** - Document all public interfaces and types

---

**Last Updated**: 2025-01-05
**Project Version**: 0.0.0
**Angular Version**: 20.2.0
**Angular Material**: 20.2.0
