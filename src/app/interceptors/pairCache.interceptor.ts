import {HttpContextToken, HttpInterceptorFn, HttpParams, HttpResponse} from '@angular/common/http';
import {inject} from '@angular/core';
import {of, tap} from 'rxjs';

import {CacheService} from '../services/cache.service';

export const CACHE_GET = new HttpContextToken(() => true);
export const CACHE_SET = new HttpContextToken(() => true);

export const pairCacheInterceptor: HttpInterceptorFn = (req, next) => {
  const cacheService = inject(CacheService);

  let params = req.params;
  const first = params.get('first')!;
  const second = params.get('second')!;
  if (first.localeCompare(second) > 0) {
    params = new HttpParams().set('first', second).set('second', first);
  }
  const key = params.toString();

  const cached = req.context.get(CACHE_GET) ? cacheService.get(key) : null;
  if (cached !== null) {
    return of(cached);
  }

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse && event.status === 200 && req.context.get(CACHE_SET)) {
        cacheService.set(key, event);
      }
    }),
  );
};
