import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectorRef, Inject, Optional, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCheckboxModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule,
        MatDividerModule,
        MatTabsModule,
        MatExpansionModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatProgressSpinnerModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-form-page.component.html',
    styleUrl: './amw-form-page.component.scss',
    providers: [
        { provide: 'FORM_PAGE_DATA_SOURCE', useFactory: () => new DefaultFormPageDataSource() }
    ]
})
export class AmwFormPageComponent implements OnInit, OnDestroy {
    @Input() config: FormPageConfig = { sections: [] };
    @Input() itemId?: string;
    @Input() dataSource?: FormPageDataSource;
    @Input() autoSave = false;
    @Input() autoSaveInterval = 30000; // 30 seconds

    @Output() formSubmit = new EventEmitter<any>();
    @Output() formChange = new EventEmitter<any>();
    @Output() formCancel = new EventEmitter<void>();
    @Output() formReset = new EventEmitter<void>();
    @Output() formPreview = new EventEmitter<any>();
    @Output() formPrint = new EventEmitter<any>();
    @Output() customAction = new EventEmitter<{ action: string; data: any }>();

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
        private snackBar: MatSnackBar,
        private fb: FormBuilder,
        @Optional() @Inject('FORM_PAGE_DATA_SOURCE') private injectedDataSource?: FormPageDataSource
    ) { }

    ngOnInit(): void {
        this.initializeConfig();
        this.initializeForm();
        if (this.itemId) {
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
            ...this.config
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
        if (!this.itemId) return;

        this.loading = true;
        this.error = null;

        const dataSource = this.dataSource || this.injectedDataSource;
        if (!dataSource) {
            this.error = 'No data source provided';
            this.loading = false;
            return;
        }

        dataSource.getData(this.itemId).pipe(
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

            const dataSource = this.dataSource || this.injectedDataSource;
            if (dataSource) {
                dataSource.saveData(formData).pipe(
                    takeUntil(this.destroy$)
                ).subscribe({
                    next: (success) => {
                        this.saving = false;
                        if (success) {
                            this.snackBar.open('Data saved successfully', 'Close', { duration: 3000 });
                            this.formSubmit.emit(formData);
                        } else {
                            this.snackBar.open('Failed to save data', 'Close', { duration: 3000 });
                        }
                    },
                    error: (err) => {
                        this.saving = false;
                        this.snackBar.open('Error saving data', 'Close', { duration: 3000 });
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
        this.snackBar.open('Preview mode - check console or handle formPreview event', 'Close', { duration: 3000 });
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
        this.snackBar.open(`Custom action '${action}' triggered`, 'Close', { duration: 3000 });
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

    addChip(field: FormPageField, event: any): void {
        const value = event.value;
        if (value && value.trim()) {
            const currentValue = this.form.get(field.key)?.value || [];
            this.form.get(field.key)?.setValue([...currentValue, value.trim()]);
            event.chipInput.clear();
        }
    }

    removeChip(field: FormPageField, chip: any): void {
        const currentValue = this.form.get(field.key)?.value || [];
        const index = currentValue.indexOf(chip);
        if (index >= 0) {
            currentValue.splice(index, 1);
            this.form.get(field.key)?.setValue([...currentValue]);
        }
    }
}