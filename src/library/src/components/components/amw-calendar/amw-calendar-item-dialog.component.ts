import { Component, Inject, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AmwButtonComponent } from '../../../controls/components/amw-button/amw-button.component';
import { AmwIconComponent } from '../amw-icon/amw-icon.component';
import { CalendarEvent } from './interfaces';

export interface CalendarItemDialogData {
    event?: CalendarEvent<any>;
    mode: 'create' | 'read' | 'edit';
    onSave?: (event: CalendarEvent<any>) => void;
    onEdit?: (event: CalendarEvent<any>) => void;
    onDelete?: (event: CalendarEvent<any>) => void;
    onMarkComplete?: (event: CalendarEvent<any>) => void;
    onMarkIncomplete?: (event: CalendarEvent<any>) => void;
    onCancel?: () => void;
}

@Component({
    selector: 'amw-calendar-item-dialog',
    standalone: true,
    imports: [FormsModule, AmwButtonComponent, AmwIconComponent],
    templateUrl: './amw-calendar-item-dialog.component.html',
    styleUrl: './amw-calendar-item-dialog.component.scss'
})
export class AmwCalendarItemDialogComponent implements OnInit {
    eventForm = {
        title: '',
        description: '',
        itemType: 'Event',
        startDate: '',
        startTime: '09:00',
        endTime: '10:00',
        allDay: false,
        completed: false
    };

    constructor(
        public dialogRef: MatDialogRef<AmwCalendarItemDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CalendarItemDialogData
    ) { }

    ngOnInit(): void {
        if (this.data.event) {
            this.populateFormFromEvent();
        } else if (this.data.mode === 'create') {
            this.initializeCreateForm();
        }
    }

    private populateFormFromEvent(): void {
        if (this.data.event) {
            this.eventForm.title = this.data.event.title || '';
            this.eventForm.description = this.data.event.description || '';
            this.eventForm.itemType = this.data.event.data?.itemType || 'Event';
            this.eventForm.startDate = this.formatDateForInput(this.data.event.start);
            this.eventForm.startTime = this.formatTimeForInput(this.data.event.start);
            this.eventForm.endTime = this.data.event.end ? this.formatTimeForInput(this.data.event.end) : '10:00';
            this.eventForm.allDay = this.data.event.allDay || false;
            this.eventForm.completed = this.data.event.data?.completed || false;
        }
    }

    private initializeCreateForm(): void {
        const today = new Date();
        this.eventForm.startDate = this.formatDateForInput(today);
        this.eventForm.startTime = '09:00';
        this.eventForm.endTime = '10:00';
    }

    private formatDateForInput(date: Date): string {
        return date.toISOString().split('T')[0];
    }

    private formatTimeForInput(date: Date): string {
        return date.toTimeString().slice(0, 5);
    }

    onClose(): void {
        this.dialogRef.close();
    }

    onCancel(): void {
        if (this.data.onCancel) {
            this.data.onCancel();
        }
        this.dialogRef.close();
    }

    save(): void {
        const event = this.createEventFromForm();
        if (this.data.onSave) {
            this.data.onSave(event);
        }
        this.dialogRef.close();
    }

    private createEventFromForm(): CalendarEvent<any> {
        const startDateTime = new Date(`${this.eventForm.startDate}T${this.eventForm.startTime}`);
        const endDateTime = this.eventForm.allDay ?
            new Date(`${this.eventForm.startDate}T23:59:59`) :
            new Date(`${this.eventForm.startDate}T${this.eventForm.endTime}`);

        return {
            id: this.data.event?.id || Date.now().toString(),
            title: this.eventForm.title,
            description: this.eventForm.description,
            start: startDateTime,
            end: endDateTime,
            allDay: this.eventForm.allDay,
            color: this.getColorForType(this.eventForm.itemType),
            editable: true,
            deletable: true,
            data: {
                itemType: this.eventForm.itemType,
                completed: this.eventForm.completed
            }
        };
    }

    private getColorForType(itemType: string): string {
        const colors: { [key: string]: string } = {
            'Event': '#6750a4',
            'Task': '#1976d2',
            'Meal': '#388e3c',
            'Vacation': '#f57c00',
            'Appointment': '#7b1fa2'
        };
        return colors[itemType] || '#6750a4';
    }

    getItemType(): string {
        return this.data.event?.data?.itemType || 'Event';
    }

    getFormattedDate(): string {
        if (!this.data.event) return '';
        if (this.data.event.allDay) {
            return this.data.event.start.toLocaleDateString();
        }
        return this.data.event.start.toLocaleDateString();
    }

    getFormattedTime(): string {
        if (!this.data.event) return '';
        if (this.data.event.allDay) {
            return 'All Day';
        }
        const start = this.data.event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if (this.data.event.end) {
            const end = this.data.event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return `${start} - ${end}`;
        }
        return start;
    }

    hasCustomData(): boolean {
        return !!(this.data.event?.data && Object.keys(this.data.event.data).length > 0);
    }

    getCustomDataString(): string {
        return JSON.stringify(this.data.event?.data || {}, null, 2);
    }

    isTask(): boolean {
        return this.data.event?.data?.itemType === 'Task';
    }

    isCompleted(): boolean {
        return this.data.event?.data?.completed === true;
    }

    isEditable(): boolean {
        return this.data.event?.editable !== false;
    }

    isDeletable(): boolean {
        return this.data.event?.deletable !== false;
    }

    markComplete(): void {
        if (this.data.onMarkComplete && this.data.event) {
            this.data.onMarkComplete(this.data.event);
        }
        this.dialogRef.close();
    }

    markIncomplete(): void {
        if (this.data.onMarkIncomplete && this.data.event) {
            this.data.onMarkIncomplete(this.data.event);
        }
        this.dialogRef.close();
    }

    edit(): void {
        if (this.data.onEdit && this.data.event) {
            this.data.onEdit(this.data.event);
        }
        this.dialogRef.close();
    }

    delete(): void {
        if (this.data.onDelete && this.data.event) {
            this.data.onDelete(this.data.event);
        }
        this.dialogRef.close();
    }
}
