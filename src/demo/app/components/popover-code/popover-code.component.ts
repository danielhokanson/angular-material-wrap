import { Component, OnInit } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AmwPopoverComponent } from '../../../../library/src/components/components/amw-popover/amw-popover.component';
import { PopoverConfig } from '../../../../library/src/components/components/amw-popover/interfaces/popover-config.interface';
import { PopoverTrigger } from '../../../../library/src/components/components/amw-popover/interfaces/popover-trigger.interface';
import { PopoverService } from '../../../../library/src/components/services/popover.service';
import { AmwSize } from '../../../../library/src/shared/types';

/**
 * Code demo component for popover
 * 
 * Shows code examples and usage patterns for the popover component
 */
@Component({
    selector: 'app-popover-code',
    standalone: true,
    imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatSnackBarModule,
    AmwPopoverComponent
],
    templateUrl: './popover-code.component.html',
    styleUrl: './popover-code.component.scss'
})
export class PopoverCodeComponent implements OnInit {
    /** Current popover configuration */
    currentConfig: PopoverConfig = { opened: false };

    /** Current popover trigger */
    currentTrigger: PopoverTrigger = {};

    /** Code examples */
    codeExamples = [
        {
            title: 'Basic Usage',
            description: 'Simple popover with click trigger and basic content',
            config: {
                size: 'medium' as AmwSize,
                position: 'bottom' as const,
                showArrow: true,
                showClose: true,
                showHeader: false,
                showFooter: false
            },
            trigger: {
                type: 'click' as const,
                toggle: true,
                escapeKey: true,
                outsideClick: true
            },
            html: `<amw-popover
  [config]="popoverConfig"
  [trigger]="popoverTrigger"
  [opened]="true"
  (openedChange)="onPopoverToggle($event)">
  <ng-template #trigger>
    <button mat-button>Click me</button>
  </ng-template>
  <ng-template #content>
    <div>Popover content</div>
  </ng-template>
</amw-popover>`,
            typescript: `import { Component } from '@angular/core';
import { AmwPopoverComponent } from '@angular-material-wrap/components';
import { PopoverConfig, PopoverTrigger } from '@angular-material-wrap/components';

@Component({
  selector: 'app-example',
  template: \`<!-- HTML template above -->\`
})
export class ExampleComponent {
  popoverConfig: PopoverConfig = {
    size: 'medium',
    position: 'bottom',
    showArrow: true,
    showClose: true,
    showHeader: false,
    showFooter: false
  };

  popoverTrigger: PopoverTrigger = {
    type: 'click',
    toggle: true,
    escapeKey: true,
    outsideClick: true
  };

  onPopoverToggle(opened: boolean): void {
    console.log('Popover opened:', opened);
  }
}`,
            scss: `// No additional styles needed for basic usage
// The component uses Material Design 3 theming`
        },
        {
            title: 'Hover Trigger',
            description: 'Popover that opens on hover with delay',
            config: {
                size: 'medium' as AmwSize,
                position: 'top' as const,
                showArrow: true,
                showClose: false,
                showHeader: false,
                showFooter: false
            },
            trigger: {
                type: 'hover' as const,
                delay: 300,
                closeDelay: 100
            },
            html: `<amw-popover
  [config]="hoverConfig"
  [trigger]="hoverTrigger"
  (openedChange)="onHoverPopoverToggle($event)">
  <ng-template #trigger>
    <button mat-button>Hover me</button>
  </ng-template>
  <ng-template #content>
    <div>Hover popover content</div>
  </ng-template>
</amw-popover>`,
            typescript: `import { Component } from '@angular/core';
import { PopoverConfig, PopoverTrigger } from '@angular-material-wrap/components';

@Component({
  selector: 'app-hover-example',
  template: \`<!-- HTML template above -->\`
})
export class HoverExampleComponent {
  hoverConfig: PopoverConfig = {
    size: 'medium',
    position: 'top',
    showArrow: true,
    showClose: false,
    showHeader: false,
    showFooter: false
  };

  hoverTrigger: PopoverTrigger = {
    type: 'hover',
    delay: 300,
    closeDelay: 100
  };

  onHoverPopoverToggle(opened: boolean): void {
    console.log('Hover popover opened:', opened);
  }
}`,
            scss: `// Custom styling for hover popover
.hover-popover {
  .amw-popover__trigger {
    transition: all 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
}`
        },
        {
            title: 'Focus Trigger',
            description: 'Popover that opens on focus for accessibility',
            config: {
                size: 'small' as AmwSize,
                position: 'right' as const,
                showArrow: true,
                showClose: false,
                showHeader: false,
                showFooter: false
            },
            trigger: {
                type: 'focus' as const
            },
            html: `<amw-popover
  [config]="focusConfig"
  [trigger]="focusTrigger"
  (openedChange)="onFocusPopoverToggle($event)">
  <ng-template #trigger>
    <button mat-button>Focus me</button>
  </ng-template>
  <ng-template #content>
    <div>Focus popover content</div>
  </ng-template>
</amw-popover>`,
            typescript: `import { Component } from '@angular/core';
import { PopoverConfig, PopoverTrigger } from '@angular-material-wrap/components';

@Component({
  selector: 'app-focus-example',
  template: \`<!-- HTML template above -->\`
})
export class FocusExampleComponent {
  focusConfig: PopoverConfig = {
    size: 'small',
    position: 'right',
    showArrow: true,
    showClose: false,
    showHeader: false,
    showFooter: false
  };

  focusTrigger: PopoverTrigger = {
    type: 'focus'
  };

  onFocusPopoverToggle(opened: boolean): void {
    console.log('Focus popover opened:', opened);
  }
}`,
            scss: `// Focus popover styling
.focus-popover {
  .amw-popover__trigger {
    &:focus {
      outline: 2px solid var(--mat-sys-primary);
      outline-offset: 2px;
    }
  }
}`
        },
        {
            title: 'Large Popover with Header',
            description: 'Large popover with header, footer, and custom content',
            config: {
                size: 'large' as AmwSize,
                position: 'bottom' as const,
                showArrow: true,
                showClose: true,
                showHeader: true,
                showFooter: true,
                headerTitle: 'Popover Title',
                headerSubtitle: 'This is a subtitle',
                footerText: 'Footer information'
            },
            trigger: {
                type: 'click' as const,
                toggle: true
            },
            html: `<amw-popover
  [config]="largeConfig"
  [trigger]="largeTrigger"
  (openedChange)="onLargePopoverToggle($event)">
  <ng-template #trigger>
    <button mat-raised-button color="primary">Large Popover</button>
  </ng-template>
  <ng-template #content>
    <div class="popover-content">
      <h4>Content Title</h4>
      <p>This is the main content of the popover.</p>
      <ul>
        <li>Feature 1</li>
        <li>Feature 2</li>
        <li>Feature 3</li>
      </ul>
    </div>
  </ng-template>
</amw-popover>`,
            typescript: `import { Component } from '@angular/core';
import { PopoverConfig, PopoverTrigger } from '@angular-material-wrap/components';

@Component({
  selector: 'app-large-example',
  template: \`<!-- HTML template above -->\`
})
export class LargeExampleComponent {
  largeConfig: PopoverConfig = {
    size: 'large',
    position: 'bottom',
    showArrow: true,
    showClose: true,
    showHeader: true,
    showFooter: true,
    headerTitle: 'Popover Title',
    headerSubtitle: 'This is a subtitle',
    footerText: 'Footer information'
  };

  largeTrigger: PopoverTrigger = {
    type: 'click',
    toggle: true
  };

  onLargePopoverToggle(opened: boolean): void {
    console.log('Large popover opened:', opened);
  }
}`,
            scss: `// Large popover content styling
.popover-content {
  h4 {
    margin: 0 0 12px 0;
    color: var(--mat-sys-on-surface);
    font-size: 1.125rem;
    font-weight: 500;
  }

  p {
    margin: 0 0 16px 0;
    color: var(--mat-sys-on-surface-variant);
    font-size: 0.875rem;
    line-height: 1.6;
  }

  ul {
    margin: 0;
    padding-left: 16px;
    color: var(--mat-sys-on-surface-variant);
    font-size: 0.875rem;

    li {
      margin-bottom: 4px;
    }
  }
}`
        },
        {
            title: 'Custom Position',
            description: 'Popover with custom position and offset',
            config: {
                size: 'medium' as AmwSize,
                position: 'top-left' as const,
                showArrow: true,
                showClose: true,
                showHeader: false,
                showFooter: false,
                offsetX: 20,
                offsetY: 10
            },
            trigger: {
                type: 'click' as const
            },
            html: `<amw-popover
  [config]="customConfig"
  [trigger]="customTrigger"
  (openedChange)="onCustomPopoverToggle($event)">
  <ng-template #trigger>
    <button mat-button>Custom Position</button>
  </ng-template>
  <ng-template #content>
    <div>Custom positioned popover</div>
  </ng-template>
</amw-popover>`,
            typescript: `import { Component } from '@angular/core';
import { PopoverConfig, PopoverTrigger } from '@angular-material-wrap/components';

@Component({
  selector: 'app-custom-example',
  template: \`<!-- HTML template above -->\`
})
export class CustomExampleComponent {
  customConfig: PopoverConfig = {
    size: 'medium',
    position: 'top-left',
    showArrow: true,
    showClose: true,
    showHeader: false,
    showFooter: false,
    offsetX: 20,
    offsetY: 10
  };

  customTrigger: PopoverTrigger = {
    type: 'click'
  };

  onCustomPopoverToggle(opened: boolean): void {
    console.log('Custom popover opened:', opened);
  }
}`,
            scss: `// Custom position styling
.custom-popover {
  .amw-popover__trigger {
    position: relative;
  }
}`
        },
        {
            title: 'Service Usage',
            description: 'Using PopoverService for programmatic control',
            config: {
                size: 'medium' as AmwSize,
                position: 'bottom' as const,
                showArrow: true,
                showClose: true,
                showHeader: false,
                showFooter: false
            },
            trigger: {
                type: 'click' as const
            },
            html: `<button mat-button (click)="openPopover()">Open Popover</button>
<button mat-button (click)="closePopover()">Close Popover</button>
<button mat-button (click)="togglePopover()">Toggle Popover</button>`,
            typescript: `import { Component, OnInit, OnDestroy } from '@angular/core';
import { PopoverService } from '@angular-material-wrap/components';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-service-example',
  template: \`<!-- HTML template above -->\`
})
export class ServiceExampleComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private popoverService: PopoverService) {}

  ngOnInit(): void {
    // Listen to popover events
    this.popoverService.events$
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        console.log('Popover event:', event);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openPopover(): void {
    this.popoverService.open({
      size: 'medium',
      position: 'bottom',
      showArrow: true,
      showClose: true
    });
  }

  closePopover(): void {
    this.popoverService.close();
  }

  togglePopover(): void {
    this.popoverService.toggle();
  }

  setPosition(position: string): void {
    this.popoverService.setPosition(position as any);
  }

  setSize(size: string): void {
    this.popoverService.setSize(size as any);
  }
}`,
            scss: `// Service example styling
.service-example {
  display: flex;
  gap: 16px;
  justify-content: center;
  padding: 24px;
}`
        }
    ];

    /** Selected code example */
    selectedExample = this.codeExamples[0];

    constructor(
        private popoverService: PopoverService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.loadExample(this.selectedExample);
    }

    /**
     * Loads a code example
     * @param example The example to load
     */
    loadExample(example: any): void {
        this.selectedExample = example;
        this.currentConfig = { ...example.config };
        this.currentTrigger = { ...example.trigger };
        this.popoverService.setConfig(this.currentConfig);
        this.popoverService.setTrigger(this.currentTrigger);
    }

    /**
     * Handles popover opened state change
     * @param opened Whether the popover is opened
     */
    onPopoverOpenedChange(opened: boolean): void {
        this.currentConfig.opened = opened;
    }

    /**
     * Handles popover before open
     */
    onPopoverBeforeOpen(): void {
        this.snackBar.open('Popover is about to open', 'Close', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
        });
    }

    /**
     * Handles popover after open
     */
    onPopoverAfterOpen(): void {
        this.snackBar.open('Popover opened', 'Close', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
        });
    }

    /**
     * Handles popover before close
     */
    onPopoverBeforeClose(): void {
        this.snackBar.open('Popover is about to close', 'Close', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
        });
    }

    /**
     * Handles popover after close
     */
    onPopoverAfterClose(): void {
        this.snackBar.open('Popover closed', 'Close', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
        });
    }

    /**
     * Copies code to clipboard
     * @param code The code to copy
     * @param type The type of code
     */
    copyCode(code: string, type: string): void {
        navigator.clipboard.writeText(code).then(() => {
            this.snackBar.open(`${type} code copied to clipboard`, 'Close', {
                duration: 2000,
                horizontalPosition: 'end',
                verticalPosition: 'top'
            });
        });
    }

    /**
     * Gets the syntax highlighting class for code blocks
     * @param type The type of code
     * @returns CSS class name
     */
    getSyntaxClass(type: string): string {
        switch (type) {
            case 'html':
                return 'language-html';
            case 'typescript':
                return 'language-typescript';
            case 'scss':
                return 'language-scss';
            default:
                return 'language-text';
        }
    }
}
