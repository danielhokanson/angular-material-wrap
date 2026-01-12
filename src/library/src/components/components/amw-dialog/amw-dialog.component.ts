import { Component, input, output, ViewEncapsulation, forwardRef, contentChild, TemplateRef, OnInit, OnDestroy, Inject, computed, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogConfig, DialogType, DialogSize, DialogPosition } from './interfaces';
import { AmwProgressSpinnerComponent } from '../amw-progress-spinner/amw-progress-spinner.component';
import { AmwButtonComponent } from '../../../controls/components/amw-button/amw-button.component';

/**
 * Angular Material Wrap Dialog Component
 * 
 * A comprehensive dialog component that wraps Angular Material's mat-dialog
 * with additional features and Material 3 theming support.
 * 
 * @example
 * ```html
 * <amw-dialog
 *   [title]="'Confirm Action'"
 *   [content]="'Are you sure you want to proceed?'"
 *   [type]="'confirm'"
 *   [size]="'medium'"
 *   [actions]="dialogActions"
 *   [loading]="false"
 *   (actionClick)="onActionClick($event)"
 *   (closeClick)="onCloseClick()">
 * </amw-dialog>
 * ```
 * 
 * @example
 * ```typescript
 * export class MyComponent {
 *   dialogActions = [
 *     { label: 'Cancel', action: 'cancel', color: 'warn' },
 *     { label: 'Confirm', action: 'confirm', color: 'primary' }
 *   ];
 * 
 *   onActionClick(event: { action: any; index: number }) {
 *     if (event.action.action === 'confirm') {
 *       this.performAction();
 *     }
 *   }
 * 
 *   onCloseClick() {
 *     this.dialogRef.close();
 *   }
 * }
 * ```
 */
@Component({
  selector: 'amw-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    AmwButtonComponent,
    MatIconModule,
    AmwProgressSpinnerComponent
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: forwardRef(() => AmwDialogComponent),
      multi: true
    }
  ],
  templateUrl: './amw-dialog.component.html'
})
export class AmwDialogComponent implements OnInit, OnDestroy {
  // Input signals
  config = input<DialogConfig>({});
  type = input<DialogType>('standard');
  size = input<DialogSize>('medium');
  position = input<DialogPosition>('center');
  title = input<string>('');
  content = input<string>('');
  actions = input<{ label: string; icon?: string; color?: 'primary' | 'accent' | 'warn'; disabled?: boolean; action?: string }[]>([]);
  showCloseButton = input<boolean>(true);
  showHeader = input<boolean>(true);
  showFooter = input<boolean>(true);
  loading = input<boolean>(false);
  disabled = input<boolean>(false);
  closable = input<boolean>(true);
  backdrop = input<boolean>(true);
  escapeKeyClose = input<boolean>(true);
  clickOutsideClose = input<boolean>(true);
  maxWidth = input<string>('');
  maxHeight = input<string>('');
  minWidth = input<string>('');
  minHeight = input<string>('');
  width = input<string>('');
  height = input<string>('');
  autoFocus = input<boolean>(true);
  restoreFocus = input<boolean>(true);
  hasBackdrop = input<boolean>(true);
  backdropClass = input<string>('');
  panelClass = input<string>('');

  // Output signals
  dialogOpen = output<void>();
  dialogClose = output<any>();
  dialogAfterOpen = output<void>();
  dialogAfterClose = output<any>();
  actionClick = output<{ action: any; index: number }>();
  closeClick = output<void>();

  // Content child signals
  headerTemplate = contentChild<TemplateRef<any>>('dialogHeader');
  contentTemplate = contentChild<TemplateRef<any>>('dialogContent');
  footerTemplate = contentChild<TemplateRef<any>>('dialogFooter');

  private dialogRef?: MatDialogRef<any>;

  // Computed values that combine input signals with injected data
  effectiveTitle = computed(() => this.data?.title || this.title());
  effectiveContent = computed(() => this.data?.content || this.content());
  effectiveType = computed(() => this.data?.type ? this.sanitizeClassName(this.data.type) as DialogType : this.type());
  effectiveSize = computed(() => this.data?.size ? this.sanitizeClassName(this.data.size) as DialogSize : this.size());
  effectivePosition = computed(() => this.data?.position ? this.sanitizeClassName(this.data.position) as DialogPosition : this.position());
  effectiveActions = computed(() => this.data?.actions || this.actions());
  effectiveShowCloseButton = computed(() => this.data?.showCloseButton !== undefined ? this.data.showCloseButton : this.showCloseButton());
  effectiveShowHeader = computed(() => this.data?.showHeader !== undefined ? this.data.showHeader : this.showHeader());
  effectiveShowFooter = computed(() => this.data?.showFooter !== undefined ? this.data.showFooter : this.showFooter());
  effectiveLoading = computed(() => this.data?.loading || this.loading());
  effectiveDisabled = computed(() => this.data?.disabled || this.disabled());
  effectiveClosable = computed(() => this.data?.closable !== undefined ? this.data.closable : this.closable());
  effectiveBackdrop = computed(() => this.data?.backdrop !== undefined ? this.data.backdrop : this.backdrop());
  effectiveEscapeKeyClose = computed(() => this.data?.escapeKeyClose !== undefined ? this.data.escapeKeyClose : this.escapeKeyClose());
  effectiveClickOutsideClose = computed(() => this.data?.clickOutsideClose !== undefined ? this.data.clickOutsideClose : this.clickOutsideClose());
  effectiveAutoFocus = computed(() => this.data?.autoFocus !== undefined ? this.data.autoFocus : this.autoFocus());
  effectiveRestoreFocus = computed(() => this.data?.restoreFocus !== undefined ? this.data.restoreFocus : this.restoreFocus());
  effectiveHasBackdrop = computed(() => this.data?.hasBackdrop !== undefined ? this.data.hasBackdrop : this.hasBackdrop());
  effectiveBackdropClass = computed(() => this.data?.backdropClass ? this.sanitizeClassName(this.data.backdropClass) : this.backdropClass());
  effectivePanelClass = computed(() => this.data?.panelClass ? this.sanitizeClassName(this.data.panelClass) : this.panelClass());

  constructor(
    private dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any = {},
    @Optional() private matDialogRef: MatDialogRef<AmwDialogComponent>
  ) {}

  ngOnInit() {
    // Auto-open dialog if configured
    if (this.config().autoOpen) {
      this.open();
    }
  }

  ngOnDestroy() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  open() {
    if (this.effectiveDisabled() || this.effectiveLoading()) {
      return;
    }

    const dialogConfig = this.getDialogConfig();

    this.dialogRef = this.dialog.open(AmwDialogComponent, {
      ...dialogConfig,
      data: {
        title: this.effectiveTitle(),
        content: this.effectiveContent(),
        actions: this.effectiveActions(),
        showCloseButton: this.effectiveShowCloseButton(),
        showHeader: this.effectiveShowHeader(),
        showFooter: this.effectiveShowFooter(),
        loading: this.effectiveLoading(),
        disabled: this.effectiveDisabled(),
        closable: this.effectiveClosable(),
        type: this.effectiveType(),
        size: this.effectiveSize(),
        headerTemplate: this.headerTemplate(),
        contentTemplate: this.contentTemplate(),
        footerTemplate: this.footerTemplate(),
        onActionClick: (action: any, index: number) => this.onActionClick(action, index),
        onCloseClick: () => this.onCloseClick()
      }
    });

    this.dialogRef.afterOpened().subscribe(() => {
      this.dialogAfterOpen.emit();
    });

    this.dialogRef.afterClosed().subscribe((result) => {
      this.dialogAfterClose.emit(result);
    });

    this.dialogOpen.emit();
  }

  close(result?: any) {
    if (this.matDialogRef) {
      this.matDialogRef.close(result);
      this.dialogClose.emit(result);
    }
  }

  onActionClick(action: any, index: number) {
    if (!action.disabled && !this.effectiveDisabled() && !this.effectiveLoading()) {
      this.actionClick.emit({ action, index });

      // Handle built-in actions
      if (action.action === 'close') {
        this.close(action);
      } else if (action.action === 'cancel') {
        this.close('cancel');
      } else if (action.action === 'confirm') {
        this.close('confirm');
      }
    }
  }

  onCloseClick() {
    if (this.effectiveClosable() && !this.effectiveDisabled() && !this.effectiveLoading()) {
      this.closeClick.emit();
      this.close('close');
    }
  }

  get dialogClasses(): string {
    const classes = ['amw-dialog'];
    const typeValue = this.effectiveType();
    const sizeValue = this.effectiveSize();
    const positionValue = this.effectivePosition();

    // Default to 'standard' if no type is specified
    const dialogType = typeValue && typeof typeValue === 'string' && typeValue.trim() ? typeValue : 'standard';
    const cleanType = this.sanitizeClassName(dialogType);
    if (cleanType) {
      classes.push(`amw-dialog--${cleanType}`);
    }
    if (sizeValue && typeof sizeValue === 'string' && sizeValue.trim()) {
      const cleanSize = this.sanitizeClassName(sizeValue);
      if (cleanSize) {
        classes.push(`amw-dialog--${cleanSize}`);
      }
    }
    if (positionValue && typeof positionValue === 'string' && positionValue.trim()) {
      const cleanPosition = this.sanitizeClassName(positionValue);
      if (cleanPosition) {
        classes.push(`amw-dialog--${cleanPosition}`);
      }
    }
    if (this.effectiveDisabled()) classes.push('amw-dialog--disabled');
    if (this.effectiveLoading()) classes.push('amw-dialog--loading');

    const result = classes.join(' ');

    // Additional validation to ensure no whitespace in individual class names
    const validatedClasses = result.split(' ').map(cls => {
      if (cls && cls.trim() !== cls) {
        return cls.trim();
      }
      return cls;
    }).filter(cls => cls && cls.length > 0);

    return validatedClasses.join(' ');
  }

  private sanitizeClassName(value: string): string {
    if (!value || typeof value !== 'string') return '';

    // First, ensure we have a string and trim it
    let sanitized = String(value).trim();

    // If empty after trim, return empty string
    if (!sanitized) return '';

    // Replace any whitespace (including tabs, newlines, etc.) with hyphens
    sanitized = sanitized.replace(/\s+/g, '-');

    // Remove any characters that are not alphanumeric, hyphens, or underscores
    sanitized = sanitized.replace(/[^a-zA-Z0-9-_]/g, '');

    // Replace multiple consecutive hyphens with single hyphen
    sanitized = sanitized.replace(/-+/g, '-');

    // Remove leading and trailing hyphens
    sanitized = sanitized.replace(/^-+|-+$/g, '');

    // Final check: ensure no whitespace characters remain
    sanitized = sanitized.replace(/\s/g, '');

    // Return empty string if nothing valid remains
    return sanitized || '';
  }

  private getDialogConfig() {
    const config: any = {
      width: this.getDialogWidth(),
      height: this.getDialogHeight(),
      maxWidth: this.maxWidth() || this.getMaxWidth(),
      maxHeight: this.maxHeight() || this.getMaxHeight(),
      minWidth: this.minWidth() || this.getMinWidth(),
      minHeight: this.minHeight() || this.getMinHeight(),
      position: this.getDialogPosition(),
      hasBackdrop: this.effectiveHasBackdrop(),
      backdropClass: this.effectiveBackdropClass() || this.getBackdropClass(),
      panelClass: this.effectivePanelClass() || this.getPanelClass(),
      disableClose: !this.effectiveClosable() || !this.effectiveEscapeKeyClose(),
      autoFocus: this.effectiveAutoFocus(),
      restoreFocus: this.effectiveRestoreFocus(),
      closeOnNavigation: true
    };

    // Apply custom config
    const configValue = this.config();
    if (configValue) {
      Object.assign(config, configValue);
    }

    return config;
  }

  private getDialogWidth(): string {
    const widthValue = this.width();
    if (widthValue) return widthValue;

    switch (this.effectiveSize()) {
      case 'small': return '300px';
      case 'medium': return '500px';
      case 'large': return '800px';
      case 'fullscreen': return '100vw';
      default: return '500px';
    }
  }

  private getDialogHeight(): string {
    const heightValue = this.height();
    if (heightValue) return heightValue;

    switch (this.effectiveSize()) {
      case 'small': return '200px';
      case 'medium': return '400px';
      case 'large': return '600px';
      case 'fullscreen': return '100vh';
      default: return '400px';
    }
  }

  private getMaxWidth(): string {
    switch (this.effectiveSize()) {
      case 'small': return '400px';
      case 'medium': return '600px';
      case 'large': return '900px';
      case 'fullscreen': return '100vw';
      default: return '600px';
    }
  }

  private getMaxHeight(): string {
    switch (this.effectiveSize()) {
      case 'small': return '300px';
      case 'medium': return '500px';
      case 'large': return '700px';
      case 'fullscreen': return '100vh';
      default: return '500px';
    }
  }

  private getMinWidth(): string {
    switch (this.effectiveSize()) {
      case 'small': return '250px';
      case 'medium': return '400px';
      case 'large': return '600px';
      case 'fullscreen': return '100vw';
      default: return '400px';
    }
  }

  private getMinHeight(): string {
    switch (this.effectiveSize()) {
      case 'small': return '150px';
      case 'medium': return '300px';
      case 'large': return '400px';
      case 'fullscreen': return '100vh';
      default: return '300px';
    }
  }

  private getDialogPosition() {
    switch (this.effectivePosition()) {
      case 'top': return { top: '20px' };
      case 'bottom': return { bottom: '20px' };
      case 'left': return { left: '20px' };
      case 'right': return { right: '20px' };
      case 'center': return {};
      default: return {};
    }
  }

  private getBackdropClass(): string {
    const classes = ['amw-dialog-backdrop'];
    const typeValue = this.effectiveType();
    const sizeValue = this.effectiveSize();

    if (typeValue) classes.push(`amw-dialog-backdrop--${typeValue}`);
    if (sizeValue) classes.push(`amw-dialog-backdrop--${sizeValue}`);

    return classes.join(' ');
  }

  private getPanelClass(): string {
    const classes = ['amw-dialog-panel'];
    const typeValue = this.effectiveType();
    const sizeValue = this.effectiveSize();
    const positionValue = this.effectivePosition();

    if (typeValue) classes.push(`amw-dialog-panel--${typeValue}`);
    if (sizeValue) classes.push(`amw-dialog-panel--${sizeValue}`);
    if (positionValue) classes.push(`amw-dialog-panel--${positionValue}`);

    return classes.join(' ');
  }
}