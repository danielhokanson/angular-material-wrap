import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwCheckboxComponent } from '../../../../library/src/controls/components/amw-checkbox/amw-checkbox.component';
@Component({
    selector: 'amw-demo-accordion',
    standalone: true,
    imports: [MatIconModule,
    MatExpansionModule,
    AmwButtonComponent,
    AmwInputComponent,
    AmwCheckboxComponent],
    templateUrl: './accordion-demo.component.html',
    styleUrl: './accordion-demo.component.scss'
})
export class AccordionDemoComponent {
}
