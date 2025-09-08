/**
 * Configuration options for the amw-file-input component
 */
export interface FileInputConfig {
    /** Whether multiple files can be selected */
    multiple: boolean;
    /** Accepted file types (e.g., 'image/*', '.pdf') */
    accept: string;
    /** Maximum file size in bytes */
    maxSize: number;
    /** Minimum file size in bytes */
    minSize: number;
    /** Maximum number of files allowed */
    maxFiles: number;
    /** Whether the input is disabled */
    disabled: boolean;
    /** Whether the input is required */
    required: boolean;
    /** Whether to show file previews */
    showPreview: boolean;
    /** Whether to show upload progress */
    showProgress: boolean;
    /** Whether to allow drag and drop */
    allowDragDrop: boolean;
    /** Whether to show the file list */
    showFileList: boolean;
    /** Placeholder text */
    placeholder: string;
    /** Text for the select button */
    buttonText: string;
    /** Text shown in drop zone */
    dropText: string;
}

