import { Component, ViewEncapsulation, signal } from '@angular/core';
import { AmwPaginatorComponent } from '../../../../library/src/components/components/amw-paginator/amw-paginator.component';
import { PageEvent } from '@angular/material/paginator';
import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';

@Component({
    selector: 'amw-demo-paginator',
    standalone: true,
    imports: [AmwPaginatorComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './paginator-demo.component.html',
    styleUrl: './paginator-demo.component.scss'
})
export class PaginatorDemoComponent {
    pageIndex1 = signal(0);
    pageSize1 = signal(10);

    pageIndex2 = signal(0);
    pageSize2 = signal(25);

    Math = Math;

    constructor(private notification: AmwNotificationService) {}

    onPageChange1(event: PageEvent): void {
        this.pageIndex1.set(event.pageIndex);
        this.pageSize1.set(event.pageSize);
        this.notification.info('Page Changed', `Page: ${event.pageIndex + 1}, Size: ${event.pageSize}`, { duration: 2000 });
    }

    onPageChange2(event: PageEvent): void {
        this.pageIndex2.set(event.pageIndex);
        this.pageSize2.set(event.pageSize);
    }
}
