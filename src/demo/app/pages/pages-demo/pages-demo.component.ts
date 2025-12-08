import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'amw-demo-pages',
  standalone: true,
  imports: [MatCardModule, MatTabsModule, MatButtonModule, MatIconModule],
  encapsulation: ViewEncapsulation.None,
  template: `
        <div class="pages-demo">
          <h1>Page Layouts</h1>
          <p>Complete page layouts and common UI patterns</p>
        
          <mat-card>
            <mat-card-header>
              <mat-card-title>{{ selectedPage.name }}</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <mat-tab-group>
                <mat-tab label="Demo">
                  @if (selectedPage.id === 'dashboard') {
                    <div>
                      <h3>Dashboard Page</h3>
                      <p>Complete dashboard layout with cards and stats.</p>
                      <mat-card>
                        <mat-card-content>
                          <h4>Dashboard Content</h4>
                          <p>This is a sample dashboard layout.</p>
                        </mat-card-content>
                      </mat-card>
                    </div>
                  }
                  @if (selectedPage.id === 'profile') {
                    <div>
                      <h3>Profile Page</h3>
                      <p>User profile page with personal information.</p>
                      <mat-card>
                        <mat-card-content>
                          <h4>Profile Content</h4>
                          <p>This is a sample profile layout.</p>
                        </mat-card-content>
                      </mat-card>
                    </div>
                  }
                  @if (selectedPage.id === 'settings') {
                    <div>
                      <h3>Settings Page</h3>
                      <p>Application settings page with configuration options.</p>
                      <mat-card>
                        <mat-card-content>
                          <h4>Settings Content</h4>
                          <p>This is a sample settings layout.</p>
                        </mat-card-content>
                      </mat-card>
                    </div>
                  }
                </mat-tab>
                <mat-tab label="Code">
                  <h3>{{ selectedPage.name }} Page Code</h3>
                  <p>Code examples will be available soon.</p>
                </mat-tab>
                <mat-tab label="API">
                  <h3>{{ selectedPage.name }} Page API</h3>
                  <p>API documentation will be available soon.</p>
                </mat-tab>
              </mat-tab-group>
            </mat-card-content>
          </mat-card>
        </div>
        `,
  styles: [`
        .pages-demo {
            padding: 20px;
        }
    `]
})
export class PagesDemoComponent implements OnInit {
  pages = [
    { id: 'dashboard', name: 'Dashboard' },
    { id: 'profile', name: 'Profile' },
    { id: 'settings', name: 'Settings' }
  ];

  selectedPage = { id: 'dashboard', name: 'Dashboard' };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      if (data['page']) {
        const page = this.pages.find(p => p.id === data['page']);
        if (page) {
          this.selectedPage = page;
        }
      }
    });
  }
}