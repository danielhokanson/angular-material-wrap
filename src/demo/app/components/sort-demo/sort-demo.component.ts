import { Component, ViewEncapsulation, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmwSortDirective, AmwSortHeaderComponent, AmwSort } from '../../../../lib/amw-sort/amw-sort.module';
import { AmwTableComponent } from '../../../../lib/amw-table/amw-table.module';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

interface Person {
    id: number;
    name: string;
    age: number;
    city: string;
}

@Component({
    selector: 'amw-demo-sort',
    standalone: true,
    imports: [CommonModule, AmwSortDirective, AmwSortHeaderComponent, AmwTableComponent, AmwButtonComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './sort-demo.component.html',
    styleUrl: './sort-demo.component.scss'
})
export class SortDemoComponent {
    displayedColumns = ['id', 'name', 'age', 'city'];

    originalData: Person[] = [
        { id: 1, name: 'Alice', age: 28, city: 'New York' },
        { id: 2, name: 'Bob', age: 35, city: 'Los Angeles' },
        { id: 3, name: 'Charlie', age: 22, city: 'Chicago' },
        { id: 4, name: 'Diana', age: 31, city: 'Houston' },
        { id: 5, name: 'Edward', age: 45, city: 'Phoenix' }
    ];

    sortActive = signal<string>('name');
    sortDirection = signal<'asc' | 'desc' | ''>('asc');
    sortDisabled = signal(false);

    get sortedData(): Person[] {
        const data = [...this.originalData];
        const active = this.sortActive();
        const direction = this.sortDirection();

        if (!active || direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            const aValue = a[active as keyof Person];
            const bValue = b[active as keyof Person];

            let comparison = 0;
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                comparison = aValue.localeCompare(bValue);
            } else {
                comparison = (aValue as number) - (bValue as number);
            }

            return direction === 'asc' ? comparison : -comparison;
        });
    }

    onSortChange(event: AmwSort): void {
        this.sortActive.set(event.active);
        this.sortDirection.set(event.direction);
    }

    resetSort(): void {
        this.sortActive.set('');
        this.sortDirection.set('');
    }

    toggleDisabled(): void {
        this.sortDisabled.update(v => !v);
    }

    setSort(column: string, direction: 'asc' | 'desc'): void {
        this.sortActive.set(column);
        this.sortDirection.set(direction);
    }
}
