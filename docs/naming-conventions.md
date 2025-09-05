# Naming Conventions

## Component Selectors

### Library Components

- **Prefix**: `amw-` (Angular Material Wrap)
- **Pattern**: `amw-{component-name}`
- **Example**: `amw-angular-material-wrap`

### Demo App Components

- **Prefix**: `amw-demo-` (Angular Material Wrap Demo)
- **Pattern**: `amw-demo-{component-name}`
- **Example**: `amw-demo-root`

## File Naming

### Library Files

```
src/library/src/lib/
├── angular-material-wrap.component.ts
├── angular-material-wrap.service.ts
├── angular-material-wrap.module.ts
└── {feature-name}.{type}.ts
```

### Demo App Files

```
src/demo/app/
├── app.component.ts
├── app.component.html
├── app.component.scss
├── app.component.spec.ts
├── app.config.ts
└── app.routes.ts
```

## TypeScript Configuration Files

### Library Configs

- `tsconfig.lib.json` - Library compilation
- `tsconfig.lib.prod.json` - Library production build
- `tsconfig.spec.json` - Library tests

### Demo App Configs

- `tsconfig.app.json` - Demo app compilation
- `tsconfig.spec.json` - Demo app tests

## Class Naming

### Library Classes

- **Components**: `AngularMaterialWrapComponent`
- **Services**: `AngularMaterialWrapService`
- **Modules**: `AngularMaterialWrapModule`
- **Interfaces**: `I{FeatureName}` or `{FeatureName}Interface`

### Demo App Classes

- **Components**: `AppComponent`, `{FeatureName}Component`
- **Services**: `{FeatureName}Service`
- **Guards**: `{FeatureName}Guard`
- **Interfaces**: `I{FeatureName}` or `{FeatureName}Interface`

## CSS/SCSS Naming

### Library Styles

- **Component Styles**: Scoped to component
- **Global Styles**: Avoid global styles in library
- **CSS Classes**: Use kebab-case: `.amw-component-name`

### Demo App Styles

- **Component Styles**: Scoped to component
- **Global Styles**: `src/demo/styles.scss`
- **CSS Classes**: Use kebab-case: `.amw-demo-component-name`

## Angular Configuration

### Project Names

- **Library**: `angular-material-wrap`
- **Demo App**: `angular-material-wrap-demo`

### Build Targets

- **Library Build**: `angular-material-wrap:build`
- **Demo Build**: `angular-material-wrap-demo:build`
- **Library Serve**: `angular-material-wrap:serve` (if needed)
- **Demo Serve**: `angular-material-wrap-demo:serve`

## Package.json Scripts

### Library Scripts

- `build:lib` - Build library
- `watch:lib` - Watch library changes
- `test:lib` - Test library

### Demo Scripts

- `start` - Start demo app (default)
- `start:demo` - Start demo app
- `build:demo` - Build demo app
- `watch:demo` - Watch demo app changes
- `test:demo` - Test demo app

### General Scripts

- `build` - Build library (default)
- `test` - Test library (default)
- `ng` - Angular CLI command

## Import/Export Conventions

### Library Exports

```typescript
// src/library/src/public-api.ts
export * from "./lib/angular-material-wrap.service";
export * from "./lib/angular-material-wrap.component";
export * from "./lib/angular-material-wrap.module";
```

### Demo App Imports

```typescript
// Import library components directly
import { AngularMaterialWrapModule } from "../../library/src/lib/angular-material-wrap.module";
```

## Directory Structure Conventions

### Library Structure

```
src/library/
├── src/
│   ├── lib/           # All library code
│   └── public-api.ts  # Public API
├── package.json       # Library package config
├── ng-package.json    # ng-packagr config
└── tsconfig.*.json    # TypeScript configs
```

### Demo App Structure

```
src/demo/
├── app/               # Demo app code
├── main.ts           # Bootstrap
├── index.html        # HTML template
├── styles.scss       # Global styles
└── tsconfig.*.json   # TypeScript configs
```

## File Organization Conventions

### Component File Structure

- **TypeScript**: Component logic only (no HTML, no inline styles)
- **HTML**: Separate `.html` file for templates
- **SCSS**: Separate `.scss` file for styles
- **Spec**: Separate `.spec.ts` file for tests

### Single Responsibility Files

- **One Class Per File**: Each TypeScript file contains exactly one class, enum, service, directive, model, etc.
- **No Mixed Assets**: No file should contain multiple types of assets
- **Clear Separation**: Keep concerns separated across different files

### Example Component Structure

```
my-component/
├── my-component.component.ts      # Component class only
├── my-component.component.html    # Template
├── my-component.component.scss    # Styles
├── my-component.component.spec.ts # Tests
└── my-component.service.ts        # Related service (if needed)
```

## Best Practices

1. **Consistency**: Always use the established prefixes
2. **Clarity**: Names should clearly indicate purpose and scope
3. **Hierarchy**: Follow the established directory structure
4. **Exports**: Use public-api.ts for all library exports
5. **Imports**: Import library components directly in demo app
6. **Testing**: Mirror the naming conventions in test files
7. **File Separation**: Keep HTML, SCSS, and TypeScript in separate files
8. **Single Responsibility**: One class/interface/enum per file
