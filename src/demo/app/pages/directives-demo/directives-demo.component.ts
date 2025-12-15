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

    constructor(private route: ActivatedRoute, private snackBar: MatSnackBar) { }

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