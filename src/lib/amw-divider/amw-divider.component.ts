import { Component, Input } from '@angular/core';

@Component({
    selector: 'amw-divider',
    template: `<hr [class.vertical]="vertical" [class.inset]="inset" />`,
    styles: [`
		hr { border: none; border-top: 1px solid rgba(0,0,0,0.12); margin: 1rem 0; }
		hr.vertical { height: 100%; width: 1px; border-top: none; border-left: 1px solid rgba(0,0,0,0.12); margin: 0 0.5rem; }
		hr.inset { margin-left: 72px; }
	`],
    standalone: true
})
export class AmwDividerComponent {
    @Input() vertical = false;
    @Input() inset = false;
}

export const AMW_DIVIDER_COMPONENTS = [
    AmwDividerComponent
] as const;
