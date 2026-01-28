import { Component, input, output, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectorRef, Inject, Optional, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmwCardComponent } from '../../../components/components/amw-card/amw-card.component';
import { AmwIconComponent } from '../../../components/components/amw-icon/amw-icon.component';
import { AmwNotificationService } from '../../../services/amw-notification/amw-notification.service';
import { Subject, takeUntil, BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

// Import interfaces
import {
    FormPageConfig,
    FormPageSection,
    FormPageField,
    FormPageData,
    FormPageDataSource
} from './interfaces';
import { AmwProgressSpinnerComponent } from '../../../components/components/amw-progress-spinner/amw-progress-spinner.component';
import { AmwButtonComponent } from '../../../controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../controls/components/amw-input/amw-input.component';
import { AmwTextareaComponent } from '../../../controls/components/amw-textarea/amw-textarea.component';
import { AmwDatepickerComponent } from '../../../controls/components/amw-datepicker/amw-datepicker.component';
import { AmwCheckboxComponent } from '../../../controls/components/amw-checkbox/amw-checkbox.component';
import { AmwRadioGroupComponent } from '../../../controls/components/amw-radio-group/amw-radio-group.component';
import { AmwRadioComponent } from '../../../controls/components/amw-radio/amw-radio.component';
import { AmwSelectComponent } from '../../../controls/components/amw-select/amw-select.component';
import { AmwChipsComponent } from '../../../controls/components/amw-chips/amw-chips.component';
import { Chip, ChipEvent } from '../../../controls/components/amw-chips/interfaces';

// Default data source implementation
@Injectable()
export class DefaultFormPageDataSource implements FormPageDataSource {
    constructor() { }

    getData(id?: string): Observable<FormPageData> {
        // Mock data for demo
        const mockItem = { id: id || '1', name: 'Sample Item', description: 'This is a sample item' };
        return new BehaviorSubject({
            item: mockItem,
            sections: [],
            isValid: true,
            errors: {}
        }).pipe(delay(500));
    }

    saveData(data: any): Observable<boolean> {
        return of(true).pipe(delay(500));
    }

    deleteData(id: string): Observable<boolean> {
        return of(true).pipe(delay(500));
    }

    validateData(data: any): Observable<{ isValid: boolean; errors: { [key: string]: string } }> {
        return of({ isValid: true, errors: {} }).pipe(delay(500));
    }
}

@Component({
    selector: 'amw-form-page',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AmwCardComponent,
        AmwButtonComponent,
        AmwInputComponent,
        AmwTextareaComponent,
        AmwDatepickerComponent,
        AmwCheckboxComponent,
        AmwRadioGroupComponent,
        AmwRadioComponent,
        AmwSelectComponent,
        AmwChipsComponent,
        AmwIconComponent,
        AmwProgressSpinnerComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-form-page.component.html',
    styleUrl: './amw-form-page.component.scss',
    providers: [
        { provide: 'FORM_PAGE_DATA_SOURCE', useFactory: () => new DefaultFormPageDataSource() }
    ]
})
export class AmwFormPageComponent implements OnInit, OnDestroy {
    config = input<FormPageConfig>({ sections: [] });
    itemId = input<string | undefined>(undefined);
    dataSource = input<FormPageDataSource | undefined>(undefined);
    autoSave = input<boolean>(false);
    autoSaveInterval = input<number>(30000); // 30 seconds

    formSubmit = output<any>();
    formChange = output<any>();
    formCancel = output<void>();
    formReset = output<void>();
    formPreview = output<any>();
    formPrint = output<any>();
    customAction = output<{ action: string; data: any }>();

    // Current state
    currentConfig: FormPageConfig = { sections: [] };
    currentData: FormPageData = {
        item: {},
        sections: [],
        isValid: true,
        errors: {}
    };

    // Form
    form: FormGroup = new FormGroup({});

    // UI state
    loading = false;
    saving = false;
    error: string | null = null;

    // Subject for component destruction
    private destroy$ = new Subject<void>();

    constructor(
        private cdr: ChangeDetectorRef,
        private notificationService: AmwNotificationService,
        private fb: FormBuilder,
        @Optional() @Inject('FORM_PAGE_DATA_SOURCE') private injectedDataSource?: FormPageDataSource
    ) { }

    ngOnInit(): void {
        this.initializeConfig();
        this.initializeForm();
        if (this.itemId()) {
            this.loadData();
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private initializeConfig(): void {
        this.currentConfig = {
            title: 'Form Page',
            subtitle: 'Create or edit data',
            mode: 'create',
            showSaveButton: true,
            showCancelButton: true,
            showResetButton: true,
            showPreviewButton: false,
            showPrintButton: false,
            autoSave: false,
            customActions: [],
            customClasses: [],
            customStyles: {},
            ...this.config()
        };
    }

    private initializeForm(): void {
        const controls: { [key: string]: any } = {};

        this.currentConfig.sections.forEach(section => {
            section.fields.forEach(field => {
                const validators = [];
                if (field.required) {
                    validators.push(Validators.required);
                }
                if (field.validation) {
                    validators.push(field.validation);
                }

                controls[field.key] = [field.value || '', validators];
            });
        });

        this.form = this.fb.group(controls);
    }

    loadData(): void {
        const itemIdValue = this.itemId();
        if (!itemIdValue) return;

        this.loading = true;
        this.error = null;

        const dataSourceValue = this.dataSource() || this.injectedDataSource;
        if (!dataSourceValue) {
            this.error = 'No data source provided';
            this.loading = false;
            return;
        }

        dataSourceValue.getData(itemIdValue).pipe(
            takeUntil(this.destroy$)
        ).subscribe({
            next: (data) => {
                this.currentData = data;
                this.form.patchValue(data.item);
                this.loading = false;
                this.cdr.detectChanges();
            },
            error: (err) => {
                this.error = err.message || 'Failed to load data';
                this.loading = false;
                this.cdr.detectChanges();
            }
        });
    }

    // Public methods for template
    onSave(): void {
        if (this.form.valid) {
            this.saving = true;
            const formData = this.form.value;

            const dataSourceValue = this.dataSource() || this.injectedDataSource;
            if (dataSourceValue) {
                dataSourceValue.saveData(formData).pipe(
                    takeUntil(this.destroy$)
                ).subscribe({
                    next: (success) => {
                        this.saving = false;
                        if (success) {
                            this.notificationService.success('Saved', 'Data saved successfully', { duration: 3000 });
                            this.formSubmit.emit(formData);
                        } else {
                            this.notificationService.error('Error', 'Failed to save data', { duration: 3000 });
                        }
                    },
                    error: (err) => {
                        this.saving = false;
                        this.notificationService.error('Error', 'Error saving data', { duration: 3000 });
                    }
                });
            } else {
                this.saving = false;
                this.formSubmit.emit(formData);
            }
        }
    }

    onCancel(): void {
        this.formCancel.emit();
    }

    onReset(): void {
        this.form.reset();
        this.formReset.emit();
    }

    onPreview(): void {
        // Emit preview event with current form data
        const formData = this.form.value;
        this.formPreview.emit(formData);
        this.notificationService.info('Preview', 'Preview mode - check console or handle formPreview event', { duration: 3000 });
        console.log('Form Preview Data:', formData);
    }

    onPrint(): void {
        // Emit print event and trigger browser print dialog
        const formData = this.form.value;
        this.formPrint.emit(formData);

        // Trigger browser print dialog after a short delay to allow event handling
        setTimeout(() => {
            window.print();
        }, 100);
    }

    onActionClick(action: string): void {
        // Emit custom action event with action name and form data
        const formData = this.form.value;
        this.customAction.emit({ action, data: formData });
        this.notificationService.info('Action', `Custom action '${action}' triggered`, { duration: 3000 });
    }

    isSectionVisible(section: FormPageSection): boolean {
        return section.visible !== false;
    }

    isFieldVisible(field: FormPageField): boolean {
        return field.visible !== false;
    }

    getFieldError(field: FormPageField): string {
        const control = this.form.get(field.key);
        if (control && control.errors && control.touched) {
            if (control.errors['required']) return `${field.label} is required`;
            if (control.errors['email']) return 'Please enter a valid email';
            if (control.errors['minlength']) return `Minimum length is ${control.errors['minlength'].requiredLength}`;
            if (control.errors['maxlength']) return `Maximum length is ${control.errors['maxlength'].requiredLength}`;
        }
        return '';
    }

    getChipsForField(field: FormPageField): Chip[] {
        const values: string[] = this.form.get(field.key)?.value || [];
        return values.map((v, i) => ({ id: `${field.key}-${i}`, label: v }));
    }

    onChipAdd(field: FormPageField, event: ChipEvent): void {
        const currentValue: string[] = this.form.get(field.key)?.value || [];
        this.form.get(field.key)?.setValue([...currentValue, event.chip.label]);
    }

    onChipRemove(field: FormPageField, event: ChipEvent): void {
        const currentValue: string[] = this.form.get(field.key)?.value || [];
        const index = currentValue.indexOf(event.chip.label);
        if (index >= 0) {
            const updated = [...currentValue];
            updated.splice(index, 1);
            this.form.get(field.key)?.setValue(updated);
        }
    }
}
