import {TestBed} from '@angular/core/testing';

import {ApiRemoteService} from './api-remote.service';

describe('ApiRemoteService', () => {
  let service: ApiRemoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRemoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
