import { Component, Input, Output, EventEmitter, Directive } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'amw-accordion',
    template: `<ng-content></ng-content>`,
    standalone: true
})
export class AmwAccordionComponent {
    @Input() multi = false;
    @Input() displayMode: 'default' | 'flat' = 'default';
    @Input() hideToggle = false;
}

@Component({
    selector: 'amw-expansion-panel',
    template: `
		<div class="amw-expansion-panel" [attr.aria-expanded]="expanded">
			<ng-content select="amw-expansion-panel-header"></ng-content>
			@if (expanded) {
				<div class="amw-expansion-panel-content">
					<ng-content></ng-content>
				</div>
			}
		</div>
	`,
    standalone: true
})
export class AmwExpansionPanelComponent {
    @Input() expanded = false;
    @Input() disabled = false;
    @Input() hideToggle = false;

    @Output() opened = new EventEmitter<void>();
    @Output() closed = new EventEmitter<void>();
    @Output() expandedChange = new EventEmitter<boolean>();

    open(): void {
        if (this.disabled) return;
        this.expanded = true;
        this.expandedChange.emit(true);
        this.opened.emit();
    }

    close(): void {
        if (this.disabled) return;
        this.expanded = false;
        this.expandedChange.emit(false);
        this.closed.emit();
    }

    toggle(): void {
        this.expanded ? this.close() : this.open();
    }
}

@Component({
    selector: 'amw-expansion-panel-header',
    template: `<ng-content></ng-content>`,
    standalone: true
})
export class AmwExpansionPanelHeaderComponent {
    @Input() collapsedHeight = '48px';
    @Input() expandedHeight = '64px';
}

@Directive({
    selector: 'amw-panel-title',
    standalone: true
})
export class AmwPanelTitleDirective { }

@Directive({
    selector: 'amw-panel-description',
    standalone: true
})
export class AmwPanelDescriptionDirective { }

export const AMW_EXPANSION_COMPONENTS = [
    AmwAccordionComponent,
    AmwExpansionPanelComponent,
    AmwExpansionPanelHeaderComponent,
    AmwPanelTitleDirective,
    AmwPanelDescriptionDirective
] as const;
