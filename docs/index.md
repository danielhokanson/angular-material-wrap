# Angular Material Wrap - Complete Documentation Index

## 🚀 Quick Start for AI Assistants

**Start here**: [Cursor AI Context](./cursor-ai-context.md) - Essential context for AI assistants

## 📚 Complete Documentation

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

- [Library API](./library-api.md) - Public API documentation for the library
- [Demo App](./demo-app.md) - Demo application structure and usage

## 🎯 Quick Reference

### Project Structure

```
angular-material-wrap/
├── src/
│   ├── library/          # Library source (amw- prefix)
│   └── demo/             # Demo app (amw-demo- prefix)
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
```

### Naming Conventions

- **Library**: `amw-*` prefix (e.g., `amw-angular-material-wrap`)
- **Demo**: `amw-demo-*` prefix (e.g., `amw-demo-root`)

### File Organization Rules

- **Separate files**: HTML in `.html`, SCSS in `.scss`, TypeScript in `.ts`
- **One class per file**: Each TypeScript file contains exactly one class, enum, service, directive, model, etc.
- **No inline templates/styles**: Always use external template and style files

## 🔧 Technology Stack

- **Angular**: 19.2.0
- **TypeScript**: 5.7.2
- **SCSS**: For styling
- **ng-packagr**: For library building
- **Angular CLI**: For development and building

## 📁 File Locations

### Critical Files

- `angular.json` - Workspace configuration
- `package.json` - Dependencies and scripts
- `src/library/src/public-api.ts` - Library exports
- `src/demo/app/app.component.ts` - Demo app component

### Build Outputs

- `dist/angular-material-wrap/` - Library build
- `dist/angular-material-wrap-demo/` - Demo app build

## 🚨 Common Issues

1. **Component not rendering**: Check `standalone: false` for library components
2. **Import errors**: Use relative paths from demo to library
3. **Build failures**: Check TypeScript errors with `npx tsc --noEmit`

## 📖 Documentation Usage

### For AI Assistants

Start with [Cursor AI Context](./cursor-ai-context.md) for quick project understanding.

### For Developers

1. Read [Project Overview](./project-overview.md) for context
2. Follow [Development Workflow](./development-workflow.md) for setup
3. Reference [Naming Conventions](./naming-conventions.md) for consistency
4. Use [Troubleshooting](./troubleshooting.md) for problem solving

### For Contributors

1. Understand [Architecture](./architecture.md) for technical details
2. Follow [Build System](./build-system.md) for build processes
3. Reference [Library API](./library-api.md) for API documentation

## 🔄 Keeping Documentation Updated

When making changes to the project:

1. **Update relevant docs** - Keep documentation in sync with code changes
2. **Update Cursor AI Context** - Ensure AI assistants have current information
3. **Test documentation** - Verify all commands and examples work
4. **Review naming conventions** - Ensure consistency across the project

## 📝 Documentation Standards

- **Markdown format** - All docs use Markdown
- **Code examples** - Include working code examples
- **Command references** - Provide exact commands to run
- **File paths** - Use absolute paths for clarity
- **Cross-references** - Link between related documentation

---

**Last Updated**: 2025-01-05
**Project Version**: 0.0.0
**Angular Version**: 19.2.0
