import {FactoryProvider} from '@angular/core';

import {environment} from '../../environments/environment';
import {CacheService} from '../services/cache.service';
import {CacheNativeService} from '../services/cache-native.service';
import {CacheStorageService} from '../services/cache-storage.service';

const cacheServiceFactory = (): CacheService => {
  return environment.cacheStorage ? new CacheStorageService() : new CacheNativeService();
};

export const cacheServiceProvider: FactoryProvider = {
  provide: CacheService,
  useFactory: cacheServiceFactory,
};
