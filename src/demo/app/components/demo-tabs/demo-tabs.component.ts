import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DemoTab } from './interfaces/demo-tab.interface';

// Re-export for convenience
export type { DemoTab } from './interfaces/demo-tab.interface';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
    selector: 'amw-demo-tabs',
    standalone: true,
    imports: [
    CommonModule,
    MatIconModule,
    MatTabsModule
],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './demo-tabs.component.html',
    styleUrl: './demo-tabs.component.scss'
})
export class DemoTabsComponent {
    @Input() tabs: DemoTab[] = [];
    @Input() selectedTabIndex = 0;
    @Output() tabChange = new EventEmitter<number>();

    onTabChange(index: number): void {
        this.selectedTabIndex = index;
        this.tabChange.emit(index);
    }
}
