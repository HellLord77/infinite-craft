import {HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, of} from 'rxjs';

import {Result} from '../models/result.model';
import {ApiService} from '../services/api.service';

import {CACHE_SET} from './pairCache.interceptor';

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
