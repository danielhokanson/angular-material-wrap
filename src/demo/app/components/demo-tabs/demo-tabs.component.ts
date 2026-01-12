import { Component, input, output, model, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoTab } from './interfaces/demo-tab.interface';
import { AmwTabsComponent, AmwTabComponent, AmwIconComponent } from '../../../../library/src/components/components';

// Re-export for convenience
export type { DemoTab } from './interfaces/demo-tab.interface';

@Component({
    selector: 'amw-demo-tabs',
    standalone: true,
    imports: [
    CommonModule,
    AmwTabsComponent,
    AmwTabComponent,
    AmwIconComponent
],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './demo-tabs.component.html',
    styleUrl: './demo-tabs.component.scss'
})
export class DemoTabsComponent {
    tabs = input<DemoTab[]>([]);
    selectedTabIndex = model<number>(0);
    tabChange = output<number>();

    onTabChange(index: number): void {
        this.selectedTabIndex.set(index);
        this.tabChange.emit(index);
    }
}
