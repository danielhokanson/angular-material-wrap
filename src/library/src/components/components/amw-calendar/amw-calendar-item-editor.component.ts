import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CalendarItem, CalendarItemEditorContext, CalendarItemTimePattern } from './interfaces/calendar-item.interface';
import { Subject } from 'rxjs';

@Component({
    selector: 'amw-calendar-item-editor',
    standalone: true,
    imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
],
    templateUrl: './amw-calendar-item-editor.component.html',
    styleUrls: ['./amw-calendar-item-editor.component.scss']
})
export class AmwCalendarItemEditorComponent<T = any> implements OnInit, OnDestroy {
    @Input() context!: CalendarItemEditorContext<T>;
    @Output() save = new EventEmitter<CalendarItem<T>>();
    @Output() cancel = new EventEmitter<void>();
    @Output() delete = new EventEmitter<CalendarItem<T>>();

    item: CalendarItem<T> = {
        id: '',
        title: '',
        description: '',
        start: new Date(),
        end: new Date(),
        allDay: false,
        color: '#6750a4',
        timePattern: 'datetime',
        editable: true,
        deletable: true,
        draggable: true,
        data: {} as T
    };

    itemType = 'Event';
    startDate = '';
    startTime = '09:00';
    endTime = '10:00';
    completed = false;

    private destroy$ = new Subject<void>();

    get isEditing(): boolean {
        return this.context?.isEditing || false;
    }

    getHeaderTitle(): string {
        if (this.isEditing) {
            return this.item.id ? 'Edit Item' : 'Create Item';
        }
        return 'Item Details';
    }

    getFormattedDate(): string {
        return this.item.start.toLocaleDateString();
    }

    getFormattedTime(): string {
        if (this.item.allDay) {
            return 'All Day';
        }
        const start = this.item.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if (this.item.end) {
            const end = this.item.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return `${start} - ${end}`;
        }
        return start;
    }

    onEdit(): void {
        // Switch to edit mode
        this.context.isEditing = true;
    }

    ngOnInit(): void {
        if (this.context) {
            this.initializeFromContext();
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private initializeFromContext(): void {
        if (this.context.item) {
            // Editing existing item
            this.item = { ...this.context.item };
        } else {
            // Creating new item
            this.item.start = this.context.startDate;
            this.item.end = this.context.endDate || this.context.startDate;
        }

        this.itemType = this.context.itemType;
        this.startDate = this.formatDateForInput(this.item.start);
        this.startTime = this.formatTimeForInput(this.item.start);
        this.endTime = this.item.end ? this.formatTimeForInput(this.item.end) : '10:00';
        this.completed = (this.item.data as any)?.completed || false;
    }

    private formatDateForInput(date: Date): string {
        return date.toISOString().split('T')[0];
    }

    private formatTimeForInput(date: Date): string {
        return date.toTimeString().slice(0, 5);
    }

    onSave(): void {
        // Update item with form data
        this.item.title = this.item.title || '';
        this.item.description = this.item.description || '';
        this.item.start = new Date(`${this.startDate}T${this.startTime}`);
        this.item.end = this.item.allDay ?
            new Date(`${this.startDate}T23:59:59`) :
            new Date(`${this.startDate}T${this.endTime}`);

        this.item.data = {
            ...this.item.data,
            itemType: this.itemType,
            completed: this.completed
        } as T;

        this.save.emit(this.item);
    }

    onCancel(): void {
        this.cancel.emit();
    }

    onDelete(): void {
        if (this.item.id) {
            this.delete.emit(this.item);
        }
    }

}
