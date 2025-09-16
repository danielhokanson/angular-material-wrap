import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'amwCurrency',
    standalone: true
})
export class AmwCurrencyPipe implements PipeTransform {
    transform(
        value: number | string | null | undefined,
        currencyCode: string = 'USD',
        display: 'symbol' | 'code' | 'name' = 'symbol',
        digitsInfo: string = '1.2-2',
        locale: string = 'en-US'
    ): string | null {
        if (value === null || value === undefined || value === '') {
            return null;
        }

        const numericValue = typeof value === 'string' ? parseFloat(value) : value;

        if (isNaN(numericValue)) {
            return null;
        }

        try {
            return new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: currencyCode,
                currencyDisplay: display,
                minimumFractionDigits: this.getMinFractionDigits(digitsInfo),
                maximumFractionDigits: this.getMaxFractionDigits(digitsInfo)
            }).format(numericValue);
        } catch (error) {
            console.warn('AmwCurrencyPipe: Invalid locale or currency code', error);
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                currencyDisplay: display,
                minimumFractionDigits: this.getMinFractionDigits(digitsInfo),
                maximumFractionDigits: this.getMaxFractionDigits(digitsInfo)
            }).format(numericValue);
        }
    }

    private getMinFractionDigits(digitsInfo: string): number {
        const parts = digitsInfo.split('.');
        if (parts.length > 1) {
            const fractionParts = parts[1].split('-');
            return parseInt(fractionParts[0], 10) || 0;
        }
        return 0;
    }

    private getMaxFractionDigits(digitsInfo: string): number {
        const parts = digitsInfo.split('.');
        if (parts.length > 1) {
            const fractionParts = parts[1].split('-');
            return parseInt(fractionParts[1] || fractionParts[0], 10) || 2;
        }
        return 2;
    }
}
