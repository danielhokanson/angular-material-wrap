# Angular Material Wrap

This project contains both a library and a demo application for Angular Material components.

## 📚 Documentation

**Complete documentation is available in the [`docs/`](./docs/) folder.**

- **[Quick Start for AI Assistants](./docs/cursor-ai-context.md)** - Essential context for AI assistants
- **[Complete Documentation Index](./docs/index.md)** - Full documentation overview
- **[Project Overview](./docs/project-overview.md)** - High-level project description
- **[Development Workflow](./docs/development-workflow.md)** - How to develop, build, and test

## 🚀 Quick Start

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

## 🎯 Four Main Areas

The library is organized into four main areas:

1. **Controls** (`/controls`) - 1:1 wrappers of Angular Material controls with enhanced functionality
2. **Components** (`/components`) - Complex combinations of controls for common UI patterns
3. **Pages** (`/pages`) - Complete page layouts and common page combinations
4. **Styling** (`/styling`) - Theme management and styling logic

## 🏗️ Project Structure

```
src/
├── library/          # Library source code (amw- prefix)
│   ├── src/
│   │   ├── controls/     # 1:1 Material control wrappers
│   │   ├── components/   # Complex UI components
│   │   ├── pages/        # Page layouts and combinations
│   │   ├── styling/      # Theme and styling logic
│   │   └── public-api.ts # Public API exports
│   ├── package.json
│   ├── ng-package.json
│   └── tsconfig.*.json
└── demo/             # Demo application (amw-demo- prefix)
    ├── app/          # Demo app components
    ├── main.ts
    ├── index.html
    ├── styles.scss
    └── tsconfig.*.json
```

## 🎯 Key Commands

### Development

- `npm start` - Start demo app (default)
- `npm run start:demo` - Start demo app
- `npm run watch:lib` - Watch library changes
- `npm run watch:demo` - Watch demo changes

### Building

- `npm run build:lib` - Build the library
- `npm run build:demo` - Build the demo app
- `npm run build` - Build library (default)

### Testing

- `npm run test:lib` - Test the library
- `npm run test:demo` - Test the demo app
- `npm test` - Test library (default)

## 🏷️ Naming Conventions

- **Library components**: `amw-*` prefix (e.g., `amw-angular-material-wrap`)
- **Demo components**: `amw-demo-*` prefix (e.g., `amw-demo-root`)

## 📖 Usage

The demo app imports and uses the library components, showing how consumers would integrate the library into their applications.

## 📦 Output

- Library build output: `dist/angular-material-wrap/`
- Demo app build output: `dist/angular-material-wrap-demo/`

## 🔧 Technology Stack

- **Angular**: 19.2.0
- **TypeScript**: 5.7.2
- **SCSS**: For styling
- **ng-packagr**: For library building
- **Angular CLI**: For development and building
