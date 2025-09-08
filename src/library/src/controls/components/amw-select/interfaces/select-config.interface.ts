import { SelectAppearance } from './select-appearance.type';
import { AmwSize } from '../../../../shared/types/amw-size.type';
import { SelectOption } from './select-option.interface';

/**
 * Select configuration interface
 */
export interface SelectConfig {
    appearance?: SelectAppearance;
    size?: AmwSize;
    placeholder?: string;
    label?: string;
    hint?: string;
    disabled?: boolean;
    required?: boolean;
    multiple?: boolean;
    compareWith?: (a: any, b: any) => boolean;
    value?: any;
    options?: SelectOption[];
    groups?: { [key: string]: SelectOption[] };
    searchable?: boolean;
    clearable?: boolean;
    loading?: boolean;
    errorMessage?: string;
    hasError?: boolean;
    ariaLabel?: string;
    ariaLabelledby?: string;
    ariaDescribedby?: string;
    tabIndex?: number;
    autofocus?: boolean;
    name?: string;
    id?: string;
    form?: string;
    panelClass?: string | string[];
    overlayPanelClass?: string | string[];
    disableRipple?: boolean;
    disableOptionCentering?: boolean;
    typeaheadDebounceInterval?: number;
    maxHeight?: number;
    width?: number;
    autoWidth?: boolean;
    hideSingleSelectionIndicator?: boolean;
    showClearButton?: boolean;
    showSearchBox?: boolean;
    searchPlaceholder?: string;
    noOptionsText?: string;
    loadingText?: string;
    customTrigger?: boolean;
    customOptionTemplate?: boolean;
    customLabelTemplate?: boolean;
    customEmptyTemplate?: boolean;
    customLoadingTemplate?: boolean;
    customErrorTemplate?: boolean;
    validationMessages?: {
        required?: string;
        invalid?: string;
        noOptions?: string;
    };
}
