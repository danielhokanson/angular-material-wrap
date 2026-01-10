import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DashboardDataSource, DashboardDataParams, DashboardData } from '../interfaces';

/**
 * Default implementation of DashboardDataSource
 *
 * @description
 * Provides mock data for development and testing purposes.
 * Replace with your own implementation for production use.
 *
 * @example
 * ```typescript
 * // In your component or module:
 * providers: [
 *   { provide: DASHBOARD_DATA_SOURCE, useClass: MyCustomDashboardDataSource }
 * ]
 * ```
 */
@Injectable()
export class DefaultDashboardDataSource implements DashboardDataSource {
  /**
   * Mock data for meal planning dashboard
   */
  private mockItems = [
    {
      id: '1',
      title: 'Monday - Breakfast',
      day: 'Monday',
      mealType: 'Breakfast',
      recipe: 'Banana Pancakes',
      date: new Date('2024-01-15T08:00:00'),
      servings: 4,
      prepTime: '15 minutes',
      calories: 350,
      category: 'Breakfast'
    },
    {
      id: '2',
      title: 'Monday - Lunch',
      day: 'Monday',
      mealType: 'Lunch',
      recipe: 'Caesar Salad',
      date: new Date('2024-01-15T12:00:00'),
      servings: 2,
      prepTime: '10 minutes',
      calories: 280,
      category: 'Salad'
    },
    {
      id: '3',
      title: 'Monday - Dinner',
      day: 'Monday',
      mealType: 'Dinner',
      recipe: 'Spaghetti Carbonara',
      date: new Date('2024-01-15T18:00:00'),
      servings: 4,
      prepTime: '25 minutes',
      calories: 520,
      category: 'Main Dish'
    },
    {
      id: '4',
      title: 'Tuesday - Breakfast',
      day: 'Tuesday',
      mealType: 'Breakfast',
      recipe: 'Greek Yogurt Bowl',
      date: new Date('2024-01-16T08:00:00'),
      servings: 2,
      prepTime: '5 minutes',
      calories: 220,
      category: 'Breakfast'
    },
    {
      id: '5',
      title: 'Tuesday - Lunch',
      day: 'Tuesday',
      mealType: 'Lunch',
      recipe: 'Chicken Wrap',
      date: new Date('2024-01-16T12:00:00'),
      servings: 2,
      prepTime: '15 minutes',
      calories: 380,
      category: 'Sandwich'
    },
    {
      id: '6',
      title: 'Tuesday - Dinner',
      day: 'Tuesday',
      mealType: 'Dinner',
      recipe: 'Thai Green Curry',
      date: new Date('2024-01-16T18:00:00'),
      servings: 4,
      prepTime: '45 minutes',
      calories: 480,
      category: 'Main Dish'
    },
    {
      id: '7',
      title: 'Wednesday - Breakfast',
      day: 'Wednesday',
      mealType: 'Breakfast',
      recipe: 'Avocado Toast',
      date: new Date('2024-01-17T08:00:00'),
      servings: 2,
      prepTime: '8 minutes',
      calories: 290,
      category: 'Breakfast'
    },
    {
      id: '8',
      title: 'Wednesday - Lunch',
      day: 'Wednesday',
      mealType: 'Lunch',
      recipe: 'Tomato Soup',
      date: new Date('2024-01-17T12:00:00'),
      servings: 4,
      prepTime: '30 minutes',
      calories: 180,
      category: 'Soup'
    }
  ];

  constructor() {}

  /**
   * Get dashboard data with stats and items
   *
   * @param params View mode, filters, and search parameters
   * @returns Observable of dashboard data
   */
  getDashboardData(params: DashboardDataParams): Observable<DashboardData> {
    let filteredItems = [...this.mockItems];

    // Apply search filter
    if (params.searchQuery) {
      const query = params.searchQuery.toLowerCase();
      filteredItems = filteredItems.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.recipe.toLowerCase().includes(query) ||
        item.mealType.toLowerCase().includes(query)
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

    // Apply date range filter
    if (params.dateRange) {
      filteredItems = filteredItems.filter(item =>
        item.date >= params.dateRange!.start &&
        item.date <= params.dateRange!.end
      );
    }

    // Filter by view mode
    if (params.viewMode === 'week') {
      // Show only current week items
      const now = new Date();
      const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);
      filteredItems = filteredItems.filter(item =>
        item.date >= weekStart && item.date < weekEnd
      );
    } else if (params.viewMode === 'month') {
      // Show only current month items
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      filteredItems = filteredItems.filter(item =>
        item.date >= monthStart && item.date <= monthEnd
      );
    }

    // Apply pagination
    const pageIndex = params.pageIndex || 0;
    const pageSize = params.pageSize || 20;
    const startIndex = pageIndex * pageSize;
    const paginatedItems = filteredItems.slice(startIndex, startIndex + pageSize);

    // Calculate stats
    const stats = {
      totalMeals: filteredItems.length,
      thisWeek: filteredItems.filter(item => {
        const now = new Date();
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 7);
        return item.date >= weekStart && item.date < weekEnd;
      }).length,
      upcoming: filteredItems.filter(item => item.date > new Date()).length,
      avgCalories: Math.round(
        filteredItems.reduce((sum, item) => sum + item.calories, 0) / filteredItems.length
      )
    };

    const result: DashboardData = {
      stats,
      items: paginatedItems,
      totalCount: filteredItems.length,
      pageIndex,
      pageSize,
      viewMode: params.viewMode,
      searchQuery: params.searchQuery,
      filters: params.filters,
      dateRange: params.dateRange
    };

    // Simulate network delay
    return new BehaviorSubject(result).pipe(delay(500));
  }

  /**
   * Refresh stat values only
   *
   * @returns Observable of stat values
   */
  refreshStats(): Observable<{ [key: string]: number | string }> {
    const stats = {
      totalMeals: this.mockItems.length,
      thisWeek: this.mockItems.filter(item => {
        const now = new Date();
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 7);
        return item.date >= weekStart && item.date < weekEnd;
      }).length,
      upcoming: this.mockItems.filter(item => item.date > new Date()).length,
      avgCalories: Math.round(
        this.mockItems.reduce((sum, item) => sum + item.calories, 0) / this.mockItems.length
      )
    };

    return of(stats).pipe(delay(300));
  }
}
