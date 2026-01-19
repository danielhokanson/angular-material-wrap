import { Component, Input, Output, EventEmitter, Directive } from '@angular/core';

@Component({
    selector: 'amw-list',
    template: `<ng-content></ng-content>`,
    standalone: true
})
export class AmwListComponent {
    @Input() dense = false;
    @Input() disableRipple = false;
}

@Component({
    selector: 'amw-list-item',
    template: `<ng-content></ng-content>`,
    standalone: true
})
export class AmwListItemComponent {
    @Input() disabled = false;
    @Input() disableRipple = false;

    @Output() itemClick = new EventEmitter<void>();
}

@Directive({
    selector: '[amwListItemIcon]',
    standalone: true
})
export class AmwListItemIconDirective { }

@Directive({
    selector: '[amwListItemAvatar]',
    standalone: true
})
export class AmwListItemAvatarDirective { }

@Directive({
    selector: '[amwListItemTitle], amw-list-item-title',
    standalone: true
})
export class AmwListItemTitleDirective { }

@Directive({
    selector: '[amwListItemLine], amw-list-item-line',
    standalone: true
})
export class AmwListItemLineDirective { }

@Directive({
    selector: '[amwListItemMeta]',
    standalone: true
})
export class AmwListItemMetaDirective { }

export const AMW_LIST_COMPONENTS = [
    AmwListComponent,
    AmwListItemComponent,
    AmwListItemIconDirective,
    AmwListItemAvatarDirective,
    AmwListItemTitleDirective,
    AmwListItemLineDirective,
    AmwListItemMetaDirective
] as const;
