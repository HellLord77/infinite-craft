import {TestBed} from '@angular/core/testing';

import {CacheStorageService} from './cache-storage.service';

describe('StorageCacheService', () => {
  let service: CacheStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
