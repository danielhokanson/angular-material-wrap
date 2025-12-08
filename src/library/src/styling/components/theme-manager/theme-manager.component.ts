import { Component, signal } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

import { ThemePickerComponent } from '../theme-picker/theme-picker.component';
import { ThemeEditorComponent } from '../theme-editor/theme-editor.component';

@Component({
    selector: 'amw-theme-manager',
    standalone: true,
    imports: [
    MatTabsModule,
    MatIconModule,
    ThemePickerComponent,
    ThemeEditorComponent
],
    templateUrl: './theme-manager.component.html',
    styleUrl: './theme-manager.component.scss'
})
export class ThemeManagerComponent {
    selectedTab = signal(0);

    onTabChange(index: number): void {
        this.selectedTab.set(index);
    }
}
