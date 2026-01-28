import { Component, ViewEncapsulation, signal } from '@angular/core';
import { AmwListComponent } from '../../../../library/src/components/components/amw-list/amw-list.component';
import { AmwListItemComponent } from '../../../../library/src/components/components/amw-list/amw-list-item.component';
import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { AmwIconComponent } from '../../../../library/src/components/components/amw-icon/amw-icon.component';
import { AmwDemoDocComponent } from '../../shared/components/demo-doc/demo-doc.component';

@Component({
    selector: 'amw-demo-list',
    standalone: true,
    imports: [AmwListComponent, AmwListItemComponent, AmwIconComponent, AmwDemoDocComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './list-demo.component.html',
    styleUrl: './list-demo.component.scss'
})
export class ListDemoComponent {
    selectedItem = signal<string | null>(null);

    items = [
        { id: '1', title: 'Inbox', icon: 'inbox', badge: 12 },
        { id: '2', title: 'Starred', icon: 'star', badge: 0 },
        { id: '3', title: 'Send email', icon: 'send', badge: 0 },
        { id: '4', title: 'Drafts', icon: 'drafts', badge: 3 }
    ];

    contacts = [
        { name: 'Alice Johnson', email: 'alice@example.com', avatar: 'https://i.pravatar.cc/40?img=1' },
        { name: 'Bob Smith', email: 'bob@example.com', avatar: 'https://i.pravatar.cc/40?img=2' },
        { name: 'Carol Williams', email: 'carol@example.com', avatar: 'https://i.pravatar.cc/40?img=3' }
    ];

    constructor(private notification: AmwNotificationService) {}

    onItemClick(item: string): void {
        this.selectedItem.set(item);
        this.notification.info('Item Clicked', `Selected: ${item}`, { duration: 2000 });
    }
}
