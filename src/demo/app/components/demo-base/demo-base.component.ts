import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DemoProperty } from './interfaces/demo-property.interface';

// Re-export for convenience
export type { DemoProperty } from './interfaces/demo-property.interface';

import { AmwCardComponent } from '../../../../library/src/components/components/amw-card/amw-card.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwSelectComponent } from '../../../../library/src/controls/components/amw-select/amw-select.component';
import { AmwSwitchComponent } from '../../../../library/src/controls/components/amw-switch/amw-switch.component';
import { AmwSliderComponent } from '../../../../library/src/controls/components/amw-slider/amw-slider.component';
@Component({
    selector: 'amw-demo-base',
    standalone: true,
    imports: [CommonModule,
    ReactiveFormsModule,
    AmwCardComponent,
    AmwButtonComponent,
    AmwInputComponent,
    AmwSelectComponent,
    AmwSwitchComponent,
    AmwSliderComponent],
    templateUrl: './demo-base.component.html',
    styleUrl: './demo-base.component.scss'
})
export class DemoBaseComponent {
    title = input<string>('');
    description = input<string>('');
    componentSelector = input<string>('');
    properties = input<DemoProperty[]>([]);
    showFormToggle = input<boolean>(true);
    showCodeExample = input<boolean>(true);

    propertyChange = output<{ property: string; value: any }>();
    formModeChange = output<boolean>();

    isFormMode = false;
    formGroup = new FormGroup({});
    propertyValues: { [key: string]: any } = {};

    ngOnInit(): void {
        this.initializeProperties();
        this.setupFormGroup();
    }

    private initializeProperties(): void {
        this.properties().forEach(prop => {
            this.propertyValues[prop.name] = prop.value;
        });
    }

    private setupFormGroup(): void {
        const controls: { [key: string]: FormControl } = {};
        this.properties().forEach(prop => {
            controls[prop.name] = new FormControl(prop.value);
        });
        this.formGroup = new FormGroup(controls);
    }

    onPropertyChange(propertyName: string, value: any): void {
        this.propertyValues[propertyName] = value;
        this.propertyChange.emit({ property: propertyName, value });
    }

    onFormModeToggle(): void {
        this.isFormMode = !this.isFormMode;
        this.formModeChange.emit(this.isFormMode);
    }

    resetProperties(): void {
        this.properties().forEach(prop => {
            this.propertyValues[prop.name] = prop.value;
            this.formGroup.get(prop.name)?.setValue(prop.value);
        });
    }

    getPropertyValue(propertyName: string): any {
        return this.propertyValues[propertyName];
    }

    getFormControl(propertyName: string): FormControl {
        return this.formGroup.get(propertyName) as FormControl;
    }

    generateCodeExample(): string {
        const properties = this.properties()
            .map(prop => `  ${prop.name}="${this.getPropertyValue(prop.name)}"`)
            .join('\n');

        return `<amw-button\n${properties}>\n  Button Text\n</amw-button>`;
    }

    onInputChange(propertyName: string, event: Event): void {
        const target = event.target as HTMLInputElement;
        this.onPropertyChange(propertyName, target.value);
    }

    onNumberInputChange(propertyName: string, event: Event): void {
        const target = event.target as HTMLInputElement;
        this.onPropertyChange(propertyName, +target.value);
    }

    onSliderChange(propertyName: string, event: any): void {
        this.onPropertyChange(propertyName, event.value);
    }

    onSelectChange(propertyName: string, event: any): void {
        this.onPropertyChange(propertyName, event.value);
    }
}
