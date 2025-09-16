import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'amwTextTransform',
    standalone: true
})
export class AmwTextTransformPipe implements PipeTransform {
    transform(
        value: string | null | undefined,
        transform: 'uppercase' | 'lowercase' | 'capitalize' | 'titlecase' | 'camelcase' | 'kebabcase' | 'snakecase' = 'uppercase'
    ): string | null {
        if (value === null || value === undefined || value === '') {
            return null;
        }

        switch (transform) {
            case 'uppercase':
                return value.toUpperCase();
            case 'lowercase':
                return value.toLowerCase();
            case 'capitalize':
                return this.capitalize(value);
            case 'titlecase':
                return this.titleCase(value);
            case 'camelcase':
                return this.camelCase(value);
            case 'kebabcase':
                return this.kebabCase(value);
            case 'snakecase':
                return this.snakeCase(value);
            default:
                return value;
        }
    }

    private capitalize(value: string): string {
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }

    private titleCase(value: string): string {
        return value.replace(/\w\S*/g, (txt) =>
            txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
    }

    private camelCase(value: string): string {
        return value.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }

    private kebabCase(value: string): string {
        return value
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/[\s_]+/g, '-')
            .toLowerCase();
    }

    private snakeCase(value: string): string {
        return value
            .replace(/([a-z])([A-Z])/g, '$1_$2')
            .replace(/[\s-]+/g, '_')
            .toLowerCase();
    }
}
