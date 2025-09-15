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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'amw-demo-services',
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
    MatProgressSpinnerModule,
    FormsModule
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
        <div class="services-demo">
            <div class="services-header">
                <h1>Angular Services</h1>
                <p>Global services and utilities for application-wide functionality</p>
            </div>

            <div class="services-content">
                <div class="services-main">
                    <mat-card class="service-demo">
                        <mat-card-header>
                            <mat-card-title>{{ selectedService.name }}</mat-card-title>
                            <mat-card-subtitle>Interactive demo and documentation</mat-card-subtitle>
                        </mat-card-header>
                        <mat-card-content>
                            <mat-tab-group [(selectedIndex)]="selectedTab" class="service-tabs">
                                <mat-tab label="Demo" icon="play_arrow">
                                    <ng-container [ngSwitch]="selectedService.id">
                                        <div *ngSwitchCase="'messaging'" class="demo-content">
                                            <h3>Messaging Service Demo</h3>
                                            <p>This service provides centralized messaging functionality.</p>
                                            
                                            <div class="demo-section">
                                                <h4>Send Message</h4>
                                                <mat-form-field appearance="outline">
                                                    <mat-label>Message</mat-label>
                                                    <input matInput [(ngModel)]="messageText" placeholder="Enter your message">
                                                </mat-form-field>
                                                <button mat-raised-button color="primary" (click)="sendMessage()">
                                                    <mat-icon>send</mat-icon>
                                                    Send Message
                                                </button>
                                            </div>
                                            
                                            <div class="demo-section">
                                                <h4>Message History</h4>
                                                <div class="message-list">
                                                    <div *ngFor="let message of messages" class="message-item">
                                                        {{ message.text }}
                                                        <span class="timestamp">{{ message.timestamp | date:'short' }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div *ngSwitchCase="'loading'" class="demo-content">
                                            <h3>Loading Service Demo</h3>
                                            <p>This service manages loading states throughout the application.</p>
                                            
                                            <div class="demo-section">
                                                <h4>Loading States</h4>
                                                <button mat-raised-button color="primary" (click)="startLoading()" [disabled]="isLoading">
                                                    <mat-icon>play_arrow</mat-icon>
                                                    Start Loading
                                                </button>
                                                <button mat-button (click)="stopLoading()" [disabled]="!isLoading">
                                                    <mat-icon>stop</mat-icon>
                                                    Stop Loading
                                                </button>
                                                
                                                <div *ngIf="isLoading" class="loading-demo">
                                                    <mat-spinner diameter="40"></mat-spinner>
                                                    <p>Loading in progress...</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div *ngSwitchCase="'notification'" class="demo-content">
                                            <h3>Notification Service Demo</h3>
                                            <p>This service provides various types of notifications to users.</p>
                                            
                                            <div class="demo-section">
                                                <h4>Notification Types</h4>
                                                <button mat-raised-button color="primary" (click)="showSuccessNotification()">
                                                    <mat-icon>check_circle</mat-icon>
                                                    Success
                                                </button>
                                                <button mat-raised-button color="warn" (click)="showErrorNotification()">
                                                    <mat-icon>error</mat-icon>
                                                    Error
                                                </button>
                                                <button mat-raised-button color="accent" (click)="showInfoNotification()">
                                                    <mat-icon>info</mat-icon>
                                                    Info
                                                </button>
                                            </div>
                                        </div>
                                    </ng-container>
                                </mat-tab>
                                
                                <mat-tab label="Code" icon="code">
                                    <div class="code-content">
                                        <h3>{{ selectedService.name }} Service Code</h3>
                                        <p>Code examples will be available soon.</p>
                                    </div>
                                </mat-tab>
                                
                                <mat-tab label="API" icon="description">
                                    <div class="api-content">
                                        <h3>{{ selectedService.name }} Service API</h3>
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
        .services-demo {
            padding: 20px;
        }
        
        .services-header h1 {
            margin-bottom: 10px;
        }
        
        .services-header p {
            margin-bottom: 20px;
            color: #666;
        }
        
        .demo-content {
            padding: 20px 0;
        }
        
        .demo-section {
            margin-bottom: 30px;
        }
        
        .message-list {
            max-height: 200px;
            overflow-y: auto;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 16px;
            background: #f9f9f9;
        }
        
        .message-item {
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        
        .message-item:last-child {
            border-bottom: none;
        }
        
        .timestamp {
            float: right;
            color: #666;
            font-size: 0.8em;
        }
        
        .loading-demo {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            margin: 20px 0;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: #f9f9f9;
        }
        
        .loading-demo p {
            margin-top: 16px;
            margin-bottom: 0;
        }
        
        mat-form-field {
            width: 100%;
            margin-bottom: 16px;
        }
        
        button {
            margin-right: 8px;
            margin-bottom: 8px;
        }
    `]
})
export class ServicesDemoComponent implements OnInit {
  // Service definitions
  services = [
    { id: 'messaging', name: 'Messaging Service' },
    { id: 'loading', name: 'Loading Service' },
    { id: 'notification', name: 'Notification Service' }
  ];

  selectedService = { id: 'messaging', name: 'Messaging Service' };
  selectedTab = 0; // 0 = Demo, 1 = Code, 2 = API

  // Messaging service properties
  messageText = '';
  messages: Array<{ text: string, timestamp: Date }> = [];

  // Loading service properties
  isLoading = false;

  constructor(private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      if (data['service']) {
        const service = this.services.find(s => s.id === data['service']);
        if (service) {
          this.selectedService = service;
        }
      }
    });
  }

  // Messaging service methods
  sendMessage(): void {
    if (this.messageText) {
      this.messages.push({
        text: this.messageText,
        timestamp: new Date()
      });
      this.messageText = '';
      this.snackBar.open('Message sent!', 'Close', { duration: 2000 });
    }
  }

  // Loading service methods
  startLoading(): void {
    this.isLoading = true;
    setTimeout(() => this.stopLoading(), 3000);
  }

  stopLoading(): void {
    this.isLoading = false;
  }

  // Notification service methods
  showSuccessNotification(): void {
    this.snackBar.open('Operation completed successfully!', 'Close', { duration: 3000 });
  }

  showErrorNotification(): void {
    this.snackBar.open('An error occurred!', 'Close', { duration: 3000 });
  }

  showInfoNotification(): void {
    this.snackBar.open('Here is some information for you.', 'Close', { duration: 3000 });
  }
}