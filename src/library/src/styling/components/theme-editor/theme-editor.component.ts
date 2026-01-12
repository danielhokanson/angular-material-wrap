import { Component, OnInit, signal, computed } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { ThemeService, ThemeConfig, ThemeColors } from '../../services/theme.service';
import { AmwDividerComponent } from '../../../components/components/amw-divider/amw-divider.component';
import { AmwButtonComponent } from '../../../controls/components/amw-button/amw-button.component';
import { AmwTooltipDirective } from '../../../directives/amw-tooltip/amw-tooltip.directive';
import { AmwInputComponent } from '../../../controls/components/amw-input/amw-input.component';
import { AmwColorPickerComponent } from '../../../controls/components/amw-color-picker/amw-color-picker.component';

@Component({
    selector: 'amw-theme-editor',
    standalone: true,
    imports: [
    FormsModule,
    AmwButtonComponent,
    AmwInputComponent,
    AmwColorPickerComponent,
    MatIconModule,
    MatCardModule,
    MatSlideToggleModule,
    AmwDividerComponent,
    AmwTooltipDirective,
    MatSnackBarModule
],
    templateUrl: './theme-editor.component.html',
    styleUrl: './theme-editor.component.scss',
    host: { 'data-amw-id': 'amw-theme-editor' }
})
export class ThemeEditorComponent implements OnInit {
    // Form data
    themeName = '';
    themeId = '';
    isDarkMode = false;
    colors: ThemeColors = {
        primary: '#6750A4',
        accent: '#625B71',
        warn: '#BA1A1A',
        background: '#FFFBFE',
        surface: '#FFFBFE',
        foreground: '#1C1B1F'
    };

    // State
    isEditing = signal(false);
    editingThemeId = signal<string | null>(null);
    customThemes = signal<ThemeConfig[]>([]);

    // Computed properties
    get isValid(): boolean {
        const name = this.themeName.trim();
        const id = this.themeId.trim();
        return name.length > 0 && id.length > 0 && this.isValidColorFormat();
    }

    get previewTheme(): ThemeConfig {
        return {
            id: this.themeId || 'preview',
            name: this.themeName || 'Preview Theme',
            displayName: this.themeName || 'Preview Theme',
            colors: this.colors,
            isDark: this.isDarkMode,
            isCustom: true
        };
    }

    constructor(
        private themeService: ThemeService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.loadCustomThemes();
        this.generateThemeId();
    }

    private loadCustomThemes(): void {
        this.customThemes.set(this.themeService.getCustomThemes());
    }

    private generateThemeId(): void {
        const name = this.themeName.trim();
        if (name) {
            const id = name.toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();
            this.themeId = id;
        }
    }

    onThemeNameChange(): void {
        this.generateThemeId();
    }

    onColorChange(colorKey: keyof ThemeColors, value: string): void {
        if (this.isValidColor(value)) {
            this.colors = {
                ...this.colors,
                [colorKey]: value
            };
        }
    }

    onDarkModeToggle(): void {
        this.isDarkMode = !this.isDarkMode;

        // Update background and surface colors based on dark mode
        if (this.isDarkMode) {
            // Switching to dark mode
            this.colors = {
                ...this.colors,
                background: '#303030',
                surface: '#424242',
                foreground: '#FFFFFF'
            };
        } else {
            // Switching to light mode
            this.colors = {
                ...this.colors,
                background: '#FAFAFA',
                surface: '#FFFFFF',
                foreground: '#212121'
            };
        }
    }

    onLoadTheme(theme: ThemeConfig): void {
        this.isEditing.set(true);
        this.editingThemeId.set(theme.id);
        this.themeName = theme.displayName;
        this.themeId = theme.id;
        this.isDarkMode = theme.isDark;
        this.colors = { ...theme.colors };
    }

    onNewTheme(): void {
        this.resetForm();
        this.isEditing.set(false);
        this.editingThemeId.set(null);
    }

    onSaveTheme(): void {
        if (!this.isValid) {
            this.snackBar.open('Please fill in all required fields with valid values', 'Close', {
                duration: 3000
            });
            return;
        }

        const theme: Omit<ThemeConfig, 'isCustom'> = {
            id: this.themeId.trim(),
            name: this.themeId.trim(),
            displayName: this.themeName.trim(),
            colors: this.colors,
            isDark: this.isDarkMode
        };

        let success = false;
        if (this.isEditing()) {
            success = this.themeService.updateCustomTheme(this.editingThemeId()!, theme);
        } else {
            success = this.themeService.createCustomTheme(theme);
        }

        if (success) {
            this.snackBar.open(
                `Theme ${this.isEditing() ? 'updated' : 'created'} successfully!`,
                'Close',
                { duration: 3000 }
            );
            this.loadCustomThemes();
            this.resetForm();
        } else {
            this.snackBar.open(
                `Failed to ${this.isEditing() ? 'update' : 'create'} theme. Theme ID may already exist.`,
                'Close',
                { duration: 3000 }
            );
        }
    }

    onDeleteTheme(theme: ThemeConfig): void {
        if (confirm(`Are you sure you want to delete the theme "${theme.displayName}"?`)) {
            const success = this.themeService.deleteCustomTheme(theme.id);
            if (success) {
                this.snackBar.open('Theme deleted successfully!', 'Close', { duration: 3000 });
                this.loadCustomThemes();
                if (this.editingThemeId() === theme.id) {
                    this.resetForm();
                }
            } else {
                this.snackBar.open('Failed to delete theme', 'Close', { duration: 3000 });
            }
        }
    }

    onPreviewTheme(): void {
        if (this.isValid) {
            this.themeService.setTheme(this.previewTheme.id);
        }
    }

    private resetForm(): void {
        this.themeName = '';
        this.themeId = '';
        this.isDarkMode = false;
        this.colors = {
            primary: '#6750A4',
            accent: '#625B71',
            warn: '#BA1A1A',
            background: '#FFFBFE',
            surface: '#FFFBFE',
            foreground: '#1C1B1F'
        };
    }

    private isValidColor(color: string): boolean {
        return /^#[0-9A-F]{6}$/i.test(color);
    }

    private isValidColorFormat(): boolean {
        return Object.values(this.colors).every(color => this.isValidColor(color as string));
    }

    getColorContrast(color: string): string {
        // Simple contrast calculation - return 'dark' or 'light' text color
        const hex = color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 128 ? '#000000' : '#FFFFFF';
    }
}