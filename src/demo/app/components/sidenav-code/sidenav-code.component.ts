import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { AmwSidenavComponent } from '../../../../library/src/components/components/amw-sidenav/amw-sidenav.component';
import { SidenavConfig } from '../../../../library/src/components/components/amw-sidenav/interfaces/sidenav-config.interface';
import { SidenavItem } from '../../../../library/src/components/components/amw-sidenav/interfaces/sidenav-item.interface';
import { SidenavService } from '../../../../library/src/components/services/sidenav.service';

/**
 * Code demo component for sidenav
 * 
 * Shows code examples and usage patterns for the sidenav component
 */
@Component({
  selector: 'app-sidenav-code',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatSnackBarModule,
    AmwSidenavComponent
],
  templateUrl: './sidenav-code.component.html',
  styleUrl: './sidenav-code.component.scss'
})
export class SidenavCodeComponent implements OnInit, OnDestroy {
  /** Subject for component destruction */
  private destroy$ = new Subject<void>();

  /** Current sidenav configuration */
  currentConfig: SidenavConfig = { opened: false };

  /** Navigation items */
  navigationItems: SidenavItem[] = [];

  /** Selected code example */
  selectedExample = 'basic';

  constructor(
    private sidenavService: SidenavService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadSampleData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Loads sample data
   */
  private loadSampleData(): void {
    this.navigationItems = [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: 'dashboard',
        route: '/dashboard',
        tooltip: 'View dashboard overview'
      },
      {
        id: 'users',
        label: 'Users',
        icon: 'people',
        route: '/users',
        tooltip: 'Manage users',
        children: [
          {
            id: 'users-list',
            label: 'All Users',
            icon: 'list',
            route: '/users/list',
            tooltip: 'View all users'
          },
          {
            id: 'users-add',
            label: 'Add User',
            icon: 'person_add',
            route: '/users/add',
            tooltip: 'Add new user'
          }
        ]
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: 'settings',
        route: '/settings',
        tooltip: 'Application settings'
      }
    ];

    this.sidenavService.setItems(this.navigationItems);
  }

  /**
   * Handles sidenav opened state change
   * @param opened Whether the sidenav is opened
   */
  onSidenavOpenedChange(opened: boolean): void {
    this.currentConfig.opened = opened;
  }

  /**
   * Handles navigation item click
   * @param item The clicked item
   */
  onItemClick(item: SidenavItem): void {
    this.snackBar.open(`Clicked: ${item.label}`, 'Close', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  /**
   * Selects a code example
   * @param example The example to select
   */
  selectExample(example: string): void {
    this.selectedExample = example;
    this.loadExample(example);
  }

  /**
   * Loads a code example
   * @param example The example to load
   */
  private loadExample(example: string): void {
    switch (example) {
      case 'basic':
        this.loadBasicExample();
        break;
      case 'overlay':
        this.loadOverlayExample();
        break;
      case 'push':
        this.loadPushExample();
        break;
      case 'nested':
        this.loadNestedExample();
        break;
      case 'custom':
        this.loadCustomExample();
        break;
      case 'responsive':
        this.loadResponsiveExample();
        break;
      default:
        this.loadBasicExample();
    }
  }

  /**
   * Loads basic example
   */
  private loadBasicExample(): void {
    this.currentConfig = {
      mode: 'side',
      opened: true,
      size: 'medium',
      showToggle: true,
      showClose: true
    };
    this.sidenavService.setConfig(this.currentConfig);
  }

  /**
   * Loads overlay example
   */
  private loadOverlayExample(): void {
    this.currentConfig = {
      mode: 'over',
      opened: false,
      size: 'medium',
      showToggle: true,
      showClose: true,
      showBackdrop: true
    };
    this.sidenavService.setConfig(this.currentConfig);
  }

  /**
   * Loads push example
   */
  private loadPushExample(): void {
    this.currentConfig = {
      mode: 'push',
      opened: true,
      size: 'large',
      showToggle: true,
      showClose: true
    };
    this.sidenavService.setConfig(this.currentConfig);
  }

  /**
   * Loads nested example
   */
  private loadNestedExample(): void {
    this.currentConfig = {
      mode: 'side',
      opened: true,
      size: 'medium',
      showToggle: true,
      showClose: true
    };
    this.sidenavService.setConfig(this.currentConfig);
  }

  /**
   * Loads custom example
   */
  private loadCustomExample(): void {
    this.currentConfig = {
      mode: 'side',
      opened: true,
      width: '350px',
      showToggle: true,
      showClose: true,
      position: 'end'
    };
    this.sidenavService.setConfig(this.currentConfig);
  }

  /**
   * Loads responsive example
   */
  private loadResponsiveExample(): void {
    this.currentConfig = {
      mode: 'side',
      opened: true,
      size: 'medium',
      responsive: true,
      showToggle: true,
      showClose: true
    };
    this.sidenavService.setConfig(this.currentConfig);
  }

  /**
   * Gets the HTML code for the current example
   */
  getHtmlCode(): string {
    switch (this.selectedExample) {
      case 'basic':
        return `<amw-sidenav
  [config]="sidenavConfig"
  [items]="navigationItems"
  [opened]="true"
  (openedChange)="onSidenavToggle($event)"
  (itemClick)="onItemClick($event)">
  
  <!-- Main Content -->
  <div class="main-content">
    <h1>Main Content</h1>
    <p>This is the main content area.</p>
  </div>
</amw-sidenav>`;

      case 'overlay':
        return `<amw-sidenav
  [config]="overlayConfig"
  [items]="navigationItems"
  [opened]="false"
  (openedChange)="onSidenavToggle($event)"
  (itemClick)="onItemClick($event)">
  
  <!-- Main Content -->
  <div class="main-content">
    <h1>Main Content</h1>
    <p>This content is overlaid by the sidenav.</p>
  </div>
</amw-sidenav>`;

      case 'push':
        return `<amw-sidenav
  [config]="pushConfig"
  [items]="navigationItems"
  [opened]="true"
  (openedChange)="onSidenavToggle($event)"
  (itemClick)="onItemClick($event)">
  
  <!-- Main Content -->
  <div class="main-content">
    <h1>Main Content</h1>
    <p>This content is pushed by the sidenav.</p>
  </div>
</amw-sidenav>`;

      case 'nested':
        return `<amw-sidenav
  [config]="sidenavConfig"
  [items]="nestedItems"
  [opened]="true"
  (openedChange)="onSidenavToggle($event)"
  (itemClick)="onItemClick($event)">
  
  <!-- Main Content -->
  <div class="main-content">
    <h1>Main Content</h1>
    <p>This sidenav has nested navigation items.</p>
  </div>
</amw-sidenav>`;

      case 'custom':
        return `<amw-sidenav
  [config]="customConfig"
  [items]="navigationItems"
  [opened]="true"
  (openedChange)="onSidenavToggle($event)"
  (itemClick)="onItemClick($event)">
  
  <!-- Main Content -->
  <div class="main-content">
    <h1>Main Content</h1>
    <p>This sidenav has custom width and position.</p>
  </div>
</amw-sidenav>`;

      case 'responsive':
        return `<amw-sidenav
  [config]="responsiveConfig"
  [items]="navigationItems"
  [opened]="true"
  (openedChange)="onSidenavToggle($event)"
  (itemClick)="onItemClick($event)">
  
  <!-- Main Content -->
  <div class="main-content">
    <h1>Main Content</h1>
    <p>This sidenav adapts to screen size.</p>
  </div>
</amw-sidenav>`;

      default:
        return '';
    }
  }

  /**
   * Gets the TypeScript code for the current example
   */
  getTypeScriptCode(): string {
    switch (this.selectedExample) {
      case 'basic':
        return `import { Component } from '@angular/core';
import { SidenavConfig, SidenavItem } from '@angular-material-wrap/components';

@Component({
  selector: 'app-example',
  template: \`<!-- HTML template here -->\`
})
export class ExampleComponent {
  sidenavConfig: SidenavConfig = {
    mode: 'side',
    opened: true,
    size: 'medium',
    showToggle: true,
    showClose: true
  };

  navigationItems: SidenavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard',
      tooltip: 'View dashboard overview'
    },
    {
      id: 'users',
      label: 'Users',
      icon: 'people',
      route: '/users',
      tooltip: 'Manage users'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'settings',
      route: '/settings',
      tooltip: 'Application settings'
    }
  ];

  onSidenavToggle(opened: boolean): void {
    console.log('Sidenav opened:', opened);
  }

  onItemClick(item: SidenavItem): void {
    console.log('Item clicked:', item);
  }
}`;

      case 'overlay':
        return `import { Component } from '@angular/core';
import { SidenavConfig, SidenavItem } from '@angular-material-wrap/components';

@Component({
  selector: 'app-example',
  template: \`<!-- HTML template here -->\`
})
export class ExampleComponent {
  overlayConfig: SidenavConfig = {
    mode: 'over',
    opened: false,
    size: 'medium',
    showToggle: true,
    showClose: true,
    showBackdrop: true
  };

  navigationItems: SidenavItem[] = [
    // ... navigation items
  ];

  onSidenavToggle(opened: boolean): void {
    console.log('Sidenav opened:', opened);
  }

  onItemClick(item: SidenavItem): void {
    console.log('Item clicked:', item);
  }
}`;

      case 'push':
        return `import { Component } from '@angular/core';
import { SidenavConfig, SidenavItem } from '@angular-material-wrap/components';

@Component({
  selector: 'app-example',
  template: \`<!-- HTML template here -->\`
})
export class ExampleComponent {
  pushConfig: SidenavConfig = {
    mode: 'push',
    opened: true,
    size: 'large',
    showToggle: true,
    showClose: true
  };

  navigationItems: SidenavItem[] = [
    // ... navigation items
  ];

  onSidenavToggle(opened: boolean): void {
    console.log('Sidenav opened:', opened);
  }

  onItemClick(item: SidenavItem): void {
    console.log('Item clicked:', item);
  }
}`;

      case 'nested':
        return `import { Component } from '@angular/core';
import { SidenavConfig, SidenavItem } from '@angular-material-wrap/components';

@Component({
  selector: 'app-example',
  template: \`<!-- HTML template here -->\`
})
export class ExampleComponent {
  sidenavConfig: SidenavConfig = {
    mode: 'side',
    opened: true,
    size: 'medium',
    showToggle: true,
    showClose: true
  };

  nestedItems: SidenavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },
    {
      id: 'users',
      label: 'Users',
      icon: 'people',
      route: '/users',
      children: [
        {
          id: 'users-list',
          label: 'All Users',
          icon: 'list',
          route: '/users/list'
        },
        {
          id: 'users-add',
          label: 'Add User',
          icon: 'person_add',
          route: '/users/add'
        }
      ]
    }
  ];

  onSidenavToggle(opened: boolean): void {
    console.log('Sidenav opened:', opened);
  }

  onItemClick(item: SidenavItem): void {
    console.log('Item clicked:', item);
  }
}`;

      case 'custom':
        return `import { Component } from '@angular/core';
import { SidenavConfig, SidenavItem } from '@angular-material-wrap/components';

@Component({
  selector: 'app-example',
  template: \`<!-- HTML template here -->\`
})
export class ExampleComponent {
  customConfig: SidenavConfig = {
    mode: 'side',
    opened: true,
    width: '350px',
    showToggle: true,
    showClose: true,
    position: 'end'
  };

  navigationItems: SidenavItem[] = [
    // ... navigation items
  ];

  onSidenavToggle(opened: boolean): void {
    console.log('Sidenav opened:', opened);
  }

  onItemClick(item: SidenavItem): void {
    console.log('Item clicked:', item);
  }
}`;

      case 'responsive':
        return `import { Component } from '@angular/core';
import { SidenavConfig, SidenavItem } from '@angular-material-wrap/components';

@Component({
  selector: 'app-example',
  template: \`<!-- HTML template here -->\`
})
export class ExampleComponent {
  responsiveConfig: SidenavConfig = {
    mode: 'side',
    opened: true,
    size: 'medium',
    responsive: true,
    showToggle: true,
    showClose: true
  };

  navigationItems: SidenavItem[] = [
    // ... navigation items
  ];

  onSidenavToggle(opened: boolean): void {
    console.log('Sidenav opened:', opened);
  }

  onItemClick(item: SidenavItem): void {
    console.log('Item clicked:', item);
  }
}`;

      default:
        return '';
    }
  }

  /**
   * Gets the SCSS code for the current example
   */
  getScssCode(): string {
    return `.main-content {
  padding: 24px;
  min-height: 100vh;
  background: var(--mat-sys-surface);
  color: var(--mat-sys-on-surface);

  h1 {
    margin: 0 0 16px 0;
    font-size: 2rem;
    font-weight: 400;
  }

  p {
    margin: 0 0 16px 0;
    color: var(--mat-sys-on-surface-variant);
    font-size: 1rem;
    line-height: 1.6;
  }
}

// Responsive Design
@media (max-width: 768px) {
  .main-content {
    padding: 16px;
  }
}

// Dark Theme
.mat-theme-dark {
  .main-content {
    background: var(--mat-sys-surface);
    color: var(--mat-sys-on-surface);
  }
}`;
  }

  /**
   * Gets the service code for the current example
   */
  getServiceCode(): string {
    return `import { Injectable } from '@angular/core';
import { SidenavService } from '@angular-material-wrap/components';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {
  constructor(private sidenavService: SidenavService) {}

  // Open sidenav
  openSidenav(): void {
    this.sidenavService.open();
  }

  // Close sidenav
  closeSidenav(): void {
    this.sidenavService.close();
  }

  // Toggle sidenav
  toggleSidenav(): void {
    this.sidenavService.toggle();
  }

  // Set navigation items
  setNavigationItems(items: SidenavItem[]): void {
    this.sidenavService.setItems(items);
  }

  // Add navigation item
  addNavigationItem(item: SidenavItem): void {
    this.sidenavService.addItem(item);
  }

  // Remove navigation item
  removeNavigationItem(itemId: string): void {
    this.sidenavService.removeItem(itemId);
  }

  // Set active item
  setActiveItem(itemId: string): void {
    this.sidenavService.setActiveItem(itemId);
  }
}`;
  }

  /**
   * Gets the example title
   */
  getExampleTitle(): string {
    const titles: { [key: string]: string } = {
      basic: 'Basic Sidenav',
      overlay: 'Overlay Sidenav',
      push: 'Push Sidenav',
      nested: 'Nested Navigation',
      custom: 'Custom Configuration',
      responsive: 'Responsive Sidenav'
    };
    return titles[this.selectedExample] || 'Sidenav Example';
  }

  /**
   * Gets the example description
   */
  getExampleDescription(): string {
    const descriptions: { [key: string]: string } = {
      basic: 'A simple sidenav with basic navigation items and standard configuration.',
      overlay: 'A sidenav that overlays the main content when opened, with backdrop support.',
      push: 'A sidenav that pushes the main content when opened, creating a side-by-side layout.',
      nested: 'A sidenav with nested navigation items that can be expanded and collapsed.',
      custom: 'A sidenav with custom width, position, and other configuration options.',
      responsive: 'A sidenav that adapts its behavior based on screen size and breakpoints.'
    };
    return descriptions[this.selectedExample] || 'Sidenav example';
  }

  /**
   * Gets the example features
   */
  getExampleFeatures(): string[] {
    const features: { [key: string]: string[] } = {
      basic: [
        'Standard side positioning',
        'Toggle and close buttons',
        'Basic navigation items',
        'Tooltip support'
      ],
      overlay: [
        'Overlays main content',
        'Backdrop support',
        'Toggle and close buttons',
        'Mobile-friendly'
      ],
      push: [
        'Pushes main content',
        'Side-by-side layout',
        'Large size option',
        'Toggle and close buttons'
      ],
      nested: [
        'Expandable navigation items',
        'Hierarchical structure',
        'Collapsible sections',
        'Nested item support'
      ],
      custom: [
        'Custom width (350px)',
        'End position',
        'Custom configuration',
        'Flexible sizing'
      ],
      responsive: [
        'Adapts to screen size',
        'Mobile optimization',
        'Breakpoint awareness',
        'Automatic behavior switching'
      ]
    };
    return features[this.selectedExample] || [];
  }

  /**
   * Copies code to clipboard
   * @param code The code to copy
   */
  copyCode(code: string): void {
    navigator.clipboard.writeText(code).then(() => {
      this.snackBar.open('Code copied to clipboard!', 'Close', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });
    });
  }
}
