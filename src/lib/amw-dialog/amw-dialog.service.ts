import { Injectable, Type } from '@angular/core';
import { AmwDialogRef } from './amw-dialog-ref';

export interface AmwDialogConfig {
    width?: string;
    height?: string;
    maxWidth?: string;
    maxHeight?: string;
    minWidth?: string;
    minHeight?: string;
    panelClass?: string | string[];
    hasBackdrop?: boolean;
    backdropClass?: string;
    disableClose?: boolean;
    autoFocus?: boolean;
    data?: any;
}

@Injectable({ providedIn: 'root' })
export class AmwDialogService {
    open<T, D = any, R = any>(
        component: Type<T>,
        config?: AmwDialogConfig
    ): AmwDialogRef<T, R> {
        // Minimal runtime stub: returns a dialog ref so callers can close/subscribe.
        const ref = new AmwDialogRef<T, R>();
        // expose a minimal componentInstance placeholder
        (ref as any).componentInstance = {};
        // emit opened asynchronously
        queueMicrotask(() => ref._afterOpened.next(void 0));
        return ref;
    }
}
