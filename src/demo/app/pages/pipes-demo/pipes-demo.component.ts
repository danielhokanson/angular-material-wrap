import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'amw-demo-pipes',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
        <div class="pipes-demo">
            <div class="pipes-header">
                <h1>Angular Pipes</h1>
                <p>Data transformation pipes for formatting and manipulating data</p>
            </div>

            <div class="pipes-content">
                <div class="pipes-main">
                    <mat-card class="pipe-demo">
                        <mat-card-header>
                            <mat-card-title>{{ selectedPipe.name }}</mat-card-title>
                            <mat-card-subtitle>Interactive demo and documentation</mat-card-subtitle>
                        </mat-card-header>
                        <mat-card-content>
                            <mat-tab-group [(selectedIndex)]="selectedTab" class="pipe-tabs">
                                <mat-tab label="Demo" icon="play_arrow">
                                    <ng-container [ngSwitch]="selectedPipe.id">
                                        <div *ngSwitchCase="'currency'" class="demo-content">
                                            <h3>Currency Pipe Demo</h3>
                                            <p>This pipe formats numbers as currency.</p>
                                            
                                            <div class="demo-section">
                                                <h4>Basic Currency Formatting</h4>
                                                <mat-form-field appearance="outline">
                                                    <mat-label>Amount</mat-label>
                                                    <input matInput [(ngModel)]="currencyAmount" type="number" placeholder="Enter amount">
                                                </mat-form-field>
                                                
                                                <div class="pipe-result">
                                                    <h4>Result:</h4>
                                                    <p class="result-text">{{ currencyAmount | currency:'USD' }}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div *ngSwitchCase="'date'" class="demo-content">
                                            <h3>Date Pipe Demo</h3>
                                            <p>This pipe formats dates in various ways.</p>
                                            
                                            <div class="demo-section">
                                                <h4>Date Formatting</h4>
                                                <div class="pipe-result">
                                                    <h4>Current Date:</h4>
                                                    <p class="result-text">{{ currentDate | date:'medium' }}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div *ngSwitchCase="'text-transform'" class="demo-content">
                                            <h3>Text Transform Pipe Demo</h3>
                                            <p>This pipe transforms text in various ways.</p>
                                            
                                            <div class="demo-section">
                                                <h4>Text Transformation</h4>
                                                <mat-form-field appearance="outline">
                                                    <mat-label>Text to Transform</mat-label>
                                                    <input matInput [(ngModel)]="textValue" placeholder="Enter text to transform">
                                                </mat-form-field>
                                                
                                                <div class="pipe-result">
                                                    <h4>Results:</h4>
                                                    <p><strong>Uppercase:</strong> {{ textValue | uppercase }}</p>
                                                    <p><strong>Lowercase:</strong> {{ textValue | lowercase }}</p>
                                                    <p><strong>Title Case:</strong> {{ textValue | titlecase }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </ng-container>
                                </mat-tab>
                                
                                <mat-tab label="Code" icon="code">
                                    <div class="code-content">
                                        <h3>{{ selectedPipe.name }} Pipe Code</h3>
                                        <p>Code examples will be available soon.</p>
                                    </div>
                                </mat-tab>
                                
                                <mat-tab label="API" icon="description">
                                    <div class="api-content">
                                        <h3>{{ selectedPipe.name }} Pipe API</h3>
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
        .pipes-demo {
            padding: 20px;
        }
        
        .pipes-header h1 {
            margin-bottom: 10px;
        }
        
        .pipes-header p {
            margin-bottom: 20px;
            color: #666;
        }
        
        .demo-content {
            padding: 20px 0;
        }
        
        .demo-section {
            margin-bottom: 30px;
        }
        
        .pipe-result {
            margin-top: 20px;
            padding: 16px;
            background: #f5f5f5;
            border-radius: 4px;
            border: 1px solid #ddd;
        }
        
        .result-text {
            font-family: 'Courier New', monospace;
            font-size: 1.1em;
            font-weight: bold;
            color: #2196f3;
            margin: 8px 0;
        }
        
        mat-form-field {
            width: 100%;
            margin-bottom: 16px;
        }
    `]
})
export class PipesDemoComponent implements OnInit {
  // Pipe definitions
  pipes = [
    { id: 'currency', name: 'Currency Pipe' },
    { id: 'date', name: 'Date Pipe' },
    { id: 'text-transform', name: 'Text Transform Pipe' }
  ];

  selectedPipe = { id: 'currency', name: 'Currency Pipe' };
  selectedTab = 0; // 0 = Demo, 1 = Code, 2 = API

  // Currency pipe properties
  currencyAmount = 1234.56;

  // Date pipe properties
  currentDate = new Date();

  // Text transform pipe properties
  textValue = 'Hello World';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      if (data['pipe']) {
        const pipe = this.pipes.find(p => p.id === data['pipe']);
        if (pipe) {
          this.selectedPipe = pipe;
        }
      }
    });
  }
}