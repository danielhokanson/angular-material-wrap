# Library Architecture

## Overview

The Angular Material Wrap library is organized into four main areas, each serving a specific purpose in the component hierarchy and functionality.

## Directory Structure

```
src/library/src/
├── controls/           # 1:1 wrappers of Angular Material controls
├── components/         # Complex combinations of controls
├── pages/             # Common page layouts and combinations
├── styling/           # Theme and styling logic
└── public-api.ts      # Main export file
```

## Four Main Areas

### 1. Controls (`/controls`)

**Purpose**: 1:1 wrappers of Angular Material controls with enhanced functionality

**Structure**:

```
controls/
├── components/         # Control components
│   ├── base/          # Base component class
│   ├── amw-button/    # Button wrapper
│   ├── amw-input/     # Input wrapper
│   └── ...
├── directives/        # Control-specific directives
├── interfaces/        # Control interfaces and types
├── services/          # Control services
└── pipes/            # Control pipes
```

**Examples**:

- `amw-button` - Enhanced button with loading states, icons, variants
- `amw-input` - Input with validation, error handling, labels
- `amw-select` - Select dropdown with search, multi-select
- `amw-autocomplete` - Autocomplete with custom filtering

### 2. Components (`/components`)

**Purpose**: Complex combinations of controls for common UI patterns

**Structure**:

```
components/
├── components/        # Composite components
│   ├── amw-form/     # Form wrapper with validation
│   ├── amw-card/     # Card with header, content, actions
│   └── ...
├── directives/       # Component-specific directives
├── interfaces/       # Component interfaces
├── services/         # Component services
└── pipes/           # Component pipes
```

**Examples**:

- `amw-form` - Complete form with validation, error handling
- `amw-data-table` - Table with sorting, filtering, pagination
- `amw-modal` - Modal dialog with backdrop, animations
- `amw-toolbar` - Toolbar with actions, breadcrumbs

### 3. Pages (`/pages`)

**Purpose**: Complete page layouts and common page combinations

**Structure**:

```
pages/
├── components/       # Page components
│   ├── amw-layout/  # Main layout wrapper
│   ├── amw-dashboard/ # Dashboard page
│   └── ...
├── directives/      # Page-specific directives
├── interfaces/      # Page interfaces
├── services/        # Page services
└── pipes/          # Page pipes
```

**Examples**:

- `amw-layout` - Main application layout with sidebar, header
- `amw-dashboard` - Dashboard page with widgets, charts
- `amw-login` - Login page with form, validation
- `amw-profile` - User profile page

### 4. Styling (`/styling`)

**Purpose**: Theme management and styling logic

**Structure**:

```
styling/
├── components/      # Styling components
│   ├── amw-theme/  # Theme provider
│   ├── amw-palette/ # Color palette
│   └── ...
├── directives/     # Styling directives
├── interfaces/     # Theme interfaces
├── services/       # Theme services
└── pipes/         # Styling pipes
```

**Examples**:

- `amw-theme` - Theme provider and switcher
- `amw-palette` - Color palette management
- `amw-typography` - Typography system
- `amw-spacing` - Spacing utilities

## Component Organization Rules

### File Structure per Component

Each component follows this structure:

```
component-name/
├── component-name.component.ts
├── component-name.component.html
├── component-name.component.scss
├── component-name.component.spec.ts
├── interfaces/
│   ├── component-name.interface.ts
│   └── index.ts
├── services/
│   ├── component-name.service.ts
│   └── index.ts
└── pipes/
    ├── component-name.pipe.ts
    └── index.ts
```

### Shared vs Component-Specific

- **Shared/Global**: Place in area root (`/interfaces`, `/services`, `/pipes`)
- **Component-Specific**: Place in component folder (`/component-name/interfaces`)

## Component Standards

### All Components Must:

1. **Be Standalone**: `standalone: true`
2. **No View Encapsulation**: `encapsulation: ViewEncapsulation.None`
3. **Follow BEM**: CSS classes use BEM methodology with component selector as block
4. **Form Integration**: Work both inside and outside forms using `ControlValueAccessor`
5. **Separate Files**: HTML, SCSS, and TypeScript in separate files
6. **Single Responsibility**: One class per TypeScript file

### Base Component

All components extend `BaseComponent` which provides:

- Form integration (`ControlValueAccessor`)
- Common properties (`disabled`, `required`, `value`)
- Event handling (`blur`, `focus`, `valueChange`)
- Validation helpers
- Error handling

### CSS Standards

- **BEM Methodology**: Block, Element, Modifier
- **Prefix**: Component selector as block name (e.g., `amw-button`)
- **No Superfluous HTML**: Avoid unnecessary divs, spans, labels
- **SCSS**: Use SCSS for styling with proper nesting

## Export Strategy

### Public API Structure

```typescript
// Controls exports
export * from "./controls/components";
export * from "./controls/interfaces";

// Components exports (when implemented)
// export * from './components/components';

// Pages exports (when implemented)
// export * from './pages/components';

// Styling exports (when implemented)
// export * from './styling/components';
```

### Index Files

Each area has index files that export all components:

- `controls/components/index.ts`
- `controls/interfaces/index.ts`
- etc.

## Development Workflow

### Adding a New Control

1. Create component folder: `controls/components/amw-new-control/`
2. Create component files following the structure
3. Extend `BaseComponent`
4. Add to `controls/components/index.ts`
5. Update `public-api.ts` if needed

### Adding a New Component

1. Create component folder: `components/components/amw-new-component/`
2. Follow same structure as controls
3. Add to appropriate index files

## Benefits

1. **Clear Separation**: Each area has a distinct purpose
2. **Scalable**: Easy to add new components in the right area
3. **Maintainable**: Consistent structure across all components
4. **Reusable**: Components can be used independently
5. **Form Integration**: Works seamlessly with Angular forms
6. **Themeable**: Centralized styling and theming
7. **Type Safe**: Strong TypeScript interfaces throughout
