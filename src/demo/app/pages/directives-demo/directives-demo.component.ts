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
        AmwTooltipDirective
    ],
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="directives-demo">
            <div class="directives-header">
                <h1>Angular Directives</h1>
                <p>Reusable directive functionality and utilities</p>
            </div>

            <div class="directives-content">
                <div class="directives-main">
                    <mat-card class="directive-demo">
                        <mat-card-header>
                            <mat-card-title>{{ selectedDirective.name }}</mat-card-title>
                            <mat-card-subtitle>Interactive demo and documentation</mat-card-subtitle>
                        </mat-card-header>
                        <mat-card-content>
                            <mat-tab-group [(selectedIndex)]="selectedTab" class="directive-tabs">
                                <mat-tab label="Demo" icon="play_arrow">
                                    <ng-container [ngSwitch]="selectedDirective.id">
                                        <div *ngSwitchCase="'click-outside'" class="demo-content">
                                            <h3>Click Outside Directive Demo</h3>
                                            <p>This directive detects clicks outside of a specified element.</p>
                                            
                                            <div class="demo-box" 
                                                 (click)="onBoxClick()" 
                                                 [class.clicked]="boxClicked"
                                                 style="padding: 20px; border: 2px dashed #ccc; margin: 20px 0; cursor: pointer; text-align: center;">
                                                <h4>Click inside this box</h4>
                                                <p>Then click outside to see the directive in action</p>
                                                <p *ngIf="boxClicked" class="click-indicator">Box was clicked!</p>
                                            </div>
                                            
                                            <div class="demo-box" 
                                                 (click)="onOutsideClick()" 
                                                 style="padding: 20px; border: 2px solid #4caf50; margin: 20px 0; cursor: pointer; text-align: center;">
                                                <h4>Click Outside Area</h4>
                                                <p>This will trigger the click outside event</p>
                                            </div>
                                        </div>

                                        <div *ngSwitchCase="'auto-focus'" class="demo-content">
                                            <h3>Auto Focus Directive Demo</h3>
                                            <p>This directive automatically focuses an element when it becomes visible.</p>
                                            
                                            <div class="demo-section">
                                                <h4>Input with Auto Focus</h4>
                                                <mat-form-field appearance="outline">
                                                    <mat-label>This input will auto-focus</mat-label>
                                                    <input matInput placeholder="Type something here">
                                                </mat-form-field>
                                            </div>
                                            
                                            <div class="demo-section">
                                                <h4>Button with Auto Focus</h4>
                                                <button mat-raised-button color="primary">
                                                    This button will auto-focus
                                                </button>
                                            </div>
                                        </div>

                                        <div *ngSwitchCase="'copy-to-clipboard'" class="demo-content">
                                            <h3>Copy to Clipboard Directive Demo</h3>
                                            <p>This directive allows easy copying of text to the clipboard.</p>
                                            
                                            <div class="demo-section">
                                                <h4>Copy Text</h4>
                                                <mat-form-field appearance="outline">
                                                    <mat-label>Text to copy</mat-label>
                                                    <input matInput [(ngModel)]="copyText" placeholder="Enter text to copy">
                                                </mat-form-field>
                                                <button mat-raised-button color="primary" (click)="copyToClipboard()">
                                                    <mat-icon>content_copy</mat-icon>
                                                    Copy to Clipboard
                                                </button>
                                            </div>
                                            
                                            <div class="demo-section">
                                                <h4>Copy Code Block</h4>
                                                <div class="code-block">
                                                    <pre>{{ codeExample }}</pre>
                                                    <button mat-icon-button (click)="copyCode()" title="Copy code">
                                                        <mat-icon>content_copy</mat-icon>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div *ngSwitchCase="'tooltip'" class="demo-content">
                                            <h3>Tooltip Directive Demo</h3>
                                            <p>Display helpful information on hover or focus with support for HTML content.</p>
                                            
                                            <div class="demo-section">
                                                <h4>Basic Tooltip</h4>
                                                <button mat-raised-button color="primary" 
                                                        amwTooltip="This is a basic tooltip">
                                                    Hover me
                                                </button>
                                            </div>
                                            
                                            <div class="demo-section">
                                                <h4>Tooltip with HTML Content</h4>
                                                <button mat-raised-button color="accent" 
                                                        [amwTooltip]="htmlTooltipContent"
                                                        [tooltipAllowHtml]="true">
                                                    HTML Tooltip
                                                </button>
                                            </div>
                                            
                                            <div class="demo-section">
                                                <h4>Tooltip Positions</h4>
                                                <div class="tooltip-demo-grid">
                                                    <button mat-button amwTooltip="Top tooltip" tooltipPosition="top">Top</button>
                                                    <button mat-button amwTooltip="Bottom tooltip" tooltipPosition="bottom">Bottom</button>
                                                    <button mat-button amwTooltip="Left tooltip" tooltipPosition="left">Left</button>
                                                    <button mat-button amwTooltip="Right tooltip" tooltipPosition="right">Right</button>
                                                </div>
                                            </div>
                                            
                                            <div class="demo-section">
                                                <h4>Tooltip with Delay</h4>
                                                <button mat-button color="warn" 
                                                        amwTooltip="This tooltip has a 1 second delay"
                                                        [tooltipShowDelay]="1000"
                                                        [tooltipHideDelay]="500">
                                                    Delayed Tooltip
                                                </button>
                                            </div>
                                        </div>
                                    </ng-container>
                                </mat-tab>
                                
                                <mat-tab label="Code" icon="code">
                                    <div class="code-content">
                                        <h3>{{ selectedDirective.name }} Directive Code</h3>
                                        <p>Code examples will be available soon.</p>
                                    </div>
                                </mat-tab>
                                
                                <mat-tab label="API" icon="description">
                                    <div class="api-content">
                                        <h3>{{ selectedDirective.name }} Directive API</h3>
                                        <p>API documentation will be available soon.</p>
                                    </div>
                                </mat-tab>
                            </mat-tab-group>
                        </mat-card-content>
                    </mat-card>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .directives-demo {
            padding: 20px;
        }
        
        .directives-header h1 {
            margin-bottom: 10px;
        }
        
        .directives-header p {
            margin-bottom: 20px;
            color: #666;
        }
        
        .demo-content {
            padding: 20px 0;
        }
        
        .demo-box {
            transition: all 0.3s ease;
        }
        
        .demo-box.clicked {
            background-color: #e3f2fd;
            border-color: #2196f3 !important;
        }
        
        .click-indicator {
            color: #2196f3;
            font-weight: bold;
        }
        
        .demo-section {
            margin-bottom: 30px;
        }
        
        .code-block {
            position: relative;
            background: #f5f5f5;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 16px;
            margin: 16px 0;
        }
        
        .code-block pre {
            margin: 0;
            font-family: 'Courier New', monospace;
        }
        
        .code-block button {
            position: absolute;
            top: 8px;
            right: 8px;
        }
        
        mat-form-field {
            width: 100%;
            margin-bottom: 16px;
        }
        
        button {
            margin-right: 8px;
        }
    `]
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