import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'amw-demo-file-input-code',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatCardModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './file-input-code.component.html',
  styleUrl: './file-input-code.component.scss'
})
export class FileInputCodeComponent {
  /** Code examples for the component */
  readonly codeExamplesArray = Object.values({
    basic: {
      title: 'Basic File Input',
      description: 'Simple file input with default configuration',
      code: `<amw-file-input
  [(selectedFiles)]="files"
  (filesChange)="onFilesChange($event)"
  (fileSelect)="onFileSelect($event)"
  (fileRemove)="onFileRemove($event)">
</amw-file-input>`
    },
    configured: {
      title: 'Configured File Input',
      description: 'File input with custom configuration and restrictions',
      code: `<amw-file-input
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
</amw-file-input>`
    },
    formControl: {
      title: 'Reactive Form Integration',
      description: 'File input integrated with Angular reactive forms',
      code: `// Component
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
</form>`
    },
    validation: {
      title: 'With Custom Validation',
      description: 'File input with custom validation and error handling',
      code: `// Component
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
</form>`
    },
    dragDrop: {
      title: 'Drag & Drop Configuration',
      description: 'File input with drag and drop functionality',
      code: `<amw-file-input
  [allowDragDrop]="true"
  [multiple]="true"
  [accept]="'*/*'"
  [selectedFiles]="files"
  (filesChange)="onFilesChange($event)"
  placeholder="Drag and drop files here or click to browse"
  dropText="Drop files here to upload">
</amw-file-input>`
    },
    fileTypes: {
      title: 'File Type Restrictions',
      description: 'Different file type restrictions and MIME types',
      code: `<!-- Images only -->
<amw-file-input [accept]="'image/*'">Images</amw-file-input>

<!-- Specific extensions -->
<amw-file-input [accept]="'.jpg,.jpeg,.png,.gif'">Specific Images</amw-file-input>

<!-- PDF only -->
<amw-file-input [accept]="'application/pdf'">PDF Files</amw-file-input>

<!-- Multiple types -->
<amw-file-input [accept]="'image/*,application/pdf'">Images & PDFs</amw-file-input>

<!-- Video files -->
<amw-file-input [accept]="'video/*'">Video Files</amw-file-input>`
    }
  });
}



