import { Component, OnInit, OnDestroy } from '@angular/core';

import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { Subject, takeUntil, BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

// Import the page components
import {
    AmwSearchPageComponent,
    SearchPageConfig,
    SearchPageDataSource,
    SearchData,
    SearchField,
    SearchOption,
    QuickFilter,
    SearchResult
} from '../../../../library/src/pages/components/amw-search-page';

// Import API documentation components
import { AmwApiDocComponent, ApiInterface } from '../../shared/components/api-doc/api-doc.component';
import { ApiDocumentation } from '../../components/base/base-api.component';

// Sample data
const SAMPLE_PRODUCTS = [
    {
        id: 1,
        title: 'Angular Development Guide',
        subtitle: 'Complete guide to Angular development',
        description: 'A comprehensive guide covering Angular fundamentals, advanced concepts, and best practices for building scalable web applications.',
        category: 'Books',
        price: 49.99,
        rating: 4.8,
        inStock: true,
        tags: ['Angular', 'JavaScript', 'Web Development', 'Frontend'],
        author: 'John Smith',
        publishedDate: new Date('2023-01-15'),
        image: 'https://via.placeholder.com/300x200?text=Angular+Guide'
    },
    {
        id: 2,
        title: 'TypeScript Masterclass',
        subtitle: 'Advanced TypeScript techniques',
        description: 'Master TypeScript with advanced patterns, generics, decorators, and real-world applications.',
        category: 'Books',
        price: 39.99,
        rating: 4.9,
        inStock: true,
        tags: ['TypeScript', 'JavaScript', 'Programming', 'Advanced'],
        author: 'Jane Doe',
        publishedDate: new Date('2023-02-20'),
        image: 'https://via.placeholder.com/300x200?text=TypeScript+Masterclass'
    },
    {
        id: 3,
        title: 'React Components Library',
        subtitle: 'Reusable React components',
        description: 'A comprehensive library of pre-built React components for rapid application development.',
        category: 'Software',
        price: 199.99,
        rating: 4.6,
        inStock: true,
        tags: ['React', 'Components', 'UI', 'Library'],
        author: 'Mike Johnson',
        publishedDate: new Date('2023-03-10'),
        image: 'https://via.placeholder.com/300x200?text=React+Components'
    },
    {
        id: 4,
        title: 'Vue.js Framework Course',
        subtitle: 'Learn Vue.js from scratch',
        description: 'Complete course covering Vue.js fundamentals, components, routing, state management, and deployment.',
        category: 'Courses',
        price: 79.99,
        rating: 4.7,
        inStock: false,
        tags: ['Vue.js', 'JavaScript', 'Frontend', 'Course'],
        author: 'Sarah Wilson',
        publishedDate: new Date('2023-04-05'),
        image: 'https://via.placeholder.com/300x200?text=Vue.js+Course'
    },
    {
        id: 5,
        title: 'Node.js Backend Development',
        subtitle: 'Server-side JavaScript development',
        description: 'Learn to build scalable backend applications with Node.js, Express, and MongoDB.',
        category: 'Courses',
        price: 89.99,
        rating: 4.5,
        inStock: true,
        tags: ['Node.js', 'Backend', 'JavaScript', 'API'],
        author: 'David Brown',
        publishedDate: new Date('2023-05-12'),
        image: 'https://via.placeholder.com/300x200?text=Node.js+Backend'
    },
    {
        id: 6,
        title: 'CSS Grid Layout Guide',
        subtitle: 'Modern CSS layout techniques',
        description: 'Master CSS Grid and Flexbox for creating responsive, modern web layouts.',
        category: 'Books',
        price: 29.99,
        rating: 4.4,
        inStock: true,
        tags: ['CSS', 'Grid', 'Layout', 'Responsive'],
        author: 'Lisa Davis',
        publishedDate: new Date('2023-06-18'),
        image: 'https://via.placeholder.com/300x200?text=CSS+Grid+Guide'
    },
    {
        id: 7,
        title: 'JavaScript Design Patterns',
        subtitle: 'Essential design patterns in JavaScript',
        description: 'Learn essential design patterns and their implementation in JavaScript applications.',
        category: 'Books',
        price: 34.99,
        rating: 4.8,
        inStock: true,
        tags: ['JavaScript', 'Design Patterns', 'Architecture', 'Best Practices'],
        author: 'Tom Anderson',
        publishedDate: new Date('2023-07-25'),
        image: 'https://via.placeholder.com/300x200?text=JS+Design+Patterns'
    },
    {
        id: 8,
        title: 'Web Performance Optimization',
        subtitle: 'Speed up your web applications',
        description: 'Comprehensive guide to optimizing web performance, including techniques for faster loading and better user experience.',
        category: 'Courses',
        price: 99.99,
        rating: 4.9,
        inStock: true,
        tags: ['Performance', 'Optimization', 'Web', 'Speed'],
        author: 'Emily Taylor',
        publishedDate: new Date('2023-08-30'),
        image: 'https://via.placeholder.com/300x200?text=Web+Performance'
    }
];

// Custom data source implementation
class SearchPageDemoDataSource implements SearchPageDataSource {
    constructor(private data: any[] = SAMPLE_PRODUCTS) { }

    search(params: {
        query: string;
        filters: { [key: string]: any };
        pageIndex: number;
        pageSize: number;
        sortField?: string;
        sortDirection?: 'asc' | 'desc';
    }): Observable<SearchData> {
        // Simulate API delay
        return of(this.processSearch(params)).pipe(delay(800));
    }

    getSuggestions(query: string): Observable<string[]> {
        const suggestions = [
            'Angular development',
            'TypeScript tutorial',
            'React components',
            'Vue.js course',
            'Node.js backend',
            'CSS grid layout',
            'JavaScript patterns',
            'Web performance'
        ].filter(suggestion =>
            suggestion.toLowerCase().includes(query.toLowerCase())
        );

        return of(suggestions).pipe(delay(200));
    }

    getFacets(filters: { [key: string]: any }): Observable<{ [key: string]: { [key: string]: number } }> {
        const facets = {
            category: {
                'Books': 4,
                'Courses': 3,
                'Software': 1
            },
            inStock: {
                'true': 6,
                'false': 2
            },
            rating: {
                '4.5-5.0': 5,
                '4.0-4.5': 3
            }
        };

        return of(facets).pipe(delay(100));
    }

    exportSearchResults(format: string, criteria: { [key: string]: any }): Observable<any> {
        return of({ success: true, data: 'Export completed' }).pipe(delay(500));
    }

    saveSearch(name: string, criteria: { [key: string]: any }): Observable<boolean> {
        return of(true).pipe(delay(500));
    }

    loadSavedSearches(): Observable<{ name: string; criteria: { [key: string]: any } }[]> {
        return of([]).pipe(delay(500));
    }

    deleteSavedSearch(name: string): Observable<boolean> {
        return of(true).pipe(delay(500));
    }

    private processSearch(params: any): SearchData {
        let filteredData = [...this.data];

        // Apply search query
        if (params.query) {
            const query = params.query.toLowerCase();
            filteredData = filteredData.filter(item =>
                item.title.toLowerCase().includes(query) ||
                item.subtitle.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query) ||
                item.tags.some((tag: string) => tag.toLowerCase().includes(query)) ||
                item.author.toLowerCase().includes(query)
            );
        }

        // Apply filters
        if (params.filters) {
            Object.keys(params.filters).forEach(key => {
                const value = params.filters[key];
                if (value !== null && value !== undefined && value !== '') {
                    filteredData = filteredData.filter(item => {
                        if (key === 'category') {
                            return item.category === value;
                        } else if (key === 'inStock') {
                            return item.inStock === (value === 'true');
                        } else if (key === 'priceRange') {
                            const [min, max] = value.split('-').map(Number);
                            return item.price >= min && item.price <= max;
                        } else if (key === 'rating') {
                            const [min, max] = value.split('-').map(Number);
                            return item.rating >= min && item.rating <= max;
                        } else if (key === 'tags') {
                            return item.tags.some((tag: string) => tag.toLowerCase().includes(value.toLowerCase()));
                        }
                        return true;
                    });
                }
            });
        }

        // Apply sorting
        if (params.sortField) {
            filteredData.sort((a, b) => {
                const aVal = a[params.sortField];
                const bVal = b[params.sortField];
                const direction = params.sortDirection === 'desc' ? -1 : 1;

                if (aVal < bVal) return -1 * direction;
                if (aVal > bVal) return 1 * direction;
                return 0;
            });
        }

        // Apply pagination
        const startIndex = params.pageIndex * params.pageSize;
        const endIndex = startIndex + params.pageSize;
        const paginatedData = filteredData.slice(startIndex, endIndex);

        return {
            results: paginatedData.map(item => ({
                id: item.id.toString(),
                title: item.title,
                subtitle: item.subtitle,
                description: item.description,
                image: item.image,
                data: item, // Add the data property
                metadata: {
                    category: item.category,
                    price: item.price,
                    rating: item.rating,
                    inStock: item.inStock,
                    author: item.author,
                    publishedDate: item.publishedDate
                },
                score: Math.random() * 0.3 + 0.7, // Simulate relevance score
                highlights: this.generateHighlights(item, params.query)
            })),
            totalCount: filteredData.length,
            pageIndex: params.pageIndex,
            pageSize: params.pageSize,
            filters: params.filters,
            searchQuery: params.query
        };
    }

    private generateHighlights(item: any, query: string): { [key: string]: string[] } {
        if (!query) return {};

        const highlights: { [key: string]: string[] } = {};
        const queryLower = query.toLowerCase();

        if (item.title.toLowerCase().includes(queryLower)) {
            highlights['title'] = [item.title];
        }
        if (item.description.toLowerCase().includes(queryLower)) {
            highlights['description'] = [item.description];
        }

        return highlights;
    }
}
import { AmwTabsComponent, AmwTabComponent, AmwCardComponent } from '../../../../library/src/components/components';

@Component({
    selector: 'app-search-page-demo',
    standalone: true,
    imports: [
        AmwSearchPageComponent,
        AmwTabsComponent,
        AmwTabComponent,
        AmwCardComponent,
        AmwApiDocComponent,
    ],
    templateUrl: './search-page-demo.component.html',
    styleUrl: './search-page-demo.component.scss'
})
export class SearchPageDemoComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();

    // Configuration
    searchConfig: SearchPageConfig = {
        title: 'Product Search',
        subtitle: 'Find the perfect product for your needs',
        showAdvancedSearch: true,
        showAdvancedFilters: true,
        showQuickFilters: true,
        showSavedSearches: true,
        showSearchHistory: true,
        showResultsCount: true,
        showSortOptions: true,
        showViewOptions: true,
        searchFields: [
            {
                key: 'category',
                label: 'Category',
                type: 'select',
                options: [
                    { value: '', label: 'All Categories' },
                    { value: 'Books', label: 'Books' },
                    { value: 'Courses', label: 'Courses' },
                    { value: 'Software', label: 'Software' }
                ],
                visible: true,
                advanced: false
            },
            {
                key: 'inStock',
                label: 'In Stock Only',
                type: 'boolean',
                visible: true,
                advanced: false
            },
            {
                key: 'priceRange',
                label: 'Price Range',
                type: 'select',
                options: [
                    { value: '', label: 'All Prices' },
                    { value: '0-50', label: 'Under $50' },
                    { value: '50-100', label: '$50 - $100' },
                    { value: '100-200', label: '$100 - $200' },
                    { value: '200-999', label: 'Over $200' }
                ],
                visible: true,
                advanced: true
            },
            {
                key: 'rating',
                label: 'Minimum Rating',
                type: 'select',
                options: [
                    { value: '', label: 'Any Rating' },
                    { value: '4.5-5.0', label: '4.5+ Stars' },
                    { value: '4.0-5.0', label: '4.0+ Stars' },
                    { value: '3.0-5.0', label: '3.0+ Stars' }
                ],
                visible: true,
                advanced: true
            },
            {
                key: 'tags',
                label: 'Tags',
                type: 'text',
                placeholder: 'Enter tags to search...',
                visible: true,
                advanced: true
            }
        ],
        quickFilters: [
            {
                key: 'inStock',
                label: 'In Stock',
                icon: 'check_circle',
                color: 'primary',
                value: true,
                active: false
            },
            {
                key: 'books',
                label: 'Books',
                icon: 'menu_book',
                color: 'accent',
                value: 'Books',
                active: false
            },
            {
                key: 'courses',
                label: 'Courses',
                icon: 'school',
                color: 'accent',
                value: 'Courses',
                active: false
            },
            {
                key: 'highRated',
                label: 'High Rated',
                icon: 'star',
                color: 'warn',
                value: '4.5-5.0',
                active: false
            }
        ],
        savedSearches: [
            {
                id: '1',
                name: 'JavaScript Books',
                description: 'All JavaScript related books',
                filters: { category: 'Books', tags: 'JavaScript' },
                criteria: { category: 'Books', tags: 'JavaScript' },
                isDefault: false,
            },
            {
                id: '2',
                name: 'High-Rated Courses',
                description: 'Courses with 4.5+ rating',
                filters: { category: 'Courses', rating: '4.5-5.0' },
                criteria: { category: 'Courses', rating: '4.5-5.0' },
                isDefault: true,
            }
        ]
    };

    // Data source
    dataSource = new SearchPageDemoDataSource();

    // State
    currentViewIndex = 0;

    // Code examples for the Code tab
    codeExamples = {
        basic: `// Basic usage of AmwSearchPageComponent
import { AmwSearchPageComponent, SearchPageConfig, SearchPageDataSource } from '@anthropic/angular-material-wrap';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [AmwSearchPageComponent],
  template: \`
    <amw-search-page
      [config]="searchConfig"
      [dataSource]="dataSource"
      (resultClick)="onResultClick($event)"
      (search)="onSearchChange($event)"
      (filterChange)="onFilterChange($event)">
    </amw-search-page>
  \`
})
export class ProductSearchComponent {
  searchConfig: SearchPageConfig = {
    title: 'Product Search',
    subtitle: 'Find the perfect product',
    showAdvancedSearch: true,
    showQuickFilters: true,
    showResultsCount: true
  };

  dataSource = new MySearchDataSource();

  onResultClick(result: SearchResult): void {
    console.log('Selected:', result);
  }
}`,

        config: `// SearchPageConfig - Configuration options
const searchConfig: SearchPageConfig = {
  // Page header
  title: 'Product Search',
  subtitle: 'Search our catalog',

  // Feature toggles
  showAdvancedSearch: true,    // Enable advanced search panel
  showAdvancedFilters: true,   // Show advanced filter fields
  showQuickFilters: true,      // Show quick filter chips
  showSavedSearches: true,     // Enable saved searches feature
  showSearchHistory: true,     // Show search history
  showResultsCount: true,      // Display total results count
  showSortOptions: true,       // Enable sorting controls
  showViewOptions: true,       // Enable view mode switching

  // Search fields configuration
  searchFields: [
    {
      key: 'category',
      label: 'Category',
      type: 'select',           // 'text' | 'select' | 'boolean' | 'date' | 'number'
      options: [
        { value: '', label: 'All Categories' },
        { value: 'books', label: 'Books' }
      ],
      visible: true,
      advanced: false           // Show in basic or advanced panel
    },
    {
      key: 'priceRange',
      label: 'Price Range',
      type: 'select',
      options: [...],
      visible: true,
      advanced: true            // Only show in advanced panel
    }
  ],

  // Quick filter chips
  quickFilters: [
    {
      key: 'inStock',
      label: 'In Stock',
      icon: 'check_circle',
      color: 'primary',
      value: true,
      active: false
    }
  ],

  // Saved searches
  savedSearches: [
    {
      id: '1',
      name: 'My Search',
      description: 'Saved search description',
      filters: { category: 'books' },
      criteria: { category: 'books' },
      isDefault: false
    }
  ]
};`,

        dataSource: `// Implementing SearchPageDataSource
import { SearchPageDataSource, SearchData } from '@anthropic/angular-material-wrap';

class MySearchDataSource implements SearchPageDataSource {
  // Required: Main search method
  search(params: {
    query: string;
    filters: { [key: string]: any };
    pageIndex: number;
    pageSize: number;
    sortField?: string;
    sortDirection?: 'asc' | 'desc';
  }): Observable<SearchData> {
    return this.http.post<SearchData>('/api/search', params);
  }

  // Optional: Search suggestions/autocomplete
  getSuggestions(query: string): Observable<string[]> {
    return this.http.get<string[]>(\`/api/suggestions?q=\${query}\`);
  }

  // Optional: Faceted search counts
  getFacets(filters: { [key: string]: any }): Observable<{ [key: string]: { [key: string]: number } }> {
    return this.http.post('/api/facets', { filters });
  }

  // Optional: Export results
  exportSearchResults(format: string, criteria: { [key: string]: any }): Observable<any> {
    return this.http.post('/api/export', { format, criteria });
  }

  // Optional: Save search
  saveSearch(name: string, criteria: { [key: string]: any }): Observable<boolean> {
    return this.http.post<boolean>('/api/saved-searches', { name, criteria });
  }

  // Optional: Load saved searches
  loadSavedSearches(): Observable<{ name: string; criteria: { [key: string]: any } }[]> {
    return this.http.get('/api/saved-searches');
  }

  // Optional: Delete saved search
  deleteSavedSearch(name: string): Observable<boolean> {
    return this.http.delete<boolean>(\`/api/saved-searches/\${name}\`);
  }
}`,

        eventHandling: `// Event handling
@Component({
  template: \`
    <amw-search-page
      [config]="config"
      [dataSource]="dataSource"
      (resultClick)="onResultClick($event)"
      (search)="onSearchChange($event)"
      (filterChange)="onFilterChange($event)"
      (savedSearchSelect)="onSavedSearchSelect($event)"
      (exportClick)="onExportClick($event)">
    </amw-search-page>
  \`
})
export class SearchComponent {
  // Handle result selection
  onResultClick(result: SearchResult): void {
    console.log('Selected result:', result.id, result.title);
    this.router.navigate(['/details', result.id]);
  }

  // Handle search query/filter changes
  onSearchChange(event: { query: string; filters: { [key: string]: any } }): void {
    console.log('Search query:', event.query);
    console.log('Active filters:', event.filters);
    // Track analytics, update URL, etc.
  }

  // Handle filter-only changes
  onFilterChange(event: { filters: { [key: string]: any } }): void {
    console.log('Filters changed:', event.filters);
  }

  // Handle saved search selection
  onSavedSearchSelect(savedSearch: SavedSearch): void {
    console.log('Applied saved search:', savedSearch.name);
    this.notification.info(\`Applied: \${savedSearch.name}\`);
  }

  // Handle export requests
  onExportClick(event: { format: string; data: any }): void {
    console.log('Export requested:', event.format);
    // Trigger download or show export dialog
  }
}`
    };

    // AmwSearchPageComponent API documentation
    searchPageApiDoc: ApiDocumentation = {
        inputs: [
            {
                name: 'config',
                type: 'SearchPageConfig',
                default: '{}',
                description: 'Configuration object for the search page including title, feature toggles, search fields, quick filters, and saved searches.'
            },
            {
                name: 'dataSource',
                type: 'SearchPageDataSource',
                default: 'undefined',
                description: 'Data source implementing the SearchPageDataSource interface. Provides methods for searching, suggestions, facets, and saved searches.'
            }
        ],
        outputs: [
            {
                name: 'resultClick',
                type: 'EventEmitter<SearchResult>',
                description: 'Emits when a search result item is clicked. Payload includes the full SearchResult object with id, title, metadata, etc.'
            },
            {
                name: 'search',
                type: 'EventEmitter<{ query: string; filters: { [key: string]: any } }>',
                description: 'Emits when a search is performed. Includes the search query and all active filters.'
            },
            {
                name: 'filterChange',
                type: 'EventEmitter<{ filters: { [key: string]: any } }>',
                description: 'Emits when filters change (via quick filters or advanced filter panel).'
            },
            {
                name: 'savedSearchSelect',
                type: 'EventEmitter<SavedSearch>',
                description: 'Emits when a saved search is selected from the saved searches dropdown.'
            },
            {
                name: 'exportClick',
                type: 'EventEmitter<{ format: string; data: any }>',
                description: 'Emits when the export button is clicked. Includes the requested format (pdf, excel, csv) and current search data.'
            }
        ],
        usageNotes: [
            'The dataSource is required and must implement the SearchPageDataSource interface with at least the search() method.',
            'SearchPageConfig allows fine-grained control over which features are enabled (search fields, quick filters, saved searches, etc.).',
            'Search fields can be configured as basic or advanced using the "advanced" property in SearchField.',
            'Quick filters provide one-click filtering and can be styled with different colors (primary, accent, warn).',
            'The component supports multiple view modes (list, grid, table) when showViewOptions is enabled.',
            'Saved searches are persisted via the dataSource methods saveSearch() and loadSavedSearches().',
            'Search suggestions are provided by implementing getSuggestions() in the dataSource.',
            'Faceted search counts are supported via the getFacets() method for dynamic filter counts.'
        ]
    };

    // Interface documentation
    searchPageInterfaces: ApiInterface[] = [
        {
            name: 'SearchPageConfig',
            description: 'Configuration interface for the search page component.',
            properties: [
                { name: 'title', type: 'string', description: 'Page title displayed in the header' },
                { name: 'subtitle', type: 'string', description: 'Page subtitle/description' },
                { name: 'showAdvancedSearch', type: 'boolean', description: 'Enable advanced search panel toggle' },
                { name: 'showAdvancedFilters', type: 'boolean', description: 'Show advanced filter fields' },
                { name: 'showQuickFilters', type: 'boolean', description: 'Display quick filter chips' },
                { name: 'showSavedSearches', type: 'boolean', description: 'Enable saved searches feature' },
                { name: 'showSearchHistory', type: 'boolean', description: 'Show recent search history' },
                { name: 'showResultsCount', type: 'boolean', description: 'Display total results count' },
                { name: 'showSortOptions', type: 'boolean', description: 'Enable sorting controls' },
                { name: 'showViewOptions', type: 'boolean', description: 'Enable view mode switching (list/grid/table)' },
                { name: 'searchFields', type: 'SearchField[]', description: 'Array of search field configurations' },
                { name: 'quickFilters', type: 'QuickFilter[]', description: 'Array of quick filter configurations' },
                { name: 'savedSearches', type: 'SavedSearch[]', description: 'Array of pre-configured saved searches' }
            ]
        },
        {
            name: 'SearchPageDataSource',
            description: 'Interface for the search page data source. Only search() is required; other methods are optional.',
            properties: [
                { name: 'search(params)', type: 'Observable<SearchData>', description: 'Required. Performs the search with query, filters, pagination, and sorting.' },
                { name: 'getSuggestions(query)', type: 'Observable<string[]>', description: 'Optional. Returns autocomplete suggestions for the query.' },
                { name: 'getFacets(filters)', type: 'Observable<FacetData>', description: 'Optional. Returns facet counts for dynamic filter options.' },
                { name: 'exportSearchResults(format, criteria)', type: 'Observable<any>', description: 'Optional. Exports results in the specified format.' },
                { name: 'saveSearch(name, criteria)', type: 'Observable<boolean>', description: 'Optional. Saves a search with the given name and criteria.' },
                { name: 'loadSavedSearches()', type: 'Observable<SavedSearch[]>', description: 'Optional. Loads all saved searches for the current user.' },
                { name: 'deleteSavedSearch(name)', type: 'Observable<boolean>', description: 'Optional. Deletes a saved search by name.' }
            ]
        },
        {
            name: 'SearchResult',
            description: 'Interface for individual search result items.',
            properties: [
                { name: 'id', type: 'string', description: 'Unique identifier for the result' },
                { name: 'title', type: 'string', description: 'Result title/name' },
                { name: 'subtitle', type: 'string', description: 'Optional subtitle or secondary text' },
                { name: 'description', type: 'string', description: 'Result description or summary' },
                { name: 'image', type: 'string', description: 'Optional image URL for the result' },
                { name: 'data', type: 'any', description: 'The original data object' },
                { name: 'metadata', type: '{ [key: string]: any }', description: 'Additional metadata fields' },
                { name: 'score', type: 'number', description: 'Optional relevance score (0-1)' },
                { name: 'highlights', type: '{ [key: string]: string[] }', description: 'Optional field highlights from search matching' }
            ]
        }
    ];

    constructor(private notification: AmwNotificationService) { }

    ngOnInit(): void {
        // Initialize component
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onResultClick(result: SearchResult): void {
        this.notification.info('Info', `Clicked on ${result.title}`, { duration: 2000 });
        console.log('Result clicked:', result);
    }

    onSearchChange(event: { query: string; filters: { [key: string]: any } }): void {
        console.log('Search changed:', event);
    }

    onFilterChange(event: { filters: { [key: string]: any } }): void {
        console.log('Filter changed:', event);
    }

    onSavedSearchSelect(savedSearch: any): void {
        this.notification.success('Success', `Applied saved search: ${savedSearch.name}`, { duration: 2000 });
        console.log('Saved search selected:', savedSearch);
    }

    onExportClick(event: { format: string; data: any }): void {
        this.notification.info('Info', `Exporting as ${event.format.toUpperCase()}`, { duration: 2000 });
        console.log('Export clicked:', event);
    }

    onViewChange(index: number): void {
        this.currentViewIndex = index;

        if (index === 1) {
            this.searchConfig = {
                ...this.searchConfig,
                showSavedSearches: true,
                showSearchHistory: true,
                showViewOptions: true
            };
        } else {
            this.searchConfig = {
                ...this.searchConfig,
                showSavedSearches: false,
                showSearchHistory: false,
                showViewOptions: false
            };
        }
    }
}
