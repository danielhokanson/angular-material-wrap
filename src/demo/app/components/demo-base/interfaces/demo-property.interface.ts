/**
 * Demo property interface
 */
export interface DemoProperty {
    name: string;
    type: 'string' | 'number' | 'boolean' | 'select' | 'slider';
    value: any;
    options?: { value: any; label: string }[];
    min?: number;
    max?: number;
    step?: number;
    description?: string;
}
