import {TestBed} from '@angular/core/testing';
import {HttpInterceptorFn} from '@angular/common/http';

import {pairErrorInterceptor} from './pairError.interceptor';

describe('pairErrorInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => pairErrorInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
