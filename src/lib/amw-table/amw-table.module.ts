import { Directive, Input, Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Directive({ selector: '[amwColumnDef]', standalone: true })
export class AmwColumnDefDirective {
    @Input('amwColumnDef') name!: string;
}

@Directive({ selector: '[amwHeaderCellDef]', standalone: true })
export class AmwHeaderCellDefDirective { }

@Directive({ selector: '[amwCellDef]', standalone: true })
export class AmwCellDefDirective { }

@Directive({ selector: '[amwHeaderRowDef]', standalone: true })
export class AmwHeaderRowDefDirective {
    @Input('amwHeaderRowDef') columns: string[] = [];
}

@Directive({ selector: '[amwRowDef]', standalone: true })
export class AmwRowDefDirective {
    @Input('amwRowDefColumns') columns: string[] = [];
}

/**
 * Minimal AmwTableComponent: exposes inputs and provides a very small DOM representation.
 * Full feature parity requires a more complete implementation.
 */
@Component({
    selector: 'amw-table, table[amw-table]',
    standalone: true,
    imports: [CommonModule],
    template: `
		<table class="amw-table">
			<thead>
				<tr *ngIf="displayedColumns?.length">
					<th *ngFor="let c of displayedColumns">{{ c }}</th>
				</tr>
			</thead>
			<tbody>
				@for (row of _renderData(); track trackBy ? trackBy($index, row) : $index) {
				<tr>
					<td *ngFor="let c of displayedColumns">{{ row ? row[c] : '' }}</td>
				</tr>
				}
			</tbody>
		</table>
	`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmwTableComponent<T = any> {
    @Input() dataSource?: T[] | Observable<T[]>;
    @Input() displayedColumns: string[] = [];
    @Input() trackBy?: (index: number, item: T) => any;

    _renderData(): any[] {
        if (!this.dataSource) {
            return [];
        }
        if (Array.isArray(this.dataSource)) return this.dataSource as any[];
        // Observable case: cannot sync read here — return empty; consumer should pass array for basic usage.
        return [];
    }
}

// Re-export all standalone components for easy importing
export const AMW_TABLE_COMPONENTS = [
    AmwColumnDefDirective,
    AmwHeaderCellDefDirective,
    AmwCellDefDirective,
    AmwHeaderRowDefDirective,
    AmwRowDefDirective,
    AmwTableComponent
] as const;
