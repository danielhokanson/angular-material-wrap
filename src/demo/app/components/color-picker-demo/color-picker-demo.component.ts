import { Component, ViewEncapsulation } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { AmwColorPickerComponent } from '../../../../library/src/controls/components/amw-color-picker/amw-color-picker.component';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'amw-demo-color-picker',
    standalone: true,
    imports: [
    MatIconModule,
    AmwColorPickerComponent,
    MatCardModule
],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './color-picker-demo.component.html',
    styleUrl: './color-picker-demo.component.scss'
})
export class ColorPickerDemoComponent {
    colorPickerVariations = [
        {
            title: 'Basic Color Picker',
            description: 'Default color picker with palette',
            colorPicker: { value: '#FF5722' }
        },
        {
            title: 'Custom Color Mode',
            description: 'Color picker with custom color input',
            colorPicker: { value: '#2196F3', mode: 'custom' as 'palette' | 'custom' | 'text' | 'all' }
        },
        {
            title: 'Text Input Mode',
            description: 'Color picker with text input only',
            colorPicker: { value: '#4CAF50', mode: 'text' as 'palette' | 'custom' | 'text' | 'all' }
        },
        {
            title: 'All Modes',
            description: 'Color picker with all input methods',
            colorPicker: { value: '#9C27B0', mode: 'all' as 'palette' | 'custom' | 'text' | 'all' }
        },
        {
            title: 'Small Size',
            description: 'Compact color picker variant',
            colorPicker: { value: '#FF9800', size: 'small' as 'small' | 'medium' | 'large' }
        },
        {
            title: 'Large Size',
            description: 'Larger color picker variant',
            colorPicker: { value: '#607D8B', size: 'large' as 'small' | 'medium' | 'large' }
        },
        {
            title: 'Without Preview',
            description: 'Color picker without color preview',
            colorPicker: { value: '#795548', showPreview: false }
        },
        {
            title: 'Without Input',
            description: 'Color picker without text input',
            colorPicker: { value: '#3F51B5', showInput: false }
        },
        {
            title: 'Disabled State',
            description: 'Non-interactive color picker',
            colorPicker: { value: '#E91E63', disabled: true }
        },
        {
            title: 'Required Field',
            description: 'Color picker with required validation',
            colorPicker: { value: '', required: true, placeholder: 'Select color' }
        }
    ];

    onColorChange(color: string, index: number) {
        console.log(`Color picker ${index} changed to:`, color);
    }
}

