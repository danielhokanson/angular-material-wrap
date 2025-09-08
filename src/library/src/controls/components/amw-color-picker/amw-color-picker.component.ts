import { Component, Input, Output, EventEmitter, ViewEncapsulation, forwardRef, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { BaseComponent } from '../base/base.component';
import { ColorPickerConfig, ColorPickerMode } from './interfaces';
import { AmwSize } from '../../../shared/types/amw-size.type';

@Component({
    selector: 'amw-color-picker',
    standalone: true,
    imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatChipsModule],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-color-picker.component.html',
    styleUrl: './amw-color-picker.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AmwColorPickerComponent),
            multi: true
        }
    ]
})
export class AmwColorPickerComponent extends BaseComponent implements OnChanges {
    @Input() override set value(val: string) {
        this._value = val;
        this.selectedColor = val || '';
        this.updateColorFromValue();
    }
    override get value(): string {
        return this._value || '';
    }
    @Input() config: ColorPickerConfig = {};
    @Input() mode: ColorPickerMode = 'palette';
    @Input() size: AmwSize = 'medium';
    @Input() showInput = true;
    @Input() showPreview = true;
    @Input() showPalette = true;
    @Input() showCustom = true;
    @Input() override disabled = false;
    @Input() override required = false;

    @Output() colorChange = new EventEmitter<string>();
    @Output() colorPickerChange = new EventEmitter<string>();

    selectedColor = '';
    isOpen = false;
    customColor = '#000000';
    paletteColors = [
        '#000000', '#434343', '#666666', '#999999', '#B7B7B7', '#CCCCCC', '#D9D9D9', '#EFEFEF', '#F3F3F3', '#FFFFFF',
        '#980000', '#FF0000', '#FF9900', '#FFFF00', '#00FF00', '#00FFFF', '#4A86E8', '#0000FF', '#9900FF', '#FF00FF',
        '#E6B8AF', '#F4CCCC', '#FCE5CD', '#FFF2CC', '#D5E8D4', '#D5E8D4', '#DAE8FC', '#D5E8D4', '#E1D5E7', '#F8CECC',
        '#DD7E6B', '#EA9999', '#F9CB9C', '#FFE599', '#B6D7A8', '#A2C4C9', '#A4C2F4', '#9FC5E8', '#B4A7D6', '#F4CCCC',
        '#CC4125', '#E06666', '#F6B26B', '#FFD966', '#93C47D', '#76A5AF', '#6D9EEB', '#6FA8DC', '#8E7CC3', '#F4CCCC'
    ];

    ngOnInit() {
        this.selectedColor = this.value || '';
        this.updateColorFromValue();
    }

    ngOnChanges() {
        if (this.value !== this.selectedColor) {
            this.selectedColor = this.value || '';
            this.updateColorFromValue();
        }
    }

    override writeValue(value: any): void {
        this._value = value;
        this.selectedColor = value || '';
        this.updateColorFromValue();
    }

    onColorChange() {
        this.value = this.selectedColor;
        this.colorChange.emit(this.selectedColor);
        this.colorPickerChange.emit(this.selectedColor);
    }

    toggleColorPicker() {
        if (!this.disabled) {
            this.isOpen = !this.isOpen;
        }
    }

    selectColor(color: string) {
        this.selectedColor = color;
        this.onColorChange();
        this.isOpen = false;
    }

    onCustomColorChange() {
        this.selectedColor = this.customColor;
        this.onColorChange();
    }

    onInputChange(event: Event) {
        const target = event.target as HTMLInputElement;
        this.selectedColor = target.value;
        this.onColorChange();
    }

    private updateColorFromValue() {
        if (this.selectedColor && this.isValidColor(this.selectedColor)) {
            this.customColor = this.selectedColor;
        }
    }

    private isValidColor(color: string): boolean {
        const s = new Option().style;
        s.color = color;
        return s.color !== '';
    }

    override get isDisabled(): boolean {
        return this.disabled || this.isRequired;
    }

    get displayColor(): string {
        return this.selectedColor || '#000000';
    }
}
