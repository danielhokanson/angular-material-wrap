import { Component, Input, Output, EventEmitter, ViewEncapsulation, forwardRef } from '@angular/core';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseComponent } from '../base/base.component';
import { SwitchConfig } from './interfaces';
import { AmwSize } from '../../../shared/types/amw-size.type';
import { AmwColor } from '../../../shared/types/amw-color.type';

@Component({
    selector: 'amw-switch',
    standalone: true,
    imports: [MatSlideToggleModule, FormsModule],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-switch.component.html',
    styleUrl: './amw-switch.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AmwSwitchComponent),
            multi: true
        }
    ]
})
export class AmwSwitchComponent extends BaseComponent implements ControlValueAccessor {
    @Input() checked = false;
    @Input() size: AmwSize = 'medium';
    @Input() color: AmwColor = 'primary';
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

