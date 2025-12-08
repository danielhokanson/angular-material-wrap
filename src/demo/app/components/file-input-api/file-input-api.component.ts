import { Component, ViewEncapsulation } from '@angular/core';

import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'amw-demo-file-input-api',
    standalone: true,
    imports: [MatCardModule],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './file-input-api.component.html',
    styleUrl: './file-input-api.component.scss'
})
export class FileInputApiComponent {
    apiDocumentation = {
        inputs: [
            {
                property: 'selectedFiles',
                type: 'File[]',
                default: '[]',
                description: 'Array of selected files'
            },
            {
                property: 'multiple',
                type: 'boolean',
                default: 'false',
                description: 'Whether multiple files can be selected'
            },
            {
                property: 'accept',
                type: 'FileInputAccept',
                default: '*/*',
                description: 'Accepted file types (MIME types or extensions)'
            },
            {
                property: 'maxSize',
                type: 'number',
                default: '10485760',
                description: 'Maximum file size in bytes (default 10MB)'
            },
            {
                property: 'minSize',
                type: 'number',
                default: '0',
                description: 'Minimum file size in bytes'
            },
            {
                property: 'maxFiles',
                type: 'number',
                default: '10',
                description: 'Maximum number of files allowed'
            },
            {
                property: 'showPreview',
                type: 'boolean',
                default: 'true',
                description: 'Whether to show file previews'
            },
            {
                property: 'showProgress',
                type: 'boolean',
                default: 'true',
                description: 'Whether to show upload progress'
            },
            {
                property: 'allowDragDrop',
                type: 'boolean',
                default: 'true',
                description: 'Whether to allow drag and drop functionality'
            },
            {
                property: 'showFileList',
                type: 'boolean',
                default: 'true',
                description: 'Whether to show the list of selected files'
            },
            {
                property: 'placeholder',
                type: 'string',
                default: 'Choose files or drag and drop',
                description: 'Placeholder text for the drop zone'
            },
            {
                property: 'buttonText',
                type: 'string',
                default: 'Browse Files',
                description: 'Text for the browse button'
            },
            {
                property: 'dropText',
                type: 'string',
                default: 'Drop files here',
                description: 'Text shown when dragging files over the drop zone'
            },
            {
                property: 'disabled',
                type: 'boolean',
                default: 'false',
                description: 'Whether the file input is disabled'
            },
            {
                property: 'required',
                type: 'boolean',
                default: 'false',
                description: 'Whether the file input is required'
            },
            {
                property: 'label',
                type: 'string',
                default: '""',
                description: 'Label text for the file input'
            },
            {
                property: 'errorMessage',
                type: 'string',
                default: '""',
                description: 'Custom error message to display'
            },
            {
                property: 'hasError',
                type: 'boolean',
                default: 'false',
                description: 'Whether the file input is in an error state'
            }
        ],
        outputs: [
            {
                property: 'filesChange',
                type: 'EventEmitter<File[]>',
                description: 'Emitted when the selected files change'
            },
            {
                property: 'fileSelect',
                type: 'EventEmitter<File[]>',
                description: 'Emitted when files are selected'
            },
            {
                property: 'fileRemove',
                type: 'EventEmitter<File>',
                description: 'Emitted when a file is removed'
            },
            {
                property: 'validationChange',
                type: 'EventEmitter<FileValidationResult>',
                description: 'Emitted when file validation results change'
            },
            {
                property: 'uploadProgress',
                type: 'EventEmitter<FileUploadProgress[]>',
                description: 'Emitted when upload progress changes'
            },
            {
                property: 'valueChange',
                type: 'EventEmitter<File[]>',
                description: 'Emitted when the value changes (for form integration)'
            },
            {
                property: 'blur',
                type: 'EventEmitter<FocusEvent>',
                description: 'Emitted when the file input loses focus'
            },
            {
                property: 'focus',
                type: 'EventEmitter<FocusEvent>',
                description: 'Emitted when the file input gains focus'
            }
        ],
        methods: [
            {
                method: 'getConfig()',
                returns: 'FileInputConfig',
                description: 'Returns the current configuration object'
            },
            {
                method: 'clearFiles()',
                returns: 'void',
                description: 'Clears all selected files'
            },
            {
                method: 'removeFile(file: File)',
                returns: 'void',
                description: 'Removes a specific file from the selection'
            },
            {
                method: 'openFileDialog()',
                returns: 'void',
                description: 'Opens the file selection dialog'
            }
        ],
        types: [
            {
                type: 'FileInputAccept',
                definition: "'image/*' | 'video/*' | 'audio/*' | 'application/pdf' | 'text/*' | 'application/*' | string",
                description: 'Accepted file types for the file input'
            },
            {
                type: 'FileInputConfig',
                definition: 'interface FileInputConfig { multiple: boolean; accept: string; maxSize: number; minSize: number; maxFiles: number; disabled: boolean; required: boolean; showPreview: boolean; showProgress: boolean; allowDragDrop: boolean; showFileList: boolean; placeholder: string; buttonText: string; dropText: string; }',
                description: 'Configuration interface for the file input'
            },
            {
                type: 'FileValidationResult',
                definition: 'interface FileValidationResult { valid: boolean; errors: string[]; files: File[]; }',
                description: 'Result of file validation'
            },
            {
                type: 'FileUploadProgress',
                definition: 'interface FileUploadProgress { file: File; progress: number; status: "pending" | "uploading" | "completed" | "error"; error?: string; }',
                description: 'Upload progress information for a file'
            }
        ]
    };
}



