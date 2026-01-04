# Troubleshooting

## Common Issues and Solutions

### Build Issues

#### Library Build Failures

**Error**: `Component AmwButtonComponent is standalone, and cannot be declared in an NgModule`

**Solution**: Ensure the component has `standalone: true` and is imported correctly:

```typescript
@Component({
  selector: 'amw-button',
  standalone: true,  // Standalone components
  templateUrl: './amw-button.component.html',
  styleUrls: ['./amw-button.component.scss']
})
```

**Error**: `ng-packagr` build fails

**Solutions**:

1. Check `src/library/ng-package.json` configuration
2. Verify all exports are in `src/library/src/public-api.ts`
3. Ensure TypeScript compilation passes: `npx tsc --noEmit`
4. Check for missing interface exports

**Error**: TypeScript compilation errors in library

**Solutions**:

1. Check `src/library/tsconfig.lib.json` configuration
2. Verify all imports and exports are correct
3. Run `npx tsc --noEmit` to see detailed errors
4. Ensure all interfaces are properly defined and exported

**Error**: `TS2307: Cannot find module './interfaces'`

**Solutions**:

1. Check that interface files exist in the `interfaces/` directory
2. Verify `interfaces/index.ts` exports all interfaces
3. Ensure import paths are correct
4. Check for typos in file names

#### Demo App Build Failures

**Error**: `'amw-button' is not a known element`

**Solutions**:

1. Ensure the component is imported:

   ```typescript
   import { AmwButtonComponent } from "angular-material-wrap";

   @Component({
     imports: [AmwButtonComponent]
   })
   ```

2. Check that the library is built: `npm run build:lib`
3. Verify the component selector in the library

**Error**: `Could not resolve "angular-material-wrap"`

**Solutions**:

1. Ensure the library is built: `npm run build:lib`
2. Check that the library is properly exported in `public-api.ts`
3. Verify the library build output exists in `dist/angular-material-wrap/`

**Error**: `TS2307: Cannot find module 'angular-material-wrap'`

**Solutions**:

1. Build the library first: `npm run build:lib`
2. Check that the library is properly exported
3. Verify the import path is correct
4. Ensure all dependencies are installed

#### Template Binding Errors

**Error**: `NG8002: Can't bind to 'property' since it isn't a known property`

**Solutions**:

1. Check that the property exists in the component class
2. Ensure the property is public (not private)
3. Verify the property name is spelled correctly
4. Check for typos in the template binding

**Error**: `TS2339: Property 'method' does not exist on type 'Component'`

**Solutions**:

1. Ensure the method exists in the component class
2. Make sure the method is public (not private)
3. Check for typos in the method name
4. Verify the method is properly implemented

**Error**: `NG5002: Parser Error: Bindings cannot contain assignments`

**Solutions**:

1. Check for assignment operators (`=`) in template expressions
2. Use proper event binding syntax: `(event)="method()"`
3. Avoid complex expressions in template bindings
4. Move complex logic to component methods

### Development Server Issues

#### HMR (Hot Module Replacement) Problems

**Issue**: Changes not reflecting in browser

**Solutions**:

1. Restart the development server: `Ctrl+C` then `npm start`
2. Clear browser cache: `Ctrl+Shift+R`
3. Check for TypeScript errors in terminal
4. Verify file changes are being detected
5. Check that the development server is running on port 4201

**Issue**: Server not starting

**Solutions**:

1. Check if port 4201 is available: `lsof -i :4201`
2. Kill existing processes: `pkill -f "ng serve"`
3. Clear Angular cache: `ng cache clean`
4. Reinstall dependencies: `rm -rf node_modules && npm install`
5. Use a different port: `ng serve --port 4202`

#### TypeScript Errors

**Error**: Type errors in demo app

**Solutions**:

1. Check `src/demo/tsconfig.app.json` configuration
2. Verify library types are available
3. Run `npx tsc --noEmit` to see detailed errors
4. Ensure all imports have correct types
5. Check that all interfaces are properly exported

**Error**: Module resolution issues

**Solutions**:

1. Check `tsconfig.json` has correct `moduleResolution`
2. Verify import paths are correct
3. Ensure all dependencies are installed
4. Check for circular dependencies
5. Verify that all exports are in the correct `index.ts` files

**Error**: `TS2308: Module has already exported a member named 'Interface'`

**Solutions**:

1. Check for duplicate exports in `index.ts` files
2. Ensure interfaces are only exported once
3. Remove duplicate interface definitions
4. Check for conflicting interface names

### Runtime Issues

#### Component Not Rendering

**Issue**: Library component not showing

**Solutions**:

1. Check browser console for errors
2. Verify component selector is correct: `<amw-button>`
3. Ensure component is imported in the demo component
4. Check that component is properly exported from the library
5. Verify that the library is built and available

**Issue**: Styling not applied

**Solutions**:

1. Check if styles are included in build
2. Verify CSS class names are correct
3. Check for CSS conflicts
4. Ensure SCSS compilation is working
5. Verify BEM methodology is followed correctly

**Issue**: Component throws runtime errors

**Solutions**:

1. Check browser console for error messages
2. Verify all required inputs are provided
3. Check that all dependencies are properly injected
4. Ensure all methods referenced in templates are implemented
5. Check for null/undefined values

#### Import/Export Issues

**Error**: Cannot find module

**Solutions**:

1. Check file paths are correct
2. Verify files exist at specified locations
3. Check for typos in import statements
4. Ensure all exports are in appropriate `index.ts` files
5. Verify that the library is built

**Error**: Circular dependency

**Solutions**:

1. Check import/export structure
2. Avoid importing from index files in same module
3. Use barrel exports carefully
4. Restructure code to avoid circular references
5. Check for circular imports in interface files

### Testing Issues

#### Test Failures

**Error**: Component not found in tests

**Solutions**:

1. Import the component in test setup
2. Check test configuration in `tsconfig.spec.json`
3. Verify component is properly exported
4. Use proper testing utilities
5. Ensure all dependencies are mocked

**Error**: Module not found in tests

**Solutions**:

1. Check test imports are correct
2. Verify test configuration
3. Ensure all dependencies are available
4. Use proper mocking if needed
5. Check that the library is built

**Error**: `TS2307: Cannot find module` in tests

**Solutions**:

1. Ensure the library is built before running tests
2. Check that all interfaces are properly exported
3. Verify import paths in test files
4. Check for missing interface exports

### File Organization Issues

#### Inline Templates/Styles

**Issue**: Component has inline template or styles

**Solutions**:

1. Move template to separate `.html` file
2. Move styles to separate `.scss` file
3. Update component decorator to use `templateUrl` and `styleUrls`

```typescript
// Wrong - inline template and styles
@Component({
  selector: 'amw-my-component',
  template: '<div>Hello</div>',
  styles: ['.my-class { color: red; }']
})

// Correct - external files
@Component({
  selector: 'amw-my-component',
  templateUrl: './amw-my-component.component.html',
  styleUrls: ['./amw-my-component.component.scss']
})
```

#### Multiple Classes in One File

**Issue**: Multiple classes, interfaces, or enums in one TypeScript file

**Solutions**:

1. Split into separate files
2. One class/interface/enum per file
3. Use proper naming conventions

```typescript
// Wrong - multiple classes in one file
export class MyComponent {}
export class MyService {}
export interface MyInterface {}

// Correct - separate files
// amw-my-component.component.ts
export class AmwMyComponentComponent {}

// amw-my-service.service.ts
export class AmwMyServiceService {}

// my-interface.interface.ts
export interface MyInterface {}
```

#### Missing Interface Files

**Issue**: Interfaces not properly organized

**Solutions**:

1. Create separate `.interface.ts` files for each interface
2. Use descriptive names: `button-config.interface.ts`
3. Export all interfaces from `interfaces/index.ts`
4. Import interfaces from the correct path

### Performance Issues

#### Slow Build Times

**Solutions**:

1. Use incremental builds: `npm run watch`
2. Enable build caching in Angular CLI
3. Check for unnecessary dependencies
4. Optimize TypeScript configuration
5. Use `--configuration development` for faster builds

#### Large Bundle Sizes

**Solutions**:

1. Use bundle analyzer: `ng build --stats-json`
2. Check for unnecessary imports
3. Use tree shaking effectively
4. Optimize dependencies
5. Use individual component exports instead of barrel exports

### Environment Issues

#### Node.js Version

**Issue**: Incompatible Node.js version

**Solutions**:

1. Check required Node.js version in `package.json`
2. Use Node Version Manager (nvm) to switch versions
3. Update to compatible Node.js version
4. Check Angular CLI compatibility

#### Package Manager Issues

**Issue**: npm/yarn conflicts

**Solutions**:

1. Use consistent package manager
2. Clear package manager cache
3. Delete `node_modules` and reinstall
4. Check for lock file conflicts
5. Use `npm ci` for clean installs

### Debugging Tips

#### Enable Verbose Logging

```bash
# Angular CLI verbose mode
ng build --verbose

# TypeScript verbose mode
npx tsc --verbose

# npm verbose mode
npm install --verbose
```

#### Check Build Output

```bash
# Check library build
ls -la dist/angular-material-wrap/

# Check demo build
ls -la dist/angular-material-wrap-demo/

# Check for errors in build output
ng build 2>&1 | tee build.log
```

#### Browser DevTools

1. **Console**: Check for JavaScript errors
2. **Network**: Verify all resources load correctly
3. **Sources**: Check source maps are working
4. **Elements**: Inspect component rendering
5. **Angular DevTools**: Use Angular DevTools extension

#### Common Debugging Commands

```bash
# Check TypeScript errors
npx tsc --noEmit

# Check for circular dependencies
npx madge --circular src/

# Check bundle size
ng build --stats-json
npx webpack-bundle-analyzer dist/angular-material-wrap-demo/stats.json

# Check for unused dependencies
npx depcheck
```

### Getting Help

#### Check Documentation

1. **Project Docs**: Check this `docs/` folder
2. **Angular Docs**: https://angular.dev
3. **ng-packagr Docs**: https://github.com/ng-packagr/ng-packagr
4. **TypeScript Docs**: https://www.typescriptlang.org/docs
5. **Material Design Docs**: https://material.angular.io

#### Community Resources

1. **Angular Discord**: https://discord.gg/angular
2. **Stack Overflow**: Tag questions with `angular`
3. **GitHub Issues**: Check project issues
4. **Angular Forums**: https://angular.io/community

#### Create Minimal Reproduction

When reporting issues:

1. Create minimal example that reproduces the issue
2. Include error messages and stack traces
3. Specify Angular, Node.js, and package versions
4. Include relevant configuration files
5. Describe steps to reproduce

### Prevention

#### Best Practices

1. **Regular Updates**: Keep dependencies up to date
2. **Type Safety**: Use TypeScript strict mode
3. **Testing**: Write comprehensive tests
4. **Documentation**: Keep docs up to date
5. **Code Review**: Review changes before merging
6. **Interface-Driven**: Use comprehensive interfaces
7. **BEM Methodology**: Follow consistent CSS naming

#### Monitoring

1. **Build Status**: Monitor CI/CD builds
2. **Bundle Size**: Track bundle size changes
3. **Performance**: Monitor build and runtime performance
4. **Dependencies**: Check for security vulnerabilities
5. **Type Safety**: Monitor TypeScript errors

### Quick Fixes

#### Common Quick Fixes

```bash
# Clear all caches and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Angular cache
ng cache clean

# Rebuild everything
npm run build:lib
npm run build:demo

# Check for TypeScript errors
npx tsc --noEmit

# Start fresh development server
npm start
```

#### Emergency Fixes

```bash
# If everything is broken
git clean -fd
git reset --hard HEAD
npm install
npm run build:lib
npm start
```
