import { SearchField } from './search-field.interface';
import { QuickFilter } from './quick-filter.interface';
import { SearchPageSortOption } from './search-page-sort-option.interface';
import { SearchPageViewMode } from './search-page-view-mode.interface';

// Search Page Configuration Interface
export interface SearchPageConfig {
    title?: string;
    subtitle?: string;
    searchFields: SearchField[];
    quickFilters?: QuickFilter[];
    showSavedSearches?: boolean;
    showAdvancedSearch?: boolean;
    showAdvancedFilters?: boolean;
    showSuggestions?: boolean;
    showSortOptions?: boolean;
    showViewModes?: boolean;
    showSearchHistory?: boolean;
  showViewOptions?: boolean;
  showQuickFilters?: boolean;
  realTimeSearch?: boolean;
  searchDebounceTime?: number;
    sortOptions?: SearchPageSortOption[];
    viewModes?: SearchPageViewMode[];
    customActions?: SearchAction[];
    customClasses?: string[];
    customStyles?: { [key: string]: string };
}

export interface SearchAction {
    key: string;
    label: string;
    icon: string;
    color?: 'primary' | 'accent' | 'warn';
    onClick: (data: any) => void;
}
