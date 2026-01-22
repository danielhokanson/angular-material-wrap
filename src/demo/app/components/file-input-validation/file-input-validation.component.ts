import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwFileInputComponent } from '../../../../library/src/controls/components/amw-file-input/amw-file-input.component';

@Component({
  selector: 'amw-demo-file-input-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwFileInputComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './file-input-validation.component.html',
  styleUrl: './file-input-validation.component.scss'
})
export class FileInputValidationComponent extends BaseValidationComponent implements OnInit {
  profileImage: File[] = [];
  documents: File[] = [];
  attachments: File[] = [];

  validationForm: FormGroup = this.fb.group({
    profileImage: [[], [Validators.required, this.validateFileCount(1)]],
    documents: [[], [Validators.required, this.validateFileCount(1, 3)]],
    attachments: [[], [this.validateFileCount(0, 5)]]
  });

  validationInfo: ValidationInfo[] = [
    { title: 'Profile Image', description: 'Required, image files only, max 5MB, single file' },
    { title: 'Documents', description: 'Required, PDF/DOC/DOCX only, max 10MB each, 1-3 files' },
    { title: 'Attachments', description: 'Optional, any file type, max 20MB each, up to 5 files' },
    { title: 'File Type Validation', description: 'Checks MIME types and file extensions' },
    { title: 'File Size Validation', description: 'Enforces maximum file size limits' },
    { title: 'File Count Validation', description: 'Enforces minimum and maximum file counts' }
  ];

  ngOnInit(): void {
    this.validationForm.get('profileImage')?.setValidators([
      Validators.required,
      this.validateFileCount(1, 1),
      this.validateFileType(['image/*']),
      this.validateFileSize(5 * 1024 * 1024)
    ]);

    this.validationForm.get('documents')?.setValidators([
      Validators.required,
      this.validateFileCount(1, 3),
      this.validateFileType(['.pdf', '.doc', '.docx']),
      this.validateFileSize(10 * 1024 * 1024)
    ]);

    this.validationForm.get('attachments')?.setValidators([
      this.validateFileCount(0, 5),
      this.validateFileSize(20 * 1024 * 1024)
    ]);
  }

  validateFileCount(min: number, max?: number) {
    return (control: AbstractControl): ValidationErrors | null => {
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
    return (control: AbstractControl): ValidationErrors | null => {
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
    return (control: AbstractControl): ValidationErrors | null => {
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

  getFileError(controlName: string): string {
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

  hasFileError(controlName: string): boolean {
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
