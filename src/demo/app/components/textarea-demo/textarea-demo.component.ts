import { Component, ViewEncapsulation } from '@angular/core';

import { AmwTextareaComponent } from '../../../../library/src/controls/components/amw-textarea/amw-textarea.component';
// Note: TextareaSize type doesn't exist, using string for now
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { AmwDemoDocComponent } from '../../shared/components/demo-doc/demo-doc.component';

@Component({
    selector: 'amw-demo-textarea',
    standalone: true,
    imports: [
    AmwTextareaComponent,
    AmwDemoDocComponent
],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './textarea-demo.component.html',
    styleUrl: './textarea-demo.component.scss'
})
export class TextareaDemoComponent {
    // Textarea variations for display
    textareaVariations = {
        appearances: [
            { appearance: 'outline' as MatFormFieldAppearance, label: 'Outline' },
            { appearance: 'fill' as MatFormFieldAppearance, label: 'Fill' },
            { appearance: 'outline' as MatFormFieldAppearance, label: 'Outline' }
        ],
        sizes: [
            { size: 'small', label: 'Small' },
            { size: 'medium', label: 'Medium' },
            { size: 'large', label: 'Large' }
        ],
        states: [
            { disabled: false, required: false, label: 'Normal' },
            { disabled: true, required: false, label: 'Disabled' },
            { disabled: false, required: true, label: 'Required' }
        ]
    };
}