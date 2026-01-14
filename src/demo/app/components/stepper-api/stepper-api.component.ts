import { Component, ViewEncapsulation } from '@angular/core';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';
import { AmwTabsComponent, AmwTabComponent } from '../../../../library/src/components/components';

@Component({
    selector: 'amw-demo-stepper-api',
    standalone: true,
    imports: [
    AmwTabsComponent,
    AmwTabComponent
],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './stepper-api.component.html',
    styleUrl: './stepper-api.component.scss'
})
export class StepperApiComponent extends BaseApiComponent {
    apiDocumentation: ApiDocumentation = {
        inputs: [
            {
                name: 'selectedIndex',
                type: 'number',
                default: '0',
                description: 'Index of the currently selected step'
            },
            {
                name: 'linear',
                type: 'boolean',
                default: 'false',
                description: 'Whether the stepper is linear (requires completion of previous steps)',
                options: ['true', 'false']
            },
            {
                name: 'orientation',
                type: 'MatStepperOrientation',
                default: 'horizontal',
                description: 'Orientation of the stepper',
                options: ['horizontal', 'vertical']
            }
        ],
        outputs: [
            {
                name: 'selectionChange', type: 'EventEmitter<StepperSelectionEvent>', description: 'Emitted when the selected step changes'
            }
        ],
        methods: [
            {
                name: 'next()',
                returns: 'void',
                description: 'Goes to the next step'
            },
            {
                name: 'previous()',
                returns: 'void',
                description: 'Goes to the previous step'
            },
            {
                name: 'reset()',
                returns: 'void',
                description: 'Resets the stepper to the first step'
            }
        ]
    };

    constructor() {
        super();
    }
}
