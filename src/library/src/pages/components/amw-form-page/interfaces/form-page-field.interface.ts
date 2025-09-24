// Form Page Field Interface
export interface FormPageField {
    key: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'number' | 'date' | 'time' | 'datetime' | 'select' | 'multiselect' | 'textarea' | 'checkbox' | 'radio' | 'file' | 'custom' | 'chips' | 'toggle';
    value?: any;
    required?: boolean;
    disabled?: boolean;
  placeholder?: string;
  title?: string;
  options?: { value: any; label: string }[];
  visible?: boolean;
    validation?: {
        min?: number;
        max?: number;
        minLength?: number;
        maxLength?: number;
        maxlength?: number;
        pattern?: string;
        custom?: (value: any) => string | null;
    };
    customRenderer?: (value: any) => string;
}

