import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'amw-demo-accordion',
    standalone: true,
    imports: [
        CommonModule,
        MatExpansionModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule
    ],
    template: `
        <div class="accordion-demo">
            <h2>Accordion Component Demo</h2>
            <p>Interactive demonstration of the Material Expansion Panel (Accordion) component with various configurations.</p>

            <div class="demo-section">
                <h3>Basic Accordion</h3>
                <mat-accordion>
                    <mat-expansion-panel>
                        <mat-expansion-panel-header>
                            <mat-panel-title>Personal Information</mat-panel-title>
                            <mat-panel-description>Enter your personal details</mat-panel-description>
                        </mat-expansion-panel-header>
                        <div class="panel-content">
                            <mat-form-field appearance="outline">
                                <mat-label>First Name</mat-label>
                                <input matInput placeholder="Enter your first name">
                            </mat-form-field>
                            <mat-form-field appearance="outline">
                                <mat-label>Last Name</mat-label>
                                <input matInput placeholder="Enter your last name">
                            </mat-form-field>
                        </div>
                    </mat-expansion-panel>

                    <mat-expansion-panel>
                        <mat-expansion-panel-header>
                            <mat-panel-title>Contact Information</mat-panel-title>
                            <mat-panel-description>Add your contact details</mat-panel-description>
                        </mat-expansion-panel-header>
                        <div class="panel-content">
                            <mat-form-field appearance="outline">
                                <mat-label>Email</mat-label>
                                <input matInput placeholder="Enter your email">
                            </mat-form-field>
                            <mat-form-field appearance="outline">
                                <mat-label>Phone</mat-label>
                                <input matInput placeholder="Enter your phone number">
                            </mat-form-field>
                        </div>
                    </mat-expansion-panel>

                    <mat-expansion-panel>
                        <mat-expansion-panel-header>
                            <mat-panel-title>Preferences</mat-panel-title>
                            <mat-panel-description>Set your preferences</mat-panel-description>
                        </mat-expansion-panel-header>
                        <div class="panel-content">
                            <mat-checkbox>Receive email notifications</mat-checkbox>
                            <mat-checkbox>Receive SMS notifications</mat-checkbox>
                            <mat-checkbox>Subscribe to newsletter</mat-checkbox>
                        </div>
                    </mat-expansion-panel>
                </mat-accordion>
            </div>

            <div class="demo-section">
                <h3>Accordion with Icons</h3>
                <mat-accordion>
                    <mat-expansion-panel>
                        <mat-expansion-panel-header>
                            <mat-panel-title>
                                <mat-icon>home</mat-icon>
                                Home
                            </mat-panel-title>
                            <mat-panel-description>Home related settings</mat-panel-description>
                        </mat-expansion-panel-header>
                        <div class="panel-content">
                            <p>This panel contains home-related settings and information.</p>
                            <button mat-raised-button color="primary">Save Home Settings</button>
                        </div>
                    </mat-expansion-panel>

                    <mat-expansion-panel>
                        <mat-expansion-panel-header>
                            <mat-panel-title>
                                <mat-icon>work</mat-icon>
                                Work
                            </mat-panel-title>
                            <mat-panel-description>Work related settings</mat-panel-description>
                        </mat-expansion-panel-header>
                        <div class="panel-content">
                            <p>This panel contains work-related settings and information.</p>
                            <button mat-raised-button color="accent">Save Work Settings</button>
                        </div>
                    </mat-expansion-panel>

                    <mat-expansion-panel>
                        <mat-expansion-panel-header>
                            <mat-panel-title>
                                <mat-icon>settings</mat-icon>
                                Settings
                            </mat-panel-title>
                            <mat-panel-description>General application settings</mat-panel-description>
                        </mat-expansion-panel-header>
                        <div class="panel-content">
                            <p>This panel contains general application settings.</p>
                            <button mat-raised-button>Save Settings</button>
                        </div>
                    </mat-expansion-panel>
                </mat-accordion>
            </div>

            <div class="demo-section">
                <h3>Multi-Select Accordion</h3>
                <mat-accordion multi>
                    <mat-expansion-panel>
                        <mat-expansion-panel-header>
                            <mat-panel-title>Section 1</mat-panel-title>
                            <mat-panel-description>Multiple panels can be open</mat-panel-description>
                        </mat-expansion-panel-header>
                        <div class="panel-content">
                            <p>This is the content of section 1. Multiple panels can be open at the same time.</p>
                        </div>
                    </mat-expansion-panel>

                    <mat-expansion-panel>
                        <mat-expansion-panel-header>
                            <mat-panel-title>Section 2</mat-panel-title>
                            <mat-panel-description>Try opening multiple panels</mat-panel-description>
                        </mat-expansion-panel-header>
                        <div class="panel-content">
                            <p>This is the content of section 2. You can have multiple panels open simultaneously.</p>
                        </div>
                    </mat-expansion-panel>

                    <mat-expansion-panel>
                        <mat-expansion-panel-header>
                            <mat-panel-title>Section 3</mat-panel-title>
                            <mat-panel-description>All panels can be expanded</mat-panel-description>
                        </mat-expansion-panel-header>
                        <div class="panel-content">
                            <p>This is the content of section 3. All panels can be expanded at the same time.</p>
                        </div>
                    </mat-expansion-panel>
                </mat-accordion>
            </div>
        </div>
    `,
    styles: [`
        .accordion-demo {
            padding: 20px;
        }
        
        .accordion-demo h2 {
            margin-bottom: 10px;
        }
        
        .accordion-demo p {
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
        
        .panel-content {
            padding: 16px 0;
        }
        
        .panel-content p {
            margin-bottom: 15px;
        }
        
        mat-form-field {
            width: 100%;
            margin-bottom: 16px;
        }
        
        mat-checkbox {
            display: block;
            margin-bottom: 8px;
        }
        
        button {
            margin-right: 8px;
        }
        
        mat-icon {
            margin-right: 8px;
        }
    `]
})
export class AccordionDemoComponent {
}
