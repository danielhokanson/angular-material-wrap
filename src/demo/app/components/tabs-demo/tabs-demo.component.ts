import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'amw-demo-tabs',
    standalone: true,
    imports: [
        CommonModule,
        MatTabsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule
    ],
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
