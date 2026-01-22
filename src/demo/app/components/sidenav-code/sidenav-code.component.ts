import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwIconComponent, AmwSidenavComponent } from '../../../../library/src/components/components';

@Component({
  selector: 'app-sidenav-code',
  standalone: true,
  imports: [
    FormsModule,
    AmwCodeDocComponent,
    AmwButtonComponent,
    AmwIconComponent,
    AmwSidenavComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './sidenav-code.component.html',
  styleUrl: './sidenav-code.component.scss'
})
export class SidenavCodeComponent implements OnInit {
  // Sidenav states
  sidenavOpened = true;
  overlaySidenavOpened = false;
  pushSidenavOpened = false;
  fixedSidenavOpened = false;

  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Sidenav',
      description: 'Side mode with navigation list',
      code: `<amw-sidenav [opened]="sidenavOpened" mode="side">
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
</amw-sidenav>`
    },
    {
      key: 'overlay',
      title: 'Overlay Mode',
      description: 'Sidenav overlays content with backdrop',
      code: `<amw-sidenav [(opened)]="sidenavOpened" mode="over">
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
    <amw-button appearance="elevated" (click)="sidenavOpened = !sidenavOpened">
      Toggle Sidenav
    </amw-button>
    <p>Main content here</p>
  </ng-template>
</amw-sidenav>`
    },
    {
      key: 'push',
      title: 'Push Mode',
      description: 'Sidenav pushes content to the side',
      code: `<amw-sidenav [(opened)]="sidenavOpened" mode="push">
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
    <amw-button appearance="elevated" (click)="sidenavOpened = !sidenavOpened">
      Toggle Sidenav
    </amw-button>
    <p>Main content is pushed when sidenav opens</p>
  </ng-template>
</amw-sidenav>`
    },
    {
      key: 'fixed',
      title: 'Fixed Position',
      description: 'Sidenav on the right side',
      code: `<amw-sidenav [(opened)]="sidenavOpened" mode="side" position="end">
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
    <amw-button appearance="elevated" (click)="sidenavOpened = !sidenavOpened">
      Toggle Right Sidenav
    </amw-button>
    <p>Sidenav positioned on the right</p>
  </ng-template>
</amw-sidenav>`
    }
  ];

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
  }
}
