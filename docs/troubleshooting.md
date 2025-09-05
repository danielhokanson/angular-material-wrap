# Troubleshooting

## Common Issues and Solutions

### Build Issues

#### Library Build Failures

**Error**: `Component AngularMaterialWrapComponent is standalone, and cannot be declared in an NgModule`

**Solution**: Ensure the component has `standalone: false` in its decorator:

```typescript
@Component({
  selector: 'amw-angular-material-wrap',
  standalone: false,  // Add this line
  template: `...`,
  styles: []
})
```

**Error**: `ng-packagr` build fails

**Solutions**:

1. Check `src/library/ng-package.json` configuration
2. Verify all exports are in `src/library/src/public-api.ts`
3. Ensure TypeScript compilation passes: `npx tsc --noEmit`

**Error**: TypeScript compilation errors in library

**Solutions**:

1. Check `src/library/tsconfig.lib.json` configuration
2. Verify all imports and exports are correct
3. Run `npx tsc --noEmit` to see detailed errors

#### Demo App Build Failures

**Error**: `'amw-angular-material-wrap' is not a known element`

**Solutions**:

1. Ensure the library module is imported:
   ```typescript
   imports: [AngularMaterialWrapModule];
   ```
2. Check that the library is built: `npm run build:lib`
3. Verify the component selector in the library

**Error**: Import path not found

**Solutions**:

1. Check the import path is correct:
   ```typescript
   import { AngularMaterialWrapModule } from "../../library/src/lib/angular-material-wrap.module";
   ```
2. Verify the file exists at the specified path
3. Ensure the library is properly structured

### Development Server Issues

#### HMR (Hot Module Replacement) Problems

**Issue**: Changes not reflecting in browser

**Solutions**:

1. Restart the development server: `Ctrl+C` then `npm start`
2. Clear browser cache: `Ctrl+Shift+R`
3. Check for TypeScript errors in terminal
4. Verify file changes are being detected

**Issue**: Server not starting

**Solutions**:

1. Check if port 4201 is available: `lsof -i :4201`
2. Kill existing processes: `pkill -f "ng serve"`
3. Clear Angular cache: `ng cache clean`
4. Reinstall dependencies: `rm -rf node_modules && npm install`

#### TypeScript Errors

**Error**: Type errors in demo app

**Solutions**:

1. Check `src/demo/tsconfig.app.json` configuration
2. Verify library types are available
3. Run `npx tsc --noEmit` to see detailed errors
4. Ensure all imports have correct types

**Error**: Module resolution issues

**Solutions**:

1. Check `tsconfig.json` has correct `moduleResolution`
2. Verify import paths are correct
3. Ensure all dependencies are installed
4. Check for circular dependencies

### Runtime Issues

#### Component Not Rendering

**Issue**: Library component not showing

**Solutions**:

1. Check browser console for errors
2. Verify component selector is correct: `<amw-angular-material-wrap>`
3. Ensure module is imported in component
4. Check that component is not standalone if using in module

**Issue**: Styling not applied

**Solutions**:

1. Check if styles are included in build
2. Verify CSS class names are correct
3. Check for CSS conflicts
4. Ensure SCSS compilation is working

#### Import/Export Issues

**Error**: Cannot find module

**Solutions**:

1. Check file paths are correct
2. Verify files exist at specified locations
3. Check for typos in import statements
4. Ensure all exports are in `public-api.ts`

**Error**: Circular dependency

**Solutions**:

1. Check import/export structure
2. Avoid importing from index files in same module
3. Use barrel exports carefully
4. Restructure code to avoid circular references

### Testing Issues

#### Test Failures

**Error**: Component not found in tests

**Solutions**:

1. Import the component in test setup
2. Check test configuration in `tsconfig.spec.json`
3. Verify component is properly exported
4. Use proper testing utilities

**Error**: Module not found in tests

**Solutions**:

1. Check test imports are correct
2. Verify test configuration
3. Ensure all dependencies are available
4. Use proper mocking if needed

### File Organization Issues

#### Inline Templates/Styles

**Issue**: Component has inline template or styles

**Solutions**:

1. Move template to separate `.html` file
2. Move styles to separate `.scss` file
3. Update component decorator to use `templateUrl` and `styleUrls`

```typescript
// ❌ Wrong - inline template and styles
@Component({
  selector: 'amw-my-component',
  template: '<div>Hello</div>',
  styles: ['.my-class { color: red; }']
})

// ✅ Correct - external files
@Component({
  selector: 'amw-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.scss']
})
```

#### Multiple Classes in One File

**Issue**: Multiple classes, interfaces, or enums in one TypeScript file

**Solutions**:

1. Split into separate files
2. One class/interface/enum per file
3. Use proper naming conventions

```typescript
// ❌ Wrong - multiple classes in one file
export class MyComponent {}
export class MyService {}
export interface MyInterface {}

// ✅ Correct - separate files
// my-component.component.ts
export class MyComponent {}

// my-service.service.ts
export class MyService {}

// my-interface.interface.ts
export interface MyInterface {}
```

### Performance Issues

#### Slow Build Times

**Solutions**:

1. Use incremental builds: `npm run watch:lib`
2. Enable build caching in Angular CLI
3. Check for unnecessary dependencies
4. Optimize TypeScript configuration

#### Large Bundle Sizes

**Solutions**:

1. Use bundle analyzer: `ng build --stats-json`
2. Check for unnecessary imports
3. Use tree shaking effectively
4. Optimize dependencies

### Environment Issues

#### Node.js Version

**Issue**: Incompatible Node.js version

**Solutions**:

1. Check required Node.js version in `package.json`
2. Use Node Version Manager (nvm) to switch versions
3. Update to compatible Node.js version

#### Package Manager Issues

**Issue**: npm/yarn conflicts

**Solutions**:

1. Use consistent package manager
2. Clear package manager cache
3. Delete `node_modules` and reinstall
4. Check for lock file conflicts

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

#### Angular DevTools

1. Install Angular DevTools browser extension
2. Check component tree
3. Verify component properties
4. Check for memory leaks

### Getting Help

#### Check Documentation

1. **Project Docs**: Check this `docs/` folder
2. **Angular Docs**: https://angular.dev
3. **ng-packagr Docs**: https://github.com/ng-packagr/ng-packagr
4. **TypeScript Docs**: https://www.typescriptlang.org/docs

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

#### Monitoring

1. **Build Status**: Monitor CI/CD builds
2. **Bundle Size**: Track bundle size changes
3. **Performance**: Monitor build and runtime performance
4. **Dependencies**: Check for security vulnerabilities
