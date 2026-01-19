import { Component, ViewEncapsulation, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmwDividerComponent } from '../../../../lib/amw-divider/amw-divider.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

@Component({
    selector: 'amw-demo-divider-validation',
    standalone: true,
    imports: [CommonModule, AmwDividerComponent, AmwButtonComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './divider-validation.component.html',
    styleUrl: './divider-validation.component.scss'
})
export class DividerValidationComponent {
    isVertical = signal(false);
    isInset = signal(false);
    showDivider = signal(true);

    toggleVertical(): void {
        this.isVertical.update(v => !v);
    }

    toggleInset(): void {
        this.isInset.update(v => !v);
    }

    toggleVisibility(): void {
        this.showDivider.update(v => !v);
    }
}
