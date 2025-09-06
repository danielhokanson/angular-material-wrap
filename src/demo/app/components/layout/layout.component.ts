import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DemoNavigationComponent } from '../demo-navigation/demo-navigation.component';

@Component({
    selector: 'amw-demo-layout',
    standalone: true,
    imports: [CommonModule, RouterOutlet, DemoNavigationComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss'
})
export class LayoutComponent {
}
