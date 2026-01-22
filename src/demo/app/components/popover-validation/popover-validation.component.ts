import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwPopoverComponent } from '../../../../library/src/components/components/amw-popover/amw-popover.component';
import { PopoverConfig } from '../../../../library/src/components/components/amw-popover/interfaces/popover-config.interface';
import { PopoverTrigger } from '../../../../library/src/components/components/amw-popover/interfaces/popover-trigger.interface';
import { AmwPopoverService } from '../../../../library/src/components/services/amw-popover.service';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwSelectComponent } from '../../../../library/src/controls/components/amw-select/amw-select.component';
import { AmwCardComponent } from '../../../../library/src/components/components';

@Component({
  selector: 'app-popover-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwPopoverComponent,
    AmwButtonComponent,
    AmwInputComponent,
    AmwSelectComponent,
    AmwCardComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './popover-validation.component.html',
  styleUrl: './popover-validation.component.scss'
})
export class PopoverValidationComponent extends BaseValidationComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  currentConfig: PopoverConfig = { opened: false };
  currentTrigger: PopoverTrigger = {};
  formSubmitted = false;
  showValidationErrors = false;

  triggerForm: FormGroup = this.fb.group({
    type: ['click', [Validators.required]],
    disabled: [false],
    preventDefault: [false],
    stopPropagation: [false],
    delay: [0, [Validators.min(0), Validators.max(10000)]],
    closeDelay: [0, [Validators.min(0), Validators.max(10000)]],
    toggle: [true],
    escapeKey: [true],
    outsideClick: [true],
    scroll: [false],
    resize: [false],
    orientationChange: [false],
    windowBlur: [false],
    windowFocus: [false],
    windowResize: [false],
    windowScroll: [false],
    windowOrientationChange: [false],
    windowVisibilityChange: [false],
    keyboardNavigation: [true],
    focusManagement: [true],
    ariaAttributes: [true],
    ariaLabel: ['', [Validators.maxLength(200)]],
    ariaDescribedBy: ['', [Validators.maxLength(200)]],
    ariaControls: ['', [Validators.maxLength(200)]]
  });

  validationForm: FormGroup = this.fb.group({
    size: ['medium', [Validators.required]],
    position: ['bottom', [Validators.required]],
    width: ['', [Validators.pattern(/^\d+(px|%|rem|em|vw|vh)?$/)]],
    height: ['', [Validators.pattern(/^\d+(px|%|rem|em|vw|vh)?$/)]],
    minWidth: ['', [Validators.pattern(/^\d+(px|%|rem|em|vw|vh)?$/)]],
    maxWidth: ['', [Validators.pattern(/^\d+(px|%|rem|em|vw|vh)?$/)]],
    minHeight: ['', [Validators.pattern(/^\d+(px|%|rem|em|vw|vh)?$/)]],
    maxHeight: ['', [Validators.pattern(/^\d+(px|%|rem|em|vw|vh)?$/)]],
    offsetX: [0, [Validators.min(-1000), Validators.max(1000)]],
    offsetY: [0, [Validators.min(-1000), Validators.max(1000)]],
    zIndex: [1000, [Validators.min(0), Validators.max(10000)]],
    animationDuration: [300, [Validators.min(0), Validators.max(5000)]],
    animationEasing: ['cubic-bezier(0.4, 0, 0.2, 1)', [Validators.pattern(/^(cubic-bezier\([^)]+\)|ease|ease-in|ease-out|ease-in-out|linear)$/)]],
    headerTitle: ['', [Validators.maxLength(100)]],
    headerSubtitle: ['', [Validators.maxLength(200)]],
    footerText: ['', [Validators.maxLength(200)]],
    closeText: ['Close', [Validators.maxLength(50)]],
    closeIcon: ['close', [Validators.pattern(/^[a-zA-Z_][a-zA-Z0-9_]*$/)]],
    arrowColor: ['', [Validators.pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)]],
    showArrow: [true],
    showClose: [true],
    showHeader: [false],
    showFooter: [false],
    showBackdrop: [false],
    showScrollbar: [false],
    disabled: [false],
    autoFocus: [true],
    restoreFocus: [true],
    keyboardNavigation: [true],
    escapeKeyClose: [true],
    clickOutsideClose: [true],
    hoverOpen: [false],
    hoverClose: [false],
    focusOpen: [false],
    focusClose: [false],
    scrollClose: [false],
    resizeClose: [false]
  });

  validationInfo: ValidationInfo[] = [
    { title: 'Size', description: 'Popover size is required' },
    { title: 'Position', description: 'Popover position is required' },
    { title: 'Dimensions', description: 'Width/height must include unit (px, %, rem, em, vw, vh)' },
    { title: 'Offsets', description: 'X and Y offsets must be between -1000 and 1000' },
    { title: 'Trigger', description: 'Configure trigger behavior and accessibility' }
  ];

  constructor(private popoverService: AmwPopoverService) {
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

    this.triggerForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.currentTrigger = { ...value };
      });
  }

  private loadSampleData(): void {
    this.currentConfig = {
      size: 'medium',
      position: 'bottom',
      showArrow: true,
      showClose: true,
      showHeader: false,
      showFooter: false,
      showBackdrop: false,
      disabled: false,
      autoFocus: true,
      restoreFocus: true,
      keyboardNavigation: true,
      escapeKeyClose: true,
      clickOutsideClose: true,
      hoverOpen: false,
      hoverClose: false,
      focusOpen: false,
      focusClose: false,
      scrollClose: false,
      resizeClose: false,
      animationDuration: 300,
      animationEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 1000,
      offsetX: 0,
      offsetY: 0
    };

    this.currentTrigger = {
      type: 'click',
      disabled: false,
      preventDefault: false,
      stopPropagation: false,
      delay: 0,
      closeDelay: 0,
      toggle: true,
      escapeKey: true,
      outsideClick: true,
      scroll: false,
      resize: false,
      orientationChange: false,
      windowBlur: false,
      windowFocus: false,
      windowResize: false,
      windowScroll: false,
      windowOrientationChange: false,
      windowVisibilityChange: false,
      keyboardNavigation: true,
      focusManagement: true,
      ariaAttributes: true,
      ariaExpanded: false,
      ariaHasPopup: true
    };

    this.popoverService.setConfig(this.currentConfig);
    this.popoverService.setTrigger(this.currentTrigger);
  }

  override onSubmit(): void {
    this.formSubmitted = true;
    this.showValidationErrors = true;

    if (this.validationForm.valid && this.triggerForm.valid) {
      this.currentConfig = { ...this.validationForm.value };
      this.currentTrigger = { ...this.triggerForm.value };
      this.popoverService.setConfig(this.currentConfig);
      this.popoverService.setTrigger(this.currentTrigger);
      this.notification.success('Success', 'Configuration updated successfully!', { duration: 3000 });
    } else {
      this.notification.error('Error', 'Please fix the validation errors', { duration: 3000 });
    }
  }

  onPopoverOpenedChange(opened: boolean): void {
    this.currentConfig.opened = opened;
    this.validationForm.patchValue({ opened });
  }

  onPopoverBeforeOpen(): void {
    this.notification.info('Info', 'Popover is about to open', { duration: 2000 });
  }

  onPopoverAfterOpen(): void {
    this.notification.info('Info', 'Popover opened', { duration: 2000 });
  }

  onPopoverBeforeClose(): void {
    this.notification.info('Info', 'Popover is about to close', { duration: 2000 });
  }

  onPopoverAfterClose(): void {
    this.notification.info('Info', 'Popover closed', { duration: 2000 });
  }

  resetConfig(): void {
    this.validationForm.reset({
      size: 'medium',
      position: 'bottom',
      width: '',
      height: '',
      minWidth: '',
      maxWidth: '',
      minHeight: '',
      maxHeight: '',
      offsetX: 0,
      offsetY: 0,
      zIndex: 1000,
      animationDuration: 300,
      animationEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      headerTitle: '',
      headerSubtitle: '',
      footerText: '',
      closeText: 'Close',
      closeIcon: 'close',
      arrowColor: '',
      showArrow: true,
      showClose: true,
      showHeader: false,
      showFooter: false,
      showBackdrop: false,
      showScrollbar: false,
      disabled: false,
      autoFocus: true,
      restoreFocus: true,
      keyboardNavigation: true,
      escapeKeyClose: true,
      clickOutsideClose: true,
      hoverOpen: false,
      hoverClose: false,
      focusOpen: false,
      focusClose: false,
      scrollClose: false,
      resizeClose: false
    });
    this.formSubmitted = false;
    this.showValidationErrors = false;
  }

  resetTrigger(): void {
    this.triggerForm.reset({
      type: 'click',
      disabled: false,
      preventDefault: false,
      stopPropagation: false,
      delay: 0,
      closeDelay: 0,
      toggle: true,
      escapeKey: true,
      outsideClick: true,
      scroll: false,
      resize: false,
      orientationChange: false,
      windowBlur: false,
      windowFocus: false,
      windowResize: false,
      windowScroll: false,
      windowOrientationChange: false,
      windowVisibilityChange: false,
      keyboardNavigation: true,
      focusManagement: true,
      ariaAttributes: true,
      ariaLabel: '',
      ariaDescribedBy: '',
      ariaControls: ''
    });
    this.formSubmitted = false;
    this.showValidationErrors = false;
  }

  readonly sizeOptions: { value: string; label: string }[] = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ];

  readonly positionOptions: { value: string; label: string }[] = [
    { value: 'top', label: 'Top' },
    { value: 'bottom', label: 'Bottom' },
    { value: 'left', label: 'Left' },
    { value: 'right', label: 'Right' },
    { value: 'top-left', label: 'Top Left' },
    { value: 'top-right', label: 'Top Right' },
    { value: 'bottom-left', label: 'Bottom Left' },
    { value: 'bottom-right', label: 'Bottom Right' }
  ];

  readonly triggerTypeOptions: { value: string; label: string }[] = [
    { value: 'click', label: 'Click' },
    { value: 'hover', label: 'Hover' },
    { value: 'focus', label: 'Focus' },
    { value: 'manual', label: 'Manual' }
  ];

  readonly animationEasingOptions: { value: string; label: string }[] = [
    { value: 'cubic-bezier(0.4, 0, 0.2, 1)', label: 'Standard' },
    { value: 'cubic-bezier(0.25, 0.8, 0.25, 1)', label: 'Decelerated' },
    { value: 'cubic-bezier(0.4, 0, 1, 1)', label: 'Accelerated' },
    { value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', label: 'Sharp' },
    { value: 'ease', label: 'Ease' },
    { value: 'ease-in', label: 'Ease In' },
    { value: 'ease-out', label: 'Ease Out' },
    { value: 'ease-in-out', label: 'Ease In Out' },
    { value: 'linear', label: 'Linear' }
  ];

  hasTriggerError(controlName: string): boolean {
    const control = this.triggerForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched || this.formSubmitted));
  }

  getTriggerError(controlName: string): string {
    const control = this.triggerForm.get(controlName);
    if (control && control.errors) {
      if (control.errors['required']) return `${controlName} is required`;
      if (control.errors['min']) return `${controlName} must be at least ${control.errors['min'].min}`;
      if (control.errors['max']) return `${controlName} must not exceed ${control.errors['max'].max}`;
      if (control.errors['maxlength']) return `${controlName} must not exceed ${control.errors['maxlength'].requiredLength} characters`;
      if (control.errors['pattern']) return `${controlName} has invalid format`;
    }
    return '';
  }
}
