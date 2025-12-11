import { Component, ViewEncapsulation, SecurityContext } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'amw-demo-tabs-code',
  standalone: true,
  imports: [
    FormsModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './tabs-code.component.html',
  styleUrl: './tabs-code.component.scss'
})
export class TabsCodeComponent {
  editableCode = {
    basic: '',
    icons: '',
    lazy: '',
    dynamic: '',
    styled: ''
  };

  renderedHtml: Record<string, SafeHtml> = {};
  errors: Record<string, string> = {};
  highlightedCode: Record<string, string> = {};

  constructor(private sanitizer: DomSanitizer) {
    this.editableCode.basic = this.codeExamples.basic;
    this.editableCode.icons = this.codeExamples.icons;
    this.editableCode.lazy = this.codeExamples.lazy;
    this.editableCode.dynamic = this.codeExamples.dynamic;
    this.editableCode.styled = this.codeExamples.styled;
    this.updateAllPreviews();
  }

  resetCode(exampleKey: keyof typeof this.codeExamples) {
    this.editableCode[exampleKey] = this.codeExamples[exampleKey];
    this.updatePreview(exampleKey);
  }

  onCodeChange(exampleKey: keyof typeof this.codeExamples) {
    this.updatePreview(exampleKey);
  }

  private updatePreview(exampleKey: keyof typeof this.codeExamples) {
    const code = this.editableCode[exampleKey];
    try {
      const sanitized = this.sanitizer.sanitize(SecurityContext.HTML, code);
      if (sanitized) {
        this.renderedHtml[exampleKey] = this.sanitizer.bypassSecurityTrustHtml(sanitized);
        this.errors[exampleKey] = '';
      }
    } catch (error) {
      this.errors[exampleKey] = error instanceof Error ? error.message : 'Invalid HTML';
    }
  }

  private updateAllPreviews() {
    const keys: Array<keyof typeof this.codeExamples> = ['basic', 'icons', 'lazy', 'dynamic', 'styled'];
    keys.forEach(key => this.updatePreview(key));
  }

  hasError(exampleKey: keyof typeof this.codeExamples): boolean {
    return !!this.errors[exampleKey];
  }

  getError(exampleKey: keyof typeof this.codeExamples): string {
    return this.errors[exampleKey] || '';
  }

  getRenderedHtml(exampleKey: keyof typeof this.codeExamples): SafeHtml {
    return this.renderedHtml[exampleKey] || '';
  }

  codeExamples = {
    basic: `<mat-tab-group>
  <mat-tab label="First">Content 1</mat-tab>
  <mat-tab label="Second">Content 2</mat-tab>
  <mat-tab label="Third">Content 3</mat-tab>
</mat-tab-group>`,

    icons: `<mat-tab-group>
  <mat-tab>
    <ng-template mat-tab-label>
      <mat-icon>home</mat-icon>
      Home
    </ng-template>
    Home content
  </mat-tab>
  <mat-tab>
    <ng-template mat-tab-label>
      <mat-icon>person</mat-icon>
      Profile
    </ng-template>
    Profile content
  </mat-tab>
  <mat-tab>
    <ng-template mat-tab-label>
      <mat-icon>settings</mat-icon>
      Settings
    </ng-template>
    Settings content
  </mat-tab>
</mat-tab-group>`,

    lazy: `<mat-tab-group>
  <mat-tab label="Eager">
    This content is loaded immediately
  </mat-tab>
  <mat-tab label="Lazy">
    <ng-template matTabContent>
      This content is lazy loaded
    </ng-template>
  </mat-tab>
</mat-tab-group>`,

    dynamic: `<mat-tab-group [(selectedIndex)]="selectedIndex">
  @for (tab of tabs; track tab) {
    <mat-tab [label]="tab.label">
      {{ tab.content }}
    </mat-tab>
  }
</mat-tab-group>`,

    styled: `<mat-tab-group color="accent" backgroundColor="primary">
  <mat-tab label="Primary Tab">
    Content with custom colors
  </mat-tab>
  <mat-tab label="Accent Tab">
    More content
  </mat-tab>
  <mat-tab label="Disabled" [disabled]="true">
    Disabled content
  </mat-tab>
</mat-tab-group>`
  };
}
