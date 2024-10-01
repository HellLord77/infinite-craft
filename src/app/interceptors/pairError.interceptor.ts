import {HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {catchError, of} from 'rxjs';
import {CACHE_SET} from './pairCache.interceptor';
import {Result} from '../models/result.model';
import {inject} from '@angular/core';
import {ConfigService} from '../services/config.service';

export const pairErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const configService = inject(ConfigService);

  if (req.url !== configService.apiPairUrl) {
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
