import { Component, ViewEncapsulation, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmwSortDirective, AmwSortHeaderComponent, AmwSort } from '../../../../lib/amw-sort/amw-sort.module';
import { AmwTableComponent } from '../../../../lib/amw-table/amw-table.module';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: string;
}

@Component({
    selector: 'amw-demo-sort-validation',
    standalone: true,
    imports: [CommonModule, AmwSortDirective, AmwSortHeaderComponent, AmwTableComponent, AmwButtonComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './sort-validation.component.html',
    styleUrl: './sort-validation.component.scss'
})
export class SortValidationComponent {
    displayedColumns = ['id', 'name', 'price', 'stock', 'category'];

    products: Product[] = [
        { id: 1, name: 'Laptop', price: 999.99, stock: 50, category: 'Electronics' },
        { id: 2, name: 'Keyboard', price: 79.99, stock: 150, category: 'Electronics' },
        { id: 3, name: 'Mouse', price: 29.99, stock: 200, category: 'Electronics' },
        { id: 4, name: 'Desk Chair', price: 299.99, stock: 30, category: 'Furniture' },
        { id: 5, name: 'Monitor', price: 349.99, stock: 75, category: 'Electronics' },
        { id: 6, name: 'Desk', price: 449.99, stock: 20, category: 'Furniture' },
        { id: 7, name: 'Headphones', price: 149.99, stock: 100, category: 'Audio' },
        { id: 8, name: 'Webcam', price: 89.99, stock: 80, category: 'Electronics' }
    ];

    sortActive = signal('');
    sortDirection = signal<'asc' | 'desc' | ''>('');
    sortHistory = signal<string[]>([]);

    get sortedProducts(): Product[] {
        const active = this.sortActive();
        const direction = this.sortDirection();

        if (!active || direction === '') {
            return [...this.products];
        }

        return [...this.products].sort((a, b) => {
            const aValue = a[active as keyof Product];
            const bValue = b[active as keyof Product];

            let comparison = 0;
            if (typeof aValue === 'string') {
                comparison = aValue.localeCompare(bValue as string);
            } else {
                comparison = (aValue as number) - (bValue as number);
            }

            return direction === 'asc' ? comparison : -comparison;
        });
    }

    onSortChange(event: AmwSort): void {
        this.sortActive.set(event.active);
        this.sortDirection.set(event.direction);

        if (event.active && event.direction) {
            this.sortHistory.update(history => [
                ...history,
                `${event.active} (${event.direction})`
            ].slice(-5));
        }
    }

    clearHistory(): void {
        this.sortHistory.set([]);
    }

    validateSortState(): string {
        const active = this.sortActive();
        const direction = this.sortDirection();

        if (!active && !direction) {
            return 'No sort applied - showing default order';
        }
        if (active && !direction) {
            return 'Warning: Active column set but no direction';
        }
        if (!active && direction) {
            return 'Warning: Direction set but no active column';
        }
        return `Valid: Sorting by "${active}" in ${direction}ending order`;
    }
}
