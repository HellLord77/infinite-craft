import {TestBed} from '@angular/core/testing';

import {SoundNativeService} from './sound-native.service';

describe('SoundNativeService', () => {
  let service: SoundNativeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoundNativeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
