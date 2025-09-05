# Build System

## Overview

The project uses a dual build system with separate configurations for the library and demo application.

## Library Build (ng-packagr)

### Configuration

- **File**: `src/library/ng-package.json`
- **Builder**: `@angular-devkit/build-angular:ng-packagr`
- **TypeScript**: `src/library/tsconfig.lib.json`

### Build Process

1. **Compilation**: TypeScript to JavaScript
2. **Bundling**: Creates FESM and UMD bundles
3. **Metadata**: Generates Angular metadata files
4. **Definitions**: Creates TypeScript definition files

### Output Structure

```
dist/angular-material-wrap/
├── bundles/
│   └── angular-material-wrap.umd.js
├── esm2015/
│   └── angular-material-wrap.js
├── fesm2015/
│   └── angular-material-wrap.js
├── lib/
│   └── src/
│       └── lib/
│           └── *.d.ts
├── angular-material-wrap.d.ts
├── angular-material-wrap.metadata.json
└── package.json
```

### Build Commands

```bash
# Production build
npm run build:lib

# Development build with source maps
ng build angular-material-wrap --configuration development

# Watch mode
npm run watch:lib
```

## Demo App Build (Angular CLI)

### Configuration

- **File**: `angular.json` (angular-material-wrap-demo project)
- **Builder**: `@angular-devkit/build-angular:application`
- **TypeScript**: `src/demo/tsconfig.app.json`

### Build Process

1. **Compilation**: TypeScript to JavaScript
2. **Bundling**: Creates optimized application bundle
3. **Asset Processing**: Processes styles, images, etc.
4. **Optimization**: Minification, tree-shaking, etc.

### Output Structure

```
dist/angular-material-wrap-demo/
├── index.html
├── main-{hash}.js
├── polyfills-{hash}.js
├── styles-{hash}.css
└── favicon.ico
```

### Build Commands

```bash
# Production build
npm run build:demo

# Development build
ng build angular-material-wrap-demo --configuration development

# Watch mode
npm run watch:demo
```

## TypeScript Configurations

### Root Configuration

- **File**: `tsconfig.json`
- **Purpose**: Base configuration for all projects
- **Settings**: Strict mode, ES2022 target, module resolution

### Library Configurations

- **Development**: `src/library/tsconfig.lib.json`
- **Production**: `src/library/tsconfig.lib.prod.json`
- **Tests**: `src/library/tsconfig.spec.json`

### Demo App Configurations

- **Application**: `src/demo/tsconfig.app.json`
- **Tests**: `src/demo/tsconfig.spec.json`

## Build Optimizations

### Library Optimizations

- **Tree Shaking**: Only exports what's in public-api.ts
- **Dead Code Elimination**: Removes unused code
- **TypeScript Compilation**: Optimized for library distribution

### Demo App Optimizations

- **Code Splitting**: Automatic chunk splitting
- **Minification**: JavaScript and CSS minification
- **Asset Optimization**: Image and font optimization
- **Bundle Analysis**: Use `ng build --stats-json` for analysis

## Development vs Production

### Development Builds

- **Source Maps**: Enabled for debugging
- **Optimization**: Disabled for faster builds
- **HMR**: Hot Module Replacement enabled
- **Debugging**: Full debugging information

### Production Builds

- **Optimization**: Full optimization enabled
- **Minification**: Code and assets minified
- **Tree Shaking**: Dead code elimination
- **Bundle Splitting**: Optimized chunk splitting

## Build Dependencies

### Library Dependencies

```json
{
  "peerDependencies": {
    "@angular/common": "^19.2.0",
    "@angular/core": "^19.2.0"
  },
  "dependencies": {
    "tslib": "^2.3.0"
  }
}
```

### Demo App Dependencies

```json
{
  "dependencies": {
    "@angular/common": "^19.2.0",
    "@angular/compiler": "^19.2.0",
    "@angular/core": "^19.2.0"
    // ... all Angular dependencies
  }
}
```

## Build Scripts

### Package.json Scripts

```json
{
  "scripts": {
    "ng": "ng",
    "start": "ng serve angular-material-wrap-demo",
    "start:demo": "ng serve angular-material-wrap-demo",
    "build": "ng build angular-material-wrap",
    "build:demo": "ng build angular-material-wrap-demo",
    "build:lib": "ng build angular-material-wrap",
    "watch": "ng build angular-material-wrap --watch --configuration development",
    "watch:demo": "ng build angular-material-wrap-demo --watch --configuration development",
    "test": "ng test angular-material-wrap",
    "test:demo": "ng test angular-material-wrap-demo",
    "test:lib": "ng test angular-material-wrap"
  }
}
```

## Build Troubleshooting

### Common Issues

#### Library Build Issues

1. **ng-packagr Errors**: Check ng-package.json configuration
2. **TypeScript Errors**: Verify tsconfig.lib.json settings
3. **Export Issues**: Ensure all exports are in public-api.ts
4. **Dependency Issues**: Check peer dependencies

#### Demo App Build Issues

1. **Import Errors**: Verify library import paths
2. **TypeScript Errors**: Check tsconfig.app.json
3. **Asset Issues**: Verify asset paths and configurations
4. **Bundle Size**: Use bundle analyzer to identify large dependencies

### Debug Commands

```bash
# Verbose build output
ng build angular-material-wrap --verbose

# Build with detailed error information
ng build angular-material-wrap-demo --verbose

# Check TypeScript compilation
npx tsc --noEmit

# Analyze bundle size
ng build angular-material-wrap-demo --stats-json
```

## Build Performance

### Optimization Tips

1. **Incremental Builds**: Use watch mode for development
2. **Parallel Builds**: Build library and demo separately
3. **Cache**: Angular CLI caches build artifacts
4. **Dependencies**: Keep dependencies up to date

### Build Times

- **Library**: ~1-2 seconds (incremental)
- **Demo App**: ~2-3 seconds (incremental)
- **Full Build**: ~5-10 seconds (both projects)

## Continuous Integration

### Build Pipeline

1. **Install Dependencies**: `npm install`
2. **Lint Code**: `ng lint` (if configured)
3. **Run Tests**: `npm run test:lib && npm run test:demo`
4. **Build Library**: `npm run build:lib`
5. **Build Demo**: `npm run build:demo`
6. **Deploy**: Upload build artifacts

### Environment Variables

- **NODE_ENV**: Set to 'production' for production builds
- **NG_BUILD_CACHE**: Enable/disable build caching
- **NG_CLI_ANALYTICS**: Disable analytics in CI
