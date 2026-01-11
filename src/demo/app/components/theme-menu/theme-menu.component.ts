import { Component, signal } from '@angular/core';

import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

import { ThemeService, ThemeConfig } from '../../../../library/src/styling/services/theme.service';
import { AmwDividerComponent } from '../../../../library/src/components/components/amw-divider/amw-divider.component';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwIconComponent } from '../../../../library/src/components/components';
@Component({
    selector: 'amw-demo-theme-menu',
    standalone: true,
    imports: [MatTooltipModule,
    RouterModule,
    MatMenuModule,
    AmwDividerComponent,
    AmwButtonComponent,
    AmwIconComponent],
    templateUrl: './theme-menu.component.html',
    styleUrl: './theme-menu.component.scss'
})
export class ThemeMenuComponent {
    currentTheme = signal<ThemeConfig | null>(null);
    allThemes = signal<ThemeConfig[]>([]);

    constructor(private themeService: ThemeService) {
        this.loadThemes();
        this.subscribeToThemeChanges();
    }

    private loadThemes(): void {
        this.allThemes.set(this.themeService.getAllThemes());
        this.currentTheme.set(this.themeService.getCurrentTheme());
    }

    private subscribeToThemeChanges(): void {
        this.themeService.getCurrentTheme$().subscribe(theme => {
            this.currentTheme.set(theme);
        });
    }

    onThemeSelect(themeId: string): void {
        this.themeService.setTheme(themeId);
    }

    getThemeIcon(theme: ThemeConfig): string {
        if (theme.isCustom) {
            return 'palette';
        }
        return theme.isDark ? 'dark_mode' : 'light_mode';
    }

    getThemeDescription(theme: ThemeConfig): string {
        const mode = theme.isDark ? 'Dark' : 'Light';
        const type = theme.isCustom ? 'Custom' : 'Built-in';
        return `${mode} theme (${type})`;
    }
}
