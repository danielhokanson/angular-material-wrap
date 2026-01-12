import { Component, input, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';


@Component({
    selector: 'amw-tooltip',
    standalone: true,
    imports: [],
    encapsulation: ViewEncapsulation.None,
    host: { 'data-amw-id': 'amw-tooltip' },
    templateUrl: './amw-tooltip.component.html',
    styleUrls: ['./amw-tooltip.component.scss']
})
export class AmwTooltipComponent {
    content = input<string>('');
    allowHtml = input<boolean>(false);
    maxWidth = input<string>('200px');
    class = input<string>('');

    constructor(public cdr: ChangeDetectorRef) { }
}
