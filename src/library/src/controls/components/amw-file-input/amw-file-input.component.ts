import { Component, input, output, signal, model, ViewEncapsulation, ElementRef, viewChild } from '@angular/core';

import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { AmwButtonComponent } from '../amw-button/amw-button.component';
import { BaseComponent } from '../base/base.component';
import { FileInputConfig, FileValidationResult, FileUploadProgress, FileInputAccept } from './interfaces';

/**
 * AMW File Input Component
 * Inherits from BaseComponent: disabled, required, label, placeholder, errorMessage, hasError,
 * name, id, tabIndex, size, color, ariaLabel, ariaLabelledby, ariaDescribedby, ariaRequired,
 * ariaInvalid, hint, readonly, value, change, focus, blur
 */
@Component({
    selector: 'amw-file-input',
    standalone: true,
    imports: [FormsModule, AmwButtonComponent, MatIconModule, MatProgressBarModule, MatChipsModule, MatCardModule],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-file-input.component.html',
    styleUrl: './amw-file-input.component.scss',
    host: {
        '(dragover)': 'onDragOver($event)',
        '(dragleave)': 'onDragLeave($event)',
        '(drop)': 'onDrop($event)'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: AmwFileInputComponent,
            multi: true
        }
    ]
})
export class AmwFileInputComponent extends BaseComponent<File[]> {
    fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

    multiple = input<boolean>(false);
    accept = input<FileInputAccept>('*/*');
    maxSize = input<number>(10 * 1024 * 1024); // 10MB default
    minSize = input<number>(0);
    maxFiles = input<number>(10);
    showPreview = input<boolean>(true);
    showProgress = input<boolean>(true);
    allowDragDrop = input<boolean>(true);
    showFileList = input<boolean>(true);
    placeholderText = input<string>('Choose files or drag and drop');
    buttonText = input<string>('Browse Files');
    dropText = input<string>('Drop files here');

    filesChange = output<File[]>();
    selectedFilesChange = output<File[]>();
    fileSelect = output<File[]>();
    fileRemove = output<File>();
    validationChange = output<FileValidationResult>();
    uploadProgress = output<FileUploadProgress[]>();

    // Model signal for two-way binding
    selectedFiles = model<File[]>([]);
    isDragOver = signal<boolean>(false);
    validationResult = signal<FileValidationResult>({ valid: true, errors: [], files: [] });
    uploadProgresses = signal<FileUploadProgress[]>([]);

    onDragOver(event: DragEvent): void {
        if (!this.allowDragDrop() || this.disabled()) return;
        event.preventDefault();
        event.stopPropagation();
        this.isDragOver.set(true);
    }

    onDragLeave(event: DragEvent): void {
        if (!this.allowDragDrop() || this.disabled()) return;
        event.preventDefault();
        event.stopPropagation();
        this.isDragOver.set(false);
    }

    onDrop(event: DragEvent): void {
        if (!this.allowDragDrop() || this.disabled()) return;
        event.preventDefault();
        event.stopPropagation();
        this.isDragOver.set(false);

        const files = Array.from(event.dataTransfer?.files || []);
        this.handleFiles(files);
    }

    onFileInputChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        const files = Array.from(input.files || []);
        this.handleFiles(files);
    }

    private handleFiles(files: File[]): void {
        const validation = this.validateFiles(files);
        this.validationResult.set(validation);
        this.validationChange.emit(validation);

        if (validation.valid) {
            let newFiles: File[];
            if (this.multiple()) {
                newFiles = [...this.selectedFiles(), ...validation.files].slice(0, this.maxFiles());
            } else {
                newFiles = validation.files.slice(0, 1);
            }

            this.selectedFiles.set(newFiles);
            this.value.set(newFiles);
            this.filesChange.emit(newFiles);
            this.selectedFilesChange.emit(newFiles);
            this.fileSelect.emit(validation.files);
            this._onChange(newFiles);
        }
    }

    private validateFiles(files: File[]): FileValidationResult {
        const errors: string[] = [];
        const validFiles: File[] = [];

        if (files.length === 0) {
            return { valid: true, errors: [], files: [] };
        }

        if (!this.multiple() && files.length > 1) {
            errors.push('Only one file is allowed');
        }

        if (files.length > this.maxFiles()) {
            errors.push(`Maximum ${this.maxFiles()} files allowed`);
        }

        for (const file of files) {
            // Check file size
            if (file.size > this.maxSize()) {
                errors.push(`${file.name} is too large (max ${this.formatFileSize(this.maxSize())})`);
                continue;
            }

            if (file.size < this.minSize()) {
                errors.push(`${file.name} is too small (min ${this.formatFileSize(this.minSize())})`);
                continue;
            }

            // Check file type
            if (this.accept() !== '*/*' && !this.isFileTypeAccepted(file)) {
                errors.push(`${file.name} is not an accepted file type`);
                continue;
            }

            validFiles.push(file);
        }

        return {
            valid: errors.length === 0,
            errors,
            files: validFiles
        };
    }

    private isFileTypeAccepted(file: File): boolean {
        if (this.accept() === '*/*') return true;

        const acceptedTypes = this.accept().split(',').map(type => type.trim());
        return acceptedTypes.some(type => {
            if (type.endsWith('/*')) {
                return file.type.startsWith(type.slice(0, -1));
            }
            return file.type === type;
        });
    }

    formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    removeFile(file: File): void {
        const newFiles = this.selectedFiles().filter(f => f !== file);
        this.selectedFiles.set(newFiles);
        this.value.set(newFiles);
        this.filesChange.emit(newFiles);
        this.selectedFilesChange.emit(newFiles);
        this.fileRemove.emit(file);
        this._onChange(newFiles);
    }

    clearFiles(): void {
        this.selectedFiles.set([]);
        this.value.set([]);
        this.filesChange.emit([]);
        this.selectedFilesChange.emit([]);
        this._onChange([]);
        const fileInputEl = this.fileInput();
        if (fileInputEl) {
            fileInputEl.nativeElement.value = '';
        }
    }

    openFileDialog(): void {
        const fileInputEl = this.fileInput();
        if (!this.disabled() && fileInputEl) {
            fileInputEl.nativeElement.click();
        }
    }

    getFileIcon(file: File): string {
        if (file.type.startsWith('image/')) return 'image';
        if (file.type.startsWith('video/')) return 'movie';
        if (file.type.startsWith('audio/')) return 'audiotrack';
        if (file.type.includes('pdf')) return 'picture_as_pdf';
        if (file.type.includes('text')) return 'description';
        return 'insert_drive_file';
    }

    getConfig(): FileInputConfig {
        return {
            multiple: this.multiple(),
            accept: this.accept(),
            maxSize: this.maxSize(),
            minSize: this.minSize(),
            maxFiles: this.maxFiles(),
            disabled: this.disabled(),
            required: this.required(),
            showPreview: this.showPreview(),
            showProgress: this.showProgress(),
            allowDragDrop: this.allowDragDrop(),
            showFileList: this.showFileList(),
            placeholder: this.placeholderText(),
            buttonText: this.buttonText(),
            dropText: this.dropText()
        };
    }
}
