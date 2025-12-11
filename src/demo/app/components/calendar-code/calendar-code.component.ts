import { Component, ViewEncapsulation, SecurityContext } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'amw-demo-calendar-code',
  standalone: true,
  imports: [
    FormsModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './calendar-code.component.html',
  styleUrl: './calendar-code.component.scss'
})
export class CalendarCodeComponent {
  editableCode = {
    basic: '',
    range: '',
    minMax: '',
    filter: '',
    customClass: ''
  };

  renderedHtml: Record<string, SafeHtml> = {};
  errors: Record<string, string> = {};
  highlightedCode: Record<string, string> = {};

  constructor(private sanitizer: DomSanitizer) {
    this.editableCode.basic = this.codeExamples.basic;
    this.editableCode.range = this.codeExamples.range;
    this.editableCode.minMax = this.codeExamples.minMax;
    this.editableCode.filter = this.codeExamples.filter;
    this.editableCode.customClass = this.codeExamples.customClass;
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
    const keys: Array<keyof typeof this.codeExamples> = ['basic', 'range', 'minMax', 'filter', 'customClass'];
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
    basic: `<mat-card>
  <mat-card-header>
    <mat-card-title>Basic Calendar</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <mat-calendar [(selected)]="selectedDate"></mat-calendar>
  </mat-card-content>
</mat-card>`,

    range: `<mat-card>
  <mat-card-header>
    <mat-card-title>Date Range Calendar</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <mat-calendar
      [(selected)]="selectedDate"
      [startView]="'month'">
    </mat-calendar>
  </mat-card-content>
</mat-card>`,

    minMax: `<mat-card>
  <mat-card-header>
    <mat-card-title>Min/Max Date Calendar</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <mat-calendar
      [(selected)]="selectedDate"
      [minDate]="minDate"
      [maxDate]="maxDate">
    </mat-calendar>
  </mat-card-content>
</mat-card>`,

    filter: `<mat-card>
  <mat-card-header>
    <mat-card-title>Filtered Calendar</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <mat-calendar
      [(selected)]="selectedDate"
      [dateFilter]="myFilter">
    </mat-calendar>
  </mat-card-content>
</mat-card>`,

    customClass: `<mat-card>
  <mat-card-header>
    <mat-card-title>Custom Styled Calendar</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <mat-calendar
      [(selected)]="selectedDate"
      [dateClass]="dateClass">
    </mat-calendar>
  </mat-card-content>
</mat-card>`
  };
}
