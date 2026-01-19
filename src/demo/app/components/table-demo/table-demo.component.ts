import { Component, ViewEncapsulation, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmwTableComponent } from '../../../../lib/amw-table/amw-table.module';
import { AmwSortDirective, AmwSortHeaderComponent } from '../../../../lib/amw-sort/amw-sort.module';
import { AmwPaginatorComponent } from '../../../../lib/amw-paginator/amw-paginator.component';

interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

@Component({
    selector: 'amw-demo-table',
    standalone: true,
    imports: [CommonModule, AmwTableComponent, AmwSortDirective, AmwSortHeaderComponent, AmwPaginatorComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './table-demo.component.html',
    styleUrl: './table-demo.component.scss'
})
export class TableDemoComponent {
    displayedColumns = ['position', 'name', 'weight', 'symbol'];

    basicData: PeriodicElement[] = [
        { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
        { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
        { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
        { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
        { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' }
    ];

    extendedData: PeriodicElement[] = [
        ...this.basicData,
        { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
        { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
        { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
        { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
        { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
    ];

    sortActive = signal('position');
    sortDirection = signal<'asc' | 'desc' | ''>('asc');

    pageSize = signal(5);
    pageIndex = signal(0);

    get paginatedData(): PeriodicElement[] {
        const start = this.pageIndex() * this.pageSize();
        return this.extendedData.slice(start, start + this.pageSize());
    }

    onSortChange(event: { active: string; direction: 'asc' | 'desc' | '' }): void {
        this.sortActive.set(event.active);
        this.sortDirection.set(event.direction);
    }

    onPageChange(event: { pageIndex: number; pageSize: number }): void {
        this.pageIndex.set(event.pageIndex);
        this.pageSize.set(event.pageSize);
    }

    trackByPosition(index: number, item: PeriodicElement): number {
        return item.position;
    }
}
