import { Directive, Input, Output, EventEmitter, Component } from '@angular/core';

export interface AmwSort {
    active: string;
    direction: 'asc' | 'desc' | '';
}

@Directive({
    selector: '[amwSort]',
    standalone: true
})
export class AmwSortDirective {
    @Input('amwSortActive') active?: string;
    @Input('amwSortDirection') direction: 'asc' | 'desc' | '' = '';
    @Input('amwSortDisabled') disabled = false;

    @Output() amwSortChange = new EventEmitter<AmwSort>();

    emitChange() {
        this.amwSortChange.emit({ active: this.active || '', direction: this.direction });
    }
}

@Component({
    selector: '[amw-sort-header]',
    template: `<ng-content></ng-content>`,
    standalone: true
})
export class AmwSortHeaderComponent {
    @Input() id = '';
    @Input() disableClear = false;
    @Input() arrowPosition: 'before' | 'after' = 'after';
}

export const AMW_SORT_COMPONENTS = [
    AmwSortDirective,
    AmwSortHeaderComponent
] as const;
