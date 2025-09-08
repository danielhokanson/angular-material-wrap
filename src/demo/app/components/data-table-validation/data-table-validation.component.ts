import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { AmwDataTableComponent } from '../../../../library/src/controls/components/amw-data-table/amw-data-table.component';
import { DataTableColumn, DataTableAction } from '../../../../library/src/controls/components/amw-data-table/interfaces';

@Component({
    selector: 'amw-demo-data-table-validation',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatCardModule,
        MatChipsModule,
        AmwDataTableComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './data-table-validation.component.html',
    styleUrl: './data-table-validation.component.scss'
})
export class DataTableValidationComponent implements OnInit {
    dataTableForm: FormGroup;
    selectedUsers: any[] = [];
    selectedUser: any = null;

    users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, department: 'Engineering', role: 'Developer', status: 'active', priority: 'high' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 28, department: 'Marketing', role: 'Manager', status: 'active', priority: 'medium' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35, department: 'Sales', role: 'Representative', status: 'inactive', priority: 'low' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', age: 32, department: 'Engineering', role: 'Senior Developer', status: 'active', priority: 'high' },
        { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', age: 29, department: 'HR', role: 'Specialist', status: 'active', priority: 'medium' },
        { id: 6, name: 'Diana Davis', email: 'diana@example.com', age: 31, department: 'Design', role: 'UX Designer', status: 'pending', priority: 'low' },
        { id: 7, name: 'Eve Miller', email: 'eve@example.com', age: 27, department: 'Sales', role: 'Junior Rep', status: 'active', priority: 'medium' },
        { id: 8, name: 'Frank Garcia', email: 'frank@example.com', age: 33, department: 'Engineering', role: 'Tech Lead', status: 'active', priority: 'high' }
    ];

    columns: DataTableColumn[] = [
        { key: 'id', label: 'ID', type: 'number', sortable: true, width: '60px' },
        { key: 'name', label: 'Name', type: 'text', sortable: true, filterable: true },
        { key: 'email', label: 'Email', type: 'text', sortable: true, filterable: true },
        { key: 'age', label: 'Age', type: 'number', sortable: true, filterable: true, width: '60px' },
        { key: 'department', label: 'Department', type: 'text', sortable: true, filterable: true },
        { key: 'role', label: 'Role', type: 'text', sortable: true, filterable: true },
        { key: 'status', label: 'Status', type: 'text', sortable: true, filterable: true, width: '100px' },
        { key: 'priority', label: 'Priority', type: 'text', sortable: true, filterable: true, width: '80px' }
    ];

    actions: DataTableAction[] = [
        { key: 'edit', label: 'Edit', icon: 'edit', color: 'primary' },
        { key: 'delete', label: 'Delete', icon: 'delete', color: 'warn' }
    ];

    constructor(
        private fb: FormBuilder,
        private snackBar: MatSnackBar
    ) {
        this.dataTableForm = this.fb.group({
            selectedUsers: [[], Validators.required],
            selectedUser: [null, Validators.required],
            minSelection: [2, [Validators.required, Validators.min(1)]],
            maxSelection: [5, [Validators.required, Validators.min(1)]]
        });
    }

    ngOnInit() {
        // Set initial values
        this.dataTableForm.patchValue({
            selectedUsers: this.selectedUsers,
            selectedUser: this.selectedUser
        });
    }

    onSelectionChange(selection: any[]) {
        this.selectedUsers = selection;
        this.dataTableForm.patchValue({ selectedUsers: selection });
        this.validateSelection();
    }

    onActionClick(event: { action: DataTableAction; row: any; index: number }) {
        const { action, row } = event;

        if (action.key === 'edit') {
            this.editUser(row);
        } else if (action.key === 'delete') {
            this.deleteUser(row);
        }
    }

    editUser(user: any) {
        this.snackBar.open(`Edit user: ${user.name}`, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
        });
    }

    deleteUser(user: any) {
        this.snackBar.open(`Delete user: ${user.name}`, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
        });
    }

    validateSelection() {
        const selectedUsers = this.dataTableForm.get('selectedUsers')?.value || [];
        const minSelection = this.dataTableForm.get('minSelection')?.value || 1;
        const maxSelection = this.dataTableForm.get('maxSelection')?.value || 10;

        let errors: any = {};

        if (selectedUsers.length === 0) {
            errors['required'] = true;
        } else if (selectedUsers.length < minSelection) {
            errors['minSelection'] = { required: minSelection, actual: selectedUsers.length };
        } else if (selectedUsers.length > maxSelection) {
            errors['maxSelection'] = { max: maxSelection, actual: selectedUsers.length };
        }

        if (Object.keys(errors).length > 0) {
            this.dataTableForm.get('selectedUsers')?.setErrors(errors);
        } else {
            this.dataTableForm.get('selectedUsers')?.setErrors(null);
        }
    }

    onSubmit() {
        if (this.dataTableForm.valid) {
            const selectedUsers = this.dataTableForm.get('selectedUsers')?.value || [];
            this.snackBar.open(`Form submitted successfully! Selected ${selectedUsers.length} users.`, 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
            console.log('Form values:', this.dataTableForm.value);
        } else {
            const errors = this.dataTableForm.get('selectedUsers')?.errors;
            let message = 'Please fix the validation errors';

            if (errors?.['required']) {
                message = 'Please select at least one user';
            } else if (errors?.['minSelection']) {
                const min = errors['minSelection'].required;
                message = `Please select at least ${min} users`;
            } else if (errors?.['maxSelection']) {
                const max = errors['maxSelection'].max;
                message = `Please select no more than ${max} users`;
            }

            this.snackBar.open(message, 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
        }
    }

    onReset() {
        this.dataTableForm.reset();
        this.selectedUsers = [];
        this.selectedUser = null;
    }
}
