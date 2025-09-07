import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

import { AmwFileInputComponent } from '../../../../library/src/controls/components/amw-file-input/amw-file-input.component';

@Component({
    selector: 'amw-demo-file-input-validation',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatCardModule,
        AmwFileInputComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './file-input-validation.component.html',
    styleUrl: './file-input-validation.component.scss'
})
export class FileInputValidationComponent implements OnInit {
    validationForm: FormGroup;
    profileImage: File[] = [];
    documents: File[] = [];
    attachments: File[] = [];

    constructor(
        private fb: FormBuilder,
        private snackBar: MatSnackBar
    ) {
        this.validationForm = this.fb.group({
            profileImage: [[], [Validators.required, this.validateFileCount(1)]],
            documents: [[], [Validators.required, this.validateFileCount(1, 3)]],
            attachments: [[], [this.validateFileCount(0, 5)]]
        });
    }

    ngOnInit(): void {
        // Set up form validation
        this.validationForm.get('profileImage')?.setValidators([
            Validators.required,
            this.validateFileCount(1, 1),
            this.validateFileType(['image/*']),
            this.validateFileSize(5 * 1024 * 1024) // 5MB
        ]);

        this.validationForm.get('documents')?.setValidators([
            Validators.required,
            this.validateFileCount(1, 3),
            this.validateFileType(['.pdf', '.doc', '.docx']),
            this.validateFileSize(10 * 1024 * 1024) // 10MB
        ]);

        this.validationForm.get('attachments')?.setValidators([
            this.validateFileCount(0, 5),
            this.validateFileSize(20 * 1024 * 1024) // 20MB
        ]);
    }

    validateFileCount(min: number, max?: number) {
        return (control: any) => {
            const files = control.value as File[];
            if (!files || files.length === 0) {
                return min > 0 ? { required: true } : null;
            }
            if (files.length < min) {
                return { minFiles: { required: min, actual: files.length } };
            }
            if (max && files.length > max) {
                return { maxFiles: { required: max, actual: files.length } };
            }
            return null;
        };
    }

    validateFileType(allowedTypes: string[]) {
        return (control: any) => {
            const files = control.value as File[];
            if (!files || files.length === 0) return null;

            for (const file of files) {
                const isValid = allowedTypes.some(type => {
                    if (type.endsWith('/*')) {
                        return file.type.startsWith(type.slice(0, -1));
                    }
                    return file.type === type || file.name.toLowerCase().endsWith(type.toLowerCase());
                });

                if (!isValid) {
                    return { invalidFileType: { file: file.name, allowedTypes } };
                }
            }
            return null;
        };
    }

    validateFileSize(maxSize: number) {
        return (control: any) => {
            const files = control.value as File[];
            if (!files || files.length === 0) return null;

            for (const file of files) {
                if (file.size > maxSize) {
                    return { fileTooLarge: { file: file.name, maxSize, actualSize: file.size } };
                }
            }
            return null;
        };
    }

    onSubmit(): void {
        if (this.validationForm.valid) {
            this.snackBar.open('Form submitted successfully!', 'Close', {
                duration: 3000
            });
            console.log('Form values:', this.validationForm.value);
        } else {
            this.snackBar.open('Please fix the validation errors', 'Close', {
                duration: 3000
            });
            this.markFormGroupTouched();
        }
    }

    onReset(): void {
        this.validationForm.reset({
            profileImage: [],
            documents: [],
            attachments: []
        });
        this.profileImage = [];
        this.documents = [];
        this.attachments = [];
    }

    private markFormGroupTouched(): void {
        Object.keys(this.validationForm.controls).forEach(key => {
            const control = this.validationForm.get(key);
            control?.markAsTouched();
        });
    }

    getErrorMessage(controlName: string): string {
        const control = this.validationForm.get(controlName);
        if (control?.hasError('required')) {
            return 'This field is required';
        }
        if (control?.hasError('minFiles')) {
            const error = control.getError('minFiles');
            return `At least ${error.required} file(s) required (${error.actual} provided)`;
        }
        if (control?.hasError('maxFiles')) {
            const error = control.getError('maxFiles');
            return `Maximum ${error.required} file(s) allowed (${error.actual} provided)`;
        }
        if (control?.hasError('invalidFileType')) {
            const error = control.getError('invalidFileType');
            return `${error.file} is not an accepted file type`;
        }
        if (control?.hasError('fileTooLarge')) {
            const error = control.getError('fileTooLarge');
            return `${error.file} is too large (max ${this.formatFileSize(error.maxSize)})`;
        }
        return '';
    }

    hasError(controlName: string): boolean {
        const control = this.validationForm.get(controlName);
        return !!(control && control.invalid && control.touched);
    }

    private formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}
