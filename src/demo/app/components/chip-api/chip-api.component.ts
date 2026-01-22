import { Component, ViewEncapsulation } from '@angular/core';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';
import { AmwApiDocComponent } from '../../shared/components/api-doc/api-doc.component';

@Component({
    selector: 'amw-demo-chip-api',
    standalone: true,
    imports: [AmwApiDocComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './chip-api.component.html',
    styleUrl: './chip-api.component.scss'
})
export class ChipApiComponent extends BaseApiComponent {
    apiDocumentation: ApiDocumentation = {
        inputs: [
            { name: 'label', type: 'string', default: 'required', description: 'Chip text content' },
            { name: 'removable', type: 'boolean', default: 'false', description: 'Shows remove button when true' },
            { name: 'selectable', type: 'boolean', default: 'false', description: 'Chip can be selected when true' },
            { name: 'selected', type: 'boolean', default: 'false', description: 'Selection state (two-way bindable)' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the chip is disabled' },
            { name: 'color', type: 'AmwChipColor', default: 'undefined', description: 'Chip color', options: ['primary', 'accent', 'warn'] },
            { name: 'icon', type: 'string', default: 'undefined', description: 'Leading Material icon name' },
            { name: 'avatar', type: 'string', default: 'undefined', description: 'Avatar image URL' },
            { name: 'chipClass', type: 'string', default: 'undefined', description: 'Custom CSS class' }
        ],
        outputs: [
            { name: 'removed', type: 'EventEmitter<void>', description: 'Emitted when remove button is clicked' },
            { name: 'selectionChange', type: 'EventEmitter<boolean>', description: 'Emitted when selection state changes' }
        ]
    };

    constructor() {
        super();
    }
}
