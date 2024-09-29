import { TestBed } from '@angular/core/testing';

import { InfiniteCraftDataService } from './infinite-craft-data.service';

describe('LocalStorageService', () => {
  let service: InfiniteCraftDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfiniteCraftDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
