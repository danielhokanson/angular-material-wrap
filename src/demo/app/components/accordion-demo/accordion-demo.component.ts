import { Component } from '@angular/core';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'amw-demo-accordion',
    standalone: true,
    imports: [
        MatExpansionModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule
    ],
    templateUrl: './accordion-demo.component.html',
    styleUrl: './accordion-demo.component.scss'
})
export class AccordionDemoComponent {
}
