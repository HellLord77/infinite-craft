import {TestBed} from '@angular/core/testing';

import {SoundHowlerService} from './sound-howler.service';

describe('SoundHowlerService', () => {
  let service: SoundHowlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoundHowlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
