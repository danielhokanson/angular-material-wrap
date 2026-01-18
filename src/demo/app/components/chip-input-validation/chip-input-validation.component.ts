import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { AmwChipInputComponent, ChipInputOption } from '../../../../library/src/controls/components/amw-chip-input';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

@Component({
    selector: 'amw-demo-chip-input-validation',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        JsonPipe,
        AmwChipInputComponent,
        AmwButtonComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './chip-input-validation.component.html',
    styleUrl: './chip-input-validation.component.scss'
})
export class ChipInputValidationComponent {
    validationForm: FormGroup;

    suggestions: ChipInputOption[] = [
        { value: 'skill1', label: 'JavaScript' },
        { value: 'skill2', label: 'TypeScript' },
        { value: 'skill3', label: 'Angular' },
        { value: 'skill4', label: 'React' },
        { value: 'skill5', label: 'Node.js' },
        { value: 'skill6', label: 'Python' },
        { value: 'skill7', label: 'Java' },
        { value: 'skill8', label: 'SQL' }
    ];

    constructor(private fb: FormBuilder) {
        this.validationForm = this.fb.group({
            requiredSkills: [[], Validators.required],
            optionalSkills: [[]]
        });
    }

    onSubmit(): void {
        if (this.validationForm.valid) {
            console.log('Form submitted:', this.validationForm.value);
            alert('Form submitted successfully!');
        } else {
            this.validationForm.markAllAsTouched();
        }
    }

    getFieldError(fieldName: string): string {
        const field = this.validationForm.get(fieldName);
        if (field?.errors && field.touched) {
            if (field.errors['required']) {
                return 'Please select at least one skill';
            }
        }
        return '';
    }

    hasError(fieldName: string): boolean {
        const field = this.validationForm.get(fieldName);
        return !!(field?.errors && field.touched);
    }
}
