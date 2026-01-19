import { Component, ViewEncapsulation, signal } from '@angular/core';
import { AmwChipComponent } from '../../../../library/src/controls/components/amw-chip/amw-chip.component';
import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';

@Component({
    selector: 'amw-demo-chip',
    standalone: true,
    imports: [AmwChipComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './chip-demo.component.html',
    styleUrl: './chip-demo.component.scss'
})
export class ChipDemoComponent {
    selected1 = signal(false);
    selected2 = signal(true);
    selected3 = signal(false);

    tags = signal(['Angular', 'TypeScript', 'Material']);

    constructor(private notification: AmwNotificationService) {}

    onRemove(tag: string): void {
        this.tags.update(tags => tags.filter(t => t !== tag));
        this.notification.info('Chip Removed', `"${tag}" removed`, { duration: 2000 });
    }

    onSelectionChange(label: string, selected: boolean): void {
        this.notification.info('Selection Changed', `"${label}" is now ${selected ? 'selected' : 'unselected'}`, { duration: 2000 });
    }
}
