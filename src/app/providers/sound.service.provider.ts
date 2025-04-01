import {FactoryProvider} from '@angular/core';

import {environment} from '../../environments/environment';
import {SoundService} from '../services/sound.service';
import {SoundHowlerService} from '../services/sound-howler.service';
import {SoundNativeService} from '../services/sound-native.service';

const soundServiceFactory = (): SoundService => {
  return environment.soundHowler ? new SoundHowlerService() : new SoundNativeService();
};

export const soundServiceProvider: FactoryProvider = {
  provide: SoundService,
  useFactory: soundServiceFactory,
};
