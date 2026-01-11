import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseCodeComponent } from '../base/base-code.component';

type SidenavExamples = 'basic' | 'overlay' | 'push' | 'fixed';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwIconComponent, AmwSidenavComponent } from '../../../../library/src/components/components';

@Component({
    selector: 'app-sidenav-code',
    standalone: true,
    imports: [
        FormsModule,
        AmwButtonComponent,
        AmwAccordionComponent,
        AmwAccordionPanelComponent,
        AmwIconComponent,
        AmwSidenavComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './sidenav-code.component.html',
    styleUrl: './sidenav-code.component.scss'
})
export class SidenavCodeComponent extends BaseCodeComponent<SidenavExamples> {
    // Original code examples (for reset functionality)
    readonly codeExamples: Record<SidenavExamples, string> = {
        basic: `<amw-sidenav [opened]="sidenavOpened" mode="side">
  <ng-template #sidenavContent>
    <div class="sidenav-nav-list">
      <a href="#" class="nav-item">
        <amw-icon name="home"></amw-icon>
        <span>Home</span>
      </a>
      <a href="#" class="nav-item">
        <amw-icon name="person"></amw-icon>
        <span>Profile</span>
      </a>
      <a href="#" class="nav-item">
        <amw-icon name="settings"></amw-icon>
        <span>Settings</span>
      </a>
    </div>
  </ng-template>
  <ng-template #mainContent>
    <p>Main content here</p>
  </ng-template>
</amw-sidenav>`,

        overlay: `<amw-sidenav [(opened)]="sidenavOpened" mode="over">
  <ng-template #sidenavContent>
    <div class="sidenav-nav-list">
      <a href="#" class="nav-item">
        <amw-icon name="home"></amw-icon>
        <span>Home</span>
      </a>
      <a href="#" class="nav-item">
        <amw-icon name="person"></amw-icon>
        <span>Profile</span>
      </a>
    </div>
  </ng-template>
  <ng-template #mainContent>
    <amw-button variant="elevated" (click)="sidenavOpened = !sidenavOpened">
      Toggle Sidenav
    </amw-button>
    <p>Main content here</p>
  </ng-template>
</amw-sidenav>`,

        push: `<amw-sidenav [(opened)]="sidenavOpened" mode="push">
  <ng-template #sidenavContent>
    <div class="sidenav-nav-list">
      <a href="#" class="nav-item">
        <amw-icon name="home"></amw-icon>
        <span>Home</span>
      </a>
      <a href="#" class="nav-item">
        <amw-icon name="person"></amw-icon>
        <span>Profile</span>
      </a>
    </div>
  </ng-template>
  <ng-template #mainContent>
    <amw-button variant="elevated" (click)="sidenavOpened = !sidenavOpened">
      Toggle Sidenav
    </amw-button>
    <p>Main content is pushed when sidenav opens</p>
  </ng-template>
</amw-sidenav>`,

        fixed: `<amw-sidenav [(opened)]="sidenavOpened" mode="side" position="end">
  <ng-template #sidenavContent>
    <div class="sidenav-nav-list">
      <a href="#" class="nav-item">
        <amw-icon name="home"></amw-icon>
        <span>Home</span>
      </a>
      <a href="#" class="nav-item">
        <amw-icon name="person"></amw-icon>
        <span>Profile</span>
      </a>
    </div>
  </ng-template>
  <ng-template #mainContent>
    <amw-button variant="elevated" (click)="sidenavOpened = !sidenavOpened">
      Toggle Right Sidenav
    </amw-button>
    <p>Sidenav positioned on the right</p>
  </ng-template>
</amw-sidenav>`
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
