import { Component, input, output, signal, ViewEncapsulation, OnChanges, computed, effect, ViewChild, ElementRef } from '@angular/core';

import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { OverlayModule, CdkConnectedOverlay, ConnectedPosition } from '@angular/cdk/overlay';
import { AmwButtonComponent } from '../amw-button/amw-button.component';
import { BaseComponent } from '../base/base.component';
import { ColorPickerConfig, ColorPickerMode } from './interfaces';

/**
 * AMW Color Picker Component
 * Inherits from BaseComponent: disabled, required, label, placeholder, errorMessage, hasError,
 * name, id, tabIndex, size, color, ariaLabel, ariaLabelledby, ariaDescribedby, ariaRequired,
 * ariaInvalid, hint, readonly, value, change, focus, blur
 */
@Component({
    selector: 'amw-color-picker',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, AmwButtonComponent, MatChipsModule, OverlayModule],
    encapsulation: ViewEncapsulation.None,
    host: { 'data-amw-id': 'amw-color-picker' },
    templateUrl: './amw-color-picker.component.html',
    styleUrl: './amw-color-picker.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: AmwColorPickerComponent,
            multi: true
        }
    ]
})
export class AmwColorPickerComponent extends BaseComponent<string> implements OnChanges {
    // Color picker-specific properties (inherited from BaseComponent: disabled, required, label,
    // placeholder, errorMessage, hasError, name, id, tabIndex, size, color, ariaLabel,
    // ariaLabelledby, ariaDescribedby, ariaRequired, ariaInvalid, hint, readonly, value, change, focus, blur)

    config = input<ColorPickerConfig>({});
    mode = input<ColorPickerMode>('palette');
    showInput = input<boolean>(true);
    showPreview = input<boolean>(true);
    showPalette = input<boolean>(true);
    showCustom = input<boolean>(true);

    colorChange = output<string>();
    colorPickerChange = output<string>();

    selectedColor = signal<string>('');
    isOpen = signal<boolean>(false);
    customColor = signal<string>('#000000');

    // HSV state for the gradient picker
    hue = signal<number>(0);         // 0-360
    saturation = signal<number>(100); // 0-100
    brightness = signal<number>(100); // 0-100 (value in HSV)

    // Overlay positions for the dropdown
    overlayPositions: ConnectedPosition[] = [
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
        { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
        { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 4 },
        { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -4 }
    ];

    paletteColors = signal<string[]>([
        '#000000', '#434343', '#666666', '#999999', '#B7B7B7', '#CCCCCC', '#D9D9D9', '#EFEFEF', '#F3F3F3', '#FFFFFF',
        '#980000', '#FF0000', '#FF9900', '#FFFF00', '#00FF00', '#00FFFF', '#4A86E8', '#0000FF', '#9900FF', '#FF00FF',
        '#E6B8AF', '#F4CCCC', '#FCE5CD', '#FFF2CC', '#D5E8D4', '#D5E8D4', '#DAE8FC', '#D5E8D4', '#E1D5E7', '#F8CECC',
        '#DD7E6B', '#EA9999', '#F9CB9C', '#FFE599', '#B6D7A8', '#A2C4C9', '#A4C2F4', '#9FC5E8', '#B4A7D6', '#F4CCCC',
        '#CC4125', '#E06666', '#F6B26B', '#FFD966', '#93C47D', '#76A5AF', '#6D9EEB', '#6FA8DC', '#8E7CC3', '#F4CCCC'
    ]);

    constructor() {
        super();
        // Sync value model with selectedColor
        effect(() => {
            const val = this.value();
            if (val !== this.selectedColor()) {
                this.selectedColor.set(val || '');
                this.updateColorFromValue();
            }
        });
    }

    ngOnInit() {
        this.selectedColor.set(this.value() || '');
        this.updateColorFromValue();
    }

    ngOnChanges() {
        if (this.value() !== this.selectedColor()) {
            this.selectedColor.set(this.value() || '');
            this.updateColorFromValue();
        }
    }

    override writeValue(val: any): void {
        this.value.set(val || '');
        this.selectedColor.set(val || '');
        this.updateColorFromValue();
    }

    onColorChange() {
        this.value.set(this.selectedColor());
        this.colorChange.emit(this.selectedColor());
        this.colorPickerChange.emit(this.selectedColor());
        this._onChange(this.selectedColor());
        this._onTouched();
    }

    toggleColorPicker() {
        if (!this.disabled()) {
            this.isOpen.set(!this.isOpen());
        }
    }

    selectColor(color: string) {
        this.selectedColor.set(color);
        this.onColorChange();
        this.isOpen.set(false);
    }

    onCustomColorChange(value: string) {
        this.customColor.set(value);
        this.selectedColor.set(value);
        // Update HSV values if valid hex color
        if (this.isValidColor(value)) {
            this.updateHsvFromColor();
        }
        this.onColorChange();
    }

    onInputChange(event: Event) {
        const target = event.target as HTMLInputElement;
        this.selectedColor.set(target.value);
        this.onColorChange();
    }

    private updateColorFromValue() {
        if (this.selectedColor() && this.isValidColor(this.selectedColor())) {
            this.customColor.set(this.selectedColor());
            this.updateHsvFromColor();
        }
    }

    private isValidColor(color: string): boolean {
        const s = new Option().style;
        s.color = color;
        return s.color !== '';
    }

    displayColor = computed(() => this.selectedColor() || '#000000');

    // Computed color from HSV values for the gradient picker
    hsvColor = computed(() => this.hsvToHex(this.hue(), this.saturation(), this.brightness()));

    // Gradient style computed from hue
    gradientBackground = computed(() => {
        const hueColor = this.hsvToHex(this.hue(), 100, 100);
        return `linear-gradient(to right, #fff, ${hueColor})`;
    });

    @ViewChild('gradientArea') gradientArea!: ElementRef<HTMLDivElement>;
    @ViewChild('hueSlider') hueSlider!: ElementRef<HTMLDivElement>;

    private isDraggingGradient = false;
    private isDraggingHue = false;

    // HSV to RGB conversion
    private hsvToRgb(h: number, s: number, v: number): { r: number; g: number; b: number } {
        h = h / 360;
        s = s / 100;
        v = v / 100;

        let r = 0, g = 0, b = 0;

        const i = Math.floor(h * 6);
        const f = h * 6 - i;
        const p = v * (1 - s);
        const q = v * (1 - f * s);
        const t = v * (1 - (1 - f) * s);

        switch (i % 6) {
            case 0: r = v; g = t; b = p; break;
            case 1: r = q; g = v; b = p; break;
            case 2: r = p; g = v; b = t; break;
            case 3: r = p; g = q; b = v; break;
            case 4: r = t; g = p; b = v; break;
            case 5: r = v; g = p; b = q; break;
        }

        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }

    // HSV to Hex conversion
    private hsvToHex(h: number, s: number, v: number): string {
        const { r, g, b } = this.hsvToRgb(h, s, v);
        return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
    }

    // Hex to RGB conversion
    private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    // RGB to HSV conversion
    private rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const d = max - min;

        let h = 0;
        const s = max === 0 ? 0 : d / max;
        const v = max;

        if (max !== min) {
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            v: Math.round(v * 100)
        };
    }

    // Hex to HSV conversion
    private hexToHsv(hex: string): { h: number; s: number; v: number } | null {
        const rgb = this.hexToRgb(hex);
        if (!rgb) return null;
        return this.rgbToHsv(rgb.r, rgb.g, rgb.b);
    }

    // Update HSV from current color
    private updateHsvFromColor(): void {
        const color = this.selectedColor();
        if (color && this.isValidColor(color)) {
            const hsv = this.hexToHsv(color);
            if (hsv) {
                this.hue.set(hsv.h);
                this.saturation.set(hsv.s);
                this.brightness.set(hsv.v);
            }
        }
    }

    // Handle gradient area click/drag
    onGradientMouseDown(event: MouseEvent): void {
        if (this.disabled()) return;
        this.isDraggingGradient = true;
        this.updateFromGradient(event);
        document.addEventListener('mousemove', this.onGradientMouseMove);
        document.addEventListener('mouseup', this.onGradientMouseUp);
    }

    private onGradientMouseMove = (event: MouseEvent): void => {
        if (this.isDraggingGradient) {
            this.updateFromGradient(event);
        }
    };

    private onGradientMouseUp = (): void => {
        this.isDraggingGradient = false;
        document.removeEventListener('mousemove', this.onGradientMouseMove);
        document.removeEventListener('mouseup', this.onGradientMouseUp);
    };

    private updateFromGradient(event: MouseEvent): void {
        if (!this.gradientArea) return;
        const rect = this.gradientArea.nativeElement.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));

        this.saturation.set(Math.round(x * 100));
        this.brightness.set(Math.round((1 - y) * 100));
        this.applyHsvColor();
    }

    // Handle hue slider click/drag
    onHueMouseDown(event: MouseEvent): void {
        if (this.disabled()) return;
        this.isDraggingHue = true;
        this.updateFromHue(event);
        document.addEventListener('mousemove', this.onHueMouseMove);
        document.addEventListener('mouseup', this.onHueMouseUp);
    }

    private onHueMouseMove = (event: MouseEvent): void => {
        if (this.isDraggingHue) {
            this.updateFromHue(event);
        }
    };

    private onHueMouseUp = (): void => {
        this.isDraggingHue = false;
        document.removeEventListener('mousemove', this.onHueMouseMove);
        document.removeEventListener('mouseup', this.onHueMouseUp);
    };

    private updateFromHue(event: MouseEvent): void {
        if (!this.hueSlider) return;
        const rect = this.hueSlider.nativeElement.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
        this.hue.set(Math.round(x * 360));
        this.applyHsvColor();
    }

    // Apply the current HSV color as the selected color
    private applyHsvColor(): void {
        const hex = this.hsvToHex(this.hue(), this.saturation(), this.brightness());
        this.customColor.set(hex);
        this.selectedColor.set(hex);
        this.onColorChange();
    }

    // Gradient picker cursor position computed
    gradientCursorX = computed(() => `${this.saturation()}%`);
    gradientCursorY = computed(() => `${100 - this.brightness()}%`);
    hueCursorX = computed(() => `${(this.hue() / 360) * 100}%`);
}
