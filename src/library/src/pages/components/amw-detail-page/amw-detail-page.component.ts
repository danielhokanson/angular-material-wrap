import { Component, input, output, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectorRef, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';

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
import { AmwProgressSpinnerComponent } from '../../../components/components/amw-progress-spinner/amw-progress-spinner.component';
import { AmwButtonComponent } from '../../../controls/components/amw-button/amw-button.component';
import { AmwTooltipDirective } from '../../../directives';


@Component({
    selector: 'amw-detail-page',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        AmwButtonComponent,
        MatIconModule,
        MatDividerModule,
        MatTabsModule,
        MatExpansionModule,
        AmwTooltipDirective,
        MatSnackBarModule,
        AmwProgressSpinnerComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-detail-page.component.html',
    styleUrl: './amw-detail-page.component.scss',
    providers: [
        { provide: 'DETAIL_PAGE_DATA_SOURCE', useFactory: () => new DefaultDetailPageDataSource() }
    ]
})
export class AmwDetailPageComponent implements OnInit, OnDestroy {
    config = input<DetailPageConfig>({ fields: [] });
    itemId = input<string | undefined>(undefined);
    dataSource = input<DetailPageDataSource | undefined>(undefined);
    realTimeUpdates = input<boolean>(false);

    editClick = output<any>();
    deleteClick = output<any>();
    printClick = output<any>();
    shareClick = output<any>();
    actionClick = output<{ action: string; item: any }>();

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
        if (this.itemId()) {
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
            ...this.config()
        };
    }

    private loadData(): void {
        const itemIdValue = this.itemId();
        if (!itemIdValue) return;

        this.loading = true;
        this.error = null;

        const dataSourceValue = this.dataSource() || this.injectedDataSource;
        if (!dataSourceValue) {
            this.error = 'No data source provided';
            this.loading = false;
            return;
        }

        dataSourceValue.getData(itemIdValue).pipe(
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
