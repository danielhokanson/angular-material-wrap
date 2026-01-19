import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'amw-chip',
    template: `<span class="amw-chip" [ngStyle]="_style()"><ng-content></ng-content></span>`,
    styles: [`
		.amw-chip { display: inline-flex; align-items: center; padding: 0.25rem 0.5rem; border-radius: 16px; font-size: 0.875rem; }
	`],
    standalone: true,
    imports: [CommonModule]
})
export class AmwChipComponent {
    @Input() label?: string;
    @Input() icon?: string;
    @Input() color?: 'primary' | 'accent' | 'warn';

    @Input() customStyle?: { [key: string]: string };
    @Input() backgroundColor?: string;
    @Input() textColor?: string;

    _style() {
        return {
            ...this.customStyle,
            'background-color': this.backgroundColor || undefined,
            'color': this.textColor || undefined
        };
    }
}

export const AMW_CHIP_COMPONENTS = [
    AmwChipComponent
] as const;
