import {HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {catchError, of} from 'rxjs';

import {get, toResult} from '../models/element.model';
import {Result} from '../models/result.model';
import {CACHE_SET} from './pairCache.interceptor';

export const pairErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(() => {
      req.context.set(CACHE_SET, false);
      const body: Result = toResult(get());
      return of(new HttpResponse({body}));
    }),
  );
};
