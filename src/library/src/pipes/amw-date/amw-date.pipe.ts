import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'amwDate',
    standalone: true
})
export class AmwDatePipe implements PipeTransform {
    transform(
        value: Date | string | number | null | undefined,
        format: string = 'medium',
        timezone?: string,
        locale: string = 'en-US'
    ): string | null {
        if (value === null || value === undefined || value === '') {
            return null;
        }

        let date: Date;

        if (value instanceof Date) {
            date = value;
        } else if (typeof value === 'string' || typeof value === 'number') {
            date = new Date(value);
        } else {
            return null;
        }

        if (isNaN(date.getTime())) {
            return null;
        }

        try {
            const options = this.getDateOptions(format);
            return new Intl.DateTimeFormat(locale, options).format(date);
        } catch (error) {
            console.warn('AmwDatePipe: Invalid locale or format', error);
            const fallbackOptions = this.getDateOptions(format);
            return new Intl.DateTimeFormat('en-US', fallbackOptions).format(date);
        }
    }

    private getDateOptions(format: string): Intl.DateTimeFormatOptions {
        const formatMap: { [key: string]: Intl.DateTimeFormatOptions } = {
            'short': {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            },
            'medium': {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            },
            'long': {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            },
            'full': {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            },
            'date': {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            },
            'time': {
                hour: '2-digit',
                minute: '2-digit'
            },
            'datetime': {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }
        };

        return formatMap[format] || formatMap['medium'];
    }
}
