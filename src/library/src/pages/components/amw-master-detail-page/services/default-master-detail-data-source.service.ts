import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MasterDetailDataSource, MasterDetailData } from '../interfaces';

/**
 * Default implementation of MasterDetailDataSource
 *
 * @description
 * Provides mock data for development and testing purposes.
 * Replace with your own implementation for production use.
 *
 * @example
 * ```typescript
 * // In your component or module:
 * providers: [
 *   { provide: MASTER_DETAIL_DATA_SOURCE, useClass: MyCustomDataSource }
 * ]
 * ```
 */
@Injectable()
export class DefaultMasterDetailDataSource implements MasterDetailDataSource {
  /**
   * Mock data for demonstration
   */
  private mockItems = [
    {
      id: '1',
      title: 'Chocolate Chip Cookies',
      author: 'John Doe',
      status: 'pending',
      priority: 'high',
      submittedDate: new Date('2024-01-15'),
      category: 'Desserts',
      description: 'Classic chocolate chip cookies with a crispy edge and chewy center.',
      ingredients: ['Flour', 'Sugar', 'Butter', 'Eggs', 'Chocolate chips'],
      prepTime: '15 minutes',
      cookTime: '12 minutes',
      servings: 24
    },
    {
      id: '2',
      title: 'Spaghetti Carbonara',
      author: 'Jane Smith',
      status: 'approved',
      priority: 'medium',
      submittedDate: new Date('2024-01-14'),
      category: 'Main Dishes',
      description: 'Traditional Italian pasta with eggs, cheese, and pancetta.',
      ingredients: ['Spaghetti', 'Eggs', 'Parmesan', 'Pancetta', 'Black pepper'],
      prepTime: '10 minutes',
      cookTime: '15 minutes',
      servings: 4
    },
    {
      id: '3',
      title: 'Greek Salad',
      author: 'Mike Johnson',
      status: 'pending',
      priority: 'low',
      submittedDate: new Date('2024-01-13'),
      category: 'Salads',
      description: 'Fresh Mediterranean salad with feta cheese and olives.',
      ingredients: ['Tomatoes', 'Cucumber', 'Feta', 'Olives', 'Olive oil'],
      prepTime: '15 minutes',
      cookTime: '0 minutes',
      servings: 6
    },
    {
      id: '4',
      title: 'Banana Bread',
      author: 'Sarah Williams',
      status: 'rejected',
      priority: 'low',
      submittedDate: new Date('2024-01-12'),
      category: 'Breads',
      description: 'Moist banana bread perfect for breakfast or snack.',
      ingredients: ['Bananas', 'Flour', 'Sugar', 'Eggs', 'Butter'],
      prepTime: '15 minutes',
      cookTime: '60 minutes',
      servings: 12
    },
    {
      id: '5',
      title: 'Thai Green Curry',
      author: 'Alex Chen',
      status: 'pending',
      priority: 'high',
      submittedDate: new Date('2024-01-11'),
      category: 'Main Dishes',
      description: 'Spicy and aromatic Thai curry with coconut milk.',
      ingredients: ['Green curry paste', 'Coconut milk', 'Chicken', 'Vegetables', 'Thai basil'],
      prepTime: '20 minutes',
      cookTime: '25 minutes',
      servings: 4
    }
  ];

  constructor() {}

  /**
   * Get master panel data with optional filtering and search
   *
   * @param params Search, filter, and pagination parameters
   * @returns Observable of master data
   */
  getMasterData(params: {
    searchQuery?: string;
    filters?: { [key: string]: any };
    pageIndex?: number;
    pageSize?: number;
  }): Observable<MasterDetailData> {
    let filteredItems = [...this.mockItems];

    // Apply search filter
    if (params.searchQuery) {
      const query = params.searchQuery.toLowerCase();
      filteredItems = filteredItems.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.author.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }

    // Apply custom filters
    if (params.filters) {
      Object.keys(params.filters).forEach(key => {
        const filterValue = params.filters![key];
        if (filterValue !== null && filterValue !== undefined && filterValue !== '') {
          filteredItems = filteredItems.filter(item => {
            const itemValue = (item as any)[key];
            if (Array.isArray(filterValue)) {
              return filterValue.includes(itemValue);
            }
            return itemValue === filterValue;
          });
        }
      });
    }

    // Apply pagination
    const pageIndex = params.pageIndex || 0;
    const pageSize = params.pageSize || 10;
    const startIndex = pageIndex * pageSize;
    const paginatedItems = filteredItems.slice(startIndex, startIndex + pageSize);

    const result: MasterDetailData = {
      items: paginatedItems,
      totalCount: filteredItems.length,
      pageIndex,
      pageSize,
      searchQuery: params.searchQuery,
      filters: params.filters
    };

    // Simulate network delay
    return new BehaviorSubject(result).pipe(delay(500));
  }

  /**
   * Get detailed data for a specific item
   *
   * @param itemId Unique identifier of the item
   * @returns Observable of detailed item data
   */
  getDetailData(itemId: string): Observable<any> {
    const item = this.mockItems.find(i => i.id === itemId);

    if (!item) {
      return of(null).pipe(delay(300));
    }

    // Return detailed item data
    return of(item).pipe(delay(300));
  }
}
