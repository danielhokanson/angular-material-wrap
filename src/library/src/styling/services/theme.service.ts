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
        this.loadThemeFromStorage();
        this.loadCustomThemesFromStorage();
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

        // Apply Material theme
        this.loadMaterialTheme(theme.name);
    }

    /**
     * Load Material theme CSS
     */
    private loadMaterialTheme(themeName: string): void {
        // For M3 themes, we use CSS custom properties instead of prebuilt themes
        // This allows for dynamic theming with our custom color palettes
        this.applyM3Theme(themeName);
    }

    private applyM3Theme(themeName: string): void {
        // Apply M3 theme using CSS custom properties
        const theme = this.builtInThemes.find(t => t.name === themeName) || this.builtInThemes[0];

        // Set complete M3 color token system
        document.documentElement.style.setProperty('--mdc-theme-primary', theme.colors.primary);
        document.documentElement.style.setProperty('--mdc-theme-on-primary', theme.isDark ? '#381E72' : '#FFFFFF');
        document.documentElement.style.setProperty('--mdc-theme-primary-container', theme.isDark ? '#4F378B' : '#EADDFF');
        document.documentElement.style.setProperty('--mdc-theme-on-primary-container', theme.isDark ? '#EADDFF' : '#21005D');

        document.documentElement.style.setProperty('--mdc-theme-secondary', theme.colors.accent);
        document.documentElement.style.setProperty('--mdc-theme-on-secondary', theme.isDark ? '#332D41' : '#FFFFFF');
        document.documentElement.style.setProperty('--mdc-theme-secondary-container', theme.isDark ? '#4A4458' : '#E8DEF8');
        document.documentElement.style.setProperty('--mdc-theme-on-secondary-container', theme.isDark ? '#E8DEF8' : '#1D192B');

        document.documentElement.style.setProperty('--mdc-theme-tertiary', theme.isDark ? '#EFB8C8' : '#7D5260');
        document.documentElement.style.setProperty('--mdc-theme-on-tertiary', theme.isDark ? '#492532' : '#FFFFFF');
        document.documentElement.style.setProperty('--mdc-theme-tertiary-container', theme.isDark ? '#633B48' : '#FFD8E4');
        document.documentElement.style.setProperty('--mdc-theme-on-tertiary-container', theme.isDark ? '#FFD8E4' : '#31111D');

        document.documentElement.style.setProperty('--mdc-theme-error', theme.colors.warn);
        document.documentElement.style.setProperty('--mdc-theme-on-error', theme.isDark ? '#690005' : '#FFFFFF');
        document.documentElement.style.setProperty('--mdc-theme-error-container', theme.isDark ? '#93000A' : '#FFDAD6');
        document.documentElement.style.setProperty('--mdc-theme-on-error-container', theme.isDark ? '#FFDAD6' : '#410002');

        document.documentElement.style.setProperty('--mdc-theme-surface', theme.colors.surface);
        document.documentElement.style.setProperty('--mdc-theme-on-surface', theme.colors.foreground);
        document.documentElement.style.setProperty('--mdc-theme-surface-variant', theme.isDark ? '#49454F' : '#E7E0EC');
        document.documentElement.style.setProperty('--mdc-theme-on-surface-variant', theme.isDark ? '#CAC4D0' : '#49454F');

        document.documentElement.style.setProperty('--mdc-theme-outline', theme.isDark ? '#938F99' : '#79747E');
        document.documentElement.style.setProperty('--mdc-theme-outline-variant', theme.isDark ? '#49454F' : '#CAC4D0');

        document.documentElement.style.setProperty('--mdc-theme-background', theme.colors.background);
        document.documentElement.style.setProperty('--mdc-theme-on-background', theme.colors.foreground);

        // Surface container variants
        document.documentElement.style.setProperty('--mdc-theme-surface-container', theme.isDark ? '#211F26' : '#F3EDF7');
        document.documentElement.style.setProperty('--mdc-theme-surface-container-high', theme.isDark ? '#2B2930' : '#ECE6F0');
        document.documentElement.style.setProperty('--mdc-theme-surface-container-highest', theme.isDark ? '#36343B' : '#E6E0E9');
        document.documentElement.style.setProperty('--mdc-theme-surface-container-low', theme.isDark ? '#1F1D24' : '#F7F2FA');
        document.documentElement.style.setProperty('--mdc-theme-surface-container-lowest', theme.isDark ? '#161218' : '#FFFFFF');

        document.documentElement.style.setProperty('--mdc-theme-surface-dim', theme.isDark ? '#141218' : '#DDD8DD');
        document.documentElement.style.setProperty('--mdc-theme-surface-bright', theme.isDark ? '#3C383E' : '#FFFBFE');

        // State layer colors
        document.documentElement.style.setProperty('--mdc-theme-surface-tint', theme.colors.primary);
        document.documentElement.style.setProperty('--mdc-theme-inverse-surface', theme.isDark ? '#E6E1E5' : '#313033');
        document.documentElement.style.setProperty('--mdc-theme-inverse-on-surface', theme.isDark ? '#313033' : '#F4EFF4');
        document.documentElement.style.setProperty('--mdc-theme-inverse-primary', theme.isDark ? '#6750A4' : '#D0BCFF');

        // Scrim and shadow
        document.documentElement.style.setProperty('--mdc-theme-scrim', '#000000');
        document.documentElement.style.setProperty('--mdc-theme-shadow', '#000000');

        // Set dark mode - ensure it's applied to the document element
        if (theme.isDark) {
            document.documentElement.classList.add('dark-theme');
        } else {
            document.documentElement.classList.remove('dark-theme');
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
