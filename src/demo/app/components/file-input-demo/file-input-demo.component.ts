import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';

import { AmwFileInputComponent } from '../../../../library/src/controls/components/amw-file-input/amw-file-input.component';

@Component({
    selector: 'amw-demo-file-input',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatDividerModule,
        MatButtonToggleModule,
        MatChipsModule,
        AmwFileInputComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './file-input-demo.component.html',
    styleUrl: './file-input-demo.component.scss'
})
export class FileInputDemoComponent {
    // Basic file input
    basicFiles: File[] = [];

    // Configuration options
    multiple = false;
    accept: string = '*/*';
    maxSize = 10 * 1024 * 1024; // 10MB
    maxFiles = 5;
    showPreview = true;
    showProgress = true;
    allowDragDrop = true;
    showFileList = true;
    disabled = false;

    // Real-world examples
    imageFiles: File[] = [];
    documentFiles: File[] = [];
    videoFiles: File[] = [];
    audioFiles: File[] = [];

    onFilesChange(files: File[]): void {
        console.log('Files changed:', files);
    }

    onFileSelect(files: File[]): void {
        console.log('Files selected:', files);
    }

    onFileRemove(file: File): void {
        console.log('File removed:', file);
    }

    onValidationChange(result: any): void {
        console.log('Validation result:', result);
    }

    onImageFilesChange(files: File[]): void {
        console.log('Image files:', files);
    }

    onDocumentFilesChange(files: File[]): void {
        console.log('Document files:', files);
    }

    onVideoFilesChange(files: File[]): void {
        console.log('Video files:', files);
    }

    onAudioFilesChange(files: File[]): void {
        console.log('Audio files:', files);
    }

    formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}
