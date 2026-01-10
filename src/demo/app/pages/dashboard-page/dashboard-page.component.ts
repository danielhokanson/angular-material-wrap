import { Component, OnInit } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { ViewEncapsulation } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
@Component({
  selector: 'amw-demo-dashboard-page',
  standalone: true,
  imports: [MatIconModule,
    MatGridListModule,
    MatListModule,
    MatProgressBarModule,
    MatCardModule,
    AmwButtonComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}