import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpCacheInterceptor } from '../../library/src/services/amw-http-cache';
import { mockBackendInterceptor } from './interceptors/mock-backend.interceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        httpCacheInterceptor,  // Cache interceptor runs first (checks cache)
        mockBackendInterceptor // Mock backend runs second (provides data if not cached)
      ])
    )
  ]
};