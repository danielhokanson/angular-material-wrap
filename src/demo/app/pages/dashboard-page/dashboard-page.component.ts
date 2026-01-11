import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwCardComponent, AmwIconComponent, AmwProgressSpinnerComponent } from '../../../../library/src/components/components';

@Component({
  selector: 'amw-demo-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    AmwButtonComponent,
    AmwCardComponent,
    AmwIconComponent,
    AmwProgressSpinnerComponent
],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}