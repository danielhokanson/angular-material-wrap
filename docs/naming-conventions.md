# Naming Conventions

## Component Selectors

### Library Components

- **Prefix**: `amw-` (Angular Material Wrap)
- **Pattern**: `amw-{component-name}`
- **Examples**:
  - `amw-button`
  - `amw-data-table`
  - `amw-list-page`
  - `amw-detail-page`
  - `amw-form-page`
  - `amw-search-page`
  - `amw-workflow-page`
  - `amw-report-page`

### Demo App Components

- **Prefix**: `amw-demo-` (Angular Material Wrap Demo)
- **Pattern**: `amw-demo-{component-name}`
- **Examples**:
  - `amw-demo-root`
  - `amw-demo-navigation`
  - `amw-demo-tabs`

## File Naming

### Library Files

```
src/library/src/
├── controls/
│   ├── components/
│   │   ├── amw-button/
│   │   │   ├── amw-button.component.ts
│   │   │   ├── amw-button.component.html
│   │   │   ├── amw-button.component.scss
│   │   │   ├── interfaces/
│   │   │   │   ├── button-config.interface.ts
│   │   │   │   ├── button-size.type.ts
│   │   │   │   └── button-color.type.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── interfaces/
│   └── services/
├── components/
│   ├── components/
│   │   ├── amw-card/
│   │   │   ├── amw-card.component.ts
│   │   │   ├── amw-card.component.html
│   │   │   ├── amw-card.component.scss
│   │   │   ├── interfaces/
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── directives/
│   ├── interfaces/
│   └── services/
├── pages/
│   ├── components/
│   │   ├── amw-list-page/
│   │   │   ├── amw-list-page.component.ts
│   │   │   ├── amw-list-page.component.html
│   │   │   ├── amw-list-page.component.scss
│   │   │   ├── interfaces/
│   │   │   │   ├── list-page-config.interface.ts
│   │   │   │   ├── list-page-data.interface.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   └── interfaces/
├── styling/
│   ├── components/
│   │   ├── theme-picker/
│   │   │   ├── theme-picker.component.ts
│   │   │   ├── theme-picker.component.html
│   │   │   ├── theme-picker.component.scss
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── interfaces/
│   └── services/
├── directives/
├── pipes/
├── services/
└── public-api.ts
```

### Demo App Files

```
src/demo/app/
├── app.component.ts
├── app.component.html
├── app.component.scss
├── app.component.spec.ts
├── app.config.ts
├── app.routes.ts
├── components/
│   ├── controls-demo/
│   │   ├── controls-demo.component.ts
│   │   ├── controls-demo.component.html
│   │   └── controls-demo.component.scss
│   ├── button-demo/
│   │   ├── button-demo.component.ts
│   │   ├── button-demo.component.html
│   │   └── button-demo.component.scss
│   └── demo-navigation/
│       ├── demo-navigation.component.ts
│       ├── demo-navigation.component.html
│       └── demo-navigation.component.scss
├── pages/
│   ├── pages-demo/
│   │   ├── pages-demo.component.ts
│   │   ├── pages-demo.component.html
│   │   └── pages-demo.component.scss
│   ├── list-page-demo/
│   │   ├── list-page-demo.component.ts
│   │   ├── list-page-demo.component.html
│   │   └── list-page-demo.component.scss
│   └── dashboard-page/
│       ├── dashboard-page.component.ts
│       └── dashboard-page.component.scss
└── shared/
    └── components/
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

- **Components**: `Amw{ComponentName}Component`
  - `AmwButtonComponent`
  - `AmwDataTableComponent`
  - `AmwListPageComponent`
- **Services**: `Amw{ServiceName}Service`
  - `AmwLoadingService`
  - `AmwMessagingService`
  - `ThemeService`
- **Interfaces**: `{FeatureName}Config`, `{FeatureName}Data`, `{FeatureName}Interface`
  - `ButtonConfig`
  - `ListPageData`
  - `ThemeConfig`
- **Types**: `{FeatureName}Type` or `{FeatureName}Size`
  - `ButtonSize`
  - `ButtonColor`
  - `Appearance`

### Demo App Classes

- **Components**: `{FeatureName}DemoComponent` or `{FeatureName}PageComponent`
  - `ButtonDemoComponent`
  - `ListPageDemoComponent`
  - `DashboardPageComponent`
- **Services**: `{FeatureName}Service`
- **Guards**: `{FeatureName}Guard`
- **Interfaces**: `{FeatureName}Interface`

## CSS/SCSS Naming

### BEM Methodology

The library uses BEM (Block Element Modifier) methodology for CSS class naming:

- **Block**: Component selector (e.g., `amw-button`)
- **Element**: Child elements (e.g., `amw-button__icon`)
- **Modifier**: Variations (e.g., `amw-button--primary`)

### Library Styles

```scss
// Component root (Block)
.amw-button {
  // Element
  &__icon {
    // Modifier
    &--left {
    }
    &--right {
    }
  }

  &__text {
  }

  // Modifier
  &--primary {
  }
  &--secondary {
  }
  &--large {
  }
  &--small {
  }
  &--disabled {
  }
}
```

### Demo App Styles

```scss
// Demo component styles
.amw-demo-navigation {
  &__header {
  }
  &__menu {
  }
  &__item {
    &--active {
    }
  }
}
```

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
- `watch` - Watch library changes
- `test:lib` - Test library

### Demo Scripts

- `start` - Start demo app (default, port 4201)
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
export * from "./controls/components";
export * from "./components/components";
export * from "./pages/components";
export * from "./styling/components";
export * from "./directives";
export * from "./pipes";
export * from "./services";

// Individual exports for better tree-shaking
export { AmwButtonComponent } from "./controls/components/amw-button/amw-button.component";
export { AmwDataTableComponent } from "./controls/components/amw-data-table/amw-data-table.component";
export { AmwListPageComponent } from "./pages/components/amw-list-page/amw-list-page.component";
export { ThemeService } from "./styling/services/theme.service";
```

### Demo App Imports

```typescript
// Import from built library
import { AmwButtonComponent, AmwDataTableComponent, AmwListPageComponent, ThemeService } from "angular-material-wrap";

// Import demo components
import { ButtonDemoComponent } from "./components/button-demo/button-demo.component";
import { ListPageDemoComponent } from "./pages/list-page-demo/list-page-demo.component";
```

## Directory Structure Conventions

### Library Structure

```
src/library/
├── src/
│   ├── controls/         # Enhanced Material control wrappers
│   │   ├── components/   # 20+ control components
│   │   ├── interfaces/   # Control type definitions
│   │   └── services/     # Control-specific services
│   ├── components/       # Complex UI components
│   │   ├── components/   # 10+ complex components
│   │   ├── directives/   # Custom directives
│   │   ├── interfaces/   # Component interfaces
│   │   └── services/     # Component services
│   ├── pages/            # Complete page layouts
│   │   ├── components/   # 6 page stereotype components
│   │   └── interfaces/   # Page configuration interfaces
│   ├── styling/          # Theme and Material Design 3
│   │   ├── components/   # Theme management components
│   │   ├── interfaces/   # Theme configuration
│   │   └── services/     # Theme service
│   ├── directives/       # Global directives
│   ├── pipes/            # Utility pipes
│   ├── services/         # Global services
│   └── public-api.ts     # Public API exports
├── package.json          # Library package config
├── ng-package.json       # ng-packagr config
└── tsconfig.*.json       # TypeScript configs
```

### Demo App Structure

```
src/demo/
├── app/
│   ├── components/       # Individual component demos
│   ├── pages/            # Page layout demos
│   ├── shared/           # Shared demo components
│   ├── app.component.ts  # Main app component
│   ├── app.routes.ts     # Routing configuration
│   └── app.config.ts     # App configuration
├── main.ts               # Bootstrap
├── index.html            # HTML template
├── styles.scss           # Global styles
└── tsconfig.*.json       # TypeScript configs
```

## File Organization Conventions

### Component File Structure

- **TypeScript**: Component logic only (no HTML, no inline styles)
- **HTML**: Separate `.html` file for templates
- **SCSS**: Separate `.scss` file with BEM methodology
- **Spec**: Separate `.spec.ts` file for tests
- **Interfaces**: Separate `.interface.ts` files for type definitions

### Single Responsibility Files

- **One Class Per File**: Each TypeScript file contains exactly one class, enum, service, directive, model, etc.
- **No Mixed Assets**: No file should contain multiple types of assets
- **Clear Separation**: Keep concerns separated across different files
- **Interface Files**: Separate interface files for type definitions

### Example Component Structure

```
amw-button/
├── amw-button.component.ts      # Component class only
├── amw-button.component.html    # Template
├── amw-button.component.scss    # BEM styles
├── amw-button.component.spec.ts # Tests
├── interfaces/
│   ├── button-config.interface.ts
│   ├── button-size.type.ts
│   ├── button-color.type.ts
│   └── index.ts
└── index.ts                     # Exports
```

## Interface Naming Patterns

### Configuration Interfaces

- **Pattern**: `{ComponentName}Config`
- **Examples**:
  - `ButtonConfig`
  - `DataTableConfig`
  - `ListPageConfig`
  - `ThemeConfig`

### Data Interfaces

- **Pattern**: `{ComponentName}Data`
- **Examples**:
  - `ButtonData`
  - `ListPageData`
  - `SearchData`
  - `WorkflowData`

### Service Interfaces

- **Pattern**: `{ServiceName}Interface` or `{ServiceName}Config`
- **Examples**:
  - `ThemeConfig`
  - `LoadingConfig`
  - `MessagingConfig`

### Type Definitions

- **Pattern**: `{FeatureName}Type`, `{FeatureName}Size`, `{FeatureName}Color`
- **Examples**:
  - `ButtonSize`
  - `ButtonColor`
  - `Appearance`
  - `Density`

## Best Practices

1. **Consistency**: Always use the established prefixes and patterns
2. **Clarity**: Names should clearly indicate purpose and scope
3. **Hierarchy**: Follow the established directory structure
4. **Exports**: Use appropriate `index.ts` files for clean exports
5. **Imports**: Import from the built library in demo app
6. **Testing**: Mirror the naming conventions in test files
7. **File Separation**: Keep HTML, SCSS, and TypeScript in separate files
8. **Single Responsibility**: One class/interface/enum per file
9. **BEM Methodology**: Use BEM for CSS class naming
10. **Interface-Driven**: Create comprehensive interfaces for all configurations
11. **Type Safety**: Use TypeScript types and interfaces throughout
12. **Documentation**: Document all public interfaces and types
