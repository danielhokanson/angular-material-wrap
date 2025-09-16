import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
    selector: 'amw-dashboard-page',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatGridListModule,
        MatProgressBarModule,
        MatChipsModule,
        MatDividerModule,
        MatListModule,
        MatTabsModule
    ],
    encapsulation: ViewEncapsulation.None,
    template: `
    <div class="dashboard-page">
      <div class="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to your Angular Material Wrap dashboard</p>
      </div>

      <div class="dashboard-content">
        <mat-grid-list cols="4" rowHeight="200px" gutterSize="16px">
          <!-- Stats Cards -->
          <mat-grid-tile colspan="1" rowspan="1">
            <mat-card class="stat-card">
              <mat-card-content>
                <div class="stat-icon">
                  <mat-icon>widgets</mat-icon>
                </div>
                <div class="stat-content">
                  <h3>19</h3>
                  <p>Components</p>
                </div>
              </mat-card-content>
            </mat-card>
          </mat-grid-tile>

          <mat-grid-tile colspan="1" rowspan="1">
            <mat-card class="stat-card">
              <mat-card-content>
                <div class="stat-icon">
                  <mat-icon>extension</mat-icon>
                </div>
                <div class="stat-content">
                  <h3>3</h3>
                  <p>Directives</p>
                </div>
              </mat-card-content>
            </mat-card>
          </mat-grid-tile>

          <mat-grid-tile colspan="1" rowspan="1">
            <mat-card class="stat-card">
              <mat-card-content>
                <div class="stat-icon">
                  <mat-icon>transform</mat-icon>
                </div>
                <div class="stat-content">
                  <h3>3</h3>
                  <p>Pipes</p>
                </div>
              </mat-card-content>
            </mat-card>
          </mat-grid-tile>

          <mat-grid-tile colspan="1" rowspan="1">
            <mat-card class="stat-card">
              <mat-card-content>
                <div class="stat-icon">
                  <mat-icon>settings</mat-icon>
                </div>
                <div class="stat-content">
                  <h3>3</h3>
                  <p>Services</p>
                </div>
              </mat-card-content>
            </mat-card>
          </mat-grid-tile>

          <!-- Recent Activity -->
          <mat-grid-tile colspan="2" rowspan="2">
            <mat-card class="activity-card">
              <mat-card-header>
                <mat-card-title>Recent Activity</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <mat-list>
                  <mat-list-item>
                    <mat-icon matListItemIcon>add_circle</mat-icon>
                    <div matListItemTitle>Added Tooltip Directive</div>
                    <div matListItemLine>2 hours ago</div>
                  </mat-list-item>
                  <mat-list-item>
                    <mat-icon matListItemIcon>update</mat-icon>
                    <div matListItemTitle>Updated Data Table Component</div>
                    <div matListItemLine>4 hours ago</div>
                  </mat-list-item>
                  <mat-list-item>
                    <mat-icon matListItemIcon>bug_report</mat-icon>
                    <div matListItemTitle>Fixed Calendar Event Positioning</div>
                    <div matListItemLine>1 day ago</div>
                  </mat-list-item>
                  <mat-list-item>
                    <mat-icon matListItemIcon>add_circle</mat-icon>
                    <div matListItemTitle>Added Messaging Service</div>
                    <div matListItemLine>2 days ago</div>
                  </mat-list-item>
                </mat-list>
              </mat-card-content>
            </mat-card>
          </mat-grid-tile>

          <!-- Quick Actions -->
          <mat-grid-tile colspan="2" rowspan="1">
            <mat-card class="actions-card">
              <mat-card-header>
                <mat-card-title>Quick Actions</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="action-buttons">
                  <button mat-raised-button color="primary">
                    <mat-icon>add</mat-icon>
                    New Component
                  </button>
                  <button mat-raised-button color="accent">
                    <mat-icon>code</mat-icon>
                    View Documentation
                  </button>
                  <button mat-raised-button color="warn">
                    <mat-icon>bug_report</mat-icon>
                    Report Issue
                  </button>
                </div>
              </mat-card-content>
            </mat-card>
          </mat-grid-tile>

          <!-- Progress Overview -->
          <mat-grid-tile colspan="2" rowspan="1">
            <mat-card class="progress-card">
              <mat-card-header>
                <mat-card-title>Library Progress</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="progress-item">
                  <div class="progress-label">
                    <span>Controls</span>
                    <span>100%</span>
                  </div>
                  <mat-progress-bar mode="determinate" value="100"></mat-progress-bar>
                </div>
                <div class="progress-item">
                  <div class="progress-label">
                    <span>Components</span>
                    <span>85%</span>
                  </div>
                  <mat-progress-bar mode="determinate" value="85"></mat-progress-bar>
                </div>
                <div class="progress-item">
                  <div class="progress-label">
                    <span>Directives</span>
                    <span>75%</span>
                  </div>
                  <mat-progress-bar mode="determinate" value="75"></mat-progress-bar>
                </div>
                <div class="progress-item">
                  <div class="progress-label">
                    <span>Services</span>
                    <span>90%</span>
                  </div>
                  <mat-progress-bar mode="determinate" value="90"></mat-progress-bar>
                </div>
              </mat-card-content>
            </mat-card>
          </mat-grid-tile>
        </mat-grid-list>
      </div>
    </div>
  `,
    styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
