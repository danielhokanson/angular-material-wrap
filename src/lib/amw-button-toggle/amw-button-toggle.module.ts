import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'amw-button-toggle-group',
    template: `<ng-content></ng-content>`,
    standalone: true,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AmwButtonToggleGroupComponent),
        multi: true
    }]
})
export class AmwButtonToggleGroupComponent implements ControlValueAccessor {
    @Input() value: any;
    @Input() multiple = false;
    @Input() disabled = false;
    @Input() vertical = false;
    @Input() appearance: 'legacy' | 'standard' = 'standard';

    @Output() valueChange = new EventEmitter<any>();
    @Output() change = new EventEmitter<any>();

    private _onChange = (_: any) => { };
    private _onTouched = () => { };

    writeValue(obj: any): void { this.value = obj; }
    registerOnChange(fn: any): void { this._onChange = fn; }
    registerOnTouched(fn: any): void { this._onTouched = fn; }
    setDisabledState?(isDisabled: boolean): void { this.disabled = isDisabled; }
}

@Component({
    selector: 'amw-button-toggle',
    template: `<ng-content></ng-content>`,
    standalone: true
})
export class AmwButtonToggleComponent {
    @Input() value: any;
    @Input() disabled = false;
    @Input() disableRipple = false;
    @Input() ariaLabel = '';

    @Output() change = new EventEmitter<any>();
}

export const AMW_BUTTON_TOGGLE_COMPONENTS = [
    AmwButtonToggleGroupComponent,
    AmwButtonToggleComponent
] as const;
