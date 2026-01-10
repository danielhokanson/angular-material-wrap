import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AmwDataTableComponent } from '../../../../library/src/controls/components/amw-data-table/amw-data-table.component';
import { MatCardModule } from '@angular/material/card';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
@Component({
    selector: 'amw-demo-data-table-validation',
    standalone: true,
    imports: [MatIconModule,
    AmwInputComponent,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    AmwButtonComponent],
    encapsulation: ViewEncapsulation.None,
    template: `
    <div class="data-table-validation-demo">
      <h3>Data Table Validation Examples</h3>
      <p>Demonstrates various validation scenarios for the data table component.</p>
      
      <div class="demo-section">
        <h4>Required Field Validation</h4>
        <mat-card>
          <mat-card-content>
            <p>This example shows validation for required fields in the data table.</p>
            <div class="placeholder-table">
              <p>Data table validation examples will be demonstrated here.</p>
              <p>This would show validation for required fields, email format, and custom rules.</p>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="demo-section">
        <h4>Email Format Validation</h4>
        <mat-card>
          <mat-card-content>
            <p>This example shows email format validation in the data table.</p>
            <div class="placeholder-table">
              <p>Email validation examples will be demonstrated here.</p>
              <p>This would show email format validation in the data table.</p>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="demo-section">
        <h4>Custom Validation Rules</h4>
        <mat-card>
          <mat-card-content>
            <p>This example shows custom validation rules for the data table.</p>
            <div class="placeholder-table">
              <p>Custom validation examples will be demonstrated here.</p>
              <p>This would show custom validation rules for the data table.</p>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
    styleUrl: './data-table-validation.component.scss'
})
export class DataTableValidationComponent implements OnInit {
    validationData = [
        { id: 1, name: '', email: 'john@example.com', age: 25, status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'invalid-email', age: 30, status: 'Inactive' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: -5, status: 'Active' }
    ];

    validationColumns = [
        { key: 'name', title: 'Name', type: 'text', required: true },
        { key: 'email', title: 'Email', type: 'email', required: true },
        { key: 'age', title: 'Age', type: 'number', required: true },
        { key: 'status', title: 'Status', type: 'select', options: ['Active', 'Inactive'] }
    ];

    validationConfig = {
        editable: true,
        showActions: true,
        validation: {
            name: { required: true, message: 'Name is required' },
            email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Valid email is required' },
            age: { required: true, min: 0, message: 'Age must be a positive number' }
        }
    };

    emailData = [
        { id: 1, name: 'John Doe', email: 'john@example.com', department: 'IT' },
        { id: 2, name: 'Jane Smith', email: 'invalid-email', department: 'HR' },
        { id: 3, name: 'Bob Johnson', email: 'bob@', department: 'Finance' }
    ];

    emailColumns = [
        { key: 'name', title: 'Name', type: 'text' },
        { key: 'email', title: 'Email', type: 'email', validation: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ } },
        { key: 'department', title: 'Department', type: 'text' }
    ];

    emailConfig = {
        editable: true,
        showActions: true,
        validation: {
            email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address' }
        }
    };

    customValidationData = [
        { id: 1, username: 'admin', password: 'weak', score: 95 },
        { id: 2, username: 'user123', password: 'StrongPass123!', score: 85 },
        { id: 3, username: 'a', password: 'password', score: 70 }
    ];

    customValidationColumns = [
        { key: 'username', title: 'Username', type: 'text' },
        { key: 'password', title: 'Password', type: 'password' },
        { key: 'score', title: 'Score', type: 'number' }
    ];

    customValidationConfig = {
        editable: true,
        showActions: true,
        validation: {
            username: {
                required: true,
                minLength: 3,
                message: 'Username must be at least 3 characters long'
            },
            password: {
                required: true,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: 'Password must be at least 8 characters with uppercase, lowercase, number and special character'
            },
            score: {
                required: true,
                min: 0,
                max: 100,
                message: 'Score must be between 0 and 100'
            }
        }
    };

    constructor() { }

    ngOnInit(): void { }

    onRowClick(row: any): void {
        console.log('Row clicked:', row);
    }

    onActionClick(action: any): void {
        console.log('Action clicked:', action);
    }
}