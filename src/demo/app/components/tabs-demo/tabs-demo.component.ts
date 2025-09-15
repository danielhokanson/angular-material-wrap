import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'amw-demo-tabs',
    standalone: true,
    imports: [
        CommonModule,
        MatTabsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule
    ],
    template: `
        <div class="tabs-demo">
            <h2>Tabs Component Demo</h2>
            <p>Interactive demonstration of the Material Tabs component with various configurations.</p>

            <div class="demo-section">
                <h3>Basic Tabs</h3>
                <mat-tab-group>
                    <mat-tab label="First">
                        <div class="tab-content">
                            <h4>First Tab Content</h4>
                            <p>This is the content of the first tab. You can put any content here.</p>
                            <mat-form-field appearance="outline">
                                <mat-label>Sample Input</mat-label>
                                <input matInput placeholder="Enter some text">
                            </mat-form-field>
                        </div>
                    </mat-tab>
                    <mat-tab label="Second">
                        <div class="tab-content">
                            <h4>Second Tab Content</h4>
                            <p>This is the content of the second tab with different content.</p>
                            <button mat-raised-button color="primary">Sample Button</button>
                        </div>
                    </mat-tab>
                    <mat-tab label="Third">
                        <div class="tab-content">
                            <h4>Third Tab Content</h4>
                            <p>This is the content of the third tab.</p>
                            <mat-card>
                                <mat-card-content>
                                    <h5>Sample Card</h5>
                                    <p>You can include any Angular Material components inside tabs.</p>
                                </mat-card-content>
                            </mat-card>
                        </div>
                    </mat-tab>
                </mat-tab-group>
            </div>

            <div class="demo-section">
                <h3>Tabs with Icons</h3>
                <mat-tab-group>
                    <mat-tab>
                        <ng-template mat-tab-label>
                            <mat-icon>home</mat-icon>
                            Home
                        </ng-template>
                        <div class="tab-content">
                            <h4>Home Tab</h4>
                            <p>This tab has a home icon.</p>
                        </div>
                    </mat-tab>
                    <mat-tab>
                        <ng-template mat-tab-label>
                            <mat-icon>settings</mat-icon>
                            Settings
                        </ng-template>
                        <div class="tab-content">
                            <h4>Settings Tab</h4>
                            <p>This tab has a settings icon.</p>
                        </div>
                    </mat-tab>
                    <mat-tab>
                        <ng-template mat-tab-label>
                            <mat-icon>info</mat-icon>
                            About
                        </ng-template>
                        <div class="tab-content">
                            <h4>About Tab</h4>
                            <p>This tab has an info icon.</p>
                        </div>
                    </mat-tab>
                </mat-tab-group>
            </div>

            <div class="demo-section">
                <h3>Dynamic Tabs</h3>
                <div class="tab-controls">
                    <button mat-raised-button (click)="addTab()">Add Tab</button>
                    <button mat-button (click)="removeTab()" [disabled]="tabs.length <= 1">Remove Tab</button>
                </div>
                <mat-tab-group [(selectedIndex)]="selectedTabIndex">
                    <mat-tab *ngFor="let tab of tabs; let i = index" [label]="tab.name">
                        <div class="tab-content">
                            <h4>{{ tab.name }}</h4>
                            <p>This is dynamically created tab #{{ i + 1 }}</p>
                            <p>Created at: {{ tab.createdAt | date:'short' }}</p>
                        </div>
                    </mat-tab>
                </mat-tab-group>
            </div>
        </div>
    `,
    styles: [`
        .tabs-demo {
            padding: 20px;
        }
        
        .tabs-demo h2 {
            margin-bottom: 10px;
        }
        
        .tabs-demo p {
            margin-bottom: 20px;
            color: #666;
        }
        
        .demo-section {
            margin-bottom: 30px;
        }
        
        .demo-section h3 {
            margin-bottom: 15px;
            color: #333;
        }
        
        .tab-content {
            padding: 20px;
            min-height: 200px;
        }
        
        .tab-content h4 {
            margin-bottom: 10px;
        }
        
        .tab-content p {
            margin-bottom: 15px;
        }
        
        .tab-controls {
            margin-bottom: 15px;
        }
        
        .tab-controls button {
            margin-right: 10px;
        }
        
        mat-form-field {
            width: 100%;
            margin-bottom: 16px;
        }
    `]
})
export class TabsDemoComponent {
    tabs: Array<{ name: string, createdAt: Date }> = [
        { name: 'Tab 1', createdAt: new Date() },
        { name: 'Tab 2', createdAt: new Date() }
    ];
    selectedTabIndex = 0;
    tabCounter = 3;

    addTab(): void {
        this.tabs.push({
            name: `Tab ${this.tabCounter}`,
            createdAt: new Date()
        });
        this.tabCounter++;
        this.selectedTabIndex = this.tabs.length - 1;
    }

    removeTab(): void {
        if (this.tabs.length > 1) {
            this.tabs.splice(this.selectedTabIndex, 1);
            if (this.selectedTabIndex >= this.tabs.length) {
                this.selectedTabIndex = this.tabs.length - 1;
            }
        }
    }
}
