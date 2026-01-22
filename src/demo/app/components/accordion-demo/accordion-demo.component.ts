import { Component } from '@angular/core';

import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwIconComponent } from '../../../../library/src/components/components';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwCheckboxComponent } from '../../../../library/src/controls/components/amw-checkbox/amw-checkbox.component';
import { AmwDemoDocComponent } from '../../shared/components/demo-doc/demo-doc.component';

@Component({
    selector: 'amw-demo-accordion',
    standalone: true,
    imports: [
        AmwAccordionComponent,
        AmwAccordionPanelComponent,
        AmwButtonComponent,
        AmwInputComponent,
        AmwCheckboxComponent,
        AmwIconComponent,
        AmwDemoDocComponent
    ],
    templateUrl: './accordion-demo.component.html',
    styleUrl: './accordion-demo.component.scss'
})
export class AccordionDemoComponent {
}
