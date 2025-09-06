import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

import { ThemeService, ThemeConfig } from '../../services/theme.service';

@Component({
    selector: 'amw-theme-picker',
    standalone: true,
    imports: [
        CommonModule,
        MatSelectModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatDividerModule,
        MatCardModule
    ],
    templateUrl: './theme-picker.component.html',
    styleUrl: './theme-picker.component.scss'
})
export class ThemePickerComponent implements OnInit {
    currentTheme = signal<ThemeConfig | null>(null);
    allThemes = signal<ThemeConfig[]>([]);
    builtInThemes = signal<ThemeConfig[]>([]);
    customThemes = signal<ThemeConfig[]>([]);

    // Computed properties
    isDarkMode = computed(() => this.currentTheme()?.isDark ?? false);
    hasCustomThemes = computed(() => this.customThemes().length > 0);

    constructor(private themeService: ThemeService) { }

    ngOnInit(): void {
        this.loadThemes();
        this.subscribeToThemeChanges();
    }

    private loadThemes(): void {
        this.allThemes.set(this.themeService.getAllThemes());
        this.builtInThemes.set(this.themeService.getBuiltInThemes());
        this.customThemes.set(this.themeService.getCustomThemes());
        this.currentTheme.set(this.themeService.getCurrentTheme());
    }

    private subscribeToThemeChanges(): void {
        this.themeService.getCurrentTheme$().subscribe(theme => {
            this.currentTheme.set(theme);
        });
    }

    onThemeChange(themeId: string): void {
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
