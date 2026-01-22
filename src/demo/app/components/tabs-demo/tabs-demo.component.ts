import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwTabsComponent, AmwTabComponent, AmwCardComponent, AmwIconComponent } from '../../../../library/src/components/components';
import { AmwDemoDocComponent } from '../../shared/components/demo-doc/demo-doc.component';

@Component({
    selector: 'amw-demo-tabs',
    standalone: true,
    imports: [
        CommonModule,
        AmwTabsComponent,
        AmwTabComponent,
        AmwCardComponent,
        AmwIconComponent,
        AmwButtonComponent,
        AmwInputComponent,
        AmwDemoDocComponent
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
