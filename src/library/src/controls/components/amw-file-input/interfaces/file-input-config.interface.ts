export interface FileInputConfig {
    multiple: boolean;
    accept: string;
    maxSize: number; // in bytes
    minSize: number; // in bytes
    maxFiles: number;
    disabled: boolean;
    required: boolean;
    showPreview: boolean;
    showProgress: boolean;
    allowDragDrop: boolean;
    showFileList: boolean;
    placeholder: string;
    buttonText: string;
    dropText: string;
}

export interface FileValidationResult {
    valid: boolean;
    errors: string[];
    files: File[];
}

export interface FileUploadProgress {
    file: File;
    progress: number;
    status: 'pending' | 'uploading' | 'completed' | 'error';
    error?: string;
}
