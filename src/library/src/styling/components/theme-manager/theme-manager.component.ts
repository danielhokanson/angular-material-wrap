import { Component, signal } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

import { AmwThemePickerComponent } from '../theme-picker/theme-picker.component';
import { AmwThemeEditorComponent } from '../theme-editor/theme-editor.component';

@Component({
    selector: 'amw-theme-manager',
    standalone: true,
    imports: [
    MatTabsModule,
    MatIconModule,
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
