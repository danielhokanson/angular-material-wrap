import { Directive, Input } from '@angular/core';

@Directive({
    selector: 'amw-dialog-actions, [amw-dialog-actions]',
    standalone: true
})
export class AmwDialogActionsDirective {
    @Input() align: 'start' | 'center' | 'end' = 'start';
}
