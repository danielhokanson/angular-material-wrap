import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DemoVariation {
    label: string;
    component: any;
    description?: string;
}

export interface DemoSection {
    title: string;
    variations: DemoVariation[];
    realWorldExample?: {
        description: string;
        components: any[];
    };
}

@Component({
    selector: 'amw-demo-layout',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="demo-layout">
      <div class="demo-section" *ngFor="let section of sections">
        <h3 class="demo-section__title">{{ section.title }}</h3>
        <div class="demo-section__content">
          <div class="demo-variation" *ngFor="let variation of section.variations">
            <span class="demo-variation__label">{{ variation.label }}</span>
            <div class="demo-variation__component">
              <ng-container [ngTemplateOutlet]="variation.component"></ng-container>
            </div>
            <p class="demo-variation__description" *ngIf="variation.description">
              {{ variation.description }}
            </p>
          </div>
        </div>
        
        <div class="demo-real-world" *ngIf="section.realWorldExample">
          <p class="demo-real-world__description">{{ section.realWorldExample.description }}</p>
          <div class="demo-real-world__content">
            <ng-container *ngFor="let component of section.realWorldExample.components">
              <ng-container [ngTemplateOutlet]="component"></ng-container>
            </ng-container>
          </div>
        </div>
      </div>
    </div>
  `,
    styleUrls: ['./demo-layout.component.scss']
})
export class DemoLayoutComponent {
    @Input() sections: DemoSection[] = [];
}
