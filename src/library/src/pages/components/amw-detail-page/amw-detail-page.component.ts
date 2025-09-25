import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectorRef, Inject, Optional, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, takeUntil, BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

// Import interfaces
import {
    DetailPageConfig,
    DetailPageField,
    DetailPageRelatedData,
    DetailPageColumn,
    DetailPageData,
    DetailPageDataSource
} from './interfaces';
import { DefaultDetailPageDataSource } from './services/default-detail-page-data-source.service';


@Component({
    selector: 'amw-detail-page',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatTabsModule,
        MatExpansionModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatProgressSpinnerModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-detail-page.component.html',
    styleUrl: './amw-detail-page.component.scss',
    providers: [
        { provide: 'DETAIL_PAGE_DATA_SOURCE', useFactory: () => new DefaultDetailPageDataSource() }
    ]
})
export class AmwDetailPageComponent implements OnInit, OnDestroy {
    @Input() config: DetailPageConfig = { fields: [] };
    @Input() itemId?: string;
    @Input() dataSource?: DetailPageDataSource;
    @Input() realTimeUpdates = false;

    @Output() editClick = new EventEmitter<any>();
    @Output() deleteClick = new EventEmitter<any>();
    @Output() printClick = new EventEmitter<any>();
    @Output() shareClick = new EventEmitter<any>();
    @Output() actionClick = new EventEmitter<{ action: string; item: any }>();

    // Current state
    currentConfig: DetailPageConfig = { fields: [] };
    currentData: DetailPageData = {
        item: {},
        sections: [],
        relatedData: []
    };

    // UI state
    loading = false;
    error: string | null = null;

    // Subject for component destruction
    private destroy$ = new Subject<void>();

    constructor(
        private cdr: ChangeDetectorRef,
        private snackBar: MatSnackBar,
        @Optional() @Inject('DETAIL_PAGE_DATA_SOURCE') private injectedDataSource?: DetailPageDataSource
    ) { }

    ngOnInit(): void {
        this.initializeConfig();
        if (this.itemId) {
            this.loadData();
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private initializeConfig(): void {
        this.currentConfig = {
            title: 'Detail Page',
            subtitle: 'View item details',
            showEditButton: true,
            showDeleteButton: true,
            showPrintButton: false,
            showShareButton: false,
            customActions: [],
            customClasses: [],
            customStyles: {},
            ...this.config
        };
    }

    private loadData(): void {
        if (!this.itemId) return;

        this.loading = true;
        this.error = null;

        const dataSource = this.dataSource || this.injectedDataSource;
        if (!dataSource) {
            this.error = 'No data source provided';
            this.loading = false;
            return;
        }

        dataSource.getData(this.itemId).pipe(
            takeUntil(this.destroy$)
        ).subscribe({
            next: (data) => {
                this.currentData = data;
                this.loading = false;
                this.cdr.detectChanges();
            },
            error: (err) => {
                this.error = err.message || 'Failed to load data';
                this.loading = false;
                this.cdr.detectChanges();
            }
        });
    }

    // Public methods for template
    onEdit(): void {
        this.editClick.emit(this.currentData.item);
    }

    onDelete(): void {
        this.deleteClick.emit(this.currentData.item);
    }

    onPrint(): void {
        this.printClick.emit(this.currentData.item);
    }

    onShare(): void {
        this.shareClick.emit(this.currentData.item);
    }

    onActionClick(action: string): void {
        this.actionClick.emit({ action, item: this.currentData.item });
    }

    onRefresh(): void {
        this.loadData();
    }

    isFieldVisible(field: DetailPageField): boolean {
        return field.visible !== false;
    }

    isRelatedDataVisible(related: DetailPageRelatedData): boolean {
        return related.visible !== false;
    }

    getFieldValue(field: DetailPageField): any {
        return this.currentData.item[field.key] || field.value;
    }

    getColumnValue(row: any, column: DetailPageColumn): any {
        return row[column.key];
    }
}