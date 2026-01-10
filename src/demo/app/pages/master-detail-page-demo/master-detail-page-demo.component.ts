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
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

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
    MatTabsModule,
    MatCardModule
],
  template: `
    <div class="demo-page">
      <h1>Master-Detail Page Component</h1>
      <p>A split-pane layout with a master list and detail panel, perfect for curation queues, file browsers, and data exploration.</p>

      <mat-tab-group>
        <mat-tab label="Demo">
          <div class="demo-container">
            <amw-master-detail-page
              [config]="config"
              [dataSource]="dataSource"
              (itemSelect)="onItemSelect($event)"
              (actionClick)="onActionClick($event)">
            </amw-master-detail-page>
          </div>
        </mat-tab>

        <mat-tab label="Code">
          <mat-card>
            <mat-card-content>
              <h3>Component Usage</h3>
              <pre><code>import &#123; AmwMasterDetailPageComponent, MasterDetailConfig &#125; from 'angular-material-wrap';

const config: MasterDetailConfig = &#123;
  masterTitle: 'Recipes',
  masterColumns: [
    &#123; key: 'name', label: 'Name' &#125;,
    &#123; key: 'category', label: 'Category', type: 'badge' &#125;,
    &#123; key: 'prepTime', label: 'Prep Time' &#125;
  ],
  detailTitle: (item) => item.name,
  detailSections: [
    &#123;
      title: 'Overview',
      fields: [
        &#123; key: 'difficulty', label: 'Difficulty' &#125;,
        &#123; key: 'servings', label: 'Servings' &#125;,
        &#123; key: 'calories', label: 'Calories' &#125;
      ]
    &#125;
  ],
  actions: [
    &#123; id: 'edit', label: 'Edit', icon: 'edit' &#125;,
    &#123; id: 'delete', label: 'Delete', icon: 'delete', color: 'warn' &#125;
  ],
  showSearch: true,
  keyboardNavigation: true
&#125;;

&lt;amw-master-detail-page
  [config]="config"
  [dataSource]="dataSource"
  (itemSelect)="onItemSelect($event)"
  (actionClick)="onActionClick($event)"&gt;
&lt;/amw-master-detail-page&gt;</code></pre>

              <h3>Features</h3>
              <ul>
                <li>Split-pane layout with resizable master panel</li>
                <li>Keyboard navigation (arrow keys, Enter)</li>
                <li>Single and multi-select support</li>
                <li>Responsive stacking for mobile devices</li>
                <li>Search and filtering</li>
                <li>Customizable column types (text, badge, icon, date)</li>
                <li>Detail sections with expansion panels</li>
                <li>Action buttons with conditional visibility</li>
              </ul>
            </mat-card-content>
          </mat-card>
        </mat-tab>

        <mat-tab label="API">
          <mat-card>
            <mat-card-content>
              <h3>Inputs</h3>
              <ul>
                <li><code>@Input() config: MasterDetailConfig</code> - Configuration object</li>
                <li><code>@Input() dataSource?: MasterDetailDataSource</code> - Data source for loading data</li>
                <li><code>@Input() selectedItemId?: string</code> - Initially selected item ID</li>
              </ul>

              <h3>Outputs</h3>
              <ul>
                <li><code>@Output() itemSelect: EventEmitter&lt;&#123;item: any, selected: boolean&#125;&gt;</code> - Emits when item is selected</li>
                <li><code>@Output() itemDoubleClick: EventEmitter&lt;any&gt;</code> - Emits when item is double-clicked</li>
                <li><code>@Output() actionClick: EventEmitter&lt;&#123;action: string, item: any&#125;&gt;</code> - Emits when action is clicked</li>
                <li><code>@Output() masterDataLoad: EventEmitter&lt;MasterDetailData&gt;</code> - Emits when master data loads</li>
              </ul>

              <h3>MasterDetailConfig Interface</h3>
              <pre><code>interface MasterDetailConfig &#123;
  masterTitle?: string;
  masterColumns: MasterDetailColumn[];
  detailTitle?: string | ((item: any) => string);
  detailSections?: DetailSection[];
  actions?: MasterDetailAction[];
  showSearch?: boolean;
  showRefresh?: boolean;
  multiSelect?: boolean;
  keyboardNavigation?: boolean;
  masterWidth?: number;
  splitMode?: 'vertical' | 'horizontal';
  responsiveBreakpoint?: number;
  density?: 'compact' | 'comfortable' | 'spacious';
&#125;</code></pre>
            </mat-card-content>
          </mat-card>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .demo-page {
      padding: 20px;
    }

    .demo-container {
      height: 600px;
      margin-top: 20px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    mat-card {
      margin-top: 20px;
    }

    pre {
      background: #f5f5f5;
      padding: 16px;
      border-radius: 4px;
      overflow-x: auto;
    }

    code {
      font-family: 'Courier New', monospace;
      font-size: 13px;
    }

    h3 {
      margin-top: 24px;
      margin-bottom: 12px;
    }

    ul {
      line-height: 1.8;
    }
  `]
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

  onItemSelect(event: any): void {
    console.log('Item selected:', event);
  }

  onActionClick(event: any): void {
    console.log('Action clicked:', event);
  }
}
