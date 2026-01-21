import { Component, signal, ViewEncapsulation, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AmwThemeService, AmwThemeConfig } from '../../../../library/src/styling/services/amw-theme.service';
import { AmwDividerComponent } from '../../../../library/src/components/components/amw-divider/amw-divider.component';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwIconComponent, AmwPopoverComponent } from '../../../../library/src/components/components';
import { AmwTooltipDirective } from '../../../../library/src/directives';
@Component({
    selector: 'amw-demo-theme-menu',
    standalone: true,
    imports: [CommonModule,
    RouterModule,
    AmwDividerComponent,
    AmwButtonComponent,
    AmwIconComponent,
    AmwPopoverComponent,
    AmwTooltipDirective],
    templateUrl: './theme-menu.component.html',
    styleUrl: './theme-menu.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class ThemeMenuComponent {
    currentTheme = signal<AmwThemeConfig | null>(null);
    allThemes = signal<AmwThemeConfig[]>([]);

    constructor(private themeService: AmwThemeService) {
        this.loadThemes();
        this.subscribeToThemeChanges();

        // React to custom themes changes from the service
        effect(() => {
            // Access the customThemes signal to create dependency
            const customThemes = this.themeService.customThemes();
            // Reload all themes when custom themes change
            this.allThemes.set(this.themeService.getAllThemes());
        });
    }

    private loadThemes(): void {
        this.allThemes.set(this.themeService.getAllThemes());
        this.currentTheme.set(this.themeService.getCurrentTheme());
    }

    private subscribeToThemeChanges(): void {
        this.themeService.getCurrentTheme$().subscribe(theme => {
            this.currentTheme.set(theme);
            // Also refresh the themes list in case colors changed
            this.allThemes.set(this.themeService.getAllThemes());
        });
    }

    onThemeSelect(themeId: string): void {
        this.themeService.setTheme(themeId);
    }

    getThemeIcon(theme: AmwThemeConfig): string {
        if (theme.isCustom) {
            return 'palette';
        }
        return theme.isDark ? 'dark_mode' : 'light_mode';
    }

    getThemeDescription(theme: AmwThemeConfig): string {
        const mode = theme.isDark ? 'Dark' : 'Light';
        const type = theme.isCustom ? 'Custom' : 'Built-in';
        return `${mode} theme (${type})`;
    }

    getThemeColor(theme: AmwThemeConfig | null, colorType: 'primary' | 'accent'): string {
        if (!theme || !theme.colors) {
            return colorType === 'primary' ? '#6750A4' : '#625B71';
        }
        return theme.colors[colorType] || (colorType === 'primary' ? '#6750A4' : '#625B71');
    }

    getColorStyle(theme: AmwThemeConfig | null, colorType: 'primary' | 'accent'): { [key: string]: string } {
        const color = this.getThemeColor(theme, colorType);
        return { 'background-color': color };
    }
}
