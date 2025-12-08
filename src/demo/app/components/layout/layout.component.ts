import { Component, ViewEncapsulation } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { DemoNavigationComponent } from '../demo-navigation/demo-navigation.component';

@Component({
    selector: 'amw-demo-layout',
    standalone: true,
    imports: [RouterOutlet, DemoNavigationComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss'
})
export class LayoutComponent {
}
