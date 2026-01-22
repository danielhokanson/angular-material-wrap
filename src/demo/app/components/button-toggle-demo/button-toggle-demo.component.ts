import { Component, ViewEncapsulation, signal } from '@angular/core';
import { AmwButtonToggleGroupComponent } from '../../../../library/src/controls/components/amw-button-toggle/amw-button-toggle-group.component';
import { AmwButtonToggleComponent } from '../../../../library/src/controls/components/amw-button-toggle/amw-button-toggle.component';
import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { AmwDemoDocComponent } from '../../shared/components/demo-doc/demo-doc.component';

@Component({
    selector: 'amw-demo-button-toggle',
    standalone: true,
    imports: [AmwButtonToggleGroupComponent, AmwButtonToggleComponent, AmwDemoDocComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './button-toggle-demo.component.html',
    styleUrl: './button-toggle-demo.component.scss'
})
export class ButtonToggleDemoComponent {
    alignment = signal<string>('center');
    fontSize = signal<string>('medium');
    textFormats = signal<string[]>(['bold']);
    viewMode = signal<string>('list');

    constructor(private notification: AmwNotificationService) {}

    onAlignmentChange(value: string): void {
        this.notification.info('Alignment Changed', `Alignment: ${value}`, { duration: 2000 });
    }

    onFontSizeChange(value: string): void {
        this.notification.info('Font Size Changed', `Font Size: ${value}`, { duration: 2000 });
    }

    onFormatsChange(value: string[]): void {
        this.notification.info('Formats Changed', `Active: ${value.join(', ') || 'none'}`, { duration: 2000 });
    }

    onViewModeChange(value: string): void {
        this.notification.info('View Mode Changed', `View: ${value}`, { duration: 2000 });
    }
}
