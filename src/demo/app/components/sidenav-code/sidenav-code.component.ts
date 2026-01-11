import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BaseCodeComponent } from '../base/base-code.component';

type SidenavExamples = 'basic' | 'overlay' | 'push' | 'fixed';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwIconComponent } from '../../../../library/src/components/components';
@Component({
    selector: 'app-sidenav-code',
    standalone: true,
    imports: [FormsModule,
    MatSidenavModule,
    MatListModule,
    AmwButtonComponent,
    AmwAccordionComponent,
    AmwAccordionPanelComponent,
    AmwIconComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './sidenav-code.component.html',
    styleUrl: './sidenav-code.component.scss'
})
export class SidenavCodeComponent extends BaseCodeComponent<SidenavExamples> {
    // Original code examples (for reset functionality)
    readonly codeExamples: Record<SidenavExamples, string> = {
        basic: `<mat-drawer-container class="example-container">
  <mat-drawer mode="side" opened>
    <mat-nav-list>
      <a mat-list-item href="#">Link 1</a>
      <a mat-list-item href="#">Link 2</a>
      <a mat-list-item href="#">Link 3</a>
    </mat-nav-list>
  </mat-drawer>
  <mat-drawer-content>
    <p>Main content here</p>
  </mat-drawer-content>
</mat-drawer-container>`,

        overlay: `<mat-drawer-container class="example-container">
  <mat-drawer #drawer mode="over">
    <mat-nav-list>
      <a mat-list-item href="#">Link 1</a>
      <a mat-list-item href="#">Link 2</a>
      <a mat-list-item href="#">Link 3</a>
    </mat-nav-list>
  </mat-drawer>
  <mat-drawer-content>
    <amw-button variant="elevated" (click)="drawer.toggle()">
      Toggle Sidenav
    </amw-button>
    <p>Main content here</p>
  </mat-drawer-content>
</mat-drawer-container>`,

        push: `<mat-drawer-container class="example-container">
  <mat-drawer #drawer mode="push">
    <mat-nav-list>
      <a mat-list-item href="#">Link 1</a>
      <a mat-list-item href="#">Link 2</a>
      <a mat-list-item href="#">Link 3</a>
    </mat-nav-list>
  </mat-drawer>
  <mat-drawer-content>
    <amw-button variant="elevated" (click)="drawer.toggle()">
      Toggle Sidenav
    </amw-button>
    <p>Main content is pushed when sidenav opens</p>
  </mat-drawer-content>
</mat-drawer-container>`,

        fixed: `<mat-drawer-container class="example-container" hasBackdrop="false">
  <mat-drawer #drawer mode="side" position="end">
    <mat-nav-list>
      <a mat-list-item href="#">Link 1</a>
      <a mat-list-item href="#">Link 2</a>
      <a mat-list-item href="#">Link 3</a>
    </mat-nav-list>
  </mat-drawer>
  <mat-drawer-content>
    <amw-button variant="elevated" (click)="drawer.toggle()">
      Toggle Right Sidenav
    </amw-button>
    <p>Sidenav positioned on the right</p>
  </mat-drawer-content>
</mat-drawer-container>`
    };

    // Sidenav states
    sidenavOpened = true;
    overlaySidenavOpened = false;
    pushSidenavOpened = false;
    fixedSidenavOpened = false;

    constructor() {
        super();
    }
}
