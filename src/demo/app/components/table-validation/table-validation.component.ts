import { Component, ViewEncapsulation, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmwTableComponent } from '../../../../lib/amw-table/amw-table.module';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';

interface TableRow {
    id: number;
    name: string;
    email: string;
    status: string;
}

@Component({
    selector: 'amw-demo-table-validation',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, AmwTableComponent, AmwButtonComponent, AmwInputComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './table-validation.component.html',
    styleUrl: './table-validation.component.scss'
})
export class TableValidationComponent {
    displayedColumns = ['id', 'name', 'email', 'status'];

    tableData = signal<TableRow[]>([
        { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' }
    ]);

    addForm: FormGroup;
    filterValue = signal('');
    selectedRow = signal<TableRow | null>(null);

    constructor(private fb: FormBuilder) {
        this.addForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            status: ['Active', Validators.required]
        });
    }

    get filteredData(): TableRow[] {
        const filter = this.filterValue().toLowerCase();
        if (!filter) return this.tableData();
        return this.tableData().filter(row =>
            row.name.toLowerCase().includes(filter) ||
            row.email.toLowerCase().includes(filter)
        );
    }

    addRow(): void {
        if (this.addForm.valid) {
            const newRow: TableRow = {
                id: this.tableData().length + 1,
                ...this.addForm.value
            };
            this.tableData.update(data => [...data, newRow]);
            this.addForm.reset({ status: 'Active' });
        }
    }

    removeRow(id: number): void {
        this.tableData.update(data => data.filter(row => row.id !== id));
    }

    selectRow(row: TableRow): void {
        this.selectedRow.set(row);
    }

    onFilterChange(value: string): void {
        this.filterValue.set(value);
    }
}
