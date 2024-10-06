import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {pairCacheInterceptor} from './interceptors/pairCache.interceptor';
import {pairErrorInterceptor} from './interceptors/pairError.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([pairCacheInterceptor, pairErrorInterceptor])),
  ],
};
