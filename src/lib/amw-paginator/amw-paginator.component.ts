import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface AmwPageEvent {
    pageIndex: number;
    pageSize: number;
    length: number;
    previousPageIndex?: number;
}

@Component({
    selector: 'amw-paginator',
    template: `
		<div class="amw-paginator">
			<button (click)="goTo(pageIndex - 1)" [disabled]="pageIndex <= 0">Prev</button>
			<span>{{ pageIndex + 1 }} / {{ totalPages() }}</span>
			<button (click)="goTo(pageIndex + 1)" [disabled]="pageIndex >= totalPages() - 1">Next</button>
		</div>
	`,
    standalone: true
})
export class AmwPaginatorComponent {
    @Input() length = 0;
    @Input() pageSize = 10;
    @Input() pageSizeOptions: number[] = [5, 10, 25, 50];
    @Input() pageIndex = 0;
    @Input() showFirstLastButtons = false;
    @Input() hidePageSize = false;
    @Input() disabled = false;

    @Output() page = new EventEmitter<AmwPageEvent>();

    totalPages() {
        return Math.max(1, Math.ceil(this.length / this.pageSize));
    }

    goTo(index: number) {
        if (this.disabled) return;
        const prev = this.pageIndex;
        this.pageIndex = Math.max(0, Math.min(index, this.totalPages() - 1));
        this.page.emit({
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            length: this.length,
            previousPageIndex: prev
        });
    }
}

export const AMW_PAGINATOR_COMPONENTS = [
    AmwPaginatorComponent
] as const;
