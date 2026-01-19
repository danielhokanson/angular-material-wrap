import { Observable, Subject } from 'rxjs';

export class AmwDialogRef<T = any, R = any> {
    readonly _afterClosed = new Subject<R | undefined>();
    readonly _afterOpened = new Subject<void>();
    readonly _backdropClick = new Subject<MouseEvent>();
    readonly _keydown = new Subject<KeyboardEvent>();

    componentInstance!: T;

    close(result?: R): void {
        this._afterClosed.next(result);
        this._afterClosed.complete();
    }

    afterClosed(): Observable<R | undefined> {
        return this._afterClosed.asObservable();
    }

    afterOpened(): Observable<void> {
        return this._afterOpened.asObservable();
    }

    backdropClick(): Observable<MouseEvent> {
        return this._backdropClick.asObservable();
    }

    keydownEvents(): Observable<KeyboardEvent> {
        return this._keydown.asObservable();
    }
}
