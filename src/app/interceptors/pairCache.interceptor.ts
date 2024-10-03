import {HttpContextToken, HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {inject} from '@angular/core';
import {CacheService} from '../services/cache.service';
import {of, tap} from 'rxjs';
import {ApiService} from '../services/api.service';

export const CACHE_GET = new HttpContextToken(() => true);
export const CACHE_SET = new HttpContextToken(() => true);

export const pairCacheInterceptor: HttpInterceptorFn = (req, next) => {
  const apiService = inject(ApiService);
  const cacheService = inject(CacheService);

  if (!apiService.requestIsPair(req)) {
    return next(req);
  }

  const cachedEvent = req.context.get(CACHE_GET) ? cacheService.get(req.urlWithParams) : undefined;
  if (cachedEvent !== undefined) {
    return of(cachedEvent);
  }

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse && event.status === 200 && req.context.get(CACHE_SET)) {
        cacheService.set(req.urlWithParams, event);
      }
    }),
  );
};
