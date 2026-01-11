import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseCodeComponent } from '../base/base-code.component';
import { AmwFileInputComponent } from '../../../../library/src/controls/components/amw-file-input/amw-file-input.component';

type FileInputExamples = 'basic' | 'configured' | 'formControl' | 'validation' | 'dragDrop' | 'fileTypes';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwIconComponent } from '../../../../library/src/components/components';
@Component({
  selector: 'amw-demo-file-input-code',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AmwFileInputComponent,
    AmwButtonComponent,
    AmwAccordionComponent,
    AmwAccordionPanelComponent,
    AmwIconComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './file-input-code.component.html',
  styleUrl: './file-input-code.component.scss'
})
export class FileInputCodeComponent extends BaseCodeComponent<FileInputExamples> implements OnInit {
  // State for live preview examples
  basicFiles: File[] = [];
  imageFiles: File[] = [];
  dragDropFiles: File[] = [];
  imageOnlyFiles: File[] = [];
  specificImageFiles: File[] = [];
  pdfFiles: File[] = [];
  mixedFiles: File[] = [];
  videoFiles: File[] = [];
  fileForm!: FormGroup;

  // Original code examples (for reset functionality)
  readonly codeExamples: Record<FileInputExamples, string> = {
    basic: `<amw-file-input
  [(selectedFiles)]="files"
  (filesChange)="onFilesChange($event)"
  (fileSelect)="onFileSelect($event)"
  (fileRemove)="onFileRemove($event)">
</amw-file-input>`,

    configured: `<amw-file-input
  [multiple]="true"
  [accept]="'image/*'"
  [maxSize]="5 * 1024 * 1024"
  [maxFiles]="5"
  [showPreview]="true"
  [allowDragDrop]="true"
  [selectedFiles]="imageFiles"
  (filesChange)="onImageFilesChange($event)"
  placeholder="Upload images (max 5MB each)"
  buttonText="Choose Images">
</amw-file-input>`,

    formControl: `// Component
export class MyComponent {
  form = this.fb.group({
    profileImage: [[], [Validators.required, this.validateFileCount(1)]],
    documents: [[], [Validators.required, this.validateFileCount(1, 3)]]
  });

  validateFileCount(min: number, max?: number) {
    return (control: any) => {
      const files = control.value as File[];
      if (files.length < min) return { minFiles: true };
      if (max && files.length > max) return { maxFiles: true };
      return null;
    };
  }
}

// Template
<form [formGroup]="form">
  <amw-file-input
    formControlName="profileImage"
    [accept]="'image/*'"
    [maxSize]="5 * 1024 * 1024"
    [hasError]="form.get('profileImage')?.invalid">
    Profile Image
  </amw-file-input>
</form>`,

    validation: `// Component
export class MyComponent {
  form = this.fb.group({
    documents: [[], [Validators.required, this.validateDocuments]]
  });

  validateDocuments(control: any) {
    const files = control.value as File[];
    if (!files || files.length === 0) return { required: true };

    for (const file of files) {
      if (!file.type.includes('pdf') && !file.name.endsWith('.pdf')) {
        return { invalidFileType: true };
      }
      if (file.size > 10 * 1024 * 1024) {
        return { fileTooLarge: true };
      }
    }
    return null;
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) return 'Files are required';
    if (control?.hasError('invalidFileType')) return 'Only PDF files are allowed';
    if (control?.hasError('fileTooLarge')) return 'Files must be smaller than 10MB';
    return '';
  }
}

// Template
<form [formGroup]="form">
  <amw-file-input
    formControlName="documents"
    [accept]="'.pdf'"
    [maxSize]="10 * 1024 * 1024"
    [hasError]="form.get('documents')?.invalid"
    [errorMessage]="getErrorMessage('documents')">
    Upload Documents
  </amw-file-input>
</form>`,

    dragDrop: `<amw-file-input
  [allowDragDrop]="true"
  [multiple]="true"
  [accept]="'*/*'"
  [selectedFiles]="files"
  (filesChange)="onFilesChange($event)"
  placeholder="Drag and drop files here or click to browse"
  dropText="Drop files here to upload">
</amw-file-input>`,

    fileTypes: `<!-- Images only -->
<amw-file-input [accept]="'image/*'">Images</amw-file-input>

<!-- Specific extensions -->
<amw-file-input [accept]="'.jpg,.jpeg,.png,.gif'">Specific Images</amw-file-input>

<!-- PDF only -->
<amw-file-input [accept]="'application/pdf'">PDF Files</amw-file-input>

<!-- Multiple types -->
<amw-file-input [accept]="'image/*,application/pdf'">Images & PDFs</amw-file-input>

<!-- Video files -->
<amw-file-input [accept]="'video/*'">Video Files</amw-file-input>`
  };

  constructor(private fb: FormBuilder) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    // Initialize form for validation examples
    this.fileForm = this.fb.group({
      profileImage: [[], [Validators.required, this.validateFileCount(1)]],
      documents: [[], [Validators.required, this.validateDocuments]]
    });
  }

  // Event handlers for file input
  onFilesChange(files: File[]): void {
    console.log('Files changed:', files);
  }

  onImageFilesChange(files: File[]): void {
    console.log('Image files changed:', files);
  }

  onFileSelect(files: File[]): void {
    console.log('Files selected:', files);
  }

  onFileRemove(file: File): void {
    console.log('File removed:', file);
  }

  // Validation helpers
  validateFileCount(min: number, max?: number) {
    return (control: any) => {
      const files = control.value as File[];
      if (files.length < min) return { minFiles: true };
      if (max && files.length > max) return { maxFiles: true };
      return null;
    };
  }

  validateDocuments(control: any) {
    const files = control.value as File[];
    if (!files || files.length === 0) return { required: true };

    for (const file of files) {
      if (!file.type.includes('pdf') && !file.name.endsWith('.pdf')) {
        return { invalidFileType: true };
      }
      if (file.size > 10 * 1024 * 1024) {
        return { fileTooLarge: true };
      }
    }
    return null;
  }

  getErrorMessage(controlName: string): string {
    const control = this.fileForm.get(controlName);
    if (control?.hasError('required')) return 'Files are required';
    if (control?.hasError('minFiles')) return 'At least one file is required';
    if (control?.hasError('invalidFileType')) return 'Only PDF files are allowed';
    if (control?.hasError('fileTooLarge')) return 'Files must be smaller than 10MB';
    return '';
  }
}

