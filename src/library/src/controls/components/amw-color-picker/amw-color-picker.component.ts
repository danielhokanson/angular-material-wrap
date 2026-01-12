import { Component, input, output, signal, ViewEncapsulation, OnChanges, computed, effect } from '@angular/core';

import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
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
    imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, AmwButtonComponent, MatChipsModule],
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
        }
    }

    private isValidColor(color: string): boolean {
        const s = new Option().style;
        s.color = color;
        return s.color !== '';
    }

    displayColor = computed(() => this.selectedColor() || '#000000');
}
