import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmwDividerComponent } from '../../../../lib/amw-divider/amw-divider.component';
import { AmwListComponent, AmwListItemComponent, AmwListItemIconDirective } from '../../../../lib/amw-list/amw-list.module';
import { MatIconModule } from '@angular/material/icon';
import { AmwDemoDocComponent } from '../../shared/components/demo-doc/demo-doc.component';

@Component({
    selector: 'amw-demo-divider',
    standalone: true,
    imports: [CommonModule, AmwDividerComponent, AmwListComponent, AmwListItemComponent, AmwListItemIconDirective, MatIconModule, AmwDemoDocComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './divider-demo.component.html',
    styleUrl: './divider-demo.component.scss'
})
export class DividerDemoComponent {
    listItems = [
        { icon: 'inbox', text: 'Inbox' },
        { icon: 'send', text: 'Sent' },
        { icon: 'drafts', text: 'Drafts' }
    ];
}
