import { Component, signal } from '@angular/core';

import { AmwTabsComponent } from '../../../components/components/amw-tabs/amw-tabs.component';
import { AmwTabComponent } from '../../../components/components/amw-tabs/amw-tab.component';

import { AmwThemePickerComponent } from '../theme-picker/theme-picker.component';
import { AmwThemeEditorComponent } from '../theme-editor/theme-editor.component';

@Component({
    selector: 'amw-theme-manager',
    standalone: true,
    imports: [
    AmwTabsComponent,
    AmwTabComponent,
    AmwThemePickerComponent,
    AmwThemeEditorComponent
],
    templateUrl: './theme-manager.component.html',
    styleUrl: './theme-manager.component.scss',
    host: { 'data-amw-id': 'amw-theme-manager' }
})
export class AmwThemeManagerComponent {
    selectedTab = signal(0);

    onTabChange(index: number): void {
        this.selectedTab.set(index);
    }
}
