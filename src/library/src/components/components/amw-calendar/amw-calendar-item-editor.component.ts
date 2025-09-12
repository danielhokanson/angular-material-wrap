import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
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
        CommonModule,
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
    template: `
        <div class="amw-calendar-item-editor">
            <div class="amw-calendar-item-editor__header">
                <h3>{{ isEditing ? 'Edit Item' : 'Create Item' }}</h3>
            </div>
            
            <div class="amw-calendar-item-editor__content">
                <div class="amw-calendar-item-editor__field">
                    <label>Title:</label>
                    <input type="text" 
                           [(ngModel)]="item.title" 
                           placeholder="Item title"
                           class="amw-calendar-item-editor__input">
                </div>
                
                <div class="amw-calendar-item-editor__field">
                    <label>Description:</label>
                    <textarea [(ngModel)]="item.description" 
                              placeholder="Item description"
                              class="amw-calendar-item-editor__textarea"></textarea>
                </div>

                <div class="amw-calendar-item-editor__field">
                    <label>Type:</label>
                    <select [(ngModel)]="itemType" class="amw-calendar-item-editor__select">
                        <option value="Event">Event</option>
                        <option value="Task">Task</option>
                        <option value="Meal">Meal</option>
                        <option value="Vacation">Vacation</option>
                        <option value="Appointment">Appointment</option>
                    </select>
                </div>

                <div class="amw-calendar-item-editor__field">
                    <label>Start Date:</label>
                    <input type="date" 
                           [(ngModel)]="startDate" 
                           class="amw-calendar-item-editor__input">
                </div>

                <div class="amw-calendar-item-editor__field" *ngIf="!item.allDay">
                    <label>Start Time:</label>
                    <input type="time" 
                           [(ngModel)]="startTime" 
                           class="amw-calendar-item-editor__input">
                </div>

                <div class="amw-calendar-item-editor__field" *ngIf="!item.allDay">
                    <label>End Time:</label>
                    <input type="time" 
                           [(ngModel)]="endTime" 
                           class="amw-calendar-item-editor__input">
                </div>

                <div class="amw-calendar-item-editor__field">
                    <label>
                        <input type="checkbox" 
                               [(ngModel)]="item.allDay" 
                               class="amw-calendar-item-editor__checkbox">
                        All Day
                    </label>
                </div>

                <div class="amw-calendar-item-editor__field" *ngIf="itemType === 'Task'">
                    <label>
                        <input type="checkbox" 
                               [(ngModel)]="completed" 
                               class="amw-calendar-item-editor__checkbox">
                        Completed
                    </label>
                </div>
            </div>

            <div class="amw-calendar-item-editor__actions">
                <button mat-button (click)="onCancel()" class="amw-calendar-item-editor__action">
                    Cancel
                </button>
                <button mat-raised-button 
                        (click)="onSave()" 
                        class="amw-calendar-item-editor__action amw-calendar-item-editor__action--primary">
                    {{ isEditing ? 'Save' : 'Create' }}
                </button>
            </div>
        </div>
    `,
    styles: [`
        .amw-calendar-item-editor {
            min-width: 300px;
            max-width: 400px;
            padding: 16px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .amw-calendar-item-editor__header {
            margin-bottom: 16px;
        }

        .amw-calendar-item-editor__header h3 {
            margin: 0;
            font-size: 18px;
            font-weight: 500;
        }

        .amw-calendar-item-editor__content {
            margin-bottom: 16px;
        }

        .amw-calendar-item-editor__field {
            margin-bottom: 12px;
        }

        .amw-calendar-item-editor__field label {
            display: block;
            font-weight: 500;
            margin-bottom: 4px;
            color: #333;
        }

        .amw-calendar-item-editor__input,
        .amw-calendar-item-editor__select,
        .amw-calendar-item-editor__textarea {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;
        }

        .amw-calendar-item-editor__textarea {
            min-height: 60px;
            resize: vertical;
        }

        .amw-calendar-item-editor__checkbox {
            margin-right: 8px;
        }

        .amw-calendar-item-editor__actions {
            display: flex;
            gap: 8px;
            justify-content: flex-end;
        }

        .amw-calendar-item-editor__action--primary {
            background-color: #6750a4;
            color: white;
        }
    `]
})
export class AmwCalendarItemEditorComponent<T = any> implements OnInit, OnDestroy {
    @Input() context!: CalendarItemEditorContext<T>;
    @Output() save = new EventEmitter<CalendarItem<T>>();
    @Output() cancel = new EventEmitter<void>();

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
}
