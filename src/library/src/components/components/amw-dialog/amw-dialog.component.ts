import { Component, Input, Output, EventEmitter, ViewEncapsulation, forwardRef, ContentChild, TemplateRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BaseComponent } from '../../../controls/components/base/base.component';
import { DialogConfig, DialogType, DialogSize, DialogPosition } from './interfaces';

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
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: forwardRef(() => AmwDialogComponent),
      multi: true
    }
  ],
  template: `
    <div class="amw-dialog" [class]="dialogClasses">
      <!-- Header -->
      <div *ngIf="showHeader" class="amw-dialog__header">
        <ng-container [ngTemplateOutlet]="headerTemplate" *ngIf="headerTemplate; else defaultHeader"></ng-container>
        
        <ng-template #defaultHeader>
          <h2 class="amw-dialog__title">{{ title }}</h2>
          <button 
            *ngIf="showCloseButton" 
            mat-icon-button 
            class="amw-dialog__close"
            (click)="onCloseClick()"
            [disabled]="disabled || loading">
            <mat-icon>close</mat-icon>
          </button>
        </ng-template>
      </div>
      
      <!-- Content -->
      <div class="amw-dialog__content">
        <ng-container [ngTemplateOutlet]="contentTemplate" *ngIf="contentTemplate; else defaultContent"></ng-container>
        
        <ng-template #defaultContent>
          <p class="amw-dialog__text">{{ content }}</p>
        </ng-template>
      </div>
      
      <!-- Footer -->
      <div *ngIf="showFooter && actions.length > 0" class="amw-dialog__footer">
        <ng-container [ngTemplateOutlet]="footerTemplate" *ngIf="footerTemplate; else defaultFooter"></ng-container>
        
        <ng-template #defaultFooter>
          <button 
            *ngFor="let action of actions; let i = index"
            mat-button
            [color]="action.color || 'primary'"
            [disabled]="action.disabled || disabled || loading"
            (click)="onActionClick(action, i)"
            class="amw-dialog__action">
            <mat-icon *ngIf="action.icon" class="amw-dialog__action-icon">{{ action.icon }}</mat-icon>
            {{ action.label }}
          </button>
        </ng-template>
      </div>
      
      <!-- Loading Overlay -->
      <div *ngIf="loading" class="amw-dialog__loading">
        <mat-spinner diameter="40"></mat-spinner>
        <p>Loading...</p>
      </div>
    </div>
    `
})
export class AmwDialogComponent extends BaseComponent implements OnInit, OnDestroy {
  @Input() config: DialogConfig = {};
  @Input() type: DialogType = 'standard';
  @Input() size: DialogSize = 'medium';
  @Input() position: DialogPosition = 'center';
  @Input() title = '';
  @Input() content = '';
  @Input() actions: { label: string; icon?: string; color?: 'primary' | 'accent' | 'warn'; disabled?: boolean; action?: string }[] = [];
  @Input() showCloseButton = true;
  @Input() showHeader = true;
  @Input() showFooter = true;
  @Input() loading = false;
  @Input() override disabled = false;
  @Input() closable = true;
  @Input() backdrop = true;
  @Input() escapeKeyClose = true;
  @Input() clickOutsideClose = true;
  @Input() maxWidth = '';
  @Input() maxHeight = '';
  @Input() minWidth = '';
  @Input() minHeight = '';
  @Input() width = '';
  @Input() height = '';
  @Input() autoFocus = true;
  @Input() restoreFocus = true;
  @Input() hasBackdrop = true;
  @Input() backdropClass = '';
  @Input() panelClass = '';

  @Output() dialogOpen = new EventEmitter<void>();
  @Output() dialogClose = new EventEmitter<any>();
  @Output() dialogAfterOpen = new EventEmitter<void>();
  @Output() dialogAfterClose = new EventEmitter<any>();
  @Output() actionClick = new EventEmitter<{ action: any; index: number }>();
  @Output() closeClick = new EventEmitter<void>();

  @ContentChild('dialogHeader') headerTemplate?: TemplateRef<any>;
  @ContentChild('dialogContent') contentTemplate?: TemplateRef<any>;
  @ContentChild('dialogFooter') footerTemplate?: TemplateRef<any>;

  private dialogRef?: MatDialogRef<any>;

  constructor(private dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    // Auto-open dialog if configured
    if (this.config.autoOpen) {
      this.open();
    }
  }

  ngOnDestroy() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  open() {
    if (this.disabled || this.loading) {
      return;
    }

    const dialogConfig = this.getDialogConfig();

    this.dialogRef = this.dialog.open(AmwDialogComponent, {
      ...dialogConfig,
      data: {
        title: this.title,
        content: this.content,
        actions: this.actions,
        showCloseButton: this.showCloseButton,
        showHeader: this.showHeader,
        showFooter: this.showFooter,
        loading: this.loading,
        disabled: this.disabled,
        closable: this.closable,
        type: this.type,
        size: this.size,
        headerTemplate: this.headerTemplate,
        contentTemplate: this.contentTemplate,
        footerTemplate: this.footerTemplate,
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
    if (this.dialogRef) {
      this.dialogRef.close(result);
      this.dialogClose.emit(result);
    }
  }

  onActionClick(action: any, index: number) {
    if (!action.disabled && !this.disabled && !this.loading) {
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
    if (this.closable && !this.disabled && !this.loading) {
      this.closeClick.emit();
      this.close('close');
    }
  }

  get dialogClasses(): string {
    const classes = ['amw-dialog'];

    if (this.type) classes.push(`amw-dialog--${this.type}`);
    if (this.size) classes.push(`amw-dialog--${this.size}`);
    if (this.position) classes.push(`amw-dialog--${this.position}`);
    if (this.disabled) classes.push('amw-dialog--disabled');
    if (this.loading) classes.push('amw-dialog--loading');

    return classes.join(' ');
  }

  private getDialogConfig() {
    const config: any = {
      width: this.getDialogWidth(),
      height: this.getDialogHeight(),
      maxWidth: this.maxWidth || this.getMaxWidth(),
      maxHeight: this.maxHeight || this.getMaxHeight(),
      minWidth: this.minWidth || this.getMinWidth(),
      minHeight: this.minHeight || this.getMinHeight(),
      position: this.getDialogPosition(),
      hasBackdrop: this.hasBackdrop,
      backdropClass: this.backdropClass || this.getBackdropClass(),
      panelClass: this.panelClass || this.getPanelClass(),
      disableClose: !this.closable || !this.escapeKeyClose,
      autoFocus: this.autoFocus,
      restoreFocus: this.restoreFocus,
      closeOnNavigation: true
    };

    // Apply custom config
    if (this.config) {
      Object.assign(config, this.config);
    }

    return config;
  }

  private getDialogWidth(): string {
    if (this.width) return this.width;

    switch (this.size) {
      case 'small': return '300px';
      case 'medium': return '500px';
      case 'large': return '800px';
      case 'fullscreen': return '100vw';
      default: return '500px';
    }
  }

  private getDialogHeight(): string {
    if (this.height) return this.height;

    switch (this.size) {
      case 'small': return '200px';
      case 'medium': return '400px';
      case 'large': return '600px';
      case 'fullscreen': return '100vh';
      default: return '400px';
    }
  }

  private getMaxWidth(): string {
    switch (this.size) {
      case 'small': return '400px';
      case 'medium': return '600px';
      case 'large': return '900px';
      case 'fullscreen': return '100vw';
      default: return '600px';
    }
  }

  private getMaxHeight(): string {
    switch (this.size) {
      case 'small': return '300px';
      case 'medium': return '500px';
      case 'large': return '700px';
      case 'fullscreen': return '100vh';
      default: return '500px';
    }
  }

  private getMinWidth(): string {
    switch (this.size) {
      case 'small': return '250px';
      case 'medium': return '400px';
      case 'large': return '600px';
      case 'fullscreen': return '100vw';
      default: return '400px';
    }
  }

  private getMinHeight(): string {
    switch (this.size) {
      case 'small': return '150px';
      case 'medium': return '300px';
      case 'large': return '400px';
      case 'fullscreen': return '100vh';
      default: return '300px';
    }
  }

  private getDialogPosition() {
    switch (this.position) {
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

    if (this.type) classes.push(`amw-dialog-backdrop--${this.type}`);
    if (this.size) classes.push(`amw-dialog-backdrop--${this.size}`);

    return classes.join(' ');
  }

  private getPanelClass(): string {
    const classes = ['amw-dialog-panel'];

    if (this.type) classes.push(`amw-dialog-panel--${this.type}`);
    if (this.size) classes.push(`amw-dialog-panel--${this.size}`);
    if (this.position) classes.push(`amw-dialog-panel--${this.position}`);

    return classes.join(' ');
  }
}