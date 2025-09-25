import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
        CommonModule,
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