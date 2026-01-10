import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { AmwColorPickerComponent } from '../../../../library/src/controls/components/amw-color-picker/amw-color-picker.component';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
@Component({
    selector: 'amw-demo-color-picker-validation',
    standalone: true,
    imports: [ReactiveFormsModule,
    AmwInputComponent,
    AmwColorPickerComponent,
    AmwButtonComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './color-picker-validation.component.html',
    styleUrl: './color-picker-validation.component.scss'
})
export class ColorPickerValidationComponent implements OnInit {
    colorPickerForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private notification: AmwNotificationService
    ) {
        this.colorPickerForm = this.fb.group({
            primaryColor: ['', Validators.required],
            secondaryColor: ['', Validators.required],
            accentColor: ['', Validators.required],
            backgroundColor: ['', Validators.required]
        });
    }

    ngOnInit() {
        // Add custom validators
        this.colorPickerForm.get('secondaryColor')?.setValidators([
            Validators.required,
            this.differentColorValidator('primaryColor')
        ]);
    }

    differentColorValidator(primaryColorControl: string) {
        return (control: any) => {
            const primaryColor = this.colorPickerForm?.get(primaryColorControl)?.value;
            const secondaryColor = control.value;

            if (primaryColor && secondaryColor && primaryColor === secondaryColor) {
                return { sameColor: true };
            }

            return null;
        };
    }

    isValidColor(color: string): boolean {
        const s = new Option().style;
        s.color = color;
        return s.color !== '';
    }

    onSubmit() {
        if (this.colorPickerForm.valid) {
            this.notification.success('Success', 'Form submitted successfully!', { duration: 3000 });
            console.log('Form values:', this.colorPickerForm.value);
        } else {
            this.notification.info('Info', 'Please fill in all required fields correctly', { duration: 3000 });
        }
    }

    onReset() {
        this.colorPickerForm.reset();
    }
}

