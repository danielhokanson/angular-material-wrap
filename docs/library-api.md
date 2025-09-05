# Library API

## Overview

The Angular Material Wrap library provides reusable Angular components and services for Material Design implementations.

## Public API

### Entry Point

All public exports are available through the main entry point:

```typescript
// Import from the library
import { AngularMaterialWrapModule } from "angular-material-wrap";
```

### Available Exports

#### Components

- `AngularMaterialWrapComponent` - Example component demonstrating library usage

#### Services

- `AngularMaterialWrapService` - Example service for library functionality

#### Modules

- `AngularMaterialWrapModule` - Main module containing all library components

## Component API

### AngularMaterialWrapComponent

#### Selector

```html
<amw-angular-material-wrap></amw-angular-material-wrap>
```

#### Properties

Currently no public properties (example component)

#### Methods

Currently no public methods (example component)

#### Events

Currently no public events (example component)

#### Usage Example

```typescript
import { AngularMaterialWrapModule } from "angular-material-wrap";

@NgModule({
  imports: [AngularMaterialWrapModule],
  // ... other module configuration
})
export class MyModule {}
```

```html
<amw-angular-material-wrap></amw-angular-material-wrap>
```

## Service API

### AngularMaterialWrapService

#### Injection

```typescript
import { AngularMaterialWrapService } from 'angular-material-wrap';

constructor(private service: AngularMaterialWrapService) { }
```

#### Methods

Currently no public methods (example service)

#### Usage Example

```typescript
import { AngularMaterialWrapService } from 'angular-material-wrap';

@Component({...})
export class MyComponent {
  constructor(private service: AngularMaterialWrapService) { }
}
```

## Module API

### AngularMaterialWrapModule

#### Exports

- `AngularMaterialWrapComponent`

#### Dependencies

- `CommonModule` (from @angular/common)

#### Usage Example

```typescript
import { AngularMaterialWrapModule } from "angular-material-wrap";

@NgModule({
  imports: [AngularMaterialWrapModule],
  // ... other module configuration
})
export class MyModule {}
```

## TypeScript Support

### Type Definitions

The library includes full TypeScript definitions:

- Component types
- Service types
- Module types
- Interface definitions

### IntelliSense Support

- Full autocomplete support
- Type checking
- JSDoc documentation (when available)

## Styling

### CSS Classes

Library components use scoped CSS classes:

- `.amw-angular-material-wrap` - Main component class
- Component-specific classes are prefixed with `amw-`

### SCSS Variables

Library components can be customized using SCSS variables (when available):

```scss
// Customize library components
$amw-primary-color: #your-color;
$amw-secondary-color: #your-color;
```

## Browser Support

### Supported Browsers

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Polyfills

The library requires standard Angular polyfills:

- Zone.js
- Reflect metadata (if using decorators)

## Dependencies

### Peer Dependencies

```json
{
  "@angular/common": "^19.2.0",
  "@angular/core": "^19.2.0"
}
```

### Internal Dependencies

```json
{
  "tslib": "^2.3.0"
}
```

## Installation

### NPM

```bash
npm install angular-material-wrap
```

### Yarn

```bash
yarn add angular-material-wrap
```

### Manual Installation

1. Build the library: `npm run build:lib`
2. Copy `dist/angular-material-wrap/` to your project
3. Import from the local path

## Version Compatibility

### Angular Versions

- **Angular 19+**: Full support
- **Angular 18**: May work with minor adjustments
- **Angular 17 and below**: Not supported

### TypeScript Versions

- **TypeScript 5.7+**: Full support
- **TypeScript 5.0-5.6**: May work with minor adjustments
- **TypeScript 4.x**: Not supported

## Migration Guide

### From Previous Versions

When updating the library:

1. **Check Breaking Changes**: Review changelog for breaking changes
2. **Update Imports**: Update import statements if needed
3. **Update Usage**: Update component usage if API changed
4. **Test Integration**: Test your application with the new version

### Common Migration Steps

```typescript
// Before (example)
import { OldComponent } from "angular-material-wrap";

// After (example)
import { AngularMaterialWrapComponent } from "angular-material-wrap";
```

## Troubleshooting

### Common Issues

#### Import Errors

```typescript
// Error: Module not found
import { AngularMaterialWrapModule } from 'angular-material-wrap';

// Solution: Check if library is properly installed
npm list angular-material-wrap
```

#### Type Errors

```typescript
// Error: Type not found
import { AngularMaterialWrapComponent } from "angular-material-wrap";

// Solution: Check TypeScript configuration
// Ensure "moduleResolution": "node" in tsconfig.json
```

#### Build Errors

```bash
# Error: Build fails
ng build

# Solution: Check peer dependencies
npm install @angular/common@^19.2.0 @angular/core@^19.2.0
```

### Getting Help

1. **Documentation**: Check this documentation
2. **Issues**: Report issues on GitHub
3. **Examples**: Check demo app for usage examples
4. **Community**: Ask questions in Angular community forums
