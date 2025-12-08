import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';


@Component({
    selector: 'amw-tooltip',
    standalone: true,
    imports: [],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './amw-tooltip.component.html',
    styleUrls: ['./amw-tooltip.component.scss']
})
export class AmwTooltipComponent {
    @Input() content: string = '';
    @Input() allowHtml: boolean = false;
    @Input() maxWidth: string = '200px';
    @Input() class: string = '';
}
