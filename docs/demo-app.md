# Demo App

## Overview

The demo application showcases the Angular Material Wrap library components and provides examples of how to integrate them into Angular applications.

## Application Structure

### Main Components

- **AppComponent** (`amw-demo-root`) - Root component of the demo app
- **RouterOutlet** - Angular router outlet for navigation

### File Structure

```
src/demo/
├── app/
│   ├── app.component.ts          # Main app component
│   ├── app.component.html        # App template
│   ├── app.component.scss        # App styles
│   ├── app.component.spec.ts     # App component tests
│   ├── app.config.ts             # App configuration
│   └── app.routes.ts             # App routing
├── main.ts                       # Application bootstrap
├── index.html                    # HTML template
├── styles.scss                   # Global styles
└── tsconfig.*.json               # TypeScript configurations
```

## Component Details

### AppComponent

#### Selector

```html
<amw-demo-root></amw-demo-root>
```

#### Properties

- `title: string` - Application title ("angular-material-wrap-demo")

#### Imports

- `CommonModule` - Angular common directives
- `RouterOutlet` - Angular router outlet
- `AngularMaterialWrapModule` - Library module

#### Template Features

- **Welcome Section**: Displays app title and Angular logo
- **Library Demo Section**: Shows library component usage
- **Navigation Links**: Links to Angular documentation
- **Router Outlet**: Placeholder for future routes

#### Usage Example

```html
<div style="text-align:center">
  <h1>Welcome to {{ title }}!</h1>
  <img width="300" alt="Angular Logo" src="..." />
</div>

<div style="margin: 20px; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
  <h2>Library Component Demo:</h2>
  <amw-angular-material-wrap></amw-angular-material-wrap>
</div>

<router-outlet></router-outlet>
```

## Library Integration

### Import Strategy

The demo app imports library components directly from the source:

```typescript
import { AngularMaterialWrapModule } from "../../library/src/lib/angular-material-wrap.module";
```

### Module Usage

```typescript
@Component({
  selector: "amw-demo-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, AngularMaterialWrapModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "angular-material-wrap-demo";
}
```

## Styling

### Global Styles

- **File**: `src/demo/styles.scss`
- **Purpose**: Global styles for the demo app
- **Content**: Currently minimal, can be expanded

### Component Styles

- **File**: `src/demo/app/app.component.scss`
- **Purpose**: Component-specific styles
- **Content**: Currently minimal, can be expanded

### Inline Styles

The demo uses inline styles for quick demonstration:

```html
<div style="margin: 20px; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
  <!-- Demo content -->
</div>
```

## Routing

### Current Routes

- **Default Route**: Shows the main app component
- **Future Routes**: Can be added as needed

### Route Configuration

```typescript
// src/demo/app/app.routes.ts
import { Routes } from "@angular/router";

export const routes: Routes = [];
```

### Router Outlet

```html
<router-outlet></router-outlet>
```

## Development Server

### Starting the Demo

```bash
# Start development server
npm start

# Alternative command
npm run start:demo
```

### Development Features

- **Hot Module Replacement**: Instant updates
- **Source Maps**: Full debugging support
- **Live Reload**: Automatic browser refresh
- **Error Overlay**: Clear error messages
- **Debug Port**: Runs on port 4201 for debugging

### Server Configuration

- **Port**: 4201 (for debugging)
- **Host**: localhost
- **Protocol**: HTTP
- **HMR**: Enabled

## Build Process

### Development Build

```bash
npm run build:demo
```

### Production Build

```bash
ng build angular-material-wrap-demo --configuration production
```

### Build Output

```
dist/angular-material-wrap-demo/
├── index.html
├── main-{hash}.js
├── polyfills-{hash}.js
├── styles-{hash}.css
└── favicon.ico
```

## Testing

### Test Configuration

- **Framework**: Jasmine + Karma
- **Configuration**: `src/demo/tsconfig.spec.json`
- **Test Files**: `*.spec.ts`

### Running Tests

```bash
# Run demo app tests
npm run test:demo

# Run tests in watch mode
ng test angular-material-wrap-demo
```

### Test Structure

```typescript
// src/demo/app/app.component.spec.ts
describe("AppComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
```

## Deployment

### Static Deployment

1. **Build**: `npm run build:demo`
2. **Upload**: Upload `dist/angular-material-wrap-demo/` to web server
3. **Configure**: Set up web server for SPA routing

### Server Configuration

For SPA routing, configure your web server to serve `index.html` for all routes:

```nginx
# Nginx configuration
location / {
  try_files $uri $uri/ /index.html;
}
```

## Future Enhancements

### Planned Features

1. **Additional Routes**: More demo pages
2. **Component Showcase**: Interactive component examples
3. **Code Examples**: Live code snippets
4. **Documentation**: In-app documentation
5. **Theming**: Multiple theme examples

### Component Examples

- **Form Components**: Input, button, checkbox examples
- **Layout Components**: Card, grid, container examples
- **Navigation Components**: Menu, toolbar, breadcrumb examples
- **Data Components**: Table, list, pagination examples

## Troubleshooting

### Common Issues

#### Import Errors

```typescript
// Error: Cannot find module
import { AngularMaterialWrapModule } from '../../library/src/lib/angular-material-wrap.module';

// Solution: Check file paths and ensure library is built
npm run build:lib
```

#### Build Errors

```bash
# Error: Build fails
npm run build:demo

# Solution: Check TypeScript errors and dependencies
ng build angular-material-wrap-demo --verbose
```

#### Runtime Errors

```bash
# Error: Component not found
'amw-angular-material-wrap' is not a known element

# Solution: Ensure module is imported
imports: [AngularMaterialWrapModule]
```

### Debug Tips

1. **Check Console**: Look for JavaScript errors
2. **Check Network**: Verify library loading
3. **Check Imports**: Ensure all imports are correct
4. **Check Build**: Verify both library and demo build successfully
