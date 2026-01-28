import { Component, OnInit, signal, computed } from '@angular/core';

import { AmwIconComponent } from '../../../components/components/amw-icon/amw-icon.component';
import { AmwCardComponent } from '../../../components/components/amw-card/amw-card.component';
import { AmwSelectComponent } from '../../../controls/components/amw-select/amw-select.component';
import { AmwSelectOption } from '../../../controls/components/amw-select/interfaces/select.interface';

import { AmwThemeService, AmwThemeConfig } from '../../services/amw-theme.service';

@Component({
    selector: 'amw-theme-picker',
    standalone: true,
    imports: [
        AmwIconComponent,
        AmwCardComponent,
        AmwSelectComponent
    ],
    templateUrl: './theme-picker.component.html',
    styleUrl: './theme-picker.component.scss',
    host: { 'data-amw-id': 'amw-theme-picker' }
})
export class AmwThemePickerComponent implements OnInit {
    currentTheme = signal<AmwThemeConfig | null>(null);
    allThemes = signal<AmwThemeConfig[]>([]);
    builtInThemes = signal<AmwThemeConfig[]>([]);
    customThemes = signal<AmwThemeConfig[]>([]);

    // Computed properties
    isDarkMode = computed(() => this.currentTheme()?.isDark ?? false);
    hasCustomThemes = computed(() => this.customThemes().length > 0);

    themeGroups = computed(() => {
        const groups: { [key: string]: AmwSelectOption[] } = {};

        groups['Built-in Themes'] = this.builtInThemes().map(theme => ({
            value: theme.id,
            label: theme.displayName,
            icon: this.getThemeIcon(theme),
            description: this.getThemeDescription(theme)
        }));

        if (this.hasCustomThemes()) {
            groups['Custom Themes'] = this.customThemes().map(theme => ({
                value: theme.id,
                label: theme.displayName,
                icon: this.getThemeIcon(theme),
                description: this.getThemeDescription(theme)
            }));
        }

        return groups;
    });

    constructor(private themeService: AmwThemeService) { }

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
}
