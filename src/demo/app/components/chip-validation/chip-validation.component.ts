import { Component, ViewEncapsulation, signal } from '@angular/core';
import { AmwChipComponent } from '../../../../library/src/controls/components/amw-chip/amw-chip.component';

@Component({
    selector: 'amw-demo-chip-validation',
    standalone: true,
    imports: [AmwChipComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './chip-validation.component.html',
    styleUrl: './chip-validation.component.scss'
})
export class ChipValidationComponent {
    selected = signal(false);
    disabled = signal(false);

    toggleSelected(): void {
        this.selected.update(v => !v);
    }

    toggleDisabled(): void {
        this.disabled.update(v => !v);
    }
}
