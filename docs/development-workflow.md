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

# Start development server (port 4201)
npm start
```

## Development Commands

### Library Development

```bash
# Build library
npm run build:lib

# Build library in watch mode
npm run watch

# Test library
npm run test:lib
```

### Demo App Development

```bash
# Start demo app (default, port 4201)
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

#### Adding New Control Component

1. **Create Component Structure**:

   ```
   src/library/src/controls/components/amw-[name]/
   ├── amw-[name].component.ts
   ├── amw-[name].component.html
   ├── amw-[name].component.scss
   ├── amw-[name].component.spec.ts
   ├── interfaces/
   │   ├── [name]-config.interface.ts
   │   ├── [name]-size.type.ts
   │   ├── [name]-color.type.ts
   │   └── index.ts
   └── index.ts
   ```

2. **Follow Naming Conventions**:

   - Component selector: `amw-[name]`
   - Class name: `Amw[Name]Component`
   - Interface names: `[Name]Config`, `[Name]Size`, `[Name]Color`

3. **Implement Component**:

   - Use `standalone: true`
   - Use `encapsulation: ViewEncapsulation.None`
   - Implement `ControlValueAccessor` if form control
   - Use BEM methodology for SCSS

4. **Export API**:

   - Add to `src/library/src/controls/components/index.ts`
   - Add to `src/library/src/public-api.ts`

5. **Create Demo**:
   - Create demo component in `src/demo/app/components/[name]-demo/`
   - Add to demo navigation
   - Test integration

#### Adding New Complex Component

1. **Create Component Structure**:

   ```
   src/library/src/components/components/amw-[name]/
   ├── amw-[name].component.ts
   ├── amw-[name].component.html
   ├── amw-[name].component.scss
   ├── amw-[name].component.spec.ts
   ├── interfaces/
   │   ├── [name]-config.interface.ts
   │   ├── [name]-data.interface.ts
   │   └── index.ts
   ├── services/
   │   ├── [name].service.ts
   │   └── index.ts
   └── index.ts
   ```

2. **Follow Same Process** as control components

#### Adding New Page Component

1. **Create Component Structure**:

   ```
   src/library/src/pages/components/amw-[name]-page/
   ├── amw-[name]-page.component.ts
   ├── amw-[name]-page.component.html
   ├── amw-[name]-page.component.scss
   ├── amw-[name]-page.component.spec.ts
   ├── interfaces/
   │   ├── [name]-page-config.interface.ts
   │   ├── [name]-page-data.interface.ts
   │   ├── [name]-page-data-source.interface.ts
   │   └── index.ts
   └── index.ts
   ```

2. **Implement Data Source Pattern**:

   - Create `InjectionToken` for data source
   - Implement interface with mock data
   - Use dependency injection

3. **Create Demo**:
   - Create demo component in `src/demo/app/pages/[name]-page-demo/`
   - Add to demo navigation and routing
   - Test complete page functionality

### 2. Demo App Development

1. **Import Library**: Import components from built library
2. **Create Demo**: Add demo usage in appropriate demo component
3. **Test Integration**: Verify component works in demo
4. **Build Demo**: Run `npm run build:demo` to verify

### 3. Testing Workflow

1. **Unit Tests**: Write tests for both library and demo
2. **Integration Tests**: Test library usage in demo app
3. **E2E Tests**: Test complete user workflows (if applicable)

## File Structure for New Components

### Library Component

```
src/library/src/[area]/components/amw-[name]/
├── amw-[name].component.ts      # Component class only
├── amw-[name].component.html    # Template
├── amw-[name].component.scss    # BEM styles
├── amw-[name].component.spec.ts # Tests
├── interfaces/
│   ├── [name]-config.interface.ts
│   ├── [name]-data.interface.ts
│   └── index.ts
├── services/                    # If needed
│   ├── [name].service.ts
│   └── index.ts
└── index.ts                     # Exports
```

### File Organization Rules

- **TypeScript files**: Component logic only (no HTML, no inline styles)
- **HTML files**: Separate `.html` files for templates
- **SCSS files**: Separate `.scss` files with BEM methodology
- **One class per file**: Each TypeScript file contains exactly one class, enum, service, directive, model, etc.
- **No inline templates/styles**: Always use external template and style files
- **Interface files**: Separate `.interface.ts` files for type definitions

### Demo Usage

```typescript
// src/demo/app/components/[name]-demo/[name]-demo.component.ts
import { Amw[Name]Component } from "angular-material-wrap";

@Component({
  selector: 'amw-demo-[name]',
  standalone: true,
  imports: [Amw[Name]Component],
  templateUrl: './[name]-demo.component.html',
  styleUrl: './[name]-demo.component.scss'
})
export class [Name]DemoComponent {
  // Demo implementation
}
```

## Hot Module Replacement (HMR)

The development server supports HMR for faster development:

- **Library Changes**: Automatically rebuilds and updates demo app
- **Demo Changes**: Instant updates without full page reload
- **Style Changes**: Live style updates
- **Port 4201**: Runs on port 4201 for debugging

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
5. **Port 4201**: Access demo at `http://localhost:4201`

## Code Quality

### TypeScript Configuration

- **Strict Mode**: Enabled for both library and demo
- **Type Checking**: Full type safety
- **Interface-Driven**: Comprehensive interfaces for all configurations
- **Type Safety**: Use TypeScript types and interfaces throughout

### Testing Strategy

- **Unit Tests**: Jasmine + Karma for both library and demo
- **Coverage**: Aim for high test coverage
- **Mocking**: Use Angular testing utilities
- **Integration Tests**: Test component interactions

### SCSS Standards

- **BEM Methodology**: Use BEM for CSS class naming
- **Component Scoping**: Use component selector as block name
- **Consistent Naming**: Follow established naming patterns
- **Material Design 3**: Implement M3 design tokens

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
style: update SCSS with BEM
perf: improve component performance
```

## Deployment

### Library Deployment

1. **Build**: `npm run build:lib`
2. **Test**: `npm run test:lib`
3. **Publish**: `npm publish` (when ready)

### Demo App Deployment

1. **Build**: `npm run build:demo`
2. **Deploy**: Upload `dist/angular-material-wrap-demo/` to web server
3. **Configure**: Set up SPA routing for Angular app

## Common Development Tasks

### Adding New Control Component

1. Create component in `src/library/src/controls/components/amw-[name]/`
2. Create interfaces for configuration and data
3. Implement component with proper naming conventions
4. Add to `src/library/src/controls/components/index.ts`
5. Export from `src/library/src/public-api.ts`
6. Create demo component in `src/demo/app/components/[name]-demo/`
7. Add to demo navigation
8. Test integration

### Adding New Page Component

1. Create component in `src/library/src/pages/components/amw-[name]-page/`
2. Create comprehensive interfaces for configuration and data
3. Implement data source pattern with dependency injection
4. Add to `src/library/src/pages/components/index.ts`
5. Export from `src/library/src/public-api.ts`
6. Create demo component in `src/demo/app/pages/[name]-page-demo/`
7. Add to demo navigation and routing
8. Test complete page functionality

### Debugging Build Issues

1. Check TypeScript errors: `npx tsc --noEmit`
2. Verify import paths are correct
3. Ensure all dependencies are installed
4. Check Angular CLI configuration
5. Verify all interfaces are properly defined
6. Check that all template-referenced methods are public

## Troubleshooting

### Common Issues

1. **Build Failures**: Check TypeScript errors and dependencies
2. **Import Errors**: Verify import paths and exports
3. **Template Binding Errors**: Ensure all template-referenced methods are public
4. **Interface Errors**: Verify all interfaces are properly defined and exported
5. **HMR Issues**: Restart development server
6. **Test Failures**: Check test configurations and mocks

### Getting Help

1. **Documentation**: Check this docs folder
2. **Console Errors**: Check browser console and terminal
3. **Angular CLI**: Use `ng help` for command help
4. **Git Issues**: Check git status and commit history
5. **TypeScript**: Use `npx tsc --noEmit` to check for type errors

## Performance Considerations

### Library Performance

- **Tree Shaking**: Use individual exports for better tree shaking
- **Bundle Size**: Monitor library bundle size
- **Lazy Loading**: Implement lazy loading where appropriate
- **Standalone Components**: Use standalone components for better performance

### Demo App Performance

- **Lazy Loading**: Use lazy loading for demo routes
- **Code Splitting**: Implement code splitting for better performance
- **Bundle Analysis**: Use webpack-bundle-analyzer to analyze bundle size
- **Optimization**: Use Angular's built-in optimization features

## Best Practices

1. **Consistency**: Follow established naming conventions and patterns
2. **Type Safety**: Use TypeScript interfaces and types throughout
3. **Documentation**: Document all public APIs and interfaces
4. **Testing**: Write comprehensive tests for all components
5. **Performance**: Consider performance implications of design decisions
6. **Accessibility**: Ensure components are accessible
7. **Responsive Design**: Make components responsive and mobile-friendly
8. **Material Design 3**: Follow M3 design principles and tokens
