import {HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {catchError, of} from 'rxjs';
import {CACHE_SET} from './pairCache.interceptor';
import {Result} from '../models/result.model';
import {inject} from '@angular/core';
import {ApiService} from '../services/api.service';

export const pairErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const apiService = inject(ApiService);

  if (!apiService.requestIsPair(req)) {
    return next(req);
  }

  return next(req).pipe(
    catchError(() => {
      req.context.set(CACHE_SET, false);
      const body: Result = {result: 'Nothing', emoji: '', isNew: false};
      return of(new HttpResponse({body}));
    }),
  );
};
