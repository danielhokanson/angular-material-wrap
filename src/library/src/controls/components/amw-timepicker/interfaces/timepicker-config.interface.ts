export interface TimepickerConfig {
    appearance?: 'fill' | 'outline';
    placeholder?: string;
    step?: number; // minutes
    format?: '12h' | '24h';
    showSeconds?: boolean;
    disabled?: boolean;
    required?: boolean;
    min?: string; // HH:MM format
    max?: string; // HH:MM format
}