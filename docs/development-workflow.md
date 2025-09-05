# Development Workflow

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- Angular CLI (included in devDependencies)

### Initial Setup

```bash
# Install dependencies
npm install

# Start development server
npm start
```

## Development Commands

### Library Development

```bash
# Build library
npm run build:lib

# Build library in watch mode
npm run watch:lib

# Test library
npm run test:lib
```

### Demo App Development

```bash
# Start demo app (default)
npm start

# Alternative start command
npm run start:demo

# Build demo app
npm run build:demo

# Build demo app in watch mode
npm run watch:demo

# Test demo app
npm run test:demo
```

### General Commands

```bash
# Build library (default build)
npm run build

# Test library (default test)
npm test

# Angular CLI commands
npm run ng -- <command>
```

## Development Process

### 1. Library Development

1. **Create Component Files**: Create separate `.ts`, `.html`, `.scss`, and `.spec.ts` files
2. **Component Structure**: Keep TypeScript logic separate from template and styles
3. **Export API**: Add export to `src/library/src/public-api.ts`
4. **Test Component**: Write tests in `src/library/src/lib/`
5. **Build Library**: Run `npm run build:lib` to verify
6. **Update Demo**: Use new component in demo app

### 2. Demo App Development

1. **Import Library**: Import library components in demo app
2. **Create Demo**: Add demo usage in `src/demo/app/`
3. **Test Integration**: Verify component works in demo
4. **Build Demo**: Run `npm run build:demo` to verify

### 3. Testing Workflow

1. **Unit Tests**: Write tests for both library and demo
2. **Integration Tests**: Test library usage in demo app
3. **E2E Tests**: Test complete user workflows (if applicable)

## File Structure for New Components

### Library Component

```
src/library/src/lib/
├── my-new-component.component.ts      # Component class only
├── my-new-component.component.html    # Template
├── my-new-component.component.scss    # Styles
├── my-new-component.component.spec.ts # Tests
└── my-new-component.service.ts        # Related service (if needed)
```

### File Organization Rules

- **TypeScript files**: Component logic only (no HTML, no inline styles)
- **HTML files**: Separate `.html` files for templates
- **SCSS files**: Separate `.scss` files for styles
- **One class per file**: Each TypeScript file contains exactly one class, enum, service, directive, model, etc.
- **No inline templates/styles**: Always use external template and style files

### Demo Usage

```typescript
// src/demo/app/app.component.ts
import { MyNewComponentModule } from '../../library/src/lib/my-new-component.module';

@Component({
  // ... component config
  imports: [MyNewComponentModule]
})
```

## Hot Module Replacement (HMR)

The development server supports HMR for faster development:

- **Library Changes**: Automatically rebuilds and updates demo app
- **Demo Changes**: Instant updates without full page reload
- **Style Changes**: Live style updates

## Build Outputs

### Library Build

- **Location**: `dist/angular-material-wrap/`
- **Contents**: FESM bundles, UMD bundles, TypeScript definitions
- **Usage**: Can be published to npm or used locally

### Demo App Build

- **Location**: `dist/angular-material-wrap-demo/`
- **Contents**: Optimized application bundle
- **Usage**: Can be deployed to web server

## Debugging

### Library Debugging

1. **Source Maps**: Enabled in development builds
2. **TypeScript**: Full type checking enabled
3. **Console Logs**: Use `console.log` for debugging
4. **Browser DevTools**: Full debugging support

### Demo App Debugging

1. **Angular DevTools**: Use Angular DevTools browser extension
2. **Source Maps**: Enabled in development
3. **Hot Reload**: Instant updates for faster debugging
4. **Network Tab**: Monitor library loading

## Code Quality

### TypeScript Configuration

- **Strict Mode**: Enabled for both library and demo
- **Type Checking**: Full type safety
- **ESLint**: Configured for code quality (if added)

### Testing Strategy

- **Unit Tests**: Jasmine + Karma for both library and demo
- **Coverage**: Aim for high test coverage
- **Mocking**: Use Angular testing utilities

## Git Workflow

### Branch Strategy

- **main**: Stable, production-ready code
- **develop**: Integration branch for features
- **feature/**: Feature branches
- **hotfix/**: Critical bug fixes

### Commit Conventions

```
feat: add new component
fix: resolve build issue
docs: update documentation
test: add unit tests
refactor: improve code structure
```

## Deployment

### Library Deployment

1. **Build**: `npm run build:lib`
2. **Test**: `npm run test:lib`
3. **Publish**: `npm publish` (when ready)

### Demo App Deployment

1. **Build**: `npm run build:demo`
2. **Deploy**: Upload `dist/angular-material-wrap-demo/` to web server

## Troubleshooting

### Common Issues

1. **Build Failures**: Check TypeScript errors and dependencies
2. **Import Errors**: Verify import paths and exports
3. **HMR Issues**: Restart development server
4. **Test Failures**: Check test configurations and mocks

### Getting Help

1. **Documentation**: Check this docs folder
2. **Console Errors**: Check browser console and terminal
3. **Angular CLI**: Use `ng help` for command help
4. **Git Issues**: Check git status and commit history
