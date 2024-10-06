import {TestBed} from '@angular/core/testing';

import {CacheNativeService} from './cache-native.service';

describe('CacheNativeService', () => {
  let service: CacheNativeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheNativeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
