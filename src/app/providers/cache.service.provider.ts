import {FactoryProvider} from '@angular/core';

import {CacheService} from '../services/cache.service';
import {CacheNativeService} from '../services/cache-native.service';
import {CacheStorageService} from '../services/cache-storage.service';
import {ConfigService} from '../services/config.service';

const cacheServiceFactory = (configService: ConfigService): CacheService => {
  return configService.cacheStorage ? new CacheStorageService() : new CacheNativeService();
};

export const cacheServiceProvider: FactoryProvider = {
  provide: CacheService,
  useFactory: cacheServiceFactory,
  deps: [ConfigService],
};
