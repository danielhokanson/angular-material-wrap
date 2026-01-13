import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { FormsModule } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { AmwTooltipDirective } from '../../../../library/src/directives/amw-tooltip/amw-tooltip.directive';
import { AmwClickOutsideDirective } from '../../../../library/src/directives/amw-click-outside/amw-click-outside.directive';
import { AmwAutoFocusDirective } from '../../../../library/src/directives/amw-auto-focus/amw-auto-focus.directive';
import { AmwCopyToClipboardDirective } from '../../../../library/src/directives/amw-copy-to-clipboard/amw-copy-to-clipboard.directive';
import { AmwTabsComponent, AmwTabComponent, AmwCardComponent, AmwIconComponent } from '../../../../library/src/components/components';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';

@Component({
    selector: 'amw-demo-directives',
    standalone: true,
    imports: [
    FormsModule,
    AmwTooltipDirective,
    AmwClickOutsideDirective,
    AmwAutoFocusDirective,
    AmwCopyToClipboardDirective,
    AmwTabsComponent,
    AmwTabComponent,
    AmwCardComponent,
    AmwIconComponent,
    AmwButtonComponent,
    AmwInputComponent,
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
<amw-input
  label="Auto-focused Input"
  [amwAutoFocus]="true"
  placeholder="Type here..."
  appearance="outline">
</amw-input>`,

        button: `<!-- Auto focus on button -->
<amw-button appearance="elevated" color="primary" [amwAutoFocus]="true">
  Auto-focused Button
</amw-button>`,

        delayed: `<!-- Auto focus with delay -->
<amw-input
  label="Delayed Focus (500ms)"
  [amwAutoFocus]="true"
  [amwAutoFocusDelay]="500"
  placeholder="Focus after 500ms"
  appearance="outline">
</amw-input>`,

        conditional: `<!-- Conditional auto focus -->
<amw-input
  label="Conditionally Focused"
  [amwAutoFocus]="shouldFocus"
  placeholder="Focus when condition is true"
  appearance="outline">
</amw-input>

<!-- Component -->
export class MyComponent {
  shouldFocus = true;
}`,

        container: `<!-- Auto focus on container (focuses first child) -->
<div [amwAutoFocus]="true">
  <amw-input
    label="First Input (will be focused)"
    placeholder="Gets focus"
    appearance="outline">
  </amw-input>
  <amw-input
    label="Second Input"
    placeholder="Not focused"
    appearance="outline">
  </amw-input>
</div>`
    };

    // Copy to Clipboard code examples
    copyToClipboardCodeExamples = {
        basic: `<!-- Basic copy to clipboard -->
<amw-button appearance="elevated"
  amwCopyToClipboard
  [amwCopyToClipboard]="textToCopy"
  icon="content_copy">
  Copy Text
</amw-button>

<!-- Component -->
export class MyComponent {
  textToCopy = 'Hello, World!';
}`,

        fromInput: `<!-- Copy from input field -->
<amw-input
  label="Text to copy"
  [(ngModel)]="copyText"
  appearance="outline">
</amw-input>
<amw-button appearance="elevated"
  amwCopyToClipboard
  [amwCopyToClipboard]="copyText">
  Copy
</amw-button>`,

        withEvents: `<!-- Copy with event handling -->
<amw-button appearance="elevated"
  amwCopyToClipboard
  [amwCopyToClipboard]="codeSnippet"
  (amwCopySuccess)="onCopySuccess($event)"
  (amwCopyError)="onCopyError($event)">
  Copy Code
</amw-button>

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
<amw-button   icon="content_copy"
  amwCopyToClipboard
  [amwCopyToClipboard]="code"
  amwCopySuccessMessage="Code copied!"
  amwCopyErrorMessage="Failed to copy code">
</amw-button>`,

        noToast: `<!-- Disable built-in toast notification -->
<amw-button appearance="elevated"
  amwCopyToClipboard
  [amwCopyToClipboard]="text"
  [amwCopyShowToast]="false"
  (amwCopySuccess)="showCustomNotification($event)">
  Copy (Custom Notification)
</amw-button>

<!-- Component -->
export class MyComponent {
  text = 'Custom notification text';

  showCustomNotification(text: string): void {
    // Show your own snackbar, dialog, etc.
    this.notification.info('Info', 'Copied!', { duration: 2000 });
  }
}`,

        codeBlock: `<!-- Copy code block -->
<div class="code-container">
  <pre><code>{{ codeExample }}</code></pre>
  <amw-button     icon="content_copy"
    amwCopyToClipboard
    [amwCopyToClipboard]="codeExample"
    title="Copy code">
  </amw-button>
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
<amw-button appearance="elevated" (click)="menuOpen = true">
  Open Menu
</amw-button>

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
    <amw-button appearance="text" (click)="closeModal()">Close</amw-button>
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
    <amw-button appearance="text" mat-menu-item>Action 1</amw-button>
    <amw-button appearance="text" mat-menu-item>Action 2</amw-button>
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
<amw-button appearance="elevated" amwTooltip="This is a tooltip">
  Hover me
</amw-button>`,

        positions: `<!-- Different tooltip positions -->
<amw-button appearance="text" amwTooltip="Top tooltip" tooltipPosition="top">Top</amw-button>
<amw-button appearance="text" amwTooltip="Bottom tooltip" tooltipPosition="bottom">Bottom</amw-button>
<amw-button appearance="text" amwTooltip="Left tooltip" tooltipPosition="left">Left</amw-button>
<amw-button appearance="text" amwTooltip="Right tooltip" tooltipPosition="right">Right</amw-button>
<amw-button appearance="text" amwTooltip="Auto position" tooltipPosition="auto">Auto</amw-button>`,

        html: `<!-- Tooltip with HTML content -->
<amw-button appearance="elevated"
  [amwTooltip]="'<strong>Bold</strong> and <em>italic</em>'"
  [tooltipAllowHtml]="true">
  HTML Tooltip
</amw-button>`,

        styling: `<!-- Custom width and styling -->
<amw-button appearance="elevated"
  amwTooltip="This is a wider tooltip with custom styling"
  tooltipMaxWidth="400px"
  tooltipClass="custom-tooltip">
  Custom Style
</amw-button>`,

        disabled: `<!-- Disabled tooltip -->
<amw-button appearance="elevated"
  amwTooltip="This won't show"
  [tooltipDisabled]="true">
  Tooltip Disabled
</amw-button>`,

        config: `<!-- Full configuration object -->
<amw-button appearance="elevated"
  [amwTooltip]="{
    content: 'Configured tooltip',
    position: 'top',
    maxWidth: '300px',
    class: 'custom-class',
    allowHtml: false,
    disabled: false
  }">
  Configured Tooltip
</amw-button>`
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

    constructor(private route: ActivatedRoute, public notification: AmwNotificationService) { }

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
        this.notification.info('Info', 'Click outside detected!', { duration: 2000 });
    }

    copyToClipboard(text?: string): void {
        const textToCopy = text || this.copyText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            this.notification.info('Info', 'Text copied to clipboard!', { duration: 2000 });
        });
    }

    copyCode(): void {
        navigator.clipboard.writeText(this.codeExample).then(() => {
            this.notification.info('Info', 'Code copied to clipboard!', { duration: 2000 });
        });
    }
}