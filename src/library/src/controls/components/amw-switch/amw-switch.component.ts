import { Component, Input, Output, EventEmitter, ViewEncapsulation, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { BaseComponent } from '../base/base.component';
import { SwitchConfig, SwitchColor, SwitchSize } from './interfaces';

@Component({
    selector: 'amw-switch',
    standalone: true,
    imports: [CommonModule, MatSlideToggleModule, FormsModule],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-switch.component.html',
    styleUrl: './amw-switch.component.scss',
    providers: [
        {
            provide: forwardRef(() => BaseComponent),
            useExisting: forwardRef(() => AmwSwitchComponent)
        }
    ]
})
export class AmwSwitchComponent extends BaseComponent {
    @Input() checked = false;
    @Input() size: SwitchSize = 'medium';
    @Input() color: SwitchColor = 'primary';
    @Input() labelPosition: 'before' | 'after' = 'after';
    @Input() indeterminate = false;

    @Output() checkedChange = new EventEmitter<boolean>();
    @Output() switchChange = new EventEmitter<boolean>();

    onCheckedChange(checked: boolean): void {
        this.checked = checked;
        this.value = checked;
        this.checkedChange.emit(checked);
        this.switchChange.emit(checked);
    }

    getConfig(): SwitchConfig {
        return {
            checked: this.checked,
            disabled: this.disabled,
            size: this.size,
            color: this.color,
            labelPosition: this.labelPosition,
            indeterminate: this.indeterminate,
            required: this.required
        };
    }
}
