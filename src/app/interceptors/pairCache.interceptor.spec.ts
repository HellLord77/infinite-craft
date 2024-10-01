import {TestBed} from '@angular/core/testing';
import {HttpInterceptorFn} from '@angular/common/http';

import {pairCacheInterceptor} from './pairCache.interceptor';

describe('pairCacheInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => pairCacheInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
