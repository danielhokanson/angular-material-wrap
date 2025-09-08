/**
 * File upload progress information
 */
export interface FileUploadProgress {
    /** The file being uploaded */
    file: File;
    /** Upload progress percentage (0-100) */
    progress: number;
    /** Current upload status */
    status: 'pending' | 'uploading' | 'completed' | 'error';
    /** Error message if status is 'error' */
    error?: string;
}


