# Architecture

## Project Structure

```
angular-material-wrap/
├── src/
│   ├── library/                    # Library source code
│   │   ├── src/
│   │   │   ├── lib/               # Library components, services, modules
│   │   │   │   ├── angular-material-wrap.component.ts
│   │   │   │   ├── angular-material-wrap.service.ts
│   │   │   │   └── angular-material-wrap.module.ts
│   │   │   └── public-api.ts      # Public API exports
│   │   ├── package.json           # Library package configuration
│   │   ├── ng-package.json        # ng-packagr configuration
│   │   └── tsconfig.*.json        # Library TypeScript configs
│   └── demo/                      # Demo application
│       ├── app/                   # Demo app components
│       │   ├── app.component.ts
│       │   ├── app.component.html
│       │   ├── app.component.scss
│       │   ├── app.component.spec.ts
│       │   ├── app.config.ts
│       │   └── app.routes.ts
│       ├── main.ts                # Demo app bootstrap
│       ├── index.html             # Demo app HTML
│       ├── styles.scss            # Demo app global styles
│       └── tsconfig.*.json        # Demo app TypeScript configs
├── dist/                          # Build outputs
│   ├── angular-material-wrap/     # Library build output
│   └── angular-material-wrap-demo/ # Demo app build output
├── docs/                          # Documentation
├── public/                        # Static assets
├── angular.json                   # Angular workspace configuration
├── package.json                   # Dependencies and scripts
└── tsconfig.json                  # Root TypeScript configuration
```

## Build System Architecture

### Library Build (ng-packagr)

- **Input**: `src/library/` directory
- **Output**: `dist/angular-material-wrap/`
- **Configuration**: `src/library/ng-package.json`
- **TypeScript**: `src/library/tsconfig.lib.json`
- **Purpose**: Creates distributable Angular library

### Demo App Build (Angular CLI)

- **Input**: `src/demo/` directory
- **Output**: `dist/angular-material-wrap-demo/`
- **Configuration**: `angular.json` (angular-material-wrap-demo project)
- **TypeScript**: `src/demo/tsconfig.app.json`
- **Purpose**: Creates runnable demo application

## Angular Configuration

### Workspace Projects

1. **angular-material-wrap** (Library)

   - Type: `library`
   - Root: `src/library`
   - Builder: `@angular-devkit/build-angular:ng-packagr`

2. **angular-material-wrap-demo** (Application)
   - Type: `application`
   - Root: `src/demo`
   - Builder: `@angular-devkit/build-angular:application`

## TypeScript Configuration Hierarchy

```
tsconfig.json (root)
├── src/library/tsconfig.lib.json (library)
├── src/library/tsconfig.lib.prod.json (library production)
├── src/library/tsconfig.spec.json (library tests)
├── src/demo/tsconfig.app.json (demo app)
└── src/demo/tsconfig.spec.json (demo app tests)
```

## Module System

### Library Module Structure

- **AngularMaterialWrapModule**: Main module exporting all library components
- **AngularMaterialWrapComponent**: Example component
- **AngularMaterialWrapService**: Example service
- **public-api.ts**: Centralized exports for library consumers

### Demo App Module Structure

- **Standalone Components**: Modern Angular approach
- **Direct Library Import**: Imports library components directly
- **Router Integration**: Basic routing setup

## Development Workflow

1. **Library Development**: Add components to `src/library/src/lib/`
2. **Demo Integration**: Use library components in `src/demo/app/`
3. **Testing**: Separate test configurations for library and demo
4. **Building**: Independent build processes for each target

## Dependencies

### Library Dependencies

- **Peer Dependencies**: Angular core modules
- **Internal Dependencies**: Only what's needed for library functionality

### Demo App Dependencies

- **All Angular Dependencies**: Full Angular runtime
- **Library Import**: Direct import from library source
- **Development Dependencies**: Testing, building tools
