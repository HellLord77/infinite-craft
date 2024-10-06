import {HttpInterceptorFn} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';

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
