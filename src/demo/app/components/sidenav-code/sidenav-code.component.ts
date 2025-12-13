import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
    selector: 'app-sidenav-code',
    standalone: true,
    imports: [
        FormsModule,
        MatExpansionModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        MatListModule
    ],
    templateUrl: './sidenav-code.component.html',
    styleUrl: './sidenav-code.component.scss'
})
export class SidenavCodeComponent {
    // Editable code examples
    editableCode = {
        basic: '',
        overlay: '',
        push: '',
        fixed: ''
    };

    // Original code examples (for reset functionality)
    readonly codeExamples = {
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
    <button mat-raised-button (click)="drawer.toggle()">
      Toggle Sidenav
    </button>
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
    <button mat-raised-button (click)="drawer.toggle()">
      Toggle Sidenav
    </button>
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
    <button mat-raised-button (click)="drawer.toggle()">
      Toggle Right Sidenav
    </button>
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
        // Initialize editable code
        Object.keys(this.codeExamples).forEach(key => {
            this.editableCode[key as keyof typeof this.codeExamples] =
                this.codeExamples[key as keyof typeof this.codeExamples];
        });
    }

    // Reset code to original
    resetCode(exampleKey: keyof typeof this.codeExamples) {
        this.editableCode[exampleKey] = this.codeExamples[exampleKey];
    }
}
