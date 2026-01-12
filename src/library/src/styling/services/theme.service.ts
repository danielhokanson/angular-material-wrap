import { Injectable, signal, computed } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ThemeColors } from '../interfaces/theme-colors.interface';
import { ThemeConfig } from '../interfaces/theme-config.interface';

// Re-export interfaces for convenience
export type { ThemeColors, ThemeConfig };

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private readonly THEME_STORAGE_KEY = 'amw-theme';

    // Available built-in themes - Material Design 3 only
    private readonly builtInThemes: ThemeConfig[] = [
        {
            id: 'm3-dynamic-light',
            name: 'm3-dynamic-light',
            displayName: 'Material 3 Dynamic Light',
            colors: {
                primary: '#6750A4',
                accent: '#625B71',
                warn: '#BA1A1A',
                background: '#FFFBFE',
                surface: '#FFFBFE',
                foreground: '#1C1B1F'
            },
            isDark: false,
            isCustom: false
        },
        {
            id: 'm3-dynamic-dark',
            name: 'm3-dynamic-dark',
            displayName: 'Material 3 Dynamic Dark',
            colors: {
                primary: '#D0BCFF',
                accent: '#CCC2DC',
                warn: '#FFB4AB',
                background: '#1C1B1F',
                surface: '#1C1B1F',
                foreground: '#E6E1E5'
            },
            isDark: true,
            isCustom: false
        },
        {
            id: 'm3-blue-light',
            name: 'm3-blue-light',
            displayName: 'Material 3 Blue Light',
            colors: {
                primary: '#1976D2',
                accent: '#424242',
                warn: '#D32F2F',
                background: '#FAFAFA',
                surface: '#FFFFFF',
                foreground: '#212121'
            },
            isDark: false,
            isCustom: false
        },
        {
            id: 'm3-blue-dark',
            name: 'm3-blue-dark',
            displayName: 'Material 3 Blue Dark',
            colors: {
                primary: '#90CAF9',
                accent: '#B0BEC5',
                warn: '#EF5350',
                background: '#121212',
                surface: '#1E1E1E',
                foreground: '#FFFFFF'
            },
            isDark: true,
            isCustom: false
        },
        {
            id: 'm3-green-light',
            name: 'm3-green-light',
            displayName: 'Material 3 Green Light',
            colors: {
                primary: '#388E3C',
                accent: '#424242',
                warn: '#D32F2F',
                background: '#FAFAFA',
                surface: '#FFFFFF',
                foreground: '#212121'
            },
            isDark: false,
            isCustom: false
        },
        {
            id: 'm3-green-dark',
            name: 'm3-green-dark',
            displayName: 'Material 3 Green Dark',
            colors: {
                primary: '#A5D6A7',
                accent: '#B0BEC5',
                warn: '#EF5350',
                background: '#121212',
                surface: '#1E1E1E',
                foreground: '#FFFFFF'
            },
            isDark: true,
            isCustom: false
        }
    ];

    private customThemesSubject = new BehaviorSubject<ThemeConfig[]>([]);
    private currentThemeSubject = new BehaviorSubject<ThemeConfig>(this.builtInThemes[0]); // M3 Dynamic Light

    // Signals for reactive state
    public currentTheme = signal<ThemeConfig>(this.builtInThemes[0]);
    public customThemes = signal<ThemeConfig[]>([]);
    public allThemes = computed(() => [...this.builtInThemes, ...this.customThemes()]);

    constructor() {
        // Load custom themes FIRST so they're available when loading stored theme
        this.loadCustomThemesFromStorage();
        this.loadThemeFromStorage();
        // Ensure M3 theme is applied on initialization
        this.loadMaterialTheme(this.currentTheme().name);
    }

    /**
     * Get all available themes (built-in + custom)
     */
    getAllThemes(): ThemeConfig[] {
        return this.allThemes();
    }

    /**
     * Get only built-in themes
     */
    getBuiltInThemes(): ThemeConfig[] {
        return [...this.builtInThemes];
    }

    /**
     * Get only custom themes
     */
    getCustomThemes(): ThemeConfig[] {
        return this.customThemes();
    }

    /**
     * Get current theme
     */
    getCurrentTheme(): ThemeConfig {
        return this.currentTheme();
    }

    /**
     * Get current theme as observable
     */
    getCurrentTheme$(): Observable<ThemeConfig> {
        return this.currentThemeSubject.asObservable();
    }

    /**
     * Switch to a theme by ID
     */
    setTheme(themeId: string): boolean {
        const theme = this.allThemes().find(t => t.id === themeId);
        if (!theme) {
            console.warn(`Theme with ID '${themeId}' not found`);
            return false;
        }

        this.currentTheme.set(theme);
        this.currentThemeSubject.next(theme);
        this.applyTheme(theme);
        this.saveThemeToStorage(theme);
        return true;
    }

    /**
     * Create a new custom theme
     */
    createCustomTheme(theme: Omit<ThemeConfig, 'isCustom'>): boolean {
        const newTheme: ThemeConfig = {
            ...theme,
            isCustom: true
        };

        // Check if theme ID already exists
        if (this.allThemes().some(t => t.id === newTheme.id)) {
            console.warn(`Theme with ID '${newTheme.id}' already exists`);
            return false;
        }

        const updatedCustomThemes = [...this.customThemes(), newTheme];
        this.customThemes.set(updatedCustomThemes);
        this.customThemesSubject.next(updatedCustomThemes);
        this.saveCustomThemesToStorage(updatedCustomThemes);
        return true;
    }

    /**
     * Update an existing custom theme
     */
    updateCustomTheme(themeId: string, updates: Partial<ThemeConfig>): boolean {
        const customThemes = this.customThemes();
        const themeIndex = customThemes.findIndex(t => t.id === themeId);

        if (themeIndex === -1) {
            console.warn(`Custom theme with ID '${themeId}' not found`);
            return false;
        }

        const updatedTheme = { ...customThemes[themeIndex], ...updates };
        const updatedCustomThemes = [...customThemes];
        updatedCustomThemes[themeIndex] = updatedTheme;

        this.customThemes.set(updatedCustomThemes);
        this.customThemesSubject.next(updatedCustomThemes);
        this.saveCustomThemesToStorage(updatedCustomThemes);

        // If this is the current theme, update it
        if (this.currentTheme().id === themeId) {
            this.currentTheme.set(updatedTheme);
            this.currentThemeSubject.next(updatedTheme);
            this.applyTheme(updatedTheme);
        }

        return true;
    }

    /**
     * Delete a custom theme
     */
    deleteCustomTheme(themeId: string): boolean {
        const customThemes = this.customThemes();
        const themeIndex = customThemes.findIndex(t => t.id === themeId);

        if (themeIndex === -1) {
            console.warn(`Custom theme with ID '${themeId}' not found`);
            return false;
        }

        const updatedCustomThemes = customThemes.filter(t => t.id !== themeId);
        this.customThemes.set(updatedCustomThemes);
        this.customThemesSubject.next(updatedCustomThemes);
        this.saveCustomThemesToStorage(updatedCustomThemes);

        // If this was the current theme, switch to default
        if (this.currentTheme().id === themeId) {
            this.setTheme(this.builtInThemes[0].id);
        }

        return true;
    }

    /**
     * Apply theme to the document
     */
    private applyTheme(theme: ThemeConfig): void {
        const root = document.documentElement;

        // Remove existing theme classes
        root.classList.remove('mat-theme-loaded');
        root.classList.remove('mat-app-background');

        // Add theme-specific classes
        root.classList.add('mat-theme-loaded');
        root.classList.add('mat-app-background');

        // Set CSS custom properties for colors
        root.style.setProperty('--mat-primary', theme.colors.primary);
        root.style.setProperty('--mat-accent', theme.colors.accent);
        root.style.setProperty('--mat-warn', theme.colors.warn);
        root.style.setProperty('--mat-background', theme.colors.background);
        root.style.setProperty('--mat-surface', theme.colors.surface);
        root.style.setProperty('--mat-foreground', theme.colors.foreground);

        // Apply Material theme with full theme config
        this.applyM3Theme(theme);
    }

    /**
     * Load Material theme CSS (for initialization)
     */
    private loadMaterialTheme(themeName: string): void {
        const theme = this.allThemes().find(t => t.name === themeName) || this.currentTheme();
        this.applyM3Theme(theme);
    }

    /**
     * Calculate luminance of a color for contrast calculations
     */
    private getLuminance(hex: string): number {
        const rgb = this.hexToRgb(hex);
        const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    /**
     * Convert hex to RGB
     */
    private hexToRgb(hex: string): { r: number; g: number; b: number } {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    }

    /**
     * Get contrast text color (white or black) for a given background
     */
    private getContrastColor(bgColor: string): string {
        const luminance = this.getLuminance(bgColor);
        return luminance > 0.179 ? '#000000' : '#FFFFFF';
    }

    /**
     * Lighten a color by a percentage
     */
    private lightenColor(hex: string, percent: number): string {
        const rgb = this.hexToRgb(hex);
        const r = Math.min(255, Math.round(rgb.r + (255 - rgb.r) * percent));
        const g = Math.min(255, Math.round(rgb.g + (255 - rgb.g) * percent));
        const b = Math.min(255, Math.round(rgb.b + (255 - rgb.b) * percent));
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase();
    }

    /**
     * Darken a color by a percentage
     */
    private darkenColor(hex: string, percent: number): string {
        const rgb = this.hexToRgb(hex);
        const r = Math.max(0, Math.round(rgb.r * (1 - percent)));
        const g = Math.max(0, Math.round(rgb.g * (1 - percent)));
        const b = Math.max(0, Math.round(rgb.b * (1 - percent)));
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase();
    }

    /**
     * Generate surface container variants based on background color
     */
    private generateSurfaceContainers(surface: string, isDark: boolean): {
        container: string;
        containerHigh: string;
        containerHighest: string;
        containerLow: string;
        containerLowest: string;
        dim: string;
        bright: string;
    } {
        if (isDark) {
            return {
                container: this.lightenColor(surface, 0.05),
                containerHigh: this.lightenColor(surface, 0.08),
                containerHighest: this.lightenColor(surface, 0.11),
                containerLow: this.lightenColor(surface, 0.02),
                containerLowest: this.darkenColor(surface, 0.04),
                dim: this.darkenColor(surface, 0.08),
                bright: this.lightenColor(surface, 0.15)
            };
        } else {
            return {
                container: this.darkenColor(surface, 0.02),
                containerHigh: this.darkenColor(surface, 0.04),
                containerHighest: this.darkenColor(surface, 0.06),
                containerLow: this.lightenColor(surface, 0.02),
                containerLowest: '#FFFFFF',
                dim: this.darkenColor(surface, 0.08),
                bright: '#FFFBFE'
            };
        }
    }

    private applyM3Theme(theme: ThemeConfig): void {
        const root = document.documentElement;
        const isDark = theme.isDark;

        // Calculate contrast colors based on theme colors
        const onPrimary = this.getContrastColor(theme.colors.primary);
        const onSecondary = this.getContrastColor(theme.colors.accent);
        const onError = this.getContrastColor(theme.colors.warn);

        // Generate container colors
        const primaryContainer = isDark
            ? this.darkenColor(theme.colors.primary, 0.3)
            : this.lightenColor(theme.colors.primary, 0.8);
        const onPrimaryContainer = this.getContrastColor(primaryContainer);

        const secondaryContainer = isDark
            ? this.darkenColor(theme.colors.accent, 0.3)
            : this.lightenColor(theme.colors.accent, 0.8);
        const onSecondaryContainer = this.getContrastColor(secondaryContainer);

        const errorContainer = isDark
            ? this.darkenColor(theme.colors.warn, 0.3)
            : this.lightenColor(theme.colors.warn, 0.8);
        const onErrorContainer = this.getContrastColor(errorContainer);

        // Generate surface variants
        const surfaceVariant = isDark
            ? this.lightenColor(theme.colors.surface, 0.12)
            : this.darkenColor(theme.colors.surface, 0.08);
        const onSurfaceVariant = isDark
            ? this.lightenColor(theme.colors.foreground, 0.2)
            : this.darkenColor(theme.colors.foreground, 0.3);

        // Generate outline colors
        const outline = isDark
            ? this.lightenColor(theme.colors.surface, 0.35)
            : this.darkenColor(theme.colors.surface, 0.45);
        const outlineVariant = isDark
            ? this.lightenColor(theme.colors.surface, 0.18)
            : this.darkenColor(theme.colors.surface, 0.2);

        // Generate surface containers
        const containers = this.generateSurfaceContainers(theme.colors.surface, isDark);

        // Set complete M3 color token system
        root.style.setProperty('--mdc-theme-primary', theme.colors.primary);
        root.style.setProperty('--mdc-theme-on-primary', onPrimary);
        root.style.setProperty('--mdc-theme-primary-container', primaryContainer);
        root.style.setProperty('--mdc-theme-on-primary-container', onPrimaryContainer);

        root.style.setProperty('--mdc-theme-secondary', theme.colors.accent);
        root.style.setProperty('--mdc-theme-on-secondary', onSecondary);
        root.style.setProperty('--mdc-theme-secondary-container', secondaryContainer);
        root.style.setProperty('--mdc-theme-on-secondary-container', onSecondaryContainer);

        // Tertiary based on accent
        const tertiary = isDark
            ? this.lightenColor(theme.colors.accent, 0.3)
            : this.darkenColor(theme.colors.accent, 0.1);
        const tertiaryContainer = isDark
            ? this.darkenColor(tertiary, 0.3)
            : this.lightenColor(tertiary, 0.8);
        root.style.setProperty('--mdc-theme-tertiary', tertiary);
        root.style.setProperty('--mdc-theme-on-tertiary', this.getContrastColor(tertiary));
        root.style.setProperty('--mdc-theme-tertiary-container', tertiaryContainer);
        root.style.setProperty('--mdc-theme-on-tertiary-container', this.getContrastColor(tertiaryContainer));

        root.style.setProperty('--mdc-theme-error', theme.colors.warn);
        root.style.setProperty('--mdc-theme-on-error', onError);
        root.style.setProperty('--mdc-theme-error-container', errorContainer);
        root.style.setProperty('--mdc-theme-on-error-container', onErrorContainer);

        root.style.setProperty('--mdc-theme-surface', theme.colors.surface);
        root.style.setProperty('--mdc-theme-on-surface', theme.colors.foreground);
        root.style.setProperty('--mdc-theme-surface-variant', surfaceVariant);
        root.style.setProperty('--mdc-theme-on-surface-variant', onSurfaceVariant);

        root.style.setProperty('--mdc-theme-outline', outline);
        root.style.setProperty('--mdc-theme-outline-variant', outlineVariant);

        root.style.setProperty('--mdc-theme-background', theme.colors.background);
        root.style.setProperty('--mdc-theme-on-background', theme.colors.foreground);

        // Surface container variants
        root.style.setProperty('--mdc-theme-surface-container', containers.container);
        root.style.setProperty('--mdc-theme-surface-container-high', containers.containerHigh);
        root.style.setProperty('--mdc-theme-surface-container-highest', containers.containerHighest);
        root.style.setProperty('--mdc-theme-surface-container-low', containers.containerLow);
        root.style.setProperty('--mdc-theme-surface-container-lowest', containers.containerLowest);
        root.style.setProperty('--mdc-theme-surface-dim', containers.dim);
        root.style.setProperty('--mdc-theme-surface-bright', containers.bright);

        // State layer colors
        root.style.setProperty('--mdc-theme-surface-tint', theme.colors.primary);
        root.style.setProperty('--mdc-theme-inverse-surface', isDark ? theme.colors.foreground : this.darkenColor(theme.colors.surface, 0.8));
        root.style.setProperty('--mdc-theme-inverse-on-surface', isDark ? theme.colors.surface : this.lightenColor(theme.colors.foreground, 0.9));
        root.style.setProperty('--mdc-theme-inverse-primary', isDark
            ? this.darkenColor(theme.colors.primary, 0.3)
            : this.lightenColor(theme.colors.primary, 0.5));

        // Scrim and shadow
        root.style.setProperty('--mdc-theme-scrim', '#000000');
        root.style.setProperty('--mdc-theme-shadow', '#000000');

        // Set Angular Material 19 --mat-sys-* system variables for M3 components
        root.style.setProperty('--mat-sys-primary', theme.colors.primary);
        root.style.setProperty('--mat-sys-on-primary', onPrimary);
        root.style.setProperty('--mat-sys-primary-container', primaryContainer);
        root.style.setProperty('--mat-sys-on-primary-container', onPrimaryContainer);
        root.style.setProperty('--mat-sys-secondary', theme.colors.accent);
        root.style.setProperty('--mat-sys-on-secondary', onSecondary);
        root.style.setProperty('--mat-sys-secondary-container', secondaryContainer);
        root.style.setProperty('--mat-sys-on-secondary-container', onSecondaryContainer);
        root.style.setProperty('--mat-sys-tertiary', tertiary);
        root.style.setProperty('--mat-sys-on-tertiary', this.getContrastColor(tertiary));
        root.style.setProperty('--mat-sys-tertiary-container', tertiaryContainer);
        root.style.setProperty('--mat-sys-on-tertiary-container', this.getContrastColor(tertiaryContainer));
        root.style.setProperty('--mat-sys-error', theme.colors.warn);
        root.style.setProperty('--mat-sys-on-error', onError);
        root.style.setProperty('--mat-sys-error-container', errorContainer);
        root.style.setProperty('--mat-sys-on-error-container', onErrorContainer);
        root.style.setProperty('--mat-sys-surface', theme.colors.surface);
        root.style.setProperty('--mat-sys-on-surface', theme.colors.foreground);
        root.style.setProperty('--mat-sys-surface-variant', surfaceVariant);
        root.style.setProperty('--mat-sys-on-surface-variant', onSurfaceVariant);
        root.style.setProperty('--mat-sys-outline', outline);
        root.style.setProperty('--mat-sys-outline-variant', outlineVariant);
        root.style.setProperty('--mat-sys-background', theme.colors.background);
        root.style.setProperty('--mat-sys-on-background', theme.colors.foreground);
        root.style.setProperty('--mat-sys-surface-container', containers.container);
        root.style.setProperty('--mat-sys-surface-container-high', containers.containerHigh);
        root.style.setProperty('--mat-sys-surface-container-highest', containers.containerHighest);
        root.style.setProperty('--mat-sys-surface-container-low', containers.containerLow);
        root.style.setProperty('--mat-sys-surface-container-lowest', containers.containerLowest);
        root.style.setProperty('--mat-sys-surface-dim', containers.dim);
        root.style.setProperty('--mat-sys-surface-bright', containers.bright);
        root.style.setProperty('--mat-sys-surface-tint', theme.colors.primary);
        root.style.setProperty('--mat-sys-inverse-surface', isDark ? theme.colors.foreground : this.darkenColor(theme.colors.surface, 0.8));
        root.style.setProperty('--mat-sys-inverse-on-surface', isDark ? theme.colors.surface : this.lightenColor(theme.colors.foreground, 0.9));
        root.style.setProperty('--mat-sys-inverse-primary', isDark
            ? this.darkenColor(theme.colors.primary, 0.3)
            : this.lightenColor(theme.colors.primary, 0.5));
        root.style.setProperty('--mat-sys-scrim', '#000000');
        root.style.setProperty('--mat-sys-shadow', '#000000');

        // Set dark mode class
        if (isDark) {
            root.classList.add('dark-theme');
        } else {
            root.classList.remove('dark-theme');
        }
    }

    /**
     * Save current theme to localStorage
     */
    private saveThemeToStorage(theme: ThemeConfig): void {
        try {
            localStorage.setItem(this.THEME_STORAGE_KEY, JSON.stringify(theme));
        } catch (error) {
            console.warn('Failed to save theme to localStorage:', error);
        }
    }

    /**
     * Load theme from localStorage
     */
    private loadThemeFromStorage(): void {
        try {
            const stored = localStorage.getItem(this.THEME_STORAGE_KEY);
            if (stored) {
                const theme = JSON.parse(stored) as ThemeConfig;
                // Verify theme still exists
                if (this.allThemes().some(t => t.id === theme.id)) {
                    this.setTheme(theme.id);
                }
            }
        } catch (error) {
            console.warn('Failed to load theme from localStorage:', error);
        }
    }

    /**
     * Save custom themes to localStorage
     */
    private saveCustomThemesToStorage(themes: ThemeConfig[]): void {
        try {
            localStorage.setItem('amw-custom-themes', JSON.stringify(themes));
        } catch (error) {
            console.warn('Failed to save custom themes to localStorage:', error);
        }
    }

    /**
     * Load custom themes from localStorage
     */
    private loadCustomThemesFromStorage(): void {
        try {
            const stored = localStorage.getItem('amw-custom-themes');
            if (stored) {
                const themes = JSON.parse(stored) as ThemeConfig[];
                this.customThemes.set(themes);
                this.customThemesSubject.next(themes);
            }
        } catch (error) {
            console.warn('Failed to load custom themes from localStorage:', error);
        }
    }
}
