import {TestBed} from '@angular/core/testing';

import {ApiLocalService} from './api-local.service';

describe('ApiLocalService', () => {
  let service: ApiLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
