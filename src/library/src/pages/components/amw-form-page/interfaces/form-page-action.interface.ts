// Form Page Action Interface
export interface FormPageAction {
    key: string;
    label: string;
    icon: string;
    color?: 'primary' | 'accent' | 'warn';
    onClick: (formData: any) => void;
}

