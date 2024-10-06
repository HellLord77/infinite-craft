import {FactoryProvider} from '@angular/core';

import {ConfigService} from '../services/config.service';
import {SoundService} from '../services/sound.service';
import {SoundHowlerService} from '../services/sound-howler.service';
import {SoundNativeService} from '../services/sound-native.service';

const soundServiceFactory = (configService: ConfigService): SoundService => {
  return configService.soundHowler ? new SoundHowlerService() : new SoundNativeService();
};

export const soundServiceProvider: FactoryProvider = {
  provide: SoundService,
  useFactory: soundServiceFactory,
  deps: [ConfigService],
};
