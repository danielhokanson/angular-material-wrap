import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwSidenavComponent } from '../../../../library/src/components/components/amw-sidenav/amw-sidenav.component';
import { SidenavConfig } from '../../../../library/src/components/components/amw-sidenav/interfaces/sidenav-config.interface';
import { SidenavItem } from '../../../../library/src/components/components/amw-sidenav/interfaces/sidenav-item.interface';
import { AmwSidenavService } from '../../../../library/src/components/services/amw-sidenav.service';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwSelectComponent } from '../../../../library/src/controls/components/amw-select/amw-select.component';
import { AmwSwitchComponent } from '../../../../library/src/controls/components/amw-switch/amw-switch.component';
import { AmwCardComponent } from '../../../../library/src/components/components';

@Component({
  selector: 'app-sidenav-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwSidenavComponent,
    AmwButtonComponent,
    AmwInputComponent,
    AmwSelectComponent,
    AmwSwitchComponent,
    AmwCardComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './sidenav-validation.component.html',
  styleUrl: './sidenav-validation.component.scss'
})
export class SidenavValidationComponent extends BaseValidationComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  currentConfig: SidenavConfig = { opened: false };
  navigationItems: SidenavItem[] = [];
  formSubmitted = false;
  showValidationErrors = false;

  itemForm: FormGroup = this.fb.group({
    id: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    label: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    icon: ['', [Validators.pattern(/^[a-zA-Z_][a-zA-Z0-9_]*$/)]],
    route: ['', [Validators.pattern(/^\/[a-zA-Z0-9\/\-_]*$/)]],
    href: ['', [Validators.pattern(/^https?:\/\/.+/)]],
    tooltip: ['', [Validators.maxLength(200)]],
    badge: ['', [Validators.maxLength(10)]],
    badgeColor: ['primary', [Validators.pattern(/^(primary|accent|warn|basic)$/)]],
    disabled: [false]
  });

  validationForm: FormGroup = this.fb.group({
    mode: ['side', [Validators.required]],
    size: ['medium', [Validators.required]],
    position: ['start', [Validators.required]],
    width: ['', [Validators.pattern(/^\d+(px|%|rem|em|vw|vh)?$/)]],
    minWidth: ['', [Validators.pattern(/^\d+(px|%|rem|em|vw|vh)?$/)]],
    maxWidth: ['', [Validators.pattern(/^\d+(px|%|rem|em|vw|vh)?$/)]],
    opened: [true],
    showToggle: [true],
    showClose: [true],
    showBackdrop: [true],
    disableClose: [false],
    fixedInViewport: [false],
    autoFocus: [true],
    restoreFocus: [true],
    responsive: [true],
    disabled: [false]
  });

  validationInfo: ValidationInfo[] = [
    { title: 'Mode', description: 'Sidenav mode is required (over, push, side)' },
    { title: 'Size', description: 'Sidenav size is required' },
    { title: 'Position', description: 'Sidenav position is required (start, end)' },
    { title: 'Width', description: 'Must include unit (px, %, rem, em, vw, vh)' },
    { title: 'Navigation Items', description: 'Configure items with validation rules' }
  ];

  constructor(private sidenavService: AmwSidenavService) {
    super();
  }

  ngOnInit(): void {
    this.setupFormSubscriptions();
    this.loadSampleData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupFormSubscriptions(): void {
    this.validationForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.currentConfig = { ...value };
      });
  }

  private loadSampleData(): void {
    this.navigationItems = [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: 'dashboard',
        route: '/dashboard',
        tooltip: 'View dashboard overview'
      },
      {
        id: 'users',
        label: 'Users',
        icon: 'people',
        route: '/users',
        tooltip: 'Manage users',
        children: [
          {
            id: 'users-list',
            label: 'All Users',
            icon: 'list',
            route: '/users/list',
            tooltip: 'View all users'
          },
          {
            id: 'users-add',
            label: 'Add User',
            icon: 'person_add',
            route: '/users/add',
            tooltip: 'Add new user'
          }
        ]
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: 'settings',
        route: '/settings',
        tooltip: 'Application settings'
      }
    ];

    this.sidenavService.setItems(this.navigationItems);
  }

  override onSubmit(): void {
    this.formSubmitted = true;
    this.showValidationErrors = true;

    if (this.validationForm.valid) {
      this.currentConfig = { ...this.validationForm.value };
      this.sidenavService.setConfig(this.currentConfig);
      this.notification.success('Success', 'Configuration updated successfully!', { duration: 3000 });
    } else {
      this.notification.error('Error', 'Please fix the validation errors', { duration: 3000 });
    }
  }

  onItemSubmit(): void {
    this.formSubmitted = true;
    this.showValidationErrors = true;

    if (this.itemForm.valid) {
      const newItem: SidenavItem = { ...this.itemForm.value };
      this.navigationItems.push(newItem);
      this.sidenavService.setItems(this.navigationItems);
      this.notification.success('Success', 'Navigation item added successfully!', { duration: 3000 });
      this.itemForm.reset();
    } else {
      this.notification.error('Error', 'Please fix the validation errors', { duration: 3000 });
    }
  }

  onSidenavOpenedChange(opened: boolean): void {
    this.currentConfig.opened = opened;
    this.validationForm.patchValue({ opened });
  }

  onItemClick(item: SidenavItem): void {
    this.notification.info('Info', `Clicked: ${item.label}`, { duration: 2000 });
  }

  resetConfig(): void {
    this.validationForm.reset({
      mode: 'side',
      size: 'medium',
      position: 'start',
      width: '',
      minWidth: '',
      maxWidth: '',
      opened: true,
      showToggle: true,
      showClose: true,
      showBackdrop: true,
      disableClose: false,
      fixedInViewport: false,
      autoFocus: true,
      restoreFocus: true,
      responsive: true,
      disabled: false
    });
    this.formSubmitted = false;
    this.showValidationErrors = false;
  }

  resetItem(): void {
    this.itemForm.reset();
    this.formSubmitted = false;
    this.showValidationErrors = false;
  }

  readonly sizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ];

  readonly modeOptions = [
    { value: 'over', label: 'Over' },
    { value: 'push', label: 'Push' },
    { value: 'side', label: 'Side' }
  ];

  readonly positionOptions = [
    { value: 'start', label: 'Start' },
    { value: 'end', label: 'End' }
  ];

  readonly badgeColorOptions = [
    { value: 'primary', label: 'Primary' },
    { value: 'accent', label: 'Accent' },
    { value: 'warn', label: 'Warn' },
    { value: 'basic', label: 'Basic' }
  ];

  hasItemError(controlName: string): boolean {
    const control = this.itemForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched || this.formSubmitted));
  }

  getItemError(controlName: string): string {
    const control = this.itemForm.get(controlName);
    if (control && control.errors) {
      if (control.errors['required']) return `${controlName} is required`;
      if (control.errors['minlength']) return `${controlName} must be at least ${control.errors['minlength'].requiredLength} characters`;
      if (control.errors['maxlength']) return `${controlName} must not exceed ${control.errors['maxlength'].requiredLength} characters`;
      if (control.errors['pattern']) return `${controlName} has invalid format`;
    }
    return '';
  }
}
