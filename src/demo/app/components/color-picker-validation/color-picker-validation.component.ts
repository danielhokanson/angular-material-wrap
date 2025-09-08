import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { AmwColorPickerComponent } from '../../../../library/src/controls/components/amw-color-picker/amw-color-picker.component';

@Component({
    selector: 'amw-demo-color-picker-validation',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatCardModule,
        AmwColorPickerComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './color-picker-validation.component.html',
    styleUrl: './color-picker-validation.component.scss'
})
export class ColorPickerValidationComponent implements OnInit {
    colorPickerForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private snackBar: MatSnackBar
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
            this.snackBar.open('Form submitted successfully!', 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
            console.log('Form values:', this.colorPickerForm.value);
        } else {
            this.snackBar.open('Please fill in all required fields correctly', 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
        }
    }

    onReset() {
        this.colorPickerForm.reset();
    }
}


