import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';

@Directive({
    selector: '[amwCopyToClipboard]',
    standalone: true
})
export class AmwCopyToClipboardDirective {
    @Input() amwCopyToClipboard: string = '';
    @Input() amwCopySuccessMessage: string = 'Copied to clipboard!';
    @Input() amwCopyErrorMessage: string = 'Failed to copy to clipboard';
    @Input() amwCopyShowToast: boolean = true;

    @Output() amwCopySuccess = new EventEmitter<string>();
    @Output() amwCopyError = new EventEmitter<Error>();

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) { }

    @HostListener('click', ['$event'])
    onClick(event: Event): void {
        event.preventDefault();
        this.copyToClipboard();
    }

    private async copyToClipboard(): Promise<void> {
        const textToCopy = this.getTextToCopy();

        if (!textToCopy) {
            this.handleError(new Error('No text to copy'));
            return;
        }

        try {
            // Try modern clipboard API first
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(textToCopy);
                this.handleSuccess(textToCopy);
            } else {
                // Fallback for older browsers
                this.fallbackCopyToClipboard(textToCopy);
            }
        } catch (error) {
            this.handleError(error as Error);
        }
    }

    private getTextToCopy(): string {
        // If text is provided via input, use it
        if (this.amwCopyToClipboard) {
            return this.amwCopyToClipboard;
        }

        // Otherwise, try to get text from the element
        const element = this.elementRef.nativeElement;

        // Check if element has a value property (input, textarea)
        if (element.value !== undefined) {
            return element.value;
        }

        // Check if element has textContent
        if (element.textContent) {
            return element.textContent.trim();
        }

        // Check if element has innerText
        if (element.innerText) {
            return element.innerText.trim();
        }

        return '';
    }

    private fallbackCopyToClipboard(text: string): void {
        const textArea = document.createElement('textarea');
        textArea.value = text;

        // Make the textarea invisible
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            if (successful) {
                this.handleSuccess(text);
            } else {
                this.handleError(new Error('Copy command failed'));
            }
        } catch (error) {
            this.handleError(error as Error);
        } finally {
            document.body.removeChild(textArea);
        }
    }

    private handleSuccess(text: string): void {
        this.amwCopySuccess.emit(text);

        if (this.amwCopyShowToast) {
            this.showToast(this.amwCopySuccessMessage, 'success');
        }
    }

    private handleError(error: Error): void {
        this.amwCopyError.emit(error);

        if (this.amwCopyShowToast) {
            this.showToast(this.amwCopyErrorMessage, 'error');
        }
    }

    private showToast(message: string, type: 'success' | 'error'): void {
        // Create a simple toast notification
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#4caf50' : '#f44336'};
      color: white;
      padding: 12px 24px;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      z-index: 10000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
    `;

        document.body.appendChild(toast);

        // Remove toast after 3 seconds
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 3000);
    }
}
