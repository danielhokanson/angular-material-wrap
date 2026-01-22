import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwCardComponent } from '../../../../library/src/components/components';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';

@Component({
  selector: 'amw-demo-data-table-validation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwCardComponent,
    AmwInputComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './data-table-validation.component.html',
  styleUrl: './data-table-validation.component.scss'
})
export class DataTableValidationComponent extends BaseValidationComponent {
  selectedUsers: { id: number; name: string; department: string }[] = [];

  users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', department: 'IT' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'HR' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', department: 'Finance' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', department: 'Marketing' }
  ];

  columns = [
    { key: 'name', title: 'Name', type: 'text' },
    { key: 'email', title: 'Email', type: 'email' },
    { key: 'department', title: 'Department', type: 'text' }
  ];

  actions = [
    { label: 'Edit', icon: 'edit', action: 'edit' },
    { label: 'Delete', icon: 'delete', action: 'delete' }
  ];

  validationForm: FormGroup = this.fb.group({
    selectedUsers: [[], Validators.required],
    minSelection: [1, [Validators.required, Validators.min(1)]],
    maxSelection: [3, [Validators.required, Validators.min(1)]]
  });

  validationInfo: ValidationInfo[] = [
    { title: 'User Selection', description: 'Must select at least one user' },
    { title: 'Minimum Selection', description: 'Configure minimum number of users to select' },
    { title: 'Maximum Selection', description: 'Configure maximum number of users to select' },
    { title: 'Dynamic Validation', description: 'Selection limits are configurable' }
  ];

  onSelectionChange(selection: { id: number; name: string; department: string }[]) {
    this.selectedUsers = selection;
    this.validationForm.patchValue({ selectedUsers: selection });
    this.validateSelection();
  }

  toggleUserSelection(user: { id: number; name: string; email: string; department: string }) {
    const isSelected = this.selectedUsers.some(u => u.id === user.id);
    if (isSelected) {
      this.onSelectionChange(this.selectedUsers.filter(u => u.id !== user.id));
    } else {
      this.onSelectionChange([...this.selectedUsers, user]);
    }
  }

  onActionClick(action: { action: string; row: unknown }) {
    console.log('Action clicked:', action);
  }

  validateSelection() {
    const selectedUsers = this.validationForm.get('selectedUsers')?.value || [];
    const minSelection = this.validationForm.get('minSelection')?.value || 1;
    const maxSelection = this.validationForm.get('maxSelection')?.value || 3;

    const errors: Record<string, unknown> = {};

    if (selectedUsers.length === 0) {
      errors['required'] = true;
    } else if (selectedUsers.length < minSelection) {
      errors['minSelection'] = { required: minSelection, actual: selectedUsers.length };
    } else if (selectedUsers.length > maxSelection) {
      errors['maxSelection'] = { max: maxSelection, actual: selectedUsers.length };
    }

    if (Object.keys(errors).length > 0) {
      this.validationForm.get('selectedUsers')?.setErrors(errors);
    } else {
      this.validationForm.get('selectedUsers')?.setErrors(null);
    }
  }
}
