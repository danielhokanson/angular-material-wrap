import { Component, Input, Output, EventEmitter, ViewEncapsulation, ElementRef, ViewChild, HostListener } from '@angular/core';

import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { AmwButtonComponent } from '../amw-button/amw-button.component';
import { BaseComponent } from '../base/base.component';
import { FileInputConfig, FileValidationResult, FileUploadProgress, FileInputAccept } from './interfaces';

@Component({
    selector: 'amw-file-input',
    standalone: true,
    imports: [FormsModule, AmwButtonComponent, MatIconModule, MatProgressBarModule, MatChipsModule, MatCardModule],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-file-input.component.html',
    styleUrl: './amw-file-input.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: AmwFileInputComponent,
            multi: true
        }
    ]
})
export class AmwFileInputComponent extends BaseComponent {
    @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

    @Input() multiple = false;
    @Input() accept: FileInputAccept = '*/*';
    @Input() maxSize = 10 * 1024 * 1024; // 10MB default
    @Input() minSize = 0;
    @Input() maxFiles = 10;
    @Input() showPreview = true;
    @Input() showProgress = true;
    @Input() allowDragDrop = true;
    @Input() showFileList = true;
    @Input() placeholderText = 'Choose files or drag and drop';
    @Input() buttonText = 'Browse Files';
    @Input() dropText = 'Drop files here';

    @Output() filesChange = new EventEmitter<File[]>();
    @Output() selectedFilesChange = new EventEmitter<File[]>();
    @Output() fileSelect = new EventEmitter<File[]>();
    @Output() fileRemove = new EventEmitter<File>();
    @Output() validationChange = new EventEmitter<FileValidationResult>();
    @Output() uploadProgress = new EventEmitter<FileUploadProgress[]>();

    @Input()
    get selectedFiles(): File[] {
        return this._selectedFiles;
    }

    set selectedFiles(files: File[]) {
        this._selectedFiles = files;
        this.value = files;
        this.filesChange.emit(files);
        this.selectedFilesChange.emit(files);
    }

    private _selectedFiles: File[] = [];
    isDragOver = false;
    validationResult: FileValidationResult = { valid: true, errors: [], files: [] };
    uploadProgresses: FileUploadProgress[] = [];

    @HostListener('dragover', ['$event'])
    onDragOver(event: DragEvent): void {
        if (!this.allowDragDrop || this.disabled) return;
        event.preventDefault();
        event.stopPropagation();
        this.isDragOver = true;
    }

    @HostListener('dragleave', ['$event'])
    onDragLeave(event: DragEvent): void {
        if (!this.allowDragDrop || this.disabled) return;
        event.preventDefault();
        event.stopPropagation();
        this.isDragOver = false;
    }

    @HostListener('drop', ['$event'])
    onDrop(event: DragEvent): void {
        if (!this.allowDragDrop || this.disabled) return;
        event.preventDefault();
        event.stopPropagation();
        this.isDragOver = false;

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
        this.validationResult = validation;
        this.validationChange.emit(validation);

        if (validation.valid) {
            if (this.multiple) {
                this._selectedFiles = [...this._selectedFiles, ...validation.files].slice(0, this.maxFiles);
            } else {
                this._selectedFiles = validation.files.slice(0, 1);
            }

            this.value = this._selectedFiles;
            this.filesChange.emit(this._selectedFiles);
            this.fileSelect.emit(validation.files);
        }
    }

    private validateFiles(files: File[]): FileValidationResult {
        const errors: string[] = [];
        const validFiles: File[] = [];

        if (files.length === 0) {
            return { valid: true, errors: [], files: [] };
        }

        if (!this.multiple && files.length > 1) {
            errors.push('Only one file is allowed');
        }

        if (files.length > this.maxFiles) {
            errors.push(`Maximum ${this.maxFiles} files allowed`);
        }

        for (const file of files) {
            // Check file size
            if (file.size > this.maxSize) {
                errors.push(`${file.name} is too large (max ${this.formatFileSize(this.maxSize)})`);
                continue;
            }

            if (file.size < this.minSize) {
                errors.push(`${file.name} is too small (min ${this.formatFileSize(this.minSize)})`);
                continue;
            }

            // Check file type
            if (this.accept !== '*/*' && !this.isFileTypeAccepted(file)) {
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
        if (this.accept === '*/*') return true;

        const acceptedTypes = this.accept.split(',').map(type => type.trim());
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
        this._selectedFiles = this._selectedFiles.filter(f => f !== file);
        this.value = this._selectedFiles;
        this.filesChange.emit(this._selectedFiles);
        this.fileRemove.emit(file);
    }

    clearFiles(): void {
        this._selectedFiles = [];
        this.value = [];
        this.filesChange.emit([]);
        if (this.fileInput) {
            this.fileInput.nativeElement.value = '';
        }
    }

    openFileDialog(): void {
        if (!this.disabled && this.fileInput) {
            this.fileInput.nativeElement.click();
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
            multiple: this.multiple,
            accept: this.accept,
            maxSize: this.maxSize,
            minSize: this.minSize,
            maxFiles: this.maxFiles,
            disabled: this.disabled,
            required: this.required,
            showPreview: this.showPreview,
            showProgress: this.showProgress,
            allowDragDrop: this.allowDragDrop,
            showFileList: this.showFileList,
            placeholder: this.placeholderText,
            buttonText: this.buttonText,
            dropText: this.dropText
        };
    }
}
