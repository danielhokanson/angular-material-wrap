# Demo App

## Overview

The demo application is a comprehensive showcase of the Angular Material Wrap library, featuring interactive examples of all components, complete page layouts, and advanced UI patterns. It serves as both a testing ground for the library and a reference implementation for developers.

## Application Structure

### Main Components

- **AppComponent** (`amw-demo-root`) - Root component with navigation and layout
- **DemoNavigationComponent** - Sidebar navigation with hierarchical menu
- **DashboardPageComponent** - Main dashboard with progress tracking
- **Individual Demo Components** - Specific demos for each library component
- **Page Demo Components** - Complete page layout demonstrations

### File Structure

```
src/demo/
├── app/
│   ├── app.component.ts          # Main app component
│   ├── app.component.html        # App template with navigation
│   ├── app.component.scss        # App styles
│   ├── app.component.spec.ts     # App component tests
│   ├── app.config.ts             # App configuration
│   ├── app.routes.ts             # App routing
│   ├── components/               # Individual component demos
│   │   ├── controls-demo/        # Controls showcase
│   │   ├── components-demo/      # Complex components showcase
│   │   ├── directives-demo/      # Directives showcase
│   │   ├── pipes-demo/          # Pipes showcase
│   │   ├── services-demo/       # Services showcase
│   │   ├── theme-demo/          # Theme management demo
│   │   ├── demo-navigation/     # Navigation component
│   │   ├── demo-tabs/           # Tabbed demo interface
│   │   └── [component]-demo/    # Individual component demos
│   ├── pages/                   # Page layout demos
│   │   ├── pages-demo/          # Pages overview
│   │   ├── dashboard-page/      # Dashboard page
│   │   ├── profile-page/        # Profile page
│   │   ├── settings-page/       # Settings page
│   │   ├── list-page-demo/      # List/Table page demo
│   │   ├── detail-page-demo/    # Detail/View page demo
│   │   ├── form-page-demo/      # Form/Create-Edit page demo
│   │   ├── search-page-demo/    # Search/Filter page demo
│   │   ├── workflow-page-demo/  # Workflow/Process page demo
│   │   └── report-page-demo/    # Report/Analytics page demo
│   └── shared/                  # Shared demo components
│       └── components/          # Reusable demo components
├── main.ts                      # Application bootstrap
├── index.html                   # HTML template
├── styles.scss                  # Global styles
└── tsconfig.*.json              # TypeScript configurations
```

## Navigation Structure

### Main Navigation

The demo app features a comprehensive navigation system with the following sections:

1. **Controls** - Individual control component demos
2. **Components** - Complex component demos
3. **Directives** - Directive demos
4. **Services** - Service demos
5. **Pipes** - Pipe demos
6. **Pages** - Complete page layout demos
7. **Theme Management** - Theme customization and management

### Controls Section

Individual demos for each control component:

- **Button** - API, Code, Demo, Validation
- **Input** - API, Code, Demo, Validation
- **Select** - API, Code, Demo, Validation
- **Checkbox** - API, Code, Demo, Validation
- **Radio** - API, Code, Demo, Validation
- **Radio Group** - API, Code, Demo, Validation
- **Switch** - API, Code, Demo, Validation
- **Toggle** - API, Code, Demo, Validation
- **Slider** - API, Code, Demo, Validation
- **Range Slider** - API, Code, Demo, Validation
- **Autocomplete** - API, Code, Demo, Validation
- **Chips** - API, Code, Demo, Validation
- **Color Picker** - API, Code, Demo, Validation
- **Date Picker** - API, Code, Demo, Validation
- **Time Picker** - API, Code, Demo, Validation
- **File Input** - API, Code, Demo, Validation
- **Textarea** - API, Code, Demo, Validation
- **Data Table** - API, Code, Demo, Validation

### Components Section

Complex component demos:

- **Card** - API, Code, Demo, Validation
- **Dialog** - API, Code, Demo, Validation
- **Popover** - API, Code, Demo, Validation
- **Sidenav** - API, Code, Demo, Validation
- **Stepper** - API, Code, Demo, Validation
- **Tabs** - API, Code, Demo, Validation
- **Accordion** - API, Code, Demo, Validation
- **Calendar** - Full calendar implementation demo

### Pages Section

Complete page layout demos:

- **Dashboard** - Main dashboard with progress tracking
- **Profile** - User profile page
- **Settings** - Application settings page
- **List/Table** - Data table with filtering and bulk actions
- **Detail/View** - Item detail view with related data
- **Form/Create-Edit** - Dynamic form with validation
- **Search/Filter** - Advanced search with collapsible filters
- **Workflow/Process** - Multi-step process workflow
- **Report/Analytics** - Dashboard-style reports with widgets

## Component Details

### AppComponent

#### Selector

```html
<amw-demo-root></amw-demo-root>
```

#### Properties

- `title: string` - Application title ("Angular Material Wrap - Demo Application")

#### Imports

- `CommonModule` - Angular common directives
- `RouterOutlet` - Angular router outlet
- `MatSidenavModule` - Material sidenav
- `MatToolbarModule` - Material toolbar
- `MatListModule` - Material list
- `MatIconModule` - Material icons
- `MatButtonModule` - Material buttons
- `DemoNavigationComponent` - Custom navigation component

#### Template Features

- **Responsive Layout**: Sidenav with toolbar
- **Navigation**: Hierarchical navigation menu
- **Router Outlet**: Dynamic content area
- **Theme Support**: Material Design 3 theming

### DemoNavigationComponent

#### Features

- **Hierarchical Menu**: Expandable navigation sections
- **Active Route Highlighting**: Current page indication
- **Responsive Design**: Mobile-friendly navigation
- **Icon Support**: Material icons for each section

#### Navigation Items

```typescript
navigationItems = [
  {
    title: "Controls",
    icon: "widgets",
    route: "/controls",
    description: "Form and input controls",
    expanded: false,
    children: [
      { title: "Button", route: "/controls/button", icon: "radio_button_checked" },
      { title: "Input", route: "/controls/input", icon: "edit" },
      // ... more controls
    ],
  },
  // ... more sections
];
```

### DashboardPageComponent

#### Features

- **Progress Tracking**: Library completion status
- **Statistics Cards**: Component counts and progress
- **Progress Bars**: Visual progress indicators
- **Responsive Grid**: Material grid layout

#### Statistics

- **Controls**: 20+ components
- **Components**: 10+ complex components
- **Pages**: 6 page stereotypes
- **Directives**: 4 utility directives
- **Pipes**: 3 utility pipes
- **Services**: 3 global services

## Demo Component Structure

### Individual Component Demos

Each component demo follows a consistent structure:

#### API Tab

- Component properties and methods
- Configuration interfaces
- Event definitions
- Usage examples

#### Code Tab

- Live code examples
- Copy-to-clipboard functionality
- Syntax highlighting
- Interactive code editing

#### Demo Tab

- Interactive component examples
- Configuration options
- Real-time updates
- Multiple use cases

#### Validation Tab

- Form validation examples
- Error handling
- Validation rules
- User feedback

### Page Demo Components

Each page demo includes:

- **Complete Implementation**: Full page layout
- **Configuration Examples**: Various configuration options
- **Data Source Integration**: Mock data sources
- **Event Handling**: User interaction examples
- **Responsive Design**: Mobile and desktop layouts

## Library Integration

### Import Strategy

The demo app imports library components from the built library:

```typescript
// Import from built library
import { AmwButtonComponent, AmwDataTableComponent, AmwListPageComponent, ThemeService } from "angular-material-wrap";
```

### Module Usage

```typescript
@Component({
  selector: "amw-demo-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, MatButtonModule, DemoNavigationComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "Angular Material Wrap - Demo Application";
}
```

## Styling

### Global Styles

- **File**: `src/demo/styles.scss`
- **Purpose**: Global styles and Material Design 3 theming
- **Content**: Material Design 3 implementation with custom variables

### Component Styles

- **BEM Methodology**: Consistent naming conventions
- **Material Design 3**: Complete M3 implementation
- **Responsive Design**: Mobile-first approach
- **Theme Support**: Light and dark themes

### Theme Integration

```scss
// Material Design 3 theming
@use "@angular/material" as mat;

// Custom theme variables
$primary: mat.define-palette(mat.$blue-palette);
$accent: mat.define-palette(mat.$pink-palette);
$warn: mat.define-palette(mat.$red-palette);

// Theme configuration
$theme: mat.define-light-theme(
  (
    color: (
      primary: $primary,
      accent: $accent,
      warn: $warn,
    ),
    typography: mat.define-typography-config(),
    density: 0,
  )
);
```

## Routing

### Route Configuration

```typescript
// src/demo/app/app.routes.ts
export const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "dashboard", component: DashboardPageComponent },
  { path: "controls", component: ControlsDemoComponent },
  { path: "components", component: ComponentsDemoComponent },
  { path: "directives", component: DirectivesDemoComponent },
  { path: "pipes", component: PipesDemoComponent },
  { path: "services", component: ServicesDemoComponent },
  { path: "pages", component: PagesDemoComponent },
  { path: "theme", component: ThemeDemoComponent },
  // Individual component routes
  { path: "controls/button", component: ButtonDemoComponent },
  { path: "controls/input", component: InputDemoComponent },
  // ... more routes
  // Page demo routes
  { path: "pages/list", component: ListPageDemoComponent },
  { path: "pages/detail", component: DetailPageDemoComponent },
  { path: "pages/form", component: FormPageDemoComponent },
  { path: "pages/search", component: SearchPageDemoComponent },
  { path: "pages/workflow", component: WorkflowPageDemoComponent },
  { path: "pages/report", component: ReportPageDemoComponent },
];
```

### Lazy Loading

Some routes use lazy loading for better performance:

```typescript
{
  path: 'controls',
  loadComponent: () => import('./components/controls-demo/controls-demo.component')
    .then(m => m.ControlsDemoComponent)
}
```

## Development Server

### Starting the Demo

```bash
# Start development server (port 4201)
npm start

# Alternative command
npm run start:demo

# Watch mode for development
npm run watch:demo
```

### Development Features

- **Hot Module Replacement**: Instant updates
- **Source Maps**: Full debugging support
- **Live Reload**: Automatic browser refresh
- **Error Overlay**: Clear error messages
- **Debug Port**: Runs on port 4201 for debugging
- **Material Design 3**: Complete M3 implementation

### Server Configuration

- **Port**: 4201 (for debugging)
- **Host**: localhost
- **Protocol**: HTTP
- **HMR**: Enabled
- **Source Maps**: Enabled

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
├── assets/
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

### Test Coverage

- **Component Tests**: Individual component testing
- **Integration Tests**: Component interaction testing
- **E2E Tests**: End-to-end user flow testing

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

### CDN Deployment

The demo can be deployed to CDN services like:

- **Netlify**: Automatic deployment from Git
- **Vercel**: Zero-config deployment
- **GitHub Pages**: Free hosting for public repositories

## Features

### Interactive Examples

- **Live Code Editing**: Modify component properties in real-time
- **Configuration Panels**: Dynamic configuration options
- **Event Logging**: See component events in action
- **Validation Examples**: Form validation demonstrations

### Documentation Integration

- **API Reference**: Complete API documentation
- **Usage Examples**: Copy-paste ready code
- **Best Practices**: Recommended usage patterns
- **Troubleshooting**: Common issues and solutions

### Theme Management

- **Light/Dark Themes**: Toggle between themes
- **Custom Themes**: Create and save custom themes
- **Theme Editor**: Visual theme customization
- **Material Design 3**: Complete M3 implementation

## Troubleshooting

### Common Issues

#### Import Errors

```typescript
// Error: Cannot find module
import { AmwButtonComponent } from 'angular-material-wrap';

// Solution: Check if library is built
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
'amw-button' is not a known element

# Solution: Ensure component is imported
imports: [AmwButtonComponent]
```

### Debug Tips

1. **Check Console**: Look for JavaScript errors
2. **Check Network**: Verify library loading
3. **Check Imports**: Ensure all imports are correct
4. **Check Build**: Verify both library and demo build successfully
5. **Check Routes**: Verify routing configuration
6. **Check Theme**: Verify theme configuration

## Future Enhancements

### Planned Features

1. **Additional Examples**: More complex use cases
2. **Performance Testing**: Component performance metrics
3. **Accessibility Testing**: A11y compliance testing
4. **Mobile Testing**: Mobile-specific examples
5. **Integration Examples**: Real-world integration patterns

### Component Examples

- **Advanced Forms**: Complex form validation examples
- **Data Visualization**: Chart and graph components
- **Real-time Updates**: WebSocket integration examples
- **Offline Support**: Service worker integration
- **Internationalization**: Multi-language support examples
