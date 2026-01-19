import { Component, ViewEncapsulation, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmwAccordionComponent, AmwExpansionPanelComponent, AmwExpansionPanelHeaderComponent, AmwPanelTitleDirective, AmwPanelDescriptionDirective } from '../../../../lib/amw-expansion/amw-expansion.module';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';

@Component({
    selector: 'amw-demo-expansion-validation',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, AmwAccordionComponent, AmwExpansionPanelComponent, AmwExpansionPanelHeaderComponent, AmwPanelTitleDirective, AmwPanelDescriptionDirective, AmwButtonComponent, AmwInputComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './expansion-validation.component.html',
    styleUrl: './expansion-validation.component.scss'
})
export class ExpansionValidationComponent {
    personalForm: FormGroup;
    addressForm: FormGroup;
    step1Complete = signal(false);
    step2Complete = signal(false);

    constructor(private fb: FormBuilder) {
        this.personalForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]]
        });

        this.addressForm = this.fb.group({
            street: ['', Validators.required],
            city: ['', Validators.required],
            zip: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]]
        });
    }

    validateStep1(): void {
        if (this.personalForm.valid) {
            this.step1Complete.set(true);
        }
    }

    validateStep2(): void {
        if (this.addressForm.valid) {
            this.step2Complete.set(true);
        }
    }

    resetForms(): void {
        this.personalForm.reset();
        this.addressForm.reset();
        this.step1Complete.set(false);
        this.step2Complete.set(false);
    }

    getStepStatus(complete: boolean, form: FormGroup): string {
        if (complete) return 'Complete';
        if (form.touched && !form.valid) return 'Incomplete';
        return 'Not started';
    }
}
