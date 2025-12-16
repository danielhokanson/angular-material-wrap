import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { AmwTooltipDirective } from '../../../../library/src/directives/amw-tooltip/amw-tooltip.directive';
import { AmwClickOutsideDirective } from '../../../../library/src/directives/amw-click-outside/amw-click-outside.directive';
import { AmwAutoFocusDirective } from '../../../../library/src/directives/amw-auto-focus/amw-auto-focus.directive';
import { AmwCopyToClipboardDirective } from '../../../../library/src/directives/amw-copy-to-clipboard/amw-copy-to-clipboard.directive';

@Component({
    selector: 'amw-demo-directives',
    standalone: true,
    imports: [
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule,
    AmwTooltipDirective,
    AmwClickOutsideDirective,
    AmwAutoFocusDirective,
    AmwCopyToClipboardDirective
],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './directives-demo.component.html',
    styleUrl: './directives-demo.component.scss'
})
export class DirectivesDemoComponent implements OnInit {
    // Directive definitions
    directives = [
        { id: 'click-outside', name: 'Click Outside' },
        { id: 'auto-focus', name: 'Auto Focus' },
        { id: 'copy-to-clipboard', name: 'Copy to Clipboard' },
        { id: 'tooltip', name: 'Tooltip' }
    ];

    selectedDirective = { id: 'click-outside', name: 'Click Outside' };
    selectedTab = 0; // 0 = Demo, 1 = Code, 2 = API

    copyText = 'Hello, World!';
    boxClicked = false;
    htmlTooltipContent = '<strong>Bold text</strong> and <em>italic text</em><br/>with <span style="color: #ff6b6b;">colored text</span>';

    codeExample = `function greet(name: string) {
    return \`Hello, \${name}!\`;
}`;

    // Auto Focus code examples
    autoFocusCodeExamples = {
        basic: `<!-- Basic auto focus on input -->
<mat-form-field appearance="outline">
  <mat-label>Auto-focused Input</mat-label>
  <input matInput [amwAutoFocus]="true" placeholder="Type here...">
</mat-form-field>`,

        button: `<!-- Auto focus on button -->
<button mat-raised-button color="primary" [amwAutoFocus]="true">
  Auto-focused Button
</button>`,

        delayed: `<!-- Auto focus with delay -->
<mat-form-field appearance="outline">
  <mat-label>Delayed Focus (500ms)</mat-label>
  <input matInput
    [amwAutoFocus]="true"
    [amwAutoFocusDelay]="500"
    placeholder="Focus after 500ms">
</mat-form-field>`,

        conditional: `<!-- Conditional auto focus -->
<mat-form-field appearance="outline">
  <mat-label>Conditionally Focused</mat-label>
  <input matInput
    [amwAutoFocus]="shouldFocus"
    placeholder="Focus when condition is true">
</mat-form-field>

<!-- Component -->
export class MyComponent {
  shouldFocus = true;
}`,

        container: `<!-- Auto focus on container (focuses first child) -->
<div [amwAutoFocus]="true">
  <mat-form-field appearance="outline">
    <mat-label>First Input (will be focused)</mat-label>
    <input matInput placeholder="Gets focus">
  </mat-form-field>
  <mat-form-field appearance="outline">
    <mat-label>Second Input</mat-label>
    <input matInput placeholder="Not focused">
  </mat-form-field>
</div>`
    };

    // Copy to Clipboard code examples
    copyToClipboardCodeExamples = {
        basic: `<!-- Basic copy to clipboard -->
<button mat-raised-button
  amwCopyToClipboard
  [amwCopyToClipboard]="textToCopy">
  <mat-icon>content_copy</mat-icon>
  Copy Text
</button>

<!-- Component -->
export class MyComponent {
  textToCopy = 'Hello, World!';
}`,

        fromInput: `<!-- Copy from input field -->
<mat-form-field appearance="outline">
  <mat-label>Text to copy</mat-label>
  <input matInput [(ngModel)]="copyText">
</mat-form-field>
<button mat-raised-button
  amwCopyToClipboard
  [amwCopyToClipboard]="copyText">
  Copy
</button>`,

        withEvents: `<!-- Copy with event handling -->
<button mat-raised-button
  amwCopyToClipboard
  [amwCopyToClipboard]="codeSnippet"
  (amwCopySuccess)="onCopySuccess($event)"
  (amwCopyError)="onCopyError($event)">
  Copy Code
</button>

<!-- Component -->
export class MyComponent {
  codeSnippet = 'function hello() { return "world"; }';

  onCopySuccess(text: string): void {
    console.log('Copied:', text);
  }

  onCopyError(error: Error): void {
    console.error('Copy failed:', error);
  }
}`,

        customMessages: `<!-- Custom success/error messages -->
<button mat-icon-button
  amwCopyToClipboard
  [amwCopyToClipboard]="code"
  amwCopySuccessMessage="Code copied!"
  amwCopyErrorMessage="Failed to copy code">
  <mat-icon>content_copy</mat-icon>
</button>`,

        noToast: `<!-- Disable built-in toast notification -->
<button mat-raised-button
  amwCopyToClipboard
  [amwCopyToClipboard]="text"
  [amwCopyShowToast]="false"
  (amwCopySuccess)="showCustomNotification($event)">
  Copy (Custom Notification)
</button>

<!-- Component -->
export class MyComponent {
  text = 'Custom notification text';

  showCustomNotification(text: string): void {
    // Show your own snackbar, dialog, etc.
    this.snackBar.open('Copied!', 'Close', { duration: 2000 });
  }
}`,

        codeBlock: `<!-- Copy code block -->
<div class="code-container">
  <pre><code>{{ codeExample }}</code></pre>
  <button mat-icon-button
    amwCopyToClipboard
    [amwCopyToClipboard]="codeExample"
    title="Copy code">
    <mat-icon>content_copy</mat-icon>
  </button>
</div>`
    };

    // Copy to Clipboard API documentation
    copyToClipboardApiDocumentation = {
        inputs: [
            {
                name: 'amwCopyToClipboard',
                type: 'string',
                default: '""',
                description: 'The text to copy to clipboard. If empty, will attempt to copy element\'s text content or value'
            },
            {
                name: 'amwCopySuccessMessage',
                type: 'string',
                default: '"Copied to clipboard!"',
                description: 'Message to display in toast notification on successful copy'
            },
            {
                name: 'amwCopyErrorMessage',
                type: 'string',
                default: '"Failed to copy to clipboard"',
                description: 'Message to display in toast notification on copy failure'
            },
            {
                name: 'amwCopyShowToast',
                type: 'boolean',
                default: 'true',
                description: 'Whether to show the built-in toast notification'
            }
        ],
        outputs: [
            {
                name: 'amwCopySuccess',
                type: 'EventEmitter<string>',
                description: 'Emits the copied text when copy operation succeeds'
            },
            {
                name: 'amwCopyError',
                type: 'EventEmitter<Error>',
                description: 'Emits the error when copy operation fails'
            }
        ]
    };

    // Click Outside code examples
    clickOutsideCodeExamples = {
        basic: `<!-- Basic click outside detection -->
<div class="content-box"
  (amwClickOutside)="onClickOutside()">
  <h3>Click outside this box</h3>
  <p>Click anywhere outside to trigger the event</p>
</div>

<!-- Component -->
export class MyComponent {
  onClickOutside(): void {
    console.log('Clicked outside!');
  }
}`,

        dropdown: `<!-- Dropdown menu with click outside -->
<button mat-raised-button (click)="menuOpen = true">
  Open Menu
</button>

<div class="dropdown-menu"
  *ngIf="menuOpen"
  (amwClickOutside)="menuOpen = false">
  <mat-nav-list>
    <a mat-list-item>Option 1</a>
    <a mat-list-item>Option 2</a>
    <a mat-list-item>Option 3</a>
  </mat-nav-list>
</div>

<!-- Component -->
export class MyComponent {
  menuOpen = false;
}`,

        modal: `<!-- Modal/Dialog with click outside to close -->
<div class="modal-backdrop" *ngIf="modalOpen">
  <div class="modal-content"
    (amwClickOutside)="closeModal()">
    <h2>Modal Title</h2>
    <p>Click outside this modal to close it</p>
    <button mat-button (click)="closeModal()">Close</button>
  </div>
</div>

<!-- Component -->
export class MyComponent {
  modalOpen = false;

  closeModal(): void {
    this.modalOpen = false;
  }
}`,

        conditional: `<!-- Conditional click outside handling -->
<div class="editable-field"
  [class.editing]="isEditing"
  (amwClickOutside)="handleClickOutside()">
  <input *ngIf="isEditing"
    [(ngModel)]="fieldValue"
    [amwAutoFocus]="true">
  <span *ngIf="!isEditing" (click)="startEditing()">
    {{ fieldValue }}
  </span>
</div>

<!-- Component -->
export class MyComponent {
  isEditing = false;
  fieldValue = 'Click to edit';

  startEditing(): void {
    this.isEditing = true;
  }

  handleClickOutside(): void {
    if (this.isEditing) {
      this.isEditing = false;
      // Save changes here
    }
  }
}`,

        multiElement: `<!-- Multiple elements with click outside -->
<div class="panel-container">
  <div class="panel"
    [class.active]="activePanel === 1"
    (click)="activePanel = 1"
    (amwClickOutside)="activePanel === 1 && deactivatePanel()">
    <h3>Panel 1</h3>
    <p>Content for panel 1</p>
  </div>

  <div class="panel"
    [class.active]="activePanel === 2"
    (click)="activePanel = 2"
    (amwClickOutside)="activePanel === 2 && deactivatePanel()">
    <h3>Panel 2</h3>
    <p>Content for panel 2</p>
  </div>
</div>

<!-- Component -->
export class MyComponent {
  activePanel: number | null = null;

  deactivatePanel(): void {
    this.activePanel = null;
  }
}`,

        withEvent: `<!-- Access the click event -->
<div class="context-menu"
  *ngIf="menuVisible"
  (amwClickOutside)="handleOutsideClick($event)">
  <mat-menu>
    <button mat-menu-item>Action 1</button>
    <button mat-menu-item>Action 2</button>
  </mat-menu>
</div>

<!-- Component -->
export class MyComponent {
  menuVisible = false;

  handleOutsideClick(event: Event): void {
    console.log('Click event:', event);
    this.menuVisible = false;
  }
}`
    };

    // Click Outside API documentation
    clickOutsideApiDocumentation = {
        outputs: [
            {
                name: 'amwClickOutside',
                type: 'EventEmitter<Event>',
                description: 'Emits when a click occurs outside the element. The Event object contains details about the click event.'
            }
        ]
    };

    // Auto Focus API documentation
    autoFocusApiDocumentation = {
        inputs: [
            {
                name: 'amwAutoFocus',
                type: 'boolean',
                default: 'true',
                description: 'Whether to automatically focus the element when it becomes visible'
            },
            {
                name: 'amwAutoFocusDelay',
                type: 'number',
                default: '0',
                description: 'Delay in milliseconds before focusing the element'
            }
        ]
    };

    // Tooltip code examples
    tooltipCodeExamples = {
        basic: `<!-- Basic tooltip with string -->
<button mat-raised-button amwTooltip="This is a tooltip">
  Hover me
</button>`,

        positions: `<!-- Different tooltip positions -->
<button mat-button amwTooltip="Top tooltip" tooltipPosition="top">Top</button>
<button mat-button amwTooltip="Bottom tooltip" tooltipPosition="bottom">Bottom</button>
<button mat-button amwTooltip="Left tooltip" tooltipPosition="left">Left</button>
<button mat-button amwTooltip="Right tooltip" tooltipPosition="right">Right</button>
<button mat-button amwTooltip="Auto position" tooltipPosition="auto">Auto</button>`,

        html: `<!-- Tooltip with HTML content -->
<button mat-raised-button
  [amwTooltip]="'<strong>Bold</strong> and <em>italic</em>'"
  [tooltipAllowHtml]="true">
  HTML Tooltip
</button>`,

        styling: `<!-- Custom width and styling -->
<button mat-raised-button
  amwTooltip="This is a wider tooltip with custom styling"
  tooltipMaxWidth="400px"
  tooltipClass="custom-tooltip">
  Custom Style
</button>`,

        disabled: `<!-- Disabled tooltip -->
<button mat-raised-button
  amwTooltip="This won't show"
  [tooltipDisabled]="true">
  Tooltip Disabled
</button>`,

        config: `<!-- Full configuration object -->
<button mat-raised-button
  [amwTooltip]="{
    content: 'Configured tooltip',
    position: 'top',
    maxWidth: '300px',
    class: 'custom-class',
    allowHtml: false,
    disabled: false
  }">
  Configured Tooltip
</button>`
    };

    // Tooltip API documentation
    tooltipApiDocumentation = {
        inputs: [
            {
                name: 'amwTooltip',
                type: 'string | TooltipConfig',
                default: '""',
                description: 'Tooltip content as string or configuration object'
            },
            {
                name: 'tooltipPosition',
                type: "'top' | 'bottom' | 'left' | 'right' | 'auto'",
                default: "'auto'",
                description: 'Position of the tooltip relative to the element'
            },
            {
                name: 'tooltipDisabled',
                type: 'boolean',
                default: 'false',
                description: 'Whether the tooltip is disabled'
            },
            {
                name: 'tooltipMaxWidth',
                type: 'string',
                default: "'200px'",
                description: 'Maximum width of the tooltip'
            },
            {
                name: 'tooltipClass',
                type: 'string',
                default: '""',
                description: 'Custom CSS class to apply to the tooltip'
            },
            {
                name: 'tooltipAllowHtml',
                type: 'boolean',
                default: 'false',
                description: 'Whether to render HTML content in the tooltip'
            }
        ],
        interface: {
            name: 'TooltipConfig',
            properties: [
                {
                    name: 'content',
                    type: 'string',
                    description: 'The tooltip text or HTML content'
                },
                {
                    name: 'position',
                    type: "'top' | 'bottom' | 'left' | 'right' | 'auto'",
                    optional: true,
                    description: 'Position of the tooltip'
                },
                {
                    name: 'disabled',
                    type: 'boolean',
                    optional: true,
                    description: 'Whether the tooltip is disabled'
                },
                {
                    name: 'maxWidth',
                    type: 'string',
                    optional: true,
                    description: 'Maximum width of the tooltip'
                },
                {
                    name: 'class',
                    type: 'string',
                    optional: true,
                    description: 'Custom CSS class'
                },
                {
                    name: 'allowHtml',
                    type: 'boolean',
                    optional: true,
                    description: 'Whether to render HTML content'
                }
            ]
        }
    };

    constructor(private route: ActivatedRoute, public snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.route.data.subscribe(data => {
            if (data['directive']) {
                const directive = this.directives.find(d => d.id === data['directive']);
                if (directive) {
                    this.selectedDirective = directive;
                }
            }
        });
    }

    onBoxClick(): void {
        this.boxClicked = true;
        setTimeout(() => this.boxClicked = false, 2000);
    }

    onOutsideClick(): void {
        this.snackBar.open('Click outside detected!', 'Close', { duration: 2000 });
    }

    copyToClipboard(text?: string): void {
        const textToCopy = text || this.copyText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            this.snackBar.open('Text copied to clipboard!', 'Close', { duration: 2000 });
        });
    }

    copyCode(): void {
        navigator.clipboard.writeText(this.codeExample).then(() => {
            this.snackBar.open('Code copied to clipboard!', 'Close', { duration: 2000 });
        });
    }
}