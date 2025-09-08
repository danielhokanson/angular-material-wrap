export interface ColorPickerConfig {
    appearance?: 'fill' | 'outline';
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    showInput?: boolean;
    showPreview?: boolean;
    showPalette?: boolean;
    showCustom?: boolean;
    paletteColors?: string[];
    mode?: 'palette' | 'custom' | 'text' | 'all';
}


