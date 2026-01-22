import { Component } from '@angular/core';
import {
  AmwMasterDetailPageComponent,
  MasterDetailConfig,
  MasterDetailDataSource,
  MasterDetailData,
  MasterDetailColumn
} from 'angular-material-wrap';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AmwTabsComponent, AmwTabComponent, AmwCardComponent } from '../../../../library/src/components/components';
import { AmwApiDocComponent, ApiInterface } from '../../shared/components/api-doc/api-doc.component';
import { ApiDocumentation } from '../../components/base/base-api.component';

// Sample recipes data
const RECIPES_DATA = [
  {
    id: '1',
    name: 'Banana Pancakes',
    category: 'Breakfast',
    prepTime: '15 min',
    difficulty: 'Easy',
    rating: 4.5,
    servings: 4,
    calories: 350,
    ingredients: ['2 ripe bananas', '2 eggs', '1 cup flour', '1 tsp baking powder', 'Pinch of salt'],
    instructions: '1. Mash bananas in a bowl\n2. Beat in eggs\n3. Fold in flour and baking powder\n4. Cook on griddle until golden',
    tags: ['breakfast', 'quick', 'easy']
  },
  {
    id: '2',
    name: 'Caesar Salad',
    category: 'Salad',
    prepTime: '10 min',
    difficulty: 'Easy',
    rating: 4.3,
    servings: 2,
    calories: 280,
    ingredients: ['Romaine lettuce', 'Parmesan cheese', 'Croutons', 'Caesar dressing', 'Lemon juice'],
    instructions: '1. Wash and chop lettuce\n2. Toss with dressing\n3. Add parmesan and croutons\n4. Squeeze lemon juice on top',
    tags: ['salad', 'quick', 'healthy']
  },
  {
    id: '3',
    name: 'Spaghetti Carbonara',
    category: 'Main Dish',
    prepTime: '25 min',
    difficulty: 'Medium',
    rating: 4.8,
    servings: 4,
    calories: 520,
    ingredients: ['400g spaghetti', '200g pancetta', '3 eggs', '100g Parmesan', 'Black pepper'],
    instructions: '1. Cook spaghetti al dente\n2. Fry pancetta until crispy\n3. Beat eggs with parmesan\n4. Toss hot pasta with egg mixture and pancetta',
    tags: ['pasta', 'italian', 'dinner']
  },
  {
    id: '4',
    name: 'Greek Yogurt Bowl',
    category: 'Breakfast',
    prepTime: '5 min',
    difficulty: 'Easy',
    rating: 4.6,
    servings: 1,
    calories: 220,
    ingredients: ['Greek yogurt', 'Honey', 'Granola', 'Fresh berries', 'Chia seeds'],
    instructions: '1. Add yogurt to bowl\n2. Drizzle with honey\n3. Top with granola and berries\n4. Sprinkle chia seeds',
    tags: ['breakfast', 'healthy', 'quick']
  },
  {
    id: '5',
    name: 'Thai Green Curry',
    category: 'Main Dish',
    prepTime: '45 min',
    difficulty: 'Hard',
    rating: 4.9,
    servings: 6,
    calories: 480,
    ingredients: ['Green curry paste', 'Coconut milk', 'Chicken breast', 'Thai basil', 'Vegetables'],
    instructions: '1. Fry curry paste in oil\n2. Add coconut milk\n3. Add chicken and vegetables\n4. Simmer until cooked\n5. Finish with Thai basil',
    tags: ['thai', 'curry', 'spicy']
  }
];

// Custom data source
class RecipeDataSource implements MasterDetailDataSource {
  getMasterData(params: any): Observable<MasterDetailData> {
    let items = [...RECIPES_DATA];

    // Apply search filter
    if (params.searchQuery) {
      const query = params.searchQuery.toLowerCase();
      items = items.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }

    return new BehaviorSubject({
      items,
      totalCount: items.length,
      pageIndex: 0,
      pageSize: 100
    }).pipe(delay(500));
  }

  getDetailData(itemId: string): Observable<any> {
    const item = RECIPES_DATA.find(r => r.id === itemId);
    return of(item).pipe(delay(300));
  }
}

@Component({
  selector: 'app-master-detail-page-demo',
  standalone: true,
  imports: [
    AmwMasterDetailPageComponent,
    AmwTabsComponent,
    AmwTabComponent,
    AmwCardComponent,
    AmwApiDocComponent
  ],
  templateUrl: './master-detail-page-demo.component.html',
  styleUrl: './master-detail-page-demo.component.scss'
})
export class MasterDetailPageDemoComponent {
  dataSource = new RecipeDataSource();

  config: MasterDetailConfig = {
    masterTitle: 'Recipe Collection',
    masterColumns: [
      { key: 'name', label: 'Recipe' },
      { key: 'category', label: '', type: 'badge', badgeColor: 'primary' },
      { key: 'prepTime', label: 'Prep Time' }
    ],
    detailTitle: (item) => item?.name || 'Recipe Details',
    detailSections: [
      {
        id: 'overview',
        title: 'Overview',
        icon: 'info',
        fields: [
          { key: 'category', label: 'Category' },
          { key: 'difficulty', label: 'Difficulty Level' },
          { key: 'prepTime', label: 'Preparation Time' },
          { key: 'servings', label: 'Servings' },
          { key: 'calories', label: 'Calories per Serving' },
          { key: 'rating', label: 'Rating' }
        ]
      },
      {
        id: 'ingredients',
        title: 'Ingredients',
        icon: 'receipt',
        fields: [
          { key: 'ingredients', label: 'Ingredients', type: 'list' }
        ]
      },
      {
        id: 'instructions',
        title: 'Instructions',
        icon: 'list',
        fields: [
          { key: 'instructions', label: 'Steps' }
        ]
      }
    ],
    actions: [
      { id: 'edit', label: 'Edit Recipe', icon: 'edit', color: 'primary' },
      { id: 'share', label: 'Share', icon: 'share' },
      { id: 'delete', label: 'Delete', icon: 'delete', color: 'warn' }
    ],
    showSearch: true,
    showRefresh: true,
    multiSelect: false,
    keyboardNavigation: true,
    masterWidth: 350,
    splitMode: 'vertical',
    responsiveBreakpoint: 768,
    density: 'comfortable'
  };

  // Code Examples
  codeExamples = {
    basic: `import { Component } from '@angular/core';
import { AmwMasterDetailPageComponent, MasterDetailConfig } from 'angular-material-wrap';

@Component({
  selector: 'app-recipe-browser',
  standalone: true,
  imports: [AmwMasterDetailPageComponent],
  template: \`
    <amw-master-detail-page
      [config]="config"
      [dataSource]="dataSource"
      (itemSelect)="onItemSelect($event)"
      (actionClick)="onActionClick($event)">
    </amw-master-detail-page>
  \`
})
export class RecipeBrowserComponent {
  config: MasterDetailConfig = {
    masterTitle: 'Recipes',
    masterColumns: [
      { key: 'name', label: 'Name' },
      { key: 'category', label: 'Category', type: 'badge' }
    ],
    detailTitle: (item) => item?.name,
    showSearch: true,
    keyboardNavigation: true
  };

  dataSource = new MyDataSource();

  onItemSelect(event: { item: any; selected: boolean }): void {
    console.log('Selected:', event.item);
  }

  onActionClick(event: { action: string; item: any }): void {
    console.log('Action:', event.action, event.item);
  }
}`,

    config: `// MasterDetailConfig with all options
const config: MasterDetailConfig = {
  // Master panel configuration
  masterTitle: 'Recipe Collection',
  masterColumns: [
    { key: 'name', label: 'Recipe' },
    { key: 'category', label: '', type: 'badge', badgeColor: 'primary' },
    { key: 'prepTime', label: 'Prep Time' }
  ],

  // Detail panel configuration
  detailTitle: (item) => item?.name || 'Recipe Details',
  detailSections: [
    {
      id: 'overview',
      title: 'Overview',
      icon: 'info',
      fields: [
        { key: 'category', label: 'Category' },
        { key: 'difficulty', label: 'Difficulty Level' },
        { key: 'servings', label: 'Servings' }
      ]
    },
    {
      id: 'ingredients',
      title: 'Ingredients',
      icon: 'receipt',
      fields: [
        { key: 'ingredients', label: 'Ingredients', type: 'list' }
      ]
    }
  ],

  // Actions
  actions: [
    { id: 'edit', label: 'Edit', icon: 'edit', color: 'primary' },
    { id: 'share', label: 'Share', icon: 'share' },
    { id: 'delete', label: 'Delete', icon: 'delete', color: 'warn' }
  ],

  // Layout options
  showSearch: true,
  showRefresh: true,
  multiSelect: false,
  keyboardNavigation: true,
  masterWidth: 350,
  splitMode: 'vertical',
  responsiveBreakpoint: 768,
  density: 'comfortable'
};`,

    dataSource: `import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MasterDetailDataSource, MasterDetailData } from 'angular-material-wrap';

class RecipeDataSource implements MasterDetailDataSource {
  private recipes = [
    { id: '1', name: 'Banana Pancakes', category: 'Breakfast', ... },
    { id: '2', name: 'Caesar Salad', category: 'Salad', ... },
    // ... more items
  ];

  getMasterData(params: {
    searchQuery?: string;
    pageIndex?: number;
    pageSize?: number;
    sortField?: string;
    sortDirection?: 'asc' | 'desc';
    filters?: { [key: string]: any };
  }): Observable<MasterDetailData> {
    let items = [...this.recipes];

    // Apply search filter
    if (params.searchQuery) {
      const query = params.searchQuery.toLowerCase();
      items = items.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }

    return new BehaviorSubject({
      items,
      totalCount: items.length,
      pageIndex: params.pageIndex || 0,
      pageSize: params.pageSize || 100
    }).pipe(delay(500));
  }

  getDetailData(itemId: string): Observable<any> {
    const item = this.recipes.find(r => r.id === itemId);
    return of(item).pipe(delay(300));
  }
}`,

    events: `// Handling master-detail events
@Component({
  template: \`
    <amw-master-detail-page
      [config]="config"
      [dataSource]="dataSource"
      [selectedItemId]="selectedId"
      (itemSelect)="onItemSelect($event)"
      (itemDoubleClick)="onItemDoubleClick($event)"
      (actionClick)="onActionClick($event)"
      (masterDataLoad)="onMasterDataLoad($event)">
    </amw-master-detail-page>
  \`
})
export class MasterDetailComponent {
  selectedId = '1';

  onItemSelect(event: { item: any; selected: boolean }): void {
    console.log('Item selected:', event.item);
    console.log('Is selected:', event.selected);
    // Update URL, load additional data, etc.
  }

  onItemDoubleClick(item: any): void {
    console.log('Item double-clicked:', item);
    // Open edit dialog or navigate to detail page
  }

  onActionClick(event: { action: string; item: any }): void {
    switch (event.action) {
      case 'edit':
        this.openEditDialog(event.item);
        break;
      case 'delete':
        this.confirmDelete(event.item);
        break;
      case 'share':
        this.shareItem(event.item);
        break;
    }
  }

  onMasterDataLoad(data: MasterDetailData): void {
    console.log('Loaded items:', data.totalCount);
    // Update stats, breadcrumbs, etc.
  }
}`,

    columnTypes: `// Master column configuration with different types
const masterColumns: MasterDetailColumn[] = [
  // Text column (default)
  { key: 'name', label: 'Name' },

  // Badge column with color
  { key: 'category', label: 'Category', type: 'badge', badgeColor: 'primary' },

  // Icon column
  { key: 'status', label: '', type: 'icon', iconMap: {
    active: 'check_circle',
    pending: 'schedule',
    inactive: 'cancel'
  }},

  // Date column with format
  { key: 'createdAt', label: 'Created', type: 'date', dateFormat: 'short' },

  // Number column
  { key: 'price', label: 'Price', type: 'number', format: 'currency' },

  // Custom template column
  { key: 'rating', label: 'Rating', type: 'template', templateRef: ratingTemplate }
];`
  };

  // API Documentation
  masterDetailPageApiDoc: ApiDocumentation = {
    inputs: [
      {
        name: 'config',
        type: 'MasterDetailConfig',
        default: '{}',
        description: 'Configuration object for the master-detail page including title, columns, detail sections, actions, and layout options.'
      },
      {
        name: 'dataSource',
        type: 'MasterDetailDataSource',
        default: 'undefined',
        description: 'Data source implementing the MasterDetailDataSource interface. Provides methods for loading master list and detail data.'
      },
      {
        name: 'selectedItemId',
        type: 'string',
        default: 'undefined',
        description: 'ID of the initially selected item. Use this to programmatically select an item on load.'
      }
    ],
    outputs: [
      {
        name: 'itemSelect',
        type: 'EventEmitter<{ item: any; selected: boolean }>',
        description: 'Emits when an item is selected or deselected in the master list. Payload includes the item and selection state.'
      },
      {
        name: 'itemDoubleClick',
        type: 'EventEmitter<any>',
        description: 'Emits when an item is double-clicked in the master list. Useful for opening edit dialogs or navigation.'
      },
      {
        name: 'actionClick',
        type: 'EventEmitter<{ action: string; item: any }>',
        description: 'Emits when an action button is clicked in the detail panel. Includes the action ID and current item.'
      },
      {
        name: 'masterDataLoad',
        type: 'EventEmitter<MasterDetailData>',
        description: 'Emits when master data is loaded from the data source. Includes items, total count, and pagination info.'
      }
    ],
    methods: [
      {
        name: 'refresh()',
        returns: 'void',
        description: 'Manually triggers a refresh of the master list data from the data source.'
      },
      {
        name: 'selectItem(itemId: string)',
        returns: 'void',
        description: 'Programmatically selects an item by its ID.'
      },
      {
        name: 'clearSelection()',
        returns: 'void',
        description: 'Clears the current selection and hides the detail panel.'
      }
    ],
    usageNotes: [
      'Import AmwMasterDetailPageComponent from angular-material-wrap',
      'Implement MasterDetailDataSource interface for custom data loading',
      'Master columns support multiple types: text, badge, icon, date, number, and template',
      'Detail sections are displayed as expandable panels in the detail view',
      'Actions can have conditional visibility using the visible property',
      'Keyboard navigation (arrow keys, Enter) is enabled by default',
      'The layout automatically stacks on mobile when responsiveBreakpoint is reached',
      'Use multiSelect: true to enable selecting multiple items in the master list'
    ]
  };

  // Interface documentation
  masterDetailInterfaces: ApiInterface[] = [
    {
      name: 'MasterDetailConfig',
      description: 'Configuration interface for the master-detail page component.',
      properties: [
        { name: 'masterTitle', type: 'string', description: 'Title displayed in the master panel header' },
        { name: 'masterColumns', type: 'MasterDetailColumn[]', description: 'Column definitions for the master list' },
        { name: 'detailTitle', type: 'string | ((item: any) => string)', description: 'Title for detail panel (static or dynamic)' },
        { name: 'detailSections', type: 'DetailSection[]', description: 'Sections to display in the detail panel' },
        { name: 'actions', type: 'MasterDetailAction[]', description: 'Action buttons in the detail panel header' },
        { name: 'showSearch', type: 'boolean', description: 'Show search input in master panel' },
        { name: 'showRefresh', type: 'boolean', description: 'Show refresh button in master panel' },
        { name: 'multiSelect', type: 'boolean', description: 'Enable multi-select mode' },
        { name: 'keyboardNavigation', type: 'boolean', description: 'Enable keyboard navigation (arrows, Enter)' },
        { name: 'masterWidth', type: 'number', description: 'Width of master panel in pixels' },
        { name: 'splitMode', type: "'vertical' | 'horizontal'", description: 'Layout direction for panels' },
        { name: 'responsiveBreakpoint', type: 'number', description: 'Breakpoint for stacking panels' },
        { name: 'density', type: "'compact' | 'comfortable' | 'spacious'", description: 'Density of the UI' }
      ]
    },
    {
      name: 'MasterDetailDataSource',
      description: 'Interface for the master-detail data source. Provides data for master list and detail panel.',
      properties: [
        { name: 'getMasterData(params)', type: 'Observable<MasterDetailData>', description: 'Required. Returns master list data with pagination and filtering.' },
        { name: 'getDetailData(itemId)', type: 'Observable<any>', description: 'Optional. Returns detailed data for a specific item.' }
      ]
    },
    {
      name: 'MasterDetailColumn',
      description: 'Configuration for a column in the master list.',
      properties: [
        { name: 'key', type: 'string', description: 'Property key to display from the item' },
        { name: 'label', type: 'string', description: 'Column header label' },
        { name: 'type', type: "'text' | 'badge' | 'icon' | 'date' | 'number' | 'template'", description: 'Column display type' },
        { name: 'badgeColor', type: "'primary' | 'accent' | 'warn'", description: 'Badge color (for badge type)' },
        { name: 'iconMap', type: '{ [key: string]: string }', description: 'Value to icon mapping (for icon type)' },
        { name: 'dateFormat', type: 'string', description: 'Angular date format (for date type)' },
        { name: 'format', type: 'string', description: 'Number format (for number type)' }
      ]
    },
    {
      name: 'DetailSection',
      description: 'Configuration for a section in the detail panel.',
      properties: [
        { name: 'id', type: 'string', description: 'Unique identifier for the section' },
        { name: 'title', type: 'string', description: 'Section header title' },
        { name: 'icon', type: 'string', description: 'Material icon name for section header' },
        { name: 'fields', type: 'DetailField[]', description: 'Fields to display in this section' },
        { name: 'expanded', type: 'boolean', description: 'Initial expanded state' }
      ]
    }
  ];

  onItemSelect(event: any): void {
    console.log('Item selected:', event);
  }

  onActionClick(event: any): void {
    console.log('Action clicked:', event);
  }
}
