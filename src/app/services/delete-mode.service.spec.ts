import {TestBed} from '@angular/core/testing';

import {DeleteModeService} from './delete-mode.service';

describe('DeleteModeService', () => {
  let service: DeleteModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
