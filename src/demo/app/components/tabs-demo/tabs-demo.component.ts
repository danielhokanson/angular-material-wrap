import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
@Component({
    selector: 'amw-demo-tabs',
    standalone: true,
    imports: [CommonModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    AmwButtonComponent,
    AmwInputComponent],
    templateUrl: './tabs-demo.component.html',
    styleUrl: './tabs-demo.component.scss'
})
export class TabsDemoComponent {
    tabs: Array<{ name: string, createdAt: Date }> = [
        { name: 'Tab 1', createdAt: new Date() },
        { name: 'Tab 2', createdAt: new Date() }
    ];
    selectedTabIndex = 0;
    tabCounter = 3;

    addTab(): void {
        this.tabs.push({
            name: `Tab ${this.tabCounter}`,
            createdAt: new Date()
        });
        this.tabCounter++;
        this.selectedTabIndex = this.tabs.length - 1;
    }

    removeTab(): void {
        if (this.tabs.length > 1) {
            this.tabs.splice(this.selectedTabIndex, 1);
            if (this.selectedTabIndex >= this.tabs.length) {
                this.selectedTabIndex = this.tabs.length - 1;
            }
        }
    }
}
