# Angular Material Wrap - Documentation

This folder contains comprehensive documentation for the Angular Material Wrap project to help Cursor AI and developers understand the project structure, conventions, and technical details.

## Documentation Structure

- [Project Overview](./project-overview.md) - High-level project description and goals
- [Architecture](./architecture.md) - Technical architecture and build system details
- [Naming Conventions](./naming-conventions.md) - Component selectors, prefixes, and file naming
- [Development Workflow](./development-workflow.md) - How to develop, build, and test
- [Build System](./build-system.md) - Detailed build configurations and outputs
- [Library API](./library-api.md) - Public API documentation for the library
- [Demo App](./demo-app.md) - Demo application structure and usage
- [Troubleshooting](./troubleshooting.md) - Common issues and solutions

## Quick Reference

### Project Structure

```
angular-material-wrap/
├── src/
│   ├── library/          # Library source code
│   └── demo/             # Demo application
├── dist/                 # Build outputs
├── docs/                 # Documentation
└── package.json          # Dependencies and scripts
```

### Key Commands

- `npm start` - Run demo app in development mode
- `npm run build:lib` - Build the library
- `npm run build:demo` - Build the demo app
- `npm run test:lib` - Test the library
- `npm run test:demo` - Test the demo app

### Naming Conventions

- Library components: `amw-*` prefix
- Demo app components: `amw-demo-*` prefix
- Library selector: `amw-angular-material-wrap`
- Demo app selector: `amw-demo-root`
